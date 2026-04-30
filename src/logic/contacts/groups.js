// 주소록 > 그룹 관리

function pad(n) { return String(n).padStart(2, '0'); }

function formatDateTime(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function randomCode(len = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let s = '';
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}

function makeMockGroups() {
    return [
        { id: 1, name: '위캔디오_V4공지_고객용', code: 'gzQmmRIP', count: 0, createdAt: '2026-04-02 17:18', updatedAt: '2026-04-02 17:18' },
        { id: 2, name: '트래픽_알림_오발송', code: 'aldkBP47', count: 25, createdAt: '2026-03-20 19:18', updatedAt: '2026-03-20 19:18' },
        { id: 3, name: '위캔디오_업무_소통방', code: 'r2szwrkQ', count: 26, createdAt: '2026-03-16 14:20', updatedAt: '2026-03-16 14:20' }
    ];
}

function makeMockContactPool() {
    const aliases = ['양해상', '박재희', '최한휘', '박재현', '이영은', '이진화', '황보영', '정대우', '김서연',
        '김민지', '이주현', '박지훈', '오세준', '한지민', '윤석호', '강예린', '송태현', '임수빈',
        '문정아', '서지원', '홍채린', '조민혁', '권나영', '배호진', '신유진'];
    const emails = ['jangeunseok@abcmartkorea.com', 'jayz@malgnsoft.com', 'chhwi@malgnsoft.com', 'parkch@tccom.co.kr',
        'young2eun@malgnsoft.com', 'jh.lee@malgnsoft.com', 'lookinghhh@malgnsoft.com', 'winter@malgnsoft.com',
        'sparkling96@malgnsoft.com'];
    const pool = [];
    for (let i = 0; i < aliases.length; i++) {
        pool.push({
            id: i + 1,
            alias: aliases[i],
            userId: randomCode(8),
            phone: '',
            email: emails[i % emails.length],
            token: ''
        });
    }
    return pool;
}

export default {
    name: 'ContactsGroupsPage',
    layout: 'default',

    data() {
        return {
            // 그룹 목록
            rows: [],
            page: 1,
            pageSize: 10,
            searchKeyword: '',
            selectedRowIds: [],

            // 선택 그룹/상세
            selectedGroup: null,
            detailTab: 'info',
            detailSize: 'md',

            // 그룹 연락처
            groupContacts: [],
            contactPage: 1,
            contactPageSize: 10,
            contactKeyword: '',
            contactSelectedIds: [],

            // 모달 인스턴스
            modals: {},

            // 그룹 추가/이름 변경
            groupAddName: '',
            groupRenameName: '',

            // 그룹 연락처 추가 (피커)
            contactPool: [],
            contactPickerKeyword: '',
            contactPickerSelectedIds: [],
            pickerPage: 1,
            pickerPageSize: 10,

            // 다운로드 요청 목록
            downloadRequests: [
                { id: '20260302113021abcd1234ef', requestedAt: '2026-03-02 11:30', expireAt: '2026-03-09 11:30', status: 'expired' }
            ]
        };
    },

    mounted() {
        this.rows = makeMockGroups();
        this.contactPool = makeMockContactPool();
        this.$nextTick(() => {
            this.modals = {
                groupAdd: new bootstrap.Modal(this.$refs.groupAddModal),
                groupRename: new bootstrap.Modal(this.$refs.groupRenameModal),
                groupDelete: new bootstrap.Modal(this.$refs.groupDeleteModal),
                contactAdd: new bootstrap.Modal(this.$refs.contactAddModal),
                downloadList: new bootstrap.Modal(this.$refs.downloadListModal)
            };
        });
    },

    computed: {
        filteredRows() {
            const kw = this.searchKeyword.trim().toLowerCase();
            if (!kw) return this.rows;
            return this.rows.filter(r => r.name.toLowerCase().includes(kw));
        },
        totalCount() { return this.filteredRows.length; },
        totalPages() { return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize)); },
        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.filteredRows.slice(start, start + this.pageSize);
        },
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedRowIds.includes(r.id));
        },

        // 그룹 연락처
        filteredContacts() {
            const kw = this.contactKeyword.trim().toLowerCase();
            if (!kw) return this.groupContacts;
            return this.groupContacts.filter(c =>
                c.alias.toLowerCase().includes(kw) ||
                (c.email || '').toLowerCase().includes(kw)
            );
        },
        contactTotalPages() { return Math.max(1, Math.ceil(this.filteredContacts.length / this.contactPageSize)); },
        pagedContacts() {
            const start = (this.contactPage - 1) * this.contactPageSize;
            return this.filteredContacts.slice(start, start + this.contactPageSize);
        },
        isAllContactsSelected() {
            return this.pagedContacts.length > 0 && this.pagedContacts.every(c => this.contactSelectedIds.includes(c.id));
        },

        // 피커 (연락처 추가 모달)
        filteredPickerContacts() {
            const existingIds = new Set(this.groupContacts.map(c => c.id));
            const pool = this.contactPool.filter(c => !existingIds.has(c.id));
            const kw = this.contactPickerKeyword.trim().toLowerCase();
            if (!kw) return pool;
            return pool.filter(c =>
                c.alias.toLowerCase().includes(kw) ||
                (c.email || '').toLowerCase().includes(kw)
            );
        },
        pickerTotalPages() { return Math.max(1, Math.ceil(this.filteredPickerContacts.length / this.pickerPageSize)); },
        pagedPickerContacts() {
            const start = (this.pickerPage - 1) * this.pickerPageSize;
            return this.filteredPickerContacts.slice(start, start + this.pickerPageSize);
        },
        pickerPageRange() {
            const block = 5;
            const blockStart = Math.floor((this.pickerPage - 1) / block) * block + 1;
            const blockEnd = Math.min(blockStart + block - 1, this.pickerTotalPages);
            const arr = [];
            for (let i = blockStart; i <= blockEnd; i++) arr.push(i);
            return arr;
        },
        isAllPickerSelected() {
            return this.pagedPickerContacts.length > 0 &&
                this.pagedPickerContacts.every(c => this.contactPickerSelectedIds.includes(c.id));
        }
    },

    methods: {
        // ----- 그룹 목록 -----
        runSearch() {
            this.page = 1;
            this.selectedRowIds = [];
        },

        refreshList() {
            this.rows = makeMockGroups();
            this.page = 1;
            this.selectedRowIds = [];
            this.searchKeyword = '';
            this.selectedGroup = null;
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

        selectGroup(row) {
            this.selectedGroup = row;
            this.detailTab = 'info';
            this.contactPage = 1;
            this.contactKeyword = '';
            this.contactSelectedIds = [];
            this.groupContacts = this.buildSampleContacts(row);
        },

        buildSampleContacts(row) {
            const n = Math.min(row.count, this.contactPool.length);
            return this.contactPool.slice(0, n).map(c => ({ ...c }));
        },

        closeDetail() {
            this.selectedGroup = null;
            this.contactSelectedIds = [];
        },

        // ----- 그룹 추가 -----
        openGroupAddModal() {
            this.groupAddName = '';
            this.modals.groupAdd && this.modals.groupAdd.show();
        },

        confirmGroupAdd() {
            const name = this.groupAddName.trim();
            if (!name) return;
            const now = new Date();
            const stamp = formatDateTime(now);
            const newId = (this.rows.reduce((mx, r) => Math.max(mx, r.id), 0) || 0) + 1;
            this.rows.unshift({
                id: newId,
                name,
                code: randomCode(8),
                count: 0,
                createdAt: stamp,
                updatedAt: stamp
            });
            this.closeGroupsModal('groupAdd');
        },

        // ----- 그룹 이름 변경 -----
        openGroupRenameModal() {
            if (!this.selectedGroup) return;
            this.groupRenameName = this.selectedGroup.name;
            this.modals.groupRename && this.modals.groupRename.show();
        },

        confirmGroupRename() {
            const name = this.groupRenameName.trim();
            if (!name || !this.selectedGroup) return;
            const now = new Date();
            const stamp = formatDateTime(now);
            this.selectedGroup.name = name;
            this.selectedGroup.updatedAt = stamp;
            const target = this.rows.find(r => r.id === this.selectedGroup.id);
            if (target) {
                target.name = name;
                target.updatedAt = stamp;
            }
            this.closeGroupsModal('groupRename');
        },

        // ----- 그룹 삭제 -----
        openGroupDeleteModal() {
            if (this.selectedRowIds.length === 0) return;
            this.modals.groupDelete && this.modals.groupDelete.show();
        },

        confirmGroupDelete() {
            const ids = new Set(this.selectedRowIds);
            this.rows = this.rows.filter(r => !ids.has(r.id));
            if (this.selectedGroup && ids.has(this.selectedGroup.id)) {
                this.selectedGroup = null;
            }
            this.selectedRowIds = [];
            this.closeGroupsModal('groupDelete');
        },

        // ----- 그룹 연락처 -----
        runContactSearch() {
            this.contactPage = 1;
            this.contactSelectedIds = [];
        },

        refreshContacts() {
            if (!this.selectedGroup) return;
            this.groupContacts = this.buildSampleContacts(this.selectedGroup);
            this.contactPage = 1;
            this.contactSelectedIds = [];
            this.contactKeyword = '';
        },

        goContactPage(p) {
            if (p < 1 || p > this.contactTotalPages) return;
            this.contactPage = p;
        },

        toggleAllContacts(e) {
            if (e.target.checked) {
                const ids = this.pagedContacts.map(c => c.id);
                this.contactSelectedIds = Array.from(new Set([...this.contactSelectedIds, ...ids]));
            } else {
                const ids = new Set(this.pagedContacts.map(c => c.id));
                this.contactSelectedIds = this.contactSelectedIds.filter(id => !ids.has(id));
            }
        },

        removeSelectedContacts() {
            if (this.contactSelectedIds.length === 0) return;
            const ids = new Set(this.contactSelectedIds);
            this.groupContacts = this.groupContacts.filter(c => !ids.has(c.id));
            this.contactSelectedIds = [];
            if (this.selectedGroup) {
                this.selectedGroup.count = this.groupContacts.length;
                const target = this.rows.find(r => r.id === this.selectedGroup.id);
                if (target) target.count = this.groupContacts.length;
            }
        },

        requestContactsDownload() {
            if (!this.selectedGroup || this.groupContacts.length === 0) return;
            const now = new Date();
            const expire = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const newId = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${randomCode(6)}`;
            this.downloadRequests.unshift({
                id: newId,
                requestedAt: formatDateTime(now),
                expireAt: formatDateTime(expire),
                status: 'processing'
            });
            alert('다운로드 요청이 접수되었습니다.');
        },

        openDownloadList() {
            this.modals.downloadList && this.modals.downloadList.show();
        },

        // ----- 그룹 연락처 추가 (피커) -----
        openContactAddModal() {
            if (!this.selectedGroup) return;
            this.contactPickerKeyword = '';
            this.contactPickerSelectedIds = [];
            this.pickerPage = 1;
            this.modals.contactAdd && this.modals.contactAdd.show();
        },

        runContactPickerSearch() {
            this.pickerPage = 1;
        },

        toggleAllPicker(e) {
            if (e.target.checked) {
                const ids = this.pagedPickerContacts.map(c => c.id);
                this.contactPickerSelectedIds = Array.from(new Set([...this.contactPickerSelectedIds, ...ids]));
            } else {
                const ids = new Set(this.pagedPickerContacts.map(c => c.id));
                this.contactPickerSelectedIds = this.contactPickerSelectedIds.filter(id => !ids.has(id));
            }
        },

        goPickerPage(p) {
            if (p < 1 || p > this.pickerTotalPages) return;
            this.pickerPage = p;
        },

        confirmContactAdd() {
            if (this.contactPickerSelectedIds.length === 0) return;
            const ids = new Set(this.contactPickerSelectedIds);
            const added = this.contactPool.filter(c => ids.has(c.id)).map(c => ({ ...c }));
            this.groupContacts = [...this.groupContacts, ...added];
            if (this.selectedGroup) {
                this.selectedGroup.count = this.groupContacts.length;
                const target = this.rows.find(r => r.id === this.selectedGroup.id);
                if (target) target.count = this.groupContacts.length;
            }
            this.closeGroupsModal('contactAdd');
        },

        // ----- 모달 닫기 헬퍼 -----
        closeGroupsModal(name) {
            const m = this.modals[name];
            if (m) m.hide();
        }
    }
};
