export default {
    data() {
        return {
            result: null
        };
    },

    mounted() {
        const raw = sessionStorage.getItem('charge_result');
        if (raw) {
            try {
                this.result = JSON.parse(raw);
            } catch (e) {
                this.result = null;
            }
        }
    },

    methods: {
        formatNumber(value) {
            return Number(value || 0).toLocaleString('ko-KR');
        },

        goCreditAdmin() {
            this.navigateTo('/account/credit');
        },

        retry() {
            this.navigateTo('/charge');
        }
    }
};
