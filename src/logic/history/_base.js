// 발송 조회 페이지 공통 베이스 — 채널별 라우트(sms/kakao/rcs/email/push)에서 import 해 사용
// 라우트로 직접 진입하지 않는 헬퍼 모듈 (파일명 _ 접두사로 라우트와 구분)

const CHANNEL_OPTIONS = [
    { value: '', label: '전체' },
    { value: 'SMS', label: 'SMS' },
    { value: '알림톡', label: '알림톡' },
    { value: '친구톡', label: '친구톡' },
    { value: 'RCS', label: 'RCS' },
    { value: 'Email', label: 'Email' },
    { value: 'Push', label: 'Push' }
];

const SEND_STATUS_OPTIONS = [
    { value: '', label: '전체' },
    { value: 'requested', label: '발송 요청' },
    { value: 'cancelled', label: '발송 취소' },
    { value: 'reserved', label: '발송 예약' },
    { value: 'waiting', label: '발송 대기' },
    { value: 'waiting_flow', label: '발송 대기(플로우)' },
    { value: 'sending', label: '발송 중' },
    { value: 'failed', label: '발송 실패' },
    { value: 'success', label: '발송 성공' }
];

const RECEIVE_STATUS_OPTIONS = [
    { value: '', label: '전체' },
    { value: 'success', label: '수신 성공' },
    { value: 'failed', label: '수신 실패' },
    { value: 'pending', label: '수신 대기' }
];

const DETAIL_OPTIONS = [
    { value: '', label: '선택 안 함' },
    { value: 'messageId', label: '메시지 아이디' },
    { value: 'templateName', label: '템플릿 이름' },
    { value: 'flowName', label: '플로우 이름' },
    { value: 'sender', label: '발신 정보' },
    { value: 'receiver', label: '수신자 정보' }
];

const EXTRA_FIELD_OPTIONS = [
    { value: 'reserveAt', label: '예약 일시' },
    { value: 'sendAt', label: '발송 일시' },
    { value: 'receiveAt', label: '수신 일시' },
    { value: 'templateName', label: '템플릿 이름' },
    { value: 'flowName', label: '플로우 이름' }
];

const FLOW_OPTIONS = [
    { value: 'djkim', label: 'djkim' },
    { value: '회원가입_플로우', label: '회원가입_플로우' },
    { value: '결제완료_플로우', label: '결제완료_플로우' }
];

// 채널별 템플릿 — 각 발송 화면(send/*.js)의 템플릿 데이터와 동일 형식 유지
// 미리보기 모달에서 채널 고유 필드(senderNumber/buttons/subject/title 등)를 사용
const TEMPLATES_BY_CHANNEL = {
    'SMS': [
        { id: 'tpl-01', name: '01_비디오팩생성', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '[위캔디오] 비디오팩 준비 완료', content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사' },
        { id: 'tpl-02', name: '02_회원가입환영', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '#{name}님, 가입을 환영합니다. 지금 바로 서비스를 이용해 보세요.' },
        { id: 'tpl-03', name: '03_결제완료안내', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '[결제 완료]', content: '#{name}님, 결제가 정상적으로 완료되었습니다. 감사합니다.' },
        { id: 'tpl-04', name: '04_비밀번호찾기인증', senderNumber: '1644-7143', purpose: 'auth', messageType: 'SMS', title: '', content: '인증번호: #{code} (3분 이내 입력)' },
        { id: 'tpl-05', name: '05_이벤트당첨안내', senderNumber: '1644-7143', purpose: 'ad', messageType: 'LMS', title: '[이벤트 당첨]', content: '#{name}님, 이벤트에 당첨되셨습니다!' }
    ],
    '알림톡': [
        { id: 'k-01', name: '01_비디오팩생성', content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사', extraInfo: '▶ 아래 버튼에서 시작 가이드를 확인해 주세요.', buttons: [ { icon: '👉', name: '시작 가이드' }, { icon: '💬', name: '문의하기' } ] },
        { id: 'k-02', name: '02_회원가입환영', content: '#{name}님, 가입을 환영합니다.', buttons: [] },
        { id: 'k-03', name: '03_결제완료안내', content: '#{name}님, 결제가 정상적으로 완료되었습니다.', buttons: [] },
        { id: 'k-04', name: '04_만기1일전', content: '#{name}님, 구독 만기 1일 전입니다.', buttons: [] },
        { id: 'k-05', name: '05_기간만료', content: '#{name}님, 구독 기간이 만료되었습니다.', buttons: [] }
    ],
    '친구톡': [
        { id: 'f-01', name: '01_이벤트안내', content: '#{name}님, 이벤트가 시작되었어요!', buttons: [ { icon: '🎁', name: '이벤트 보기' } ] },
        { id: 'f-02', name: '02_프로모션소식', content: '#{name}님, 신규 프로모션을 확인하세요.', buttons: [] },
        { id: 'f-03', name: '03_쿠폰발급', content: '#{name}님, 쿠폰이 발급되었습니다.', buttons: [ { icon: '🎟️', name: '쿠폰 사용하기' } ] }
    ],
    'RCS': [
        { id: 'r-01', name: '01_비디오팩생성', purpose: 'general', messageType: 'LMS', content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.', buttons: [] },
        { id: 'r-02', name: '02_비디오팩생성2일경과', purpose: 'general', messageType: 'SMS', content: '#{name}님, 영상을 아직 등록하지 않으셨어요.', buttons: [] },
        { id: 'r-03', name: '03_비디오팩생성5일경과', purpose: 'general', messageType: 'SMS', content: '#{name}님, 5일이 지났습니다.', buttons: [] },
        { id: 'r-04', name: '04_만기1일전', purpose: 'general', messageType: 'SMS', content: '#{name}님, 구독 만기 1일 전입니다.', buttons: [] }
    ],
    'Email': [
        { id: 'e-01', name: '01_상품생성시', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '[위캔디오] 상품이 정상적으로 생성되었습니다.', content: '<p style="font-family:sans-serif;padding:16px">#{name}님, 상품이 생성되었습니다.</p>' },
        { id: 'e-02', name: '02_회원가입환영', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '회원가입을 환영합니다', content: '<p style="font-family:sans-serif;padding:16px">#{name}님, 가입을 환영합니다.</p>' },
        { id: 'e-03', name: '03_결제완료안내', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '결제가 완료되었습니다', content: '<p style="font-family:sans-serif;padding:16px">#{name}님, 결제가 완료되었습니다.</p>' },
        { id: 'e-04', name: '04_뉴스레터', senderEmail: 'news@malgnsoft.com', purpose: 'ad', subject: '[광고] 2026년 4월 뉴스레터', content: '<p style="font-family:sans-serif;padding:16px">이번 달 뉴스레터를 확인해 보세요.</p>' }
    ],
    'Push': [
        { id: 'p-01', name: '01_가입환영', title: '가입을 환영합니다', content: '#{name}님, 서비스 가입을 환영합니다.' },
        { id: 'p-02', name: '02_이벤트안내', title: '이벤트 안내', content: '#{name}님, 새로운 이벤트가 시작되었습니다.' },
        { id: 'p-03', name: '03_결제완료', title: '결제 완료', content: '결제가 정상적으로 처리되었습니다.' }
    ]
};
const SENDER_OPTIONS = [
    { value: '1644-7143', label: '1644-7143' },
    { value: '02-1234-5678', label: '02-1234-5678' },
    { value: '010-1234-5678', label: '010-1234-5678' },
    { value: 'no-reply@wecandeo.com', label: 'no-reply@wecandeo.com' }
];

// 드롭다운 컴포넌트는 src/components/HistoryDropdown.js, HistoryMultiDropdown.js 에 분리
// (ViewLogic은 페이지 옵션의 `components: ['Name']` 문자열 배열로만 등록 가능)

function pad(n) { return String(n).padStart(2, '0'); }

function formatDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatDateLocal(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function makeMockRows(channel) {
    const senders = channel === 'Email'
        ? ['no-reply@wecandeo.com', 'support@malgnsoft.com']
        : ['1644-7143', '02-1234-5678'];
    const receivers = channel === 'Email'
        ? ['soumincor@malgnsoft.com', 'jdstest0424-01@malgnsoft.com', 'sangmin@malgnsoft.com', 'mja@bodyfriend.co.kr', 'hrd@bodyfriend.co.kr', 'it_admin@bodyfriend.com']
        : ['010-1234-5678', '010-2345-6789', '010-3456-7890', '010-4567-8901', '010-5678-9012'];

    const sendStatuses = ['success', 'success', 'success', 'success', 'failed', 'success', 'sending', 'reserved'];
    const receiveStatuses = ['success', 'success', 'failed', 'success', 'failed', 'success', 'pending', 'pending'];
    const purposes = ['general', 'general', 'auth', 'general', 'ad', 'general'];
    const timings = ['now', 'now', 'now', 'now', 'reserve', 'now'];

    const baseDate = new Date(2026, 3, 24, 13, 40, 4);
    const rows = [];
    for (let i = 0; i < 87; i++) {
        const d = new Date(baseDate.getTime() - i * 60 * 1000);
        rows.push({
            id: `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}` + Math.random().toString(36).slice(2, 12),
            channel,
            requestAt: formatDate(d),
            sendAt: formatDate(new Date(d.getTime() + 1000)),
            receiveAt: formatDate(new Date(d.getTime() + 3000)),
            reserveAt: '',
            timing: timings[i % timings.length],
            sender: senders[i % senders.length],
            sendStatus: sendStatuses[i % sendStatuses.length],
            purpose: purposes[i % purposes.length],
            templateName: i % 3 === 0 ? '01_비디오팩생성' : (i % 3 === 1 ? '02_회원가입환영' : ''),
            flowName: i % 4 === 0 ? '회원가입_플로우' : '',
            receiver: receivers[i % receivers.length],
            receiveStatus: receiveStatuses[i % receiveStatuses.length]
        });
    }
    return rows;
}

export function createHistoryPage({ defaultChannel }) {
    return {
        name: 'HistoryPage',
        layout: 'default',

        components: ['HistoryDropdown', 'HistoryMultiDropdown'],

        data() {
            const now = new Date();
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return {
                defaultChannel,
                channelOptions: CHANNEL_OPTIONS,
                sendStatusOptions: SEND_STATUS_OPTIONS,
                receiveStatusOptions: RECEIVE_STATUS_OPTIONS,
                detailOptions: DETAIL_OPTIONS,
                extraFieldOptions: EXTRA_FIELD_OPTIONS,
                flowOptions: FLOW_OPTIONS,
                senderOptions: SENDER_OPTIONS,

                search: {
                    channel: defaultChannel,
                    sendStatus: '',
                    receiveStatus: '',
                    sendTiming: '',
                    purpose: '',
                    requestFrom: formatDateLocal(weekAgo),
                    requestTo: formatDateLocal(now),
                    detailKey: '',
                    detailValue: '',
                    detailValueLabel: ''
                },

                extraFields: [],

                rows: [],
                page: 1,
                pageSize: 10,
                selectedRowIds: [],

                cancelSelectedHelp: '선택한 항목 중 발송 예정/대기 상태인 메시지의 발송을 취소합니다.',
                cancelAllHelp: '검색 결과에 포함된 발송 예정/대기 항목을 일괄 취소합니다.',

                modals: {},
                downloadRequests: [
                    { id: '20260219161504G4e5JF8ii40', requestedAt: '2026-02-19 16:15', expireAt: '2026-02-26 16:15', status: 'expired' },
                    { id: '20260219160936vOJs19LFyy0', requestedAt: '2026-02-19 16:09', expireAt: '2026-02-26 16:09', status: 'expired' }
                ],
                downloadListPage: 1,
                downloadListPageSize: 10,

                templatePicker: { search: '', selectedId: null, page: 1, pageSize: 9 }
            };
        },

        mounted() {
            this.rows = makeMockRows(this.search.channel || this.defaultChannel);
            this.$nextTick(() => {
                this.modals = {
                    cancelAll: new bootstrap.Modal(this.$refs.cancelAllModal),
                    downloadRequest: new bootstrap.Modal(this.$refs.downloadRequestModal),
                    downloadList: new bootstrap.Modal(this.$refs.downloadListModal)
                };
                if (this.$refs.channelAlertModal) {
                    this.modals.channelAlert = new bootstrap.Modal(this.$refs.channelAlertModal);
                }
                if (this.$refs.templatePickerModal) {
                    this.modals.templatePicker = new bootstrap.Modal(this.$refs.templatePickerModal);
                }
            });
        },

        computed: {
            pageTitle() {
                const opt = this.channelOptions.find(o => o.value === this.search.channel);
                const label = opt ? opt.label : '전체';
                return `${label} 발송 조회`;
            },
            isKakaoChannel() {
                return this.search.channel === '알림톡' || this.search.channel === '친구톡';
            },
            totalCount() { return this.rows.length; },
            totalPages() { return Math.max(1, Math.ceil(this.rows.length / this.pageSize)); },
            pagedRows() {
                const start = (this.page - 1) * this.pageSize;
                return this.rows.slice(start, start + this.pageSize);
            },
            pageRange() {
                const block = 10;
                const blockStart = Math.floor((this.page - 1) / block) * block + 1;
                const blockEnd = Math.min(blockStart + block - 1, this.totalPages);
                const arr = [];
                for (let i = blockStart; i <= blockEnd; i++) arr.push(i);
                return arr;
            },
            isAllSelected() {
                return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedRowIds.includes(r.id));
            },
            totalColumns() {
                let cols = 10;
                cols += this.extraFields.length;
                return cols;
            },
            detailLabel() {
                const opt = this.detailOptions.find(o => o.value === this.search.detailKey);
                return opt ? opt.label : '';
            },
            downloadRequestsTotalPages() {
                return Math.max(1, Math.ceil(this.downloadRequests.length / this.downloadListPageSize));
            },
            pagedDownloadRequests() {
                const start = (this.downloadListPage - 1) * this.downloadListPageSize;
                return this.downloadRequests.slice(start, start + this.downloadListPageSize);
            },
            currentChannelTemplates() {
                return TEMPLATES_BY_CHANNEL[this.search.channel] || [];
            },
            filteredTemplates() {
                const q = this.templatePicker.search.trim().toLowerCase();
                if (!q) return this.currentChannelTemplates;
                return this.currentChannelTemplates.filter(t => t.name.toLowerCase().includes(q));
            },
            templatePickerTotalPages() {
                return Math.max(1, Math.ceil(this.filteredTemplates.length / this.templatePicker.pageSize));
            },
            pagedTemplateList() {
                const start = (this.templatePicker.page - 1) * this.templatePicker.pageSize;
                return this.filteredTemplates.slice(start, start + this.templatePicker.pageSize);
            },
            modalPreviewTemplate() {
                return this.currentChannelTemplates.find(t => t.id === this.templatePicker.selectedId);
            },
            templateModalDialogClass() {
                const ch = this.search.channel;
                if (ch === '알림톡' || ch === '친구톡') return 'sms-modal-w800 kakao-modal-template';
                if (ch === 'RCS') return 'sms-modal-w800 rcs-modal-template';
                if (ch === 'Email') return 'email-modal-template';
                if (ch === 'Push') return 'sms-modal-w800 push-modal-template';
                return 'sms-modal-w800 sms-modal-template';
            },
            templateModalGridClass() {
                const ch = this.search.channel;
                if (ch === '알림톡' || ch === '친구톡') return 'kakao-template-modal-grid';
                if (ch === 'RCS') return 'rcs-template-modal-grid';
                if (ch === 'Email') return 'email-template-modal-grid';
                if (ch === 'Push') return 'push-template-modal-grid';
                return 'sms-template-modal-grid';
            },
            templateModalListClass() {
                const ch = this.search.channel;
                if (ch === '알림톡' || ch === '친구톡') return 'kakao-template-modal-list';
                if (ch === 'RCS') return 'rcs-template-modal-list';
                if (ch === 'Email') return 'email-template-modal-list';
                if (ch === 'Push') return 'push-template-modal-list';
                return 'sms-template-modal-list';
            },
            templateModalPreviewClass() {
                const ch = this.search.channel;
                if (ch === '알림톡' || ch === '친구톡') return 'kakao-template-modal-preview';
                if (ch === 'RCS') return 'rcs-template-modal-preview';
                if (ch === 'Email') return 'email-template-modal-preview';
                if (ch === 'Push') return 'push-template-modal-preview';
                return 'sms-template-modal-preview';
            },
            previewMode() {
                const ch = this.search.channel;
                if (ch === '알림톡' || ch === '친구톡') return 'kakao';
                if (ch === 'RCS') return 'rcs';
                if (ch === 'Email') return 'email';
                if (ch === 'Push') return 'push';
                if (ch === 'SMS') return 'sms';
                return 'none';
            }
        },

        watch: {
            'search.detailKey'(newVal, oldVal) {
                this.search.detailValue = '';
                this.search.detailValueLabel = '';
                if (newVal === 'templateName' && !this.search.channel) {
                    this.$nextTick(() => {
                        this.search.detailKey = '';
                        this.showChannelAlert();
                    });
                }
            },
            'search.channel'(newVal) {
                if (!newVal && this.search.detailKey === 'templateName') {
                    this.search.detailKey = '';
                    this.showChannelAlert();
                }
                if ((newVal === '알림톡' || newVal === '친구톡') && this.search.purpose === 'ad') {
                    this.search.purpose = '';
                }
                this.templatePicker.selectedId = null;
                this.templatePicker.search = '';
                this.templatePicker.page = 1;
                if (this.search.detailKey === 'templateName') {
                    this.search.detailValue = '';
                    this.search.detailValueLabel = '';
                }
            },
            'search.sendStatus'(newVal) {
                if (newVal !== 'success') {
                    this.search.receiveStatus = '';
                }
            }
        },

        methods: {
            runSearch() {
                this.page = 1;
                this.selectedRowIds = [];
                this.rows = makeMockRows(this.search.channel || this.defaultChannel);
            },

            resetSearch() {
                const now = new Date();
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                this.search = {
                    channel: this.defaultChannel,
                    sendStatus: '',
                    receiveStatus: '',
                    sendTiming: '',
                    purpose: '',
                    requestFrom: formatDateLocal(weekAgo),
                    requestTo: formatDateLocal(now),
                    detailKey: '',
                    detailValue: '',
                    detailValueLabel: ''
                };
                this.extraFields = [];
                this.runSearch();
            },

            goPage(p) {
                if (p < 1 || p > this.totalPages) return;
                this.page = p;
            },

            toggleAllRows(e) {
                if (e.target.checked) {
                    const ids = this.pagedRows.map(r => r.id);
                    const merged = new Set([...this.selectedRowIds, ...ids]);
                    this.selectedRowIds = Array.from(merged);
                } else {
                    const ids = new Set(this.pagedRows.map(r => r.id));
                    this.selectedRowIds = this.selectedRowIds.filter(id => !ids.has(id));
                }
            },

            cancelSelected() {
                if (this.selectedRowIds.length === 0) return;
                alert(`선택한 ${this.selectedRowIds.length}건의 발송을 취소합니다.`);
            },

            cancelAll() {
                this.modals.cancelAll && this.modals.cancelAll.show();
            },

            confirmCancelAll() {
                this.closeHistoryModal('cancelAll');
                alert('검색 결과 전체에 대해 일괄 취소가 요청되었습니다.');
            },

            requestDownload() {
                this.modals.downloadRequest && this.modals.downloadRequest.show();
            },

            confirmDownloadRequest() {
                this.closeHistoryModal('downloadRequest');
                const now = new Date();
                const expire = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                const newId = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}` + Math.random().toString(36).slice(2, 9);
                this.downloadRequests.unshift({
                    id: newId,
                    requestedAt: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
                    expireAt: `${expire.getFullYear()}-${pad(expire.getMonth() + 1)}-${pad(expire.getDate())} ${pad(expire.getHours())}:${pad(expire.getMinutes())}`,
                    status: 'processing'
                });
            },

            openDownloadList() {
                this.downloadListPage = 1;
                this.modals.downloadList && this.modals.downloadList.show();
            },

            goDownloadPage(p) {
                if (p < 1 || p > this.downloadRequestsTotalPages) return;
                this.downloadListPage = p;
            },

            downloadFile(row) {
                alert(`다운로드: ${row.id}`);
            },

            closeHistoryModal(name) {
                this.modals[name] && this.modals[name].hide();
            },

            openDetail(row) {
                alert(`메시지 상세 보기: ${row.id}`);
            },

            openTemplatePicker() {
                if (!this.search.channel) {
                    this.showChannelAlert();
                    return;
                }
                this.templatePicker.search = '';
                this.templatePicker.page = 1;
                this.templatePicker.selectedId = this.search.detailValue || null;
                this.modals.templatePicker && this.modals.templatePicker.show();
            },

            confirmTemplatePicker() {
                const tpl = this.templates.find(t => t.id === this.templatePicker.selectedId);
                if (!tpl) {
                    alert('템플릿을 선택하세요.');
                    return;
                }
                this.search.detailValue = tpl.id;
                this.search.detailValueLabel = tpl.name;
                this.closeHistoryModal('templatePicker');
            },

            showChannelAlert() {
                this.modals.channelAlert && this.modals.channelAlert.show();
            },

            formatTiming(t) {
                if (t === 'now') return '즉시';
                if (t === 'reserve') return '예약';
                return '-';
            },

            formatPurpose(p) {
                if (p === 'general') return '일반용';
                if (p === 'auth') return '인증용';
                if (p === 'ad') return '광고용';
                return '-';
            },

            formatSendStatus(s) {
                const opt = SEND_STATUS_OPTIONS.find(o => o.value === s);
                return opt ? opt.label : s;
            },

            formatReceiveStatus(s) {
                const opt = RECEIVE_STATUS_OPTIONS.find(o => o.value === s);
                return opt ? opt.label : s;
            },

            getStatusClass(s) {
                if (s === 'success') return 'history-status-success';
                if (s === 'failed') return 'history-status-failed';
                if (s === 'cancelled') return 'history-status-cancelled';
                if (s === 'sending' || s === 'waiting' || s === 'waiting_flow' || s === 'requested') return 'history-status-progress';
                if (s === 'reserved') return 'history-status-reserved';
                return 'history-status-default';
            },

            getReceiveStatusClass(s) {
                if (s === 'success') return 'history-status-success';
                if (s === 'failed') return 'history-status-failed';
                return 'history-status-progress';
            }
        }
    };
}
