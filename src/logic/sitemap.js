export default {
    name: 'Sitemap',
    layout: 'default',
    data() {
        return {
            keyword: '',
            channelFilter: '',
            collapsedSet: {}
        };
    },
    computed: {
        channelOptions() {
            return [
                { code: 'COMMON', name: '공통',   desc: '로그인 상태/채널과 무관한 공통 화면' },
                { code: 'SMS',    name: 'SMS',    desc: '문자메시지(SMS/LMS/MMS) 관련' },
                { code: 'KAKAO',  name: '알림톡', desc: '카카오 알림톡/친구톡 관련' },
                { code: 'RCS',    name: 'RCS',    desc: 'RCS 메시지 관련' },
                { code: 'EMAIL',  name: '이메일', desc: '이메일 발송 관련' },
                { code: 'PUSH',   name: 'PUSH',   desc: '앱 푸시(FCM/APNs) 관련' },
                { code: 'MULTI',  name: '복합',   desc: '복합 채널 / 캠페인 / 플로우' }
            ];
        },
        categories() {
            return this.menuData.map(c => ({ ...c, totalCount: c.items.length }));
        },
        totalCategories() {
            return this.categories.length;
        },
        totalMenus() {
            return this.categories.reduce((sum, c) => sum + c.items.length, 0);
        },
        totalPages() {
            return this.categories.reduce(
                (sum, c) => sum + c.items.filter(i => i.depth === 2).length,
                0
            );
        },
        totalPopups() {
            return this.categories.reduce(
                (sum, c) => sum + c.items.filter(i => i.depth === 3).length,
                0
            );
        },
        filteredCategories() {
            const kw = this.keyword.trim().toLowerCase();
            const ch = this.channelFilter;
            if (!kw && !ch) return this.categories;

            const matches = (item) => {
                const okKw = !kw
                    || (item.name && item.name.toLowerCase().includes(kw))
                    || (item.route && item.route.toLowerCase().includes(kw))
                    || (item.description && item.description.toLowerCase().includes(kw))
                    || (item.code && item.code.toLowerCase().includes(kw));
                const okCh = !ch || (item.channels && item.channels.includes(ch));
                return okKw && okCh;
            };

            const result = [];
            for (const cat of this.categories) {
                if (cat.name.toLowerCase().includes(kw) && !ch) {
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
                    name: '홈',
                    items: [
                        { code: '1.1', depth: 2, name: '메인', route: '/home', channels: ['COMMON'], description: '히어로 / 핵심 기능 소개 / 통계 / 가격 안내 / CTA로 구성된 랜딩 페이지' }
                    ]
                },
                {
                    id: 2,
                    name: '인증/계정 진입',
                    items: [
                        { code: '2.1',   depth: 2, name: '회원가입',                  route: '/signup',              channels: ['COMMON'], description: '이메일/비밀번호 + 약관 동의 + OTP/휴대폰 인증' },
                        { code: '2.1.1', depth: 3, name: 'OTP 인증 알림 PU',           route: '/signup',              channels: ['COMMON'], description: 'OTP 인증 메일 발송 안내 팝업' },
                        { code: '2.1.2', depth: 3, name: '휴대폰 인증 알림 PU',        route: '/signup',              channels: ['COMMON'], description: '휴대폰 본인 인증(SMS) 안내 팝업' },
                        { code: '2.1.3', depth: 3, name: '이용약관 PU',                route: '/signup',              channels: ['COMMON'], description: '이용약관 / 개인정보 / 마케팅 동의 본문 모달' },
                        { code: '2.2',   depth: 2, name: '로그인',                     route: '/login',               channels: ['COMMON'], description: '이메일/비밀번호 로그인, 아이디 기억하기, 비밀번호 재설정 링크' },
                        { code: '2.3',   depth: 2, name: '로그인 보안 인증',           route: '/login/security',      channels: ['COMMON'], description: '로그인 후 OTP/이메일 2차 인증 입력 화면' },
                        { code: '2.3.1', depth: 3, name: '인증코드 알림 PU',           route: '/login/security',      channels: ['COMMON'], description: '인증코드 발송 안내 팝업' },
                        { code: '2.4',   depth: 2, name: '비밀번호 재설정 (요청)',     route: '/reset-password',      channels: ['COMMON'], description: '재설정 메일을 받기 위해 가입 이메일 입력' },
                        { code: '2.4.1', depth: 3, name: '메일 발송 완료 PU',          route: '/reset-password',      channels: ['COMMON'], description: '재설정 메일 발송 완료 안내 팝업' },
                        { code: '2.5',   depth: 2, name: '비밀번호 재설정 (신규 입력)', route: '/reset-password/new',  channels: ['COMMON'], description: '메일 링크 진입 후 새 비밀번호 입력/확인' },
                        { code: '2.5.1', depth: 3, name: '재설정 완료 PU',             route: '/reset-password/new',  channels: ['COMMON'], description: '비밀번호 재설정 완료 안내 팝업' }
                    ]
                },
                {
                    id: 3,
                    name: '메시지 발송',
                    items: [
                        { code: '3.1',    depth: 2, name: '문자메시지(SMS) 발송',     route: '/send/sms',   channels: ['SMS'],   description: '직접 입력/샘플/AI 템플릿, 수신자 직접·주소록, 광고 수신 검사, 즉시·예약 발송' },
                        { code: '3.1.1',  depth: 3, name: '샘플 템플릿 선택 PU',       route: '/send/sms',   channels: ['SMS'],   description: '저장된 샘플 템플릿 검색·선택 팝업' },
                        { code: '3.1.2',  depth: 3, name: '수신자 정보 PU',            route: '/send/sms',   channels: ['SMS'],   description: '수신자 직접 입력 + 변수 매핑 팝업' },
                        { code: '3.1.3',  depth: 3, name: '수신자 선택 PU',            route: '/send/sms',   channels: ['SMS'],   description: '주소록/그룹에서 수신자 일괄 선택 팝업' },
                        { code: '3.1.4',  depth: 3, name: '광고 수신 알림 PU',         route: '/send/sms',   channels: ['SMS'],   description: '광고성 메시지 수신 동의 안내 팝업' },
                        { code: '3.1.5',  depth: 3, name: '발송 컨펌 PU',              route: '/send/sms',   channels: ['SMS'],   description: '수신자 수/차감 크레딧/예약시간 확인 후 발송' },
                        { code: '3.1.6',  depth: 3, name: '초기화 확인 PU',            route: '/send/sms',   channels: ['SMS'],   description: '발송 폼 초기화(작성 내용 삭제) 확인 팝업' },

                        { code: '3.2',    depth: 2, name: '알림톡 발송',               route: '/send/kakao', channels: ['KAKAO'], description: '검수 완료 템플릿 선택, 변수 매핑, 대체 문자 설정, 즉시·예약 발송' },
                        { code: '3.2.1',  depth: 3, name: '템플릿 선택 PU',            route: '/send/kakao', channels: ['KAKAO'], description: '알림톡 검수 완료 템플릿 검색·선택 팝업' },
                        { code: '3.2.2',  depth: 3, name: '수신자 정보 PU',            route: '/send/kakao', channels: ['KAKAO'], description: '수신자 직접 입력 + 변수 매핑 팝업' },
                        { code: '3.2.3',  depth: 3, name: '수신자 선택 PU',            route: '/send/kakao', channels: ['KAKAO'], description: '주소록에서 수신자 선택 팝업' },
                        { code: '3.2.4',  depth: 3, name: '수신자 정보 수정 PU',        route: '/send/kakao', channels: ['KAKAO'], description: '선택 수신자 변수값 수정 팝업' },
                        { code: '3.2.5',  depth: 3, name: '발송 컨펌 PU',              route: '/send/kakao', channels: ['KAKAO'], description: '발송 직전 최종 확인 팝업' },
                        { code: '3.2.6',  depth: 3, name: '초기화 확인 PU',            route: '/send/kakao', channels: ['KAKAO'], description: '폼 초기화 확인 팝업' },

                        { code: '3.3',    depth: 2, name: 'RCS 발송',                  route: '/send/rcs',   channels: ['RCS'],   description: '템플릿/이미지/카드형, 버튼 추가, 즉시·예약 발송' },
                        { code: '3.3.1',  depth: 3, name: '템플릿 선택 PU',            route: '/send/rcs',   channels: ['RCS'],   description: 'RCS 템플릿 선택 팝업' },
                        { code: '3.3.2',  depth: 3, name: '수신자 정보 PU',            route: '/send/rcs',   channels: ['RCS'],   description: '수신자 직접 입력 팝업' },
                        { code: '3.3.3',  depth: 3, name: '수신자 정보 수정 PU',        route: '/send/rcs',   channels: ['RCS'],   description: '수신자 변수값 수정 팝업' },
                        { code: '3.3.4',  depth: 3, name: '수신자 선택 PU',            route: '/send/rcs',   channels: ['RCS'],   description: '주소록에서 수신자 선택 팝업' },
                        { code: '3.3.5',  depth: 3, name: '버튼 PU',                   route: '/send/rcs',   channels: ['RCS'],   description: 'RCS 버튼(웹/전화/메시지/위치) 추가 팝업' },
                        { code: '3.3.6',  depth: 3, name: '발송 컨펌 PU',              route: '/send/rcs',   channels: ['RCS'],   description: '발송 직전 최종 확인 팝업' },
                        { code: '3.3.7',  depth: 3, name: '초기화 확인 PU',            route: '/send/rcs',   channels: ['RCS'],   description: '폼 초기화 확인 팝업' },

                        { code: '3.4',    depth: 2, name: '이메일 발송',               route: '/send/email', channels: ['EMAIL'], description: '제목/본문/첨부, 광고성 자동 검사, 즉시·예약 발송' },
                        { code: '3.4.1',  depth: 3, name: '템플릿 선택 PU',            route: '/send/email', channels: ['EMAIL'], description: '이메일 템플릿 선택 팝업' },
                        { code: '3.4.2',  depth: 3, name: '수신자 정보 PU',            route: '/send/email', channels: ['EMAIL'], description: '수신자 직접 입력 팝업' },
                        { code: '3.4.3',  depth: 3, name: '수신자 정보 수정 PU',        route: '/send/email', channels: ['EMAIL'], description: '수신자 변수값 수정 팝업' },
                        { code: '3.4.4',  depth: 3, name: '수신자 선택 PU',            route: '/send/email', channels: ['EMAIL'], description: '주소록에서 수신자 선택 팝업' },
                        { code: '3.4.5',  depth: 3, name: '광고 수신 알림 PU',         route: '/send/email', channels: ['EMAIL'], description: '광고성 메시지 수신 동의 안내 팝업' },
                        { code: '3.4.6',  depth: 3, name: '발송 컨펌 PU',              route: '/send/email', channels: ['EMAIL'], description: '발송 직전 최종 확인 팝업' },
                        { code: '3.4.7',  depth: 3, name: '초기화 확인 PU',            route: '/send/email', channels: ['EMAIL'], description: '폼 초기화 확인 팝업' },

                        { code: '3.5',    depth: 2, name: 'PUSH 발송',                 route: '/send/push',  channels: ['PUSH'],  description: 'iOS/Android 분리, 미디어/큰 아이콘/버튼, 그룹 타게팅, 즉시·예약' },
                        { code: '3.5.1',  depth: 3, name: '템플릿 선택 PU',            route: '/send/push',  channels: ['PUSH'],  description: '푸시 템플릿 선택 팝업' },
                        { code: '3.5.2',  depth: 3, name: '수신자 정보 PU',            route: '/send/push',  channels: ['PUSH'],  description: '수신자 직접 입력 팝업' },
                        { code: '3.5.3',  depth: 3, name: '수신자 선택 PU',            route: '/send/push',  channels: ['PUSH'],  description: '주소록/디바이스 토큰 선택 팝업' },
                        { code: '3.5.4',  depth: 3, name: '수신자 정보 수정 PU',        route: '/send/push',  channels: ['PUSH'],  description: '수신자 변수값 수정 팝업' },
                        { code: '3.5.5',  depth: 3, name: '버튼 PU',                   route: '/send/push',  channels: ['PUSH'],  description: '푸시 액션 버튼(딥링크/URL) 편집 팝업' },
                        { code: '3.5.6',  depth: 3, name: '미디어 PU',                 route: '/send/push',  channels: ['PUSH'],  description: '이미지/영상 미디어 첨부 팝업' },
                        { code: '3.5.7',  depth: 3, name: 'Android 큰 아이콘 PU',      route: '/send/push',  channels: ['PUSH'],  description: 'Android 전용 큰 아이콘 첨부 팝업' },
                        { code: '3.5.8',  depth: 3, name: '그룹 PU',                   route: '/send/push',  channels: ['PUSH'],  description: '발송 대상 그룹 선택 팝업' },
                        { code: '3.5.9',  depth: 3, name: '발송 컨펌 PU',              route: '/send/push',  channels: ['PUSH'],  description: '발송 직전 최종 확인 팝업' },
                        { code: '3.5.10', depth: 3, name: '초기화 확인 PU',            route: '/send/push',  channels: ['PUSH'],  description: '폼 초기화 확인 팝업' },

                        { code: '3.6',    depth: 2, name: '복합(플로우) 발송',         route: '/send/flow',  channels: ['MULTI'], description: 'SMS·알림톡·RCS·이메일·PUSH 다채널 플로우 노드 편집/발송' },
                        { code: '3.6.1',  depth: 3, name: 'Flow 매니저 PU',            route: '/send/flow',  channels: ['MULTI'], description: '플로우 노드(분기/대기/조건) 편집 팝업' },
                        { code: '3.6.2',  depth: 3, name: '템플릿 선택 PU',            route: '/send/flow',  channels: ['MULTI'], description: '노드별 템플릿 선택 팝업' },
                        { code: '3.6.3',  depth: 3, name: '수신자 정보 PU',            route: '/send/flow',  channels: ['MULTI'], description: '수신자 직접 입력 팝업' },
                        { code: '3.6.4',  depth: 3, name: '수신자 선택 PU',            route: '/send/flow',  channels: ['MULTI'], description: '주소록에서 수신자 선택 팝업' },
                        { code: '3.6.5',  depth: 3, name: '수신자 정보 수정 PU',        route: '/send/flow',  channels: ['MULTI'], description: '수신자 변수값 수정 팝업' },
                        { code: '3.6.6',  depth: 3, name: '발송 컨펌 PU',              route: '/send/flow',  channels: ['MULTI'], description: '발송 직전 최종 확인 팝업' },
                        { code: '3.6.7',  depth: 3, name: '초기화 확인 PU',            route: '/send/flow',  channels: ['MULTI'], description: '폼 초기화 확인 팝업' }
                    ]
                },
                {
                    id: 4,
                    name: '발송 조회/통계',
                    items: [
                        { code: '4.1',   depth: 2, name: '문자메시지 발송 조회',  route: '/history/sms',   channels: ['SMS'],    description: 'SMS/LMS/MMS 발송 이력, 상태 필터, 단건 재발송, 엑셀 다운로드' },
                        { code: '4.1.1', depth: 3, name: '일괄 취소 PU',          route: '/history/sms',   channels: ['SMS'],    description: '예약 발송 일괄 취소 팝업' },
                        { code: '4.1.2', depth: 3, name: '다운로드 요청 PU',      route: '/history/sms',   channels: ['SMS'],    description: '엑셀 다운로드 비동기 요청 팝업' },
                        { code: '4.1.3', depth: 3, name: '채널 알림 PU',          route: '/history/sms',   channels: ['SMS'],    description: '채널 한도/안내 팝업' },
                        { code: '4.1.4', depth: 3, name: '템플릿 선택 PU',        route: '/history/sms',   channels: ['SMS'],    description: '재발송용 템플릿 비교/선택 팝업' },
                        { code: '4.1.5', depth: 3, name: '다운로드 요청 목록 PU', route: '/history/sms',   channels: ['SMS'],    description: '비동기 다운로드 요청 목록 팝업' },

                        { code: '4.2',   depth: 2, name: '알림톡 발송 조회',      route: '/history/kakao', channels: ['KAKAO'],  description: '알림톡 발송 이력, 대체발송 여부, 템플릿코드 필터' },
                        { code: '4.2.1', depth: 3, name: '일괄 취소 PU',          route: '/history/kakao', channels: ['KAKAO'],  description: '예약 발송 일괄 취소 팝업' },
                        { code: '4.2.2', depth: 3, name: '다운로드 요청 PU',      route: '/history/kakao', channels: ['KAKAO'],  description: '엑셀 다운로드 요청 팝업' },
                        { code: '4.2.3', depth: 3, name: '채널 알림 PU',          route: '/history/kakao', channels: ['KAKAO'],  description: '채널 안내 팝업' },
                        { code: '4.2.4', depth: 3, name: '템플릿 선택 PU',        route: '/history/kakao', channels: ['KAKAO'],  description: '재발송용 템플릿 비교/선택 팝업' },
                        { code: '4.2.5', depth: 3, name: '다운로드 요청 목록 PU', route: '/history/kakao', channels: ['KAKAO'],  description: '다운로드 요청 목록 팝업' },

                        { code: '4.3',   depth: 2, name: 'RCS 발송 조회',         route: '/history/rcs',   channels: ['RCS'],    description: 'RCS 발송 이력, 브랜드/포맷/응답코드 필터' },
                        { code: '4.3.1', depth: 3, name: '일괄 취소 PU',          route: '/history/rcs',   channels: ['RCS'],    description: '예약 발송 일괄 취소 팝업' },
                        { code: '4.3.2', depth: 3, name: '다운로드 요청 PU',      route: '/history/rcs',   channels: ['RCS'],    description: '엑셀 다운로드 요청 팝업' },
                        { code: '4.3.3', depth: 3, name: '채널 알림 PU',          route: '/history/rcs',   channels: ['RCS'],    description: '채널 안내 팝업' },
                        { code: '4.3.4', depth: 3, name: '템플릿 선택 PU',        route: '/history/rcs',   channels: ['RCS'],    description: '재발송용 템플릿 비교/선택 팝업' },
                        { code: '4.3.5', depth: 3, name: '다운로드 요청 목록 PU', route: '/history/rcs',   channels: ['RCS'],    description: '다운로드 요청 목록 팝업' },

                        { code: '4.4',   depth: 2, name: '이메일 발송 조회',      route: '/history/email', channels: ['EMAIL'],  description: '이메일 발송 이력, 오픈/클릭/바운스/스팸 신고 통계' },
                        { code: '4.4.1', depth: 3, name: '일괄 취소 PU',          route: '/history/email', channels: ['EMAIL'],  description: '예약 발송 일괄 취소 팝업' },
                        { code: '4.4.2', depth: 3, name: '다운로드 요청 PU',      route: '/history/email', channels: ['EMAIL'],  description: '엑셀 다운로드 요청 팝업' },
                        { code: '4.4.3', depth: 3, name: '채널 알림 PU',          route: '/history/email', channels: ['EMAIL'],  description: '채널 안내 팝업' },
                        { code: '4.4.4', depth: 3, name: '템플릿 선택 PU',        route: '/history/email', channels: ['EMAIL'],  description: '재발송용 템플릿 비교/선택 팝업' },
                        { code: '4.4.5', depth: 3, name: '다운로드 요청 목록 PU', route: '/history/email', channels: ['EMAIL'],  description: '다운로드 요청 목록 팝업' },

                        { code: '4.5',   depth: 2, name: 'PUSH 발송 조회',        route: '/history/push',  channels: ['PUSH'],   description: 'iOS/Android 분리 통계, 토큰 만료/실패율' },
                        { code: '4.5.1', depth: 3, name: '일괄 취소 PU',          route: '/history/push',  channels: ['PUSH'],   description: '예약 발송 일괄 취소 팝업' },
                        { code: '4.5.2', depth: 3, name: '다운로드 요청 PU',      route: '/history/push',  channels: ['PUSH'],   description: '엑셀 다운로드 요청 팝업' },
                        { code: '4.5.3', depth: 3, name: '채널 알림 PU',          route: '/history/push',  channels: ['PUSH'],   description: '채널 안내 팝업' },
                        { code: '4.5.4', depth: 3, name: '템플릿 선택 PU',        route: '/history/push',  channels: ['PUSH'],   description: '재발송용 템플릿 비교/선택 팝업' },
                        { code: '4.5.5', depth: 3, name: '다운로드 요청 목록 PU', route: '/history/push',  channels: ['PUSH'],   description: '다운로드 요청 목록 팝업' },

                        { code: '4.6',   depth: 2, name: '통계',                  route: '/history/stats', channels: ['MULTI'],  description: '채널별/기간별 발송량·도달률·실패율 대시보드' }
                    ]
                },
                {
                    id: 5,
                    name: '주소록',
                    items: [
                        { code: '5.1',   depth: 2, name: '연락처 관리',           route: '/contacts/list',   channels: ['COMMON'], description: '연락처 CRUD, 검색/필터, 그룹 매핑, CSV 업로드/다운로드' },
                        { code: '5.1.1', depth: 3, name: '연락처 추가/변경 PU',   route: '/contacts/list',   channels: ['COMMON'], description: '연락처 추가/수정 팝업 (이름/번호/이메일/메모)' },
                        { code: '5.1.2', depth: 3, name: '연락처 삭제 확인 PU',   route: '/contacts/list',   channels: ['COMMON'], description: '연락처 삭제 확인 팝업' },
                        { code: '5.1.3', depth: 3, name: '다운로드 요청 PU',      route: '/contacts/list',   channels: ['COMMON'], description: '연락처 다운로드 요청 팝업' },
                        { code: '5.1.4', depth: 3, name: '다운로드 요청 목록 PU', route: '/contacts/list',   channels: ['COMMON'], description: '다운로드 요청 목록 팝업' },

                        { code: '5.2',   depth: 2, name: '그룹 관리',             route: '/contacts/groups', channels: ['COMMON'], description: '그룹 CRUD, 그룹 내 연락처 추가/제외' },
                        { code: '5.2.1', depth: 3, name: '그룹 추가 PU',          route: '/contacts/groups', channels: ['COMMON'], description: '그룹 신규 추가 팝업' },
                        { code: '5.2.2', depth: 3, name: '그룹 이름 변경 PU',     route: '/contacts/groups', channels: ['COMMON'], description: '그룹 이름 변경 팝업' },
                        { code: '5.2.3', depth: 3, name: '그룹 삭제 확인 PU',     route: '/contacts/groups', channels: ['COMMON'], description: '그룹 삭제 확인 팝업' },
                        { code: '5.2.4', depth: 3, name: '그룹 연락처 추가 PU',   route: '/contacts/groups', channels: ['COMMON'], description: '그룹에 연락처 일괄 추가 팝업' },
                        { code: '5.2.5', depth: 3, name: '다운로드 요청 목록 PU', route: '/contacts/groups', channels: ['COMMON'], description: '다운로드 요청 목록 팝업' },

                        { code: '5.3',   depth: 2, name: '수신 거부 관리',        route: '/contacts/optout', channels: ['COMMON'], description: '수신거부 번호/이메일 등록·해제, 통합 DB 조회' },
                        { code: '5.3.1', depth: 3, name: '수신거부 추가 PU',      route: '/contacts/optout', channels: ['COMMON'], description: '수신거부 번호/이메일 수동 추가 팝업' },
                        { code: '5.3.2', depth: 3, name: '취소 확인 PU',          route: '/contacts/optout', channels: ['COMMON'], description: '수신거부 해제 확인 팝업' },
                        { code: '5.3.3', depth: 3, name: '다운로드 요청 PU',      route: '/contacts/optout', channels: ['COMMON'], description: '수신거부 목록 다운로드 요청 팝업' },
                        { code: '5.3.4', depth: 3, name: '다운로드 요청 목록 PU', route: '/contacts/optout', channels: ['COMMON'], description: '다운로드 요청 목록 팝업' }
                    ]
                },
                {
                    id: 6,
                    name: '발신 정보',
                    items: [
                        { code: '6.1',   depth: 2, name: '발신 번호 관리',         route: '/sender/numbers',     channels: ['SMS'],   description: '발신번호 등록(서류 인증) / 검수 상태 / 사용 채널' },
                        { code: '6.1.1', depth: 3, name: '개인정보 수집 동의 PU',  route: '/sender/numbers',     channels: ['SMS'],   description: '서류 등록 전 필수 개인정보 수집 동의 팝업' },
                        { code: '6.1.2', depth: 3, name: '발신 정보 등록 PU',       route: '/sender/numbers',     channels: ['SMS'],   description: '번호 등록 + 서류 첨부 + 인증 팝업' },
                        { code: '6.1.3', depth: 3, name: '삭제 확인 PU',            route: '/sender/numbers',     channels: ['SMS'],   description: '발신번호 삭제 확인 팝업' },
                        { code: '6.1.4', depth: 3, name: '등록 안내 PU',            route: '/sender/numbers',     channels: ['SMS'],   description: '신규 발신번호 등록 절차 안내 팝업' },

                        { code: '6.2',   depth: 2, name: '브랜드 관리(RCS)',       route: '/sender/brands',      channels: ['RCS'],   description: 'RCS 브랜드 등록·연결, 통신사 검수 상태' },
                        { code: '6.2.1', depth: 3, name: '연결 확인 PU',            route: '/sender/brands',      channels: ['RCS'],   description: '브랜드 연결 확인 팝업' },
                        { code: '6.2.2', depth: 3, name: '연결 완료 PU',            route: '/sender/brands',      channels: ['RCS'],   description: '브랜드 연결 완료 안내 팝업' },

                        { code: '6.3',   depth: 2, name: '도메인 관리(이메일)',     route: '/sender/domains',     channels: ['EMAIL'], description: '발신 도메인 등록, 소유 인증, DKIM/SPF 검증' },
                        { code: '6.3.1', depth: 3, name: '도메인 등록 PU',          route: '/sender/domains',     channels: ['EMAIL'], description: '도메인 등록 + 소유 인증 팝업' },
                        { code: '6.3.2', depth: 3, name: 'DKIM 설정 PU',            route: '/sender/domains',     channels: ['EMAIL'], description: 'DKIM TXT 레코드 안내·검증 팝업' },
                        { code: '6.3.3', depth: 3, name: '삭제 확인 PU',            route: '/sender/domains',     channels: ['EMAIL'], description: '도메인 삭제 확인 팝업' },

                        { code: '6.4',   depth: 2, name: 'PUSH 인증 관리',         route: '/sender/push-cert',   channels: ['PUSH'],  description: 'FCM 서비스 키 / APNs 인증서(p8/p12) 등록·만료 알림' },
                        { code: '6.4.1', depth: 3, name: '결과 알림 PU',            route: '/sender/push-cert',   channels: ['PUSH'],  description: '인증서 등록 결과 안내 팝업' },

                        { code: '6.5',   depth: 2, name: '발신 프로필 관리(카카오)', route: '/sender/profiles',    channels: ['KAKAO'], description: '카카오 비즈채널/발신 프로필 등록, 그룹 매핑' },
                        { code: '6.5.1', depth: 3, name: '발신프로필 등록 PU',     route: '/sender/profiles',    channels: ['KAKAO'], description: '비즈채널 ID/토큰 등록 팝업' },
                        { code: '6.5.2', depth: 3, name: '그룹 관리 PU',            route: '/sender/profiles',    channels: ['KAKAO'], description: '발신 프로필 그룹 관리 팝업' },
                        { code: '6.5.3', depth: 3, name: '삭제 확인 PU',            route: '/sender/profiles',    channels: ['KAKAO'], description: '프로필 삭제 확인 팝업' },
                        { code: '6.5.4', depth: 3, name: '토큰 발송 알림 PU',       route: '/sender/profiles',    channels: ['KAKAO'], description: '인증 토큰 발송 안내 팝업' },

                        { code: '6.6',   depth: 2, name: '080 수신 거부 번호 관리', route: '/sender/optout-080',  channels: ['SMS'],   description: '080 회선 신청·발급·회수' },
                        { code: '6.6.1', depth: 3, name: '080 신청 PU',             route: '/sender/optout-080',  channels: ['SMS'],   description: '080 수신거부 번호 신청 팝업' },
                        { code: '6.6.2', depth: 3, name: '취소 확인 PU',            route: '/sender/optout-080',  channels: ['SMS'],   description: '신청 취소 확인 팝업' }
                    ]
                },
                {
                    id: 7,
                    name: '메시지관리(템플릿)',
                    items: [
                        { code: '7.1',    depth: 2, name: '문자메시지 템플릿',     route: '/manage/sms',      channels: ['SMS'],   description: 'SMS/LMS/MMS 템플릿 카테고리·CRUD, AI 생성, 광고성 검사' },
                        { code: '7.1.1',  depth: 3, name: '카테고리 추가 PU',      route: '/manage/sms',      channels: ['SMS'],   description: '카테고리 추가 팝업' },
                        { code: '7.1.2',  depth: 3, name: '카테고리 이름 수정 PU', route: '/manage/sms',      channels: ['SMS'],   description: '카테고리 이름 수정 팝업' },
                        { code: '7.1.3',  depth: 3, name: '광고 수신 알림 PU',     route: '/manage/sms',      channels: ['SMS'],   description: '광고성 표기 의무 안내 팝업' },
                        { code: '7.1.4',  depth: 3, name: '템플릿 상세 보기 PU',   route: '/manage/sms',      channels: ['SMS'],   description: '템플릿 상세 + 미리보기 팝업' },
                        { code: '7.1.5',  depth: 3, name: '샘플 템플릿 PU',        route: '/manage/sms',      channels: ['SMS'],   description: '운영자 제공 샘플 템플릿 보기·복사 팝업' },
                        { code: '7.1.6',  depth: 3, name: 'AI 템플릿 PU',          route: '/manage/sms',      channels: ['SMS'],   description: 'AI 자동 생성(프롬프트→문구) 팝업' },
                        { code: '7.1.7',  depth: 3, name: '삭제 확인 PU',          route: '/manage/sms',      channels: ['SMS'],   description: '템플릿 삭제 확인 팝업' },
                        { code: '7.1.8',  depth: 3, name: '알림 PU',               route: '/manage/sms',      channels: ['SMS'],   description: '저장/한도 등 알림 메시지 팝업' },

                        { code: '7.2',    depth: 2, name: '알림톡 템플릿',         route: '/manage/kakao',    channels: ['KAKAO'], description: '알림톡 템플릿 CRUD + 카카오 검수 연동, 버튼/바로연결/아이템리스트' },
                        { code: '7.2.1',  depth: 3, name: '카테고리 추가 PU',      route: '/manage/kakao',    channels: ['KAKAO'], description: '카테고리 추가 팝업' },
                        { code: '7.2.2',  depth: 3, name: '카테고리 이름 수정 PU', route: '/manage/kakao',    channels: ['KAKAO'], description: '카테고리 이름 수정 팝업' },
                        { code: '7.2.3',  depth: 3, name: '대표 링크 PU',          route: '/manage/kakao',    channels: ['KAKAO'], description: '템플릿 대표 링크 설정 팝업' },
                        { code: '7.2.4',  depth: 3, name: '버튼 PU',               route: '/manage/kakao',    channels: ['KAKAO'], description: '알림톡 버튼(웹/앱링크/배송조회 등) 추가 팝업' },
                        { code: '7.2.5',  depth: 3, name: '바로 연결 PU',          route: '/manage/kakao',    channels: ['KAKAO'], description: '바로 연결 설정 팝업' },
                        { code: '7.2.6',  depth: 3, name: '아이템 리스트 PU',      route: '/manage/kakao',    channels: ['KAKAO'], description: '아이템 리스트(상품/주문) 설정 팝업' },
                        { code: '7.2.7',  depth: 3, name: '템플릿 상세 보기 PU',   route: '/manage/kakao',    channels: ['KAKAO'], description: '템플릿 상세 + 미리보기 팝업' },
                        { code: '7.2.8',  depth: 3, name: '샘플 템플릿 PU',        route: '/manage/kakao',    channels: ['KAKAO'], description: '샘플 템플릿 보기·복사 팝업' },
                        { code: '7.2.9',  depth: 3, name: 'AI 템플릿 PU',          route: '/manage/kakao',    channels: ['KAKAO'], description: 'AI 자동 생성 팝업' },
                        { code: '7.2.10', depth: 3, name: '삭제 확인 PU',          route: '/manage/kakao',    channels: ['KAKAO'], description: '템플릿 삭제 확인 팝업' },
                        { code: '7.2.11', depth: 3, name: '알림 PU',               route: '/manage/kakao',    channels: ['KAKAO'], description: '검수 상태/알림 메시지 팝업' },

                        { code: '7.3',    depth: 2, name: 'RCS 템플릿',            route: '/manage/rcs',      channels: ['RCS'],   description: 'RCS 템플릿 CRUD + 통신사 검수 연동, 버튼' },
                        { code: '7.3.1',  depth: 3, name: '카테고리 추가 PU',      route: '/manage/rcs',      channels: ['RCS'],   description: '카테고리 추가 팝업' },
                        { code: '7.3.2',  depth: 3, name: '카테고리 이름 수정 PU', route: '/manage/rcs',      channels: ['RCS'],   description: '카테고리 이름 수정 팝업' },
                        { code: '7.3.3',  depth: 3, name: '버튼 PU',               route: '/manage/rcs',      channels: ['RCS'],   description: 'RCS 버튼 추가/편집 팝업' },
                        { code: '7.3.4',  depth: 3, name: '템플릿 상세 보기 PU',   route: '/manage/rcs',      channels: ['RCS'],   description: '템플릿 상세 + 미리보기 팝업' },
                        { code: '7.3.5',  depth: 3, name: '샘플 템플릿 PU',        route: '/manage/rcs',      channels: ['RCS'],   description: '샘플 템플릿 보기·복사 팝업' },
                        { code: '7.3.6',  depth: 3, name: 'AI 템플릿 PU',          route: '/manage/rcs',      channels: ['RCS'],   description: 'AI 자동 생성 팝업' },
                        { code: '7.3.7',  depth: 3, name: '삭제 확인 PU',          route: '/manage/rcs',      channels: ['RCS'],   description: '템플릿 삭제 확인 팝업' },
                        { code: '7.3.8',  depth: 3, name: '알림 PU',               route: '/manage/rcs',      channels: ['RCS'],   description: '검수 상태/알림 메시지 팝업' },

                        { code: '7.4',    depth: 2, name: '이메일 템플릿',         route: '/manage/email',    channels: ['EMAIL'], description: '이메일 템플릿 CRUD, AI 생성, 광고성 검사' },
                        { code: '7.4.1',  depth: 3, name: '카테고리 추가 PU',      route: '/manage/email',    channels: ['EMAIL'], description: '카테고리 추가 팝업' },
                        { code: '7.4.2',  depth: 3, name: '카테고리 이름 수정 PU', route: '/manage/email',    channels: ['EMAIL'], description: '카테고리 이름 수정 팝업' },
                        { code: '7.4.3',  depth: 3, name: '광고 수신 알림 PU',     route: '/manage/email',    channels: ['EMAIL'], description: '광고성 표기 의무 안내 팝업' },
                        { code: '7.4.4',  depth: 3, name: '템플릿 상세 보기 PU',   route: '/manage/email',    channels: ['EMAIL'], description: '템플릿 상세 + 미리보기 팝업' },
                        { code: '7.4.5',  depth: 3, name: '샘플 템플릿 PU',        route: '/manage/email',    channels: ['EMAIL'], description: '샘플 템플릿 보기·복사 팝업' },
                        { code: '7.4.6',  depth: 3, name: 'AI 템플릿 PU',          route: '/manage/email',    channels: ['EMAIL'], description: 'AI 자동 생성 팝업' },
                        { code: '7.4.7',  depth: 3, name: '삭제 확인 PU',          route: '/manage/email',    channels: ['EMAIL'], description: '템플릿 삭제 확인 팝업' },
                        { code: '7.4.8',  depth: 3, name: '알림 PU',               route: '/manage/email',    channels: ['EMAIL'], description: '저장/한도 등 알림 메시지 팝업' },

                        { code: '7.5',    depth: 2, name: 'PUSH 템플릿',           route: '/manage/push',     channels: ['PUSH'],  description: '푸시 템플릿 CRUD, OS별 미디어/큰 아이콘/그룹' },
                        { code: '7.5.1',  depth: 3, name: '카테고리 추가 PU',      route: '/manage/push',     channels: ['PUSH'],  description: '카테고리 추가 팝업' },
                        { code: '7.5.2',  depth: 3, name: '카테고리 이름 수정 PU', route: '/manage/push',     channels: ['PUSH'],  description: '카테고리 이름 수정 팝업' },
                        { code: '7.5.3',  depth: 3, name: '버튼 PU',               route: '/manage/push',     channels: ['PUSH'],  description: '푸시 액션 버튼 편집 팝업' },
                        { code: '7.5.4',  depth: 3, name: '미디어(공통) PU',       route: '/manage/push',     channels: ['PUSH'],  description: '공통 미디어 첨부 팝업' },
                        { code: '7.5.5',  depth: 3, name: '미디어(Android) PU',    route: '/manage/push',     channels: ['PUSH'],  description: 'Android 전용 미디어 첨부 팝업' },
                        { code: '7.5.6',  depth: 3, name: '미디어(iOS) PU',        route: '/manage/push',     channels: ['PUSH'],  description: 'iOS 전용 미디어 첨부 팝업' },
                        { code: '7.5.7',  depth: 3, name: 'Android 큰 아이콘 PU',  route: '/manage/push',     channels: ['PUSH'],  description: 'Android 큰 아이콘 첨부 팝업' },
                        { code: '7.5.8',  depth: 3, name: '그룹 PU',               route: '/manage/push',     channels: ['PUSH'],  description: '발송 그룹 설정 팝업' },
                        { code: '7.5.9',  depth: 3, name: '템플릿 상세 보기 PU',   route: '/manage/push',     channels: ['PUSH'],  description: '템플릿 상세 + 미리보기 팝업' },
                        { code: '7.5.10', depth: 3, name: '샘플 템플릿 PU',        route: '/manage/push',     channels: ['PUSH'],  description: '샘플 템플릿 보기·복사 팝업' },
                        { code: '7.5.11', depth: 3, name: 'AI 템플릿 PU',          route: '/manage/push',     channels: ['PUSH'],  description: 'AI 자동 생성 팝업' },
                        { code: '7.5.12', depth: 3, name: '삭제 확인 PU',          route: '/manage/push',     channels: ['PUSH'],  description: '템플릿 삭제 확인 팝업' },
                        { code: '7.5.13', depth: 3, name: '알림 PU',               route: '/manage/push',     channels: ['PUSH'],  description: '저장/한도 등 알림 메시지 팝업' },

                        { code: '7.6',    depth: 2, name: '상세 설정',             route: '/manage/settings', channels: ['MULTI'], description: '발송 공통 옵션, 대체 문자, 광고성 표기, 변수 기본값' },
                        { code: '7.6.1',  depth: 3, name: '알림 PU',               route: '/manage/settings', channels: ['MULTI'], description: '저장 결과 알림 메시지 팝업' },
                        { code: '7.6.2',  depth: 3, name: '대체 문자 설정 PU',     route: '/manage/settings', channels: ['MULTI'], description: '알림톡 실패 시 SMS 대체 문자 설정 팝업' }
                    ]
                },
                {
                    id: 8,
                    name: '캠페인 관리',
                    items: [
                        { code: '8.1',    depth: 2, name: '캠페인 관리',          route: '/campaign',  channels: ['MULTI'], description: '목록/통계 카드/검색 + 캠페인 생성·수정(수신자/채널/메시지/발송시점/시뮬레이션)' },
                        { code: '8.1.1',  depth: 3, name: '설문폼 추가 PU',        route: '/campaign',  channels: ['MULTI'], description: '설문폼 복수 선택 팝업' },
                        { code: '8.1.2',  depth: 3, name: '테스트 발송 PU',        route: '/campaign',  channels: ['MULTI'], description: '테스트 발송 채널 선택 + 차감 크레딧 안내 팝업' },
                        { code: '8.1.3',  depth: 3, name: '발송 컨펌 PU',          route: '/campaign',  channels: ['MULTI'], description: '수신자 수/크레딧 차감/예약시간 확인 팝업' },
                        { code: '8.1.4',  depth: 3, name: '크레딧 부족 PU',        route: '/campaign',  channels: ['MULTI'], description: '크레딧 부족 시 충전 페이지 유도 팝업' },
                        { code: '8.1.5',  depth: 3, name: '필수 정보 미입력 알림 PU', route: '/campaign', channels: ['MULTI'], description: '필수 정보 미입력 항목 안내 팝업' },
                        { code: '8.1.6',  depth: 3, name: '예약 재발송 PU',        route: '/campaign',  channels: ['MULTI'], description: '예약 대기 중 재발송 안내 팝업' },
                        { code: '8.1.7',  depth: 3, name: '발송 완료 복제 PU',     route: '/campaign',  channels: ['MULTI'], description: '발송 완료된 캠페인 복제 안내 팝업' },
                        { code: '8.1.8',  depth: 3, name: '대기 중 캠페인 중지 PU', route: '/campaign', channels: ['MULTI'], description: '대기 중 캠페인 중지 컨펌 팝업' },
                        { code: '8.1.9',  depth: 3, name: '진행 중 캠페인 중지 PU', route: '/campaign', channels: ['MULTI'], description: '진행 중 캠페인 중지 컨펌 팝업' },
                        { code: '8.1.10', depth: 3, name: '복사 확인 PU',           route: '/campaign',  channels: ['MULTI'], description: '캠페인 복사 확인 팝업' },
                        { code: '8.1.11', depth: 3, name: '삭제 확인 PU',           route: '/campaign',  channels: ['MULTI'], description: '캠페인 삭제 확인 팝업' },

                        { code: '8.2',    depth: 2, name: '캠페인 관리 (변형 v3)', route: '/campaign3', channels: ['MULTI'], description: '캠페인 관리 디자인 검토용 변형 페이지' }
                    ]
                },
                {
                    id: 9,
                    name: '충전/크레딧',
                    items: [
                        { code: '9.1',   depth: 2, name: '크레딧 충전',         route: '/charge',         channels: ['COMMON'], description: '크레딧 패키지 선택 + 카드 결제(토스페이먼츠) 또는 계좌이체' },
                        { code: '9.1.1', depth: 3, name: '카드 추가 PU',         route: '/charge',         channels: ['COMMON'], description: '결제 카드 등록 팝업' },
                        { code: '9.1.2', depth: 3, name: '결제 확인 PU',         route: '/charge',         channels: ['COMMON'], description: '최종 결제 금액·카드 확인 팝업' },

                        { code: '9.2',   depth: 2, name: '충전 결과',           route: '/charge/result',  channels: ['COMMON'], description: '결제 성공/실패 결과 안내 페이지' },

                        { code: '9.3',   depth: 2, name: '크레딧 내역',         route: '/account/credit', channels: ['COMMON'], description: '충전/사용/취소 내역, 영수증 발급, 결제 취소' },
                        { code: '9.3.1', depth: 3, name: '영수증 PU',           route: '/account/credit', channels: ['COMMON'], description: '카드 매출전표(영수증) 보기 팝업' },
                        { code: '9.3.2', depth: 3, name: '크레딧 상세내용 PU',  route: '/account/credit', channels: ['COMMON'], description: '크레딧 사용 상세(어떤 발송에 사용되었는지) 팝업' },
                        { code: '9.3.3', depth: 3, name: '취소 확인 PU',         route: '/account/credit', channels: ['COMMON'], description: '결제 취소 확인 팝업' },
                        { code: '9.3.4', depth: 3, name: '취소 완료 PU',         route: '/account/credit', channels: ['COMMON'], description: '결제 취소 완료 안내 팝업' }
                    ]
                },
                {
                    id: 10,
                    name: '문의/지원',
                    items: [
                        { code: '10.1',   depth: 2, name: '1:1 문의 작성',     route: '/inquiry',                  channels: ['COMMON'], description: '카테고리/제목/내용/첨부파일로 1:1 문의 등록' },
                        { code: '10.1.1', depth: 3, name: '파일 오류 알림 PU', route: '/inquiry',                  channels: ['COMMON'], description: '첨부파일 형식/용량 오류 안내 팝업' },

                        { code: '10.2',   depth: 2, name: '문의 접수 완료',    route: '/inquiry/complete',         channels: ['COMMON'], description: '문의 접수 완료 안내 페이지' },

                        { code: '10.3',   depth: 2, name: '문의 내역',         route: '/account/inquiries',        channels: ['COMMON'], description: '내가 등록한 1:1 문의 목록 (상태/카테고리 필터)' },
                        { code: '10.3.1', depth: 3, name: '삭제 확인 PU',      route: '/account/inquiries',        channels: ['COMMON'], description: '문의 삭제 확인 팝업' },

                        { code: '10.4',   depth: 2, name: '문의 내역 상세',    route: '/account/inquiries/detail', channels: ['COMMON'], description: '문의 본문 + 운영자 답변 보기' },
                        { code: '10.4.1', depth: 3, name: '삭제 확인 PU',      route: '/account/inquiries/detail', channels: ['COMMON'], description: '문의 삭제 확인 팝업' }
                    ]
                },
                {
                    id: 11,
                    name: '계정관리',
                    items: [
                        { code: '11.1',   depth: 2, name: '계정 설정',     route: '/account/settings', channels: ['COMMON'], description: '회원 정보, 결제 이메일, 전자 서명, 비밀번호 변경' },
                        { code: '11.1.1', depth: 3, name: '알림 PU',        route: '/account/settings', channels: ['COMMON'], description: '저장 결과 알림 메시지 팝업' },
                        { code: '11.1.2', depth: 3, name: '서명 등록 PU',   route: '/account/settings', channels: ['COMMON'], description: '전자 서명 등록(드로잉/이미지 업로드) 팝업' },
                        { code: '11.1.3', depth: 3, name: '문서 뷰어 PU',   route: '/account/settings', channels: ['COMMON'], description: '계약서/약관 문서 뷰어 팝업' },
                        { code: '11.1.4', depth: 3, name: '확인 PU',        route: '/account/settings', channels: ['COMMON'], description: '저장/변경 확인 메시지 팝업' }
                    ]
                },
                {
                    id: 12,
                    name: '시스템/템플릿 페이지',
                    items: [
                        { code: '12.1', depth: 2, name: '에러 - 시스템 오류',     route: '/templete/error/system',         channels: ['COMMON'], description: '서버 500 등 시스템 오류 안내 페이지' },
                        { code: '12.2', depth: 2, name: '에러 - 페이지 없음',     route: '/templete/error/not-found',      channels: ['COMMON'], description: '404 Not Found 안내 페이지' },
                        { code: '12.3', depth: 2, name: '에러 - 네트워크 오류',   route: '/templete/error/network',        channels: ['COMMON'], description: '네트워크 단절/타임아웃 안내 페이지' },
                        { code: '12.4', depth: 2, name: '404 페이지 (단독)',      route: '/404',                           channels: ['COMMON'], description: '쏠쏠 브랜드 404 단독 페이지 (layout 없음)' },
                        { code: '12.5', depth: 2, name: '에러 페이지 (단독)',     route: '/error',                         channels: ['COMMON'], description: '쏠쏠 브랜드 시스템 에러 단독 페이지 (layout 없음)' },
                        { code: '12.6', depth: 2, name: '점검 - 긴급 점검',       route: '/templete/inspection/emergency', channels: ['COMMON'], description: '긴급 점검 안내 페이지' },
                        { code: '12.7', depth: 2, name: '점검 - 정기 점검',       route: '/templete/inspection/scheduled', channels: ['COMMON'], description: '정기 점검 안내 페이지' },
                        { code: '12.8', depth: 2, name: '메일 - 이메일 인증',     route: '/templete/email/verify',         channels: ['EMAIL'],  description: '이메일 인증 메일 템플릿 (운영자 발송용)' },
                        { code: '12.9', depth: 2, name: '메일 - 비밀번호 재설정', route: '/templete/email/reset-password', channels: ['EMAIL'],  description: '비밀번호 재설정 메일 템플릿 (운영자 발송용)' }
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
        getChannelName(code) {
            const ch = this.channelOptions.find(c => c.code === code);
            return ch ? ch.name : code;
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
                const el = document.getElementById('sm-cat-' + catId);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        },
        goRoute(route) {
            if (!route) return;
            this.navigateTo(route);
        }
    }
};
