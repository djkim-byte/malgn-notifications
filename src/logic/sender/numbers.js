// 발신 정보 > 발신 번호 관리
// HistoryDropdown 컴포넌트 재사용 (드롭다운 공통 스타일)

const TYPE_OPTIONS = [
    { value: 'owner_business', label: '대표자 번호, 사업자 자체 번호' },
    { value: 'employee', label: '임직원 번호' },
    { value: 'other_company', label: '타사 번호' },
    { value: 'other_person', label: '타인 번호' }
];

const DOC = {
    telecomCert: {
        key: 'telecomCert',
        label: '통신서비스 이용증명원',
        notes: ['통신서비스 이용증명원은 <span class="sender-em">마스킹(숨김) 처리된 부분이 없고, 최근 3개월 이내 발급된 서류</span>만 가능합니다.']
    },
    employmentCert: {
        key: 'employmentCert',
        label: '재직증명서',
        notes: [
            '재직증명서에 주민등록번호가 포함된 경우 주민등록번호 <span class="sender-em">뒷자리를 마스킹(숨김)</span> 처리한 뒤 업로드하세요.',
            '재직증명서는 발급일이 표기되어 있고, 직인이 날인된 서류만 가능합니다.',
            '재직증명서 내 주민등록번호 뒤 6자리는 반드시 마스킹(숨김) 처리하세요.'
        ]
    },
    consentLetter: {
        key: 'consentLetter',
        label: '이용승낙서',
        notes: []
    },
    businessRegistration: {
        key: 'businessRegistration',
        label: '사업자등록증',
        notes: []
    },
    relationDoc: {
        key: 'relationDoc',
        label: '관계 확인 문서',
        notes: []
    }
};

const DOCS_BY_TYPE = {
    owner_business: [DOC.telecomCert],
    employee: [DOC.telecomCert, DOC.employmentCert],
    other_company: [DOC.telecomCert, DOC.consentLetter, DOC.businessRegistration, DOC.relationDoc],
    other_person: [DOC.telecomCert, DOC.consentLetter]
};

const STATUS_LABEL = {
    approved: '승인',
    pending: '심사 중',
    rejected: '반려'
};

const SAMPLE_ROWS = [
    {
        id: 1,
        type: 'owner_business',
        typeLabel: '대표자 번호, 사업자 자체 번호',
        number: '16447143',
        status: 'approved',
        statusLabel: STATUS_LABEL.approved,
        requestedAt: '2026-04-09 17:23',
        approvedAt: '2026-04-10 16:04'
    }
];

const CARRIERS = [
    { value: 'SKT', label: 'SKT' },
    { value: 'KT', label: 'KT' },
    { value: 'LGU', label: 'LG U+' },
    { value: 'SKT_MVNO', label: 'SKT 알뜰폰' },
    { value: 'KT_MVNO', label: 'KT 알뜰폰' },
    { value: 'LGU_MVNO', label: 'LG U+ 알뜰폰' }
];

const PHONE_CODE_SECONDS = 180;

function emptyForm() {
    return {
        type: 'owner_business',
        number: '',
        files: {}
    };
}

function emptyPhoneAuth() {
    return {
        carrier: '',
        name: '',
        birth: '',
        genderDigit: '',
        foreigner: 'native',
        phonePrefix: '010',
        phoneMid: '',
        phoneLast: '',
        code: '',
        codeSent: false,
        verified: false,
        secondsLeft: 0
    };
}

export default {
    name: 'SenderNumbersPage',
    layout: 'default',

    components: ['HistoryDropdown'],

    data() {
        return {
            typeOptions: TYPE_OPTIONS,
            docsByType: DOCS_BY_TYPE,
            carriers: CARRIERS,

            rows: SAMPLE_ROWS.slice(),
            page: 1,
            pageSize: 10,
            selectedRowIds: [],

            modals: {},

            // 등록 위저드 상태
            currentStep: 1,
            agreed: false,
            registerMethod: '',
            form: emptyForm(),
            phoneAuth: emptyPhoneAuth(),

            _phoneTimer: null
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                register: new bootstrap.Modal(this.$refs.registerModal),
                deleteConfirm: new bootstrap.Modal(this.$refs.deleteConfirmModal),
                guide: new bootstrap.Modal(this.$refs.guideModal)
            };
            window.openPopupFromQuery && window.openPopupFromQuery(this);
        });
    },

    beforeUnmount() {
        this.clearPhoneTimer();
    },

    computed: {
        totalCount() { return this.rows.length; },
        totalPages() { return Math.max(1, Math.ceil(this.rows.length / this.pageSize)); },
        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.rows.slice(start, start + this.pageSize);
        },
        pageRange() {
            const pages = [];
            for (let p = 1; p <= this.totalPages; p++) pages.push(p);
            return pages;
        },
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedRowIds.includes(r.id));
        },
        requiredDocs() {
            return DOCS_BY_TYPE[this.form.type] || [];
        },
        step3Title() {
            return this.registerMethod === 'phone' ? '휴대폰 본인인증' : '발신 정보 등록 및 서류 인증';
        },
        canSendPhoneCode() {
            const p = this.phoneAuth;
            return !!(p.carrier && p.name.trim() && p.birth.length === 6 && p.genderDigit && p.phoneMid.length >= 3 && p.phoneLast.length === 4 && !p.verified);
        },
        canVerifyPhoneCode() {
            return this.phoneAuth.codeSent && this.phoneAuth.code.length === 6 && !this.phoneAuth.verified;
        },
        phoneTimerLabel() {
            const s = Math.max(0, this.phoneAuth.secondsLeft);
            const m = Math.floor(s / 60);
            const r = s % 60;
            return `${m}:${String(r).padStart(2, '0')}`;
        },
        canSubmitStep3() {
            if (this.registerMethod === 'phone') return this.phoneAuth.verified;
            if (this.registerMethod === 'docs') {
                if (!this.form.number.trim()) return false;
                return this.requiredDocs.every(d => this.form.files[d.key]);
            }
            return false;
        }
    },

    methods: {
        statusClass(status) {
            return 'sender-status-' + (status || 'pending');
        },

        refresh() {
            this.page = 1;
            this.selectedRowIds = [];
        },

        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.page = p;
        },

        toggleAllRows(e) {
            if (e.target.checked) {
                const ids = this.pagedRows.map(r => r.id);
                this.selectedRowIds = Array.from(new Set([...this.selectedRowIds, ...ids]));
            } else {
                const ids = new Set(this.pagedRows.map(r => r.id));
                this.selectedRowIds = this.selectedRowIds.filter(id => !ids.has(id));
            }
        },

        // ===== 등록 위저드 =====
        openRegisterFlow() {
            this.currentStep = 1;
            this.agreed = false;
            this.registerMethod = '';
            this.form = emptyForm();
            this.phoneAuth = emptyPhoneAuth();
            this.clearPhoneTimer();
            this.modals.register && this.modals.register.show();
        },

        canGoNext() {
            if (this.currentStep === 1) return this.agreed;
            if (this.currentStep === 2) return !!this.registerMethod;
            return false;
        },

        goNext() {
            if (!this.canGoNext()) return;
            if (this.currentStep < 3) this.currentStep++;
        },

        goPrev() {
            if (this.currentStep > 1) {
                this.currentStep--;
                if (this.currentStep < 3) {
                    // Step 3에서 뒤로 가면 인증 진행 상태는 리셋
                    this.clearPhoneTimer();
                    this.phoneAuth.codeSent = false;
                    this.phoneAuth.code = '';
                    this.phoneAuth.verified = false;
                    this.phoneAuth.secondsLeft = 0;
                }
            }
        },

        selectMethod(method) {
            this.registerMethod = method;
        },

        // ----- Step 3a: 서류 업로드 -----
        pickFile(key) {
            const refKey = 'file_' + key;
            const ref = this.$refs[refKey];
            const el = Array.isArray(ref) ? ref[0] : ref;
            el && el.click();
        },

        handleFileChange(e, key) {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (file.size > 10 * 1024 * 1024) {
                alert('최대 10MB까지 업로드 가능합니다.');
                e.target.value = '';
                return;
            }
            this.form.files = { ...this.form.files, [key]: file };
        },

        // ----- Step 3b: 휴대폰 본인인증 -----
        sendPhoneCode() {
            if (!this.canSendPhoneCode) return;
            this.phoneAuth.codeSent = true;
            this.phoneAuth.verified = false;
            this.phoneAuth.code = '';
            this.phoneAuth.secondsLeft = PHONE_CODE_SECONDS;
            this.startPhoneTimer();
            alert('인증번호 6자리가 휴대폰 문자메시지로 발송되었습니다. 3분 이내 입력해 주세요.');
        },

        startPhoneTimer() {
            this.clearPhoneTimer();
            this._phoneTimer = setInterval(() => {
                if (this.phoneAuth.secondsLeft <= 0) {
                    this.clearPhoneTimer();
                    return;
                }
                this.phoneAuth.secondsLeft--;
            }, 1000);
        },

        clearPhoneTimer() {
            if (this._phoneTimer) {
                clearInterval(this._phoneTimer);
                this._phoneTimer = null;
            }
        },

        verifyPhoneCode() {
            if (!this.canVerifyPhoneCode) return;
            if (this.phoneAuth.secondsLeft <= 0) {
                alert('인증 시간이 만료되었습니다. 인증번호를 다시 받아주세요.');
                return;
            }
            // 데모용 - 실제 환경에서는 서버 검증 호출
            this.phoneAuth.verified = true;
            this.clearPhoneTimer();
            alert('휴대폰 본인인증이 완료되었습니다.');
        },

        formatPhoneNumber() {
            const p = this.phoneAuth;
            return `${p.phonePrefix}${p.phoneMid}${p.phoneLast}`;
        },

        // ----- 최종 제출 -----
        submitRegister() {
            if (!this.canSubmitStep3) return;

            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

            if (this.registerMethod === 'phone') {
                this.rows.unshift({
                    id: Date.now(),
                    type: 'employee',
                    typeLabel: '본인 명의 휴대폰 (본인인증)',
                    number: this.formatPhoneNumber(),
                    status: 'approved',
                    statusLabel: STATUS_LABEL.approved,
                    requestedAt: stamp,
                    approvedAt: stamp
                });
                this.closeModal('register');
                alert('본인인증이 완료되어 발신 번호가 즉시 등록되었습니다.');
                return;
            }

            const typeOpt = TYPE_OPTIONS.find(t => t.value === this.form.type);
            this.rows.unshift({
                id: Date.now(),
                type: this.form.type,
                typeLabel: typeOpt ? typeOpt.label : '',
                number: this.form.number.trim(),
                status: 'pending',
                statusLabel: STATUS_LABEL.pending,
                requestedAt: stamp,
                approvedAt: ''
            });

            this.closeModal('register');
            alert('발신 번호 등록이 요청되었습니다. 심사 결과는 영업일 기준 3~5일 이내에 안내됩니다.');
        },

        // ===== 삭제 =====
        openDeleteConfirm() {
            if (this.selectedRowIds.length === 0) return;
            this.modals.deleteConfirm && this.modals.deleteConfirm.show();
        },

        confirmDelete() {
            const ids = new Set(this.selectedRowIds);
            this.rows = this.rows.filter(r => !ids.has(r.id));
            this.selectedRowIds = [];
            this.closeModal('deleteConfirm');
        },

        // ===== 안내 =====
        openGuide() {
            this.modals.guide && this.modals.guide.show();
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
            if (name === 'register') this.clearPhoneTimer();
        }
    }
};
