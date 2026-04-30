const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILE_COUNT = 5;

const TEMPLATES = {
    'product:all': '우리 서비스의 기능이나 이용 방법에 대해 궁금한 점이 생기셨나요? 사소한 질문이라도 정성껏 답변해 드릴게요!\n\n• 서비스가 있을 경우 URL 주소를 적어주세요.\n• 어떤 메시지 기능이 궁금하신가요?\n• 궁금한 내용을 자유롭게 남겨주세요.\n• 자세히 작성해 주실수록 빠르고 정확한 답변이 가능합니다.',
    'product:sms': '"서비스 이용 중 궁금하신 점이나 개선 제안을 자유롭게 남겨주세요."\n\n• 서비스가 있을 경우 URL 주소를 적어주세요.\n• 문자메시지 기능 중 궁금하신점을 적어주세요.\n• 그 외 내용을 자유롭게 남겨주세요.',
    'product:rcs': '"서비스 이용 중 궁금하신 점이나 개선 제안을 자유롭게 남겨주세요."\n\n• 서비스가 있을 경우 URL 주소를 적어주세요.\n• RCS 기능 중 궁금하신점을 적어주세요.\n• 그 외 내용을 자유롭게 남겨주세요.',
    'product:kakao': '"서비스 이용 중 궁금하신 점이나 개선 제안을 자유롭게 남겨주세요."\n\n• 서비스가 있을 경우 URL 주소를 적어주세요.\n• 카카오톡 기능 중 궁금하신점을 적어주세요.\n• 그 외 내용을 자유롭게 남겨주세요.',
    'product:email': '"서비스 이용 중 궁금하신 점이나 개선 제안을 자유롭게 남겨주세요."\n\n• 서비스가 있을 경우 URL 주소를 적어주세요.\n• 이메일 기능 중 궁금하신점을 적어주세요.\n• 그 외 내용을 자유롭게 남겨주세요.',
    'payment': '문의하실 내용을 상세히 작성해 주세요.\n\n• 결제 관련 정보\n   - 결제하신 일시와 금액:\n   - 사이트 주소 및 상품:\n   - 결제 이메일 정보:\n• 사이트주소를 알려주세요.\n• 요청 사항을 자세히 말씀해 주세요.\n• 혹시 오류 메시지가 떴다면 화면을 캡쳐해서 알려주시면 좋습니다.',
    'partnership': '문의하실 내용을 상세히 작성해 주세요.\n\n• 제안하시는 회사/단체/개인명:\n• 제휴/협업의 핵심 내용:\n• 함께 보고 싶은 기획서나 링크가 있다면 첨부해 주세요.\n• 연락드릴 연락처(이메일/전화번호)',
    'etc': '문의하실 내용을 상세히 작성해 주세요.\n\n• 문의하고 싶으신 주제:\n• 내용: 저희가 더 알아야 할 정보가 있다면 자유롭게 적어주세요!'
};

const TYPE_LABELS = {
    product: '상품',
    payment: '결제(구매 및 환불)',
    partnership: '제휴 문의',
    etc: '기타'
};

const PRODUCT_LABELS = {
    all: '상품전반',
    sms: '문자메시지',
    rcs: 'RCS',
    kakao: '카카오톡',
    email: '이메일'
};

export default {
    data() {
        return {
            types: [
                { value: 'product', label: '메시지 상품' },
                { value: 'payment', label: '결제(구매 및 환불)' },
                { value: 'partnership', label: '제휴 문의' },
                { value: 'etc', label: '기타' }
            ],
            productTypes: [
                { value: 'all', label: '상품전반' },
                { value: 'sms', label: '문자메시지' },
                { value: 'rcs', label: 'RCS' },
                { value: 'kakao', label: '카카오톡' },
                { value: 'email', label: '이메일' }
            ],
            form: {
                type: 'product',
                productType: 'all',
                title: '',
                content: '',
                files: []
            },
            errors: {
                title: false,
                content: false
            },
            fileErrorModal: null,
            fileErrorMessage: '',
            fileUid: 0,
            submitting: false
        };
    },

    computed: {
        contentPlaceholder() {
            return this.currentTemplate;
        },

        currentTemplate() {
            if (this.form.type === 'product') {
                return TEMPLATES['product:' + this.form.productType] || '';
            }
            return TEMPLATES[this.form.type] || '';
        },

        typeLabel() {
            const main = TYPE_LABELS[this.form.type] || '';
            if (this.form.type === 'product') {
                return main + ' - ' + (PRODUCT_LABELS[this.form.productType] || '');
            }
            return main;
        }
    },

    watch: {
        'form.title'(v) { if (v) this.errors.title = false; },
        'form.content'(v) { if (v) this.errors.content = false; }
    },

    mounted() {
        this.$nextTick(() => {
            this.fileErrorModal = new bootstrap.Modal(this.$refs.fileErrorModal);
        });
    },

    methods: {
        onTypeChange() {
            if (this.form.type === 'product' && !this.form.productType) {
                this.form.productType = 'all';
            }
        },

        selectProductType(value) {
            this.form.productType = value;
        },

        onFileSelect(e) {
            const incoming = Array.from(e.target.files || []);
            e.target.value = '';
            if (!incoming.length) return;

            const oversized = incoming.find(f => f.size > MAX_FILE_SIZE);
            if (oversized) {
                this.showFileError('파일 용량이 업로드 가능한 최대 용량을 초과했습니다.');
                return;
            }

            const remaining = MAX_FILE_COUNT - this.form.files.length;
            if (incoming.length > remaining) {
                this.showFileError('첨부파일은 최대 ' + MAX_FILE_COUNT + '개까지 등록할 수 있습니다.');
                return;
            }

            incoming.forEach(file => {
                this.form.files.push({
                    uid: ++this.fileUid,
                    name: file.name,
                    size: file.size,
                    file
                });
            });
        },

        removeFile(idx) {
            this.form.files.splice(idx, 1);
        },

        showFileError(message) {
            this.fileErrorMessage = message;
            this.fileErrorModal.show();
        },

        validate() {
            this.errors.title = !this.form.title.trim();
            this.errors.content = !this.form.content.trim();
            return !this.errors.title && !this.errors.content;
        },

        async onSubmit() {
            if (this.submitting) return;
            if (!this.validate()) return;

            this.submitting = true;
            try {
                const payload = {
                    typeLabel: this.typeLabel,
                    title: this.form.title.trim(),
                    content: this.form.content.trim(),
                    fileNames: this.form.files.map(f => f.name)
                };

                sessionStorage.setItem('inquiry:lastSubmit', JSON.stringify(payload));
                this.navigateTo('/inquiry/complete');
            } finally {
                this.submitting = false;
            }
        }
    }
};
