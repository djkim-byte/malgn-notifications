export default {
    name: 'AccountSettings',
    layout: 'default',

    data() {
        return {
            view: 'main',

            tabs: [
                { value: 'profile',  label: '회원 정보 변경' },
                { value: 'cards',    label: '결제 카드 관리' },
                { value: 'password', label: '비밀번호 변경' },
                { value: 'security', label: '보안로그인 설정' },
                { value: 'contract', label: '계약 관리' }
            ],
            activeTab: 'profile',

            // ----- 회원 정보 -----
            profile: {
                email: 'service@malgnsoft.com',
                companyName: '(주)맑은소프트',
                bizNo: '110-86-39050',
                ceoName: '하근호',
                bizType: '법인 사업자',
                industryType: '서비스',
                industryItem: '소프트웨어자문, 개발및공급',
                address: '087-97) 서울특별시 구로구 디지털로 288, 1701호(구로동, 대륭포스트타워1차)',
                marketingOptIn: true
            },
            contact: {
                name: '홍길동',
                companyPhone: '',
                email: 'service@malgnsoft.com',
                phone1: '010',
                phone2: '0000',
                phone3: '0000'
            },
            payment: {
                email: 'service@malgnsoft.com'
            },

            // ----- 결제 카드 -----
            primaryCardId: 1,
            cards: [
                { id: 1, brand: 'MASTER', number: '**********5547', imageNum: '5547' },
                { id: 2, brand: 'VISA',   number: '**********6118', imageNum: '6118' }
            ],

            // ----- 비밀번호 변경 -----
            passwordForm: {
                current: '',
                next: '',
                confirm: ''
            },
            errors: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },

            // ----- 보안로그인 -----
            security: {
                enabled: false,
                method: 'email',
                emailVerified: false,
                emailTarget: 'service@malgnsoft.com',
                phoneVerified: false,
                phoneTarget: '010-0000-0000',
                domains: [],
                domainInput: '',
                ips: [],
                ipInput: ''
            },

            // ----- 계약 관리 -----
            contract: {
                agreement: {
                    viewed: false,
                    signed: false,
                    signer: '',
                    signedAt: ''
                },
                bizCert: {
                    file: null,
                    uploadedAt: ''
                }
            },

            // ----- 결제 이메일 변경 폼 -----
            paymentEmailForm: {
                email: '',
                code: ['', '', '', '', '', ''],
                codeRequested: false,
                codeVerified: false,
                password: '',
                timer: 180
            },
            peErrors: {
                email: '',
                code: '',
                password: ''
            },
            peTimerHandle: null,

            // ----- 다이얼로그 상태 -----
            alertState: {
                text: '',
                desc: '',
                iconName: 'bi bi-exclamation-lg',
                iconClass: 'is-info'
            },
            confirmState: {
                text: '',
                desc: '',
                iconName: 'bi bi-exclamation-lg',
                iconClass: 'is-info'
            },
            confirmAction: null,

            alertModal: null,
            confirmModal: null
        };
    },

    computed: {
        isCodeFilled() {
            return this.paymentEmailForm.code.every(c => c && c.length === 1);
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.alertModal   = new bootstrap.Modal(this.$refs.alertModal);
            this.confirmModal = new bootstrap.Modal(this.$refs.confirmModal);
        });
    },

    beforeUnmount() {
        if (this.peTimerHandle) clearInterval(this.peTimerHandle);
    },

    methods: {
        showAlert(text, opts = {}) {
            this.alertState = {
                text,
                desc: opts.desc || '',
                iconName: opts.iconName || 'bi bi-exclamation-lg',
                iconClass: opts.iconClass || 'is-info'
            };
            if (this.alertModal) this.alertModal.show();
        },

        showConfirm(text, action, opts = {}) {
            this.confirmState = {
                text,
                desc: opts.desc || '',
                iconName: opts.iconName || 'bi bi-question-lg',
                iconClass: opts.iconClass || 'is-info'
            };
            this.confirmAction = action;
            if (this.confirmModal) this.confirmModal.show();
        },

        confirmActionRun() {
            const fn = this.confirmAction;
            if (this.confirmModal) this.confirmModal.hide();
            this.confirmAction = null;
            if (typeof fn === 'function') fn();
        },

        // ============== 회원 정보 변경 ==============
        saveProfile() {
            this.showAlert('회원정보가 저장되었습니다.');
        },

        askDeleteAccount() {
            this.showConfirm(
                '계정을 삭제하시겠어요?',
                () => {
                    this.showAlert('계정 삭제 요청이 접수되었습니다.', {
                        desc: '관리자 확인 후 처리됩니다.'
                    });
                },
                {
                    desc: '계정 삭제 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.',
                    iconName: 'bi bi-exclamation-triangle-fill',
                    iconClass: 'is-danger'
                }
            );
        },

        openPaymentEmailChange() {
            this.view = 'change-payment-email';
            this.paymentEmailForm = {
                email: '',
                code: ['', '', '', '', '', ''],
                codeRequested: false,
                codeVerified: false,
                password: '',
                timer: 180
            };
            this.peErrors = { email: '', code: '', password: '' };
        },

        backToMain() {
            this.view = 'main';
            if (this.peTimerHandle) {
                clearInterval(this.peTimerHandle);
                this.peTimerHandle = null;
            }
        },

        // ============== 결제 카드 관리 ==============
        askPrimaryCard(card) {
            this.showConfirm(
                `${card.brand}(*****${card.imageNum}) 카드를 대표카드로 등록 하시겠습니까?`,
                () => {
                    this.primaryCardId = card.id;
                }
            );
        },

        askDeleteCard(card) {
            if (this.cards.length <= 1) {
                this.showAlert('1개 이상 카드가 등록되어있어야 합니다.');
                return;
            }
            this.showConfirm(
                `${card.brand}(*****${card.imageNum}) 카드를 삭제하시겠어요?`,
                () => {
                    const idx = this.cards.findIndex(c => c.id === card.id);
                    if (idx >= 0) this.cards.splice(idx, 1);
                    if (this.primaryCardId === card.id && this.cards.length) {
                        this.primaryCardId = this.cards[0].id;
                    }
                }
            );
        },

        addCard() {
            this.navigateTo('/charge', { addCard: 1 });
        },

        saveCards() {
            this.showAlert('결제 카드 정보가 저장되었습니다.');
        },

        // ============== 비밀번호 변경 ==============
        savePassword() {
            this.errors = { currentPassword: '', newPassword: '', confirmPassword: '' };
            const { current, next, confirm } = this.passwordForm;
            let ok = true;
            if (!current) { this.errors.currentPassword = '비밀번호를 입력해 주세요'; ok = false; }
            if (!next || next.length < 8 || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(next)) {
                this.errors.newPassword = '비밀번호를 입력해 주세요';
                ok = false;
            }
            if (next !== confirm) { this.errors.confirmPassword = '비밀번호가 맞지 않습니다. 다시 입력해 주세요.'; ok = false; }
            if (!ok) return;

            this.passwordForm = { current: '', next: '', confirm: '' };
            this.showAlert('새로운 비밀번호로 저장되었습니다.');
        },

        goResetPassword() {
            this.navigateTo('/reset-password');
        },

        // ============== 보안로그인 ==============
        verifySecurityEmail() {
            this.showAlert('이메일로 인증코드가 발송되었습니다.', {
                desc: '3분내 인증코드를 등록해 주세요',
                iconName: 'bi bi-envelope-check',
                iconClass: 'is-info'
            });
            this.security.emailVerified = true;
        },

        verifySecurityPhone() {
            this.showAlert('휴대폰으로 인증번호가 발송되었습니다.', {
                desc: '3분내 인증번호를 등록해 주세요',
                iconName: 'bi bi-phone-vibrate',
                iconClass: 'is-info'
            });
            this.security.phoneVerified = true;
        },

        addDomain() {
            const v = (this.security.domainInput || '').trim();
            if (!v) return;
            const ok = /^[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v);
            if (!ok) {
                this.showAlert('도메인 형식이 올바르지 않습니다.');
                return;
            }
            if (this.security.domains.includes(v)) {
                this.showAlert('이미 등록된 도메인입니다.');
                return;
            }
            this.security.domains.push(v);
            this.security.domainInput = '';
        },

        removeDomain(i) {
            this.security.domains.splice(i, 1);
        },

        addIp() {
            const v = (this.security.ipInput || '').trim();
            if (!v) return;
            const ok = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/.test(v);
            if (!ok) {
                this.showAlert('IP 형식이 올바르지 않습니다.');
                return;
            }
            if (this.security.ips.includes(v)) {
                this.showAlert('이미 등록된 IP입니다.');
                return;
            }
            this.security.ips.push(v);
            this.security.ipInput = '';
        },

        removeIp(i) {
            this.security.ips.splice(i, 1);
        },

        saveSecurity() {
            if (this.security.enabled) {
                if (this.security.method === 'email' && !this.security.emailVerified) {
                    this.showAlert('이메일 인증을 완료해 주세요.');
                    return;
                }
                if (this.security.method === 'phone' && !this.security.phoneVerified) {
                    this.showAlert('휴대폰 인증을 완료해 주세요.');
                    return;
                }
            }
            this.showAlert('보안로그인 설정이 저장되었습니다.');
        },

        // ============== 계약 관리 ==============
        viewContract() {
            this.contract.agreement.viewed = true;
            this.showAlert('이용계약서를 확인하였습니다.', {
                desc: '계약서 확인이 완료되었습니다. 전자서명을 진행해 주세요.',
                iconName: 'bi bi-file-earmark-text',
                iconClass: 'is-info'
            });
        },

        signContract() {
            if (!this.contract.agreement.viewed && !this.contract.agreement.signed) {
                this.showAlert('계약서 확인 후 서명을 진행할 수 있습니다.');
                return;
            }
            this.showConfirm(
                '공인인증서로 전자서명을 진행하시겠어요?',
                () => {
                    this.contract.agreement.signed = true;
                    this.contract.agreement.signer = this.profile.ceoName;
                    this.contract.agreement.signedAt = this.formatNow();
                    this.showAlert('전자서명이 완료되었습니다.', {
                        iconName: 'bi bi-shield-check',
                        iconClass: 'is-success'
                    });
                },
                {
                    desc: '공인인증서 모듈이 실행됩니다.',
                    iconName: 'bi bi-shield-lock',
                    iconClass: 'is-info'
                }
            );
        },

        triggerBizCertUpload() {
            if (this.$refs.bizCertInput) this.$refs.bizCertInput.click();
        },

        onBizCertChange(e) {
            const file = e.target.files && e.target.files[0];
            if (file) this.applyBizCertFile(file);
            e.target.value = '';
        },

        onBizCertDrop(e) {
            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            if (file) this.applyBizCertFile(file);
        },

        applyBizCertFile(file) {
            if (file.size > 10 * 1024 * 1024) {
                this.showAlert('파일 용량이 10MB를 초과합니다.');
                return;
            }
            this.contract.bizCert.file = file;
            this.contract.bizCert.uploadedAt = this.formatNow();
        },

        removeBizCert() {
            this.showConfirm(
                '사업자등록증 파일을 삭제하시겠어요?',
                () => {
                    this.contract.bizCert.file = null;
                    this.contract.bizCert.uploadedAt = '';
                }
            );
        },

        formatFileSize(bytes) {
            if (!bytes && bytes !== 0) return '';
            const kb = bytes / 1024;
            if (kb < 1024) return kb.toFixed(1) + ' KB';
            return (kb / 1024).toFixed(1) + ' MB';
        },

        formatNow() {
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        },

        saveContract() {
            this.showAlert('계약 정보가 저장되었습니다.');
        },

        // ============== 결제 이메일 변경 ==============
        sendPaymentEmailCode() {
            this.peErrors.email = '';
            const v = (this.paymentEmailForm.email || '').trim();
            if (!v) {
                this.peErrors.email = '이메일 주소를 입력해 주세요';
                return;
            }
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(v)) {
                this.peErrors.email = '이메일 형식이 올바르지 않습니다.';
                return;
            }
            this.paymentEmailForm.codeRequested = true;
            this.paymentEmailForm.codeVerified = false;
            this.paymentEmailForm.code = ['', '', '', '', '', ''];
            this.paymentEmailForm.timer = 180;
            this.startCodeTimer();
            this.showAlert('이메일로 인증코드가 발송되었습니다.', {
                desc: '3분내 인증코드를 등록해 주세요'
            });
        },

        startCodeTimer() {
            if (this.peTimerHandle) clearInterval(this.peTimerHandle);
            this.peTimerHandle = setInterval(() => {
                if (this.paymentEmailForm.timer > 0) {
                    this.paymentEmailForm.timer -= 1;
                } else {
                    clearInterval(this.peTimerHandle);
                    this.peTimerHandle = null;
                }
            }, 1000);
        },

        formatTimer(sec) {
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            return `${m}분 ${String(s).padStart(2, '0')}초`;
        },

        onCodeInput(i) {
            const v = (this.paymentEmailForm.code[i] || '').replace(/[^0-9]/g, '').slice(0, 1);
            this.paymentEmailForm.code[i] = v;
            const refs = this.$refs.codeInputs;
            if (v && i < 5 && refs && refs[i + 1]) {
                refs[i + 1].focus();
            }
        },

        verifyPaymentEmailCode() {
            this.peErrors.code = '';
            if (!this.isCodeFilled) {
                this.peErrors.code = '인증코드를 입력해 주세요 ({0}분 남음)';
                return;
            }
            this.paymentEmailForm.codeVerified = true;
            this.showAlert('인증되었습니다.');
        },

        submitPaymentEmail() {
            this.peErrors = { email: '', code: '', password: '' };
            let ok = true;
            const { email, codeVerified, password } = this.paymentEmailForm;

            if (!email.trim()) {
                this.peErrors.email = '이메일 주소를 입력해 주세요';
                ok = false;
            }
            if (!codeVerified) {
                this.peErrors.code = '이메일로 보내 드린 인증코드를 입력해 주세요.';
                ok = false;
            }
            if (!password) {
                this.peErrors.password = '비밀번호가 맞지 않네요. 다시 입력해 주세요';
                ok = false;
            }

            if (!ok) return;

            this.payment.email = email;
            this.view = 'change-payment-email-done';
            if (this.peTimerHandle) {
                clearInterval(this.peTimerHandle);
                this.peTimerHandle = null;
            }
        }
    }
};
