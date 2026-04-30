export default {
    name: 'ManagePushTemplate',
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
                    id: 'pUsHcAt1',
                    name: '비디오팩_알림',
                    expanded: true,
                    templates: [
                        {
                            id: 'pTpl0001',
                            name: '01_업로드완료',
                            purpose: 'general',
                            inputType: 'basic',
                            basic: {
                                htmlStyle: 'disabled',
                                title: '업로드 완료',
                                content: '영상 업로드가 완료되었습니다.',
                                badge: 1,
                                buttons: [],
                                media: null,
                                androidMedia: null,
                                iosMedia: null,
                                androidLargeIcon: null,
                                group: null
                            },
                            json: { htmlStyle: 'disabled', body: '' },
                            createdAt: '2026-04-13 14:00',
                            updatedAt: '2026-04-13 14:00'
                        }
                    ]
                }
            ],

            form: this.makeEmptyForm(),
            previousPurpose: 'general',
            editingTemplateId: null,
            editingCategoryId: null,

            addCategoryModal: { parentName: 'Root Category', parentId: null, name: '' },
            editCategoryModal: { id: '', name: '' },
            sampleModal: { search: '', selectedId: null },
            alertText: '',

            itemModal: {
                button: { type: '' },
                media: { url: '', type: '', expand: '' },
                androidMedia: { url: '', type: '', expand: '' },
                iosMedia: { url: '', type: '' },
                androidLargeIcon: { url: '' },
                group: { key: '', description: '' }
            },

            sampleTemplates: [
                { id: 'smp-01', name: '회원가입 환영', purpose: 'general', inputType: 'basic', basic: { htmlStyle: 'disabled', title: '환영합니다', content: '#{name}님, 가입을 환영합니다.', badge: null, buttons: [], media: null, androidMedia: null, iosMedia: null, androidLargeIcon: null, group: null }, json: { htmlStyle: 'disabled', body: '' } },
                { id: 'smp-02', name: '결제 완료', purpose: 'general', inputType: 'basic', basic: { htmlStyle: 'disabled', title: '결제 완료', content: '결제가 정상 완료되었습니다.', badge: null, buttons: [], media: null, androidMedia: null, iosMedia: null, androidLargeIcon: null, group: null }, json: { htmlStyle: 'disabled', body: '' } },
                { id: 'smp-03', name: '이벤트 안내', purpose: 'ad', inputType: 'basic', basic: { htmlStyle: 'enabled', title: '[이벤트] 신규 이벤트', content: '신규 이벤트를 확인해 보세요.', badge: 1, buttons: [], media: null, androidMedia: null, iosMedia: null, androidLargeIcon: null, group: null }, json: { htmlStyle: 'disabled', body: '' } }
            ]
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                addCategory: new bootstrap.Modal(this.$refs.addCategoryModal),
                editCategory: new bootstrap.Modal(this.$refs.editCategoryModal),
                button: new bootstrap.Modal(this.$refs.buttonModal),
                media: new bootstrap.Modal(this.$refs.mediaModal),
                androidMedia: new bootstrap.Modal(this.$refs.androidMediaModal),
                iosMedia: new bootstrap.Modal(this.$refs.iosMediaModal),
                androidLargeIcon: new bootstrap.Modal(this.$refs.largeIconModal),
                group: new bootstrap.Modal(this.$refs.groupModal),
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
        hasAnyTemplate() {
            return this.categories.some(c => c.templates.length > 0);
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
        previewTitle() {
            if (this.form.inputType === 'json') {
                try {
                    const obj = JSON.parse(this.form.json.body || '{}');
                    return obj.title || '';
                } catch (e) {
                    return '';
                }
            }
            return this.form.basic.title;
        },
        previewContent() {
            if (this.form.inputType === 'json') {
                try {
                    const obj = JSON.parse(this.form.json.body || '{}');
                    return obj.body || obj.content || '';
                } catch (e) {
                    return '';
                }
            }
            return this.form.basic.content;
        }
    },

    methods: {
        makeEmptyForm() {
            return {
                name: '',
                purpose: 'general',
                inputType: 'basic',
                basic: {
                    htmlStyle: 'enabled',
                    title: '',
                    content: '',
                    badge: null,
                    buttons: [],
                    media: null,
                    androidMedia: null,
                    iosMedia: null,
                    androidLargeIcon: null,
                    group: null
                },
                json: {
                    htmlStyle: 'enabled',
                    body: ''
                }
            };
        },

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
            return purpose === 'general' ? '일반용' : (purpose === 'ad' ? '광고용' : '');
        },

        buttonTypeLabel(type) {
            const map = { reply: '응답', open_app: '앱 열기', open_url: 'URL 열기', close: '닫기' };
            return map[type] || '버튼';
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
            const newCat = { id: this.generateId(), name, expanded: true, templates: [] };
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
            this.form = this.makeEmptyForm();
            this.previousPurpose = 'general';
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
                purpose: tpl.purpose,
                inputType: tpl.inputType || 'basic',
                basic: tpl.basic ? JSON.parse(JSON.stringify(tpl.basic)) : this.makeEmptyForm().basic,
                json: tpl.json ? JSON.parse(JSON.stringify(tpl.json)) : this.makeEmptyForm().json
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

        onPurposeSelect(value) {
            this.form.purpose = value;
            this.previousPurpose = value;
        },

        // ===== 항목 추가 모달 =====
        openItemModal(kind) {
            if (kind === 'button') {
                this.itemModal.button = { type: '' };
            } else if (kind === 'media') {
                this.itemModal.media = { url: '', type: '', expand: '' };
            } else if (kind === 'androidMedia') {
                this.itemModal.androidMedia = { url: '', type: '', expand: '' };
            } else if (kind === 'iosMedia') {
                this.itemModal.iosMedia = { url: '', type: '' };
            } else if (kind === 'androidLargeIcon') {
                this.itemModal.androidLargeIcon = { url: '' };
            } else if (kind === 'group') {
                this.itemModal.group = { key: '', description: '' };
            }
            this.showModal(kind);
        },

        confirmAddButton() {
            if (!this.itemModal.button.type) {
                this.showAlert('버튼 유형을 선택하세요.');
                return;
            }
            this.form.basic.buttons.push({ type: this.itemModal.button.type });
            this.closeModal('button');
        },

        confirmMedia() {
            if (!this.itemModal.media.url.trim()) {
                this.showAlert('URL을 입력하세요.');
                return;
            }
            this.form.basic.media = { ...this.itemModal.media };
            this.closeModal('media');
        },

        confirmAndroidMedia() {
            if (!this.itemModal.androidMedia.url.trim()) {
                this.showAlert('URL을 입력하세요.');
                return;
            }
            this.form.basic.androidMedia = { ...this.itemModal.androidMedia };
            this.closeModal('androidMedia');
        },

        confirmIosMedia() {
            if (!this.itemModal.iosMedia.url.trim()) {
                this.showAlert('URL을 입력하세요.');
                return;
            }
            this.form.basic.iosMedia = { ...this.itemModal.iosMedia };
            this.closeModal('iosMedia');
        },

        confirmLargeIcon() {
            if (!this.itemModal.androidLargeIcon.url.trim()) {
                this.showAlert('URL을 입력하세요.');
                return;
            }
            this.form.basic.androidLargeIcon = { ...this.itemModal.androidLargeIcon };
            this.closeModal('androidLargeIcon');
        },

        confirmGroup() {
            if (!this.itemModal.group.key.trim()) {
                this.showAlert('그룹 키를 입력하세요.');
                return;
            }
            this.form.basic.group = { ...this.itemModal.group };
            this.closeModal('group');
        },

        removeItem(field, idx) {
            if (Array.isArray(this.form.basic[field])) {
                this.form.basic[field].splice(idx, 1);
            }
        },

        saveTemplate() {
            if (!this.form.name.trim()) {
                this.showAlert('템플릿 이름을 입력하세요.');
                return;
            }
            if (this.form.inputType === 'basic') {
                if (!this.form.basic.title.trim() && !this.form.basic.content.trim()) {
                    this.showAlert('제목 또는 내용을 입력하세요.');
                    return;
                }
            } else {
                if (!this.form.json.body.trim()) {
                    this.showAlert('JSON을 입력하세요.');
                    return;
                }
                try {
                    JSON.parse(this.form.json.body);
                } catch (e) {
                    this.showAlert('올바른 JSON 형식이 아닙니다.');
                    return;
                }
            }

            const now = this.formatNow();

            if (this.mode === 'register') {
                let cat = this.categories.find(c => c.id === this.editingCategoryId);
                if (!cat) cat = this.categories[0];
                const newId = this.generateId();
                cat.templates.push({
                    id: newId,
                    name: this.form.name,
                    purpose: this.form.purpose,
                    inputType: this.form.inputType,
                    basic: JSON.parse(JSON.stringify(this.form.basic)),
                    json: JSON.parse(JSON.stringify(this.form.json)),
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
                        t.purpose = this.form.purpose;
                        t.inputType = this.form.inputType;
                        t.basic = JSON.parse(JSON.stringify(this.form.basic));
                        t.json = JSON.parse(JSON.stringify(this.form.json));
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

        onSampleRowClick(t) {
            if (this.mode !== 'list') {
                this.sampleModal.selectedId = t.id;
            }
        },

        confirmSample() {
            const tpl = this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId);
            if (!tpl) {
                this.showAlert('샘플 템플릿을 선택하세요.');
                return;
            }
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.inputType = tpl.inputType;
            this.form.basic = JSON.parse(JSON.stringify(tpl.basic));
            this.form.json = JSON.parse(JSON.stringify(tpl.json));
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
