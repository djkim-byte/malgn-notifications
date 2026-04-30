export default {
    name: 'ManageRcsTemplate',
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
            mode: 'list', // 'list' | 'register' | 'edit'

            // 트리 상태
            rootExpanded: true,
            searchKeyword: '',
            activeSearch: '',

            selectedType: null, // 'root' | 'category' | 'template' | null
            selectedCategoryId: null,
            selectedTemplateId: null,

            // 발신 브랜드 드롭다운
            brandOpen: false,
            brandSearch: '',

            // 발신 브랜드 목록 (목)
            brands: [
                { id: 'wcd', name: '위캔디오', numbers: ['16447143', '15881234'] },
                { id: 'malgn', name: '맑은소프트', numbers: ['15881234'] },
                { id: 'solsol', name: '쏠쏠', numbers: ['16881234'] }
            ],

            optout080Numbers: ['080-123-4567', '080-987-6543'],

            // 카테고리/템플릿 데이터
            categories: [
                {
                    id: 'uFu6iHB3',
                    name: '비디오팩_상품개설',
                    expanded: true,
                    templates: [
                        {
                            id: 'rk7SpbwY',
                            name: '01_비디오팩생성',
                            bizcenterId: 'LBR.4wb1ika561-87DIa83M00ZR3GiE8gle4cyR2',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'LMS',
                            messageFormat: 'format',
                            messageSubType: 'basic',
                            title: '',
                            content: '위캔디오\n비디오팩 준비 완료 🎉\n#{name}님, 비디오팩을 시작할 준비가 끝났어요.\n바로 "첫 재생"까지 가는 가장 쉬운 3단계만 안내드릴게요.\n\n1. 영상 업로드\n2. 인코딩 요청\n3. 재생 링크/임베드 복사\n\n▶ 아래 버튼에서 시작 가이드를 확인해 주세요.\n궁금한 점은 문의로 남겨주세요.\n\n※ 본 메시지는 위캔디오에서 플랜 신청 후 상품이 생성된 고객에게 발송되는 이용 시작 안내입니다.',
                            buttons: [
                                { type: 'url', name: '시작 가이드', value: 'https://support.wecandeo.com/start' },
                                { type: 'url', name: '문의하기', value: 'https://support.wecandeo.com/contact' }
                            ],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-03-29 10:00',
                            updatedAt: '2026-03-30 15:13',
                            approvedAt: '2026-03-30 15:13'
                        },
                        {
                            id: 'a7Bk2QnL',
                            name: '02-1_비디오팩생성2일경과_upload_N',
                            bizcenterId: 'LBR.5xc2jlb672-98EJb94N11AS4HjF9hmf5dzS3',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 비디오팩 첫 영상 업로드를 아직 진행하지 않으셨어요.\n지금 바로 시작해 보세요.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-03-29 10:30',
                            updatedAt: '2026-03-29 10:30',
                            approvedAt: '2026-03-30 15:20'
                        },
                        {
                            id: 'b8Cl3RoM',
                            name: '02-2_비디오팩생성2일경과_upload_Y',
                            bizcenterId: 'LBR.6yd3kmc783-09FKc05O22BT5IkG0inh6eaT4',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 첫 영상 업로드 감사합니다. 인코딩이 완료되면 알려드릴게요.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-03-29 10:35',
                            updatedAt: '2026-03-29 10:35',
                            approvedAt: '2026-03-30 15:25'
                        },
                        {
                            id: 'c9Dm4SpN',
                            name: '03-1_비디오팩생성5일경과_upload_N',
                            bizcenterId: 'LBR.7ze4lnd894-10GLd16P33CU6JlH1joi7fbU5',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 비디오팩 가입 후 5일이 지났습니다. 첫 영상을 업로드해 보세요.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-03-29 11:00',
                            updatedAt: '2026-03-29 11:00',
                            approvedAt: '2026-03-30 15:30'
                        },
                        {
                            id: 'd1En5TqO',
                            name: '03-2_비디오팩생성5일경과_upload_Y',
                            bizcenterId: 'LBR.8af5moe905-21HMe27Q44DV7KmI2kpj8gcV6',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 비디오팩 활용 팁을 안내드립니다.',
                            buttons: [],
                            optout080: '',
                            status: 'review',
                            createdAt: '2026-04-01 09:00',
                            updatedAt: '2026-04-01 09:00',
                            approvedAt: ''
                        },
                        {
                            id: 'e2Fo6UrP',
                            name: '04_만기1일전',
                            bizcenterId: 'LBR.9bg6npf016-32INf38R55EW8LnJ3lqk9hdW7',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 구독 만기 1일 전입니다. 만기 전 갱신해 주세요.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-01 09:10',
                            updatedAt: '2026-04-01 09:10',
                            approvedAt: '2026-04-02 09:00'
                        },
                        {
                            id: 'f3Gp7VsQ',
                            name: '05_기간만료',
                            bizcenterId: 'LBR.0ch7oqg127-43JOg49S66FX9MoK4mrl0ieX8',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 구독 기간이 만료되었습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-01 09:15',
                            updatedAt: '2026-04-01 09:15',
                            approvedAt: '2026-04-02 09:05'
                        },
                        {
                            id: 'g4Hq8WtR',
                            name: '06-1_사용량초과_스토리지_무료플랜',
                            bizcenterId: 'LBR.1di8prh238-54KPh50T77GY0NpL5nsm1jfY9',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'LMS',
                            messageFormat: 'standalone',
                            messageSubType: 'LMS',
                            title: '[위캔디오] 스토리지 사용량 초과',
                            content: '#{name}님, 무료 플랜 스토리지 사용량을 초과했습니다.\n유료 플랜으로 업그레이드해 보세요.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-02 14:00',
                            updatedAt: '2026-04-02 14:00',
                            approvedAt: '2026-04-03 10:00'
                        },
                        {
                            id: 'h5Ir9XuS',
                            name: '06-2_사용량초과_스토리지_구독플랜',
                            bizcenterId: 'LBR.2ej9qsi349-65LQi61U88HZ1OqM6otn2kgZ0',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'LMS',
                            messageFormat: 'standalone',
                            messageSubType: 'LMS',
                            title: '[위캔디오] 스토리지 사용량 초과',
                            content: '#{name}님, 구독 플랜 스토리지 사용량을 초과했습니다.\n추가 용량을 구매해 주세요.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-02 14:10',
                            updatedAt: '2026-04-02 14:10',
                            approvedAt: '2026-04-03 10:05'
                        },
                        {
                            id: 'i6Js0YvT',
                            name: '07-1_사용량초과_트래픽_무료플랜',
                            bizcenterId: 'LBR.3fk0rtj450-76MRj72V99IA2PrN7pun3lhA1',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 무료 플랜 트래픽 사용량을 초과했습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-02 14:20',
                            updatedAt: '2026-04-02 14:20',
                            approvedAt: '2026-04-03 10:10'
                        },
                        {
                            id: 'j7Kt1ZwU',
                            name: '07-2_사용량초과_트래픽_구독플랜',
                            bizcenterId: 'LBR.4gl1suk561-87NSk83W00JB3QsO8qvo4miB2',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 구독 플랜 트래픽 사용량을 초과했습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-02 14:30',
                            updatedAt: '2026-04-02 14:30',
                            approvedAt: '2026-04-03 10:15'
                        },
                        {
                            id: 'k8Lu2AxV',
                            name: '08-1_사용량초과_인코딩_무료플랜',
                            bizcenterId: 'LBR.5hm2tvl672-98OTl94X11KC4RtP9rwp5njC3',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 무료 플랜 인코딩 사용량을 초과했습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-02 14:40',
                            updatedAt: '2026-04-02 14:40',
                            approvedAt: '2026-04-03 10:20'
                        },
                        {
                            id: 'l9Mv3ByW',
                            name: '08-2_사용량초과_인코딩_구독플랜',
                            bizcenterId: 'LBR.6in3uwm783-09PUm05Y22LD5SuQ0sxq6okD4',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 구독 플랜 인코딩 사용량을 초과했습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-02 14:50',
                            updatedAt: '2026-04-02 14:50',
                            approvedAt: '2026-04-03 10:25'
                        },
                        {
                            id: 'm0Nw4CzX',
                            name: '09_결제완료',
                            bizcenterId: 'LBR.7jo4vxn894-10QVn16Z33ME6TvR1tyr7plE5',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '#{name}님, 결제가 정상 완료되었습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'approved',
                            createdAt: '2026-04-03 11:00',
                            updatedAt: '2026-04-03 11:00',
                            approvedAt: '2026-04-04 10:00'
                        }
                    ]
                },
                {
                    id: 'gK7pZ2qR',
                    name: '비디오팩_알림',
                    expanded: false,
                    templates: [
                        {
                            id: 'n1Ox5DaY',
                            name: '01_업로드완료알림',
                            bizcenterId: 'LBR.8kp5wyo905-21RWo27A44NF7UwS2uzs8qmF6',
                            brandId: 'wcd',
                            brandNumber: '16447143',
                            purpose: 'general',
                            messageType: 'SMS',
                            messageFormat: 'standalone',
                            messageSubType: 'SMS',
                            title: '',
                            content: '영상 업로드가 완료되었습니다.',
                            buttons: [],
                            optout080: '',
                            status: 'review',
                            createdAt: '2026-04-14 09:00',
                            updatedAt: '2026-04-14 09:00',
                            approvedAt: ''
                        }
                    ]
                }
            ],

            // 폼 (등록/수정)
            form: {
                name: '',
                brandId: '',
                brandNumber: '',
                purpose: 'general',
                optout080: '',
                messageType: 'SMS',
                messageFormat: 'standalone',
                messageSubType: 'SMS',
                title: '',
                content: '',
                // LMS 포맷형 — 메인 타이틀
                mainTitle: { useLogo: true, icon: 'tag', title: '' },
                // LMS 포맷형 — 본문(들). basic/basic-title 은 1개, paragraph 은 N개
                bodies: [{ title: '', content: '' }],
                // MMS 스탠드얼론 — 첨부파일
                attachmentMode: 'upload',
                attachmentName: '',
                // MMS 캐러셀 — 슬라이드
                slides: [
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' }
                ],
                buttons: []
            },
            activeSlideIdx: 0,
            // 메인 타이틀 아이콘 옵션 (LMS 포맷형)
            mainTitleIcons: [
                { value: 'tag', icon: 'bi-tag' },
                { value: 'ticket', icon: 'bi-ticket-perforated' },
                { value: 'celebration', icon: 'bi-stars' },
                { value: 'calendar', icon: 'bi-calendar-event' },
                { value: 'note', icon: 'bi-journal-text' },
                { value: 'bell', icon: 'bi-bell' }
            ],
            previousPurpose: 'general',
            editingTemplateId: null,
            editingCategoryId: null,

            // 모달 데이터
            addCategoryModal: { parentName: 'Root Category', parentId: null, name: '' },
            editCategoryModal: { id: '', name: '' },
            buttonModal: { editingIdx: null, type: '', name: '', value: '' },
            sampleModal: { activeTab: 'SMS', search: '', selectedId: null, page: 1, pageSize: 8 },
            alertText: '',

            // 발신 유형 — 포맷 옵션 (messageType 별)
            messageFormatOptionsMap: {
                SMS: [
                    { value: 'standalone', label: '스탠드얼론' }
                ],
                LMS: [
                    { value: 'standalone', label: '스탠드얼론' },
                    { value: 'format', label: '포맷형' }
                ],
                MMS: [
                    { value: 'standalone', label: '스탠드얼론' },
                    { value: 'carousel-small', label: '캐러셀 스몰' },
                    { value: 'carousel-medium', label: '캐러셀 미디엄' }
                ]
            },

            // 발신 유형 — 서브타입 옵션 (messageType:messageFormat 키)
            messageSubTypeOptionsMap: {
                'SMS:standalone': [
                    { value: 'SMS', label: 'SMS' },
                    { value: 'integrated-sms', label: '통합SMS카드' }
                ],
                'LMS:standalone': [
                    { value: 'LMS', label: 'LMS' },
                    { value: 'integrated-lms', label: '통합LMS카드' }
                ],
                'LMS:format': [
                    { value: 'basic', label: '기본형' },
                    { value: 'basic-title', label: '기본형타이틀강조' },
                    { value: 'paragraph', label: '문단형' }
                ],
                'MMS:standalone': [
                    { value: 'horizontal', label: '가로형' },
                    { value: 'vertical', label: '세로형' },
                    { value: 'integrated-mms-t', label: '통합MMS카드 T' },
                    { value: 'integrated-mms-m', label: '통합MMS카드 M' }
                ],
                'MMS:carousel-small': [
                    { value: 'slide', label: '슬라이드형' }
                ],
                'MMS:carousel-medium': [
                    { value: 'slide', label: '슬라이드형' }
                ]
            },

            // 버튼 유형
            buttonTypeOptions: [
                { value: 'url', label: 'URL 연결하기' },
                { value: 'call', label: '전화 걸기' },
                { value: 'copy', label: '복사하기' },
                { value: 'mapShow', label: '지도 보여주기' },
                { value: 'mapSearch', label: '지도 검색하기' },
                { value: 'locationShare', label: '현재 위치 공유하기' },
                { value: 'calendar', label: '일정 등록하기' },
                { value: 'chat', label: '대화방 열기' }
            ],

            // 샘플 템플릿 — 각 변형별 시드
            sampleTemplates: [
                // SMS — SMS / 통합SMS카드
                { id: 'smp-sms-01', name: '회원가입 환영', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', purpose: 'general', title: '', content: '#{name}님, 가입을 환영합니다. 쏠쏠과 함께 시작해 보세요.', buttons: [] },
                { id: 'smp-sms-02', name: '본인 인증 코드', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'SMS', purpose: 'auth', title: '', content: '인증번호: #{code}', buttons: [] },
                { id: 'smp-sms-03', name: '통합 SMS 카드 안내', messageType: 'SMS', messageFormat: 'standalone', messageSubType: 'integrated-sms', purpose: 'general', title: '', content: '간단한 안내 카드 메시지입니다.', buttons: [] },

                // LMS — 스탠드얼론 LMS / 통합LMS카드
                { id: 'smp-lms-01', name: '결제 완료 안내', messageType: 'LMS', messageFormat: 'standalone', messageSubType: 'LMS', purpose: 'general', title: '결제 완료', content: '#{name}님, 결제가 정상 완료되었습니다.\n주문 내역을 확인해 주세요.', buttons: [] },
                { id: 'smp-lms-02', name: '이벤트 참여 안내', messageType: 'LMS', messageFormat: 'standalone', messageSubType: 'LMS', purpose: 'ad', title: '이벤트', content: '신규 가입 고객 대상 특별 이벤트를 진행합니다.', buttons: [] },
                { id: 'smp-lms-03', name: '통합 LMS 카드 안내', messageType: 'LMS', messageFormat: 'standalone', messageSubType: 'integrated-lms', purpose: 'general', title: '주문 안내', content: '주문이 접수되었습니다. 상세 내용을 확인하세요.', buttons: [] },

                // LMS 포맷형 — 기본형 / 타이틀강조 / 문단형
                { id: 'smp-fmt-01', name: '포맷형 기본 샘플', messageType: 'LMS', messageFormat: 'format', messageSubType: 'basic', purpose: 'general',
                  mainTitle: { useLogo: true, icon: 'tag', title: '특별 할인 안내' },
                  bodies: [{ title: '한정 혜택', content: '한정된 시간 동안만 진행되는 특별 혜택입니다.' }],
                  buttons: [] },
                { id: 'smp-fmt-02', name: '타이틀 강조 샘플', messageType: 'LMS', messageFormat: 'format', messageSubType: 'basic-title', purpose: 'general',
                  mainTitle: { useLogo: true, icon: 'celebration', title: '축하합니다!' },
                  bodies: [{ title: '이벤트 당첨', content: '이벤트에 당첨되셨습니다.' }],
                  buttons: [] },
                { id: 'smp-fmt-03', name: '문단형 공지 샘플', messageType: 'LMS', messageFormat: 'format', messageSubType: 'paragraph', purpose: 'general',
                  mainTitle: { useLogo: true, icon: 'note', title: '서비스 점검 공지' },
                  bodies: [
                      { title: '점검 안내', content: '서비스 점검을 진행합니다.' },
                      { title: '점검 시간', content: '오전 2시부터 4시까지 진행됩니다.' }
                  ],
                  buttons: [] },

                // MMS 스탠드얼론 — 가로형 / 세로형 / 통합 카드 T·M
                { id: 'smp-mms-01', name: '가로형 이미지 샘플', messageType: 'MMS', messageFormat: 'standalone', messageSubType: 'horizontal', purpose: 'general', title: '신규 이벤트', content: '신규 이벤트가 시작되었습니다.', buttons: [] },
                { id: 'smp-mms-02', name: '세로형 이미지 샘플', messageType: 'MMS', messageFormat: 'standalone', messageSubType: 'vertical', purpose: 'general', title: '예약 확정', content: '예약이 확정되었습니다.', buttons: [] },
                { id: 'smp-mms-03', name: '통합 MMS 카드 T 샘플', messageType: 'MMS', messageFormat: 'standalone', messageSubType: 'integrated-mms-t', purpose: 'general', title: '', content: '카드 T 메시지 내용입니다.', buttons: [] },
                { id: 'smp-mms-04', name: '통합 MMS 카드 M 샘플', messageType: 'MMS', messageFormat: 'standalone', messageSubType: 'integrated-mms-m', purpose: 'general', title: '', content: '카드 M 메시지 내용입니다.', buttons: [] },

                // MMS 캐러셀
                { id: 'smp-mms-05', name: '캐러셀 스몰 샘플', messageType: 'MMS', messageFormat: 'carousel-small', messageSubType: 'slide', purpose: 'general',
                  slides: [
                      { title: '슬라이드 1', content: '첫 번째' },
                      { title: '슬라이드 2', content: '두 번째' },
                      { title: '슬라이드 3', content: '세 번째' }
                  ],
                  buttons: [] },
                { id: 'smp-mms-06', name: '캐러셀 미디엄 샘플', messageType: 'MMS', messageFormat: 'carousel-medium', messageSubType: 'slide', purpose: 'general',
                  slides: [
                      { title: '슬라이드 1', content: '첫 번째' },
                      { title: '슬라이드 2', content: '두 번째' }
                  ],
                  buttons: [] }
            ]
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                addCategory: new bootstrap.Modal(this.$refs.addCategoryModal),
                editCategory: new bootstrap.Modal(this.$refs.editCategoryModal),
                button: new bootstrap.Modal(this.$refs.buttonModal),
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
        selectedBrand() {
            return this.brands.find(b => b.id === this.form.brandId) || null;
        },
        selectedBrandName() {
            return this.selectedBrand ? this.selectedBrand.name : '';
        },
        brandNumbers() {
            return this.selectedBrand ? this.selectedBrand.numbers : [];
        },
        filteredBrands() {
            const q = this.brandSearch.trim().toLowerCase();
            if (!q) return this.brands;
            return this.brands.filter(b => b.name.toLowerCase().includes(q));
        },
        messageFormatOptions() {
            return this.messageFormatOptionsMap[this.form.messageType] || [];
        },
        messageSubTypeOptions() {
            const key = `${this.form.messageType}:${this.form.messageFormat}`;
            return this.messageSubTypeOptionsMap[key] || [];
        },
        // 발송 유형/포맷/서브타입 조합으로 폼 변형 결정
        formVariant() {
            const t = this.form.messageType;
            const f = this.form.messageFormat;
            const s = this.form.messageSubType;
            if (t === 'SMS') return 'sms-basic';
            if (t === 'LMS' && f === 'standalone') return 'lms-basic';
            if (t === 'LMS' && f === 'format') {
                if (s === 'paragraph') return 'lms-format-multi';
                return 'lms-format-single';
            }
            if (t === 'MMS' && f === 'standalone') return 'mms-basic';
            if (t === 'MMS') return 'mms-carousel';
            return 'sms-basic';
        },
        // 미리보기 변형 — 카드/말풍선 등 시각 요소 결정
        previewVariant() {
            const t = this.form.messageType;
            const f = this.form.messageFormat;
            const s = this.form.messageSubType;
            if (t === 'SMS') return s === 'integrated-sms' ? 'sms-card' : 'sms-bubble';
            if (t === 'LMS' && f === 'standalone') {
                return s === 'integrated-lms' ? 'lms-card' : 'lms-bubble';
            }
            if (t === 'LMS' && f === 'format') {
                if (s === 'basic-title') return 'lms-format-emphasis';
                if (s === 'paragraph') return 'lms-format-paragraph';
                return 'lms-format-basic';
            }
            if (t === 'MMS' && f === 'standalone') {
                if (s === 'horizontal') return 'mms-horizontal';
                if (s === 'vertical') return 'mms-vertical';
                if (s === 'integrated-mms-t') return 'mms-card-t';
                if (s === 'integrated-mms-m') return 'mms-card-m';
                return 'mms-horizontal';
            }
            if (t === 'MMS' && f === 'carousel-small') return 'mms-carousel-small';
            if (t === 'MMS' && f === 'carousel-medium') return 'mms-carousel-medium';
            return 'sms-bubble';
        },
        activeSlide() {
            return this.form.slides[this.activeSlideIdx] || null;
        },
        totalBodyChars() {
            return this.form.bodies.reduce((sum, b) => sum + (b.content ? b.content.length : 0), 0);
        },
        // 메인 타이틀에서 선택된 아이콘 클래스
        selectedMainIcon() {
            const found = this.mainTitleIcons.find(i => i.value === this.form.mainTitle.icon);
            return found ? found.icon : 'bi-tag';
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
        selectedSample() {
            return this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId) || null;
        },
        // 선택된 샘플의 미리보기 변형
        samplePreviewVariant() {
            const s = this.selectedSample;
            if (!s) return '';
            const t = s.messageType, f = s.messageFormat, st = s.messageSubType;
            if (t === 'SMS') return st === 'integrated-sms' ? 'sms-card' : 'sms-bubble';
            if (t === 'LMS' && f === 'standalone') {
                return st === 'integrated-lms' ? 'lms-card' : 'lms-bubble';
            }
            if (t === 'LMS' && f === 'format') {
                if (st === 'basic-title') return 'lms-format-emphasis';
                if (st === 'paragraph') return 'lms-format-paragraph';
                return 'lms-format-basic';
            }
            if (t === 'MMS' && f === 'standalone') {
                if (st === 'horizontal') return 'mms-horizontal';
                if (st === 'vertical') return 'mms-vertical';
                if (st === 'integrated-mms-t') return 'mms-card-t';
                if (st === 'integrated-mms-m') return 'mms-card-m';
                return 'mms-horizontal';
            }
            if (t === 'MMS' && f === 'carousel-small') return 'mms-carousel-small';
            if (t === 'MMS' && f === 'carousel-medium') return 'mms-carousel-medium';
            return 'sms-bubble';
        },
        selectedSampleMainIcon() {
            const s = this.selectedSample;
            if (!s || !s.mainTitle) return 'bi-tag';
            const found = this.mainTitleIcons.find(i => i.value === s.mainTitle.icon);
            return found ? found.icon : 'bi-tag';
        },
        buttonValueLabel() {
            const map = { url: 'URL', copy: '복사할 값', call: '전화번호' };
            return map[this.buttonModal.type] || '값';
        },
        buttonValuePlaceholder() {
            const map = { url: 'https://example.com', copy: '복사할 텍스트', call: '01012345678' };
            return map[this.buttonModal.type] || '';
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

        // ===== 라벨 =====
        purposeLabel(p) {
            const map = { general: '일반용', auth: '인증용', ad: '광고용' };
            return map[p] || p;
        },
        statusLabel(s) {
            const map = { request: '요청', review: '검수 중', approved: '승인', rejected: '반려' };
            return map[s] || s;
        },
        brandNameById(id) {
            const b = this.brands.find(b => b.id === id);
            return b ? b.name : '';
        },
        buttonTypeLabel(value) {
            const opt = this.buttonTypeOptions.find(o => o.value === value);
            return opt ? opt.label : value;
        },
        buttonValueLabelStatic(type) {
            const map = { url: 'URL', copy: '복사할 값', call: '전화번호' };
            return map[type] || '값';
        },
        messageTypeText(tpl) {
            const formatMap = {
                standalone: '스탠드얼론',
                format: '포맷형',
                'carousel-small': '캐러셀 스몰',
                'carousel-medium': '캐러셀 미디엄',
                template: '템플릿'
            };
            const subMap = {
                SMS: 'SMS',
                LMS: 'LMS',
                'integrated-sms': '통합SMS카드',
                'integrated-lms': '통합LMS카드',
                basic: '기본형',
                'basic-title': '기본형타이틀강조',
                paragraph: '문단형',
                horizontal: '가로형',
                vertical: '세로형',
                'integrated-mms-t': '통합MMS카드 T',
                'integrated-mms-m': '통합MMS카드 M',
                slide: '슬라이드형',
                carousel: '캐러셀형'
            };
            const parts = [
                formatMap[tpl.messageFormat] || '',
                tpl.messageType,
                subMap[tpl.messageSubType] || ''
            ].filter(Boolean);
            return parts.join('/');
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
            const newCat = { id: this.generateId(), name, expanded: true, templates: [] };
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
            this.form = this.makeEmptyForm();
            this.previousPurpose = 'general';
            this.brandOpen = false;
            this.brandSearch = '';
            this.activeSlideIdx = 0;
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
                brandId: tpl.brandId,
                brandNumber: tpl.brandNumber,
                purpose: tpl.purpose,
                optout080: tpl.optout080 || '',
                messageType: tpl.messageType,
                messageFormat: tpl.messageFormat || 'standalone',
                messageSubType: tpl.messageSubType || 'SMS',
                title: tpl.title || '',
                content: tpl.content || '',
                mainTitle: tpl.mainTitle
                    ? { useLogo: tpl.mainTitle.useLogo !== false, icon: tpl.mainTitle.icon || 'tag', title: tpl.mainTitle.title || '' }
                    : { useLogo: true, icon: 'tag', title: '' },
                bodies: (tpl.bodies && tpl.bodies.length > 0)
                    ? tpl.bodies.map(b => ({ title: b.title || '', content: b.content || '' }))
                    : [{ title: '', content: '' }],
                attachmentMode: tpl.attachmentMode || 'upload',
                attachmentName: tpl.attachmentName || '',
                slides: (tpl.slides && tpl.slides.length > 0)
                    ? tpl.slides.map(s => ({
                        title: s.title || '',
                        content: s.content || '',
                        attachmentMode: s.attachmentMode || 'upload',
                        attachmentName: s.attachmentName || ''
                    }))
                    : [
                        { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                        { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                        { title: '', content: '', attachmentMode: 'upload', attachmentName: '' }
                    ],
                buttons: (tpl.buttons || []).map(b => ({ ...b }))
            };
            this.activeSlideIdx = 0;
            this.previousPurpose = tpl.purpose;
            this.brandOpen = false;
            this.brandSearch = '';
            this.mode = 'edit';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        cancelForm() {
            this.mode = 'list';
            this.editingTemplateId = null;
            this.editingCategoryId = null;
        },
        makeEmptyForm() {
            return {
                name: '',
                brandId: '',
                brandNumber: '',
                purpose: 'general',
                optout080: '',
                messageType: 'SMS',
                messageFormat: 'standalone',
                messageSubType: 'SMS',
                title: '',
                content: '',
                mainTitle: { useLogo: true, icon: 'tag', title: '' },
                bodies: [{ title: '', content: '' }],
                attachmentMode: 'upload',
                attachmentName: '',
                slides: [
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' }
                ],
                buttons: []
            };
        },

        // ===== 메인 타이틀 / 본문 / 슬라이드 관리 =====
        selectMainIcon(value) {
            this.form.mainTitle.icon = value;
        },
        addBody() {
            this.form.bodies.push({ title: '', content: '' });
        },
        removeBody(idx) {
            if (this.form.bodies.length <= 1) return;
            this.form.bodies.splice(idx, 1);
        },
        addSlide() {
            if (this.form.slides.length >= 6) {
                this.showAlert('슬라이드는 최대 6개까지 추가할 수 있습니다.');
                return;
            }
            this.form.slides.push({ title: '', content: '', attachmentMode: 'upload', attachmentName: '' });
            this.activeSlideIdx = this.form.slides.length - 1;
        },
        removeSlide(idx) {
            if (this.form.slides.length <= 2) {
                this.showAlert('슬라이드는 최소 2개 이상 필요합니다.');
                return;
            }
            this.form.slides.splice(idx, 1);
            if (this.activeSlideIdx >= this.form.slides.length) {
                this.activeSlideIdx = this.form.slides.length - 1;
            }
        },
        selectSlide(idx) {
            this.activeSlideIdx = idx;
        },

        // ===== 발신 유형 =====
        onMessageTypeChange() {
            const formatOptions = this.messageFormatOptions;
            this.form.messageFormat = formatOptions.length > 0 ? formatOptions[0].value : '';
            this.onMessageFormatChange();
        },
        onMessageFormatChange() {
            const subOptions = this.messageSubTypeOptions;
            this.form.messageSubType = subOptions.length > 0 ? subOptions[0].value : '';
        },

        // ===== 발신 브랜드 드롭다운 =====
        toggleBrand() {
            this.brandOpen = !this.brandOpen;
            if (this.brandOpen) this.brandSearch = '';
        },
        closeBrand() {
            this.brandOpen = false;
        },
        selectBrand(b) {
            this.form.brandId = b.id;
            this.form.brandNumber = b.numbers && b.numbers.length === 1 ? b.numbers[0] : '';
            this.brandOpen = false;
        },

        // ===== 발송 목적 =====
        onPurposeSelect(value) {
            if (value !== 'ad') {
                this.form.optout080 = '';
            }
            this.form.purpose = value;
            this.previousPurpose = value;
        },

        // ===== 버튼 =====
        openButtonModal(idx) {
            if (idx !== null && this.form.buttons[idx]) {
                const b = this.form.buttons[idx];
                this.buttonModal = { editingIdx: idx, type: b.type, name: b.name, value: b.value || '' };
            } else {
                if (this.form.buttons.length >= 4) {
                    this.showAlert('버튼은 최대 4개까지 추가할 수 있습니다.');
                    return;
                }
                this.buttonModal = { editingIdx: null, type: '', name: '', value: '' };
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
            const payload = {
                type: this.buttonModal.type,
                name: this.buttonModal.name.trim(),
                value: this.buttonModal.value.trim()
            };
            if (this.buttonModal.editingIdx === null) {
                this.form.buttons.push(payload);
            } else {
                this.form.buttons.splice(this.buttonModal.editingIdx, 1, payload);
            }
            this.closeModal('button');
        },
        removeButton(idx) {
            this.form.buttons.splice(idx, 1);
        },
        moveButton(index, delta) {
            const target = index + delta;
            if (target < 0 || target >= this.form.buttons.length) return;
            const arr = this.form.buttons;
            [arr[index], arr[target]] = [arr[target], arr[index]];
        },

        // ===== 저장 =====
        saveTemplate() {
            if (!this.form.name.trim()) {
                this.showAlert('템플릿 이름을 입력하세요.');
                return;
            }
            if (!this.form.brandId) {
                this.showAlert('발신 브랜드를 선택하세요.');
                return;
            }
            if (!this.form.brandNumber) {
                this.showAlert('대화방(발신 번호)을 선택하세요.');
                return;
            }
            const variant = this.formVariant;
            if (variant === 'sms-basic' || variant === 'lms-basic' || variant === 'mms-basic') {
                if (!this.form.content.trim()) {
                    this.showAlert('내용을 입력하세요.');
                    return;
                }
            } else if (variant === 'lms-format-single' || variant === 'lms-format-multi') {
                if (!this.form.mainTitle.title.trim()) {
                    this.showAlert('메인 타이틀 제목을 입력하세요.');
                    return;
                }
                const emptyBody = this.form.bodies.find(b => !b.content.trim());
                if (emptyBody) {
                    this.showAlert('본문 내용을 입력하세요.');
                    return;
                }
            } else if (variant === 'mms-carousel') {
                const emptySlide = this.form.slides.find(s => !s.content.trim());
                if (emptySlide) {
                    this.showAlert('슬라이드 내용을 입력하세요.');
                    return;
                }
            }
            if (this.form.purpose === 'ad' && !this.form.optout080) {
                this.showAlert('수신 거부 번호를 선택하세요.');
                return;
            }

            const now = this.formatNow();

            if (this.mode === 'register') {
                let cat = this.categories.find(c => c.id === this.editingCategoryId);
                if (!cat) cat = this.categories[0];
                const newId = this.generateId();
                cat.templates.push({
                    id: newId,
                    bizcenterId: this.generateBizcenterId(),
                    ...this.form,
                    status: 'request',
                    createdAt: now,
                    updatedAt: now,
                    approvedAt: ''
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
            // 등록/수정 진입 시 현재 발송 유형 탭으로 시작
            if (this.mode !== 'list' && this.form.messageType) {
                this.sampleModal.activeTab = this.form.messageType;
            } else if (!this.sampleModal.activeTab) {
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
        // 카드 우측 라벨 (서브타입 한글 라벨)
        sampleSubTypeLabel(t) {
            const key = `${t.messageType}:${t.messageFormat}`;
            const opts = this.messageSubTypeOptionsMap[key] || [];
            const found = opts.find(o => o.value === t.messageSubType);
            return found ? found.label : t.messageSubType;
        },
        // 카드 본문 요약 (변형별 적절한 텍스트)
        sampleSummary(t) {
            if (t.bodies && t.bodies.length > 0) {
                return t.bodies.map(b => b.content).filter(Boolean).join(' ');
            }
            if (t.slides && t.slides.length > 0) {
                return t.slides.map(s => s.content).filter(Boolean).join(' / ');
            }
            return t.content || '';
        },
        confirmSample() {
            const tpl = this.sampleTemplates.find(t => t.id === this.sampleModal.selectedId);
            if (!tpl) {
                this.showAlert('샘플 템플릿을 선택하세요.');
                return;
            }
            this.form.purpose = tpl.purpose;
            this.previousPurpose = tpl.purpose;
            this.form.messageType = tpl.messageType;
            this.form.messageFormat = tpl.messageFormat;
            this.form.messageSubType = tpl.messageSubType;
            this.form.title = tpl.title || '';
            this.form.content = tpl.content || '';
            this.form.mainTitle = tpl.mainTitle
                ? { useLogo: tpl.mainTitle.useLogo !== false, icon: tpl.mainTitle.icon || 'tag', title: tpl.mainTitle.title || '' }
                : { useLogo: true, icon: 'tag', title: '' };
            this.form.bodies = (tpl.bodies && tpl.bodies.length > 0)
                ? tpl.bodies.map(b => ({ title: b.title || '', content: b.content || '' }))
                : [{ title: '', content: '' }];
            this.form.slides = (tpl.slides && tpl.slides.length > 0)
                ? tpl.slides.map(s => ({
                    title: s.title || '',
                    content: s.content || '',
                    attachmentMode: s.attachmentMode || 'upload',
                    attachmentName: s.attachmentName || ''
                }))
                : [
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' },
                    { title: '', content: '', attachmentMode: 'upload', attachmentName: '' }
                ];
            this.activeSlideIdx = 0;
            this.form.buttons = (tpl.buttons || []).map(b => ({ ...b }));
            if (!this.form.name) this.form.name = tpl.name;
            this.closeModal('sample');
        },

        // ===== 유틸 =====
        generateId() {
            return Math.random().toString(36).slice(2, 10);
        },
        generateBizcenterId() {
            const rand = () => Math.random().toString(36).slice(2, 10);
            return `LBR.${rand()}-${rand()}${rand()}`;
        },
        formatNow() {
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }
    }
};
