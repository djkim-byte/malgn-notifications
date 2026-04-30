// 주소록 > 연락처 관리
// HistoryDropdown / HistoryMultiDropdown 컴포넌트 재사용 (드롭다운 공통 스타일)

const PUSH_TYPE_OPTIONS = [
    { value: 'FCM', label: 'FCM' },
    { value: 'APNS', label: 'APNS' },
    { value: 'APNS SANDBOX', label: 'APNS SANDBOX' },
    { value: 'APNS VOIP', label: 'APNS VOIP' },
    { value: 'APNS SANDBOX VOIP', label: 'APNS SANDBOX VOIP' },
    { value: 'ADM', label: 'ADM' }
];

const OPT_OUT_OPTIONS = [
    { value: 'N', label: '거부 안 함' },
    { value: 'Y', label: '거부' }
];

const GROUP_OPTIONS = [
    { value: '트래픽_알림_오발송', label: '트래픽_알림_오발송' },
    { value: '위캔디오_업무_소통방', label: '위캔디오_업무_소통방' },
    { value: '마케팅_뉴스레터', label: '마케팅_뉴스레터' },
    { value: '고객지원_VIP', label: '고객지원_VIP' },
    { value: '내부_테스트', label: '내부_테스트' }
];

const SAMPLE_ROWS = [
    { id: 1, alias: '양해상', userId: '7sJjN9h9', phone: '', email: 'jangeunseok@abcmartkorea.com', tokenCount: 0, group: '트래픽_알림_오발송', modifiedAt: '2026-03-20 19:20' },
    { id: 2, alias: '박재희', userId: '9THNONmI', phone: '', email: 'jayz@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 3, alias: '최한휘', userId: '9w8OpELm', phone: '', email: 'chhwi@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 4, alias: '박재현', userId: 'azydUOGM', phone: '', email: 'parkch@tccom.co.kr', tokenCount: 0, group: '트래픽_알림_오발송', modifiedAt: '2026-03-20 19:20' },
    { id: 5, alias: '이영은', userId: 'BDa2W2Aw', phone: '', email: 'young2eun@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 6, alias: '이진화', userId: 'CmPJx29S', phone: '', email: 'jh.lee@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 7, alias: '황보영', userId: 'CoIptf0S', phone: '', email: 'lookinghhh@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 8, alias: '정대우', userId: 'DANp0gkq', phone: '', email: 'winter@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 9, alias: '김서연', userId: 'DCNMmefq', phone: '', email: 'sparkling96@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 10, alias: '강태미', userId: 'DmFeCzwb', phone: '', email: 'kang.taemi@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 11, alias: '지앤비교육', userId: 'dvsbEujr', phone: '', email: 'monitoring@gnbenglish.com', tokenCount: 0, group: '트래픽_알림_오발송', modifiedAt: '2026-03-20 19:20' },
    { id: 12, alias: '테스트_강태미_03', userId: 'dZJx21uR', phone: '01066310511', email: 'kang.taemi@scenappsm.com', tokenCount: 0, group: '', modifiedAt: '2026-02-19 15:51' },
    { id: 13, alias: '권지혜', userId: 'EaUeUZxp', phone: '', email: 'wise@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 14, alias: '김윤혜', userId: 'eVxXgHBS', phone: '', email: 'k7626779@abcmartkorea.com', tokenCount: 0, group: '트래픽_알림_오발송', modifiedAt: '2026-03-20 19:20' },
    { id: 15, alias: '김규필', userId: 'G0JBGJZ5', phone: '', email: 'soumincor@malgnsoft.com', tokenCount: 0, group: '위캔디오_업무_소통방', modifiedAt: '2026-03-16 14:51' },
    { id: 16, alias: '양제열', userId: 'GbIzFMNn', phone: '', email: 'yang10@tccom.co.kr', tokenCount: 0, group: '트래픽_알림_오발송', modifiedAt: '2026-03-20 19:20' }
];

let _uid = 0;
const newUid = () => ++_uid;

function emptyTokenDraft() {
    return {
        _uid: newUid(),
        pushType: '',
        token: '',
        countryCode: '',
        languageCode: '',
        timezone: '',
        notifyOptOut: '',
        adOptOut: '',
        nightAdOptOut: '',
        deviceId: ''
    };
}

function emptyForm() {
    return {
        method: 'direct',
        alias: '',
        phone: '',
        email: '',
        tokens: [],
        groups: [],
        fileName: '',
        file: null
    };
}

function pad(n) { return String(n).padStart(2, '0'); }

export default {
    name: 'ContactsListPage',
    layout: 'default',

    components: ['HistoryDropdown', 'HistoryMultiDropdown'],

    data() {
        return {
            pushTypeOptions: PUSH_TYPE_OPTIONS,
            optOutOptions: OPT_OUT_OPTIONS,
            groupOptions: GROUP_OPTIONS,

            rows: [],
            allRows: [],
            searchKeyword: '',
            page: 1,
            pageSize: 16,
            selectedRowIds: [],

            modals: {},
            isEditMode: false,
            form: emptyForm(),
            tokenDraft: null,
            tokenEditingIndex: null,

            downloadRequests: [
                { id: '20260219161504G4e5JF8ii40', requestedAt: '2026-02-19 16:15', expireAt: '2026-02-26 16:15', status: 'expired' }
            ],
            downloadListPage: 1,
            downloadListPageSize: 5
        };
    },

    mounted() {
        this.allRows = SAMPLE_ROWS.slice();
        // 시안과 동일하게 54개로 보이도록 padding
        const baseCount = this.allRows.length;
        for (let i = 0; i < 54 - baseCount; i++) {
            const src = SAMPLE_ROWS[i % SAMPLE_ROWS.length];
            this.allRows.push({
                ...src,
                id: 1000 + i,
                userId: src.userId + (i + 1)
            });
        }
        this.rows = this.allRows.slice();

        this.$nextTick(() => {
            this.modals = {
                contactForm: new bootstrap.Modal(this.$refs.contactFormModal),
                deleteConfirm: new bootstrap.Modal(this.$refs.deleteConfirmModal),
                downloadRequest: new bootstrap.Modal(this.$refs.downloadRequestModal),
                downloadList: new bootstrap.Modal(this.$refs.downloadListModal)
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
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedRowIds.includes(r.id));
        },
        downloadListTotalPages() {
            return Math.max(1, Math.ceil(this.downloadRequests.length / this.downloadListPageSize));
        },
        downloadListPageNumbers() {
            const total = this.downloadListTotalPages;
            return Array.from({ length: total }, (_, i) => i + 1);
        },
        pagedDownloadRequests() {
            const start = (this.downloadListPage - 1) * this.downloadListPageSize;
            return this.downloadRequests.slice(start, start + this.downloadListPageSize);
        }
    },

    methods: {
        runSearch() {
            const kw = this.searchKeyword.trim().toLowerCase();
            this.page = 1;
            this.selectedRowIds = [];
            if (!kw) {
                this.rows = this.allRows.slice();
            } else {
                this.rows = this.allRows.filter(r => r.alias.toLowerCase().includes(kw));
            }
        },

        refresh() {
            this.searchKeyword = '';
            this.page = 1;
            this.selectedRowIds = [];
            this.rows = this.allRows.slice();
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

        // ===== 추가/변경 모달 =====
        openAddModal() {
            this.isEditMode = false;
            this.form = emptyForm();
            this.tokenEditingIndex = null;
            this.tokenDraft = null;
            this.modals.contactForm && this.modals.contactForm.show();
        },

        openEditModal() {
            if (this.selectedRowIds.length === 0) return;
            this.isEditMode = true;
            const target = this.allRows.find(r => r.id === this.selectedRowIds[0]);
            this.form = {
                ...emptyForm(),
                method: 'direct',
                alias: target ? target.alias : '',
                phone: target ? target.phone : '',
                email: target ? target.email : '',
                groups: target && target.group ? [target.group] : []
            };
            this.tokenEditingIndex = null;
            this.tokenDraft = null;
            this.modals.contactForm && this.modals.contactForm.show();
        },

        submitContact() {
            if (this.form.method === 'direct') {
                if (!this.form.alias.trim()) {
                    alert('수신자 별칭을 입력해 주세요.');
                    return;
                }
                alert(this.isEditMode ? '연락처가 변경되었습니다.' : '연락처가 추가되었습니다.');
            } else {
                if (!this.form.file) {
                    alert('업로드할 파일을 선택해 주세요.');
                    return;
                }
                alert('파일 업로드가 요청되었습니다.');
            }
            this.closeModal('contactForm');
        },

        // ===== 토큰 입력 =====
        addTokenForm() {
            this.tokenDraft = emptyTokenDraft();
            this.tokenEditingIndex = -1;
        },

        editToken(idx) {
            this.tokenDraft = { ...this.form.tokens[idx] };
            this.tokenEditingIndex = idx;
        },

        saveToken() {
            if (!this.tokenDraft.pushType) {
                alert('푸시 유형을 선택해 주세요.');
                return;
            }
            if (!this.tokenDraft.token.trim()) {
                alert('토큰을 입력해 주세요.');
                return;
            }
            if (this.tokenEditingIndex === -1) {
                this.form.tokens.push(this.tokenDraft);
            } else {
                this.form.tokens.splice(this.tokenEditingIndex, 1, this.tokenDraft);
            }
            this.tokenDraft = null;
            this.tokenEditingIndex = null;
        },

        cancelTokenEdit() {
            this.tokenDraft = null;
            this.tokenEditingIndex = null;
        },

        removeToken(idx) {
            this.form.tokens.splice(idx, 1);
        },

        // ===== 파일 업로드 =====
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
            this.form.file = file;
            this.form.fileName = file.name;
        },

        // ===== 삭제 =====
        openDeleteConfirm() {
            if (this.selectedRowIds.length === 0) return;
            this.modals.deleteConfirm && this.modals.deleteConfirm.show();
        },

        confirmDelete() {
            const ids = new Set(this.selectedRowIds);
            this.allRows = this.allRows.filter(r => !ids.has(r.id));
            this.rows = this.rows.filter(r => !ids.has(r.id));
            this.selectedRowIds = [];
            this.closeModal('deleteConfirm');
        },

        // ===== 다운로드 =====
        requestDownload() {
            this.modals.downloadRequest && this.modals.downloadRequest.show();
        },

        confirmDownloadRequest() {
            const now = new Date();
            const expire = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const newId = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}` + Math.random().toString(36).slice(2, 9);
            this.downloadRequests.unshift({
                id: newId,
                requestedAt: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
                expireAt: `${expire.getFullYear()}-${pad(expire.getMonth() + 1)}-${pad(expire.getDate())} ${pad(expire.getHours())}:${pad(expire.getMinutes())}`,
                status: 'ready'
            });
            this.downloadListPage = 1;
            this.closeModal('downloadRequest');
        },

        openDownloadList() {
            this.downloadListPage = 1;
            this.modals.downloadList && this.modals.downloadList.show();
        },

        goDownloadListPage(p) {
            if (p < 1 || p > this.downloadListTotalPages) return;
            this.downloadListPage = p;
        },

        downloadFile(row) {
            alert(`다운로드: ${row.id}`);
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        }
    }
};
