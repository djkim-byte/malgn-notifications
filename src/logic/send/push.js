export default {
    name: 'PushSend',
    layout: 'default',

    data() {
        return {
            useTemplate: false,
            selectedTemplate: null,

            recipientOpen: true,
            recipients: [],
            selectedRecipientIds: [],

            form: {
                purpose: 'general',
                adContact: '',
                adWithdrawGuide: '',
                inputType: 'basic',
                htmlStyle: 'use',
                title: '',
                content: '',
                badge: '',
                buttons: [],
                media: { url: '', type: '', expand: '' },
                androidMedia: { url: '', type: 'image', expand: '' },
                iosMedia: { url: '', type: '' },
                androidLargeIcon: { url: '' },
                groups: [],
                jsonContent: '',
                jsonHtmlStyle: 'use',
                sendTime: 'now',
                reserveAt: ''
            },

            submitted: false,

            templates: [
                { id: 'pt-01', name: '01_가입환영', title: '가입을 환영합니다', content: '#{name}님, 서비스 가입을 환영합니다.' },
                { id: 'pt-02', name: '02_이벤트안내', title: '이벤트 안내', content: '#{name}님, 새로운 이벤트가 시작되었습니다.' },
                { id: 'pt-03', name: '03_결제완료', title: '결제 완료', content: '결제가 정상적으로 처리되었습니다.' }
            ],

            templateModal: { search: '', selectedId: null, page: 1, pageSize: 8 },
            recipientInputModal: {
                adding: false,
                draft: { pushType: '', token: '' },
                tokens: []
            },
            recipientEditModal: { id: null, name: '', token: '', pushType: '' },
            addressBookModal: {
                search: '',
                selectedIds: [],
                previewId: null,
                page: 1,
                pageSize: 10,
                contacts: [
                    { id: 101, name: 'CDNETWORKS', pushType: 'FCM', token: 'fcm-token-cdnetworks-0001abcdef0123456789' },
                    { id: 102, name: 'CDNW', pushType: 'APNS', token: 'apns-token-cdnw-0002abcdef0123456789' },
                    { id: 103, name: '강주영', pushType: 'FCM', token: 'fcm-token-kjy-0003abcdef0123456789' },
                    { id: 104, name: '강태미', pushType: 'APNS_SANDBOX', token: 'apns-sb-token-ktm-0004abcdef0123456789' },
                    { id: 105, name: '권지혜', pushType: 'FCM', token: 'fcm-token-kjh-0005abcdef0123456789' },
                    { id: 106, name: '김건', pushType: 'APNS', token: 'apns-token-kg-0006abcdef0123456789' },
                    { id: 107, name: '김규필', pushType: 'ADM', token: 'adm-token-kkp-0007abcdef0123456789' },
                    { id: 108, name: '김덕조', pushType: 'FCM', token: 'fcm-token-kdj-0008abcdef0123456789' },
                    { id: 109, name: '김도형', pushType: 'APNS', token: 'apns-token-kdh-0009abcdef0123456789' },
                    { id: 110, name: '김민찬', pushType: 'APNS_VOIP', token: 'apns-voip-token-kmc-0010abcdef0123456789' },
                    { id: 111, name: '김보경', pushType: 'FCM', token: 'fcm-token-kbk-0011abcdef0123456789' },
                    { id: 112, name: '김선아', pushType: 'APNS', token: 'apns-token-ksa-0012abcdef0123456789' },
                    { id: 113, name: '김성호', pushType: 'FCM', token: 'fcm-token-ksh-0013abcdef0123456789' },
                    { id: 114, name: '김유진', pushType: 'APNS_SANDBOX_VOIP', token: 'apns-sbvoip-token-kyj-0014abcdef0123456789' },
                    { id: 115, name: '김재윤', pushType: 'FCM', token: 'fcm-token-kjy2-0015abcdef0123456789' },
                    { id: 116, name: '박민수', pushType: 'APNS', token: 'apns-token-pms-0016abcdef0123456789' },
                    { id: 117, name: '박서연', pushType: 'FCM', token: 'fcm-token-psy-0017abcdef0123456789' },
                    { id: 118, name: '박지원', pushType: 'ADM', token: 'adm-token-pjw-0018abcdef0123456789' },
                    { id: 119, name: '서지훈', pushType: 'FCM', token: 'fcm-token-sjh-0019abcdef0123456789' },
                    { id: 120, name: '신예린', pushType: 'APNS', token: 'apns-token-syr-0020abcdef0123456789' }
                ]
            },
            buttonModal: { editIndex: null, type: '' },
            mediaModal: { target: 'media', editing: false, url: '', type: '', expand: '' },
            largeIconModal: { url: '' },
            groupModal: { editIndex: null, key: '', description: '' }
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
                media: new bootstrap.Modal(this.$refs.mediaModal),
                largeIcon: new bootstrap.Modal(this.$refs.largeIconModal),
                group: new bootstrap.Modal(this.$refs.groupModal),
                reset: new bootstrap.Modal(this.$refs.resetModal)
            };
        });
    },

    computed: {
        isAllSelected() {
            return this.recipients.length > 0 && this.selectedRecipientIds.length === this.recipients.length;
        },
        previewTitle() {
            if (this.form.inputType === 'basic') return this.form.title;
            return this.parseJsonField('title');
        },
        previewContent() {
            if (this.form.inputType === 'basic') return this.form.content;
            const body = this.parseJsonField('body') || this.parseJsonField('content');
            return body;
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
            return this.addressBookModal.contacts.filter(c => c.name.toLowerCase().includes(q) || (c.token || '').toLowerCase().includes(q));
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
        mediaModalTitle() {
            const map = { media: '미디어', androidMedia: '미디어', iosMedia: '미디어' };
            return map[this.mediaModal.target] || '미디어';
        },
        addressBookPreview() {
            if (!this.addressBookModal.previewId) return null;
            return this.addressBookModal.contacts.find(c => c.id === this.addressBookModal.previewId) || null;
        }
    },

    methods: {
        showModal(name) { if (this.modals && this.modals[name]) this.modals[name].show(); },
        closeModal(name) { if (this.modals && this.modals[name]) this.modals[name].hide(); },

        parseJsonField(key) {
            try {
                const obj = JSON.parse(this.form.jsonContent);
                return obj && typeof obj === 'object' ? (obj[key] || '') : '';
            } catch (e) {
                return '';
            }
        },

        buttonTypeLabel(type) {
            const map = { reply: '응답', openApp: '앱 열기', openUrl: 'URL 열기', close: '닫기' };
            return map[type] || type;
        },
        mediaTypeLabel(type) {
            const map = { image: '이미지', gif: 'GIF', video: '동영상', sound: '소리' };
            return map[type] || type || '미디어';
        },
        pushTypeLabel(type) {
            const map = {
                FCM: 'FCM',
                APNS: 'APNS',
                APNS_SANDBOX: 'APNS SANDBOX',
                APNS_VOIP: 'APNS VOIP',
                APNS_SANDBOX_VOIP: 'APNS SANDBOX VOIP',
                ADM: 'ADM'
            };
            return map[type] || type || '';
        },
        onAdContactInput(e) {
            const v = String(e.target.value || '').replace(/\D/g, '').slice(0, 11);
            this.form.adContact = v;
        },

        // ===== 템플릿 =====
        onTemplateUseChange() {
            if (!this.useTemplate) {
                this.selectedTemplate = null;
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
            if (!tpl) return;
            this.selectedTemplate = JSON.parse(JSON.stringify(tpl));
            this.form.title = tpl.title || '';
            this.form.content = tpl.content || '';
            this.closeModal('template');
        },

        // ===== 직접입력 (수신자 정보 - 토큰) =====
        addRecipientManually() {
            this.recipientInputModal.adding = false;
            this.recipientInputModal.draft = { pushType: '', token: '' };
            this.recipientInputModal.tokens = [];
            this.showModal('recipientInput');
        },
        openTokenForm() {
            this.recipientInputModal.draft = { pushType: '', token: '' };
            this.recipientInputModal.adding = true;
        },
        cancelTokenDraft() {
            this.recipientInputModal.draft = { pushType: '', token: '' };
            this.recipientInputModal.adding = false;
        },
        saveTokenDraft() {
            const draft = this.recipientInputModal.draft;
            if (!draft.pushType) {
                alert('푸시 유형을 선택하세요.');
                return;
            }
            if (!draft.token.trim()) {
                alert('토큰을 입력하세요.');
                return;
            }
            this.recipientInputModal.tokens.push({
                pushType: draft.pushType,
                token: draft.token.trim()
            });
            this.recipientInputModal.draft = { pushType: '', token: '' };
            this.recipientInputModal.adding = false;
        },
        removeTokenDraft(i) {
            this.recipientInputModal.tokens.splice(i, 1);
        },
        confirmRecipientInput() {
            const tokens = this.recipientInputModal.tokens;
            if (tokens.length === 0) {
                alert('토큰을 1개 이상 추가하세요.');
                return;
            }
            const existingTokens = new Set(this.recipients.map(r => r.token));
            tokens.forEach(t => {
                if (!existingTokens.has(t.token)) {
                    this.recipients.push({
                        id: Date.now() + Math.random(),
                        name: '직접입력',
                        pushType: t.pushType,
                        token: t.token
                    });
                }
            });
            this.closeModal('recipientInput');
        },

        // ===== 주소록 =====
        openAddressBook() {
            this.addressBookModal.search = '';
            this.addressBookModal.selectedIds = [];
            this.addressBookModal.previewId = null;
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
            if (this.addressBookModal.selectedIds.length === 0) return;
            const picked = this.addressBookModal.contacts.filter(c => this.addressBookModal.selectedIds.includes(c.id));
            const existingTokens = new Set(this.recipients.map(r => r.token));
            picked.forEach(c => {
                if (!existingTokens.has(c.token)) {
                    this.recipients.push({
                        id: Date.now() + Math.random(),
                        name: c.name,
                        pushType: c.pushType,
                        token: c.token
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
            this.recipientEditModal.name = target.name;
            this.recipientEditModal.token = target.token || '';
            this.recipientEditModal.pushType = target.pushType || '';
            this.showModal('recipientEdit');
        },
        confirmRecipientEdit() {
            const target = this.recipients.find(r => r.id === this.recipientEditModal.id);
            if (target) {
                target.name = this.recipientEditModal.name;
                target.token = this.recipientEditModal.token;
                target.pushType = this.recipientEditModal.pushType;
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

        // ===== 배지 =====
        onBadgeInput(e) {
            const v = String(e.target.value || '').replace(/\D/g, '');
            this.form.badge = v;
        },

        // ===== 버튼 모달 =====
        openButtonModal(index = null) {
            this.buttonModal.editIndex = index;
            this.buttonModal.type = index !== null ? this.form.buttons[index].type : '';
            this.showModal('button');
        },
        confirmButton() {
            if (!this.buttonModal.type) {
                alert('버튼 유형을 선택하세요.');
                return;
            }
            const item = { type: this.buttonModal.type };
            if (this.buttonModal.editIndex !== null) {
                this.form.buttons.splice(this.buttonModal.editIndex, 1, item);
            } else {
                this.form.buttons.push(item);
            }
            this.closeModal('button');
        },
        removeButton(i) {
            this.form.buttons.splice(i, 1);
        },

        // ===== 미디어 모달 =====
        openMediaModal(target) {
            const current = this.form[target];
            this.mediaModal.target = target;
            this.mediaModal.editing = !!(current && current.url);
            this.mediaModal.url = current ? current.url : '';
            if (target === 'androidMedia') {
                this.mediaModal.type = 'image';
            } else {
                this.mediaModal.type = current ? (current.type || '') : '';
            }
            this.mediaModal.expand = current ? (current.expand || '') : '';
            this.showModal('media');
        },
        confirmMedia() {
            const t = this.mediaModal.target;
            if (!this.mediaModal.url.trim()) {
                alert('URL을 입력하세요.');
                return;
            }
            if (t !== 'androidMedia' && !this.mediaModal.type) {
                alert('유형을 선택하세요.');
                return;
            }
            const next = {
                url: this.mediaModal.url.trim(),
                type: t === 'androidMedia' ? 'image' : this.mediaModal.type
            };
            if (t !== 'iosMedia') next.expand = this.mediaModal.expand;
            this.form[t] = next;
            this.closeModal('media');
        },
        clearMedia(target) {
            if (target === 'iosMedia') {
                this.form[target] = { url: '', type: '' };
            } else if (target === 'androidMedia') {
                this.form[target] = { url: '', type: 'image', expand: '' };
            } else {
                this.form[target] = { url: '', type: '', expand: '' };
            }
        },

        // ===== Android 큰 아이콘 =====
        openLargeIconModal() {
            this.largeIconModal.url = this.form.androidLargeIcon.url || '';
            this.showModal('largeIcon');
        },
        confirmLargeIcon() {
            if (!this.largeIconModal.url.trim()) {
                alert('URL을 입력하세요.');
                return;
            }
            this.form.androidLargeIcon.url = this.largeIconModal.url.trim();
            this.closeModal('largeIcon');
        },

        // ===== 그룹 모달 =====
        openGroupModal(index = null) {
            this.groupModal.editIndex = index;
            this.groupModal.key = index !== null ? this.form.groups[index].key : '';
            this.groupModal.description = index !== null ? this.form.groups[index].description : '';
            this.showModal('group');
        },
        confirmGroup() {
            if (!this.groupModal.key.trim()) {
                alert('키를 입력하세요.');
                return;
            }
            const item = { key: this.groupModal.key.trim(), description: this.groupModal.description.trim() };
            if (this.groupModal.editIndex !== null) {
                this.form.groups.splice(this.groupModal.editIndex, 1, item);
            } else {
                this.form.groups.push(item);
            }
            this.closeModal('group');
        },
        removeGroup(i) {
            this.form.groups.splice(i, 1);
        },

        // ===== 발송/초기화 =====
        validate() {
            if (this.recipients.length === 0) return false;
            if (this.form.purpose === 'ad') {
                if (!this.form.adContact || this.form.adContact.length < 8) {
                    alert('발송 연락처를 입력하세요.');
                    return false;
                }
                if (!this.form.adWithdrawGuide.trim()) {
                    alert('수신 동의 철회 가이드를 입력하세요.');
                    return false;
                }
            }
            if (this.form.inputType === 'basic') {
                if (!this.form.content.trim()) return false;
            } else {
                if (!this.form.jsonContent.trim()) return false;
                try { JSON.parse(this.form.jsonContent); }
                catch (e) {
                    alert('JSON 형식이 올바르지 않습니다.');
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
            alert('PUSH 메시지가 발송되었습니다.');
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
            this.selectedRecipientIds = [];
            this.form = {
                purpose: 'general',
                adContact: '',
                adWithdrawGuide: '',
                inputType: 'basic',
                htmlStyle: 'use',
                title: '',
                content: '',
                badge: '',
                buttons: [],
                media: { url: '', type: '', expand: '' },
                androidMedia: { url: '', type: 'image', expand: '' },
                iosMedia: { url: '', type: '' },
                androidLargeIcon: { url: '' },
                groups: [],
                jsonContent: '',
                jsonHtmlStyle: 'use',
                sendTime: 'now',
                reserveAt: ''
            };
            this.recipients = [];
            this.submitted = false;
        }
    }
};
