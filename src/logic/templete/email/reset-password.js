export default {
    name: 'EmailResetPasswordTemplate',
    layout: null,

    data() {
        return {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_token_value',
            expires: 1741350000
        };
    },

    computed: {
        resetUrl() {
            const origin = window.location.origin + window.location.pathname;
            return `${origin}#/reset-password/new?token=${this.token}&expires=${this.expires}`;
        }
    },

    methods: {
        goReset() {
            this.navigateTo('/reset-password/new', { token: this.token, expires: this.expires });
        }
    }
};
