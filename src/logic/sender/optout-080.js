// 발신 정보 > 080 수신 거부 번호 관리

const STATUS_LABEL = {
    pending: '신청 중',
    in_use: '사용 중',
    in_use_external: '사용중 - 외부 등록',
    in_use_shared: '사용중 - 공유 번호',
    canceled: '해지'
};

const NON_CANCELLABLE_STATUSES = ['in_use_external', 'in_use_shared'];

const SAMPLE_ROWS = [];

function emptyApplyForm() {
    return {
        companyName: ''
    };
}

export default {
    name: 'SenderOptout080Page',
    layout: 'default',

    data() {
        return {
            rows: SAMPLE_ROWS.slice(),
            page: 1,
            pageSize: 10,
            selectedRowIds: [],
            searchKeyword: '',
            appliedKeyword: '',

            modals: {},
            applyForm: emptyApplyForm()
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                apply: new bootstrap.Modal(this.$refs.applyModal),
                cancelConfirm: new bootstrap.Modal(this.$refs.cancelConfirmModal)
            };
        });
    },

    computed: {
        filteredRows() {
            const kw = (this.appliedKeyword || '').trim();
            if (!kw) return this.rows;
            return this.rows.filter(r => (r.number || '').includes(kw));
        },
        totalCount() { return this.filteredRows.length; },
        totalPages() { return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize)); },
        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.filteredRows.slice(start, start + this.pageSize);
        },
        isAllSelected() {
            const cancellable = this.pagedRows.filter(r => this.isCancellable(r));
            return cancellable.length > 0 && cancellable.every(r => this.selectedRowIds.includes(r.id));
        }
    },

    methods: {
        statusClass(status) {
            if (status === 'in_use' || status === 'in_use_external' || status === 'in_use_shared') {
                return 'sender-status-approved';
            }
            if (status === 'canceled') return 'sender-status-rejected';
            return 'sender-status-pending';
        },

        isCancellable(row) {
            return !NON_CANCELLABLE_STATUSES.includes(row.status);
        },

        search() {
            this.appliedKeyword = this.searchKeyword;
            this.page = 1;
            this.selectedRowIds = [];
        },

        refresh() {
            this.searchKeyword = '';
            this.appliedKeyword = '';
            this.page = 1;
            this.selectedRowIds = [];
        },

        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.page = p;
        },

        toggleAllRows(e) {
            const cancellable = this.pagedRows.filter(r => this.isCancellable(r));
            if (e.target.checked) {
                const ids = cancellable.map(r => r.id);
                this.selectedRowIds = Array.from(new Set([...this.selectedRowIds, ...ids]));
            } else {
                const ids = new Set(cancellable.map(r => r.id));
                this.selectedRowIds = this.selectedRowIds.filter(id => !ids.has(id));
            }
        },

        // ===== 신청 =====
        openApplyModal() {
            this.applyForm = emptyApplyForm();
            this.modals.apply && this.modals.apply.show();
        },

        async submitApply() {
            const name = this.applyForm.companyName.trim();
            if (!name) {
                alert('회사명을 입력해 주세요.');
                return;
            }

            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

            this.rows.unshift({
                id: Date.now(),
                number: '',
                companyName: name,
                status: 'pending',
                statusLabel: STATUS_LABEL.pending,
                requestedAt: stamp,
                activatedAt: ''
            });

            this.closeModal('apply');
            alert('080 수신 거부 번호 신청이 접수되었습니다. 영업일 기준 3~4일 소요됩니다.');
        },

        // ===== 해지 =====
        openCancelConfirm() {
            if (this.selectedRowIds.length === 0) return;
            this.modals.cancelConfirm && this.modals.cancelConfirm.show();
        },

        confirmCancel() {
            const ids = new Set(this.selectedRowIds);
            this.rows = this.rows.map(r => {
                if (!ids.has(r.id)) return r;
                if (!this.isCancellable(r)) return r;
                return { ...r, status: 'canceled', statusLabel: STATUS_LABEL.canceled };
            });
            this.selectedRowIds = [];
            this.closeModal('cancelConfirm');
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        }
    }
};
