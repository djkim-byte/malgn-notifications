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

function emptyForm() {
    return {
        type: 'owner_business',
        number: '',
        files: {}
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

            rows: SAMPLE_ROWS.slice(),
            page: 1,
            pageSize: 10,
            selectedRowIds: [],

            modals: {},
            agreed: false,
            form: emptyForm()
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                agree: new bootstrap.Modal(this.$refs.agreeModal),
                register: new bootstrap.Modal(this.$refs.registerModal),
                deleteConfirm: new bootstrap.Modal(this.$refs.deleteConfirmModal),
                guide: new bootstrap.Modal(this.$refs.guideModal)
            };
        });
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

        // ===== 등록 플로우 =====
        openRegisterFlow() {
            this.agreed = false;
            this.form = emptyForm();
            this.modals.agree && this.modals.agree.show();
        },

        goRegisterStep() {
            if (!this.agreed) return;
            this.closeModal('agree');
            this.$nextTick(() => {
                this.modals.register && this.modals.register.show();
            });
        },

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

        submitRegister() {
            if (!this.form.number.trim()) {
                alert('발신 번호를 입력해 주세요.');
                return;
            }
            const docs = this.requiredDocs;
            for (const d of docs) {
                if (!this.form.files[d.key]) {
                    alert(`${d.label}을(를) 첨부해 주세요.`);
                    return;
                }
            }

            const typeOpt = TYPE_OPTIONS.find(t => t.value === this.form.type);
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

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
        }
    }
};
