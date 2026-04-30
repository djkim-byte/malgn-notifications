export default {
    layout: null,

    data() {
        return {
            form: {
                email: '',
                remember: false
            },
            errors: {
                email: false
            },
            sentModal: null
        };
    },

    watch: {
        'form.email'(v) { if (v) this.errors.email = false; }
    },

    mounted() {
        const saved = localStorage.getItem('login_remember_email');
        if (saved) {
            this.form.email = saved;
            this.form.remember = true;
        }

        this.$nextTick(() => {
            this.sentModal = new bootstrap.Modal(this.$refs.sentModal);
        });
    },

    methods: {
        sendResetMail() {
            if (!this.form.email) {
                this.errors.email = true;
                return;
            }
            this.errors.email = false;

            if (this.form.remember) {
                localStorage.setItem('login_remember_email', this.form.email);
            } else {
                localStorage.removeItem('login_remember_email');
            }

            if (this.sentModal) this.sentModal.show();

            const url = window.location.origin + window.location.pathname + '#/templete/email/reset-password';
            window.open(url, '_blank');
        },

        onSentConfirm() {
            if (this.sentModal) this.sentModal.hide();
            this.navigateTo('/reset-password/new');
        }
    }
};
