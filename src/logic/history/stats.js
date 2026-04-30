// 통계 페이지 — 메시지 채널/차트 유형/조회 기간을 기반으로 시계열 차트와 일자별 집계 테이블 표시
// 드롭다운 컴포넌트는 src/components/HistoryDropdown.js 사용 (ViewLogic은 components: ['Name'] 문자열 배열로 등록)

const CHANNEL_OPTIONS = [
    { value: '', label: '전체' },
    { value: 'SMS', label: 'SMS' },
    { value: '알림톡', label: '알림톡' },
    { value: '친구톡', label: '친구톡' },
    { value: 'RCS', label: 'RCS' },
    { value: 'Email', label: 'Email' },
    { value: 'Push', label: 'Push' }
];

const PRESET_OPTIONS = [
    { value: 'custom', label: '지정' },
    { value: '1h', label: '1시간' },
    { value: '6h', label: '6시간' },
    { value: '12h', label: '12시간' },
    { value: '24h', label: '24시간' },
    { value: '1w', label: '1주' },
    { value: '1m', label: '1달' }
];

const PRESET_MS = {
    '1h': 60 * 60 * 1000,
    '6h': 6 * 60 * 60 * 1000,
    '12h': 12 * 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    '1w': 7 * 24 * 60 * 60 * 1000,
    '1m': 30 * 24 * 60 * 60 * 1000
};

const SERIES = [
    { label: '요청',      key: 'requested',     color: '#4FC0FC' },
    { label: '요청 취소', key: 'cancelled',     color: '#F59E0B' },
    { label: '발송',      key: 'sent',          color: '#EF4444' },
    { label: '발송 실패', key: 'sentFailed',    color: '#10B981' },
    { label: '수신',      key: 'received',      color: '#A855F7' },
    { label: '수신 실패', key: 'receiveFailed', color: '#F472B6' },
    { label: '실발송',    key: 'realSent',      color: '#9CA3AF' }
];

function pad(n) { return String(n).padStart(2, '0'); }

function formatDateLocal(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function makeMockRows(rangeFrom, rangeTo) {
    const start = new Date(rangeFrom);
    const end = new Date(rangeTo);
    const dayMs = 24 * 60 * 60 * 1000;
    const dayCount = Math.max(1, Math.min(31, Math.ceil((end - start) / dayMs) + 1));
    const baseDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());

    const sample = [
        { requested: 49,  sent: 47,  received: 35,  receiveFailed: 12 },
        { requested: 89,  sent: 87,  received: 70,  receiveFailed: 17 },
        { requested: 92,  sent: 90,  received: 72,  receiveFailed: 18 },
        { requested: 157, sent: 155, received: 130, receiveFailed: 25 },
        { requested: 197, sent: 181, received: 160, receiveFailed: 21 },
        { requested: 175, sent: 168, received: 147, receiveFailed: 21 },
        { requested: 185, sent: 161, received: 137, receiveFailed: 24 },
        { requested: 103, sent: 91,  received: 72,  receiveFailed: 19 }
    ];

    const rows = [];
    for (let i = 0; i < dayCount; i++) {
        const d = new Date(baseDate.getTime() + i * dayMs);
        const s = sample[i % sample.length];
        rows.push({
            date: formatDate(d),
            requested: s.requested,
            cancelled: 0,
            sent: s.sent,
            sentFailed: 0,
            received: s.received,
            receiveFailed: s.receiveFailed,
            realSent: 0
        });
    }
    return rows;
}

export default {
    name: 'StatsPage',
    layout: 'default',

    components: ['HistoryDropdown'],

    data() {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return {
            channelOptions: CHANNEL_OPTIONS,
            presetOptions: PRESET_OPTIONS,
            series: SERIES,

            search: {
                channel: '',
                chartType: 'basic',
                preset: 'custom',
                from: formatDateLocal(weekAgo),
                to: formatDateLocal(now),
                messageId: ''
            },

            rows: [],
            chart: null
        };
    },

    computed: {
        totals() {
            const t = { requested: 0, cancelled: 0, sent: 0, sentFailed: 0, received: 0, receiveFailed: 0, realSent: 0 };
            this.rows.forEach(r => {
                t.requested     += r.requested;
                t.cancelled     += r.cancelled;
                t.sent          += r.sent;
                t.sentFailed    += r.sentFailed;
                t.received      += r.received;
                t.receiveFailed += r.receiveFailed;
                t.realSent      += r.realSent;
            });
            return t;
        }
    },

    watch: {
        'search.preset'(v) {
            if (v && v !== 'custom') this.applyPreset(v);
        }
    },

    mounted() {
        this.rows = makeMockRows(this.search.from, this.search.to);
        this.$nextTick(() => this.renderChart());
    },

    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    },

    methods: {
        runSearch() {
            this.rows = makeMockRows(this.search.from, this.search.to);
            this.$nextTick(() => this.renderChart());
        },

        resetSearch() {
            const now = new Date();
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            this.search = {
                channel: '',
                chartType: 'basic',
                preset: 'custom',
                from: formatDateLocal(weekAgo),
                to: formatDateLocal(now),
                messageId: ''
            };
            this.runSearch();
        },

        applyPreset(p) {
            const now = new Date();
            const offset = PRESET_MS[p] || 0;
            const from = new Date(now.getTime() - offset);
            this.search.from = formatDateLocal(from);
            this.search.to = formatDateLocal(now);
        },

        renderChart() {
            const canvas = this.$refs.chart;
            if (!canvas || typeof Chart === 'undefined') return;

            if (this.chart) {
                this.chart.destroy();
                this.chart = null;
            }

            const labels = this.rows.map(r => r.date);
            const datasets = SERIES.map(s => ({
                label: s.label,
                data: this.rows.map(r => r[s.key]),
                borderColor: s.color,
                backgroundColor: s.color,
                tension: 0.35,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
                fill: false
            }));

            this.chart = new Chart(canvas, {
                type: 'line',
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: {
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                boxWidth: 14,
                                boxHeight: 14,
                                padding: 16,
                                font: { size: 12 },
                                color: '#374151'
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(55, 65, 81, 0.95)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderWidth: 0,
                            padding: 12,
                            cornerRadius: 6,
                            displayColors: true,
                            boxPadding: 4
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '건수',
                                align: 'end',
                                color: '#9CA3AF',
                                font: { size: 12 }
                            },
                            grid: { color: '#F3F4F6' },
                            ticks: { color: '#9CA3AF', font: { size: 11 } }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '일시',
                                align: 'end',
                                color: '#9CA3AF',
                                font: { size: 12 }
                            },
                            grid: { display: false },
                            ticks: { color: '#9CA3AF', font: { size: 11 } }
                        }
                    }
                }
            });
        },

        downloadCsv() {
            const headers = ['이벤트 일시', '요청', '요청 취소', '발송', '발송 실패', '수신', '수신 실패', '실발송'];
            const lines = [headers.join(',')];
            this.rows.forEach(r => {
                lines.push([
                    r.date, r.requested, r.cancelled, r.sent,
                    r.sentFailed, r.received, r.receiveFailed, r.realSent
                ].join(','));
            });
            const t = this.totals;
            lines.push(['합계', t.requested, t.cancelled, t.sent, t.sentFailed, t.received, t.receiveFailed, t.realSent].join(','));

            const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `stats_${formatDate(new Date())}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
};
