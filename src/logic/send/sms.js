export default {
    name: 'SmsSend',
    layout: 'default',

    data() {
        return {
            useTemplate: false,
            selectedTemplate: null,
            varInputMode: 'common',
            commonVar: '',

            recipientOpen: true,
            recipients: [],
            selectedRecipientIds: [],

            form: {
                senderNumber: '',
                purpose: 'general',
                messageType: 'SMS',
                title: '',
                content: '',
                attachments: [],
                sendTime: 'now',
                reserveAt: ''
            },

            previousPurpose: 'general',
            submitted: false,

            templates: [
                // ===== SMS (단문) — 90byte 이내 =====
                { id: 'sms-01', name: '웃음 3월', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '웃음의 분량이 곧 행복의 분량입니다^^ 오늘도 실컷 웃고 행복하세요^......^\n멋진 3월(^o^)' },
                { id: 'sms-02', name: '3월의 활기', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '새로운 세상이 눈앞에 펼쳐지는 설렘 가득한 3월입니다. 봄의 활기를 한껏 즐기는 하루 되세요~' },
                { id: 'sms-03', name: '3월 중순', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '언뜻 달력을 보니 벌써 3월 중순을 향해 달려가고 있어요. 곧 벚꽃이 만개한 봄이 다가오겠네요.' },
                { id: 'sms-04', name: '3월, 봄바람', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '불어오는 봄바람이 한층 포근해진 3월입니다. 계절의 흐름이 느껴지는 달. 봄기운 충전하세요^^!' },
                { id: 'sms-05', name: '봄기운 3월', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '얼었던 땅이 녹으면 봄나물들이 올라와 봄기운을 한층 북돋아줍니다.\n봄처럼활기넘치는3월되세요' },
                { id: 'sms-06', name: '봄맞이 3월', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '마음이 간질간질해지는봄, 새롭게 시작하는 3월입니다. 웅크린 마음을 열고 미소짓는 하루되세요' },
                { id: 'sms-07', name: '3월의 시작', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '완연한 봄을 맞이하는 3월입니다. 포근한 봄처럼 마음까지 따스한 3월 보내시길 바랄게요~' },
                { id: 'sms-08', name: '3월 경칩', senderNumber: '1644-7143', purpose: 'general', messageType: 'SMS', title: '', content: '만물이 움트는 3월의 절기 경칩입니다. 행복한 봄맞이 시작해보세요^^ 당신을 응원합니다!' },

                // ===== LMS (장문) — 2000byte 이내 =====
                { id: 'lms-01', name: '추운날씨', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '추운날씨', content: '올 겨울은 소리없이 내려 소복이 쌓이는 하얀 눈처럼 행복이 당신의 마음속에 소복이 쌓였으면 좋겠습니다.\n\n눈처럼 쌓인 행복으로 따스한 겨울을 보내시길 바라겠습니다. 늘 건강하시고 즐거운 하루 되세요.' },
                { id: 'lms-02', name: '추운겨울날씨', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '추운겨울날씨', content: '매서운 한파에 마음까지 얼어버리는 것 같은 한겨울 날씨입니다.\n\n매년 겪는 추위인데도 적응하기가 여간 쉽지 않습니다.\n\n다가오는 한파에도 따뜻한 마음으로 서로를 챙기는 하루 되시길 바랍니다.' },
                { id: 'lms-03', name: '3월의 시작', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '3월의 시작', content: '봄이 시작됨과 함께 많은 것들이 새롭게 시작되는 달인 3월입니다.\n\n시작은 항상 설레임을 동반하게 되지요. 새로운 출발선에 선 모든 분들을 응원합니다.\n\n3월 한 달도 활기차게 보내시기 바랍니다.' },
                { id: 'lms-04', name: '포근한 3월', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '포근한 3월', content: '3월의 봄이라는 단어를 떠올리면 따스한 햇빛이 모든 걸 감싸는 것만 같네요.\n\n완연한 봄은 아직이지만 꽃망울 터뜨리는 봄꽃들의 모습에 마음마저 따뜻해집니다.\n\n포근한 3월의 봄날 되세요.' },
                { id: 'lms-05', name: '3월 춘분', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '3월 춘분', content: '봄이 성큼 우리곁으로 다가왔네요.\n\n눈깜짝할 사이 겨울이 지나갔어요.\n\n낮과 밤의 길이가 같아지는 춘분, 본격적인 봄의 시작을 알리는 절기입니다. 따뜻한 봄날 즐겁게 보내세요.' },
                { id: 'lms-06', name: '여유로운 3월', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '여유로운 3월', content: '공기가 시린 겨울을 벗어나 봄을 맞이하니 포근한 날씨가 찾아왔습니다.\n\n따뜻해진 날씨에 마음에도 여유가 깃들기를 바라며, 한층 여유로운 3월 보내시기 바랍니다.' },
                { id: 'lms-07', name: '3월의 여운', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '3월의 여운', content: '겨울의 여운이 남았다지만 오후의 따뜻한 햇빛이 봄이 왔음을 알립니다.\n\n조금있으면 길가에 핀 노란 개나리도 곧 만나볼 수 있겠지요. 향기로운 봄날 되시길.' },
                { id: 'lms-08', name: '3월의 봄', senderNumber: '1644-7143', purpose: 'general', messageType: 'LMS', title: '3월의 봄', content: '아직은 봄을 시샘하는 꽃샘추위가 기승을 부리고 있지만 얼마지 않아 힘을 잃을 것 같네요.\n\n봄이 다가옵니다. 곧 만개할 봄꽃들과 함께 행복한 일들이 가득하시길 바랍니다.' },

                // ===== MMS (포토) =====
                { id: 'mms-01', name: '시험대박', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '시험대박', content: '시험대박! 의욕폭발! 인생대박!\n오늘도 화이팅하세요. 응원합니다.', thumbnail: 'https://placehold.co/400x500/fff200/333?text=%EC%8B%9C%ED%97%98%EB%8C%80%EB%B0%95' },
                { id: 'mms-02', name: '시험 불태우겠어', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '시험 D-DAY', content: '시험 D-DAY 불태우겠어!\n준비한 만큼 모두 보여주세요.', thumbnail: 'https://placehold.co/400x500/ffd24a/333?text=%EB%B6%88%ED%83%9C%EC%9A%B0%EA%B2%A0%EC%96%B4' },
                { id: 'mms-03', name: '시험 대박 부적', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '시험 대박 부적', content: '시험 대박을 기원하는 부적을 보냅니다.\n좋은 결과 있으시길!', thumbnail: 'https://placehold.co/400x500/8b5a2b/fff?text=%EB%8C%80%EB%B0%95%EB%B6%80%EC%A0%81' },
                { id: 'mms-04', name: '벚꽃의 꽃말', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '벚꽃의 꽃말', content: '벚꽃의 꽃말 : 삶의 덧없음\n벚꽃처럼 화사한 봄날 되세요.', thumbnail: 'https://placehold.co/400x500/ffd6e0/333?text=%EB%B2%9A%EA%BD%83' },
                { id: 'mms-05', name: '봄이왔나 봄', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '봄이왔나 봄', content: '봄이 왔나 봄!\n포근한 봄을 함께 즐겨봐요.', thumbnail: 'https://placehold.co/400x500/ffb7c5/fff?text=%EB%B4%84%EC%9D%B4%EC%99%94%EB%82%98' },
                { id: 'mms-06', name: '나만 아닌가 봄', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '나만 아닌가 봄', content: '나만... 아닌가 봄?\n봄의 설렘을 함께 나눠요.', thumbnail: 'https://placehold.co/400x500/c9d6c1/333?text=%EB%82%98%EB%A7%8C+%EB%B4%84' },
                { id: 'mms-07', name: '벚꽃축제', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '벚꽃축제', content: '벚꽃축제가 시작됐어요.\n흐드러지게 핀 벚꽃 보러 함께 가요!', thumbnail: 'https://placehold.co/400x500/ff9bb3/fff?text=%EB%B2%9A%EA%BD%83%EC%B6%95%EC%A0%9C' },
                { id: 'mms-08', name: '미세먼지 주의보', senderNumber: '1644-7143', purpose: 'general', messageType: 'MMS', title: '봄철 미세먼지 주의보', content: '봄철 미세먼지 주의보!\n외출 시 마스크 꼭 착용하세요.', thumbnail: 'https://placehold.co/400x500/ffd1dc/333?text=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80' }
            ],

            templateModal: { activeTab: 'SMS', search: '', selectedId: null, page: 1, pageSize: 8 },
            recipientInputModal: { phone: '' },
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
                    { id: 114, name: '김유진', phone: '010-1212-3434' },
                    { id: 115, name: '김재윤', phone: '010-3434-5656' },
                    { id: 116, name: '박민수', phone: '010-5656-7878' },
                    { id: 117, name: '박서연', phone: '010-7878-9090' },
                    { id: 118, name: '박지원', phone: '010-9090-1212' },
                    { id: 119, name: '서지훈', phone: '010-1313-2424' },
                    { id: 120, name: '신예린', phone: '010-2424-3535' },
                    { id: 121, name: '오세훈', phone: '010-3535-4646' },
                    { id: 122, name: '윤지수', phone: '010-4646-5757' },
                    { id: 123, name: '이도윤', phone: '010-5757-6868' },
                    { id: 124, name: '이서아', phone: '010-6868-7979' },
                    { id: 125, name: '이준호', phone: '010-7979-8080' },
                    { id: 126, name: '장하늘', phone: '010-8080-9191' },
                    { id: 127, name: '정지원', phone: '010-9191-0202' },
                    { id: 128, name: '조현우', phone: '010-0202-1313' },
                    { id: 129, name: '최서진', phone: '010-1313-2424' },
                    { id: 130, name: '한지민', phone: '010-2424-3535' }
                ]
            },
            adAlertModal: { selected080: '' },
            optout080Numbers: ['080-123-4567', '080-987-6543']
        };
    },

    mounted() {
        if (!this.checkLoginGuard()) return;
        this.$nextTick(() => {
            this.modals = {
                template: new bootstrap.Modal(this.$refs.templateModal),
                recipientInput: new bootstrap.Modal(this.$refs.recipientInputModal),
                addressBook: new bootstrap.Modal(this.$refs.addressBookModal),
                adAlert: new bootstrap.Modal(this.$refs.adAlertModal),
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
        titleBytes() {
            return this.calcBytes(this.form.title);
        },
        contentBytes() {
            return this.calcBytes(this.form.content);
        },
        contentChars() {
            return this.form.content.length;
        },
        attachedFileNames() {
            return this.form.attachments.map(f => f.name).join(', ');
        },
        previewText() {
            return this.form.content;
        },
        filteredTemplates() {
            const q = this.templateModal.search.trim().toLowerCase();
            const tab = this.templateModal.activeTab;
            return this.templates.filter(t => {
                if (t.messageType !== tab) return false;
                if (q && !t.name.toLowerCase().includes(q)) return false;
                return true;
            });
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
        templateCardsWithBytes() {
            return this.pagedTemplateList.map(t => ({
                ...t,
                bytes: this.calcBytes(t.content)
            }));
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
        }
    },

    methods: {
        checkLoginGuard() {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                this.navigateTo('/login');
                return false;
            }
            return true;
        },

        calcBytes(str) {
            if (!str) return 0;
            let bytes = 0;
            for (let i = 0; i < str.length; i++) {
                const code = str.charCodeAt(i);
                bytes += code > 127 ? 2 : 1;
            }
            return bytes;
        },

        showModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].show();
        },

        closeModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].hide();
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
            this.templateModal.activeTab = this.selectedTemplate ? this.selectedTemplate.messageType : 'SMS';
            this.templateModal.selectedId = this.selectedTemplate ? this.selectedTemplate.id : null;
            this.showModal('template');
        },

        switchTemplateTab(tab) {
            if (this.templateModal.activeTab === tab) return;
            this.templateModal.activeTab = tab;
            this.templateModal.page = 1;
            this.templateModal.selectedId = null;
        },

        confirmTemplate() {
            const tpl = this.templates.find(t => t.id === this.templateModal.selectedId);
            if (!tpl) {
                alert('템플릿을 선택하세요.');
                return;
            }
            this.selectedTemplate = tpl;
            this.form.senderNumber = tpl.senderNumber;
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.messageType = tpl.messageType;
            this.form.title = tpl.title;
            this.form.content = tpl.content;
            this.closeModal('template');
        },

        // ===== 직접입력 =====
        addRecipientManually() {
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
                name: '직접입력',
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
            if (this.selectedRecipientIds.length !== 1) {
                alert('수정할 수신자 1명을 선택하세요.');
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
            this.selectedRecipientIds = e.target.checked ? this.recipients.map(r => r.id) : [];
        },

        // ===== 광고용 알림 =====
        onPurposeSelect(value) {
            if (value === 'ad') {
                this.previousPurpose = this.form.purpose === 'ad' ? this.previousPurpose : this.form.purpose;
                this.form.purpose = 'ad';
                this.adAlertModal.selected080 = '';
                this.showModal('adAlert');
            } else {
                this.form.purpose = value;
                this.previousPurpose = value;
            }
        },

        cancelAdAlert() {
            this.form.purpose = this.previousPurpose;
            this.closeModal('adAlert');
        },

        confirmAdAlert() {
            const adPrefix = '(광고)';
            if (!this.form.content.startsWith(adPrefix)) {
                this.form.content = `${adPrefix} ${this.form.content}`.trim();
            }
            if (this.adAlertModal.selected080) {
                const optoutLine = `\n무료수신거부 ${this.adAlertModal.selected080}`;
                if (!this.form.content.includes(optoutLine.trim())) {
                    this.form.content = `${this.form.content}${optoutLine}`;
                }
            }
            this.previousPurpose = 'ad';
            this.closeModal('adAlert');
        },

        // ===== 첨부 =====
        triggerFileSelect() {
            this.$refs.fileInput.click();
        },

        onFilesSelected(e) {
            const files = Array.from(e.target.files || []);
            const allowed = ['.jpg', '.jpeg'];
            const valid = files.filter(f => allowed.some(ext => f.name.toLowerCase().endsWith(ext)));
            if (valid.length !== files.length) {
                alert('jpg, jpeg 형식만 첨부할 수 있습니다.');
            }
            const merged = [...this.form.attachments, ...valid].slice(0, 3);
            const totalSize = merged.reduce((sum, f) => sum + f.size, 0);
            const oversize = merged.find(f => f.size > 300 * 1024);
            if (oversize) {
                alert('1개 파일 크기는 300KB 이하여야 합니다.');
                e.target.value = '';
                return;
            }
            if (totalSize > 800 * 1024) {
                alert('첨부 파일 합산 용량은 800KB 이하여야 합니다.');
                e.target.value = '';
                return;
            }
            this.form.attachments = merged;
            e.target.value = '';
        },

        // ===== 발송/초기화 =====
        validate() {
            if (this.recipients.length === 0) return false;
            if (!this.form.senderNumber) {
                alert('발신 번호를 선택하세요.');
                return false;
            }
            if (this.form.messageType !== 'SMS' && !this.form.title.trim()) {
                alert('제목을 입력하세요.');
                return false;
            }
            if (!this.form.content.trim()) return false;
            if (this.form.messageType === 'MMS' && this.form.attachments.length === 0) {
                alert('MMS 발송 시 이미지를 첨부하세요.');
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
            alert('메시지가 발송되었습니다.');
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
            this.form = {
                senderNumber: '',
                purpose: 'general',
                messageType: 'SMS',
                title: '',
                content: '',
                attachments: [],
                sendTime: 'now',
                reserveAt: ''
            };
            this.previousPurpose = 'general';
            this.submitted = false;
        }
    }
}
