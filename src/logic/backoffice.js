export default {
    name: 'BackOffice',
    layout: 'default',
    data() {
        return {
            keyword: '',
            roleFilter: '',
            collapsedSet: {}
        };
    },
    computed: {
        roleOptions() {
            return [
                { code: 'SUPER',    name: '슈퍼관리자',  desc: '전체 메뉴 / 시스템 설정 / 권한 변경' },
                { code: 'OPS',      name: '운영자',      desc: '발송/회원/고객사/콘텐츠 운영' },
                { code: 'REVIEWER', name: '검수자',      desc: '발신정보·템플릿 검수' },
                { code: 'FINANCE',  name: '회계',        desc: '결제/단가/매출/세금계산서' },
                { code: 'CS',       name: '고객지원',    desc: '1:1 문의/공지/FAQ 답변' },
                { code: 'SYSTEM',   name: '시스템',      desc: '외부연동/점검모드/감사로그' },
                { code: 'ALL',      name: 'ALL',        desc: '모든 운영자 공통 접근' }
            ];
        },
        categories() {
            const cats = this.menuData;
            return cats.map(c => ({ ...c, totalCount: c.items.length }));
        },
        totalCategories() {
            return this.categories.length;
        },
        totalMenus() {
            return this.categories.reduce((sum, c) => sum + c.items.length, 0);
        },
        totalRoutes() {
            return this.categories.reduce((sum, c) => sum + c.items.filter(i => i.route).length, 0);
        },
        filteredCategories() {
            const kw = this.keyword.trim().toLowerCase();
            const role = this.roleFilter;
            if (!kw && !role) return this.categories;

            const matches = (item) => {
                const okKw = !kw
                    || (item.name && item.name.toLowerCase().includes(kw))
                    || (item.route && item.route.toLowerCase().includes(kw))
                    || (item.description && item.description.toLowerCase().includes(kw))
                    || (item.code && item.code.toLowerCase().includes(kw));
                const okRole = !role || (item.roles && item.roles.includes(role));
                return okKw && okRole;
            };

            const result = [];
            for (const cat of this.categories) {
                if (cat.name.toLowerCase().includes(kw) && !role) {
                    result.push({ ...cat, totalCount: cat.items.length });
                    continue;
                }
                const items = cat.items.filter(matches);
                if (items.length > 0) {
                    result.push({ ...cat, items, totalCount: items.length });
                }
            }
            return result;
        },
        menuData() {
            return [
                {
                    id: 1,
                    name: '대시보드',
                    items: [
                        { code: '1.1', depth: 2, name: '운영 현황',          route: '/admin/dashboard/operation', roles: ['ALL'],            description: '실시간 발송/처리율/오류율 위젯' },
                        { code: '1.2', depth: 2, name: '매출/크레딧 현황',    route: '/admin/dashboard/revenue',   roles: ['FINANCE','OPS'],   description: '일/월/누적 매출, 크레딧 잔액 합계' },
                        { code: '1.3', depth: 2, name: '회원/고객사 현황',    route: '/admin/dashboard/members',   roles: ['OPS'],             description: '신규/활성/이탈, 고객사 증감' },
                        { code: '1.4', depth: 2, name: '시스템 상태',         route: '/admin/dashboard/system',    roles: ['SYSTEM'],          description: '외부 연동 헬스체크, 큐 적체' }
                    ]
                },
                {
                    id: 2,
                    name: '회원/고객사 관리',
                    items: [
                        { code: '2.1',   depth: 2, name: '고객사(기업) 관리',     route: '/admin/members/companies',                  roles: ['OPS'],            description: '' },
                        { code: '2.1.1', depth: 3, name: '고객사 목록',            route: '/admin/members/companies/list',             roles: ['OPS'],            description: '검색/필터/엑셀 다운로드' },
                        { code: '2.1.2', depth: 3, name: '고객사 상세/등록',       route: '/admin/members/companies/detail',           roles: ['OPS'],            description: 'CRUD, 담당자/발신정보/통계 탭' },
                        { code: '2.1.3', depth: 3, name: '고객사 사용 통계',       route: '/admin/members/companies/stats',            roles: ['OPS'],            description: '채널별 발송량, 매출' },
                        { code: '2.2',   depth: 2, name: '회원 계정 관리',         route: '/admin/members/users',                      roles: ['OPS'],            description: '' },
                        { code: '2.2.1', depth: 3, name: '회원 목록',              route: '/admin/members/users/list',                 roles: ['OPS'],            description: '회원 검색/필터' },
                        { code: '2.2.2', depth: 3, name: '회원 상세',              route: '/admin/members/users/detail',               roles: ['OPS'],            description: '정보/권한/이력 탭' },
                        { code: '2.2.3', depth: 3, name: '계정 상태 변경',         route: '/admin/members/users/status',               roles: ['OPS'],            description: '활성/정지/탈퇴' },
                        { code: '2.2.4', depth: 3, name: '비밀번호 초기화',        route: '/admin/members/users/reset-password',       roles: ['OPS'],            description: '운영자 권한 초기화' },
                        { code: '2.3',   depth: 2, name: '권한 그룹 관리',         route: '/admin/members/roles',                      roles: ['SYSTEM'],         description: '' },
                        { code: '2.3.1', depth: 3, name: '권한 그룹(역할) 목록',   route: '/admin/members/roles/list',                 roles: ['SYSTEM'],         description: '역할(롤) CRUD' },
                        { code: '2.3.2', depth: 3, name: '권한 매트릭스',          route: '/admin/members/roles/matrix',               roles: ['SYSTEM'],         description: '메뉴×권한 매트릭스' },
                        { code: '2.4',   depth: 2, name: '로그인 이력',            route: '/admin/members/login-logs',                 roles: ['OPS','SYSTEM'],   description: 'IP/디바이스/실패 이력' },
                        { code: '2.5',   depth: 2, name: '탈퇴 회원 관리',         route: '/admin/members/withdrawn',                  roles: ['OPS'],            description: '탈퇴 사유, 보존기간' }
                    ]
                },
                {
                    id: 3,
                    name: '발송 운영 모니터링',
                    items: [
                        { code: '3.1',   depth: 2, name: '통합 발송 모니터링',     route: '/admin/sending/monitor',           roles: ['OPS'], description: '' },
                        { code: '3.1.1', depth: 3, name: '실시간 발송 현황',       route: '/admin/sending/monitor/realtime',  roles: ['OPS'], description: '채널별 TPS, 워커 처리량' },
                        { code: '3.1.2', depth: 3, name: '발송 큐 / 처리율',        route: '/admin/sending/monitor/queue',     roles: ['OPS'], description: '큐 길이, 적체' },
                        { code: '3.1.3', depth: 3, name: '도달률/실패율',          route: '/admin/sending/monitor/delivery',  roles: ['OPS'], description: '채널별 KPI' },
                        { code: '3.2',   depth: 2, name: '채널별 발송 이력',       route: '/admin/sending/history',           roles: ['OPS'], description: '' },
                        { code: '3.2.1', depth: 3, name: 'SMS 발송 이력',          route: '/admin/sending/history/sms',       roles: ['OPS'], description: '검색/엑셀, 단건 재발송' },
                        { code: '3.2.2', depth: 3, name: '알림톡 발송 이력',       route: '/admin/sending/history/kakao',     roles: ['OPS'], description: '템플릿코드/대체발송 여부' },
                        { code: '3.2.3', depth: 3, name: 'RCS 발송 이력',          route: '/admin/sending/history/rcs',       roles: ['OPS'], description: '브랜드/포맷/응답코드' },
                        { code: '3.2.4', depth: 3, name: '이메일 발송 이력',       route: '/admin/sending/history/email',     roles: ['OPS'], description: '오픈/클릭/바운스 포함' },
                        { code: '3.2.5', depth: 3, name: 'PUSH 발송 이력',         route: '/admin/sending/history/push',      roles: ['OPS'], description: 'iOS/Android 분리 통계' },
                        { code: '3.3',   depth: 2, name: '캠페인 모니터링',        route: '/admin/sending/campaigns',         roles: ['OPS'], description: '진행/예약/완료 캠페인' },
                        { code: '3.4',   depth: 2, name: '플로우(복합) 모니터링', route: '/admin/sending/flows',             roles: ['OPS'], description: '노드 단위 진척률' },
                        { code: '3.5',   depth: 2, name: '실패 / 재처리 관리',     route: '/admin/sending/retry',             roles: ['OPS'], description: '일괄 재발송, 사유 입력' },
                        { code: '3.6',   depth: 2, name: '차단/스팸 메시지 관리', route: '/admin/sending/spam',              roles: ['OPS'], description: '' },
                        { code: '3.6.1', depth: 3, name: '키워드 필터',            route: '/admin/sending/spam/keywords',     roles: ['OPS'], description: '금칙어 룰, 우선순위' },
                        { code: '3.6.2', depth: 3, name: '스팸 신고 처리',         route: '/admin/sending/spam/reports',      roles: ['OPS'], description: '신고 → 차단/경고 워크플로우' }
                    ]
                },
                {
                    id: 4,
                    name: '발신 정보 검수 (없어도 될듯)',
                    items: [
                        { code: '4.1',   depth: 2, name: '발신번호 검수',                route: '/admin/sender/numbers',         roles: ['REVIEWER'], description: '' },
                        { code: '4.1.1', depth: 3, name: '신청 목록',                    route: '/admin/sender/numbers/list',    roles: ['REVIEWER'], description: '대기/승인/반려/보완요청' },
                        { code: '4.1.2', depth: 3, name: '승인/반려 처리',               route: '/admin/sender/numbers/review',  roles: ['REVIEWER'], description: '서류 뷰어, KISA 연동' },
                        { code: '4.2',   depth: 2, name: '도메인 검수(이메일)',          route: '/admin/sender/domains',         roles: ['REVIEWER'], description: '' },
                        { code: '4.2.1', depth: 3, name: '도메인 등록 검수',             route: '/admin/sender/domains/list',    roles: ['REVIEWER'], description: '도메인 소유 인증' },
                        { code: '4.2.2', depth: 3, name: 'DKIM/SPF 검증',                route: '/admin/sender/domains/dkim',    roles: ['REVIEWER'], description: 'DNS 레코드 검증' },
                        { code: '4.3',   depth: 2, name: '브랜드 검수(RCS)',             route: '/admin/sender/brands',          roles: ['REVIEWER'], description: '통신사 등록 요청' },
                        { code: '4.4',   depth: 2, name: '발신 프로필 검수(카카오)',    route: '/admin/sender/profiles',        roles: ['REVIEWER'], description: '카카오 비즈채널 매핑' },
                        { code: '4.5',   depth: 2, name: 'PUSH 인증서 검증',             route: '/admin/sender/push-cert',       roles: ['REVIEWER'], description: 'FCM/APNs 인증서, 만료 알림' },
                        { code: '4.6',   depth: 2, name: '080 수신거부번호 신청 처리',  route: '/admin/sender/optout-080',      roles: ['REVIEWER'], description: '회선 발급/회수' }
                    ]
                },
                {
                    id: 5,
                    name: '템플릿 검수/관리 (없어도 될듯)',
                    items: [
                        { code: '5.1',   depth: 2, name: '알림톡 템플릿 검수',          route: '/admin/templates/kakao-review', roles: ['REVIEWER'], description: '카카오 정책 검수, 양방향 연동' },
                        { code: '5.2',   depth: 2, name: 'RCS 템플릿 검수',              route: '/admin/templates/rcs-review',   roles: ['REVIEWER'], description: '통신사 정책 검수' },
                        { code: '5.3',   depth: 2, name: '광고성(080) 메시지 검수',      route: '/admin/templates/ad-review',    roles: ['REVIEWER'], description: '야간발송/수신동의 검증' },
                        { code: '5.4',   depth: 2, name: '샘플 템플릿 관리',             route: '/admin/templates/samples',      roles: ['OPS'],      description: '' },
                        { code: '5.4.1', depth: 3, name: 'SMS 샘플',                     route: '/admin/templates/samples/sms',  roles: ['OPS'],      description: 'SMS 샘플 CRUD' },
                        { code: '5.4.2', depth: 3, name: '알림톡 샘플',                  route: '/admin/templates/samples/kakao',roles: ['OPS'],      description: '알림톡 샘플 CRUD' },
                        { code: '5.4.3', depth: 3, name: 'RCS 샘플',                     route: '/admin/templates/samples/rcs',  roles: ['OPS'],      description: 'RCS 샘플 CRUD' },
                        { code: '5.4.4', depth: 3, name: '이메일 샘플',                  route: '/admin/templates/samples/email',roles: ['OPS'],      description: '이메일 샘플 CRUD' },
                        { code: '5.4.5', depth: 3, name: 'PUSH 샘플',                    route: '/admin/templates/samples/push', roles: ['OPS'],      description: 'PUSH 샘플 CRUD' },
                        { code: '5.5',   depth: 2, name: 'AI 템플릿 정책 관리',          route: '/admin/templates/ai',           roles: ['OPS'],      description: '' },
                        { code: '5.5.1', depth: 3, name: '프롬프트 정책',                route: '/admin/templates/ai/prompt',    roles: ['OPS'],      description: '시스템 프롬프트 버전 관리' },
                        { code: '5.5.2', depth: 3, name: '금칙어/필터',                  route: '/admin/templates/ai/filter',    roles: ['OPS'],      description: '출력 필터, 광고성 보정' },
                        { code: '5.5.3', depth: 3, name: '사용 한도',                    route: '/admin/templates/ai/limit',     roles: ['OPS'],      description: '회원당 일/월 호출 한도' }
                    ]
                },
                {
                    id: 6,
                    name: '결제/크레딧 관리',
                    items: [
                        { code: '6.1',   depth: 2, name: '충전 내역',               route: '/admin/billing/charges',           roles: ['FINANCE'], description: '결제수단/금액 검색' },
                        { code: '6.2',   depth: 2, name: '결제 내역(PG)',           route: '/admin/billing/payments',          roles: ['FINANCE'], description: 'PG 거래ID 추적' },
                        { code: '6.3',   depth: 2, name: '환불 처리',               route: '/admin/billing/refunds',           roles: ['FINANCE'], description: '' },
                        { code: '6.3.1', depth: 3, name: '환불 신청 목록',          route: '/admin/billing/refunds/list',      roles: ['FINANCE'], description: '신청 목록/상태' },
                        { code: '6.3.2', depth: 3, name: '환불 승인/반려',          route: '/admin/billing/refunds/review',    roles: ['FINANCE'], description: 'PG 부분취소 연동' },
                        { code: '6.4',   depth: 2, name: '크레딧 수동 충전/차감',   route: '/admin/billing/credit-adjust',     roles: ['FINANCE'], description: '사유 입력 + SUPER 결재' },
                        { code: '6.5',   depth: 2, name: '무료 크레딧 / 프로모션',  route: '/admin/billing/promotion',         roles: ['FINANCE'], description: '' },
                        { code: '6.5.1', depth: 3, name: '프로모션 코드',           route: '/admin/billing/promotion/code',    roles: ['FINANCE'], description: '코드 발급/유효기간' },
                        { code: '6.5.2', depth: 3, name: '일괄 지급',               route: '/admin/billing/promotion/grant',   roles: ['FINANCE'], description: 'CSV 업로드 일괄 지급' },
                        { code: '6.6',   depth: 2, name: '영수증/세금계산서',       route: '/admin/billing/receipts',          roles: ['FINANCE'], description: '발행/재발행' }
                    ]
                },
                {
                    id: 7,
                    name: '요금/단가 관리',
                    items: [
                        { code: '7.1',   depth: 2, name: '채널별 단가',            route: '/admin/pricing/channels',          roles: ['FINANCE','SUPER'], description: '' },
                        { code: '7.1.1', depth: 3, name: 'SMS 단가',               route: '/admin/pricing/channels/sms',      roles: ['FINANCE'],         description: 'SMS/LMS/MMS 분리' },
                        { code: '7.1.2', depth: 3, name: '알림톡 단가',            route: '/admin/pricing/channels/kakao',    roles: ['FINANCE'],         description: '알림톡/친구톡' },
                        { code: '7.1.3', depth: 3, name: 'RCS 단가',               route: '/admin/pricing/channels/rcs',      roles: ['FINANCE'],         description: '템플릿/이미지' },
                        { code: '7.1.4', depth: 3, name: '이메일 단가',            route: '/admin/pricing/channels/email',    roles: ['FINANCE'],         description: '이메일 단가' },
                        { code: '7.1.5', depth: 3, name: 'PUSH 단가',              route: '/admin/pricing/channels/push',     roles: ['FINANCE'],         description: 'OS별 단가' },
                        { code: '7.2',   depth: 2, name: '단가 정책',              route: '/admin/pricing/policy',            roles: ['FINANCE'],         description: '고객사별/플랜별 오버라이드' },
                        { code: '7.3',   depth: 2, name: '할인/쿠폰 정책',         route: '/admin/pricing/discount',          roles: ['FINANCE'],         description: '쿠폰 발급/회수' }
                    ]
                },
                {
                    id: 8,
                    name: '수신거부 (운영)',
                    items: [
                        { code: '8.1', depth: 2, name: '통합 수신거부 DB',         route: '/admin/optout/db',         roles: ['OPS'], description: '휴대폰/이메일/푸시 토큰 단위' },
                        { code: '8.2', depth: 2, name: '080 수신거부 통계',        route: '/admin/optout/stats-080',  roles: ['OPS'], description: '회선별/월별 추이' },
                        { code: '8.3', depth: 2, name: '수신거부 요청 처리',       route: '/admin/optout/requests',   roles: ['OPS'], description: '민원/요청 SLA 트래킹' }
                    ]
                },
                {
                    id: 9,
                    name: '고객 지원',
                    items: [
                        { code: '9.1',   depth: 2, name: '1:1 문의 관리',          route: '/admin/cs/inquiries',             roles: ['CS'],         description: '' },
                        { code: '9.1.1', depth: 3, name: '문의 목록',              route: '/admin/cs/inquiries/list',        roles: ['CS'],         description: '검색/상태/SLA' },
                        { code: '9.1.2', depth: 3, name: '답변/처리',              route: '/admin/cs/inquiries/reply',       roles: ['CS'],         description: '위지윅, 첨부, 답변 템플릿' },
                        { code: '9.1.3', depth: 3, name: '문의 카테고리 관리',     route: '/admin/cs/inquiries/categories',  roles: ['CS'],         description: '자동 라우팅' },
                        { code: '9.2',   depth: 2, name: 'FAQ 관리',               route: '/admin/cs/faq',                   roles: ['CS'],         description: '카테고리별 FAQ CRUD' },
                        { code: '9.3',   depth: 2, name: '공지사항 관리',          route: '/admin/cs/notice',                roles: ['CS','OPS'],   description: '팝업/배너 노출' },
                        { code: '9.4',   depth: 2, name: '운영 가이드 관리',       route: '/admin/cs/guide',                 roles: ['OPS'],        description: '도움말 콘텐츠 CRUD' },
                        { code: '9.5',   depth: 2, name: '다운로드 요청 관리',     route: '/admin/cs/downloads',             roles: ['CS'],         description: '비동기 요청 모니터링' }
                    ]
                },
                {
                    id: 10,
                    name: '콘텐츠/사이트 관리',
                    items: [
                        { code: '10.1',   depth: 2, name: '메인/랜딩 콘텐츠',       route: '/admin/content/landing',                          roles: ['OPS'],         description: '히어로/배너/CTA' },
                        { code: '10.2',   depth: 2, name: '약관 관리',              route: '/admin/content/terms',                            roles: ['OPS','SUPER'], description: '이용/개인정보/마케팅/스팸' },
                        { code: '10.3',   depth: 2, name: '시스템 메일 템플릿',     route: '/admin/content/mail-templates',                   roles: ['OPS'],         description: '' },
                        { code: '10.3.1', depth: 3, name: '인증 메일',              route: '/admin/content/mail-templates/verify',            roles: ['OPS'],         description: '회원가입 인증' },
                        { code: '10.3.2', depth: 3, name: '비밀번호 재설정',        route: '/admin/content/mail-templates/reset-password',    roles: ['OPS'],         description: '재설정 메일' },
                        { code: '10.4',   depth: 2, name: '점검/공지 페이지',       route: '/admin/content/inspection',                       roles: ['SYSTEM'],      description: '긴급/정기 점검 토글' }
                    ]
                },
                {
                    id: 11,
                    name: '통계/리포트',
                    items: [
                        { code: '11.1', depth: 2, name: '발송 통계',         route: '/admin/reports/sending',    roles: ['OPS'],            description: '채널별/기간별' },
                        { code: '11.2', depth: 2, name: '매출 리포트',       route: '/admin/reports/revenue',    roles: ['FINANCE'],        description: '일/월/연 매출' },
                        { code: '11.3', depth: 2, name: '회원/고객사 활동',  route: '/admin/reports/members',    roles: ['OPS'],            description: 'DAU/MAU, 코호트' },
                        { code: '11.4', depth: 2, name: '도달률/실패율 분석', route: '/admin/reports/delivery',  roles: ['OPS'],            description: '채널·통신사·시간대' },
                        { code: '11.5', depth: 2, name: '리포트 다운로드',   route: '/admin/reports/downloads',  roles: ['OPS','FINANCE'],  description: '비동기 다운로드 큐' }
                    ]
                },
                {
                    id: 12,
                    name: '시스템 관리',
                    items: [
                        { code: '12.1', depth: 2, name: '운영자 계정 관리',     route: '/admin/system/admins',         roles: ['SYSTEM','SUPER'], description: '운영자 CRUD, 2FA' },
                        { code: '12.2', depth: 2, name: '권한/역할 관리(RBAC)', route: '/admin/system/rbac',           roles: ['SUPER'],          description: '메뉴×액션 매트릭스' },
                        { code: '12.3', depth: 2, name: '감사 로그',            route: '/admin/system/audit',          roles: ['SYSTEM','SUPER'], description: '변경 이력 검색' },
                        { code: '12.4', depth: 2, name: '시스템 설정',          route: '/admin/system/config',         roles: ['SYSTEM'],         description: '글로벌 설정' },
                        { code: '12.5', depth: 2, name: '점검 모드 관리',       route: '/admin/system/maintenance',    roles: ['SYSTEM'],         description: '점검 모드 토글' },
                        { code: '12.6', depth: 2, name: '외부 연동 설정',       route: '/admin/system/integrations',   roles: ['SYSTEM'],         description: 'PG/문자사/카카오/FCM/APNs' }
                    ]
                },
                {
                    id: 13,
                    name: 'API 관리',
                    items: [
                        { code: '13.1', depth: 2, name: 'API 키 발급/관리',          route: '/admin/api/keys',     roles: ['SYSTEM'],     description: '고객사별 키, 스코프' },
                        { code: '13.2', depth: 2, name: 'API 사용량 모니터링',       route: '/admin/api/usage',    roles: ['OPS'],        description: '호출량/에러율' },
                        { code: '13.3', depth: 2, name: 'Rate Limit / IP 화이트리스트', route: '/admin/api/limits',roles: ['SYSTEM'],     description: 'RPS/RPM, IP 정책' },
                        { code: '13.4', depth: 2, name: 'Webhook 설정/이력',         route: '/admin/api/webhooks', roles: ['SYSTEM'],     description: '콜백 URL, 재시도' }
                    ]
                }
            ];
        }
    },
    methods: {
        isCollapsed(catId) {
            return !!this.collapsedSet[catId];
        },
        toggleCategory(catId) {
            this.collapsedSet = { ...this.collapsedSet, [catId]: !this.collapsedSet[catId] };
        },
        expandAll() {
            this.collapsedSet = {};
        },
        collapseAll() {
            const map = {};
            for (const cat of this.categories) map[cat.id] = true;
            this.collapsedSet = map;
        },
        hasChildren(items, idx) {
            const cur = items[idx];
            const next = items[idx + 1];
            if (!next) return false;
            return next.depth > cur.depth;
        },
        getRoleName(code) {
            const role = this.roleOptions.find(r => r.code === code);
            return role ? role.name : code;
        },
        isHighlight(item) {
            const kw = this.keyword.trim().toLowerCase();
            if (!kw) return false;
            return (item.name && item.name.toLowerCase().includes(kw))
                || (item.route && item.route.toLowerCase().includes(kw))
                || (item.description && item.description.toLowerCase().includes(kw));
        },
        highlight(text) {
            if (!text) return '';
            const kw = this.keyword.trim();
            if (!kw) return this.escapeHtml(text);
            const safeText = this.escapeHtml(text);
            const safeKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp('(' + safeKw + ')', 'gi');
            return safeText.replace(re, '<mark>$1</mark>');
        },
        escapeHtml(text) {
            return String(text)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        },
        jumpToCategory(catId) {
            this.collapsedSet = { ...this.collapsedSet, [catId]: false };
            this.$nextTick(() => {
                const el = document.getElementById('cat-' + catId);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        }
    }
};
