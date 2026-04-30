export default {
    layout: null,

    data() {
        return {
            phone: {
                prefix: '010',
                mid: '',
                last: '',
                code: '',
                sent: false
            },
            errors: {
                phoneEmpty: false,
                codeInvalid: false
            },
            codeAlertModal: null
        };
    },

    computed: {
        canSubmit() {
            return this.phone.sent && this.phone.code.length === 6;
        }
    },

    watch: {
        'phone.mid'()  { this.errors.phoneEmpty = false; },
        'phone.last'() { this.errors.phoneEmpty = false; },
        'phone.code'() { this.errors.codeInvalid = false; }
    },

    mounted() {
        this.$nextTick(() => {
            this.codeAlertModal = new bootstrap.Modal(this.$refs.codeAlertModal);
        });
    },

    methods: {
        sendCode() {
            if (!this.phone.mid || !this.phone.last) {
                this.errors.phoneEmpty = true;
                return;
            }
            this.errors.phoneEmpty = false;
            this.phone.sent = true;
            if (this.codeAlertModal) this.codeAlertModal.show();
        },

        onCodeInput(e) {
            const v = e.target.value.replace(/\D/g, '').slice(0, 6);
            this.phone.code = v;
            if (v.length === 6 && this.phone.sent) {
                this.completeVerify();
            }
        },

        completeVerify() {
            if (!this.phone.sent || this.phone.code.length !== 6) {
                this.errors.codeInvalid = true;
                return;
            }

            const email = sessionStorage.getItem('login_pending_email') || 'user@malgnsoft.com';
            const name = email.split('@')[0];

            localStorage.setItem('auth_token', 'demo-token-' + Date.now());
            localStorage.setItem('user', JSON.stringify({
                name,
                email,
                role: 'ADMIN'
            }));
            sessionStorage.removeItem('login_pending_email');

            this.navigateTo('/home');
        }
    }
};
