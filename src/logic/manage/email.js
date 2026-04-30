export default {
    name: 'ManageEmailTemplate',
    layout: 'default',

    data() {
        return {
            mode: 'list',

            rootExpanded: true,
            searchKeyword: '',
            activeSearch: '',

            selectedType: null,
            selectedCategoryId: null,
            selectedTemplateId: null,

            categories: [
                {
                    id: 'uFu6iHB3',
                    name: '비디오팩_상품개설',
                    expanded: true,
                    templates: [
                        {
                            id: '5dtZtAWb',
                            name: '01_비디오팩생성',
                            fromEmail: 'no-reply@wecandeo.com',
                            purpose: 'general',
                            title: '[위캔디오] 비디오팩 준비 완료 🎉',
                            content: '#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n▶ 시작 가이드\nhttps://support.wecandeo.com/docs/videopack-guide-quick-start\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.',
                            attachments: [],
                            createdAt: '2026-04-13 13:52',
                            updatedAt: '2026-04-13 14:24'
                        },
                        {
                            id: 'a7Bk2QnL',
                            name: '02-1_비디오팩생성2일경과',
                            fromEmail: 'no-reply@wecandeo.com',
                            purpose: 'general',
                            title: '[위캔디오] 첫 영상 업로드를 기다리고 있어요',
                            content: '#{name}님, 비디오팩 첫 영상 업로드를 아직 진행하지 않으셨어요.\n지금 바로 시작해 보세요.',
                            attachments: [],
                            createdAt: '2026-04-13 13:55',
                            updatedAt: '2026-04-13 13:55'
                        },
                        {
                            id: 'b9Cm3RpM',
                            name: '02-2_비디오팩생성2일경과',
                            fromEmail: 'no-reply@wecandeo.com',
                            purpose: 'general',
                            title: '[위캔디오] 비디오팩, 함께 시작해볼까요?',
                            content: '비디오팩을 시작할 준비가 됐어요. 첫 영상을 업로드해 보세요.',
                            attachments: [],
                            createdAt: '2026-04-13 14:00',
                            updatedAt: '2026-04-13 14:00'
                        },
                        {
                            id: 'c1Dn4SqN',
                            name: '03-1_비디오팩생성5일경과',
                            fromEmail: 'no-reply@wecandeo.com',
                            purpose: 'general',
                            title: '[위캔디오] 비디오팩 시작 안내',
                            content: '#{name}님, 비디오팩을 더 잘 활용할 수 있는 가이드를 안내드립니다.',
                            attachments: [],
                            createdAt: '2026-04-13 14:10',
                            updatedAt: '2026-04-13 14:10'
                        },
                        {
                            id: 'd2Eo5TrO',
                            name: '03-2_비디오팩생성5일경과',
                            fromEmail: 'no-reply@wecandeo.com',
                            purpose: 'general',
                            title: '[위캔디오] 비디오팩 활용 팁',
                            content: '비디오팩을 더 잘 활용할 수 있는 팁을 안내드립니다.',
                            attachments: [],
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
                            fromEmail: 'no-reply@wecandeo.com',
                            purpose: 'general',
                            title: '[위캔디오] 영상 업로드가 완료되었습니다',
                            content: '영상 업로드가 완료되었습니다. 인코딩 요청을 진행해 주세요.',
                            attachments: [],
                            createdAt: '2026-04-14 09:00',
                            updatedAt: '2026-04-14 09:00'
                        }
                    ]
                }
            ],

            form: {
                name: '',
                fromEmail: '',
                purpose: 'general',
                title: '',
                content: '',
                attachments: []
            },
            previewMode: 'text',
            previousPurpose: 'general',
            editingTemplateId: null,
            editingCategoryId: null,

            defaultOptoutText: '메일 수신을 원치 않으시면 [##BLOCK_RECEIVER_LINK##]를 클릭하세요.\nIf you do not want to receive it, please click a [##EN_BLOCK_RECEIVER_LINK##]',

            addCategoryModal: { parentName: 'Root Category', parentId: null, name: '' },
            editCategoryModal: { id: '', name: '' },
            adAlertModal: {
                optoutMode: 'default',
                customOptoutText: ''
            },
            sampleModal: { search: '', selectedId: null },
            alertText: '',

            sampleTemplates: [
                { id: 'smp-01', name: '회원가입 환영 메일', fromEmail: 'no-reply@wecandeo.com', purpose: 'general', title: '[위캔디오] 가입을 환영합니다.', content: '#{name}님, 가입을 환영합니다.' },
                { id: 'smp-02', name: '결제 완료 안내 메일', fromEmail: 'no-reply@wecandeo.com', purpose: 'general', title: '[결제 완료] 결제 영수증 안내', content: '#{name}님, 결제가 정상 완료되었습니다.' },
                { id: 'smp-03', name: '비밀번호 인증 메일', fromEmail: 'no-reply@wecandeo.com', purpose: 'auth', title: '[인증] 본인 인증 메일', content: '인증번호: #{code}' },
                { id: 'smp-04', name: '이벤트 안내 메일', fromEmail: 'marketing@wecandeo.com', purpose: 'ad', title: '[이벤트] 신규 이벤트 안내', content: '이벤트 안내드립니다.' }
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
            if (!q) return this.sampleTemplates;
            return this.sampleTemplates.filter(t => t.name.toLowerCase().includes(q));
        },
        selectedSample() {
            return this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId) || null;
        },
        attachedFileNames() {
            return this.form.attachments.map(f => f.name).join(', ');
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

        purposeLabel(purpose) {
            return purpose === 'general' ? '일반용' : (purpose === 'auth' ? '인증용' : (purpose === 'ad' ? '광고용' : ''));
        },

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

        onSearch() {
            this.activeSearch = this.searchKeyword;
        },

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
                fromEmail: tpl.fromEmail || '',
                purpose: tpl.purpose,
                title: tpl.title || '',
                content: tpl.content || '',
                attachments: Array.isArray(tpl.attachments) ? [...tpl.attachments] : []
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
                fromEmail: '',
                purpose: 'general',
                title: '',
                content: '',
                attachments: []
            };
            this.previousPurpose = 'general';
        },

        onPurposeSelect(value) {
            if (value === 'ad') {
                this.previousPurpose = this.form.purpose === 'ad' ? this.previousPurpose : this.form.purpose;
                this.form.purpose = 'ad';
                this.adAlertModal.optoutMode = 'default';
                this.adAlertModal.customOptoutText = '';
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
            if (!this.form.title.startsWith(adPrefix)) {
                this.form.title = `${adPrefix} ${this.form.title}`.trim();
            }

            let optoutText = '';
            if (this.adAlertModal.optoutMode === 'default') {
                optoutText = this.defaultOptoutText;
            } else if (this.adAlertModal.optoutMode === 'custom') {
                optoutText = this.adAlertModal.customOptoutText.trim();
                if (!optoutText) {
                    this.showAlert('수신 거부 안내 문구를 입력하세요.');
                    return;
                }
            }

            if (optoutText) {
                const separator = '\n\n--\n';
                if (!this.form.content.includes(optoutText)) {
                    this.form.content = `${this.form.content}${separator}${optoutText}`;
                }
            }

            this.previousPurpose = 'ad';
            this.closeModal('adAlert');
        },

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

        saveTemplate() {
            if (!this.form.name.trim()) {
                this.showAlert('템플릿 이름을 입력하세요.');
                return;
            }
            if (!this.form.fromEmail.trim()) {
                this.showAlert('발신 메일을 입력하세요.');
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.form.fromEmail.trim())) {
                this.showAlert('올바른 이메일 형식이 아닙니다.');
                return;
            }
            if (!this.form.title.trim()) {
                this.showAlert('제목을 입력하세요.');
                return;
            }
            if (!this.form.content.trim()) {
                this.showAlert('내용을 입력하세요.');
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
                    fromEmail: this.form.fromEmail,
                    purpose: this.form.purpose,
                    title: this.form.title,
                    content: this.form.content,
                    attachments: [...this.form.attachments],
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
                        t.fromEmail = this.form.fromEmail;
                        t.purpose = this.form.purpose;
                        t.title = this.form.title;
                        t.content = this.form.content;
                        t.attachments = [...this.form.attachments];
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

        openTemplateDetailModal() {
            if (!this.selectedTemplate) return;
            this.showModal('templateDetail');
        },

        openSampleModal() {
            this.sampleModal.search = '';
            this.sampleModal.selectedId = null;
            this.showModal('sample');
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
            if (this.mode === 'list') {
                this.editingTemplateId = null;
                this.editingCategoryId = this.selectedCategoryId || (this.categories[0] && this.categories[0].id) || null;
                this.resetForm();
                this.mode = 'register';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            this.form.fromEmail = tpl.fromEmail;
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.title = tpl.title;
            this.form.content = tpl.content;
            if (!this.form.name) {
                this.form.name = tpl.name;
            }
            this.closeModal('sample');
        },

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
