// 발신 정보 > 도메인 관리

const STATUS_LABEL = {
    verified: '완료',
    pending: '미인증',
    failed: '실패'
};

const SAMPLE_ROWS = [
    {
        id: 1,
        domain: 'malgnsoft.com',
        status: 'verified',
        statusLabel: STATUS_LABEL.verified,
        verifiedAt: '2026-02-23 23:47'
    },
    {
        id: 2,
        domain: 'wecandeo.com',
        status: 'verified',
        statusLabel: STATUS_LABEL.verified,
        verifiedAt: '2026-02-12 15:48'
    }
];

const DOMAIN_REGEX = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

function emptyForm() {
    return {
        domain: '',
        verified: false
    };
}

function emptyDkim() {
    return {
        host: '',
        value: '',
        verified: false,
        enabled: false
    };
}

export default {
    name: 'SenderDomainsPage',
    layout: 'default',

    data() {
        return {
            rows: SAMPLE_ROWS.slice(),
            keyword: '',
            page: 1,
            pageSize: 10,
            selectedRowIds: [],

            modals: {},

            form: emptyForm(),
            verifyMsg: '도메인을 검증하세요.',
            verifyMsgType: 'error',

            dkim: emptyDkim(),
            dkimTargetId: null
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                register: new bootstrap.Modal(this.$refs.registerModal),
                dkim: new bootstrap.Modal(this.$refs.dkimModal),
                deleteConfirm: new bootstrap.Modal(this.$refs.deleteConfirmModal)
            };
        });
    },

    computed: {
        filteredRows() {
            const kw = this.keyword.trim().toLowerCase();
            if (!kw) return this.rows;
            return this.rows.filter(r => r.domain.toLowerCase().includes(kw));
        },
        totalCount() { return this.filteredRows.length; },
        totalPages() { return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize)); },
        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.filteredRows.slice(start, start + this.pageSize);
        },
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedRowIds.includes(r.id));
        },
        verifyMsgClass() {
            return 'domains-form-msg-' + (this.verifyMsgType || 'error');
        }
    },

    methods: {
        statusClass(status) {
            if (status === 'verified') return 'sender-status-approved';
            if (status === 'failed') return 'sender-status-rejected';
            return 'sender-status-pending';
        },

        refresh() {
            this.page = 1;
            this.selectedRowIds = [];
            this.keyword = '';
        },

        search() {
            this.page = 1;
            this.selectedRowIds = [];
        },

        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.page = p;
        },

        toggleAllRows(e) {
            if (e.target.checked) {
                const ids = this.pagedRows.map(r => r.id);
                this.selectedRowIds = Array.from(new Set([...this.selectedRowIds, ...ids]));
            } else {
                const ids = new Set(this.pagedRows.map(r => r.id));
                this.selectedRowIds = this.selectedRowIds.filter(id => !ids.has(id));
            }
        },

        // ===== 도메인 등록 =====
        openRegister() {
            this.form = emptyForm();
            this.verifyMsg = '도메인을 검증하세요.';
            this.verifyMsgType = 'error';
            this.modals.register && this.modals.register.show();
        },

        onDomainInput() {
            if (this.form.verified) {
                this.form.verified = false;
                this.verifyMsg = '도메인을 검증하세요.';
                this.verifyMsgType = 'error';
            }
        },

        verifyDomain() {
            const value = this.form.domain.trim().toLowerCase();
            if (!value) {
                this.form.verified = false;
                this.verifyMsg = '도메인을 입력해 주세요.';
                this.verifyMsgType = 'error';
                return;
            }
            if (!DOMAIN_REGEX.test(value)) {
                this.form.verified = false;
                this.verifyMsg = '올바른 도메인 형식이 아닙니다. (예: example.com)';
                this.verifyMsgType = 'error';
                return;
            }
            const exists = this.rows.some(r => r.domain.toLowerCase() === value);
            if (exists) {
                this.form.verified = false;
                this.verifyMsg = '이미 등록된 도메인입니다.';
                this.verifyMsgType = 'error';
                return;
            }
            this.form.domain = value;
            this.form.verified = true;
            this.verifyMsg = '사용 가능한 도메인입니다.';
            this.verifyMsgType = 'success';
        },

        submitRegister() {
            if (!this.form.verified) return;
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

            this.rows.unshift({
                id: Date.now(),
                domain: this.form.domain.trim(),
                status: 'pending',
                statusLabel: STATUS_LABEL.pending,
                verifiedAt: ''
            });

            this.closeModal('register');
        },

        // ===== DKIM 설정 =====
        openDkim() {
            if (this.selectedRowIds.length !== 1) return;
            const id = this.selectedRowIds[0];
            const row = this.rows.find(r => r.id === id);
            if (!row) return;
            this.dkimTargetId = id;
            this.dkim = {
                host: `toast._domainkey.${row.domain}`,
                value: 'v=DKIM1;k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNPs/rndfDisqrjiHoXBQZJZ5iafj8FgcPpMtP8u86zSAX4BUuKaqtzpnBG/Qf1i41wPPQ/B9p0vwUj8aPumuiWeLhhMaT4SZVM1cdZLfHs/dpOJ1ijSJcxLnZsDWZdk0aHrnqHbUgeF9YdOXJR/iTCTxEzArMNDFSeDA96hww+wIDAQAB',
                verified: true,
                enabled: true
            };
            this.modals.dkim && this.modals.dkim.show();
        },

        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                alert('클립보드에 복사되었습니다.');
            } catch (err) {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                alert('클립보드에 복사되었습니다.');
            }
        },

        saveDkim() {
            this.closeModal('dkim');
        },

        // ===== 삭제 =====
        openDeleteConfirm() {
            if (this.selectedRowIds.length === 0) return;
            this.modals.deleteConfirm && this.modals.deleteConfirm.show();
        },

        confirmDelete() {
            const ids = new Set(this.selectedRowIds);
            this.rows = this.rows.filter(r => !ids.has(r.id));
            this.selectedRowIds = [];
            this.closeModal('deleteConfirm');
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        }
    }
};
