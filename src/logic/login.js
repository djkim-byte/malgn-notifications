export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                remember: false
            },
            showPassword: false,
            errors: {
                email: false,
                password: false
            }
        };
    },

    watch: {
        'form.email'(v)    { if (v) this.errors.email = false; },
        'form.password'(v) { if (v) this.errors.password = false; }
    },

    mounted() {
        const saved = localStorage.getItem('login_remember_email');
        if (saved) {
            this.form.email = saved;
            this.form.remember = true;
        }
    },

    methods: {
        handleLogin() {
            this.errors.email = !this.form.email;
            this.errors.password = !this.form.password;
            if (this.errors.email || this.errors.password) return;

            if (this.form.remember) {
                localStorage.setItem('login_remember_email', this.form.email);
            } else {
                localStorage.removeItem('login_remember_email');
            }

            sessionStorage.setItem('login_pending_email', this.form.email);
            this.navigateTo('/login/security');
        }
    }
};
