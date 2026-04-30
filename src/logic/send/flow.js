export default {
    name: 'FlowSend',
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
            // 플로우 선택
            flowOpen: false,
            flowSearch: '',
            selectedFlow: null,
            activeChannel: '',

            // 수신자
            recipientOpen: true,
            recipients: [],
            selectedRecipientIds: [],
            varInputMode: 'common',
            commonVar: '',

            // 발송 옵션
            form: {
                sendTime: 'now',
                reserveAt: ''
            },

            submitted: false,

            // 플로우 관리
            flows: [
                {
                    id: 'uX32yFWZ',
                    name: 'djkim',
                    purpose: 'general',
                    sendMode: 'sequential',
                    createdAt: '2026-04-23 10:01',
                    steps: [
                        { channel: 'sms', templateId: 'tpl-01', templateName: '01_비디오팩생성' },
                        { channel: 'kakao', templateId: 'k-01', templateName: '01_비디오팩생성' }
                    ]
                }
            ],

            // 템플릿 라이브러리 (채널별)
            templates: [
                { id: 'tpl-01', channel: 'sms', name: '01_비디오팩생성', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '[위캔디오] 비디오팩 준비 완료 🎉', content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n▶ 시작 가이드\nhttps://support.wecandeo.com/docs/videopack-guide-quick-start\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.' },
                { id: 'tpl-02', channel: 'sms', name: '02_회원가입환영', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '#{name}님, 가입을 환영합니다.' },
                { id: 'tpl-03', channel: 'sms', name: '03_결제완료안내', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '[결제 완료]', content: '#{name}님, 결제가 정상적으로 완료되었습니다.' },
                {
                    id: 'k-01',
                    channel: 'kakao',
                    name: '01_비디오팩생성',
                    templateCode: '01',
                    kakaoCode: '01',
                    purpose: 'general',
                    messageType: 'extra',
                    emphasisType: '선택 안 함',
                    secure: false,
                    content: '[위캔디오] 비디오팩 준비 완료 🎉\n\n#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.',
                    extraInfo: '▶ 아래 버튼에서 시작 가이드를 확인해 주세요.\n궁금한 점은 문의로 남겨주세요.',
                    links: { mobile: 'https://www.wecandeo.com', pc: 'https://www.wecandeo.com' },
                    buttons: [
                        { type: '웹 링크', icon: '👉', name: '시작 가이드', mobile: 'https://support.wecandeo.com/docs/videopack-guide-quick-start', pc: 'https://support.wecandeo.com/docs/videopack-guide-quick-start' },
                        { type: '웹 링크', icon: '💬', name: '문의하기', mobile: 'https://www.wecandeo.com/contact', pc: 'https://www.wecandeo.com/contact' }
                    ]
                },
                { id: 'k-02', channel: 'kakao', name: '02-1_비디오팩생성2일경과', templateCode: '02', kakaoCode: '02', purpose: 'general', messageType: 'basic', secure: false, content: '#{name}님, 비디오팩 생성 후 2일이 지났습니다.', buttons: [] },
                { id: 'em-01', channel: 'email', name: '01_가입환영_이메일', senderNumber: '', purpose: 'general', messageType: 'EMAIL', title: '가입을 환영합니다', content: '#{name}님, 가입해 주셔서 감사합니다.' },
                { id: 'pu-01', channel: 'push', name: '01_앱푸시안내', senderNumber: '', purpose: 'general', messageType: 'PUSH', title: '안내', content: '새로운 알림이 도착했습니다.' }
            ],

            // 플로우 생성 관리 모달 (list / editor 모드 통합)
            mgrMode: 'list',
            managerSearch: '',
            managerSelectedIds: [],
            managerPage: 1,
            managerPageSize: 10,

            // 플로우 편집 폼
            editor: {
                id: null,
                name: '',
                purpose: 'general',
                sendMode: 'sequential',
                steps: [
                    { channel: '', templateId: '', templateName: '' },
                    { channel: '', templateId: '', templateName: '' }
                ]
            },
            editorSubmitted: false,
            stepDragIndex: null,

            // 템플릿 선택 모달 (편집기 안에서 사용)
            templatePicker: {
                stepIndex: null,
                channel: '',
                search: '',
                selectedId: null
            },

            // 직접입력 / 수정
            recipientInputModal: { name: '', phone: '' },
            recipientEditModal: { id: null, name: '', phone: '' },

            // 주소록
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
                    { id: 112, name: '김선아', phone: '010-8888-9999' },
                    { id: 113, name: '김성호', phone: '010-9999-0000' },
                    { id: 114, name: '김유진', phone: '010-1212-3434' }
                ]
            }
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                flowMgr: new bootstrap.Modal(this.$refs.flowMgrModal),
                templatePicker: new bootstrap.Modal(this.$refs.templatePickerModal),
                recipientInput: new bootstrap.Modal(this.$refs.recipientInputModal),
                recipientEdit: new bootstrap.Modal(this.$refs.recipientEditModal),
                addressBook: new bootstrap.Modal(this.$refs.addressBookModal),
                reset: new bootstrap.Modal(this.$refs.resetModal)
            };
        });
    },

    computed: {
        filteredFlows() {
            const q = this.flowSearch.trim().toLowerCase();
            if (!q) return this.flows;
            return this.flows.filter(f => f.name.toLowerCase().includes(q));
        },
        isAllSelected() {
            return this.recipients.length > 0 && this.selectedRecipientIds.length === this.recipients.length;
        },
        smsTemplate() {
            if (!this.selectedFlow) return null;
            const step = this.selectedFlow.steps.find(s => s.channel === 'sms');
            if (!step) return null;
            return this.templates.find(t => t.id === step.templateId) || null;
        },
        kakaoTemplate() {
            if (!this.selectedFlow) return null;
            const step = this.selectedFlow.steps.find(s => s.channel === 'kakao');
            if (!step) return null;
            return this.templates.find(t => t.id === step.templateId) || null;
        },
        smsPreviewContent() {
            if (!this.smsTemplate) return '';
            const value = this.varInputMode === 'common' && this.commonVar ? this.commonVar : '#{name}';
            return this.smsTemplate.content.replace(/#\{name\}/g, value);
        },
        kakaoPreviewContent() {
            if (!this.kakaoTemplate) return '';
            const value = this.varInputMode === 'common' && this.commonVar ? this.commonVar : '#{name}';
            return this.kakaoTemplate.content.replace(/#\{name\}/g, value);
        },

        // 플로우 관리 목록
        filteredFlowList() {
            const q = this.managerSearch.trim().toLowerCase();
            if (!q) return this.flows;
            return this.flows.filter(f => f.name.toLowerCase().includes(q));
        },
        managerTotalPages() {
            return Math.max(1, Math.ceil(this.filteredFlowList.length / this.managerPageSize));
        },
        pagedFlowList() {
            const start = (this.managerPage - 1) * this.managerPageSize;
            return this.filteredFlowList.slice(start, start + this.managerPageSize);
        },
        isManagerAllSelected() {
            const ids = this.pagedFlowList.map(f => f.id);
            return ids.length > 0 && ids.every(id => this.managerSelectedIds.includes(id));
        },

        // 편집기 검증
        isEditorStepsValid() {
            if (this.editor.steps.length < 2) return false;
            return this.editor.steps.every(s => s.channel && s.templateId);
        },

        // 템플릿 선택 모달
        filteredPickerTemplates() {
            const q = this.templatePicker.search.trim().toLowerCase();
            const list = this.templates.filter(t => t.channel === this.templatePicker.channel);
            if (!q) return list;
            return list.filter(t => t.name.toLowerCase().includes(q));
        },

        // 주소록
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
        }
    },

    methods: {
        showModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].show();
        },
        closeModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].hide();
        },

        purposeLabel(p) {
            const map = { general: '일반용', auth: '인증용', ad: '광고용' };
            return map[p] || '일반용';
        },
        kakaoMessageTypeLabel(type) {
            const map = { basic: '기본형', extra: '부가 정보형', channel: '채널 추가형', emphasis: '강조 표기형' };
            return map[type] || '기본형';
        },
        channelLabel(c) {
            const map = { sms: 'SMS', kakao: '알림톡', email: '이메일', push: 'PUSH' };
            return map[c] || c;
        },
        channelIcon(c) {
            const map = { sms: 'bi-chat-dots-fill', kakao: 'bi-chat-fill', email: 'bi-envelope-fill', push: 'bi-bell-fill' };
            return map[c] || 'bi-chat';
        },

        // ===== 플로우 선택 =====
        toggleFlow() {
            this.flowOpen = !this.flowOpen;
            if (this.flowOpen) this.flowSearch = '';
        },
        closeFlow() {
            this.flowOpen = false;
        },
        selectFlow(f) {
            this.selectedFlow = JSON.parse(JSON.stringify(f));
            this.flowOpen = false;
            this.activeChannel = f.steps[0] ? f.steps[0].channel : '';
        },

        // ===== 플로우 생성 관리 (목록 / 생성·수정 통합) =====
        openFlowManager() {
            this.mgrMode = 'list';
            this.managerSearch = '';
            this.managerSelectedIds = [];
            this.managerPage = 1;
            this.showModal('flowMgr');
        },
        toggleManagerAll(e) {
            const ids = this.pagedFlowList.map(f => f.id);
            if (e.target.checked) {
                const merged = new Set([...this.managerSelectedIds, ...ids]);
                this.managerSelectedIds = Array.from(merged);
            } else {
                this.managerSelectedIds = this.managerSelectedIds.filter(id => !ids.includes(id));
            }
        },
        refreshFlows() {
            this.managerSearch = '';
            this.managerSelectedIds = [];
            this.managerPage = 1;
        },

        openFlowEditor(flow) {
            if (flow) {
                this.editor = JSON.parse(JSON.stringify(flow));
                if (this.editor.steps.length < 2) {
                    while (this.editor.steps.length < 2) {
                        this.editor.steps.push({ channel: '', templateId: '', templateName: '' });
                    }
                }
            } else {
                this.editor = {
                    id: null,
                    name: '',
                    purpose: 'general',
                    sendMode: 'sequential',
                    steps: [
                        { channel: '', templateId: '', templateName: '' },
                        { channel: '', templateId: '', templateName: '' }
                    ]
                };
            }
            this.editorSubmitted = false;
            this.mgrMode = 'editor';
            this.showModal('flowMgr');
        },

        editFlowFromManager() {
            if (this.managerSelectedIds.length !== 1) return;
            const flow = this.flows.find(f => f.id === this.managerSelectedIds[0]);
            if (flow) this.openFlowEditor(flow);
        },

        cancelEditor() {
            this.editorSubmitted = false;
            this.mgrMode = 'list';
        },

        deleteFlowsFromManager() {
            if (this.managerSelectedIds.length === 0) return;
            if (!confirm('선택한 플로우를 삭제하시겠어요?')) return;
            this.flows = this.flows.filter(f => !this.managerSelectedIds.includes(f.id));
            if (this.selectedFlow && this.managerSelectedIds.includes(this.selectedFlow.id)) {
                this.selectedFlow = null;
                this.activeChannel = '';
            }
            this.managerSelectedIds = [];
        },

        addStep() {
            this.editor.steps.push({ channel: '', templateId: '', templateName: '' });
        },
        removeStep(i) {
            if (this.editor.steps.length <= 2) return;
            this.editor.steps.splice(i, 1);
        },

        onStepDragStart(i) {
            this.stepDragIndex = i;
        },
        onStepDrop(i) {
            if (this.stepDragIndex === null || this.stepDragIndex === i) return;
            const moved = this.editor.steps.splice(this.stepDragIndex, 1)[0];
            this.editor.steps.splice(i, 0, moved);
            this.stepDragIndex = null;
        },

        openTemplatePicker(stepIndex) {
            const step = this.editor.steps[stepIndex];
            if (!step.channel) return;
            this.templatePicker.stepIndex = stepIndex;
            this.templatePicker.channel = step.channel;
            this.templatePicker.search = '';
            this.templatePicker.selectedId = step.templateId || null;
            this.showModal('templatePicker');
        },
        confirmTemplatePicker() {
            if (!this.templatePicker.selectedId) {
                alert('템플릿을 선택하세요.');
                return;
            }
            const tpl = this.templates.find(t => t.id === this.templatePicker.selectedId);
            const step = this.editor.steps[this.templatePicker.stepIndex];
            if (tpl && step) {
                step.templateId = tpl.id;
                step.templateName = tpl.name;
            }
            this.closeModal('templatePicker');
        },

        saveFlow() {
            this.editorSubmitted = true;
            if (!this.editor.name.trim()) return;
            if (!this.isEditorStepsValid) return;

            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

            if (this.editor.id) {
                const idx = this.flows.findIndex(f => f.id === this.editor.id);
                if (idx >= 0) {
                    this.flows[idx] = {
                        ...this.flows[idx],
                        name: this.editor.name.trim(),
                        purpose: this.editor.purpose,
                        sendMode: this.editor.sendMode,
                        steps: JSON.parse(JSON.stringify(this.editor.steps))
                    };
                    if (this.selectedFlow && this.selectedFlow.id === this.editor.id) {
                        this.selectedFlow = JSON.parse(JSON.stringify(this.flows[idx]));
                        this.activeChannel = this.selectedFlow.steps[0] ? this.selectedFlow.steps[0].channel : '';
                    }
                }
            } else {
                const id = this.generateFlowId();
                this.flows.push({
                    id,
                    name: this.editor.name.trim(),
                    purpose: this.editor.purpose,
                    sendMode: this.editor.sendMode,
                    createdAt: stamp,
                    steps: JSON.parse(JSON.stringify(this.editor.steps))
                });
            }

            this.editorSubmitted = false;
            this.mgrMode = 'list';
            this.managerSelectedIds = [];
        },

        generateFlowId() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let id = '';
            for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
            return id;
        },

        // ===== 직접입력 =====
        addRecipientManually() {
            this.recipientInputModal.name = '';
            this.recipientInputModal.phone = '';
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
                phone: formatted
            });
            this.closeModal('recipientInput');
        },

        // ===== 주소록 =====
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
                alert('수신자를 선택하세요.');
                return;
            }
            const existingPhones = new Set(this.recipients.map(r => r.phone));
            picked.forEach(c => {
                if (!existingPhones.has(c.phone)) {
                    this.recipients.push({ id: Date.now() + Math.random(), name: c.name, phone: c.phone });
                }
            });
            this.closeModal('addressBook');
        },

        editRecipient() {
            if (this.selectedRecipientIds.length !== 1) return;
            const target = this.recipients.find(r => r.id === this.selectedRecipientIds[0]);
            if (!target) return;
            this.recipientEditModal.id = target.id;
            this.recipientEditModal.name = target.name;
            this.recipientEditModal.phone = target.phone;
            this.showModal('recipientEdit');
        },
        confirmRecipientEdit() {
            const target = this.recipients.find(r => r.id === this.recipientEditModal.id);
            if (target) {
                target.name = this.recipientEditModal.name;
                target.phone = this.recipientEditModal.phone;
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
            if (!this.selectedFlow) {
                alert('플로우를 선택하세요.');
                return false;
            }
            if (this.recipients.length === 0) return false;
            if (this.form.sendTime === 'reserve' && !this.form.reserveAt) {
                alert('예약 일시를 선택하세요.');
                return false;
            }
            return true;
        },
        handleSubmit() {
            this.submitted = true;
            if (!this.validate()) return;
            alert('복합(플로우) 메시지가 발송되었습니다.');
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
            this.selectedFlow = null;
            this.activeChannel = '';
            this.varInputMode = 'common';
            this.commonVar = '';
            this.selectedRecipientIds = [];
            this.form = { sendTime: 'now', reserveAt: '' };
            this.submitted = false;
        }
    }
};
