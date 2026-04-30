export default {
    layout: null,

    data() {
        return {
            form: {
                password: '',
                passwordConfirm: ''
            },
            showPw: false,
            showPw2: false,
            errors: {
                pw: '',
                pwConfirm: ''
            },
            doneModal: null
        };
    },

    computed: {
        pwStrength() {
            const v = this.form.password;
            if (!v) return 0;
            let score = 0;
            if (v.length >= 8) score++;
            if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
            if (/\d/.test(v)) score++;
            if (/[^A-Za-z0-9]/.test(v)) score++;
            return score;
        }
    },

    watch: {
        'form.password'(v)        { if (v) this.errors.pw = ''; },
        'form.passwordConfirm'(v) { if (v) this.errors.pwConfirm = ''; }
    },

    mounted() {
        this.$nextTick(() => {
            this.doneModal = new bootstrap.Modal(this.$refs.doneModal);
        });
    },

    methods: {
        validatePassword(v) {
            if (!v) return '새 비밀번호를 입력해 주세요';
            if (v.length < 8 || v.length > 16) return '8-16자 길이로 입력해 주세요';
            const passes = /[A-Za-z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);
            if (!passes) return '영문, 숫자, 특수문자를 모두 포함해 주세요';
            return '';
        },

        submitNewPassword() {
            this.errors.pw = this.validatePassword(this.form.password);
            this.errors.pwConfirm = '';

            if (this.errors.pw) return;

            if (this.form.password !== this.form.passwordConfirm) {
                this.errors.pwConfirm = '비밀번호가 일치하지 않습니다';
                return;
            }

            if (this.doneModal) this.doneModal.show();
        },

        goLogin() {
            if (this.doneModal) this.doneModal.hide();
            this.navigateTo('/login');
        }
    }
};
