export default {
    name: 'RcsSend',
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
            useTemplate: false,
            selectedTemplate: null,
            varInputMode: 'common',
            commonVar: '',

            recipientOpen: true,
            recipients: [],
            selectedRecipientIds: [],

            brandOpen: false,
            brandSearch: '',
            selectedBrand: null,
            brands: [
                { id: 'b1', name: '@위캔디오', numbers: ['16447143', '15881234'] },
                { id: 'b2', name: '@맑은소프트', numbers: ['15881234'] },
                { id: 'b3', name: '@쏠쏠', numbers: ['16881234'] }
            ],

            form: {
                brandNumber: '',
                purpose: 'general',
                optout080: '',
                messageType: 'SMS',
                messageFormat: 'standalone',
                messageSubType: 'SMS',
                content: '',
                buttons: [],
                expiry: '24h',
                sendTime: 'now',
                reserveAt: ''
            },

            previousPurpose: 'general',
            submitted: false,

            optout080Numbers: ['080-123-4567', '080-987-6543'],

            expiryOptions: [
                { value: '24h', label: '24시간' },
                { value: '40s', label: '40초' },
                { value: '3m', label: '3분' },
                { value: '1h', label: '1시간' }
            ],

            buttonTypeOptions: [
                { value: 'chat', label: '대화방 열기' },
                { value: 'copy', label: '복사하기' },
                { value: 'call', label: '전화 걸기' },
                { value: 'mapShow', label: '지도 보여주기' },
                { value: 'mapSearch', label: '지도 검색하기' },
                { value: 'locationShare', label: '현재 위치 공유하기' },
                { value: 'url', label: 'URL 연결하기' },
                { value: 'calendar', label: '일정 등록하기' }
            ],

            templates: [
                { id: 'r-01', name: '01_비디오팩생성', purpose: 'general', messageType: 'LMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.', buttons: [] },
                { id: 'r-02-1', name: '02-1_비디오팩생성2일경과_upload_N', purpose: 'general', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 영상을 아직 등록하지 않으셨어요.', buttons: [] },
                { id: 'r-02-2', name: '02-2_비디오팩생성2일경과_upload_Y', purpose: 'general', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 첫 영상 등록 감사합니다.', buttons: [] },
                { id: 'r-03-1', name: '03-1_비디오팩생성5일경과_upload_N', purpose: 'general', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 5일이 지났습니다.', buttons: [] },
                { id: 'r-03-2', name: '03-2_비디오팩생성5일경과_upload_Y', purpose: 'general', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 활용 도움말을 확인해 보세요.', buttons: [] },
                { id: 'r-04', name: '04_만기1일전', purpose: 'general', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 구독 만기 1일 전입니다.', buttons: [] },
                { id: 'r-05', name: '05_기간만료', purpose: 'general', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 구독 기간이 만료되었습니다.', buttons: [] },
                { id: 'r-06-1', name: '06-1_사용량초과_스토리지_무료플랜', purpose: 'general', messageType: 'LMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 무료 플랜 스토리지 사용량을 초과했습니다.', buttons: [] },
                { id: 'r-06-2', name: '06-2_사용량초과_스토리지_구독플랜', purpose: 'general', messageType: 'LMS', messageFormat: 'standalone', messageSubType: 'SMS', content: '#{name}님, 구독 플랜 스토리지 사용량을 초과했습니다.', buttons: [] }
            ],

            templateModal: { search: '', selectedId: null, page: 1, pageSize: 9 },
            recipientInputModal: { name: '', phone: '', varValue: '' },
            recipientEditModal: { id: null, name: '', phone: '', varValue: '' },
            addressBookModal: {
                search: '',
                selectedIds: [],
                varMap: {},
                page: 1,
                pageSize: 9,
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
                    { id: 118, name: '박지원', phone: '010-9090-1212' }
                ]
            },
            buttonModal: { editIndex: null, type: '', name: '', value: '' }
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                template: new bootstrap.Modal(this.$refs.templateModal),
                recipientInput: new bootstrap.Modal(this.$refs.recipientInputModal),
                recipientEdit: new bootstrap.Modal(this.$refs.recipientEditModal),
                addressBook: new bootstrap.Modal(this.$refs.addressBookModal),
                button: new bootstrap.Modal(this.$refs.buttonModal),
                reset: new bootstrap.Modal(this.$refs.resetModal)
            };
        });
    },

    computed: {
        isAllSelected() {
            return this.recipients.length > 0 && this.selectedRecipientIds.length === this.recipients.length;
        },
        isTemplateLocked() {
            return this.useTemplate && !!this.selectedTemplate;
        },
        previewText() {
            const value = this.varInputMode === 'common' && this.commonVar ? this.commonVar : '#{name}';
            return this.form.content.replace(/#\{name\}/g, value);
        },
        filteredBrands() {
            const q = this.brandSearch.trim().toLowerCase();
            if (!q) return this.brands;
            return this.brands.filter(b => b.name.toLowerCase().includes(q));
        },
        brandNumbers() {
            return this.selectedBrand ? this.selectedBrand.numbers : [];
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
        },
        buttonValueLabel() {
            const map = { url: 'URL', copy: '복사할 값', call: '전화번호' };
            return map[this.buttonModal.type] || '값';
        },
        buttonValuePlaceholder() {
            const map = { url: 'https://example.com', copy: '복사할 텍스트', call: '01012345678' };
            return map[this.buttonModal.type] || '';
        },
        messageTypeText() {
            const formatMap = { standalone: '기본형', conversational: '대화형' };
            return ['템플릿', this.form.messageType, formatMap[this.form.messageFormat] || ''].filter(Boolean).join('/');
        }
    },

    methods: {
        showModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].show();
        },
        closeModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].hide();
        },

        buttonTypeLabel(value) {
            const opt = this.buttonTypeOptions.find(o => o.value === value);
            return opt ? opt.label : value;
        },
        buttonValueLabelStatic(type) {
            const map = { url: 'URL', copy: '복사할 값', call: '전화번호' };
            return map[type] || '값';
        },
        moveButton(index, delta) {
            const target = index + delta;
            if (target < 0 || target >= this.form.buttons.length) return;
            const arr = this.form.buttons;
            [arr[index], arr[target]] = [arr[target], arr[index]];
        },

        // ===== 템플릿 =====
        onTemplateUseChange() {
            if (!this.useTemplate) {
                this.selectedTemplate = null;
                this.commonVar = '';
            }
        },
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
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.messageType = tpl.messageType;
            this.form.messageFormat = tpl.messageFormat;
            this.form.messageSubType = tpl.messageSubType;
            this.form.content = tpl.content;
            this.form.buttons = JSON.parse(JSON.stringify(tpl.buttons || []));
            this.closeModal('template');
        },

        // ===== 발신 브랜드 =====
        toggleBrand() {
            if (this.isTemplateLocked) return;
            this.brandOpen = !this.brandOpen;
            if (this.brandOpen) this.brandSearch = '';
        },
        closeBrand() {
            this.brandOpen = false;
        },
        selectBrand(b) {
            this.selectedBrand = b;
            this.form.brandNumber = b.numbers && b.numbers.length === 1 ? b.numbers[0] : '';
            this.brandOpen = false;
        },

        // ===== 직접입력 =====
        addRecipientManually() {
            this.recipientInputModal.name = '';
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
                name: this.recipientInputModal.name.trim() || '직접입력',
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

        uploadExcel() {
            alert('엑셀 업로드는 추후 연결됩니다.');
        },

        // ===== 수신자 수정/삭제 =====
        editRecipient() {
            if (this.selectedRecipientIds.length !== 1) return;
            const target = this.recipients.find(r => r.id === this.selectedRecipientIds[0]);
            if (!target) return;
            this.recipientEditModal.id = target.id;
            this.recipientEditModal.name = target.name;
            this.recipientEditModal.phone = target.phone;
            this.recipientEditModal.varValue = target.varValue || '';
            this.showModal('recipientEdit');
        },
        confirmRecipientEdit() {
            const target = this.recipients.find(r => r.id === this.recipientEditModal.id);
            if (target) {
                target.name = this.recipientEditModal.name.trim() || target.name;
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

        // ===== 광고용 =====
        onPurposeSelect(value) {
            this.previousPurpose = this.form.purpose;
            this.form.purpose = value;
            if (value !== 'ad') this.form.optout080 = '';
        },

        // ===== 버튼 =====
        openButtonModal() {
            this.buttonModal.editIndex = null;
            this.buttonModal.type = '';
            this.buttonModal.name = '';
            this.buttonModal.value = '';
            this.showModal('button');
        },
        confirmButton() {
            if (!this.buttonModal.type) {
                alert('버튼 유형을 선택하세요.');
                return;
            }
            if (!this.buttonModal.name.trim()) {
                alert('버튼 이름을 입력하세요.');
                return;
            }
            const btn = {
                type: this.buttonModal.type,
                name: this.buttonModal.name.trim(),
                value: this.buttonModal.value.trim()
            };
            if (this.buttonModal.editIndex !== null) {
                this.form.buttons.splice(this.buttonModal.editIndex, 1, btn);
            } else {
                this.form.buttons.push(btn);
            }
            this.closeModal('button');
        },
        removeButton(i) {
            this.form.buttons.splice(i, 1);
        },

        // ===== 발송/초기화 =====
        validate() {
            if (!this.selectedBrand) {
                alert('발신 브랜드를 선택하세요.');
                return false;
            }
            if (!this.form.brandNumber) {
                alert('발신 번호를 선택하세요.');
                return false;
            }
            if (this.recipients.length === 0) return false;
            if (!this.form.content.trim()) return false;
            if (this.form.purpose === 'ad' && !this.form.optout080) {
                alert('광고용 발송 시 080 수신 거부 번호를 선택하세요.');
                return false;
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
            alert('RCS 메시지가 발송되었습니다.');
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
            this.useTemplate = false;
            this.selectedTemplate = null;
            this.varInputMode = 'common';
            this.commonVar = '';
            this.selectedRecipientIds = [];
            this.selectedBrand = null;
            this.brandOpen = false;
            this.form = {
                brandNumber: '',
                purpose: 'general',
                optout080: '',
                messageType: 'SMS',
                messageFormat: 'standalone',
                messageSubType: 'SMS',
                content: '',
                buttons: [],
                expiry: '24h',
                sendTime: 'now',
                reserveAt: ''
            };
            this.previousPurpose = 'general';
            this.submitted = false;
        }
    }
};
