// 브랜드 로고 SVG 데이터 URI 생성 (서비스 로고 이미지처럼 표시)
function brandLogo(name, icon, iconBg, accent = '#1f2937', shape = 'rounded') {
    const radius = shape === 'circle' ? 18 : 9;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="48" viewBox="0 0 240 48">
        <rect x="0" y="6" width="36" height="36" rx="${radius}" fill="${iconBg}"/>
        <text x="18" y="32" font-family="-apple-system,BlinkMacSystemFont,'Noto Sans KR',sans-serif" font-weight="800" font-size="18" fill="#fff" text-anchor="middle">${icon}</text>
        <text x="48" y="33" font-family="-apple-system,BlinkMacSystemFont,'Noto Sans KR',sans-serif" font-weight="800" font-size="20" fill="${accent}" letter-spacing="-0.6">${name}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export default {
    name: 'ManageLandingPage',
    layout: 'default',

    directives: {
        'click-outside': {
            beforeMount(el, binding) {
                el._clickOutsideHandler = (event) => {
                    if (!(el === event.target || el.contains(event.target))) {
                        binding.value(event);
                    }
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
            mode: 'list', // 'list' | 'register' | 'edit'
            formMode: 'basic', // 'basic' | 'extended'
            editingId: null,

            // 목록 상태
            searchKeyword: '',
            filterPublic: 'all',
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            registerMenuOpen: false,

            // 예제 랜딩페이지
            landingPages: [
                {
                    id: 'lp-001',
                    name: '2026 SS 컬렉션 사전 예약 안내',
                    description: '봄·여름 신상품 사전 예약 고객 대상 10% 할인 + 무료 배송 안내',
                    isPublic: true,
                    mode: 'basic',
                    publishedAt: '2026.04.21 오후 02:30',
                    admin: { name: '김도형', id: 'djkim' },
                    brand: '봄결&CO.',
                    brandLogo: brandLogo('봄결&CO.', '봄', '#ec4899', '#831843', 'circle'),
                    headImage: 'https://placehold.co/1200x420/ffd6e0/4b2540?text=2026+SS+Collection',
                    headline: '봄, 가장 먼저 입어보는 사람들',
                    subtitle: '2026 SS 컬렉션 사전 예약 · 4월 30일까지 한정',
                    content: '🌸 한 해의 시작을 가장 부드럽게\n\n매년 봄에만 선보이는 한정 라인업, 봄결&CO.의 2026 SS 컬렉션이 공개되었습니다.\n파스텔 톤의 컬러 팔레트와 가벼운 리넨·코튼 소재로 새 계절을 가볍게 시작해 보세요.\n\n【 사전 예약 혜택 】\n• 정상가 대비 10% 할인 적용\n• 전 상품 무료 배송 + 무료 반품\n• 인기 컬러 컬러칩 무료 증정 (선착순 500명)\n• 4월 28일~30일 매장 단독 1:1 스타일 컨설팅 예약\n\n인기 컬러는 빠르게 품절될 수 있으니, 원하시는 사이즈와 컬러가 있다면 지금 바로 예약해 주세요.',
                    textAlign: 'center',
                    visualImage: '',
                    cta: { text: '지금 사전 예약하기', linkType: 'main', linkUrl: '', bgColor: '#00A3FF', textColor: '#FFFFFF' },
                    url: 'https://lp.malgn.so/p/abcd1234'
                },
                {
                    id: 'lp-002',
                    name: '맑은 메시징 신규 회원 웰컴 패키지',
                    description: '신규 가입 고객 대상 30일 무료 체험 + 1만원 크레딧 안내',
                    isPublic: true,
                    mode: 'extended',
                    publishedAt: '2026.04.18 오전 11:20',
                    admin: { name: '이수민', id: 'sumini' },
                    brand: '맑은 메시징',
                    brandLogo: brandLogo('맑은 메시징', 'M', '#027CFA', '#0f172a'),
                    headImage: 'https://placehold.co/1200x420/dbeafe/1e3a8a?text=Welcome+Package',
                    headline: '환영합니다, 첫 메시지를 보내드릴게요',
                    subtitle: '신규 회원 전용 30일 무료 체험 · 가입 즉시 1만 크레딧 지급',
                    content: '맑은 메시징에 오신 것을 환영합니다.\nSMS·알림톡·RCS·이메일·PUSH까지, 하나의 콘솔에서 통합 발송하세요.\n\n【 웰컴 패키지에 포함된 혜택 】\n01. 가입 즉시 발송 가능한 1만 원 상당의 무료 크레딧\n02. 모든 채널 30일 무제한 무료 체험\n03. 발신번호·발신 프로필 등록 우선 처리 (영업일 1일 이내)\n04. 첫 캠페인 무료 1:1 셋업 컨설팅 (30분)\n\n【 가장 많은 분들이 시작하는 흐름 】\n주소록 업로드 → 발신 프로필 등록 → 첫 알림톡 발송까지 평균 12분.\n복잡한 API 연동 없이도, 바로 시작할 수 있습니다.\n\n무료 체험 기간 중 자동 결제는 발생하지 않으며, 종료일 3일 전 알림이 전송됩니다.',
                    textAlign: 'center',
                    visualImage: '/images/landing/dashboard-analytics.svg',
                    cta: { text: '무료로 시작하기', linkType: 'custom', linkUrl: 'https://malgn.so/welcome', bgColor: '#027CFA', textColor: '#FFFFFF' },
                    url: 'https://lp.malgn.so/p/efgh5678'
                },
                {
                    id: 'lp-003',
                    name: '봄맞이 빅세일 · 전 상품 최대 50%',
                    description: '4월 한정 봄맞이 결산 프로모션 안내',
                    isPublic: true,
                    mode: 'basic',
                    publishedAt: '2026.04.10 오후 05:45',
                    admin: { name: '박지훈', id: 'jhpark' },
                    brand: 'LIVELY SHOP',
                    brandLogo: brandLogo('LIVELY SHOP', 'L', '#f59e0b', '#78350f'),
                    headImage: 'https://placehold.co/1200x420/fef3c7/92400e?text=BIG+SALE+UP+TO+50%25',
                    headline: '4월, 한 해 중 가장 큰 세일',
                    subtitle: '전 상품 최대 50% · 4월 30일 자정 종료',
                    content: '🛒 1년에 단 한 번, 봄맞이 빅세일\n\n4월 한 달 동안 LIVELY SHOP의 전 상품을 최대 50% 할인된 가격으로 만나보세요.\n베스트셀러 카테고리는 단 3일간 추가 10% 쿠폰이 적용됩니다.\n\n【 이번 세일의 추천 카테고리 】\n• 봄 의류 — 최대 50% 할인\n• 홈 인테리어 — 최대 40% 할인\n• 뷰티 베스트 — 1+1 또는 30% 할인\n• 캠핑·아웃도어 — 신상 입고 + 20% 즉시 할인\n\n【 함께 확인하세요 】\n· 5만 원 이상 구매 시 무료 배송\n· 회원 등급별 추가 적립금 최대 5%\n· 모바일 앱 구매 시 즉시 사용 가능한 1,000원 쿠폰\n\n인기 상품은 빠르게 품절될 수 있으니 미리 장바구니에 담아 두세요.',
                    textAlign: 'center',
                    visualImage: '',
                    cta: { text: '세일 상품 보러가기', linkType: 'main', linkUrl: '', bgColor: '#F97316', textColor: '#FFFFFF' },
                    url: 'https://lp.malgn.so/p/ijkl9012'
                },
                {
                    id: 'lp-004',
                    name: '비디오팩 2.0 브랜드 리뉴얼 사전 안내',
                    description: '비디오팩 2.0 출시 사전 안내 (작업중 · 비공개)',
                    isPublic: false,
                    mode: 'extended',
                    publishedAt: '2026.04.05 오전 09:10',
                    admin: { name: '최민지', id: 'mjchoi' },
                    brand: '위캔디오',
                    brandLogo: brandLogo('위캔디오', '▶', '#6366f1', '#312e81'),
                    headImage: 'https://placehold.co/1200x420/ede9fe/4c1d95?text=Wecandeo+2.0+is+Coming',
                    headline: '비디오팩이 새로워집니다',
                    subtitle: '2026년 5월, 비디오팩 2.0으로 다시 만나요',
                    content: '4년 만의 큰 변화. 더 빠른 인코딩, 더 안정적인 스트리밍, 더 단단한 보안.\n비디오팩 2.0은 크리에이터와 미디어 기업이 동시에 사용할 수 있는 단 하나의 플랫폼을 지향합니다.\n\n【 새롭게 바뀌는 것들 】\n• 인코딩 처리 속도 평균 2.3배 향상\n• 글로벌 CDN 12개 거점으로 확장 (아시아 · 북미 · EU)\n• DRM·워터마킹·도메인 잠금 통합 보안 모듈\n• 새 대시보드 — 실시간 시청률·이탈 구간 분석 기본 제공\n• 외부 LMS·CMS와 연동되는 신규 Webhook & API\n\n【 기존 고객을 위한 마이그레이션 】\n· 기존 콘텐츠는 자동으로 2.0 환경으로 이전됩니다\n· 마이그레이션 기간 중 무중단 운영 보장\n· 별도 추가 비용 없이 동일 플랜으로 자동 전환\n\n사전 알림을 신청하시면 5월 정식 출시 전 한정 베타 초대장을 가장 먼저 보내드립니다.',
                    textAlign: 'left',
                    visualImage: '/images/landing/dashboard-video.svg',
                    cta: { text: '사전 알림 신청하기', linkType: 'main', linkUrl: '', bgColor: '#6756ED', textColor: '#FFFFFF' },
                    url: 'https://lp.malgn.so/p/mnop3456'
                },
                {
                    id: 'lp-005',
                    name: 'VIP 고객 감사 사은품 신청',
                    description: 'VIP 등급 고객 대상 한정 사은품 신청 페이지 (비공개)',
                    isPublic: false,
                    mode: 'basic',
                    publishedAt: '2026.03.28 오후 04:00',
                    admin: { name: '정현우', id: 'hwjung' },
                    brand: '맑은 클럽',
                    brandLogo: brandLogo('맑은 클럽', '★', '#fbbf24', '#78350f', 'circle'),
                    headImage: 'https://placehold.co/1200x420/fef9c3/713f12?text=THANK+YOU+VIP',
                    headline: '늘 함께해 주셔서 감사합니다',
                    subtitle: '2026 VIP 한정 감사 사은품 신청 (~5월 10일)',
                    content: '🎁 VIP 고객님께만 드리는 특별한 한 상자\n\n지난 한 해 동안 보내주신 변함없는 사랑에 진심으로 감사드립니다.\n맑은 클럽에서는 누적 구매 금액 상위 5%의 VIP 고객님께 감사의 마음을 담은 한정 사은품을 준비했습니다.\n\n【 사은품 구성 】\n• 시즌 한정 머그컵 (디자인 2종 중 1택)\n• 프리미엄 핸드크림 70ml\n• 차 4종 시그니처 세트\n• 맑은 클럽 굿즈 키링 (시리얼 넘버 각인)\n\n【 신청 방법 】\n· 신청 기간: 2026년 5월 10일 23:59까지\n· 등록 주소로 5월 셋째 주 순차 발송\n· 발송 현황은 SMS·알림톡으로 안내드립니다\n\n사은품 수량은 한정되어 있으며, 한 분당 1세트만 신청 가능합니다.',
                    textAlign: 'center',
                    visualImage: '',
                    cta: { text: '사은품 신청하기', linkType: 'custom', linkUrl: 'https://malgn.so/vip', bgColor: '#10B981', textColor: '#FFFFFF' },
                    url: 'https://lp.malgn.so/p/qrst7890'
                },
                {
                    id: 'lp-006',
                    name: '2025 연말 결산 · 한 해 동안의 우리',
                    description: '2025 연말 결산 사은 이벤트 — 누적 사용량 리포트 + 사은품',
                    isPublic: true,
                    mode: 'extended',
                    publishedAt: '2026.03.15 오전 10:25',
                    admin: { name: '한소영', id: 'syhan' },
                    brand: '맑은 메시징',
                    brandLogo: brandLogo('맑은 메시징', 'M', '#0891b2', '#0f172a'),
                    headImage: 'https://placehold.co/1200x420/cffafe/155e75?text=2025+Year+in+Review',
                    headline: '2025년, 함께 보낸 메시지 약 2.4억 건',
                    subtitle: '올 한 해 보내주신 신뢰에 작은 보답을 준비했습니다',
                    content: '안녕하세요, 맑은 메시징입니다.\n2025년 한 해 동안 맑은 메시징과 함께해 주신 모든 고객님께 감사 인사를 전합니다.\n\n【 2025년, 우리는 이렇게 보냈습니다 】\n• 누적 발송 약 2.4억 건 (전년 대비 +38%)\n• 평균 도달률 99.4% / 평균 발송 지연 0.8초\n• 11월에는 단일 캠페인 최대 920만 건 동시 처리 안정 운영\n\n【 감사 이벤트 】\n01. 2026년 1분기 청구 금액 5% 자동 할인 적용\n02. 추첨을 통해 100명에게 \'2026 메시징 굿즈 박스\' 발송\n03. 신규 기능 베타 우선 초대 (AI 템플릿 / 캠페인 플로우)\n\n【 다음 한 해, 우리가 준비하는 것 】\n· 캠페인 자동화 — 조건 분기·재발송 룰 기본 내장\n· 글로벌 발송 — 일본·동남아 SMS·왓츠앱 통합\n· 상세 리포트 — 채널별 ROI 계산기 기본 제공\n\n한 해 동안 보내주신 신뢰에 다시 한번 감사드리며, 2026년에도 더 단단하게 함께하겠습니다.',
                    textAlign: 'left',
                    visualImage: '/images/landing/dashboard-yearreview.svg',
                    cta: { text: '내 2025 리포트 받기', linkType: 'main', linkUrl: '', bgColor: '#027CFA', textColor: '#FFFFFF' },
                    url: 'https://lp.malgn.so/p/uvwx1234'
                }
            ],

            // 폼 (등록/수정)
            form: this.createEmptyForm(),

            // 모달 상태
            previewData: {},
            pendingDeleteIds: [],
            alertText: '',
            alertUrl: ''
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                preview: new bootstrap.Modal(this.$refs.previewModal),
                delete: new bootstrap.Modal(this.$refs.deleteModal),
                alert: new bootstrap.Modal(this.$refs.alertModal)
            };
            window.openPopupFromQuery && window.openPopupFromQuery(this);
        });
    },

    computed: {
        filteredRows() {
            const kw = (this.searchKeyword || '').trim().toLowerCase();
            return this.landingPages.filter(row => {
                if (this.filterPublic === 'public' && !row.isPublic) return false;
                if (this.filterPublic === 'private' && row.isPublic) return false;
                if (kw && !row.name.toLowerCase().includes(kw)) return false;
                return true;
            });
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize));
        },
        pagedRows() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.filteredRows.slice(start, start + this.pageSize);
        },
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedIds.includes(r.id));
        },
        generatedUrl() {
            if (this.editingId) {
                const found = this.landingPages.find(p => p.id === this.editingId);
                if (found && found.url) return found.url;
            }
            return 'https://lp.malgn.so/p/' + this.randomKey();
        },
        previewBlocks() {
            const raw = (this.previewData && this.previewData.content) || '';
            if (!raw.trim()) return [];

            const blocks = [];
            const paragraphs = raw.split(/\n\s*\n/);

            paragraphs.forEach(para => {
                const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
                if (lines.length === 0) return;

                // 【 ... 】 헤더 + 뒤따르는 라인들이 모두 항목이면 list 블록으로 묶기
                const headerMatch = lines[0].match(/^【\s*(.+?)\s*】$/);
                if (headerMatch && lines.length > 1) {
                    const items = lines.slice(1)
                        .map(line => {
                            const m = line.match(/^(?:•|▶|·|\d{1,2}[.)])\s*(.+)$/);
                            return m ? m[1] : line;
                        });
                    blocks.push({ type: 'section', title: headerMatch[1], items });
                    return;
                }
                if (headerMatch) {
                    blocks.push({ type: 'section-title', text: headerMatch[1] });
                    return;
                }

                // 첫 줄이 이모지로 시작하면 콜아웃
                if (/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(lines[0])) {
                    blocks.push({ type: 'callout', text: lines.join('\n') });
                    return;
                }

                // 일반 본문
                blocks.push({ type: 'paragraph', text: lines.join('\n') });
            });

            return blocks;
        }
    },

    watch: {
        filteredRows() {
            if (this.currentPage > this.totalPages) this.currentPage = 1;
        }
    },

    methods: {
        createEmptyForm() {
            return {
                isPublic: true,
                name: '',
                description: '',
                brand: 'DJ테크트리',
                headImage: '',
                headline: '',
                subtitle: '',
                textAlign: 'left',
                visualImage: '',
                content: '',
                cta: { text: '', linkType: 'custom', linkUrl: '', bgColor: '#00A3FF', textColor: '#FFFFFF' }
            };
        },
        randomKey() {
            return Math.random().toString(36).slice(2, 10);
        },

        // ===== 목록 =====
        onSearch() {
            this.currentPage = 1;
        },
        toggleAllRows(event) {
            const checked = event.target.checked;
            const ids = this.pagedRows.map(r => r.id);
            if (checked) {
                ids.forEach(id => { if (!this.selectedIds.includes(id)) this.selectedIds.push(id); });
            } else {
                this.selectedIds = this.selectedIds.filter(id => !ids.includes(id));
            }
        },
        closeRegisterMenu() {
            this.registerMenuOpen = false;
        },
        goRegister(formMode) {
            this.registerMenuOpen = false;
            this.formMode = formMode;
            this.editingId = null;
            this.form = this.createEmptyForm();
            this.mode = 'register';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        copySelected() {
            if (this.selectedIds.length === 0) return;
            const cloned = [];
            this.selectedIds.forEach(id => {
                const found = this.landingPages.find(p => p.id === id);
                if (!found) return;
                const copy = JSON.parse(JSON.stringify(found));
                copy.id = 'lp-' + this.randomKey();
                copy.name = found.name + ' (복사본)';
                copy.url = 'https://lp.malgn.so/p/' + this.randomKey();
                copy.publishedAt = this.nowLabel();
                cloned.push(copy);
            });
            this.landingPages = [...cloned, ...this.landingPages];
            this.selectedIds = [];
            this.showAlert('선택한 랜딩페이지를 복사했습니다.');
        },
        openDeleteConfirm() {
            if (this.selectedIds.length === 0) return;
            this.pendingDeleteIds = [...this.selectedIds];
            this.modals.delete.show();
        },
        confirmDelete() {
            this.landingPages = this.landingPages.filter(p => !this.pendingDeleteIds.includes(p.id));
            this.selectedIds = this.selectedIds.filter(id => !this.pendingDeleteIds.includes(id));
            this.pendingDeleteIds = [];
            this.closeModal('delete');
            this.showAlert('선택한 랜딩페이지를 삭제했습니다.');
        },
        copyUrl(row) {
            if (!row.url) return;
            const tryCopy = async () => {
                await this.copyToClipboard(row.url);
                this.showAlert('랜딩페이지 URL이 복사되었습니다.', row.url);
            };
            tryCopy();
        },
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
            } catch (e) {
                const tmp = document.createElement('textarea');
                tmp.value = text;
                document.body.appendChild(tmp);
                tmp.select();
                document.execCommand('copy');
                document.body.removeChild(tmp);
            }
        },
        recopyAlertUrl() {
            if (!this.alertUrl) return;
            this.copyToClipboard(this.alertUrl);
        },
        openPreviewById(id) {
            const row = this.landingPages.find(p => p.id === id);
            if (!row) return;
            this.previewData = {
                mode: row.mode,
                brand: row.brand,
                brandLogo: row.brandLogo,
                textAlign: row.textAlign,
                headImage: row.headImage,
                headline: row.headline,
                subtitle: row.subtitle,
                content: row.content,
                visualImage: row.visualImage,
                cta: row.cta
            };
            this.modals.preview.show();
        },

        // ===== 폼 =====
        triggerHeadImage() {
            this.$refs.headImageInput && this.$refs.headImageInput.click();
        },
        onHeadImageSelected(e) {
            const f = e.target.files && e.target.files[0];
            this.readImage(f, dataUrl => { this.form.headImage = dataUrl; });
        },
        onHeadImageDrop(e) {
            const f = e.dataTransfer.files && e.dataTransfer.files[0];
            this.readImage(f, dataUrl => { this.form.headImage = dataUrl; });
        },
        triggerVisualImage() {
            this.$refs.visualImageInput && this.$refs.visualImageInput.click();
        },
        onVisualImageSelected(e) {
            const f = e.target.files && e.target.files[0];
            this.readImage(f, dataUrl => { this.form.visualImage = dataUrl; });
        },
        onVisualImageDrop(e) {
            const f = e.dataTransfer.files && e.dataTransfer.files[0];
            this.readImage(f, dataUrl => { this.form.visualImage = dataUrl; });
        },
        readImage(file, cb) {
            if (!file || !file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = () => cb(reader.result);
            reader.readAsDataURL(file);
        },
        openPreviewForForm() {
            this.previewData = {
                mode: this.formMode,
                brand: this.form.brand || 'DJ테크트리',
                brandLogo: this.form.brandLogo || '',
                textAlign: this.form.textAlign,
                headImage: this.form.headImage,
                headline: this.form.headline,
                subtitle: this.form.subtitle,
                content: this.form.content,
                visualImage: this.form.visualImage,
                cta: this.form.cta
            };
            this.modals.preview.show();
        },
        saveLandingPage() {
            if (!this.form.name.trim()) {
                this.showAlert('랜딩페이지명을 입력해 주세요.');
                return;
            }
            if (!this.form.headline.trim()) {
                this.showAlert('메인 헤드라인을 입력해 주세요.');
                return;
            }
            if (!this.form.content.trim()) {
                this.showAlert('본문 내용을 입력해 주세요.');
                return;
            }

            const url = this.generatedUrl;
            const payload = {
                ...JSON.parse(JSON.stringify(this.form)),
                mode: this.formMode,
                publishedAt: this.nowLabel(),
                admin: { name: '김도형', id: 'djkim' },
                url
            };

            if (this.editingId) {
                const idx = this.landingPages.findIndex(p => p.id === this.editingId);
                if (idx >= 0) this.landingPages.splice(idx, 1, { ...this.landingPages[idx], ...payload });
            } else {
                payload.id = 'lp-' + this.randomKey();
                this.landingPages = [payload, ...this.landingPages];
            }

            this.mode = 'list';
            this.editingId = null;
            this.form = this.createEmptyForm();
            this.showAlert('랜딩페이지가 저장되었습니다.');
        },
        cancelForm() {
            this.mode = 'list';
            this.editingId = null;
            this.form = this.createEmptyForm();
        },

        // ===== 유틸 =====
        nowLabel() {
            const d = new Date();
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const h = d.getHours();
            const min = String(d.getMinutes()).padStart(2, '0');
            const ampm = h < 12 ? '오전' : '오후';
            const h12 = String((h % 12) || 12).padStart(2, '0');
            return `${y}.${m}.${day} ${ampm} ${h12}:${min}`;
        },
        closeModal(key) {
            if (this.modals && this.modals[key]) this.modals[key].hide();
        },
        showAlert(text, url = '') {
            this.alertText = text;
            this.alertUrl = url;
            this.modals.alert.show();
        }
    }
};
