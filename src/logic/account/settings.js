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
                { value: 'multi',    label: '멀티 계정 추가', businessOnly: true },
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
                userType: 'corp',  // 'corp' | 'indiv' | 'person'
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
                // 이용계약서 리스트 (status: 'initial' | 'active' | 'expired' | 'pending')
                agreements: [],

                // 사업자등록증
                bizCert: {
                    current: null,
                    history: []
                },
                // 대부업등록증 (해당업체에 한함)
                lendingCert: {
                    applicable: false,
                    current: null,
                    history: []
                },
                // 지급이행보증보험증권 (후불 정산 해당업체에 한함)
                paymentBondCert: {
                    applicable: false,
                    current: null,
                    history: []
                }
            },

            // 마법사가 어떤 계약을 체결 중인지 추적 (null=신규, 객체=갱신 대상)
            signingTarget: null,

            // 계약체결 마법사 (3단계)
            signWizard: {
                step: 1,
                steps: [
                    {
                        id: 1,
                        title: '제1장 · 총칙 및 서비스 이용',
                        confirmed: false,
                        scrolledToEnd: false
                    },
                    {
                        id: 2,
                        title: '제2장 · 이용요금 및 결제',
                        confirmed: false,
                        scrolledToEnd: false
                    },
                    {
                        id: 3,
                        title: '제3장 · 전자서명 / 공인인증',
                        confirmed: false,
                        scrolledToEnd: false
                    }
                ],
                signMethod: 'sign',          // 'sign' | 'cert'
                signerName: '',
                hasSignature: false,
                isDrawing: false,
                lastPoint: null
            },

            // 모달용 뷰어 상태
            docViewer: {
                title: '',
                subtitle: '',
                fileName: '',
                kind: 'pdf',                 // 'pdf' | 'contract'
                contract: null
            },

            signModal: null,
            docViewerModal: null,
            multiAuthModal: null,

            // ----- 멀티 계정 추가 (본인 인증 내역) -----
            multiAuth: {
                verifications: [
                    {
                        id: 'MA-0001',
                        memberType: '사업자 멀티계정',
                        memberName: '김덕조',
                        documents: '사업자등록증, 재직증명서',
                        status: 'approved',
                        requestedAt: '2026-04-13 16:41',
                        verifiedAt: '2026-04-13 18:52'
                    }
                ]
            },

            // ----- 멀티 계정 추가 - 휴대폰 본인인증 + 재직증명서 첨부 모달 폼 -----
            multiAuthForm: {
                memberName: '',
                phonePrefix: '010',
                phoneMid: '',
                phoneLast: '',
                code: '',
                codeSent: false,
                codeVerified: false,
                certFile: null  // { name, size }
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
            alertAction: null,

            alertModal: null,
            confirmModal: null
        };
    },

    computed: {
        isCodeFilled() {
            return this.paymentEmailForm.code.every(c => c && c.length === 1);
        },
        visibleTabs() {
            const isBusiness = this.profile.userType === 'corp' || this.profile.userType === 'indiv';
            return this.tabs.filter(t => !t.businessOnly || isBusiness);
        },
        canSubmitMultiAuth() {
            const f = this.multiAuthForm;
            return !!(f.memberName.trim() && f.codeVerified && f.certFile);
        },
        currentSignStep() {
            return this.signWizard.steps.find(s => s.id === this.signWizard.step);
        },
        canConfirmCurrentStep() {
            const s = this.currentSignStep;
            if (!s) return false;
            if (this.signWizard.step === 3) {
                return this.signWizard.hasSignature && !!this.signWizard.signerName.trim();
            }
            return s.scrolledToEnd;
        },
        signProgressPercent() {
            const total = this.signWizard.steps.length;
            const done  = this.signWizard.steps.filter(s => s.confirmed).length;
            return Math.round((done / total) * 100);
        }
    },

    mounted() {
        this.seedContractDemo();
        this.$nextTick(() => {
            this.alertModal     = new bootstrap.Modal(this.$refs.alertModal);
            this.confirmModal   = new bootstrap.Modal(this.$refs.confirmModal);
            this.signModal      = new bootstrap.Modal(this.$refs.signModal, { backdrop: 'static', keyboard: false });
            this.docViewerModal = new bootstrap.Modal(this.$refs.docViewerModal);
            this.multiAuthModal = new bootstrap.Modal(this.$refs.multiAuthModal, { backdrop: 'static', keyboard: false });
            window.openPopupFromQuery && window.openPopupFromQuery(this);
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
            this.alertAction = typeof opts.onConfirm === 'function' ? opts.onConfirm : null;
            if (this.alertModal) this.alertModal.show();
        },

        runAlertAction() {
            const fn = this.alertAction;
            if (this.alertModal) this.alertModal.hide();
            this.alertAction = null;
            if (typeof fn === 'function') fn();
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
        seedContractDemo() {
            // 데모 리스트 (최초계약 / 체결완료 / 계약갱신 각 1건)
            this.contract.agreements = [
                {
                    id: 'AGR-INIT-0001',
                    title: '최초 이용계약 온라인체결',
                    version: '신규',
                    signer: '-',
                    signedAt: '-',
                    expiredAt: '-',
                    requestedAt: this.formatNow(),
                    deadlineAt: '',
                    status: 'initial'
                },
                {
                    id: 'AGR-2022-0001',
                    title: '맑은소프트 메시징 이용계약서 (2022년 구표준)',
                    version: 'v0.9',
                    signer: '하근호',
                    signedAt: '2022.06.02 09:30',
                    expiredAt: '2026.04.19',
                    status: 'active'
                },
                {
                    id: 'AGR-2026-RNW-0001',
                    title: '맑은소프트 메시징 이용계약서 (2026년 신규)',
                    version: 'v2.0',
                    signer: '-',
                    signedAt: '-',
                    expiredAt: '-',
                    requestedAt: '2026.05.01 09:00',
                    deadlineAt: '2026.05.31',
                    status: 'pending'
                }
            ];

            // 사업자등록증 이력(첨부 일자 노출용 데모)
            const today = new Date();
            const todayYmd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
            this.contract.bizCert.history = [
                {
                    id: 'BIZ-TODAY-001',
                    name: `사업자등록증_맑은소프트_${todayYmd}.pdf`,
                    size: 412 * 1024,
                    uploadedAt: this.formatNow()
                },
                {
                    id: 'BIZ-2023-001',
                    name: '사업자등록증_맑은소프트_20230110.pdf',
                    size: 412 * 1024,
                    uploadedAt: '2023.01.10 11:08'
                }
            ];

            this.contract.lendingCert.history = [];
            this.contract.paymentBondCert.history = [];
        },

        // ----- 상태 표시 헬퍼 -----
        statusIconClass(status) {
            switch (status) {
                case 'initial': return 'bi bi-pencil-square';
                case 'active':  return 'bi bi-patch-check-fill';
                case 'expired': return 'bi bi-archive-fill';
                case 'pending': return 'bi bi-exclamation-circle-fill';
                default:        return 'bi bi-file-earmark-text';
            }
        },
        statusLabel(status) {
            switch (status) {
                case 'initial': return '최초계약';
                case 'active':  return '체결완료';
                case 'expired': return '만료';
                case 'pending': return '계약갱신';
                default:        return '';
            }
        },
        needsSigning(status) {
            return status === 'initial' || status === 'pending';
        },

        // ----- 계약체결 마법사 -----
        openSignWizard(target = null) {
            this.signingTarget = target;
            this.signWizard.step = 1;
            this.signWizard.signMethod = 'sign';
            this.signWizard.signerName = this.profile.ceoName || '';
            this.signWizard.hasSignature = false;
            this.signWizard.isDrawing = false;
            this.signWizard.lastPoint = null;
            this.signWizard.steps.forEach(s => {
                s.confirmed = false;
                s.scrolledToEnd = false;
            });
            if (this.signModal) this.signModal.show();
            this.$nextTick(() => this.bindSignDocScroll());
        },

        closeSignWizard() {
            if (this.signModal) this.signModal.hide();
        },

        bindSignDocScroll() {
            // 현재 단계의 문서 스크롤이 끝까지 내려갔을 때만 '확인하였음' 활성화
            const el = this.$refs.signDoc;
            if (!el) return;
            // 짧은 문서일 때 즉시 활성화
            if (el.scrollHeight - el.clientHeight <= 4) {
                if (this.currentSignStep) this.currentSignStep.scrolledToEnd = true;
            }
        },

        onSignDocScroll(e) {
            if (this.signWizard.step === 3) return;
            const el = e.target;
            const reachedEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
            if (reachedEnd && this.currentSignStep) {
                this.currentSignStep.scrolledToEnd = true;
            }
        },

        confirmSignStep() {
            const cur = this.currentSignStep;
            if (!cur) return;
            if (!this.canConfirmCurrentStep) return;

            cur.confirmed = true;

            if (this.signWizard.step < 3) {
                this.signWizard.step += 1;
                // 다음 단계 진입 후 스크롤 상태 초기화
                this.$nextTick(() => {
                    const el = this.$refs.signDoc;
                    if (el) el.scrollTop = 0;
                    this.bindSignDocScroll();
                });
            } else {
                // 마지막 단계: 서명 완료
                this.completeSigning();
            }
        },

        prevSignStep() {
            if (this.signWizard.step > 1) {
                this.signWizard.step -= 1;
                this.$nextTick(() => {
                    const el = this.$refs.signDoc;
                    if (el) el.scrollTop = el.scrollHeight; // 이미 본 문서이므로 끝으로
                    this.bindSignDocScroll();
                });
            }
        },

        completeSigning() {
            const target = this.signingTarget;
            const now = this.formatNow();
            const signer = this.signWizard.signerName.trim() || this.profile.ceoName;

            this.contract.agreements = this.contract.agreements.map(a => {
                // 체결 대상(initial/pending)을 active 로 갱신
                if (target && a.id === target.id) {
                    return {
                        ...a,
                        signer,
                        signedAt: now,
                        expiredAt: '2028.05.07',
                        status: 'active'
                    };
                }
                // 기존 active 는 expired 로 이동
                if (a.status === 'active') {
                    return { ...a, status: 'expired' };
                }
                return a;
            });

            // signingTarget 이 없으면(신규) 새 항목을 맨 앞에 추가
            if (!target) {
                this.contract.agreements = [
                    {
                        id: 'AGR-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000),
                        title: '맑은소프트 쏠쏠 이용계약서 (2026년 표준)',
                        version: 'v2.0',
                        signer,
                        signedAt: now,
                        expiredAt: '2028.05.07',
                        status: 'active'
                    },
                    ...this.contract.agreements
                ];
            }

            this.signingTarget = null;

            this.closeSignWizard();
            this.showAlert('전자서명이 완료되었습니다.', {
                desc: '이용계약서 체결이 완료되었습니다.',
                iconName: 'bi bi-shield-check',
                iconClass: 'is-success'
            });
        },

        // ----- 서명 패드 -----
        getCanvasPoint(e) {
            const canvas = this.$refs.signCanvas;
            if (!canvas) return { x: 0, y: 0 };
            const rect = canvas.getBoundingClientRect();
            const t = e.touches && e.touches[0];
            const cx = t ? t.clientX : e.clientX;
            const cy = t ? t.clientY : e.clientY;
            return {
                x: (cx - rect.left) * (canvas.width / rect.width),
                y: (cy - rect.top)  * (canvas.height / rect.height)
            };
        },

        startSignDraw(e) {
            if (this.signWizard.signMethod !== 'sign') return;
            e.preventDefault();
            this.signWizard.isDrawing = true;
            this.signWizard.lastPoint = this.getCanvasPoint(e);
        },

        moveSignDraw(e) {
            if (!this.signWizard.isDrawing) return;
            e.preventDefault();
            const canvas = this.$refs.signCanvas;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const p = this.getCanvasPoint(e);
            const last = this.signWizard.lastPoint;

            ctx.lineWidth = 2.4;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#1f2937';
            ctx.beginPath();
            ctx.moveTo(last.x, last.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            this.signWizard.lastPoint = p;
            this.signWizard.hasSignature = true;
        },

        endSignDraw() {
            this.signWizard.isDrawing = false;
            this.signWizard.lastPoint = null;
        },

        clearSignature() {
            const canvas = this.$refs.signCanvas;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            this.signWizard.hasSignature = false;
        },

        useCertificate() {
            // 데모: 공인인증서 모듈 호출 가정
            this.showConfirm(
                '공인인증서로 서명을 진행하시겠어요?',
                () => {
                    this.signWizard.signMethod = 'cert';
                    this.signWizard.hasSignature = true;
                    this.showAlert('공인인증서 서명이 완료되었습니다.', {
                        iconName: 'bi bi-shield-lock-fill',
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

        // ----- 계약서 뷰어 -----
        openContractViewer(item) {
            this.docViewer = {
                title: item.title || '이용계약서',
                subtitle: `서명자 ${item.signer || '-'} · ${item.signedAt || '-'}`,
                fileName: '',
                kind: 'contract',
                contract: item
            };
            if (this.docViewerModal) this.docViewerModal.show();
        },

        openCertViewer(kind, item) {
            const titleMap = {
                lending: '대부업등록증',
                bond: '지급이행보증보험증권',
                biz: '사업자등록증'
            };
            this.docViewer = {
                title: titleMap[kind] || '사업자등록증',
                subtitle: `${item.name} · ${item.uploadedAt}`,
                fileName: item.name,
                kind: 'pdf',
                contract: null
            };
            if (this.docViewerModal) this.docViewerModal.show();
        },

        // ----- 사업자등록증 / 대부업등록증 업로드 -----
        askBizCertUpload() {
            this.showAlert('사업자등록증 업로드 안내', {
                desc: 'PDF 형식의 파일만 첨부할 수 있으며, 최대 10MB까지 업로드할 수 있습니다.\n[확인] 버튼을 클릭하시면 파일 선택 창이 열립니다.',
                iconName: 'bi bi-file-earmark-pdf',
                iconClass: 'is-info',
                onConfirm: () => this.triggerBizCertUpload()
            });
        },
        askLendingCertUpload() {
            this.showAlert('대부업등록증 업로드 안내', {
                desc: 'PDF 형식의 파일만 첨부할 수 있으며, 최대 10MB까지 업로드할 수 있습니다.\n[확인] 버튼을 클릭하시면 파일 선택 창이 열립니다.',
                iconName: 'bi bi-file-earmark-pdf',
                iconClass: 'is-info',
                onConfirm: () => this.triggerLendingCertUpload()
            });
        },
        askPaymentBondCertUpload() {
            this.showAlert('지급이행보증보험증권 업로드 안내', {
                desc: 'PDF 형식의 파일만 첨부할 수 있으며, 최대 10MB까지 업로드할 수 있습니다.\n[확인] 버튼을 클릭하시면 파일 선택 창이 열립니다.',
                iconName: 'bi bi-file-earmark-pdf',
                iconClass: 'is-info',
                onConfirm: () => this.triggerPaymentBondCertUpload()
            });
        },

        triggerBizCertUpload() {
            if (this.$refs.bizCertInput) this.$refs.bizCertInput.click();
        },
        triggerLendingCertUpload() {
            if (this.$refs.lendingCertInput) this.$refs.lendingCertInput.click();
        },
        triggerPaymentBondCertUpload() {
            if (this.$refs.paymentBondCertInput) this.$refs.paymentBondCertInput.click();
        },

        onBizCertChange(e) {
            const file = e.target.files && e.target.files[0];
            if (file) this.applyCertFile('biz', file);
            e.target.value = '';
        },
        onLendingCertChange(e) {
            const file = e.target.files && e.target.files[0];
            if (file) this.applyCertFile('lending', file);
            e.target.value = '';
        },
        onPaymentBondCertChange(e) {
            const file = e.target.files && e.target.files[0];
            if (file) this.applyCertFile('bond', file);
            e.target.value = '';
        },

        applyCertFile(kind, file) {
            const isPdf = (file.type === 'application/pdf') || /\.pdf$/i.test(file.name);
            if (!isPdf) {
                this.showAlert('PDF 파일만 첨부할 수 있습니다.');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                this.showAlert('파일 용량이 10MB를 초과합니다.');
                return;
            }

            const targetMap = {
                lending: this.contract.lendingCert,
                bond: this.contract.paymentBondCert,
                biz: this.contract.bizCert
            };
            const target = targetMap[kind] || this.contract.bizCert;
            const next = {
                id: kind.toUpperCase() + '-' + Date.now(),
                name: file.name,
                size: file.size,
                uploadedAt: this.formatNow()
            };

            // 기존 current를 history 맨 앞으로 이동
            if (target.current) {
                target.history = [target.current, ...target.history];
            }
            target.current = next;
        },

        removeBizCert() {
            this.showConfirm(
                '현재 사업자등록증을 삭제하시겠어요?',
                () => {
                    this.contract.bizCert.current = null;
                }
            );
        },
        removeLendingCert() {
            this.showConfirm(
                '현재 대부업등록증을 삭제하시겠어요?',
                () => {
                    this.contract.lendingCert.current = null;
                }
            );
        },
        removePaymentBondCert() {
            this.showConfirm(
                '현재 지급이행보증보험증권을 삭제하시겠어요?',
                () => {
                    this.contract.paymentBondCert.current = null;
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
            this.showAlert('계약 정보가 정상적으로 접수되었습니다.', {
                desc: '제출하신 계약 정보 및 첨부 서류는 관리자 승인 후 사용하실 수 있습니다.\n승인 결과는 등록된 이메일로 안내드릴 예정이니, 잠시만 기다려 주세요.',
                iconName: 'bi bi-clock-history',
                iconClass: 'is-info'
            });
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

        // ============== 멀티 계정 추가 ==============
        multiAuthStatusLabel(status) {
            switch (status) {
                case 'approved': return '승인';
                case 'pending':  return '심사중';
                case 'rejected': return '반려';
                default:         return '-';
            }
        },

        multiAuthStatusClass(status) {
            switch (status) {
                case 'approved': return 'is-approved';
                case 'pending':  return 'is-pending';
                case 'rejected': return 'is-rejected';
                default:         return '';
            }
        },

        openMultiAuth() {
            this.multiAuthForm = {
                memberName: '',
                phonePrefix: '010',
                phoneMid: '',
                phoneLast: '',
                code: '',
                codeSent: false,
                codeVerified: false,
                certFile: null
            };
            if (this.multiAuthModal) this.multiAuthModal.show();
        },

        closeMultiAuth() {
            if (this.multiAuthModal) this.multiAuthModal.hide();
        },

        sendMultiAuthCode() {
            const f = this.multiAuthForm;
            if (!f.phoneMid || !f.phoneLast) {
                this.showAlert('휴대폰 번호를 입력해 주세요.');
                return;
            }
            f.codeSent = true;
            f.codeVerified = false;
            f.code = '';
            this.showAlert('휴대폰으로 인증번호가 발송되었습니다.', {
                desc: '3분내 인증번호를 입력해 주세요',
                iconName: 'bi bi-phone-vibrate',
                iconClass: 'is-info'
            });
        },

        verifyMultiAuthCode() {
            const f = this.multiAuthForm;
            if (!f.code) {
                this.showAlert('인증번호를 입력해 주세요.');
                return;
            }
            f.codeVerified = true;
            this.showAlert('휴대폰 인증이 완료되었습니다.', {
                iconName: 'bi bi-check-circle-fill',
                iconClass: 'is-success'
            });
        },

        triggerMultiAuthCertUpload() {
            if (this.$refs.multiAuthCertInput) this.$refs.multiAuthCertInput.click();
        },

        onMultiAuthCertChange(e) {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const isPdfOrImage = (file.type === 'application/pdf')
                    || /\.pdf$/i.test(file.name)
                    || /^image\//.test(file.type);
                if (!isPdfOrImage) {
                    this.showAlert('PDF 또는 이미지 파일만 첨부할 수 있습니다.');
                    e.target.value = '';
                    return;
                }
                if (file.size > 10 * 1024 * 1024) {
                    this.showAlert('파일 용량이 10MB를 초과합니다.');
                    e.target.value = '';
                    return;
                }
                this.multiAuthForm.certFile = { name: file.name, size: file.size };
            }
            e.target.value = '';
        },

        removeMultiAuthCert() {
            this.multiAuthForm.certFile = null;
        },

        submitMultiAuth() {
            const f = this.multiAuthForm;
            if (!f.memberName.trim()) {
                this.showAlert('회원 이름(임직원 이름)을 입력해 주세요.');
                return;
            }
            if (!f.codeVerified) {
                this.showAlert('휴대폰 본인 인증을 먼저 완료해 주세요.');
                return;
            }
            if (!f.certFile) {
                this.showAlert('재직증명서를 첨부해 주세요.');
                return;
            }

            this.multiAuth.verifications.unshift({
                id: 'MA-' + Date.now(),
                memberType: '사업자 멀티계정',
                memberName: f.memberName.trim(),
                documents: '사업자등록증, 재직증명서',
                status: 'pending',
                requestedAt: this.formatNow().replace(/\./g, '-'),
                verifiedAt: '-'
            });

            this.closeMultiAuth();
            this.showAlert('본인 인증 요청이 접수되었습니다.', {
                desc: '관리자 승인 후 멀티 계정으로 등록됩니다.',
                iconName: 'bi bi-clock-history',
                iconClass: 'is-info'
            });
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
