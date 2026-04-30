export default {
    data() {
        return {
            submitted: {
                typeLabel: '',
                title: '',
                content: '',
                fileNames: []
            }
        };
    },

    mounted() {
        const raw = sessionStorage.getItem('inquiry:lastSubmit');
        if (!raw) {
            this.navigateTo('/inquiry');
            return;
        }
        try {
            this.submitted = JSON.parse(raw);
        } catch (e) {
            this.navigateTo('/inquiry');
        }
    },

    methods: {
        goHome() {
            sessionStorage.removeItem('inquiry:lastSubmit');
            this.navigateTo('/home');
        }
    }
};
