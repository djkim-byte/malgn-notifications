// 주소록 > 수신 거부 관리
// 휴대폰 번호 / 이메일 / 토큰 3개 탭, 추가/해지/다운로드 요청 모달 포함

const PHONE_FILTER_OPTIONS = [
    { value: '08012345678', label: '08012345678' },
    { value: '08087654321', label: '08087654321' }
];

const EMAIL_FILTER_OPTIONS = [
    { value: 'malgnsoft.com', label: 'malgnsoft.com' },
    { value: 'wecandeo.com', label: 'wecandeo.com' }
];

let _uid = 0;
const newUid = () => ++_uid;

function pad(n) { return String(n).padStart(2, '0'); }

function emptyAddForm() {
    return {
        target: '',
        method: 'direct',
        input: '',
        items: [],
        fileName: '',
        file: null
    };
}

export default {
    name: 'ContactsOptoutPage',
    layout: 'default',

    components: ['HistoryDropdown'],

    data() {
        return {
            tab: 'phone',

            // 탭별 상태
            phoneFilter: '',
            phoneKeyword: '',
            phoneSelectedIds: [],
            phoneRows: [],

            emailFilter: '',
            emailKeyword: '',
            emailSelectedIds: [],
            emailRows: [],

            tokenKeyword: '',
            tokenRows: [],

            page: 1,
            pageSize: 16,

            modals: {},
            addForm: emptyAddForm(),

            downloadRequests: []
        };
    },

    computed: {
        subjectLabel() {
            if (this.tab === 'phone') return '번호';
            if (this.tab === 'email') return '이메일';
            return '토큰';
        },

        filterOptions() {
            return this.tab === 'phone' ? PHONE_FILTER_OPTIONS : EMAIL_FILTER_OPTIONS;
        },

        filterPlaceholder() {
            return this.tab === 'phone' ? '080 수신 거부 번호 선택' : '이메일 도메인 선택';
        },

        searchPlaceholder() {
            if (this.tab === 'phone') return '수신 거부 번호를 입력하세요. (Exact 검색)';
            if (this.tab === 'email') return '수신 거부 이메일을 입력하세요. (Exact 검색)';
            return '수신 거부 토큰을 입력하세요.';
        },

        addInputPlaceholder() {
            return this.tab === 'phone' ? '수신 거부 번호를 추가하세요.' : '수신 거부 이메일을 추가하세요.';
        },

        filter: {
            get() {
                if (this.tab === 'phone') return this.phoneFilter;
                if (this.tab === 'email') return this.emailFilter;
                return '';
            },
            set(v) {
                if (this.tab === 'phone') this.phoneFilter = v;
                else if (this.tab === 'email') this.emailFilter = v;
            }
        },

        keyword: {
            get() {
                if (this.tab === 'phone') return this.phoneKeyword;
                if (this.tab === 'email') return this.emailKeyword;
                return this.tokenKeyword;
            },
            set(v) {
                if (this.tab === 'phone') this.phoneKeyword = v;
                else if (this.tab === 'email') this.emailKeyword = v;
                else this.tokenKeyword = v;
            }
        },

        currentRows() {
            if (this.tab === 'phone') return this.phoneRows;
            if (this.tab === 'email') return this.emailRows;
            return this.tokenRows;
        },

        currentSelectedIds: {
            get() {
                if (this.tab === 'phone') return this.phoneSelectedIds;
                if (this.tab === 'email') return this.emailSelectedIds;
                return [];
            },
            set(v) {
                if (this.tab === 'phone') this.phoneSelectedIds = v;
                else if (this.tab === 'email') this.emailSelectedIds = v;
            }
        },

        totalPages() {
            return Math.max(1, Math.ceil(this.currentRows.length / this.pageSize));
        },

        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.currentRows.slice(start, start + this.pageSize);
        },

        isAllSelected() {
            return this.pagedRows.length > 0
                && this.pagedRows.every(r => this.currentSelectedIds.includes(r.id));
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                add: new bootstrap.Modal(this.$refs.addModal),
                cancel: new bootstrap.Modal(this.$refs.cancelModal),
                downloadRequest: new bootstrap.Modal(this.$refs.downloadRequestModal),
                downloadList: new bootstrap.Modal(this.$refs.downloadListModal)
            };
        });
    },

    methods: {
        setTab(t) {
            this.tab = t;
            this.page = 1;
        },

        runSearch() {
            this.page = 1;
        },

        refresh() {
            this.keyword = '';
            this.filter = '';
            this.page = 1;
            this.currentSelectedIds = [];
        },

        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.page = p;
        },

        toggleAllRows(e) {
            if (e.target.checked) {
                const ids = this.pagedRows.map(r => r.id);
                this.currentSelectedIds = Array.from(new Set([...this.currentSelectedIds, ...ids]));
            } else {
                const ids = new Set(this.pagedRows.map(r => r.id));
                this.currentSelectedIds = this.currentSelectedIds.filter(id => !ids.has(id));
            }
        },

        // ===== 추가 모달 =====
        openAddModal() {
            this.addForm = emptyAddForm();
            this.modals.add && this.modals.add.show();
        },

        addItem() {
            const v = this.addForm.input.trim();
            if (!v) return;
            if (this.addForm.items.length >= 10) {
                alert('최대 10건까지 추가 가능합니다.');
                return;
            }
            this.addForm.items.push({ _uid: newUid(), value: v });
            this.addForm.input = '';
        },

        removeItem(idx) {
            this.addForm.items.splice(idx, 1);
        },

        submitAdd() {
            if (!this.addForm.target) {
                alert(this.tab === 'phone' ? '080 수신 거부 번호를 선택해 주세요.' : '이메일 도메인을 선택해 주세요.');
                return;
            }
            if (this.addForm.method === 'direct') {
                if (this.addForm.items.length === 0) {
                    alert(`수신 거부 ${this.subjectLabel}을(를) 추가해 주세요.`);
                    return;
                }
                const now = this.formatNow();
                const targetRows = this.tab === 'phone' ? this.phoneRows : this.emailRows;
                this.addForm.items.forEach(it => {
                    targetRows.push({ id: newUid() + 1000, value: it.value, createdAt: now });
                });
            } else {
                if (!this.addForm.file) {
                    alert('업로드할 파일을 선택해 주세요.');
                    return;
                }
                alert('파일 업로드가 요청되었습니다.');
            }
            this.closeModal('add');
        },

        downloadTemplate() {
            alert('템플릿 다운로드');
        },

        openFilePicker() {
            this.$refs.fileInput && this.$refs.fileInput.click();
        },

        handleFileChange(e) {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            if (file.size > 1024 * 1024) {
                alert('최대 1MB까지 업로드 가능합니다.');
                e.target.value = '';
                return;
            }
            this.addForm.file = file;
            this.addForm.fileName = file.name;
        },

        // ===== 해지 =====
        openCancelConfirm() {
            if (this.currentSelectedIds.length === 0) return;
            this.modals.cancel && this.modals.cancel.show();
        },

        confirmCancel() {
            const ids = new Set(this.currentSelectedIds);
            if (this.tab === 'phone') {
                this.phoneRows = this.phoneRows.filter(r => !ids.has(r.id));
                this.phoneSelectedIds = [];
            } else if (this.tab === 'email') {
                this.emailRows = this.emailRows.filter(r => !ids.has(r.id));
                this.emailSelectedIds = [];
            }
            this.closeModal('cancel');
        },

        // ===== 다운로드 요청 =====
        requestDownload() {
            this.modals.downloadRequest && this.modals.downloadRequest.show();
        },

        confirmDownloadRequest() {
            const now = new Date();
            const expire = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const id = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}` + Math.random().toString(36).slice(2, 9);
            this.downloadRequests.unshift({
                id,
                requestedAt: this.formatDateTime(now),
                expireAt: this.formatDateTime(expire),
                status: 'processing'
            });
            this.closeModal('downloadRequest');
        },

        openDownloadList() {
            this.modals.downloadList && this.modals.downloadList.show();
        },

        downloadFile(r) {
            alert(`다운로드: ${r.id}`);
        },

        // ===== 공통 =====
        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        },

        formatNow() {
            return this.formatDateTime(new Date());
        },

        formatDateTime(d) {
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }
    }
};
