export default {
    layout: 'default',
    data() {
        return {
            search: '',
            baseUrl: 'https://malgn-notifications.pages.dev',
            categories: [
                {
                    title: '1. 메인',
                    items: [
                        { type: 'Page', name: '홈', path: '/home' }
                    ]
                },
                {
                    title: '2. 인증',
                    items: [
                        { type: 'Page', name: '회원가입', path: '/signup' },
                        { type: 'PU', name: '회원가입 - OTP 인증 알림', path: '/signup' },
                        { type: 'PU', name: '회원가입 - 휴대폰 인증 알림', path: '/signup' },
                        { type: 'PU', name: '회원가입 - 이용약관', path: '/signup' },
                        { type: 'Page', name: '로그인', path: '/login' },
                        { type: 'Page', name: '로그인 보안 인증', path: '/login/security' },
                        { type: 'PU', name: '로그인 보안 - 인증코드 알림', path: '/login/security' },
                        { type: 'Page', name: '비밀번호 재설정 (요청)', path: '/reset-password' },
                        { type: 'PU', name: '비밀번호 재설정 - 메일 발송 완료', path: '/reset-password' },
                        { type: 'Page', name: '비밀번호 재설정 (신규 입력)', path: '/reset-password/new' },
                        { type: 'PU', name: '비밀번호 재설정 - 완료 알림', path: '/reset-password/new' }
                    ]
                },
                {
                    title: '3. 충전 / 결제',
                    items: [
                        { type: 'Page', name: '크레딧 충전', path: '/charge' },
                        { type: 'PU', name: '충전 - 카드 추가', path: '/charge' },
                        { type: 'PU', name: '충전 - 결제 확인', path: '/charge' },
                        { type: 'Page', name: '충전 결과', path: '/charge/result' }
                    ]
                },
                {
                    title: '4. 문의',
                    items: [
                        { type: 'Page', name: '1:1 문의 작성', path: '/inquiry' },
                        { type: 'PU', name: '문의 - 파일 오류 알림', path: '/inquiry' },
                        { type: 'Page', name: '문의 접수 완료', path: '/inquiry/complete' }
                    ]
                },
                {
                    title: '5. 마이페이지 / 계정',
                    items: [
                        { type: 'Page', name: '문의 내역', path: '/account/inquiries' },
                        { type: 'PU', name: '문의 내역 - 삭제 확인', path: '/account/inquiries' },
                        { type: 'Page', name: '문의 내역 상세', path: '/account/inquiries/detail' },
                        { type: 'PU', name: '문의 상세 - 삭제 확인', path: '/account/inquiries/detail' },
                        { type: 'Page', name: '크레딧 내역', path: '/account/credit' },
                        { type: 'PU', name: '크레딧 - 영수증', path: '/account/credit' },
                        { type: 'PU', name: '크레딧 - 크레딧 상세내용', path: '/account/credit' },
                        { type: 'PU', name: '크레딧 - 취소 확인', path: '/account/credit' },
                        { type: 'PU', name: '크레딧 - 취소 완료', path: '/account/credit' },
                        { type: 'Page', name: '계정 설정', path: '/account/settings' },
                        { type: 'PU', name: '계정 설정 - 알림', path: '/account/settings' },
                        { type: 'PU', name: '계정 설정 - 확인', path: '/account/settings' }
                    ]
                },
                {
                    title: '6. 연락처',
                    items: [
                        { type: 'Page', name: '연락처 목록', path: '/contacts/list' },
                        { type: 'PU', name: '연락처 - 추가/변경', path: '/contacts/list' },
                        { type: 'PU', name: '연락처 - 삭제 확인', path: '/contacts/list' },
                        { type: 'PU', name: '연락처 - 다운로드 요청', path: '/contacts/list' },
                        { type: 'PU', name: '연락처 - 다운로드 요청 목록', path: '/contacts/list' },
                        { type: 'Page', name: '연락처 그룹', path: '/contacts/groups' },
                        { type: 'PU', name: '그룹 - 추가', path: '/contacts/groups' },
                        { type: 'PU', name: '그룹 - 이름 변경', path: '/contacts/groups' },
                        { type: 'PU', name: '그룹 - 삭제 확인', path: '/contacts/groups' },
                        { type: 'PU', name: '그룹 - 연락처 추가', path: '/contacts/groups' },
                        { type: 'PU', name: '그룹 - 다운로드 요청 목록', path: '/contacts/groups' },
                        { type: 'Page', name: '수신거부 관리', path: '/contacts/optout' },
                        { type: 'PU', name: '수신거부 - 추가', path: '/contacts/optout' },
                        { type: 'PU', name: '수신거부 - 취소 확인', path: '/contacts/optout' },
                        { type: 'PU', name: '수신거부 - 다운로드 요청', path: '/contacts/optout' },
                        { type: 'PU', name: '수신거부 - 다운로드 요청 목록', path: '/contacts/optout' }
                    ]
                },
                {
                    title: '7. 발신 정보',
                    items: [
                        { type: 'Page', name: '발신번호 관리', path: '/sender/numbers' },
                        { type: 'PU', name: '발신번호 - 개인정보 수집 동의', path: '/sender/numbers' },
                        { type: 'PU', name: '발신번호 - 등록 및 서류 인증', path: '/sender/numbers' },
                        { type: 'PU', name: '발신번호 - 삭제 확인', path: '/sender/numbers' },
                        { type: 'PU', name: '발신번호 - 등록 안내', path: '/sender/numbers' },
                        { type: 'Page', name: '알림톡 발신프로필', path: '/sender/profiles' },
                        { type: 'PU', name: '발신프로필 - 등록', path: '/sender/profiles' },
                        { type: 'PU', name: '발신프로필 - 그룹 관리', path: '/sender/profiles' },
                        { type: 'PU', name: '발신프로필 - 삭제 확인', path: '/sender/profiles' },
                        { type: 'PU', name: '발신프로필 - 토큰 발송 알림', path: '/sender/profiles' },
                        { type: 'Page', name: 'RCS 브랜드', path: '/sender/brands' },
                        { type: 'PU', name: '브랜드 - 연결 확인', path: '/sender/brands' },
                        { type: 'PU', name: '브랜드 - 연결 완료', path: '/sender/brands' },
                        { type: 'Page', name: '이메일 도메인', path: '/sender/domains' },
                        { type: 'PU', name: '도메인 - 등록', path: '/sender/domains' },
                        { type: 'PU', name: '도메인 - DKIM 설정', path: '/sender/domains' },
                        { type: 'PU', name: '도메인 - 삭제 확인', path: '/sender/domains' },
                        { type: 'Page', name: '푸시 인증서', path: '/sender/push-cert' },
                        { type: 'PU', name: '푸시 인증서 - 결과 알림', path: '/sender/push-cert' },
                        { type: 'Page', name: '080 수신거부 번호', path: '/sender/optout-080' },
                        { type: 'PU', name: '080 - 신청', path: '/sender/optout-080' },
                        { type: 'PU', name: '080 - 취소 확인', path: '/sender/optout-080' }
                    ]
                },
                {
                    title: '8. 발송',
                    items: [
                        { type: 'Page', name: 'SMS 발송', path: '/send/sms' },
                        { type: 'PU', name: 'SMS - 샘플 템플릿 선택', path: '/send/sms' },
                        { type: 'PU', name: 'SMS - 수신자 정보', path: '/send/sms' },
                        { type: 'PU', name: 'SMS - 수신자 선택', path: '/send/sms' },
                        { type: 'PU', name: 'SMS - 광고 수신 알림', path: '/send/sms' },
                        { type: 'PU', name: 'SMS - 초기화 확인', path: '/send/sms' },
                        { type: 'Page', name: '카카오톡 발송', path: '/send/kakao' },
                        { type: 'PU', name: '카카오 - 템플릿 선택', path: '/send/kakao' },
                        { type: 'PU', name: '카카오 - 수신자 정보', path: '/send/kakao' },
                        { type: 'PU', name: '카카오 - 수신자 선택', path: '/send/kakao' },
                        { type: 'PU', name: '카카오 - 수신자 정보 수정', path: '/send/kakao' },
                        { type: 'PU', name: '카카오 - 초기화 확인', path: '/send/kakao' },
                        { type: 'Page', name: 'RCS 발송', path: '/send/rcs' },
                        { type: 'PU', name: 'RCS - 템플릿 선택', path: '/send/rcs' },
                        { type: 'PU', name: 'RCS - 수신자 정보', path: '/send/rcs' },
                        { type: 'PU', name: 'RCS - 수신자 정보 수정', path: '/send/rcs' },
                        { type: 'PU', name: 'RCS - 수신자 선택', path: '/send/rcs' },
                        { type: 'PU', name: 'RCS - 버튼', path: '/send/rcs' },
                        { type: 'PU', name: 'RCS - 초기화 확인', path: '/send/rcs' },
                        { type: 'Page', name: '이메일 발송', path: '/send/email' },
                        { type: 'PU', name: '이메일 - 템플릿 선택', path: '/send/email' },
                        { type: 'PU', name: '이메일 - 수신자 정보', path: '/send/email' },
                        { type: 'PU', name: '이메일 - 수신자 정보 수정', path: '/send/email' },
                        { type: 'PU', name: '이메일 - 수신자 선택', path: '/send/email' },
                        { type: 'PU', name: '이메일 - 광고 수신 알림', path: '/send/email' },
                        { type: 'PU', name: '이메일 - 초기화 확인', path: '/send/email' },
                        { type: 'Page', name: '푸시 발송', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 템플릿 선택', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 수신자 정보', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 수신자 선택', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 수신자 정보 수정', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 버튼', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 미디어', path: '/send/push' },
                        { type: 'PU', name: '푸시 - Android 큰 아이콘', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 그룹', path: '/send/push' },
                        { type: 'PU', name: '푸시 - 초기화 확인', path: '/send/push' },
                        { type: 'Page', name: 'Flow 발송', path: '/send/flow' },
                        { type: 'PU', name: 'Flow - 매니저', path: '/send/flow' },
                        { type: 'PU', name: 'Flow - 템플릿 선택', path: '/send/flow' },
                        { type: 'PU', name: 'Flow - 수신자 정보', path: '/send/flow' },
                        { type: 'PU', name: 'Flow - 수신자 선택', path: '/send/flow' },
                        { type: 'PU', name: 'Flow - 수신자 정보 수정', path: '/send/flow' },
                        { type: 'PU', name: 'Flow - 초기화 확인', path: '/send/flow' }
                    ]
                },
                {
                    title: '9. 발송 이력',
                    items: [
                        { type: 'Page', name: 'SMS 이력', path: '/history/sms' },
                        { type: 'PU', name: 'SMS 이력 - 일괄 취소', path: '/history/sms' },
                        { type: 'PU', name: 'SMS 이력 - 다운로드 요청', path: '/history/sms' },
                        { type: 'PU', name: 'SMS 이력 - 채널 알림', path: '/history/sms' },
                        { type: 'PU', name: 'SMS 이력 - 템플릿 선택', path: '/history/sms' },
                        { type: 'PU', name: 'SMS 이력 - 다운로드 요청 목록', path: '/history/sms' },
                        { type: 'Page', name: '카카오톡 이력', path: '/history/kakao' },
                        { type: 'PU', name: '카카오 이력 - 일괄 취소', path: '/history/kakao' },
                        { type: 'PU', name: '카카오 이력 - 다운로드 요청', path: '/history/kakao' },
                        { type: 'PU', name: '카카오 이력 - 채널 알림', path: '/history/kakao' },
                        { type: 'PU', name: '카카오 이력 - 템플릿 선택', path: '/history/kakao' },
                        { type: 'PU', name: '카카오 이력 - 다운로드 요청 목록', path: '/history/kakao' },
                        { type: 'Page', name: 'RCS 이력', path: '/history/rcs' },
                        { type: 'PU', name: 'RCS 이력 - 일괄 취소', path: '/history/rcs' },
                        { type: 'PU', name: 'RCS 이력 - 다운로드 요청', path: '/history/rcs' },
                        { type: 'PU', name: 'RCS 이력 - 채널 알림', path: '/history/rcs' },
                        { type: 'PU', name: 'RCS 이력 - 템플릿 선택', path: '/history/rcs' },
                        { type: 'PU', name: 'RCS 이력 - 다운로드 요청 목록', path: '/history/rcs' },
                        { type: 'Page', name: '이메일 이력', path: '/history/email' },
                        { type: 'PU', name: '이메일 이력 - 일괄 취소', path: '/history/email' },
                        { type: 'PU', name: '이메일 이력 - 다운로드 요청', path: '/history/email' },
                        { type: 'PU', name: '이메일 이력 - 채널 알림', path: '/history/email' },
                        { type: 'PU', name: '이메일 이력 - 템플릿 선택', path: '/history/email' },
                        { type: 'PU', name: '이메일 이력 - 다운로드 요청 목록', path: '/history/email' },
                        { type: 'Page', name: '푸시 이력', path: '/history/push' },
                        { type: 'PU', name: '푸시 이력 - 일괄 취소', path: '/history/push' },
                        { type: 'PU', name: '푸시 이력 - 다운로드 요청', path: '/history/push' },
                        { type: 'PU', name: '푸시 이력 - 채널 알림', path: '/history/push' },
                        { type: 'PU', name: '푸시 이력 - 템플릿 선택', path: '/history/push' },
                        { type: 'PU', name: '푸시 이력 - 다운로드 요청 목록', path: '/history/push' },
                        { type: 'Page', name: '발송 통계', path: '/history/stats' }
                    ]
                },
                {
                    title: '10. 템플릿 관리',
                    items: [
                        { type: 'Page', name: 'SMS 템플릿', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 카테고리 추가', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 카테고리 이름 수정', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 광고 수신 알림', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 상세 보기', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 샘플 템플릿', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 삭제 확인', path: '/manage/sms' },
                        { type: 'PU', name: 'SMS 템플릿 - 알림', path: '/manage/sms' },
                        { type: 'Page', name: '카카오톡 템플릿', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 카테고리 추가', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 카테고리 이름 수정', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 대표 링크', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 버튼', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 바로 연결', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 아이템 리스트', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 상세 보기', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 샘플 템플릿', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 삭제 확인', path: '/manage/kakao' },
                        { type: 'PU', name: '카카오 템플릿 - 알림', path: '/manage/kakao' },
                        { type: 'Page', name: 'RCS 템플릿', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 카테고리 추가', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 카테고리 이름 수정', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 버튼', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 상세 보기', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 샘플 템플릿', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 삭제 확인', path: '/manage/rcs' },
                        { type: 'PU', name: 'RCS 템플릿 - 알림', path: '/manage/rcs' },
                        { type: 'Page', name: '이메일 템플릿', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 카테고리 추가', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 카테고리 이름 수정', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 광고 수신 알림', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 상세 보기', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 샘플 템플릿', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 삭제 확인', path: '/manage/email' },
                        { type: 'PU', name: '이메일 템플릿 - 알림', path: '/manage/email' },
                        { type: 'Page', name: '푸시 템플릿', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 카테고리 추가', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 카테고리 이름 수정', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 버튼', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 미디어(공통)', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 미디어(Android)', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 미디어(iOS)', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - Android 큰 아이콘', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 그룹', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 상세 보기', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 샘플 템플릿', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 삭제 확인', path: '/manage/push' },
                        { type: 'PU', name: '푸시 템플릿 - 알림', path: '/manage/push' },
                        { type: 'Page', name: '발송 설정', path: '/manage/settings' },
                        { type: 'PU', name: '발송 설정 - 알림', path: '/manage/settings' },
                        { type: 'PU', name: '발송 설정 - 대체 문자 설정', path: '/manage/settings' }
                    ]
                },
                {
                    title: '11. 시스템 / 템플릿 페이지',
                    items: [
                        { type: 'Page', name: '에러 - 시스템 오류', path: '/templete/error/system' },
                        { type: 'Page', name: '에러 - 페이지 없음', path: '/templete/error/not-found' },
                        { type: 'Page', name: '에러 - 네트워크 오류', path: '/templete/error/network' },
                        { type: 'Page', name: '점검 - 긴급 점검', path: '/templete/inspection/emergency' },
                        { type: 'Page', name: '점검 - 정기 점검', path: '/templete/inspection/scheduled' },
                        { type: 'Page', name: '메일 - 이메일 인증', path: '/templete/email/verify' },
                        { type: 'Page', name: '메일 - 비밀번호 재설정', path: '/templete/email/reset-password' }
                    ]
                }
            ]
        };
    },
    computed: {
        totalPages() {
            return this.categories.reduce((sum, cat) =>
                sum + cat.items.filter(i => i.type === 'Page').length, 0);
        },
        totalPopups() {
            return this.categories.reduce((sum, cat) =>
                sum + cat.items.filter(i => i.type === 'PU').length, 0);
        },
        filteredCategories() {
            const q = this.search.trim().toLowerCase();
            if (!q) return this.categories;
            return this.categories
                .map(cat => ({
                    ...cat,
                    items: cat.items.filter(i =>
                        i.name.toLowerCase().includes(q) ||
                        i.path.toLowerCase().includes(q)
                    )
                }))
                .filter(cat => cat.items.length > 0);
        }
    },
    methods: {
        getFullUrl(path) {
            return `${this.baseUrl}/#${path}`;
        },
        openItem(path) {
            this.navigateTo(path);
        }
    }
};
