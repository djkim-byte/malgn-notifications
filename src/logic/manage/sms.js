export default {
    name: 'ManageSmsTemplate',
    layout: 'default',

    data() {
        return {
            mode: 'list', // 'list' | 'register' | 'edit'

            // 트리 상태
            rootExpanded: true,
            searchKeyword: '',
            activeSearch: '',

            selectedType: null, // 'root' | 'category' | 'template' | null
            selectedCategoryId: null,
            selectedTemplateId: null,

            // 카테고리/템플릿 데이터
            categories: [
                {
                    id: 'uFu6iHB3',
                    name: '비디오팩_상품개설',
                    expanded: true,
                    templates: [
                        {
                            id: '5dtZtAWb',
                            name: '01_비디오팩생성',
                            senderNumber: '16447143',
                            purpose: 'general',
                            messageType: 'LMS',
                            title: '[위캔디오] 비디오팩 준비 완료',
                            content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n▶ 시작 가이드\nhttps://support.wecandeo.com/docs/videopack-guide-quick-start\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.',
                            createdAt: '2026-04-13 13:52',
                            updatedAt: '2026-04-13 14:24'
                        },
                        {
                            id: 'a7Bk2QnL',
                            name: '02-1_비디오팩생성2일경과',
                            senderNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            title: '',
                            content: '#{name}님, 비디오팩 첫 영상 업로드를 아직 진행하지 않으셨어요.\n지금 바로 시작해 보세요.',
                            createdAt: '2026-04-13 13:55',
                            updatedAt: '2026-04-13 13:55'
                        },
                        {
                            id: 'b9Cm3RpM',
                            name: '02-2_비디오팩생성2일경과',
                            senderNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            title: '',
                            content: '비디오팩을 시작할 준비가 됐어요. 첫 영상을 업로드해 보세요.',
                            createdAt: '2026-04-13 14:00',
                            updatedAt: '2026-04-13 14:00'
                        },
                        {
                            id: 'c1Dn4SqN',
                            name: '03-1_비디오팩생성5일경과',
                            senderNumber: '16447143',
                            purpose: 'general',
                            messageType: 'LMS',
                            title: '[위캔디오] 비디오팩 시작 안내',
                            content: '#{name}님, 비디오팩을 더 잘 활용할 수 있는 가이드를 안내드립니다.',
                            createdAt: '2026-04-13 14:10',
                            updatedAt: '2026-04-13 14:10'
                        },
                        {
                            id: 'd2Eo5TrO',
                            name: '03-2_비디오팩생성5일경과',
                            senderNumber: '16447143',
                            purpose: 'general',
                            messageType: 'LMS',
                            title: '[위캔디오] 비디오팩 활용 팁',
                            content: '비디오팩을 더 잘 활용할 수 있는 팁을 안내드립니다.',
                            createdAt: '2026-04-13 14:15',
                            updatedAt: '2026-04-13 14:15'
                        }
                    ]
                },
                {
                    id: 'gK7pZ2qR',
                    name: '비디오팩_알림',
                    expanded: false,
                    templates: [
                        {
                            id: 'e3Fp6UsP',
                            name: '01_업로드완료알림',
                            senderNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            title: '',
                            content: '영상 업로드가 완료되었습니다.',
                            createdAt: '2026-04-14 09:00',
                            updatedAt: '2026-04-14 09:00'
                        }
                    ]
                }
            ],

            // 발신 번호 목록 (목)
            senderNumbers: ['16447143', '02-1234-5678', '010-1234-5678'],
            optout080Numbers: ['080-123-4567', '080-987-6543'],

            // 폼 (등록/수정)
            form: {
                name: '',
                senderNumber: '',
                purpose: 'general',
                messageType: 'SMS',
                title: '',
                content: '',
                attachments: []
            },
            previousPurpose: 'general',
            editingTemplateId: null,
            editingCategoryId: null,

            // 모달 데이터
            addCategoryModal: { parentName: 'Root Category', parentId: null, name: '' },
            editCategoryModal: { id: '', name: '' },
            adAlertModal: { selected080: '' },
            sampleModal: { activeTab: 'SMS', search: '', selectedId: null, page: 1, pageSize: 8 },
            alertText: '',

            // 샘플 템플릿
            sampleTemplates: [
                // ===== SMS (단문) — 90byte 이내 =====
                { id: 'smp-sms-01', name: '웃음 3월', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '웃음의 분량이 곧 행복의 분량입니다^^ 오늘도 실컷 웃고 행복하세요^......^\n멋진 3월(^o^)' },
                { id: 'smp-sms-02', name: '3월의 활기', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '새로운 세상이 눈앞에 펼쳐지는 설렘 가득한 3월입니다. 봄의 활기를 한껏 즐기는 하루 되세요~' },
                { id: 'smp-sms-03', name: '3월 중순', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '언뜻 달력을 보니 벌써 3월 중순을 향해 달려가고 있어요. 곧 벚꽃이 만개한 봄이 다가오겠네요.' },
                { id: 'smp-sms-04', name: '3월, 봄바람', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '불어오는 봄바람이 한층 포근해진 3월입니다. 계절의 흐름이 느껴지는 달. 봄기운 충전하세요^^!' },
                { id: 'smp-sms-05', name: '봄기운 3월', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '얼었던 땅이 녹으면 봄나물들이 올라와 봄기운을 한층 북돋아줍니다.\n봄처럼활기넘치는3월되세요' },
                { id: 'smp-sms-06', name: '봄맞이 3월', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '마음이 간질간질해지는봄, 새롭게 시작하는 3월입니다. 웅크린 마음을 열고 미소짓는 하루되세요' },
                { id: 'smp-sms-07', name: '3월의 시작', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '완연한 봄을 맞이하는 3월입니다. 포근한 봄처럼 마음까지 따스한 3월 보내시길 바랄게요~' },
                { id: 'smp-sms-08', name: '3월 경칩', senderNumber: '16447143', purpose: 'general', messageType: 'SMS', title: '', content: '만물이 움트는 3월의 절기 경칩입니다. 행복한 봄맞이 시작해보세요^^ 당신을 응원합니다!' },

                // ===== LMS (장문) — 2000byte 이내 =====
                { id: 'smp-lms-01', name: '추운날씨', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '추운날씨', content: '올 겨울은 소리없이 내려 소복이 쌓이는 하얀 눈처럼 행복이 당신의 마음속에 소복이 쌓였으면 좋겠습니다.\n\n눈처럼 쌓인 행복으로 따스한 겨울을 보내시길 바라겠습니다. 늘 건강하시고 즐거운 하루 되세요.' },
                { id: 'smp-lms-02', name: '추운겨울날씨', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '추운겨울날씨', content: '매서운 한파에 마음까지 얼어버리는 것 같은 한겨울 날씨입니다.\n\n매년 겪는 추위인데도 적응하기가 여간 쉽지 않습니다.\n\n다가오는 한파에도 따뜻한 마음으로 서로를 챙기는 하루 되시길 바랍니다.' },
                { id: 'smp-lms-03', name: '3월의 시작', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '3월의 시작', content: '봄이 시작됨과 함께 많은 것들이 새롭게 시작되는 달인 3월입니다.\n\n시작은 항상 설레임을 동반하게 되지요. 새로운 출발선에 선 모든 분들을 응원합니다.\n\n3월 한 달도 활기차게 보내시기 바랍니다.' },
                { id: 'smp-lms-04', name: '포근한 3월', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '포근한 3월', content: '3월의 봄이라는 단어를 떠올리면 따스한 햇빛이 모든 걸 감싸는 것만 같네요.\n\n완연한 봄은 아직이지만 꽃망울 터뜨리는 봄꽃들의 모습에 마음마저 따뜻해집니다.\n\n포근한 3월의 봄날 되세요.' },
                { id: 'smp-lms-05', name: '3월 춘분', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '3월 춘분', content: '봄이 성큼 우리곁으로 다가왔네요.\n\n눈깜짝할 사이 겨울이 지나갔어요.\n\n낮과 밤의 길이가 같아지는 춘분, 본격적인 봄의 시작을 알리는 절기입니다. 따뜻한 봄날 즐겁게 보내세요.' },
                { id: 'smp-lms-06', name: '여유로운 3월', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '여유로운 3월', content: '공기가 시린 겨울을 벗어나 봄을 맞이하니 포근한 날씨가 찾아왔습니다.\n\n따뜻해진 날씨에 마음에도 여유가 깃들기를 바라며, 한층 여유로운 3월 보내시기 바랍니다.' },
                { id: 'smp-lms-07', name: '3월의 여운', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '3월의 여운', content: '겨울의 여운이 남았다지만 오후의 따뜻한 햇빛이 봄이 왔음을 알립니다.\n\n조금있으면 길가에 핀 노란 개나리도 곧 만나볼 수 있겠지요. 향기로운 봄날 되시길.' },
                { id: 'smp-lms-08', name: '3월의 봄', senderNumber: '16447143', purpose: 'general', messageType: 'LMS', title: '3월의 봄', content: '아직은 봄을 시샘하는 꽃샘추위가 기승을 부리고 있지만 얼마지 않아 힘을 잃을 것 같네요.\n\n봄이 다가옵니다. 곧 만개할 봄꽃들과 함께 행복한 일들이 가득하시길 바랍니다.' },

                // ===== MMS (포토) =====
                { id: 'smp-mms-01', name: '시험대박', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '시험대박', content: '시험대박! 의욕폭발! 인생대박!\n오늘도 화이팅하세요. 응원합니다.', thumbnail: 'https://placehold.co/400x500/fff200/333?text=%EC%8B%9C%ED%97%98%EB%8C%80%EB%B0%95' },
                { id: 'smp-mms-02', name: '시험 불태우겠어', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '시험 D-DAY', content: '시험 D-DAY 불태우겠어!\n준비한 만큼 모두 보여주세요.', thumbnail: 'https://placehold.co/400x500/ffd24a/333?text=%EB%B6%88%ED%83%9C%EC%9A%B0%EA%B2%A0%EC%96%B4' },
                { id: 'smp-mms-03', name: '시험 대박 부적', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '시험 대박 부적', content: '시험 대박을 기원하는 부적을 보냅니다.\n좋은 결과 있으시길!', thumbnail: 'https://placehold.co/400x500/8b5a2b/fff?text=%EB%8C%80%EB%B0%95%EB%B6%80%EC%A0%81' },
                { id: 'smp-mms-04', name: '벚꽃의 꽃말', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '벚꽃의 꽃말', content: '벚꽃의 꽃말 : 삶의 덧없음\n벚꽃처럼 화사한 봄날 되세요.', thumbnail: 'https://placehold.co/400x500/ffd6e0/333?text=%EB%B2%9A%EA%BD%83' },
                { id: 'smp-mms-05', name: '봄이왔나 봄', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '봄이왔나 봄', content: '봄이 왔나 봄!\n포근한 봄을 함께 즐겨봐요.', thumbnail: 'https://placehold.co/400x500/ffb7c5/fff?text=%EB%B4%84%EC%9D%B4%EC%99%94%EB%82%98' },
                { id: 'smp-mms-06', name: '나만 아닌가 봄', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '나만 아닌가 봄', content: '나만... 아닌가 봄?\n봄의 설렘을 함께 나눠요.', thumbnail: 'https://placehold.co/400x500/c9d6c1/333?text=%EB%82%98%EB%A7%8C+%EB%B4%84' },
                { id: 'smp-mms-07', name: '벚꽃축제', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '벚꽃축제', content: '벚꽃축제가 시작됐어요.\n흐드러지게 핀 벚꽃 보러 함께 가요!', thumbnail: 'https://placehold.co/400x500/ff9bb3/fff?text=%EB%B2%9A%EA%BD%83%EC%B6%95%EC%A0%9C' },
                { id: 'smp-mms-08', name: '미세먼지 주의보', senderNumber: '16447143', purpose: 'general', messageType: 'MMS', title: '봄철 미세먼지 주의보', content: '봄철 미세먼지 주의보!\n외출 시 마스크 꼭 착용하세요.', thumbnail: 'https://placehold.co/400x500/ffd1dc/333?text=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80' }
            ]
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                addCategory: new bootstrap.Modal(this.$refs.addCategoryModal),
                editCategory: new bootstrap.Modal(this.$refs.editCategoryModal),
                adAlert: new bootstrap.Modal(this.$refs.adAlertModal),
                templateDetail: new bootstrap.Modal(this.$refs.templateDetailModal),
                sample: new bootstrap.Modal(this.$refs.sampleModal),
                delete: new bootstrap.Modal(this.$refs.deleteModal),
                alert: new bootstrap.Modal(this.$refs.alertModal)
            };
        });
    },

    computed: {
        selectedTemplate() {
            if (this.selectedType !== 'template') return null;
            for (const cat of this.categories) {
                const t = cat.templates.find(t => t.id === this.selectedTemplateId);
                if (t) return t;
            }
            return null;
        },
        selectedCategory() {
            return this.categories.find(c => c.id === this.selectedCategoryId) || null;
        },
        canEditCategory() {
            return this.selectedType === 'category';
        },
        canRegister() {
            return this.selectedType === 'category' || this.selectedType === 'template';
        },
        canEditTemplate() {
            return this.selectedType === 'template';
        },
        canDelete() {
            return this.selectedType === 'category' || this.selectedType === 'template';
        },
        filteredCategories() {
            const q = this.activeSearch.trim().toLowerCase();
            if (!q) return this.categories;
            return this.categories
                .map(cat => {
                    const matchedTemplates = cat.templates.filter(t => t.name.toLowerCase().includes(q));
                    if (cat.name.toLowerCase().includes(q)) {
                        return { ...cat, expanded: true };
                    }
                    if (matchedTemplates.length > 0) {
                        return { ...cat, expanded: true, templates: matchedTemplates };
                    }
                    return null;
                })
                .filter(c => c !== null);
        },
        filteredSamples() {
            const q = this.sampleModal.search.trim().toLowerCase();
            const tab = this.sampleModal.activeTab;
            return this.sampleTemplates.filter(t => {
                if (t.messageType !== tab) return false;
                if (q && !t.name.toLowerCase().includes(q)) return false;
                return true;
            });
        },
        sampleTotalPages() {
            return Math.max(1, Math.ceil(this.filteredSamples.length / this.sampleModal.pageSize));
        },
        pagedSamples() {
            const start = (this.sampleModal.page - 1) * this.sampleModal.pageSize;
            return this.filteredSamples.slice(start, start + this.sampleModal.pageSize);
        },
        sampleCardsWithBytes() {
            return this.pagedSamples.map(t => ({
                ...t,
                bytes: this.calcBytes(t.content)
            }));
        },
        selectedSample() {
            return this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId) || null;
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
        }
    },

    methods: {
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

        calcBytes(str) {
            if (!str) return 0;
            let bytes = 0;
            for (let i = 0; i < str.length; i++) {
                const code = str.charCodeAt(i);
                bytes += code > 127 ? 2 : 1;
            }
            return bytes;
        },

        purposeLabel(purpose) {
            return purpose === 'general' ? '일반용' : (purpose === 'auth' ? '인증용' : (purpose === 'ad' ? '광고용' : ''));
        },

        // ===== 트리 선택 =====
        selectRoot() {
            this.selectedType = 'root';
            this.selectedCategoryId = null;
            this.selectedTemplateId = null;
        },

        selectCategory(cat) {
            this.selectedType = 'category';
            this.selectedCategoryId = cat.id;
            this.selectedTemplateId = null;
        },

        selectTemplate(cat, tpl) {
            this.selectedType = 'template';
            this.selectedCategoryId = cat.id;
            this.selectedTemplateId = tpl.id;
        },

        // ===== 검색 =====
        onSearch() {
            this.activeSearch = this.searchKeyword;
        },

        // ===== 카테고리 추가 =====
        openAddCategory() {
            const parentCat = this.categories.find(c => c.id === this.selectedCategoryId);
            this.addCategoryModal.parentName = parentCat ? parentCat.name : 'Root Category';
            this.addCategoryModal.parentId = parentCat ? parentCat.id : null;
            this.addCategoryModal.name = '';
            this.showModal('addCategory');
        },

        confirmAddCategory() {
            const name = this.addCategoryModal.name.trim();
            if (!name) {
                this.showAlert('카테고리 이름을 입력하세요.');
                return;
            }
            const newCat = {
                id: this.generateId(),
                name,
                expanded: true,
                templates: []
            };
            this.categories.push(newCat);
            this.closeModal('addCategory');
            this.selectCategory(newCat);
            this.showAlert('카테고리가 추가되었습니다.');
        },

        // ===== 카테고리 이름 수정 =====
        openEditCategory() {
            if (!this.canEditCategory) return;
            const cat = this.selectedCategory;
            if (!cat) return;
            this.editCategoryModal.id = cat.id;
            this.editCategoryModal.name = cat.name;
            this.showModal('editCategory');
        },

        confirmEditCategory() {
            const name = this.editCategoryModal.name.trim();
            if (!name) {
                this.showAlert('카테고리 이름을 입력하세요.');
                return;
            }
            const cat = this.categories.find(c => c.id === this.editCategoryModal.id);
            if (cat) cat.name = name;
            this.closeModal('editCategory');
            this.showAlert('카테고리 이름이 수정되었습니다.');
        },

        // ===== 템플릿 등록/수정 진입 =====
        goRegister() {
            if (!this.canRegister) return;
            this.editingTemplateId = null;
            this.editingCategoryId = this.selectedCategoryId;
            this.resetForm();
            this.mode = 'register';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        goEdit() {
            if (!this.canEditTemplate) return;
            const tpl = this.selectedTemplate;
            if (!tpl) return;
            this.editingTemplateId = tpl.id;
            this.editingCategoryId = this.selectedCategoryId;
            this.form = {
                name: tpl.name,
                senderNumber: tpl.senderNumber,
                purpose: tpl.purpose,
                messageType: tpl.messageType,
                title: tpl.title || '',
                content: tpl.content || '',
                attachments: []
            };
            this.previousPurpose = tpl.purpose;
            this.mode = 'edit';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        cancelForm() {
            this.mode = 'list';
            this.editingTemplateId = null;
            this.editingCategoryId = null;
        },

        resetForm() {
            this.form = {
                name: '',
                senderNumber: '',
                purpose: 'general',
                messageType: 'SMS',
                title: '',
                content: '',
                attachments: []
            };
            this.previousPurpose = 'general';
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
                this.showAlert('jpg, jpeg 형식만 첨부할 수 있습니다.');
            }
            const merged = [...this.form.attachments, ...valid].slice(0, 3);
            const oversize = merged.find(f => f.size > 300 * 1024);
            if (oversize) {
                this.showAlert('1개 파일 크기는 300KB 이하여야 합니다.');
                e.target.value = '';
                return;
            }
            const totalSize = merged.reduce((sum, f) => sum + f.size, 0);
            if (totalSize > 800 * 1024) {
                this.showAlert('첨부 파일 합산 용량은 800KB 이하여야 합니다.');
                e.target.value = '';
                return;
            }
            this.form.attachments = merged;
            e.target.value = '';
        },

        // ===== 저장 =====
        saveTemplate() {
            if (!this.form.name.trim()) {
                this.showAlert('템플릿 이름을 입력하세요.');
                return;
            }
            if (!this.form.senderNumber) {
                this.showAlert('발신 번호를 선택하세요.');
                return;
            }
            if (this.form.messageType !== 'SMS' && !this.form.title.trim()) {
                this.showAlert('제목을 입력하세요.');
                return;
            }
            if (!this.form.content.trim()) {
                this.showAlert('내용을 입력하세요.');
                return;
            }
            if (this.form.messageType === 'MMS' && this.form.attachments.length === 0) {
                this.showAlert('MMS는 이미지를 첨부하세요.');
                return;
            }

            const now = this.formatNow();

            if (this.mode === 'register') {
                let cat = this.categories.find(c => c.id === this.editingCategoryId);
                if (!cat) cat = this.categories[0];
                const newId = this.generateId();
                cat.templates.push({
                    id: newId,
                    name: this.form.name,
                    senderNumber: this.form.senderNumber,
                    purpose: this.form.purpose,
                    messageType: this.form.messageType,
                    title: this.form.title,
                    content: this.form.content,
                    createdAt: now,
                    updatedAt: now
                });
                cat.expanded = true;
                this.selectedType = 'template';
                this.selectedCategoryId = cat.id;
                this.selectedTemplateId = newId;
            } else if (this.mode === 'edit') {
                for (const cat of this.categories) {
                    const t = cat.templates.find(t => t.id === this.editingTemplateId);
                    if (t) {
                        t.name = this.form.name;
                        t.senderNumber = this.form.senderNumber;
                        t.purpose = this.form.purpose;
                        t.messageType = this.form.messageType;
                        t.title = this.form.title;
                        t.content = this.form.content;
                        t.updatedAt = now;
                        break;
                    }
                }
            }

            this.mode = 'list';
            this.editingTemplateId = null;
            this.editingCategoryId = null;
            this.showAlert('저장되었습니다.');
        },

        // ===== 삭제 =====
        openDeleteConfirm() {
            if (!this.canDelete) return;
            this.showModal('delete');
        },

        confirmDelete() {
            if (this.selectedType === 'template') {
                for (const cat of this.categories) {
                    const idx = cat.templates.findIndex(t => t.id === this.selectedTemplateId);
                    if (idx !== -1) {
                        cat.templates.splice(idx, 1);
                        break;
                    }
                }
                this.selectedType = 'category';
                this.selectedTemplateId = null;
            } else if (this.selectedType === 'category') {
                const idx = this.categories.findIndex(c => c.id === this.selectedCategoryId);
                if (idx !== -1) {
                    this.categories.splice(idx, 1);
                }
                this.selectedType = 'root';
                this.selectedCategoryId = null;
                this.selectedTemplateId = null;
            }
            this.closeModal('delete');
            this.showAlert('삭제되었습니다.');
        },

        // ===== 템플릿 상세 보기 =====
        openTemplateDetailModal() {
            if (!this.selectedTemplate) return;
            this.showModal('templateDetail');
        },

        // ===== 샘플 템플릿 =====
        openSampleModal() {
            this.sampleModal.search = '';
            this.sampleModal.selectedId = null;
            this.sampleModal.page = 1;
            // register/edit 모드에서 폼의 messageType을 초기 탭으로
            if (this.mode !== 'list' && this.form.messageType) {
                this.sampleModal.activeTab = this.form.messageType;
            } else {
                this.sampleModal.activeTab = 'SMS';
            }
            this.showModal('sample');
        },

        switchSampleTab(tab) {
            if (this.sampleModal.activeTab === tab) return;
            this.sampleModal.activeTab = tab;
            this.sampleModal.page = 1;
            this.sampleModal.selectedId = null;
        },

        onSampleCardClick(t) {
            this.sampleModal.selectedId = t.id;
        },

        confirmSample() {
            const tpl = this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId);
            if (!tpl) {
                this.showAlert('샘플 템플릿을 선택하세요.');
                return;
            }
            // list 모드에서 선택 시 등록 모드로 진입
            if (this.mode === 'list') {
                this.editingTemplateId = null;
                this.editingCategoryId = this.selectedCategoryId || (this.categories[0] && this.categories[0].id) || null;
                this.resetForm();
                this.mode = 'register';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            this.form.senderNumber = tpl.senderNumber;
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.messageType = tpl.messageType;
            this.form.title = tpl.title;
            this.form.content = tpl.content;
            if (!this.form.name) {
                this.form.name = tpl.name;
            }
            this.closeModal('sample');
        },

        // ===== 유틸 =====
        generateId() {
            return Math.random().toString(36).slice(2, 10);
        },

        formatNow() {
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }
    }
};
