export default {
    name: 'ManageKakaoTemplate',
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

            // 상세 패널 탭: 'basic' | 'history'
            detailTab: 'basic',

            // 필터
            filter: {
                profileType: 'all', // all | general | group
                profileId: '',
                status: 'all'
            },

            // 발신 프로필 목록 (목)
            senderProfiles: [
                { id: 'wcd', name: '@위캔디오', type: 'general' },
                { id: 'malgn', name: '@맑은소프트', type: 'general' },
                { id: 'group1', name: '@그룹A', type: 'group' }
            ],

            // 카테고리(대분류/중분류) — 카카오 비즈메시지 카테고리 (목)
            categoryMainList: [
                { id: 'service', name: '서비스이용' },
                { id: 'transaction', name: '구매/거래' },
                { id: 'membership', name: '회원' },
                { id: 'reservation', name: '예약/배송' }
            ],
            categorySubMap: {
                service: [
                    { id: 'service-notice', name: '이용안내/공지' },
                    { id: 'service-event', name: '이벤트/혜택' },
                    { id: 'service-update', name: '서비스 업데이트' }
                ],
                transaction: [
                    { id: 'tx-payment', name: '결제 안내' },
                    { id: 'tx-refund', name: '환불 안내' }
                ],
                membership: [
                    { id: 'mb-welcome', name: '가입 환영' },
                    { id: 'mb-leave', name: '휴면/탈퇴' }
                ],
                reservation: [
                    { id: 'rv-confirm', name: '예약 확정' },
                    { id: 'rv-delivery', name: '배송 알림' }
                ]
            },

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
                            code: '01',
                            kakaoCode: '01',
                            profileType: 'general',
                            profileId: 'wcd',
                            purpose: 'general',
                            messageType: 'extra',
                            emphasisType: 'none',
                            status: 'approved',
                            content: '[위캔디오] 비디오팩 준비 완료 🎉\n\n#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.',
                            extraInfo: '▶ 아래 버튼에서 시작 가이드를 확인해 주세요.\n\n궁금한 점은 문의로 남겨주세요.',
                            channelMessage: '',
                            secure: 'none',
                            categoryMain: 'service',
                            categorySub: 'service-notice',
                            mainLink: { mobile: 'https://www.wecandeo.com', pc: 'https://www.wecandeo.com', android: '', ios: '' },
                            buttons: [
                                { type: 'web', name: '👋 시작 가이드' },
                                { type: 'web', name: '💬 문의하기' }
                            ],
                            quickLinks: [],
                            createdAt: '2026-04-13 13:52',
                            updatedAt: '2026-04-13 14:24'
                        },
                        {
                            id: 'a7Bk2QnL',
                            name: '02-1_비디오팩생성2일경과',
                            code: '02-1',
                            kakaoCode: '02-1',
                            profileType: 'general',
                            profileId: 'wcd',
                            purpose: 'general',
                            messageType: 'basic',
                            emphasisType: 'none',
                            status: 'approved',
                            content: '#{name}님, 비디오팩 첫 영상 업로드를 아직 진행하지 않으셨어요.\n지금 바로 시작해 보세요.',
                            extraInfo: '',
                            channelMessage: '',
                            secure: 'none',
                            categoryMain: 'service',
                            categorySub: 'service-notice',
                            mainLink: null,
                            buttons: [],
                            quickLinks: [],
                            createdAt: '2026-04-13 13:55',
                            updatedAt: '2026-04-13 13:55'
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
                            code: '01',
                            kakaoCode: '01',
                            profileType: 'general',
                            profileId: 'wcd',
                            purpose: 'general',
                            messageType: 'channel',
                            emphasisType: 'none',
                            status: 'review',
                            content: '영상 업로드가 완료되었습니다.',
                            extraInfo: '',
                            channelMessage: '채널 추가하고 이 채널의 마케팅 메시지 등을 카카오톡으로 받기',
                            secure: 'none',
                            categoryMain: 'service',
                            categorySub: 'service-notice',
                            mainLink: null,
                            buttons: [],
                            quickLinks: [],
                            createdAt: '2026-04-14 09:00',
                            updatedAt: '2026-04-14 09:00'
                        }
                    ]
                }
            ],

            // 폼 (등록/수정)
            form: {
                name: '',
                code: '',
                kakaoCode: '',
                profileType: 'general',
                profileId: '',
                purpose: 'general',
                messageType: 'basic',
                emphasisType: 'none',
                content: '',
                extraInfo: '',
                channelMessage: '',
                secure: 'none',
                categoryMain: '',
                categorySub: '',
                mainLink: null,
                buttons: [],
                quickLinks: [],

                // 강조 표기형
                highlightTitle: '',
                highlightSubtitle: '',

                // 이미지형
                emphasisImage: { source: 'upload', fileName: '' },

                // 아이템 리스트형
                itemListImage: { source: 'upload', fileName: '' },
                itemListHeader: '',
                itemHighlight: { title: '', description: '', imageSource: 'select', fileName: '' },
                itemList: [],
                itemSummary: { name: '', content: '' }
            },
            editingTemplateId: null,
            editingCategoryId: null,

            // 모달 데이터
            addCategoryModal: { parentName: 'Root Category', parentId: null, name: '' },
            editCategoryModal: { id: '', name: '' },
            linkModal: { mobile: '', pc: '', android: '', ios: '' },
            buttonModal: { editingIdx: null, type: '', name: '' },
            quickModal: { editingIdx: null, type: '', name: '' },
            itemListModal: {
                items: [
                    { name: '', content: '' },
                    { name: '', content: '' }
                ],
                summary: { name: '', content: '' }
            },
            sampleModal: {
                activeTab: 'basic',          // 메시지 유형 탭 (basic/channel/extra/composite)
                emphasisFilter: 'all',       // 강조 유형 필터 (all/none/highlight/image/itemList)
                search: '',
                selectedId: null,
                page: 1,
                pageSize: 6
            },
            alertText: '',

            // 버튼/바로 연결 유형
            buttonTypes: [
                { value: 'web', label: '웹 링크' },
                { value: 'app', label: '앱 링크' },
                { value: 'delivery', label: '배송 조회' },
                { value: 'botKeyword', label: '봇 키워드' },
                { value: 'msgForward', label: '메시지 전달' },
                { value: 'consult', label: '상담톡 전환' },
                { value: 'botSwitch', label: '봇 전환' },
                { value: 'bizForm', label: '비즈니스폼' },
                { value: 'imgSecure', label: '이미지 보안 전송 플러그인' },
                { value: 'privacy', label: '개인정보 이용 플러그인' }
            ],
            quickTypes: [
                { value: 'web', label: '웹 링크' },
                { value: 'app', label: '앱 링크' },
                { value: 'botKeyword', label: '봇 키워드' },
                { value: 'consult', label: '상담톡 전환' },
                { value: 'botSwitch', label: '봇 전환' },
                { value: 'bizForm', label: '비즈니스폼' }
            ],

            // 샘플 템플릿
            sampleTemplates: [
                { id: 'smp-01', name: '회원가입 환영', messageType: 'basic', emphasisType: 'none', purpose: 'general',
                  content: '#{name}님, 가입을 환영합니다.\n쏠쏠과 함께 즐거운 활동을 시작해 보세요.', extraInfo: '', channelMessage: '',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-02', name: '결제 완료 안내', messageType: 'extra', emphasisType: 'none', purpose: 'general',
                  content: '결제가 완료되었습니다.\n주문번호: #{orderNo}', extraInfo: '주문 내역은 마이페이지에서 확인하실 수 있습니다.', channelMessage: '',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-03', name: '본인 인증 코드', messageType: 'basic', emphasisType: 'highlight', purpose: 'auth',
                  content: '아래 인증번호를 입력해 주세요.\n유효 시간: 3분', extraInfo: '', channelMessage: '',
                  highlightTitle: '#{code}', highlightSubtitle: '본인 인증 코드',
                  itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-04', name: '채널 추가 안내', messageType: 'channel', emphasisType: 'none', purpose: 'general',
                  content: '신규 채널이 오픈되었어요.\n채널을 추가하고 다양한 혜택을 받아보세요.', extraInfo: '', channelMessage: '채널 추가하고 이 채널의 마케팅 메시지 등을 카카오톡으로 받기',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-05', name: '예약 확정 안내', messageType: 'composite', emphasisType: 'none', purpose: 'general',
                  content: '#{name}님의 예약이 확정되었습니다.\n예약일: #{date}', extraInfo: '예약 변경은 마이페이지에서 가능합니다.', channelMessage: '채널 추가하고 이 채널의 마케팅 메시지 등을 카카오톡으로 받기',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-06', name: '신상품 출시 안내', messageType: 'basic', emphasisType: 'image', purpose: 'general',
                  content: '신상품이 출시되었습니다.\n지금 바로 확인해 보세요!', extraInfo: '', channelMessage: '',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-07', name: '주문 내역 확인', messageType: 'basic', emphasisType: 'itemList', purpose: 'general',
                  content: '#{name}님의 주문이 정상 접수되었습니다.', extraInfo: '', channelMessage: '',
                  highlightTitle: '주문 내역', highlightSubtitle: '#{orderNo}', itemListHeader: '주문 내역',
                  itemList: [
                    { name: '상품명', content: '#{productName}' },
                    { name: '수량', content: '#{qty}개' },
                    { name: '결제금액', content: '#{amount}원' }
                  ],
                  itemSummary: { name: '합계', content: '#{total}원' } },
                { id: 'smp-08', name: '출석 체크 알림', messageType: 'channel', emphasisType: 'highlight', purpose: 'general',
                  content: '오늘의 출석을 체크하고 보상을 받아보세요.', extraInfo: '', channelMessage: '채널 추가하고 이 채널의 마케팅 메시지 등을 카카오톡으로 받기',
                  highlightTitle: '#{day}일째', highlightSubtitle: '연속 출석 중!',
                  itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-09', name: '적립금 만료 안내', messageType: 'extra', emphasisType: 'image', purpose: 'general',
                  content: '#{name}님의 적립금 #{point}P가 곧 만료됩니다.', extraInfo: '만료 전 사용해 주세요. 만료된 적립금은 자동 소멸됩니다.', channelMessage: '',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '', itemList: [], itemSummary: { name: '', content: '' } },
                { id: 'smp-10', name: '이벤트 당첨 안내', messageType: 'composite', emphasisType: 'itemList', purpose: 'general',
                  content: '🎉 #{name}님, 이벤트 당첨을 축하드립니다!', extraInfo: '경품은 영업일 기준 3-5일 내 발송됩니다.', channelMessage: '채널 추가하고 이 채널의 마케팅 메시지 등을 카카오톡으로 받기',
                  highlightTitle: '', highlightSubtitle: '', itemListHeader: '당첨 정보',
                  itemList: [
                    { name: '경품명', content: '#{prize}' },
                    { name: '당첨일', content: '#{date}' }
                  ],
                  itemSummary: { name: '', content: '' } }
            ]
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                addCategory: new bootstrap.Modal(this.$refs.addCategoryModal),
                editCategory: new bootstrap.Modal(this.$refs.editCategoryModal),
                link: new bootstrap.Modal(this.$refs.linkModal),
                button: new bootstrap.Modal(this.$refs.buttonModal),
                quick: new bootstrap.Modal(this.$refs.quickModal),
                itemList: new bootstrap.Modal(this.$refs.itemListModal),
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
        filteredProfiles() {
            if (this.filter.profileType === 'all') return this.senderProfiles;
            return this.senderProfiles.filter(p => p.type === this.filter.profileType);
        },
        formProfiles() {
            return this.senderProfiles.filter(p => p.type === this.form.profileType);
        },
        formProfileName() {
            const p = this.senderProfiles.find(p => p.id === this.form.profileId);
            return p ? p.name : '';
        },
        categorySubList() {
            return this.categorySubMap[this.form.categoryMain] || [];
        },
        filteredCategories() {
            const q = this.activeSearch.trim().toLowerCase();
            const status = this.filter.status;
            const profileType = this.filter.profileType;
            const profileId = this.filter.profileId;

            const matchesFilter = (tpl) => {
                if (status !== 'all' && tpl.status !== status) return false;
                if (profileType !== 'all' && tpl.profileType !== profileType) return false;
                if (profileId && tpl.profileId !== profileId) return false;
                return true;
            };

            return this.categories
                .map(cat => {
                    const filtered = cat.templates.filter(matchesFilter);
                    if (!q) {
                        return { ...cat, templates: filtered };
                    }
                    const matchedTemplates = filtered.filter(t => t.name.toLowerCase().includes(q));
                    if (cat.name.toLowerCase().includes(q)) {
                        return { ...cat, expanded: true, templates: filtered };
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
            const emp = this.sampleModal.emphasisFilter;
            return this.sampleTemplates.filter(t => {
                if (t.messageType !== tab) return false;
                if (emp !== 'all' && t.emphasisType !== emp) return false;
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
        selectedSample() {
            return this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId) || null;
        }
    },

    methods: {
        makeEmptyForm() {
            return {
                name: '',
                code: '',
                kakaoCode: '',
                profileType: 'general',
                profileId: '',
                purpose: 'general',
                messageType: 'basic',
                emphasisType: 'none',
                content: '',
                extraInfo: '',
                channelMessage: '',
                secure: 'none',
                categoryMain: '',
                categorySub: '',
                mainLink: null,
                buttons: [],
                quickLinks: [],
                highlightTitle: '',
                highlightSubtitle: '',
                emphasisImage: { source: 'upload', fileName: '' },
                itemListImage: { source: 'upload', fileName: '' },
                itemListHeader: '',
                itemHighlight: { title: '', description: '', imageSource: 'select', fileName: '' },
                itemList: [],
                itemSummary: { name: '', content: '' }
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

        // ===== 라벨 =====
        purposeLabel(p) {
            return p === 'auth' ? '인증용' : '일반용';
        },
        messageTypeLabel(t) {
            const map = { basic: '기본형', channel: '채널 추가형', extra: '부가 정보형', composite: '복합형' };
            return map[t] || t;
        },
        emphasisLabel(e) {
            const map = { none: '선택 안함', highlight: '강조 표기형', image: '이미지형', itemList: '아이템 리스트형' };
            return map[e] || e;
        },
        statusLabel(s) {
            const map = { request: '요청', review: '검수 중', approved: '승인', rejected: '반려' };
            return map[s] || s;
        },
        profileTypeLabel(t) {
            return t === 'group' ? '그룹' : '일반';
        },
        profileNameById(id) {
            const p = this.senderProfiles.find(p => p.id === id);
            return p ? p.name : '';
        },
        buttonTypeLabel(v) {
            const t = this.buttonTypes.find(t => t.value === v);
            return t ? t.label : v;
        },
        quickTypeLabel(v) {
            const t = this.quickTypes.find(t => t.value === v);
            return t ? t.label : v;
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
            this.detailTab = 'basic';
        },

        // ===== 검색 =====
        onSearch() {
            this.activeSearch = this.searchKeyword;
        },

        // ===== 카테고리 추가/수정 =====
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

        // ===== 템플릿 등록/수정 진입 =====
        goRegister() {
            if (!this.canRegister) return;
            this.editingTemplateId = null;
            this.editingCategoryId = this.selectedCategoryId;
            this.form = this.makeEmptyForm();
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
                code: tpl.code || '',
                kakaoCode: tpl.kakaoCode || '',
                profileType: tpl.profileType || 'general',
                profileId: tpl.profileId || '',
                purpose: tpl.purpose || 'general',
                messageType: tpl.messageType || 'basic',
                emphasisType: tpl.emphasisType || 'none',
                content: tpl.content || '',
                extraInfo: tpl.extraInfo || '',
                channelMessage: tpl.channelMessage || '',
                secure: tpl.secure || 'none',
                categoryMain: tpl.categoryMain || '',
                categorySub: tpl.categorySub || '',
                mainLink: tpl.mainLink ? { ...tpl.mainLink } : null,
                buttons: (tpl.buttons || []).map(b => ({ ...b })),
                quickLinks: (tpl.quickLinks || []).map(q => ({ ...q })),
                highlightTitle: tpl.highlightTitle || '',
                highlightSubtitle: tpl.highlightSubtitle || '',
                emphasisImage: tpl.emphasisImage ? { ...tpl.emphasisImage } : { source: 'upload', fileName: '' },
                itemListImage: tpl.itemListImage ? { ...tpl.itemListImage } : { source: 'upload', fileName: '' },
                itemListHeader: tpl.itemListHeader || '',
                itemHighlight: tpl.itemHighlight ? { ...tpl.itemHighlight } : { title: '', description: '', imageSource: 'select', fileName: '' },
                itemList: (tpl.itemList || []).map(i => ({ ...i })),
                itemSummary: tpl.itemSummary ? { ...tpl.itemSummary } : { name: '', content: '' }
            };
            this.mode = 'edit';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        cancelForm() {
            this.mode = 'list';
            this.editingTemplateId = null;
            this.editingCategoryId = null;
        },

        onCategoryMainChange() {
            this.form.categorySub = '';
        },

        // ===== 대표 링크 =====
        openLinkModal() {
            const cur = this.form.mainLink || { mobile: '', pc: '', android: '', ios: '' };
            this.linkModal = { mobile: cur.mobile || '', pc: cur.pc || '', android: cur.android || '', ios: cur.ios || '' };
            this.showModal('link');
        },
        confirmLink() {
            const { mobile, pc, android, ios } = this.linkModal;
            if (!mobile && !pc && !android && !ios) {
                this.showAlert('하나 이상의 링크를 입력하세요.');
                return;
            }
            this.form.mainLink = { mobile, pc, android, ios };
            this.closeModal('link');
        },

        // ===== 버튼 =====
        openButtonModal(idx) {
            if (idx !== null && this.form.buttons[idx]) {
                const b = this.form.buttons[idx];
                this.buttonModal = { editingIdx: idx, type: b.type, name: b.name };
            } else {
                this.buttonModal = { editingIdx: null, type: '', name: '' };
            }
            this.showModal('button');
        },
        confirmButton() {
            if (!this.buttonModal.type) {
                this.showAlert('버튼 유형을 선택하세요.');
                return;
            }
            if (!this.buttonModal.name.trim()) {
                this.showAlert('버튼 이름을 입력하세요.');
                return;
            }
            const payload = { type: this.buttonModal.type, name: this.buttonModal.name.trim() };
            if (this.buttonModal.editingIdx === null) {
                this.form.buttons.push(payload);
            } else {
                this.form.buttons.splice(this.buttonModal.editingIdx, 1, payload);
            }
            this.closeModal('button');
        },

        // ===== 바로 연결 =====
        openQuickModal(idx) {
            if (idx !== null && this.form.quickLinks[idx]) {
                const q = this.form.quickLinks[idx];
                this.quickModal = { editingIdx: idx, type: q.type, name: q.name };
            } else {
                this.quickModal = { editingIdx: null, type: '', name: '' };
            }
            this.showModal('quick');
        },
        confirmQuick() {
            if (!this.quickModal.type) {
                this.showAlert('유형을 선택하세요.');
                return;
            }
            if (!this.quickModal.name.trim()) {
                this.showAlert('이름을 입력하세요.');
                return;
            }
            const payload = { type: this.quickModal.type, name: this.quickModal.name.trim() };
            if (this.quickModal.editingIdx === null) {
                this.form.quickLinks.push(payload);
            } else {
                this.form.quickLinks.splice(this.quickModal.editingIdx, 1, payload);
            }
            this.closeModal('quick');
        },

        // ===== 아이템 리스트 (강조 유형: 아이템 리스트형) =====
        openItemListModal() {
            if (this.form.itemList && this.form.itemList.length >= 2) {
                this.itemListModal.items = this.form.itemList.map(i => ({ ...i }));
            } else {
                this.itemListModal.items = [
                    { name: '', content: '' },
                    { name: '', content: '' }
                ];
            }
            this.itemListModal.summary = { ...(this.form.itemSummary || { name: '', content: '' }) };
            this.showModal('itemList');
        },
        addItem() {
            if (this.itemListModal.items.length >= 10) {
                this.showAlert('아이템 리스트는 최대 10개까지 입력 가능합니다.');
                return;
            }
            this.itemListModal.items.push({ name: '', content: '' });
        },
        removeItem(idx) {
            if (this.itemListModal.items.length <= 2) {
                this.showAlert('아이템 리스트는 최소 2개 입력해야 합니다.');
                return;
            }
            this.itemListModal.items.splice(idx, 1);
        },
        confirmItemList() {
            for (const item of this.itemListModal.items) {
                if (!item.name.trim() || !item.content.trim()) {
                    this.showAlert('모든 아이템의 이름과 내용을 입력하세요.');
                    return;
                }
            }
            this.form.itemList = this.itemListModal.items.map(i => ({ ...i }));
            this.form.itemSummary = { ...this.itemListModal.summary };
            this.closeModal('itemList');
        },

        // ===== 저장 =====
        saveTemplate() {
            if (!this.form.name.trim()) {
                this.showAlert('템플릿 이름을 입력하세요.');
                return;
            }
            if (!this.form.code.trim()) {
                this.showAlert('템플릿 코드를 입력하세요.');
                return;
            }
            if (!this.form.kakaoCode.trim()) {
                this.showAlert('카카오톡 템플릿 코드를 입력하세요.');
                return;
            }
            if (!this.form.profileId) {
                this.showAlert('발신 프로필을 선택하세요.');
                return;
            }
            if (!this.form.content.trim()) {
                this.showAlert('내용을 입력하세요.');
                return;
            }
            if ((this.form.messageType === 'extra' || this.form.messageType === 'composite') && !this.form.extraInfo.trim()) {
                this.showAlert('부가정보를 입력하세요.');
                return;
            }
            if ((this.form.messageType === 'channel' || this.form.messageType === 'composite') && !this.form.channelMessage.trim()) {
                this.showAlert('채널 추가 안내 메시지를 입력하세요.');
                return;
            }
            if (!this.form.categoryMain || !this.form.categorySub) {
                this.showAlert('카테고리(대분류/중분류)를 선택하세요.');
                return;
            }

            const now = this.formatNow();

            if (this.mode === 'register') {
                let cat = this.categories.find(c => c.id === this.editingCategoryId);
                if (!cat) cat = this.categories[0];
                const newId = this.generateId();
                cat.templates.push({
                    id: newId,
                    ...this.form,
                    status: 'request',
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
                        Object.assign(t, this.form);
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
                if (idx !== -1) this.categories.splice(idx, 1);
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
            this.sampleModal.emphasisFilter = 'all';
            // 등록/수정 모드에서는 폼의 messageType을 초기 탭으로
            if (this.mode !== 'list' && this.form.messageType) {
                this.sampleModal.activeTab = this.form.messageType;
            } else {
                this.sampleModal.activeTab = 'basic';
            }
            this.showModal('sample');
        },
        switchSampleTab(tab) {
            if (this.sampleModal.activeTab === tab) return;
            this.sampleModal.activeTab = tab;
            this.sampleModal.page = 1;
            this.sampleModal.selectedId = null;
        },
        switchSampleEmphasis(emp) {
            if (this.sampleModal.emphasisFilter === emp) return;
            this.sampleModal.emphasisFilter = emp;
            this.sampleModal.page = 1;
            this.sampleModal.selectedId = null;
        },
        onSampleCardClick(t) {
            this.sampleModal.selectedId = t.id;
        },
        confirmSample() {
            const tpl = this.selectedSample;
            if (!tpl) {
                this.showAlert('샘플 템플릿을 선택하세요.');
                return;
            }
            // list 모드에서 선택 시 등록 모드로 진입
            if (this.mode === 'list') {
                this.editingTemplateId = null;
                this.editingCategoryId = this.selectedCategoryId || (this.categories[0] && this.categories[0].id) || null;
                this.form = this.makeEmptyForm();
                this.mode = 'register';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            this.form.purpose = tpl.purpose;
            this.form.messageType = tpl.messageType;
            this.form.emphasisType = tpl.emphasisType;
            this.form.content = tpl.content;
            this.form.extraInfo = tpl.extraInfo || '';
            this.form.channelMessage = tpl.channelMessage || '';
            this.form.highlightTitle = tpl.highlightTitle || '';
            this.form.highlightSubtitle = tpl.highlightSubtitle || '';
            this.form.itemListHeader = tpl.itemListHeader || '';
            this.form.itemList = (tpl.itemList || []).map(i => ({ ...i }));
            this.form.itemSummary = tpl.itemSummary ? { ...tpl.itemSummary } : { name: '', content: '' };
            if (!this.form.name) this.form.name = tpl.name;
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
