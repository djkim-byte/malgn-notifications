export default {
    name: 'Campaign3',
    layout: 'default',

    data() {
        return {
            mode: 'list', // 'list' | 'create' | 'edit'

            search: {
                keyword: '',
                status: '',
                channel: '',
                purpose: '',
                sort: 'default'
            },

            page: 1,
            pageSize: 6,
            selectedIds: [],

            stats: {
                inProgress: 8,
                totalSent: 9370,
                deliveryRate: 38.4,
                responseRate: 4.2
            },

            campaigns: [
                {
                    id: 'cmp-001',
                    name: '봄맞이 특별 프로모션',
                    status: 'in_progress',
                    totalSent: 3250,
                    totalReceiver: 2840,
                    channel: 'email',
                    purpose: 'promotion',
                    authorId: 'admin01'
                },
                {
                    id: 'cmp-002',
                    name: '3월 학습 시작 안내',
                    status: 'in_progress',
                    totalSent: 2100,
                    totalReceiver: 1980,
                    channel: 'kakao',
                    purpose: 'notice',
                    authorId: 'manager02'
                },
                {
                    id: 'cmp-003',
                    name: 'VIP 회원 특별 혜택',
                    status: 'pending',
                    totalSent: null,
                    totalReceiver: 580,
                    channel: 'sms',
                    purpose: 'notice',
                    authorId: 'admin01'
                },
                {
                    id: 'cmp-004',
                    name: '2월 월간 뉴스레터',
                    status: 'completed',
                    totalSent: 4120,
                    totalReceiver: 3950,
                    channel: 'email',
                    purpose: 'notice',
                    authorId: 'editor03'
                },
                {
                    id: 'cmp-005',
                    name: '신규 강좌 오픈 알림',
                    status: 'draft',
                    totalSent: null,
                    totalReceiver: null,
                    channel: 'rcs',
                    purpose: 'purchase',
                    authorId: 'admin01'
                },
                {
                    id: 'cmp-006',
                    name: '1월 재구매 유도 캠페인',
                    status: 'stopped',
                    totalSent: 5600,
                    totalReceiver: 5340,
                    channel: 'push',
                    purpose: 'etc',
                    authorId: 'manager02'
                }
            ],

            purposeChips: [
                { value: 'notice', label: '공지' },
                { value: 'purchase', label: '구매유도' },
                { value: 'promotion', label: '프로모션' },
                { value: 'etc', label: '기타' }
            ],

            // 수신자 (직접입력 + 주소록)
            recipients: [],
            selectedRecipientIds: [],
            varInputMode: 'common',
            commonVar: '',

            templates: [
                { id: 'tpl-001', name: '[기본] 봄맞이 학습 안내' },
                { id: 'tpl-002', name: '[프로모션] 3월 할인 쿠폰' },
                { id: 'tpl-003', name: '[공지] 신규 강좌 오픈' },
                { id: 'tpl-004', name: '[알림톡] 학습 시작 안내' }
            ],

            surveyForms: [
                { id: 'sf-001', name: '가장 기대하는 강의 설문조사', count: 1247 },
                { id: 'sf-002', name: '특강 신청자 명단 수집', count: 892 },
                { id: 'sf-003', name: '3월 만족도 조사', count: 234 },
                { id: 'sf-004', name: '강사 인기도 조사 (2026년 3월)', count: 358 },
                { id: 'sf-005', name: '깜짝 1:1 코칭 신청', count: 300 },
                { id: 'sf-006', name: '이벤트 - 자기자랑', count: 73 }
            ],

            currentUser: {
                email: 'minjun.kim@example.com',
                phone: '010-0000-0000'
            },

            unitPriceMap: {
                sms: 9.9,
                kakao: 8.0,
                rcs: 12.0,
                email: 0.65,
                push: 0.5
            },

            // 폼 상태
            form: this.makeEmptyForm(),

            // 수신자 설정 토글
            recipientOpen: true,

            // 모달들
            recipientInputModal: { name: '', phone: '' },
            addressBookModal: {
                search: '',
                selectedIds: [],
                page: 1,
                pageSize: 10,
                contacts: [
                    { id: 101, name: 'CDNETWORKS', phone: '010-0000-0001' },
                    { id: 102, name: 'CDNW', phone: '010-0000-0002' },
                    { id: 103, name: '강주영', phone: '010-2345-6789' },
                    { id: 104, name: '강태미', phone: '010-1111-2222' },
                    { id: 105, name: '권지혜', phone: '010-2222-3333' },
                    { id: 106, name: '김건', phone: '010-3333-4444' },
                    { id: 107, name: '김규필', phone: '010-4444-5555' },
                    { id: 108, name: '김덕조', phone: '010-5555-6666' },
                    { id: 109, name: '김도형', phone: '010-1234-5678' },
                    { id: 110, name: '김민찬', phone: '010-6666-7777' },
                    { id: 111, name: '김보경', phone: '010-7777-8888' },
                    { id: 112, name: '박지수', phone: '010-8888-9999' },
                    { id: 113, name: '이현우', phone: '010-9999-0000' },
                    { id: 114, name: '정수민', phone: '010-1010-2020' },
                    { id: 115, name: '최영준', phone: '010-3030-4040' }
                ]
            },
            loadCampaignModal: {
                search: '',
                selectedId: ''
            },
            surveyFormModal: {
                search: '',
                sort: 'latest',
                selectedIds: []
            },
            testSendModal: {
                channels: [],
                expectedDeduct: 0
            },
            creditModal: {
                shortage: 0
            },
            alertText: '',
            modals: null
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                recipientInput: new bootstrap.Modal(this.$refs.recipientInputModal),
                addressBook: new bootstrap.Modal(this.$refs.addressBookModal),
                loadCampaign: new bootstrap.Modal(this.$refs.loadCampaignModal),
                surveyForm: new bootstrap.Modal(this.$refs.surveyFormModal),
                testSend: new bootstrap.Modal(this.$refs.testSendModal),
                sendConfirm: new bootstrap.Modal(this.$refs.sendConfirmModal),
                credit: new bootstrap.Modal(this.$refs.creditModal),
                required: new bootstrap.Modal(this.$refs.requiredModal),
                reReserve: new bootstrap.Modal(this.$refs.reReserveModal),
                completed: new bootstrap.Modal(this.$refs.completedModal),
                stopPending: new bootstrap.Modal(this.$refs.stopPendingModal),
                stopRunning: new bootstrap.Modal(this.$refs.stopRunningModal),
                copy: new bootstrap.Modal(this.$refs.copyModal),
                delete: new bootstrap.Modal(this.$refs.deleteModal),
                alert: new bootstrap.Modal(this.$refs.alertModal)
            };
        });
    },

    computed: {
        filteredRows() {
            const k = this.search.keyword.trim().toLowerCase();
            return this.campaigns.filter(c => {
                if (k && !c.name.toLowerCase().includes(k)) return false;
                if (this.search.status && c.status !== this.search.status) return false;
                if (this.search.channel && c.channel !== this.search.channel) return false;
                if (this.search.purpose && c.purpose !== this.search.purpose) return false;
                return true;
            });
        },
        sortedRows() {
            const list = this.filteredRows.slice();
            if (this.search.sort === 'name') {
                list.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
            } else if (this.search.sort === 'latest') {
                list.reverse();
            }
            return list;
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.sortedRows.length / this.pageSize));
        },
        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.sortedRows.slice(start, start + this.pageSize);
        },
        pageRange() {
            const pages = [];
            const maxBtns = 5;
            let start = Math.max(1, this.page - Math.floor(maxBtns / 2));
            let end = Math.min(this.totalPages, start + maxBtns - 1);
            if (end - start + 1 < maxBtns) start = Math.max(1, end - maxBtns + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            return pages;
        },
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedIds.includes(r.id));
        },
        isAllRecipientsSelected() {
            return this.recipients.length > 0 && this.recipients.every(r => this.selectedRecipientIds.includes(r.id));
        },
        filteredAddressBook() {
            const q = this.addressBookModal.search.trim().toLowerCase();
            if (!q) return this.addressBookModal.contacts;
            return this.addressBookModal.contacts.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
        },
        addressBookTotalPages() {
            return Math.max(1, Math.ceil(this.filteredAddressBook.length / this.addressBookModal.pageSize));
        },
        pagedAddressBook() {
            const start = (this.addressBookModal.page - 1) * this.addressBookModal.pageSize;
            return this.filteredAddressBook.slice(start, start + this.addressBookModal.pageSize);
        },
        isAddressBookAllSelected() {
            const ids = this.pagedAddressBook.map(c => c.id);
            return ids.length > 0 && ids.every(id => this.addressBookModal.selectedIds.includes(id));
        },
        filteredLoadCampaigns() {
            const q = this.loadCampaignModal.search.trim().toLowerCase();
            if (!q) return this.campaigns;
            return this.campaigns.filter(c => c.name.toLowerCase().includes(q));
        },
        filteredSurveyForms() {
            const q = this.surveyFormModal.search.trim().toLowerCase();
            const list = q ? this.surveyForms.filter(f => f.name.toLowerCase().includes(q)) : this.surveyForms.slice();
            if (this.surveyFormModal.sort === 'name') {
                list.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
            }
            return list;
        },
        simulation() {
            const totalReceiver = this.recipients.length;
            const groupNames = totalReceiver > 0 ? `직접 입력 ${totalReceiver}명` : '';

            const channelNames = this.form.channels.map(c => this.getChannelLabel(c)).join(', ');
            const unitPrices = this.form.channels.map(c => ({
                label: this.getChannelLabel(c),
                price: this.unitPriceMap[c] != null ? this.unitPriceMap[c] : 0
            }));

            const expectedCost = this.form.channels.reduce((sum, c) => {
                return sum + (this.unitPriceMap[c] || 0) * totalReceiver;
            }, 0);
            const balance = 0;
            const balanceAfter = balance - expectedCost;

            return {
                groupNames,
                totalReceiver,
                channelNames,
                unitPrices,
                balance,
                balanceAfter,
                expectedCost: Math.round(expectedCost)
            };
        }
    },

    methods: {
        makeEmptyForm() {
            return {
                id: null,
                copyFromId: '',
                name: '',
                description: '',
                purpose: 'notice',
                purposeCustom: '',
                channels: [],
                templateId: '',
                surveyForms: [],
                timingType: 'immediate',
                reserveDateTime: '',
                status: 'draft'
            };
        },

        // ========== 수신자 (직접입력 / 주소록) ==========
        addRecipientManually() {
            this.recipientInputModal.name = '';
            this.recipientInputModal.phone = '';
            this.showModal('recipientInput');
        },
        confirmRecipientInput() {
            const phone = this.recipientInputModal.phone.trim();
            if (!/^\d{10,11}$/.test(phone)) {
                this.showAlert('휴대폰 번호 10~11자리 숫자만 입력하세요.');
                return;
            }
            const formatted = phone.length === 11
                ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
                : `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
            this.recipients.push({
                id: Date.now() + Math.random(),
                name: this.recipientInputModal.name.trim() || '직접입력',
                phone: formatted,
                varValue: ''
            });
            this.closeModal('recipientInput');
        },
        openAddressBook() {
            this.addressBookModal.search = '';
            this.addressBookModal.selectedIds = [];
            this.addressBookModal.page = 1;
            this.showModal('addressBook');
        },
        toggleAddressBookAll(e) {
            const ids = this.pagedAddressBook.map(c => c.id);
            if (e.target.checked) {
                const merged = new Set([...this.addressBookModal.selectedIds, ...ids]);
                this.addressBookModal.selectedIds = Array.from(merged);
            } else {
                this.addressBookModal.selectedIds = this.addressBookModal.selectedIds.filter(id => !ids.includes(id));
            }
        },
        confirmAddressBook() {
            const picked = this.addressBookModal.contacts.filter(c => this.addressBookModal.selectedIds.includes(c.id));
            if (picked.length === 0) {
                this.showAlert('수신자를 선택하세요.');
                return;
            }
            const existingPhones = new Set(this.recipients.map(r => r.phone));
            picked.forEach(c => {
                if (!existingPhones.has(c.phone)) {
                    this.recipients.push({ id: Date.now() + Math.random(), name: c.name, phone: c.phone, varValue: '' });
                }
            });
            this.closeModal('addressBook');
        },
        editRecipient() {
            if (this.selectedRecipientIds.length !== 1) {
                this.showAlert('수정할 수신자 1명을 선택하세요.');
                return;
            }
            const target = this.recipients.find(r => r.id === this.selectedRecipientIds[0]);
            if (!target) return;
            const name = prompt('수신자 별칭', target.name);
            if (name === null) return;
            const phone = prompt('휴대폰 번호', target.phone);
            if (phone === null) return;
            target.name = name;
            target.phone = phone;
        },
        deleteRecipients() {
            if (this.selectedRecipientIds.length === 0) return;
            this.recipients = this.recipients.filter(r => !this.selectedRecipientIds.includes(r.id));
            this.selectedRecipientIds = [];
        },
        toggleAllRecipients(e) {
            if (e.target.checked) {
                this.selectedRecipientIds = this.recipients.map(r => r.id);
            } else {
                this.selectedRecipientIds = [];
            }
        },

        getCampaignName(id) {
            const c = this.campaigns.find(c => c.id === id);
            return c ? c.name : '';
        },

        // ========== 모달 헬퍼 ==========
        showModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].show();
        },
        closeModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].hide();
        },
        showAlert(text) {
            this.alertText = text;
            this.showModal('alert');
        },

        // ========== 라벨/아이콘 ==========
        getStatusLabel(status) {
            const map = {
                in_progress: '진행',
                pending: '대기',
                completed: '종료',
                draft: '임시',
                stopped: '중지'
            };
            return map[status] || status;
        },
        getStatusClass(status) {
            const map = {
                in_progress: 'campaign-status-inprogress',
                pending: 'campaign-status-pending',
                completed: 'campaign-status-completed',
                draft: 'campaign-status-draft',
                stopped: 'campaign-status-stopped'
            };
            return map[status] || 'history-status-default';
        },
        getChannelLabel(ch) {
            const map = {
                sms: '문자메시지',
                kakao: '알림톡',
                rcs: 'RCS',
                email: '이메일',
                push: 'PUSH'
            };
            return map[ch] || ch;
        },
        getChannelIcon(ch) {
            const map = {
                sms: 'bi-phone-fill',
                kakao: 'bi-chat-dots-fill',
                rcs: 'bi-chat-square-text-fill',
                email: 'bi-envelope-fill',
                push: 'bi-bell-fill'
            };
            return map[ch] || 'bi-broadcast';
        },
        getPurposeLabel(p) {
            const map = {
                notice: '공지',
                purchase: '구매유도',
                promotion: '프로모션',
                etc: '기타'
            };
            return map[p] || p;
        },

        // ========== 목록 ==========
        onSearch() {
            this.page = 1;
        },
        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.page = p;
        },
        toggleAllRows(e) {
            const checked = e.target.checked;
            const ids = this.pagedRows.map(r => r.id);
            if (checked) {
                const merged = new Set([...this.selectedIds, ...ids]);
                this.selectedIds = Array.from(merged);
            } else {
                this.selectedIds = this.selectedIds.filter(id => !ids.includes(id));
            }
        },

        // ========== 모드 전환 ==========
        goCreate() {
            this.form = this.makeEmptyForm();
            this.recipients = [];
            this.selectedRecipientIds = [];
            this.varInputMode = 'common';
            this.commonVar = '';
            this.mode = 'create';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        goEdit(row) {
            this.form = {
                ...this.makeEmptyForm(),
                id: row.id,
                name: row.name,
                purpose: row.purpose,
                channels: [row.channel],
                status: row.status,
                timingType: 'reserve',
                reserveDateTime: '2026-05-15T14:00'
            };
            this.recipients = [];
            this.selectedRecipientIds = [];
            this.varInputMode = 'common';
            this.commonVar = '';
            this.mode = 'edit';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        cancelForm() {
            this.mode = 'list';
        },

        // ========== 기존 캠페인 불러오기 ==========
        openLoadCampaignModal() {
            this.loadCampaignModal.search = '';
            this.loadCampaignModal.selectedId = this.form.copyFromId || '';
            this.showModal('loadCampaign');
        },
        confirmLoadCampaign() {
            if (!this.loadCampaignModal.selectedId) {
                this.showAlert('불러올 캠페인을 선택하세요.');
                return;
            }
            const src = this.campaigns.find(c => c.id === this.loadCampaignModal.selectedId);
            if (!src) return;
            const id = this.form.id;
            const status = this.form.status;
            this.form = {
                ...this.makeEmptyForm(),
                id,
                copyFromId: src.id,
                name: src.name + ' (복사본)',
                purpose: src.purpose,
                channels: [src.channel],
                status
            };
            this.recipients = [];
            this.selectedRecipientIds = [];
            this.closeModal('loadCampaign');
            this.showAlert('캠페인 정보를 불러왔습니다.');
        },

        // ========== 발송 목적 추가 ==========
        addCustomPurpose() {
            const v = this.form.purposeCustom.trim();
            if (!v) return;
            const value = 'custom-' + Date.now();
            this.purposeChips.push({ value, label: v });
            this.form.purpose = value;
            this.form.purposeCustom = '';
        },

        // ========== 설문폼 ==========
        openSurveyFormModal() {
            this.surveyFormModal.search = '';
            this.surveyFormModal.selectedIds = this.form.surveyForms.map(f => f.id);
            this.showModal('surveyForm');
        },
        confirmSurveyForm() {
            this.form.surveyForms = this.surveyForms.filter(f => this.surveyFormModal.selectedIds.includes(f.id));
            this.closeModal('surveyForm');
        },
        removeSurveyForm(id) {
            this.form.surveyForms = this.form.surveyForms.filter(f => f.id !== id);
        },

        // ========== 테스트 발송 ==========
        openTestSendModal() {
            this.testSendModal.channels = this.form.channels.slice();
            this.testSendModal.expectedDeduct = this.testSendModal.channels.reduce((sum, c) => sum + (this.unitPriceMap[c] || 0), 0);
            this.showModal('testSend');
        },
        confirmTestSend() {
            if (this.testSendModal.channels.length === 0) {
                this.showAlert('발송 채널을 선택하세요.');
                return;
            }
            this.closeModal('testSend');
            this.showAlert('테스트 발송이 완료되었습니다.');
        },

        // ========== 발송 ==========
        validateForm() {
            if (!this.form.name.trim()) return false;
            if (!this.form.purpose) return false;
            if (this.recipients.length === 0) return false;
            if (this.form.channels.length === 0) return false;
            if (this.form.timingType === 'reserve' && !this.form.reserveDateTime) return false;
            return true;
        },
        onSendClick() {
            if (this.form.status === 'completed') {
                this.showModal('completed');
                return;
            }
            if (!this.validateForm()) {
                this.showModal('required');
                return;
            }
            if (this.simulation.balance < this.simulation.expectedCost) {
                this.creditModal.shortage = this.simulation.expectedCost - this.simulation.balance;
                this.showModal('credit');
                return;
            }
            if (this.form.status === 'pending') {
                this.showModal('reReserve');
                return;
            }
            this.showModal('sendConfirm');
        },
        confirmSend() {
            this.closeModal('sendConfirm');
            this.form.status = 'in_progress';
            this.showAlert('발송이 시작되었습니다.');
        },
        confirmReReserve() {
            this.closeModal('reReserve');
            this.showModal('sendConfirm');
        },
        confirmDuplicate() {
            this.closeModal('completed');
            const dup = { ...this.makeEmptyForm() };
            dup.name = this.form.name + ' (복제본)';
            dup.purpose = this.form.purpose;
            dup.channels = this.form.channels.slice();
            this.form = dup;
            this.showAlert('캠페인이 복제되었습니다.');
        },
        goCharge() {
            this.closeModal('credit');
            this.navigateTo('/charge');
        },

        // ========== 중지 ==========
        openStopConfirm() {
            if (this.form.status === 'in_progress') {
                this.showModal('stopRunning');
            } else {
                this.showModal('stopPending');
            }
        },
        confirmStopPending() {
            this.closeModal('stopPending');
            this.form.status = 'stopped';
            this.showAlert('대기 중인 캠페인을 중지했습니다.');
        },
        confirmStopRunning() {
            this.closeModal('stopRunning');
            this.form.status = 'stopped';
            this.showAlert('진행 중인 캠페인을 중지했습니다.');
        },

        // ========== 저장 ==========
        saveCampaign() {
            if (!this.form.name.trim()) {
                this.showAlert('캠페인명을 입력하세요.');
                return;
            }
            this.showAlert('캠페인이 저장되었습니다.');
        },

        // ========== 목록 액션 ==========
        openCopyConfirm() {
            if (this.selectedIds.length === 0) return;
            this.showModal('copy');
        },
        confirmCopy() {
            const newRows = this.campaigns
                .filter(c => this.selectedIds.includes(c.id))
                .map(c => ({ ...c, id: c.id + '-copy-' + Date.now(), name: c.name + ' (복사본)', status: 'draft', totalSent: null }));
            this.campaigns.push(...newRows);
            this.selectedIds = [];
            this.closeModal('copy');
            this.showAlert(newRows.length + '건의 캠페인을 복사했습니다.');
        },
        openDeleteConfirm() {
            if (this.selectedIds.length === 0) return;
            this.showModal('delete');
        },
        confirmDelete() {
            this.campaigns = this.campaigns.filter(c => !this.selectedIds.includes(c.id));
            this.selectedIds = [];
            this.closeModal('delete');
            this.showAlert('선택한 캠페인을 삭제했습니다.');
        }
    }
};
