const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>[위캔디오] 아직 첫 업로드 전이신가요? 5분이면 재생까지 됩니다.</title>
</head>
<body style="margin:0; padding:0; background-color:#F3F8FF; font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif; font-size:14px; line-height:1.65; color:#333;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F3F8FF;" width="100%">
<tr>
<td align="center" style="padding:32px 16px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; width:100%; background-color:#ffffff; border:0; border-radius:20px; box-shadow:0 8px 20px rgba(0,0,0,0.06);">
<tr><td style="padding:32px 36px 8px;">
<div style="font-weight:700; font-size:18px; color:#0f172a;">WECANDEO 비디오팩 시작 안내</div>
</td></tr>
<tr><td style="padding:8px 36px 24px; color:#334155;">
안녕하세요 #{name}님,<br><br>
비디오팩에 아직 동영상을 업로드하지 않으셨나요? 가장 빠르게 첫 재생까지 가는 방법을 함께 안내드릴게요.
</td></tr>
<tr><td style="padding:0 36px 24px;">
<div style="border:1px solid #DCEAFE; background:#F1F8FF; border-radius:12px; padding:20px;">
<div style="font-weight:700; color:#1e40af; margin-bottom:8px;">🚀 5분 만에 첫 재생 만들기</div>
<ol style="margin:0 0 12px; padding-left:20px; color:#1f2937;">
<li>콘솔에서 <b>콘텐츠 업로드</b></li>
<li>인코딩 상태가 "완료"가 되면</li>
<li>재생 링크를 복사하면 끝!</li>
</ol>
<a href="#" style="display:inline-block; background:#2563eb; color:#fff; text-decoration:none; padding:8px 14px; border-radius:8px; font-size:13px; font-weight:600;">첫 영상 업로드하기</a>
<a href="#" style="display:inline-block; margin-left:6px; background:#fff; color:#1e40af; border:1px solid #93c5fd; text-decoration:none; padding:8px 14px; border-radius:8px; font-size:13px; font-weight:600;">시작 가이드</a>
</div>
</td></tr>
<tr><td style="padding:0 36px 32px; color:#475569; font-size:13px;">
<div style="font-weight:700; color:#0f172a; margin-bottom:6px;">🤔 혹시 여기서 막히셨나요?</div>
<b>A. "샘플로 먼저 테스트하고 싶어요"</b><br>
→ 샘플 영상으로 바로 확인할 수 있어요.<br>
샘플 페이지 → 샘플 동영상 → 비포 소스 → Play URL 바로가기를 클릭해서 재생해보기<br><br>
<b>B. "내 사이트에 붙여봐야 의미가 있어요(임베드)"</b>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const SAMPLE_HTML_2 = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"/><title>상품 생성 안내</title></head>
<body style="font-family:'Malgun Gothic',sans-serif; background:#F3F8FF; padding:32px;">
<div style="max-width:560px; margin:0 auto; background:#fff; border-radius:16px; padding:32px;">
<h2 style="margin:0 0 16px; color:#0f172a;">상품 생성이 완료되었습니다</h2>
<p style="color:#334155;">#{name}님, 신청하신 상품이 정상적으로 생성되었습니다.</p>
<a href="#" style="display:inline-block; background:#2563eb; color:#fff; text-decoration:none; padding:10px 18px; border-radius:8px;">콘솔로 이동</a>
</div></body></html>`;

const SAMPLE_HTML_3 = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"/><title>2일 경과 안내</title></head>
<body style="font-family:'Malgun Gothic',sans-serif; background:#F3F8FF; padding:32px;">
<div style="max-width:560px; margin:0 auto; background:#fff; border-radius:16px; padding:32px;">
<h2 style="margin:0 0 16px; color:#0f172a;">아직 영상을 업로드하지 않으셨네요</h2>
<p style="color:#334155;">#{name}님, 비디오팩 생성 후 2일이 지났어요. 첫 영상을 업로드해 보세요.</p>
</div></body></html>`;

export default {
    name: 'EmailSend',
    layout: 'default',

    data() {
        return {
            useTemplate: false,
            selectedTemplate: null,

            recipientOpen: true,
            recipients: [],
            selectedRecipientIds: [],

            previewMode: 'html',
            modalPreviewMode: 'html',

            form: {
                senderEmail: '',
                purpose: 'general',
                subject: '',
                content: '',
                attachments: [],
                sendTime: 'now',
                reserveAt: ''
            },

            previousPurpose: 'general',
            submitted: false,

            adOption: 'default',
            adCustomText: '',
            adDefaultText: '메일 수신을 원치 않으시면 [##BLOCK_RECEIVER_LINK##]를 클릭하세요.\nIf you do not want to receive it, please click a [##EN_BLOCK_RECEIVER_LINK##]',

            templates: [
                { id: 'e-01', name: '01_상품생성시', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '[위캔디오] 상품이 정상적으로 생성되었습니다.', content: SAMPLE_HTML_2 },
                { id: 'e-02-1', name: '02-1_비디오팩생성2일경과', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '[위캔디오] 아직 첫 업로드 전이신가요? 5분이면 재생까지 됩니다.', content: SAMPLE_HTML },
                { id: 'e-02-2', name: '02-2_비디오팩생성2일경과', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '[위캔디오] 첫 영상 등록을 환영합니다.', content: SAMPLE_HTML_3 },
                { id: 'e-03-1', name: '03-1_비디오팩생성5일경과', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '[위캔디오] 5일이 지났습니다.', content: SAMPLE_HTML_3 },
                { id: 'e-03-2', name: '03-2_비디오팩생성5일경과', senderEmail: 'no-reply@wecandeo.com', purpose: 'general', subject: '[위캔디오] 활용 도움말을 확인해 보세요.', content: SAMPLE_HTML_3 },
                { id: 'e-04', name: '2026년3월-뉴스레터', senderEmail: 'news@malgnsoft.com', purpose: 'ad', subject: '[광고] 2026년 3월 뉴스레터', content: SAMPLE_HTML_2 },
                { id: 'e-05', name: 'brand_ad_reception', senderEmail: 'no-reply@malgnsoft.com', purpose: 'ad', subject: '[광고] 브랜드 광고 수신 안내', content: SAMPLE_HTML_2 },
                { id: 'e-06', name: 'brand_email_change', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '이메일 주소 변경 안내', content: SAMPLE_HTML_2 },
                { id: 'e-07', name: 'brand_login_verify', senderEmail: 'no-reply@malgnsoft.com', purpose: 'auth', subject: '로그인 인증 코드 안내', content: SAMPLE_HTML_2 },
                { id: 'e-08', name: 'brand_password_reset', senderEmail: 'no-reply@malgnsoft.com', purpose: 'auth', subject: '비밀번호 재설정 안내', content: SAMPLE_HTML_2 },
                { id: 'e-09', name: 'brand_signup_welcome', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '가입을 환영합니다.', content: SAMPLE_HTML_2 },
                { id: 'e-10', name: 'brand_payment_complete', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '결제가 완료되었습니다.', content: SAMPLE_HTML_2 },
                { id: 'e-11', name: 'brand_payment_failed', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '결제 실패 안내', content: SAMPLE_HTML_2 },
                { id: 'e-12', name: 'brand_subscription_expire', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '구독 만료 예정 안내', content: SAMPLE_HTML_2 },
                { id: 'e-13', name: 'brand_subscription_renew', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '구독이 갱신되었습니다.', content: SAMPLE_HTML_2 },
                { id: 'e-14', name: 'brand_event_winner', senderEmail: 'event@malgnsoft.com', purpose: 'ad', subject: '[광고] 이벤트 당첨 안내', content: SAMPLE_HTML_2 },
                { id: 'e-15', name: 'brand_inquiry_reply', senderEmail: 'support@malgnsoft.com', purpose: 'general', subject: '문의하신 내용에 대한 답변입니다.', content: SAMPLE_HTML_2 },
                { id: 'e-16', name: 'brand_credit_low', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '크레딧 잔액 부족 안내', content: SAMPLE_HTML_2 },
                { id: 'e-17', name: 'brand_credit_charge', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '크레딧 충전 완료', content: SAMPLE_HTML_2 },
                { id: 'e-18', name: 'brand_storage_warn', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '스토리지 사용량 경고', content: SAMPLE_HTML_2 },
                { id: 'e-19', name: 'brand_storage_full', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '스토리지 사용량 초과 안내', content: SAMPLE_HTML_2 },
                { id: 'e-20', name: 'brand_data_export', senderEmail: 'no-reply@malgnsoft.com', purpose: 'general', subject: '데이터 내보내기 완료', content: SAMPLE_HTML_2 }
            ],

            templateModal: { search: '', selectedId: null, page: 1, pageSize: 9 },
            recipientInputModal: { email: '' },
            recipientEditModal: { id: null, name: '', email: '' },
            addressBookModal: {
                search: '',
                selectedIds: [],
                page: 1,
                pageSize: 11,
                contacts: [
                    { id: 101, name: 'CDNETWORKS', email: 'seungyoon.chae@cdnetworks.co.kr' },
                    { id: 102, name: 'CDNW', email: 'haewon.lee@cdnetworks.co.kr' },
                    { id: 103, name: '강주영', email: 'mcmax1@naver.com' },
                    { id: 104, name: '강태미', email: 'kang.taemi@malgnsoft.com' },
                    { id: 105, name: '권지혜', email: 'wise@malgnsoft.com' },
                    { id: 106, name: '김건', email: 'geon.kim@cdnetworks.co.kr' },
                    { id: 107, name: '김규필', email: 'soumincor@malgnsoft.com' },
                    { id: 108, name: '김덕조', email: 'djkim@malgnsoft.com' },
                    { id: 109, name: '김도형', email: 'dotype@malgnsoft.com' },
                    { id: 110, name: '김민찬', email: 'minchan_kim@lotte.net' },
                    { id: 111, name: '김보경', email: 'bokyung.kim@malgnsoft.com' },
                    { id: 112, name: '김선아', email: 'suna.kim@malgnsoft.com' },
                    { id: 113, name: '김성호', email: 'sungho.kim@malgnsoft.com' },
                    { id: 114, name: '김유진', email: 'eugene.kim@malgnsoft.com' },
                    { id: 115, name: '김재윤', email: 'jaeyoon.kim@malgnsoft.com' },
                    { id: 116, name: '박민수', email: 'minsu.park@malgnsoft.com' },
                    { id: 117, name: '박서연', email: 'seoyeon.park@malgnsoft.com' },
                    { id: 118, name: '박지원', email: 'jiwon.park@malgnsoft.com' },
                    { id: 119, name: '서지훈', email: 'jihoon.seo@malgnsoft.com' },
                    { id: 120, name: '신예린', email: 'yerin.shin@malgnsoft.com' },
                    { id: 121, name: '오세훈', email: 'sehoon.oh@malgnsoft.com' },
                    { id: 122, name: '윤지수', email: 'jisu.yoon@malgnsoft.com' },
                    { id: 123, name: '이도윤', email: 'doyoon.lee@malgnsoft.com' },
                    { id: 124, name: '이서아', email: 'seoa.lee@malgnsoft.com' },
                    { id: 125, name: '이준호', email: 'junho.lee@malgnsoft.com' },
                    { id: 126, name: '장하늘', email: 'haneul.jang@malgnsoft.com' },
                    { id: 127, name: '정지원', email: 'jiwon.jung@malgnsoft.com' },
                    { id: 128, name: '조현우', email: 'hyunwoo.cho@malgnsoft.com' },
                    { id: 129, name: '최서진', email: 'seojin.choi@malgnsoft.com' },
                    { id: 130, name: '한지민', email: 'jimin.han@malgnsoft.com' }
                ]
            }
        };
    },

    mounted() {
        if (!this.checkLoginGuard()) return;
        this.$nextTick(() => {
            this.modals = {
                template: new bootstrap.Modal(this.$refs.templateModal),
                recipientInput: new bootstrap.Modal(this.$refs.recipientInputModal),
                recipientEdit: new bootstrap.Modal(this.$refs.recipientEditModal),
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
        purposeLabel() {
            return { general: '일반용', auth: '인증용', ad: '광고용' }[this.form.purpose] || '';
        },
        attachedFileNames() {
            return this.form.attachments.map(f => f.name).join(', ');
        },
        previewPlainText() {
            return this.htmlToPlainText(this.form.content);
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
            return this.templates.find(t => t.id === this.templateModal.selectedId) || null;
        },
        modalPreviewPlainText() {
            return this.modalPreviewTemplate ? this.htmlToPlainText(this.modalPreviewTemplate.content) : '';
        },
        filteredAddressBook() {
            const q = this.addressBookModal.search.trim().toLowerCase();
            if (!q) return this.addressBookModal.contacts;
            return this.addressBookModal.contacts.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
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

        showModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].show();
        },

        closeModal(name) {
            if (this.modals && this.modals[name]) this.modals[name].hide();
        },

        htmlToPlainText(html) {
            if (!html) return '';
            const tmp = document.createElement('div');
            tmp.innerHTML = html
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n\n')
                .replace(/<\/(div|li|tr|h[1-6])>/gi, '\n');
            const text = tmp.textContent || tmp.innerText || '';
            return text.replace(/\n{3,}/g, '\n\n').replace(/[\t ]+\n/g, '\n').trim();
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
            this.templateModal.selectedId = this.selectedTemplate ? this.selectedTemplate.id : (this.templates[0] ? this.templates[0].id : null);
            this.modalPreviewMode = 'html';
            this.showModal('template');
        },

        confirmTemplate() {
            const tpl = this.templates.find(t => t.id === this.templateModal.selectedId);
            if (!tpl) {
                alert('템플릿을 선택하세요.');
                return;
            }
            this.selectedTemplate = tpl;
            this.form.senderEmail = tpl.senderEmail;
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.subject = tpl.subject;
            this.form.content = tpl.content;
            this.closeModal('template');
        },

        // ===== 직접입력 =====
        addRecipientManually() {
            this.recipientInputModal.email = '';
            this.showModal('recipientInput');
        },

        confirmRecipientInput() {
            const email = this.recipientInputModal.email.trim();
            if (!this.isValidEmail(email)) {
                alert('올바른 이메일 주소를 입력하세요.');
                return;
            }
            if (this.recipients.some(r => r.email === email)) {
                alert('이미 추가된 이메일입니다.');
                return;
            }
            this.recipients.push({
                id: Date.now(),
                name: '직접입력',
                email
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
            const existingEmails = new Set(this.recipients.map(r => r.email));
            picked.forEach(c => {
                if (!existingEmails.has(c.email)) {
                    this.recipients.push({ id: Date.now() + Math.random(), name: c.name, email: c.email });
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
            this.recipientEditModal.id = target.id;
            this.recipientEditModal.name = target.name;
            this.recipientEditModal.email = target.email;
            this.showModal('recipientEdit');
        },

        confirmRecipientEdit() {
            const target = this.recipients.find(r => r.id === this.recipientEditModal.id);
            if (!target) {
                this.closeModal('recipientEdit');
                return;
            }
            const email = this.recipientEditModal.email.trim();
            if (!this.isValidEmail(email)) {
                alert('올바른 이메일 주소를 입력하세요.');
                return;
            }
            target.name = this.recipientEditModal.name.trim() || '직접입력';
            target.email = email;
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

        isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        // ===== 광고용 알림 =====
        onPurposeSelect(value) {
            if (value === 'ad') {
                this.previousPurpose = this.form.purpose === 'ad' ? this.previousPurpose : this.form.purpose;
                this.form.purpose = 'ad';
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
            if (!this.form.subject.startsWith(adPrefix)) {
                this.form.subject = `${adPrefix} ${this.form.subject}`.trim();
            }
            const optOut = this.adOption === 'default'
                ? this.adDefaultText
                : this.adOption === 'custom'
                    ? this.adCustomText.trim()
                    : '';
            if (optOut) {
                const base = this.form.content.replace(/\s+$/, '');
                this.form.content = base ? `${base}\n\n${optOut}` : optOut;
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
            const blocked = ['.js', '.exe', '.bat', '.cmd', '.com', '.cpl', '.scr', '.vbs', '.wsr'];
            const valid = files.filter(f => !blocked.some(ext => f.name.toLowerCase().endsWith(ext)));
            if (valid.length !== files.length) {
                alert('지원하지 않는 파일 형식이 포함되어 있습니다.');
            }
            const overName = valid.find(f => f.name.length > 45);
            if (overName) {
                alert('파일 이름은 최대 45자까지 가능합니다.');
                e.target.value = '';
                return;
            }
            const merged = [...this.form.attachments, ...valid].slice(0, 10);
            const totalSize = merged.reduce((sum, f) => sum + f.size, 0);
            if (totalSize > 30 * 1024 * 1024) {
                alert('첨부 파일 합산 용량은 30MB 이하여야 합니다.');
                e.target.value = '';
                return;
            }
            this.form.attachments = merged;
            e.target.value = '';
        },

        // ===== 발송/초기화 =====
        validate() {
            if (this.recipients.length === 0) return false;
            if (!this.isValidEmail(this.form.senderEmail)) {
                alert('올바른 발신 메일을 입력하세요.');
                return false;
            }
            if (!this.form.subject.trim()) {
                alert('제목을 입력하세요.');
                return false;
            }
            if (!this.form.content.trim()) return false;
            if (this.form.sendTime === 'reserve' && !this.form.reserveAt) {
                alert('예약 일시를 선택하세요.');
                return false;
            }
            return true;
        },

        handleSubmit() {
            this.submitted = true;
            if (!this.validate()) return;
            alert('이메일이 발송되었습니다.');
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
            this.recipients = [];
            this.selectedRecipientIds = [];
            this.form = {
                senderEmail: '',
                purpose: 'general',
                subject: '',
                content: '',
                attachments: [],
                sendTime: 'now',
                reserveAt: ''
            };
            this.previousPurpose = 'general';
            this.previewMode = 'html';
            this.submitted = false;
            this.adOption = 'default';
            this.adCustomText = '';
        }
    }
}
