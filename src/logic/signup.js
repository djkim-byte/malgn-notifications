export default {
    layout: 'default',

    data() {
        return {
            currentStep: 1,
            steps: [
                { key: 'guide',   label: '회원 가입 안내' },
                { key: 'company', label: '기업 정보 확인' },
                { key: 'account', label: '아이디 등록 및 약관 동의' },
                { key: 'phone',   label: '본인 인증' },
                { key: 'done',    label: '가입 완료' }
            ],

            serviceFlow: [
                { key: 'join',     cap: '홈페이지',    name: '회원 가입' },
                { key: 'consult',  cap: '영업사원',    name: '협의' },
                { key: 'apply',    cap: '가입신청서',  name: '로그인 후 작성' },
                { key: 'approve',  cap: '승인',        name: '정보 확인 후 승인' },
                { key: 'use',      cap: '서비스 이용', name: '충전 후 사용' }
            ],

            company: {
                type: 'corp',
                bizNo1: '',
                bizNo2: '',
                bizNo3: '',
                name: '',
                ceo: '',
                alreadyRegistered: false
            },

            account: {
                email: '',
                otp: ['', '', '', '', '', ''],
                otpSent: false,
                otpVerified: false,
                password: '',
                passwordConfirm: ''
            },

            otpRefs: [],

            terms: [
                { key: 'service',   label: '서비스 이용약관 동의',          required: true,  checked: false },
                { key: 'spam',      label: '스팸메시지 이용약관 동의',      required: true,  checked: false },
                { key: 'privacy',   label: '개인정보 수집 및 이용동의',     required: true,  checked: false },
                { key: 'marketing', label: '광고성 메시지 활용 동의 안내',  required: false, checked: false }
            ],

            agreeAll: false,
            activeTermKey: null,

            phone: {
                prefix: '010',
                mid: '',
                last: '',
                code: '',
                sent: false,
                verified: false,
                formatted: ''
            },

            errors: {
                bizNo: false,
                name: false,
                ceo: false,
                email: false,
                otpEmpty: false,
                otpInvalid: false,
                passwordMismatch: false,
                terms: false,
                phoneEmpty: false,
                phoneCodeEmpty: false,
                phoneCodeInvalid: false
            },

            otpAlertModal: null,
            termsModal: null,
            phoneAlertModal: null
        };
    },

    computed: {
        formattedBizNo() {
            const { bizNo1, bizNo2, bizNo3 } = this.company;
            if (!bizNo1 && !bizNo2 && !bizNo3) return '';
            return `${bizNo1}-${bizNo2}-${bizNo3}`;
        },

        canSubmitCompany() {
            return !!(this.company.bizNo1 && this.company.bizNo2 && this.company.bizNo3
                && this.company.name && this.company.ceo);
        },

        canVerifyOtp() {
            return this.account.otp.every(d => d !== '') && this.account.otpSent;
        },

        passwordMatches() {
            return this.account.password
                && this.account.password === this.account.passwordConfirm;
        },

        passwordMatchClass() {
            return this.passwordMatches ? 'is-match' : 'is-mismatch';
        },

        canSubmitAccount() {
            const requiredAgreed = this.terms.every(t => !t.required || t.checked);
            return this.account.otpVerified
                && this.account.password
                && this.passwordMatches
                && requiredAgreed;
        },

        hasCompanyError() {
            return this.errors.bizNo || this.errors.name || this.errors.ceo;
        },

        hasAccountError() {
            return this.errors.email
                || this.errors.otpEmpty
                || this.errors.otpInvalid
                || this.errors.passwordMismatch
                || this.errors.terms;
        },

        canVerifyPhone() {
            return this.phone.sent && this.phone.code.length > 0;
        },

        hasPhoneError() {
            return this.errors.phoneEmpty
                || this.errors.phoneCodeEmpty
                || this.errors.phoneCodeInvalid;
        },

        activeTerm() {
            return this.terms.find(t => t.key === this.activeTermKey) || null;
        },

        activeTermTitle() {
            const map = {
                service:   '이용약관',
                spam:      '스팸메시지 이용약관',
                privacy:   '개인정보 수집 및 이용동의',
                marketing: '광고성 정보 수신 동의'
            };
            return map[this.activeTermKey] || '';
        },

        activeTermContent() {
            const map = {
                service: `
                    <h3>제1조 목적</h3>
                    <ul>
                        <li>본 약관은 (주)맑은소프트(이하 회사)가 제공하는 '맑은 메시징 서비스'를 이용하는 '회원'과 '회사'와의 권리, 의무 및 책임사항, 기타 제반 사항을 규정함을 목적으로 합니다.</li>
                    </ul>

                    <h3>제2조 정의</h3>
                    <ul>
                        <li>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</li>
                        <li>① 서비스 : 회사가 제공하는 디지털 콘텐츠, 이용 권한, 웹 페이지, 서버, 네트워크 등의 회원이 이용할 수 있는 메시징 제반 서비스를 의미합니다.</li>
                        <li>② 회원 : 서비스에 접속하여 이 약관에 따라 서비스에 회원가입을 한 자로서, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                        <li>③ 계정 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인 하는 문자와 숫자의 조합을 의미합니다.</li>
                        <li>④ 비밀번호 : 회원이 부여 받은 계정 아이디(ID)와 일치되는 회원임을 확인하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
                        <li>⑤ 게시물 : 회원이 서비스를 이용함에 있어 서비스상에 게시한 부호 · 문자 · 음성 · 음향 · 화상 · 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
                    </ul>

                    <h3>제3조 약관의 게시와 개정</h3>
                    <ul>
                        <li>① 본 약관의 내용은 서비스 사이트에 게시하여 공시하고, 이에 동의한 고객이 서비스에 회원가입함으로써 효력이 발생합니다.</li>
                        <li>② 회사는 합리적인 사유가 발생할 경우 '약관의규제에관한법률', '정보통신망이용촉진및정보보호등에관한법률' 등 관련법령에 위배되지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                        <li>③ 회사가 약관을 개정할 경우에는 시행일 및 개정 사유를 명시하여 서비스 사이트에 시행일 7일전 공지합니다.</li>
                        <li>④ 회사가 전항에 따라 개정약관을 공지 또는 통지하면서 회원에게 7일 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정 약관에 동의한 것으로 봅니다.</li>
                        <li>⑤ 회원이 개정 약관의 적용에 동의하지 않는 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다.</li>
                    </ul>

                    <h3>제4조 약관의 해석</h3>
                    <ul>
                        <li>① 회사는 유료약정상품 등 개별 서비스에 대해서는 별도의 특별 약관 및 정책을 둘 수 있으며, 해당 내용이 본 약관과 상충될 경우에는 특별 약관이 우선하여 적용됩니다.</li>
                        <li>② 본 약관에 명시되지 아니한 사항에 대해서는 관계법령, 상관례 및 서비스별 안내에 따릅니다.</li>
                    </ul>

                    <h3>제5조 회원가입 신청 및 약관 동의</h3>
                    <ul>
                        <li>① 회원가입 신청은 회원이 회사가 정한 양식에 따라 회원정보를 기입한 후 신청하는 것으로 이루어집니다. 본 약관에 대한 동의는 회원가입 신청 당시 '이용약관 동의'에 체크함으로써 의사표시를 합니다.</li>
                        <li>② 제1항에 따른 회원가입 신청에 있어 회사는 필요한 경우에 회사는 회원에게 별도의 구비서류를 요청할 수 있으며, 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.</li>
                    </ul>
                `,
                spam: `
                    <h3>제1조 목적</h3>
                    <ul>
                        <li>본 약관은 (주)맑은소프트(이하 회사)가 제공하는 메시지 발송 서비스를 이용함에 있어 스팸성 메시지 발송 방지 및 관련 의무사항을 규정함을 목적으로 합니다.</li>
                    </ul>

                    <h3>제2조 스팸메시지 정의</h3>
                    <ul>
                        <li>① 스팸메시지란 수신자의 명시적인 사전 동의 없이 발송되는 영리 목적의 광고성 정보를 의미합니다.</li>
                        <li>② 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제50조에 따른 광고성 정보 전송 제한에 위배되는 메시지를 포함합니다.</li>
                        <li>③ 야간 시간대(21시~익일 08시)에 사전 별도 동의 없이 발송되는 광고성 정보를 포함합니다.</li>
                    </ul>

                    <h3>제3조 발송자의 의무</h3>
                    <ul>
                        <li>① 회원은 광고성 정보 전송 시 (광고) 표기 및 발신자 정보, 무료 수신거부 방법을 반드시 명시해야 합니다.</li>
                        <li>② 회원은 수신자로부터 사전 수신동의를 받아야 하며, 동의 증빙자료를 보관해야 합니다.</li>
                        <li>③ 회원은 수신거부 의사를 표시한 자에게 광고성 정보를 전송할 수 없습니다.</li>
                        <li>④ 발신번호 변작, 미등록 번호로의 발송 등 부정한 방법의 발송을 금지합니다.</li>
                    </ul>

                    <h3>제4조 위반 시 조치</h3>
                    <ul>
                        <li>① 회사는 스팸메시지 발송이 의심되는 경우 사전 통보 없이 즉시 발송을 중단할 수 있습니다.</li>
                        <li>② 관련 법령 위반에 따른 과태료, 손해배상 등 모든 책임은 발송자(회원)에게 있습니다.</li>
                        <li>③ 반복적·악의적 위반 시 서비스 이용계약이 해지될 수 있으며, 재가입이 제한될 수 있습니다.</li>
                    </ul>
                `,
                privacy: `
                    <h3>제1조 수집하는 개인정보 항목</h3>
                    <ul>
                        <li>① 필수항목 : 이메일 주소, 비밀번호, 휴대폰번호, 사업자등록번호, 회사명, 대표자명</li>
                        <li>② 자동수집 항목 : IP 주소, 쿠키, 서비스 이용기록, 접속 로그, 기기정보</li>
                        <li>③ 결제 시 추가수집 : 카드정보(토큰화 처리), 결제 승인 정보</li>
                    </ul>

                    <h3>제2조 개인정보 수집 및 이용 목적</h3>
                    <ul>
                        <li>① 회원 가입 의사 확인 및 회원 식별·인증</li>
                        <li>② 서비스 제공 및 요금 정산, 콘텐츠 전송, 청구서 발송</li>
                        <li>③ 고객 문의 응대 및 분쟁 조정을 위한 기록 보존</li>
                        <li>④ 신규 서비스 개발, 통계 분석, 서비스 개선</li>
                        <li>⑤ 법령 및 약관 위반 행위에 대한 제재 및 분쟁 처리</li>
                    </ul>

                    <h3>제3조 개인정보 보유 및 이용기간</h3>
                    <ul>
                        <li>① 원칙적으로 회원 탈퇴 시 즉시 파기합니다.</li>
                        <li>② 다만, 관계 법령에 따라 일정 기간 보관해야 하는 정보는 해당 기간 동안 보관합니다.
                            (전자상거래법: 계약·결제기록 5년, 소비자 불만·분쟁처리 기록 3년, 통신비밀보호법: 로그 기록 3개월)</li>
                    </ul>

                    <h3>제4조 동의 거부 권리</h3>
                    <ul>
                        <li>① 회원은 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다.</li>
                        <li>② 다만, 필수 항목에 대한 동의 거부 시 회원가입 및 서비스 이용이 제한될 수 있습니다.</li>
                    </ul>
                `,
                marketing: `
                    <h3>제1조 목적</h3>
                    <ul>
                        <li>본 약관은 (주)맑은소프트가 제공하는 신규 서비스, 이벤트, 프로모션 등 광고성 정보 수신과 관련된 사항을 안내합니다.</li>
                    </ul>

                    <h3>제2조 광고성 정보 수신 항목</h3>
                    <ul>
                        <li>① 신규 서비스, 신상품, 기능 업데이트 안내</li>
                        <li>② 할인, 쿠폰, 이벤트, 프로모션 등 마케팅 혜택 안내</li>
                        <li>③ 고객 맞춤형 추천 콘텐츠 및 활용 가이드</li>
                    </ul>

                    <h3>제3조 수신 방법 및 채널</h3>
                    <ul>
                        <li>① 이메일, 문자메시지(SMS/LMS/MMS), 카카오톡, PUSH 알림 등의 채널로 발송됩니다.</li>
                        <li>② 야간 시간대(21시~익일 08시)에는 별도 동의 없이 광고성 정보를 발송하지 않습니다.</li>
                    </ul>

                    <h3>제4조 동의 철회</h3>
                    <ul>
                        <li>① 본 동의는 선택사항이며, 동의하지 않아도 회원가입 및 서비스 이용에는 영향이 없습니다.</li>
                        <li>② 동의 후에도 마이페이지 > 알림 설정 또는 수신 메시지의 수신거부 기능을 통해 언제든지 철회할 수 있습니다.</li>
                        <li>③ 철회 의사 표시 후에도 회원의 거래 관련 정보(결제, 청구 등)는 계속 발송됩니다.</li>
                    </ul>
                `
            };
            return map[this.activeTermKey] || '';
        }
    },

    watch: {
        'company.bizNo1'(v) { if (v) this.errors.bizNo = false; },
        'company.bizNo2'(v) { if (v) this.errors.bizNo = false; },
        'company.bizNo3'(v) { if (v) this.errors.bizNo = false; },
        'company.name'(v)   { if (v) this.errors.name = false; },
        'company.ceo'(v)    { if (v) this.errors.ceo = false; },
        'account.email'(v)  { if (v) this.errors.email = false; },
        'account.password'() { this.errors.passwordMismatch = false; },
        'account.passwordConfirm'() { this.errors.passwordMismatch = false; },
        'phone.mid'()  { this.errors.phoneEmpty = false; },
        'phone.last'() { this.errors.phoneEmpty = false; },
        'phone.code'() {
            this.errors.phoneCodeEmpty = false;
            this.errors.phoneCodeInvalid = false;
        },
        terms: {
            handler() { this.errors.terms = false; },
            deep: true
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.otpAlertModal = new bootstrap.Modal(this.$refs.otpAlertModal);
            this.termsModal = new bootstrap.Modal(this.$refs.termsModal);
            this.phoneAlertModal = new bootstrap.Modal(this.$refs.phoneAlertModal);
        });
    },

    methods: {
        goToStep(n) {
            this.currentStep = n;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        submitCompany() {
            this.errors.bizNo = !(this.company.bizNo1 && this.company.bizNo2 && this.company.bizNo3);
            this.errors.name  = !this.company.name;
            this.errors.ceo   = !this.company.ceo;
            if (this.errors.bizNo || this.errors.name || this.errors.ceo) return;

            this.goToStep(3);
        },

        sendVerifyCode() {
            if (!this.account.email) {
                this.errors.email = true;
                return;
            }
            this.errors.email = false;
            this.account.otpSent = true;
            this.otpAlertModal.show();
        },

        confirmOtpSent() {
            this.otpAlertModal.hide();
            const url = window.location.origin + window.location.pathname + '#/templete/email/verify';
            window.open(url, '_blank');
        },

        onOtpInput(idx, e) {
            const v = e.target.value.replace(/\D/g, '').slice(0, 1);
            this.account.otp[idx] = v;
            if (v && idx < 5 && this.otpRefs[idx + 1]) {
                this.otpRefs[idx + 1].focus();
            }
        },

        onOtpKeydown(idx, e) {
            if (e.key === 'Backspace' && !this.account.otp[idx] && idx > 0 && this.otpRefs[idx - 1]) {
                this.otpRefs[idx - 1].focus();
            }
        },

        verifyOtp() {
            const code = this.account.otp.join('');
            this.errors.otpEmpty = !code;
            this.errors.otpInvalid = false;

            if (code.length === 6) {
                this.account.otpVerified = true;
            } else {
                this.account.otpVerified = false;
            }
        },

        toggleAgreeAll() {
            this.terms.forEach(t => { t.checked = this.agreeAll; });
        },

        syncAgreeAll() {
            this.agreeAll = this.terms.every(t => t.checked);
        },

        openTerms(key) {
            this.activeTermKey = key;
            if (!this.termsModal && this.$refs.termsModal) {
                this.termsModal = new bootstrap.Modal(this.$refs.termsModal);
            }
            if (this.termsModal) this.termsModal.show();
        },

        agreeActiveTerm() {
            const t = this.terms.find(t => t.key === this.activeTermKey);
            if (t) t.checked = true;
            this.syncAgreeAll();
            this.termsModal.hide();
        },

        submitAccount() {
            this.errors.passwordMismatch = !this.passwordMatches;
            this.errors.terms = !this.terms.every(t => !t.required || t.checked);
            if (this.errors.passwordMismatch || this.errors.terms) return;
            if (!this.account.otpVerified) {
                this.errors.otpEmpty = !this.account.otp.join('');
                return;
            }
            this.goToStep(4);
        },

        sendPhoneCode() {
            if (!this.phone.mid || !this.phone.last) {
                this.errors.phoneEmpty = true;
                return;
            }
            this.errors.phoneEmpty = false;
            this.phone.sent = true;
            if (!this.phoneAlertModal && this.$refs.phoneAlertModal) {
                this.phoneAlertModal = new bootstrap.Modal(this.$refs.phoneAlertModal);
            }
            if (this.phoneAlertModal) this.phoneAlertModal.show();
        },

        completePhoneVerify() {
            if (!this.phone.code || this.phone.code.length !== 6) {
                this.errors.phoneCodeEmpty = !this.phone.code;
                this.errors.phoneCodeInvalid = false;
                return;
            }
            this.errors.phoneCodeEmpty = false;
            this.errors.phoneCodeInvalid = false;
            this.phone.verified = true;
            this.phone.formatted = `${this.phone.prefix}-${this.phone.mid}-${this.phone.last}`;
        },

        finishSignup() {
            this.goToStep(5);
        },

        goLogin() {
            this.navigateTo('/login');
        }
    }
};
