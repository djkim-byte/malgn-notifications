export default {
    name: 'KakaoSend',
    layout: 'default',

    directives: {
        'click-outside': {
            mounted(el, binding) {
                el._clickOutsideHandler = (e) => {
                    if (!el.contains(e.target)) binding.value(e);
                };
                document.addEventListener('click', el._clickOutsideHandler);
            },
            unmounted(el) {
                document.removeEventListener('click', el._clickOutsideHandler);
            }
        }
    },

    data() {
        return {
            profileOpen: false,
            profileSearch: '',
            selectedProfile: null,
            profiles: [
                { id: 'p1', name: '@위캔디오' },
                { id: 'p2', name: '@맑은소프트' },
                { id: 'p3', name: '@쏠쏠' }
            ],

            selectedTemplate: null,
            varInputMode: 'common',
            commonVar: '',
            expandedButtons: [0],

            recipientOpen: true,
            recipients: [],
            selectedRecipientIds: [],

            form: {
                sendTime: 'now',
                reserveAt: ''
            },

            submitted: false,

            templates: [
                {
                    id: 'k-01',
                    name: '01_비디오팩생성',
                    templateCode: '01',
                    kakaoCode: '01',
                    purpose: 'general',
                    messageType: 'extra',
                    emphasisType: '선택 안함',
                    secure: false,
                    content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n▶ 시작 가이드\nhttps://support.wecandeo.com/docs/videopack-guide-quick-start\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.',
                    extraInfo: '▶ 아래 버튼에서 시작 가이드를 확인해 주세요.\n궁금한 점은 문의로 남겨주세요.',
                    links: { mobile: 'https://www.wecandeo.com', pc: 'https://www.wecandeo.com' },
                    buttons: [
                        { type: '웹 링크', icon: '👉', name: '시작 가이드', mobile: 'https://support.wecandeo.com/docs/videopack-guide-quick-start', pc: 'https://support.wecandeo.com/docs/videopack-guide-quick-start' },
                        { type: '웹 링크', icon: '💬', name: '문의하기', mobile: 'https://www.wecandeo.com/contact', pc: 'https://www.wecandeo.com/contact' }
                    ]
                },
                { id: 'k-02-1', name: '02-1_비디오팩생성2일경과', templateCode: '02', kakaoCode: '02', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 비디오팩 생성 후 2일이 지났습니다.\n\n아직 첫 영상을 등록하지 않으셨다면 시작 가이드를 확인해 주세요.', buttons: [] },
                { id: 'k-02-2', name: '02-2_비디오팩생성2일경과', templateCode: '02', kakaoCode: '02', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 영상 등록을 시작해 보세요.', buttons: [] },
                { id: 'k-03-1', name: '03-1_비디오팩생성5일경과', templateCode: '03', kakaoCode: '03', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 비디오팩 생성 후 5일이 경과했습니다.', buttons: [] },
                { id: 'k-03-2', name: '03-2_비디오팩생성5일경과', templateCode: '03', kakaoCode: '03', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 활용 도움말을 확인해 보세요.', buttons: [] },
                { id: 'k-04', name: '04_만기1일전', templateCode: '04', kakaoCode: '04', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 구독 만기 1일 전입니다. 갱신을 잊지 마세요.', buttons: [] },
                { id: 'k-05', name: '05_기간만료', templateCode: '05', kakaoCode: '05', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 구독 기간이 만료되었습니다.', buttons: [] },
                { id: 'k-06-1', name: '06-1_사용량초과_스토리지_무료플랜', templateCode: '06', kakaoCode: '06', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 무료 플랜의 스토리지 사용량을 초과했습니다.', buttons: [] },
                { id: 'k-06-2', name: '06-2_사용량초과_스토리지_구독플랜', templateCode: '06', kakaoCode: '06', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 구독 플랜의 스토리지 사용량을 초과했습니다.', buttons: [] }
            ],

            templateModal: { search: '', selectedId: null, page: 1, pageSize: 9 },
            recipientInputModal: { phone: '', varValue: '' },
            recipientEditModal: { id: null, phone: '', varValue: '' },
            addressBookModal: {
                search: '',
                selectedIds: [],
                varMap: {},
                page: 1,
                pageSize: 8,
                submitted: false,
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
                    { id: 112, name: '김선아', phone: '010-8888-9999' },
                    { id: 113, name: '김성호', phone: '010-9999-0000' },
                    { id: 114, name: '김유진', phone: '010-1212-3434' },
                    { id: 115, name: '김재윤', phone: '010-3434-5656' },
                    { id: 116, name: '박민수', phone: '010-5656-7878' },
                    { id: 117, name: '박서연', phone: '010-7878-9090' },
                    { id: 118, name: '박지원', phone: '010-9090-1212' },
                    { id: 119, name: '서지훈', phone: '010-1313-2424' },
                    { id: 120, name: '신예린', phone: '010-2424-3535' },
                    { id: 121, name: '오세훈', phone: '010-3535-4646' },
                    { id: 122, name: '윤지수', phone: '010-4646-5757' },
                    { id: 123, name: '이도윤', phone: '010-5757-6868' }
                ]
            }
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                template: new bootstrap.Modal(this.$refs.templateModal),
                recipientInput: new bootstrap.Modal(this.$refs.recipientInputModal),
                recipientEdit: new bootstrap.Modal(this.$refs.recipientEditModal),
                addressBook: new bootstrap.Modal(this.$refs.addressBookModal),
                reset: new bootstrap.Modal(this.$refs.resetModal)
            };
        });
    },

    computed: {
        filteredProfiles() {
            const q = this.profileSearch.trim().toLowerCase();
            if (!q) return this.profiles;
            return this.profiles.filter(p => p.name.toLowerCase().includes(q));
        },
        purposeLabel() {
            const map = { general: '일반용', auth: '인증용', ad: '광고용' };
            return this.selectedTemplate ? (map[this.selectedTemplate.purpose] || '일반용') : '';
        },
        messageTypeLabel() {
            const map = { basic: '기본형', extra: '부가 정보형', channel: '채널 추가형', emphasis: '강조 표기형' };
            return this.selectedTemplate ? (map[this.selectedTemplate.messageType] || '기본형') : '';
        },
        previewContent() {
            if (!this.selectedTemplate) return '';
            const value = this.varInputMode === 'common' && this.commonVar ? this.commonVar : '#{name}';
            return this.selectedTemplate.content.replace(/#\{name\}/g, value);
        },
        templateVarPlaceholder() {
            return '{{%name%}}';
        },
        isAllSelected() {
            return this.recipients.length > 0 && this.selectedRecipientIds.length === this.recipients.length;
        },
        filteredTemplates() {
            const q = this.templateModal.search.trim().toLowerCase();
            if (!q) return this.templates;
            return this.templates.filter(t => t.name.toLowerCase().includes(q));
        },
        templateTotalPages() {
            return Math.max(1, Math.ceil(this.filteredTemplates.length / this.templateModal.pageSize));
        },
        pagedTemplateList() {
            const start = (this.templateModal.page - 1) * this.templateModal.pageSize;
            return this.filteredTemplates.slice(start, start + this.templateModal.pageSize);
        },
        modalPreviewTemplate() {
            return this.templates.find(t => t.id === this.templateModal.selectedId);
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
        selectedAddressBookContacts() {
            return this.addressBookModal.contacts.filter(c => this.addressBookModal.selectedIds.includes(c.id));
        }
    },

    methods: {
        showModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].show();
        },
        closeModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].hide();
        },

        // ===== 발신 프로필 =====
        toggleProfile() {
            this.profileOpen = !this.profileOpen;
            if (this.profileOpen) this.profileSearch = '';
        },
        closeProfile() {
            this.profileOpen = false;
        },
        selectProfile(p) {
            this.selectedProfile = p;
            this.profileOpen = false;
        },

        // ===== 템플릿 =====
        openTemplatePicker() {
            this.templateModal.search = '';
            this.templateModal.page = 1;
            this.templateModal.selectedId = this.selectedTemplate ? this.selectedTemplate.id : null;
            this.showModal('template');
        },
        confirmTemplate() {
            const tpl = this.templates.find(t => t.id === this.templateModal.selectedId);
            if (!tpl) {
                alert('템플릿을 선택하세요.');
                return;
            }
            this.selectedTemplate = JSON.parse(JSON.stringify(tpl));
            this.expandedButtons = this.selectedTemplate.buttons && this.selectedTemplate.buttons.length > 0 ? [0] : [];
            this.closeModal('template');
        },
        toggleButton(i) {
            const idx = this.expandedButtons.indexOf(i);
            if (idx >= 0) this.expandedButtons.splice(idx, 1);
            else this.expandedButtons.push(i);
        },

        // ===== 직접입력 =====
        addRecipientManually() {
            this.recipientInputModal.phone = '';
            this.recipientInputModal.varValue = '';
            this.showModal('recipientInput');
        },
        confirmRecipientInput() {
            const phone = this.recipientInputModal.phone.trim();
            if (!/^\d{10,11}$/.test(phone)) {
                alert('휴대폰 번호 10~11자리 숫자만 입력하세요.');
                return;
            }
            const formatted = phone.length === 11
                ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
                : `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
            this.recipients.push({
                id: Date.now(),
                name: '직접입력',
                phone: formatted,
                varValue: this.recipientInputModal.varValue
            });
            this.closeModal('recipientInput');
        },

        // ===== 주소록 =====
        openAddressBook() {
            this.addressBookModal.search = '';
            this.addressBookModal.selectedIds = [];
            this.addressBookModal.varMap = {};
            this.addressBookModal.page = 1;
            this.addressBookModal.submitted = false;
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
            if (this.addressBookModal.selectedIds.length === 0) {
                alert('수신자를 선택하세요.');
                return;
            }
            if (this.varInputMode === 'individual') {
                this.addressBookModal.submitted = true;
                const missing = this.addressBookModal.selectedIds.find(id => !this.addressBookModal.varMap[id]);
                if (missing) return;
            }
            const picked = this.addressBookModal.contacts.filter(c => this.addressBookModal.selectedIds.includes(c.id));
            const existingPhones = new Set(this.recipients.map(r => r.phone));
            picked.forEach(c => {
                if (!existingPhones.has(c.phone)) {
                    this.recipients.push({
                        id: Date.now() + Math.random(),
                        name: c.name,
                        phone: c.phone,
                        varValue: this.addressBookModal.varMap[c.id] || ''
                    });
                }
            });
            this.closeModal('addressBook');
        },

        // ===== 수신자 수정/삭제 =====
        editRecipient() {
            if (this.selectedRecipientIds.length !== 1) return;
            const target = this.recipients.find(r => r.id === this.selectedRecipientIds[0]);
            if (!target) return;
            this.recipientEditModal.id = target.id;
            this.recipientEditModal.phone = target.phone;
            this.recipientEditModal.varValue = target.varValue || '';
            this.showModal('recipientEdit');
        },
        confirmRecipientEdit() {
            const target = this.recipients.find(r => r.id === this.recipientEditModal.id);
            if (target) {
                target.phone = this.recipientEditModal.phone;
                target.varValue = this.recipientEditModal.varValue;
            }
            this.closeModal('recipientEdit');
        },
        deleteRecipients() {
            if (this.selectedRecipientIds.length === 0) return;
            this.recipients = this.recipients.filter(r => !this.selectedRecipientIds.includes(r.id));
            this.selectedRecipientIds = [];
        },
        toggleAllRecipients(e) {
            this.selectedRecipientIds = e.target.checked ? this.recipients.map(r => r.id) : [];
        },

        // ===== 발송/초기화 =====
        validate() {
            if (!this.selectedProfile) {
                alert('발신 프로필을 선택하세요.');
                return false;
            }
            if (!this.selectedTemplate) {
                alert('템플릿을 선택하세요.');
                return false;
            }
            if (this.recipients.length === 0) return false;
            if (this.varInputMode === 'common' && !this.commonVar.trim()) {
                alert('공통 치환자를 입력하세요.');
                return false;
            }
            if (this.varInputMode === 'individual') {
                const missing = this.recipients.find(r => !r.varValue);
                if (missing) {
                    alert('모든 수신자의 치환자를 입력하세요.');
                    return false;
                }
            }
            if (this.form.sendTime === 'reserve' && !this.form.reserveAt) {
                alert('예약 일시를 선택하세요.');
                return false;
            }
            return true;
        },
        handleSubmit() {
            this.submitted = true;
            if (!this.validate()) return;
            alert('알림톡이 발송되었습니다.');
            this.doReset();
        },
        openResetConfirm() {
            this.showModal('reset');
        },
        confirmReset() {
            this.doReset();
            this.closeModal('reset');
        },
        doReset() {
            this.selectedProfile = null;
            this.selectedTemplate = null;
            this.varInputMode = 'common';
            this.commonVar = '';
            this.expandedButtons = [];
            this.selectedRecipientIds = [];
            this.form = { sendTime: 'now', reserveAt: '' };
            this.submitted = false;
        }
    }
};
