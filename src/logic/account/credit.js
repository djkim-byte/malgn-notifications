export default {
    name: 'AccountCredit',
    layout: 'default',

    data() {
        return {
            summary: {
                balance: 300000,
                totalCharged: 300000,
                bonus: 1000,
                monthlyUsed: 5000
            },

            period: 'month',
            periodOptions: [
                { value: 'today', label: '오늘' },
                { value: 'week',  label: '1주일' },
                { value: 'month', label: '이번 달' },
                { value: '3month', label: '3개월' }
            ],

            dateFrom: '2026.04.00',
            dateTo: '2026.05.00',

            searchQuery: '',
            typeFilter: 'all',
            typeFilterOptions: [
                { value: 'charge', label: '충전' },
                { value: 'admin',  label: '관리자 지급' },
                { value: 'cancel', label: '취소' },
                { value: 'use',    label: '사용' },
                { value: 'expire', label: '소멸' }
            ],

            typeLabels: {
                charge: '충전',
                admin:  '관리자 지급',
                cancel: '취소',
                use:    '사용',
                expire: '소멸'
            },

            pageSize: 30,
            currentPage: 1,

            items: [
                {
                    id: 1,
                    datetime: '2000.00.00 오전/오후 00:00',
                    type: 'charge',
                    content: '크레딧 구매',
                    credit: 10000,
                    expireDate: '2000.00.00 오전/오후 00:00',
                    hasReceipt: true,
                    validUntil: '2000.00.00',
                    orderNo: '결제완료',
                    orderStatus: '결제완료',
                    paymentAmount: 200000,
                    paymentInfo: '신용카드 (현대 3333 **** **** ****, 일시불)'
                },
                {
                    id: 2,
                    datetime: '2000.00.00 오전/오후 00:00',
                    type: 'admin',
                    content: '이벤트 당첨 10,000원 충전',
                    credit: 10000,
                    expireDate: '2000.00.00 오전/오후 00:00',
                    hasReceipt: false
                },
                {
                    id: 3,
                    datetime: '2000.00.00 오전/오후 00:00',
                    type: 'cancel',
                    content: '환불차감',
                    credit: 10000,
                    expireDate: '2000.00.00 오전/오후 00:00',
                    hasReceipt: false
                },
                {
                    id: 4,
                    datetime: '2000.00.00 오전/오후 00:00',
                    type: 'use',
                    content: '결제취소',
                    credit: 2000,
                    expireDate: null,
                    hasReceipt: false
                },
                {
                    id: 5,
                    datetime: '2000.00.00 오전/오후 00:00',
                    type: 'expire',
                    content: '이메일 전송',
                    credit: 2000,
                    expireDate: null,
                    hasReceipt: false
                }
            ],

            detailRow: null,
            receiptRow: null,

            receiptModal: null,
            detailModal: null,
            cancelConfirmModal: null,
            cancelDoneModal: null
        };
    },

    computed: {
        filteredItems() {
            const q = this.searchQuery.trim().toLowerCase();
            return this.items.filter(it => {
                if (this.typeFilter !== 'all' && it.type !== this.typeFilter) return false;
                if (q && !it.content.toLowerCase().includes(q)) return false;
                return true;
            });
        },

        totalPages() {
            return Math.max(1, Math.ceil(this.filteredItems.length / this.pageSize));
        },

        pagedItems() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.filteredItems.slice(start, start + this.pageSize);
        },

        pageNumbers() {
            const total = this.totalPages;
            const cur   = this.currentPage;
            const window = 5;
            let start = Math.max(1, cur - Math.floor(window / 2));
            let end   = Math.min(total, start + window - 1);
            start     = Math.max(1, end - window + 1);
            const arr = [];
            for (let i = start; i <= end; i++) arr.push(i);
            return arr;
        },

        canCancelPayment() {
            if (!this.detailRow) return false;
            return this.detailRow.type === 'charge' && this.detailRow.orderStatus === '결제완료';
        }
    },

    watch: {
        searchQuery() { this.currentPage = 1; },
        typeFilter()  { this.currentPage = 1; },
        pageSize()    { this.currentPage = 1; },
        period()      { this.currentPage = 1; }
    },

    mounted() {
        this.$nextTick(() => {
            this.receiptModal       = new bootstrap.Modal(this.$refs.receiptModal);
            this.detailModal        = new bootstrap.Modal(this.$refs.detailModal);
            this.cancelConfirmModal = new bootstrap.Modal(this.$refs.cancelConfirmModal);
            this.cancelDoneModal    = new bootstrap.Modal(this.$refs.cancelDoneModal);
        });
    },

    methods: {
        formatNumber(value) {
            return Number(value || 0).toLocaleString('ko-KR');
        },

        setPeriod(value) {
            this.period = value;
        },

        goCharge() {
            this.navigateTo('/charge');
        },

        goGuide() {
            this.navigateTo('/guide');
        },

        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.currentPage = p;
        },

        amountClass(row) {
            const positive = row.type === 'charge' || row.type === 'cancel';
            return positive ? 'is-positive' : 'is-negative';
        },

        amountSign(row) {
            const positive = row.type === 'charge' || row.type === 'cancel';
            return positive ? '+' : '-';
        },

        amountIconClass(row) {
            const positive = row.type === 'charge' || row.type === 'cancel';
            return positive ? 'bi bi-plus-circle-fill' : 'bi bi-dash-circle-fill';
        },

        openReceipt(row) {
            this.receiptRow = row;
            if (this.receiptModal) this.receiptModal.show();
        },

        openDetail(row) {
            this.detailRow = row;
            if (this.detailModal) this.detailModal.show();
        },

        askCancelPayment() {
            if (this.detailModal) this.detailModal.hide();
            if (this.cancelConfirmModal) this.cancelConfirmModal.show();
        },

        confirmCancelPayment() {
            if (this.cancelConfirmModal) this.cancelConfirmModal.hide();
            if (this.detailRow) {
                this.detailRow.orderStatus = '결제취소';
            }
            if (this.cancelDoneModal) this.cancelDoneModal.show();
        }
    }
};
