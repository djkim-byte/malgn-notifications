export default {
    name: 'Pagelists',
    layout: 'default',
    data() {
        return {
            baseUrl: 'https://malgn-notifications.pages.dev',
            statusMap: {}
        };
    },
    mounted() {
        const saved = localStorage.getItem('pagelists-status');
        if (saved) {
            try {
                this.statusMap = JSON.parse(saved);
            } catch (e) {
                this.statusMap = {};
            }
        }
    },
    computed: {
        pages() {
            return [
                // 홈
                { category: '홈', title: '홈', url: '#/home', description: '메인 랜딩 페이지' },

                // BackOffice
                { category: 'BackOffice', title: 'BackOffice 메뉴 구조', url: '#/backoffice', description: '운영자 BackOffice 메뉴 트리(검색/필터/권한 배지) 시각화' },
                { category: 'BackOffice', title: '사이트맵 & 기능명세 (사용자 서비스)', url: '#/sitemap', description: '맑은message 사용자 서비스 메뉴 트리 + 기능명세 (검색/필터/채널 배지) 시각화' },

                // 메시지 발송
                { category: '메시지 발송', title: '문자메시지 발송', url: '#/send/sms', description: '문자(SMS/LMS/MMS) 발송 폼' },
                { category: '메시지 발송', title: '샘플 템플릿 선택 PU', url: '#/send/sms', description: '저장된 샘플 템플릿 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 PU', url: '#/send/sms', description: '수신자 정보 입력/추가 팝업' },
                { category: '메시지 발송', title: '수신자 선택 PU', url: '#/send/sms', description: '주소록에서 수신자 선택 팝업' },
                { category: '메시지 발송', title: '광고 수신 알림 PU', url: '#/send/sms', description: '광고 수신 동의 안내 팝업' },
                { category: '메시지 발송', title: '발송 컨펌 PU', url: '#/send/sms', description: '발송 확인 컨펌 팝업' },
                { category: '메시지 발송', title: '초기화 확인 PU', url: '#/send/sms', description: '발송 폼 초기화 확인 팝업' },
                { category: '메시지 발송', title: '알림톡 발송', url: '#/send/kakao', description: '카카오 알림톡 발송 폼' },
                { category: '메시지 발송', title: '템플릿 선택 PU', url: '#/send/kakao', description: '알림톡 템플릿 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 PU', url: '#/send/kakao', description: '수신자 정보 입력 팝업' },
                { category: '메시지 발송', title: '수신자 선택 PU', url: '#/send/kakao', description: '주소록에서 수신자 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 수정 PU', url: '#/send/kakao', description: '수신자 정보 수정 팝업' },
                { category: '메시지 발송', title: '발송 컨펌 PU', url: '#/send/kakao', description: '발송 확인 컨펌 팝업' },
                { category: '메시지 발송', title: '초기화 확인 PU', url: '#/send/kakao', description: '발송 폼 초기화 확인 팝업' },
                { category: '메시지 발송', title: 'RCS 발송', url: '#/send/rcs', description: 'RCS 메시지 발송 폼' },
                { category: '메시지 발송', title: '템플릿 선택 PU', url: '#/send/rcs', description: 'RCS 템플릿 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 PU', url: '#/send/rcs', description: '수신자 정보 입력 팝업' },
                { category: '메시지 발송', title: '수신자 정보 수정 PU', url: '#/send/rcs', description: '수신자 정보 수정 팝업' },
                { category: '메시지 발송', title: '수신자 선택 PU', url: '#/send/rcs', description: '주소록에서 수신자 선택 팝업' },
                { category: '메시지 발송', title: '버튼 PU', url: '#/send/rcs', description: 'RCS 버튼 추가/편집 팝업' },
                { category: '메시지 발송', title: '발송 컨펌 PU', url: '#/send/rcs', description: '발송 확인 컨펌 팝업' },
                { category: '메시지 발송', title: '초기화 확인 PU', url: '#/send/rcs', description: '발송 폼 초기화 확인 팝업' },
                { category: '메시지 발송', title: '이메일 발송', url: '#/send/email-ai', description: '이메일 발송 폼 (AI 문장 다듬기 지원)' },
                { category: '메시지 발송', title: '템플릿 선택 PU', url: '#/send/email-ai', description: '이메일 템플릿 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 PU', url: '#/send/email-ai', description: '수신자 정보 입력 팝업' },
                { category: '메시지 발송', title: '수신자 정보 수정 PU', url: '#/send/email-ai', description: '수신자 정보 수정 팝업' },
                { category: '메시지 발송', title: '수신자 선택 PU', url: '#/send/email-ai', description: '주소록에서 수신자 선택 팝업' },
                { category: '메시지 발송', title: '광고 수신 알림 PU', url: '#/send/email-ai', description: '광고 수신 동의 안내 팝업' },
                { category: '메시지 발송', title: 'AI 문장 다듬기 PU', url: '#/send/email-ai', description: 'AI 문장 다듬기 모달 (대화창 + 미리보기)' },
                { category: '메시지 발송', title: '발송 컨펌 PU', url: '#/send/email-ai', description: '발송 확인 컨펌 팝업' },
                { category: '메시지 발송', title: '초기화 확인 PU', url: '#/send/email-ai', description: '발송 폼 초기화 확인 팝업' },
                { category: '메시지 발송', title: 'PUSH 발송', url: '#/send/push', description: '앱 푸시 발송 폼' },
                { category: '메시지 발송', title: '템플릿 선택 PU', url: '#/send/push', description: '푸시 템플릿 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 PU', url: '#/send/push', description: '수신자 정보 입력 팝업' },
                { category: '메시지 발송', title: '수신자 선택 PU', url: '#/send/push', description: '주소록에서 수신자 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 수정 PU', url: '#/send/push', description: '수신자 정보 수정 팝업' },
                { category: '메시지 발송', title: '버튼 PU', url: '#/send/push', description: '푸시 버튼 추가/편집 팝업' },
                { category: '메시지 발송', title: '미디어 PU', url: '#/send/push', description: '미디어 첨부 팝업' },
                { category: '메시지 발송', title: 'Android 큰 아이콘 PU', url: '#/send/push', description: 'Android 큰 아이콘 첨부 팝업' },
                { category: '메시지 발송', title: '그룹 PU', url: '#/send/push', description: '발송 그룹 선택 팝업' },
                { category: '메시지 발송', title: '발송 컨펌 PU', url: '#/send/push', description: '발송 확인 컨펌 팝업' },
                { category: '메시지 발송', title: '초기화 확인 PU', url: '#/send/push', description: '발송 폼 초기화 확인 팝업' },
                { category: '메시지 발송', title: '복합(플로우) 발송', url: '#/send/flow', description: '여러 채널 복합 발송 플로우' },
                { category: '메시지 발송', title: 'Flow 매니저 PU', url: '#/send/flow', description: '플로우 노드 편집 팝업' },
                { category: '메시지 발송', title: '템플릿 선택 PU', url: '#/send/flow', description: '템플릿 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 PU', url: '#/send/flow', description: '수신자 정보 입력 팝업' },
                { category: '메시지 발송', title: '수신자 선택 PU', url: '#/send/flow', description: '주소록에서 수신자 선택 팝업' },
                { category: '메시지 발송', title: '수신자 정보 수정 PU', url: '#/send/flow', description: '수신자 정보 수정 팝업' },
                { category: '메시지 발송', title: '발송 컨펌 PU', url: '#/send/flow', description: '발송 확인 컨펌 팝업' },
                { category: '메시지 발송', title: '초기화 확인 PU', url: '#/send/flow', description: '발송 폼 초기화 확인 팝업' },

                // 발송 조회/통계
                { category: '발송 조회/통계', title: '문자메시지 발송 조회', url: '#/history/sms', description: 'SMS 발송 이력 조회' },
                { category: '발송 조회/통계', title: '일괄 취소 PU', url: '#/history/sms', description: '예약 발송 일괄 취소 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 PU', url: '#/history/sms', description: '엑셀 다운로드 요청 팝업' },
                { category: '발송 조회/통계', title: '채널 알림 PU', url: '#/history/sms', description: '채널 안내 팝업' },
                { category: '발송 조회/통계', title: '템플릿 선택 PU', url: '#/history/sms', description: '템플릿 비교/선택 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 목록 PU', url: '#/history/sms', description: '다운로드 요청 목록 팝업' },
                { category: '발송 조회/통계', title: '알림톡 발송 조회', url: '#/history/kakao', description: '알림톡 발송 이력 조회' },
                { category: '발송 조회/통계', title: '일괄 취소 PU', url: '#/history/kakao', description: '예약 발송 일괄 취소 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 PU', url: '#/history/kakao', description: '엑셀 다운로드 요청 팝업' },
                { category: '발송 조회/통계', title: '채널 알림 PU', url: '#/history/kakao', description: '채널 안내 팝업' },
                { category: '발송 조회/통계', title: '템플릿 선택 PU', url: '#/history/kakao', description: '템플릿 비교/선택 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 목록 PU', url: '#/history/kakao', description: '다운로드 요청 목록 팝업' },
                { category: '발송 조회/통계', title: 'RCS 발송 조회', url: '#/history/rcs', description: 'RCS 발송 이력 조회' },
                { category: '발송 조회/통계', title: '일괄 취소 PU', url: '#/history/rcs', description: '예약 발송 일괄 취소 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 PU', url: '#/history/rcs', description: '엑셀 다운로드 요청 팝업' },
                { category: '발송 조회/통계', title: '채널 알림 PU', url: '#/history/rcs', description: '채널 안내 팝업' },
                { category: '발송 조회/통계', title: '템플릿 선택 PU', url: '#/history/rcs', description: '템플릿 비교/선택 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 목록 PU', url: '#/history/rcs', description: '다운로드 요청 목록 팝업' },
                { category: '발송 조회/통계', title: '이메일 발송 조회', url: '#/history/email', description: '이메일 발송 이력 조회' },
                { category: '발송 조회/통계', title: '일괄 취소 PU', url: '#/history/email', description: '예약 발송 일괄 취소 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 PU', url: '#/history/email', description: '엑셀 다운로드 요청 팝업' },
                { category: '발송 조회/통계', title: '채널 알림 PU', url: '#/history/email', description: '채널 안내 팝업' },
                { category: '발송 조회/통계', title: '템플릿 선택 PU', url: '#/history/email', description: '템플릿 비교/선택 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 목록 PU', url: '#/history/email', description: '다운로드 요청 목록 팝업' },
                { category: '발송 조회/통계', title: 'PUSH 발송 조회', url: '#/history/push', description: '푸시 발송 이력 조회' },
                { category: '발송 조회/통계', title: '일괄 취소 PU', url: '#/history/push', description: '예약 발송 일괄 취소 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 PU', url: '#/history/push', description: '엑셀 다운로드 요청 팝업' },
                { category: '발송 조회/통계', title: '채널 알림 PU', url: '#/history/push', description: '채널 안내 팝업' },
                { category: '발송 조회/통계', title: '템플릿 선택 PU', url: '#/history/push', description: '템플릿 비교/선택 팝업' },
                { category: '발송 조회/통계', title: '다운로드 요청 목록 PU', url: '#/history/push', description: '다운로드 요청 목록 팝업' },
                { category: '발송 조회/통계', title: '통계', url: '#/history/stats', description: '발송 통계 대시보드' },

                // 주소록
                { category: '주소록', title: '연락처 관리', url: '#/contacts/list', description: '연락처 목록 + CRUD' },
                { category: '주소록', title: '연락처 추가/변경 PU', url: '#/contacts/list', description: '연락처 추가/수정 팝업' },
                { category: '주소록', title: '연락처 삭제 확인 PU', url: '#/contacts/list', description: '연락처 삭제 확인 팝업' },
                { category: '주소록', title: '다운로드 요청 PU', url: '#/contacts/list', description: '연락처 다운로드 요청 팝업' },
                { category: '주소록', title: '다운로드 요청 목록 PU', url: '#/contacts/list', description: '다운로드 요청 목록 팝업' },
                { category: '주소록', title: '그룹 관리', url: '#/contacts/groups', description: '연락처 그룹 관리' },
                { category: '주소록', title: '그룹 추가 PU', url: '#/contacts/groups', description: '그룹 추가 팝업' },
                { category: '주소록', title: '그룹 이름 변경 PU', url: '#/contacts/groups', description: '그룹 이름 변경 팝업' },
                { category: '주소록', title: '그룹 삭제 확인 PU', url: '#/contacts/groups', description: '그룹 삭제 확인 팝업' },
                { category: '주소록', title: '그룹 연락처 추가 PU', url: '#/contacts/groups', description: '그룹에 연락처 추가 팝업' },
                { category: '주소록', title: '다운로드 요청 목록 PU', url: '#/contacts/groups', description: '다운로드 요청 목록 팝업' },
                { category: '주소록', title: '수신 거부 관리', url: '#/contacts/optout', description: '수신 거부 번호 관리' },
                { category: '주소록', title: '수신거부 추가 PU', url: '#/contacts/optout', description: '수신거부 번호 추가 팝업' },
                { category: '주소록', title: '취소 확인 PU', url: '#/contacts/optout', description: '수신거부 취소 확인 팝업' },
                { category: '주소록', title: '다운로드 요청 PU', url: '#/contacts/optout', description: '다운로드 요청 팝업' },
                { category: '주소록', title: '다운로드 요청 목록 PU', url: '#/contacts/optout', description: '다운로드 요청 목록 팝업' },

                // 발신 정보
                { category: '발신 정보', title: '발신 번호 관리', url: '#/sender/numbers', description: '발신 번호 등록/관리' },
                { category: '발신 정보', title: '개인정보 수집 동의 PU', url: '#/sender/numbers', description: '필수 개인정보 수집 동의 팝업' },
                { category: '발신 정보', title: '발신 정보 등록 PU', url: '#/sender/numbers', description: '발신 정보 등록 + 서류 인증 팝업' },
                { category: '발신 정보', title: '삭제 확인 PU', url: '#/sender/numbers', description: '삭제 확인 팝업' },
                { category: '발신 정보', title: '등록 안내 PU', url: '#/sender/numbers', description: '발신번호 등록 안내 팝업' },
                { category: '발신 정보', title: '브랜드 관리', url: '#/sender/brands', description: 'RCS 브랜드 관리' },
                { category: '발신 정보', title: '연결 확인 PU', url: '#/sender/brands', description: '브랜드 연결 확인 팝업' },
                { category: '발신 정보', title: '연결 완료 PU', url: '#/sender/brands', description: '브랜드 연결 완료 팝업' },
                { category: '발신 정보', title: '도메인 관리', url: '#/sender/domains', description: '이메일 발신 도메인 관리' },
                { category: '발신 정보', title: '도메인 등록 PU', url: '#/sender/domains', description: '도메인 등록 팝업' },
                { category: '발신 정보', title: 'DKIM 설정 PU', url: '#/sender/domains', description: 'DKIM 인증 설정 팝업' },
                { category: '발신 정보', title: '삭제 확인 PU', url: '#/sender/domains', description: '도메인 삭제 확인 팝업' },
                { category: '발신 정보', title: 'PUSH 인증 관리', url: '#/sender/push-cert', description: 'FCM/APNs 인증서 관리' },
                { category: '발신 정보', title: '결과 알림 PU', url: '#/sender/push-cert', description: '인증서 등록 결과 알림 팝업' },
                { category: '발신 정보', title: '발신 프로필 관리', url: '#/sender/profiles', description: '카카오 발신 프로필 관리' },
                { category: '발신 정보', title: '발신프로필 등록 PU', url: '#/sender/profiles', description: '발신 프로필 등록 팝업' },
                { category: '발신 정보', title: '그룹 관리 PU', url: '#/sender/profiles', description: '발신 프로필 그룹 관리 팝업' },
                { category: '발신 정보', title: '삭제 확인 PU', url: '#/sender/profiles', description: '프로필 삭제 확인 팝업' },
                { category: '발신 정보', title: '토큰 발송 알림 PU', url: '#/sender/profiles', description: '토큰 발송 안내 팝업' },
                { category: '발신 정보', title: '080 수신 거부 번호 관리', url: '#/sender/optout-080', description: '080 수신거부 번호 신청/관리' },
                { category: '발신 정보', title: '080 신청 PU', url: '#/sender/optout-080', description: '080 수신거부 번호 신청 팝업' },
                { category: '발신 정보', title: '취소 확인 PU', url: '#/sender/optout-080', description: '신청 취소 확인 팝업' },

                // 메시지관리
                { category: '메시지관리', title: '문자메시지 템플릿', url: '#/manage/sms', description: 'SMS 템플릿 카테고리/리스트 관리' },
                { category: '메시지관리', title: '카테고리 추가 PU', url: '#/manage/sms', description: '카테고리 추가 팝업' },
                { category: '메시지관리', title: '카테고리 이름 수정 PU', url: '#/manage/sms', description: '카테고리 이름 수정 팝업' },
                { category: '메시지관리', title: '광고 수신 알림 PU', url: '#/manage/sms', description: '광고 수신 동의 안내 팝업' },
                { category: '메시지관리', title: '템플릿 상세 보기 PU', url: '#/manage/sms', description: '템플릿 상세 보기 팝업' },
                { category: '메시지관리', title: '샘플 템플릿 PU', url: '#/manage/sms', description: '샘플 템플릿 보기/선택 팝업' },
                { category: '메시지관리', title: 'AI 템플릿 PU', url: '#/manage/sms', description: 'AI 템플릿 생성 팝업' },
                { category: '메시지관리', title: '삭제 확인 PU', url: '#/manage/sms', description: '템플릿 삭제 확인 팝업' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/sms', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: '알림톡 템플릿', url: '#/manage/kakao', description: '알림톡 템플릿 관리' },
                { category: '메시지관리', title: '카테고리 추가 PU', url: '#/manage/kakao', description: '카테고리 추가 팝업' },
                { category: '메시지관리', title: '카테고리 이름 수정 PU', url: '#/manage/kakao', description: '카테고리 이름 수정 팝업' },
                { category: '메시지관리', title: '대표 링크 PU', url: '#/manage/kakao', description: '대표 링크 설정 팝업' },
                { category: '메시지관리', title: '버튼 PU', url: '#/manage/kakao', description: '버튼 추가/편집 팝업' },
                { category: '메시지관리', title: '바로 연결 PU', url: '#/manage/kakao', description: '바로 연결 설정 팝업' },
                { category: '메시지관리', title: '아이템 리스트 PU', url: '#/manage/kakao', description: '아이템 리스트 설정 팝업' },
                { category: '메시지관리', title: '템플릿 상세 보기 PU', url: '#/manage/kakao', description: '템플릿 상세 보기 팝업' },
                { category: '메시지관리', title: '샘플 템플릿 PU', url: '#/manage/kakao', description: '샘플 템플릿 보기/선택 팝업' },
                { category: '메시지관리', title: 'AI 템플릿 PU', url: '#/manage/kakao', description: 'AI 템플릿 생성 팝업' },
                { category: '메시지관리', title: '삭제 확인 PU', url: '#/manage/kakao', description: '템플릿 삭제 확인 팝업' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/kakao', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: 'RCS 템플릿', url: '#/manage/rcs', description: 'RCS 템플릿 관리' },
                { category: '메시지관리', title: '카테고리 추가 PU', url: '#/manage/rcs', description: '카테고리 추가 팝업' },
                { category: '메시지관리', title: '카테고리 이름 수정 PU', url: '#/manage/rcs', description: '카테고리 이름 수정 팝업' },
                { category: '메시지관리', title: '버튼 PU', url: '#/manage/rcs', description: '버튼 추가/편집 팝업' },
                { category: '메시지관리', title: '템플릿 상세 보기 PU', url: '#/manage/rcs', description: '템플릿 상세 보기 팝업' },
                { category: '메시지관리', title: '샘플 템플릿 PU', url: '#/manage/rcs', description: '샘플 템플릿 보기/선택 팝업' },
                { category: '메시지관리', title: 'AI 템플릿 PU', url: '#/manage/rcs', description: 'AI 템플릿 생성 팝업' },
                { category: '메시지관리', title: '삭제 확인 PU', url: '#/manage/rcs', description: '템플릿 삭제 확인 팝업' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/rcs', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: '이메일 템플릿', url: '#/manage/email', description: '이메일 템플릿 관리' },
                { category: '메시지관리', title: '카테고리 추가 PU', url: '#/manage/email', description: '카테고리 추가 팝업' },
                { category: '메시지관리', title: '카테고리 이름 수정 PU', url: '#/manage/email', description: '카테고리 이름 수정 팝업' },
                { category: '메시지관리', title: '광고 수신 알림 PU', url: '#/manage/email', description: '광고 수신 동의 안내 팝업' },
                { category: '메시지관리', title: '템플릿 상세 보기 PU', url: '#/manage/email', description: '템플릿 상세 보기 팝업' },
                { category: '메시지관리', title: '샘플 템플릿 PU', url: '#/manage/email', description: '샘플 템플릿 보기/선택 팝업' },
                { category: '메시지관리', title: 'AI 템플릿 PU', url: '#/manage/email', description: 'AI 템플릿 생성 팝업' },
                { category: '메시지관리', title: '삭제 확인 PU', url: '#/manage/email', description: '템플릿 삭제 확인 팝업' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/email', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: 'PUSH 템플릿', url: '#/manage/push', description: '푸시 템플릿 관리' },
                { category: '메시지관리', title: '카테고리 추가 PU', url: '#/manage/push', description: '카테고리 추가 팝업' },
                { category: '메시지관리', title: '카테고리 이름 수정 PU', url: '#/manage/push', description: '카테고리 이름 수정 팝업' },
                { category: '메시지관리', title: '버튼 PU', url: '#/manage/push', description: '버튼 추가/편집 팝업' },
                { category: '메시지관리', title: '미디어(공통) PU', url: '#/manage/push', description: '공통 미디어 첨부 팝업' },
                { category: '메시지관리', title: '미디어(Android) PU', url: '#/manage/push', description: 'Android 미디어 첨부 팝업' },
                { category: '메시지관리', title: '미디어(iOS) PU', url: '#/manage/push', description: 'iOS 미디어 첨부 팝업' },
                { category: '메시지관리', title: 'Android 큰 아이콘 PU', url: '#/manage/push', description: 'Android 큰 아이콘 첨부 팝업' },
                { category: '메시지관리', title: '그룹 PU', url: '#/manage/push', description: '발송 그룹 설정 팝업' },
                { category: '메시지관리', title: '템플릿 상세 보기 PU', url: '#/manage/push', description: '템플릿 상세 보기 팝업' },
                { category: '메시지관리', title: '샘플 템플릿 PU', url: '#/manage/push', description: '샘플 템플릿 보기/선택 팝업' },
                { category: '메시지관리', title: 'AI 템플릿 PU', url: '#/manage/push', description: 'AI 템플릿 생성 팝업' },
                { category: '메시지관리', title: '삭제 확인 PU', url: '#/manage/push', description: '템플릿 삭제 확인 팝업' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/push', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: '랜딩페이지', url: '#/manage/landing-page', description: '랜딩페이지 목록/생성/수정' },
                { category: '메시지관리', title: '미리보기 PU', url: '#/manage/landing-page', description: '랜딩페이지 미리보기 팝업(큰 모달)' },
                { category: '메시지관리', title: '삭제 확인 PU', url: '#/manage/landing-page', description: '랜딩페이지 삭제 확인 팝업' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/landing-page', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: '상세 설정', url: '#/manage/settings', description: '메시지 발송 상세 설정' },
                { category: '메시지관리', title: '알림 PU', url: '#/manage/settings', description: '알림 메시지 팝업' },
                { category: '메시지관리', title: '대체 문자 설정 PU', url: '#/manage/settings', description: '대체 문자 설정 팝업' },

                // 문의하기
                { category: '문의하기', title: '1:1 문의 작성', url: '#/inquiry', description: '1:1 문의 작성 폼' },
                { category: '문의하기', title: '파일 오류 알림 PU', url: '#/inquiry', description: '첨부파일 오류 안내 팝업' },
                { category: '문의하기', title: '문의 접수 완료', url: '#/inquiry/complete', description: '문의 접수 완료 안내 페이지' },

                // 로그인
                { category: '로그인', title: '로그인', url: '#/login', description: '이메일/비밀번호 로그인' },
                { category: '로그인', title: '로그인 보안 인증', url: '#/login/security', description: 'OTP/이메일 보안 인증' },
                { category: '로그인', title: '인증코드 알림 PU', url: '#/login/security', description: '인증코드 발송 안내 팝업' },
                { category: '로그인', title: '비밀번호 재설정 (요청)', url: '#/reset-password', description: '비밀번호 재설정 메일 발송' },
                { category: '로그인', title: '메일 발송 완료 PU', url: '#/reset-password', description: '메일 발송 완료 안내 팝업' },
                { category: '로그인', title: '비밀번호 재설정 (신규 입력)', url: '#/reset-password/new', description: '새 비밀번호 입력' },
                { category: '로그인', title: '재설정 완료 PU', url: '#/reset-password/new', description: '비밀번호 재설정 완료 안내 팝업' },

                // 회원가입
                { category: '회원가입', title: '회원가입', url: '#/signup', description: '이메일/약관 동의 가입 폼' },
                { category: '회원가입', title: 'OTP 인증 알림 PU', url: '#/signup', description: 'OTP 인증 안내 팝업' },
                { category: '회원가입', title: '휴대폰 인증 알림 PU', url: '#/signup', description: '휴대폰 인증 안내 팝업' },
                { category: '회원가입', title: '이용약관 PU', url: '#/signup', description: '이용약관 / 개인정보 동의 팝업' },

                // 캠페인 관리
                { category: '캠페인 관리', title: '캠페인 목록', url: '#/campaign', description: '캠페인 목록 + 통계 카드 + 검색/필터 + 복사/삭제' },
                { category: '캠페인 관리', title: '캠페인 생성/수정', url: '#/campaign', description: '기본 정보, 수신자 그룹, 발송 채널/메시지, 발송 시점, 시뮬레이션' },
                { category: '캠페인 관리', title: '설문폼 추가 PU', url: '#/campaign', description: '설문폼 복수 선택 팝업' },
                { category: '캠페인 관리', title: '테스트 발송 PU', url: '#/campaign', description: '테스트 발송 채널 선택 + 차감 크레딧 안내 팝업' },
                { category: '캠페인 관리', title: '발송 컨펌 PU', url: '#/campaign', description: '발송 클릭 시 컨펌 팝업 (수신자/크레딧 차감 안내)' },
                { category: '캠페인 관리', title: '크레딧 부족 PU', url: '#/campaign', description: '크레딧 부족 시 충전 유도 팝업' },
                { category: '캠페인 관리', title: '필수 정보 미입력 알림 PU', url: '#/campaign', description: '필수 정보 미입력 알림 팝업' },
                { category: '캠페인 관리', title: '예약 재발송 PU', url: '#/campaign', description: '예약 대기 중 재발송 안내 팝업' },
                { category: '캠페인 관리', title: '발송 완료 복제 PU', url: '#/campaign', description: '발송 완료된 캠페인 복제 안내 팝업' },
                { category: '캠페인 관리', title: '대기 중 캠페인 중지 PU', url: '#/campaign', description: '대기 중 캠페인 중지 컨펌 팝업' },
                { category: '캠페인 관리', title: '진행 중 캠페인 중지 PU', url: '#/campaign', description: '진행 중 캠페인 중지 컨펌 팝업' },
                { category: '캠페인 관리', title: '복사 확인 PU', url: '#/campaign', description: '캠페인 복사 확인 팝업' },
                { category: '캠페인 관리', title: '삭제 확인 PU', url: '#/campaign', description: '캠페인 삭제 확인 팝업' },
                { category: '캠페인 관리', title: '캠페인 관리 (변형 v3)', url: '#/campaign3', description: '캠페인 관리 변형 페이지 (디자인 검토용)' },

                // 충전하기
                { category: '충전하기', title: '크레딧 충전', url: '#/charge', description: '크레딧 충전 페이지' },
                { category: '충전하기', title: '카드 추가 PU', url: '#/charge', description: '결제 카드 등록 팝업' },
                { category: '충전하기', title: '결제 확인 PU', url: '#/charge', description: '결제 확인 팝업' },
                { category: '충전하기', title: '충전 결과', url: '#/charge/result', description: '충전 결과 안내 페이지' },

                // 크레딧 관리
                { category: '크레딧 관리', title: '크레딧 내역', url: '#/account/credit', description: '크레딧 사용/충전 내역' },
                { category: '크레딧 관리', title: '영수증 PU', url: '#/account/credit', description: '영수증 보기 팝업' },
                { category: '크레딧 관리', title: '크레딧 상세내용 PU', url: '#/account/credit', description: '크레딧 상세 내용 팝업' },
                { category: '크레딧 관리', title: '취소 확인 PU', url: '#/account/credit', description: '결제 취소 확인 팝업' },
                { category: '크레딧 관리', title: '취소 완료 PU', url: '#/account/credit', description: '결제 취소 완료 안내 팝업' },

                // 문의 내역
                { category: '문의 내역', title: '문의 내역', url: '#/account/inquiries', description: '내가 문의한 내역 목록' },
                { category: '문의 내역', title: '삭제 확인 PU', url: '#/account/inquiries', description: '문의 삭제 확인 팝업' },
                { category: '문의 내역', title: '문의 내역 상세', url: '#/account/inquiries/detail', description: '문의 상세 + 답변 보기' },
                { category: '문의 내역', title: '삭제 확인 PU', url: '#/account/inquiries/detail', description: '문의 삭제 확인 팝업' },

                // 계정관리
                { category: '계정관리', title: '계정 설정', url: '#/account/settings', description: '계정 정보 / 결제 이메일 설정' },
                { category: '계정관리', title: '알림 PU', url: '#/account/settings', description: '알림 메시지 팝업' },
                { category: '계정관리', title: '서명 등록 PU', url: '#/account/settings', description: '전자 서명 등록/입력 팝업' },
                { category: '계정관리', title: '문서 뷰어 PU', url: '#/account/settings', description: '계약서/약관 문서 뷰어 팝업' },
                { category: '계정관리', title: '확인 PU', url: '#/account/settings', description: '확인 메시지 팝업' },

                // 시스템 / 템플릿 페이지
                { category: '시스템 / 템플릿 페이지', title: '에러 - 시스템 오류', url: '#/templete/error/system', description: '시스템 오류 안내 페이지' },
                { category: '시스템 / 템플릿 페이지', title: '에러 - 페이지 없음', url: '#/templete/error/not-found', description: '404 Not Found 페이지' },
                { category: '시스템 / 템플릿 페이지', title: '에러 - 네트워크 오류', url: '#/templete/error/network', description: '네트워크 오류 안내 페이지' },
                { category: '시스템 / 템플릿 페이지', title: '404 페이지 (단독)', url: '#/404', description: '쏠쏠 브랜드 404 단독 페이지 (layout 없음)' },
                { category: '시스템 / 템플릿 페이지', title: '에러 페이지 (단독)', url: '#/error', description: '쏠쏠 브랜드 시스템 에러 단독 페이지 (layout 없음)' },
                { category: '시스템 / 템플릿 페이지', title: '점검 - 긴급 점검', url: '#/templete/inspection/emergency', description: '긴급 점검 안내 페이지' },
                { category: '시스템 / 템플릿 페이지', title: '점검 - 정기 점검', url: '#/templete/inspection/scheduled', description: '정기 점검 안내 페이지' },
                { category: '시스템 / 템플릿 페이지', title: '메일 - 이메일 인증', url: '#/templete/email/verify', description: '이메일 인증 메일 템플릿' },
                { category: '시스템 / 템플릿 페이지', title: '메일 - 비밀번호 재설정', url: '#/templete/email/reset-password', description: '비밀번호 재설정 메일 템플릿' }
            ];
        },
        groupedPages() {
            const groups = [];
            let currentCategory = null;
            for (const page of this.pages) {
                if (page.category !== currentCategory) {
                    groups.push({ category: page.category, pages: [] });
                    currentCategory = page.category;
                }
                groups[groups.length - 1].pages.push(page);
            }
            return groups;
        },
        totalPages() {
            return this.pages.length;
        },
        popupKeyMap() {
            const history = {
                '일괄 취소 PU': 'cancelAll',
                '다운로드 요청 PU': 'downloadRequest',
                '채널 알림 PU': 'channelAlert',
                '템플릿 선택 PU': 'templatePicker',
                '다운로드 요청 목록 PU': 'downloadList'
            };
            const manageBase = {
                '카테고리 추가 PU': 'addCategory',
                '카테고리 이름 수정 PU': 'editCategory',
                '템플릿 상세 보기 PU': 'templateDetail',
                '샘플 템플릿 PU': 'sample',
                'AI 템플릿 PU': 'aiTemplate',
                '삭제 확인 PU': 'delete',
                '알림 PU': 'alert'
            };
            return {
                '#/send/sms': {
                    '샘플 템플릿 선택 PU': 'template',
                    '수신자 정보 PU': 'recipientInput',
                    '수신자 선택 PU': 'addressBook',
                    '광고 수신 알림 PU': 'adAlert',
                    '발송 컨펌 PU': 'sendConfirm',
                    '초기화 확인 PU': 'reset'
                },
                '#/send/kakao': {
                    '템플릿 선택 PU': 'template',
                    '수신자 정보 PU': 'recipientInput',
                    '수신자 선택 PU': 'addressBook',
                    '수신자 정보 수정 PU': 'recipientEdit',
                    '발송 컨펌 PU': 'sendConfirm',
                    '초기화 확인 PU': 'reset'
                },
                '#/send/rcs': {
                    '템플릿 선택 PU': 'template',
                    '수신자 정보 PU': 'recipientInput',
                    '수신자 정보 수정 PU': 'recipientEdit',
                    '수신자 선택 PU': 'addressBook',
                    '버튼 PU': 'button',
                    '발송 컨펌 PU': 'sendConfirm',
                    '초기화 확인 PU': 'reset'
                },
                '#/send/email-ai': {
                    '템플릿 선택 PU': 'template',
                    '수신자 정보 PU': 'recipientInput',
                    '수신자 정보 수정 PU': 'recipientEdit',
                    '수신자 선택 PU': 'addressBook',
                    '광고 수신 알림 PU': 'adAlert',
                    'AI 문장 다듬기 PU': 'aiRewrite',
                    '발송 컨펌 PU': 'sendConfirm',
                    '초기화 확인 PU': 'reset'
                },
                '#/send/push': {
                    '템플릿 선택 PU': 'template',
                    '수신자 정보 PU': 'recipientInput',
                    '수신자 선택 PU': 'addressBook',
                    '수신자 정보 수정 PU': 'recipientEdit',
                    '버튼 PU': 'button',
                    '미디어 PU': 'media',
                    'Android 큰 아이콘 PU': 'largeIcon',
                    '그룹 PU': 'group',
                    '발송 컨펌 PU': 'sendConfirm',
                    '초기화 확인 PU': 'reset'
                },
                '#/send/flow': {
                    'Flow 매니저 PU': 'flowMgr',
                    '템플릿 선택 PU': 'templatePicker',
                    '수신자 정보 PU': 'recipientInput',
                    '수신자 선택 PU': 'addressBook',
                    '수신자 정보 수정 PU': 'recipientEdit',
                    '발송 컨펌 PU': 'sendConfirm',
                    '초기화 확인 PU': 'reset'
                },
                '#/history/sms': history,
                '#/history/kakao': history,
                '#/history/rcs': history,
                '#/history/email': history,
                '#/history/push': history,
                '#/contacts/list': {
                    '연락처 추가/변경 PU': 'contactForm',
                    '연락처 삭제 확인 PU': 'deleteConfirm',
                    '다운로드 요청 PU': 'downloadRequest',
                    '다운로드 요청 목록 PU': 'downloadList'
                },
                '#/contacts/groups': {
                    '그룹 추가 PU': 'groupAdd',
                    '그룹 이름 변경 PU': 'groupRename',
                    '그룹 삭제 확인 PU': 'groupDelete',
                    '그룹 연락처 추가 PU': 'contactAdd',
                    '다운로드 요청 목록 PU': 'downloadList'
                },
                '#/contacts/optout': {
                    '수신거부 추가 PU': 'add',
                    '취소 확인 PU': 'cancel',
                    '다운로드 요청 PU': 'downloadRequest',
                    '다운로드 요청 목록 PU': 'downloadList'
                },
                '#/sender/numbers': {
                    '개인정보 수집 동의 PU': 'agree',
                    '발신 정보 등록 PU': 'register',
                    '삭제 확인 PU': 'deleteConfirm',
                    '등록 안내 PU': 'guide'
                },
                '#/sender/brands': {
                    '연결 확인 PU': 'linkConfirm',
                    '연결 완료 PU': 'linkDone'
                },
                '#/sender/domains': {
                    '도메인 등록 PU': 'register',
                    'DKIM 설정 PU': 'dkim',
                    '삭제 확인 PU': 'deleteConfirm'
                },
                '#/sender/push-cert': {
                    '결과 알림 PU': 'result'
                },
                '#/sender/profiles': {
                    '발신프로필 등록 PU': 'register',
                    '그룹 관리 PU': 'group',
                    '삭제 확인 PU': 'deleteConfirm',
                    '토큰 발송 알림 PU': 'tokenSent'
                },
                '#/sender/optout-080': {
                    '080 신청 PU': 'apply',
                    '취소 확인 PU': 'cancelConfirm'
                },
                '#/manage/sms': {
                    ...manageBase,
                    '광고 수신 알림 PU': 'adAlert'
                },
                '#/manage/kakao': {
                    ...manageBase,
                    '대표 링크 PU': 'link',
                    '버튼 PU': 'button',
                    '바로 연결 PU': 'quick',
                    '아이템 리스트 PU': 'itemList'
                },
                '#/manage/rcs': {
                    ...manageBase,
                    '버튼 PU': 'button'
                },
                '#/manage/email': {
                    ...manageBase,
                    '광고 수신 알림 PU': 'adAlert'
                },
                '#/manage/push': {
                    ...manageBase,
                    '버튼 PU': 'button',
                    '미디어(공통) PU': 'media',
                    '미디어(Android) PU': 'androidMedia',
                    '미디어(iOS) PU': 'iosMedia',
                    'Android 큰 아이콘 PU': 'androidLargeIcon',
                    '그룹 PU': 'group'
                },
                '#/manage/settings': {
                    '알림 PU': 'alert',
                    '대체 문자 설정 PU': 'substitution'
                },
                '#/manage/landing-page': {
                    '미리보기 PU': 'preview',
                    '삭제 확인 PU': 'delete',
                    '알림 PU': 'alert'
                },
                '#/inquiry': {
                    '파일 오류 알림 PU': 'fileError'
                },
                '#/login/security': {
                    '인증코드 알림 PU': 'codeAlert'
                },
                '#/reset-password': {
                    '메일 발송 완료 PU': 'sent'
                },
                '#/reset-password/new': {
                    '재설정 완료 PU': 'done'
                },
                '#/signup': {
                    'OTP 인증 알림 PU': 'otpAlert',
                    '휴대폰 인증 알림 PU': 'phoneAlert',
                    '이용약관 PU': 'terms'
                },
                '#/campaign': {
                    '설문폼 추가 PU': 'surveyForm',
                    '테스트 발송 PU': 'testSend',
                    '발송 컨펌 PU': 'sendConfirm',
                    '크레딧 부족 PU': 'credit',
                    '필수 정보 미입력 알림 PU': 'required',
                    '예약 재발송 PU': 'reReserve',
                    '발송 완료 복제 PU': 'completed',
                    '대기 중 캠페인 중지 PU': 'stopPending',
                    '진행 중 캠페인 중지 PU': 'stopRunning',
                    '복사 확인 PU': 'copy',
                    '삭제 확인 PU': 'delete'
                },
                '#/charge': {
                    '카드 추가 PU': 'addCard',
                    '결제 확인 PU': 'confirm'
                },
                '#/account/credit': {
                    '영수증 PU': 'receipt',
                    '크레딧 상세내용 PU': 'detail',
                    '취소 확인 PU': 'cancelConfirm',
                    '취소 완료 PU': 'cancelDone'
                },
                '#/account/inquiries': {
                    '삭제 확인 PU': 'delete'
                },
                '#/account/inquiries/detail': {
                    '삭제 확인 PU': 'delete'
                },
                '#/account/settings': {
                    '알림 PU': 'alert',
                    '서명 등록 PU': 'sign',
                    '문서 뷰어 PU': 'docViewer',
                    '확인 PU': 'confirm'
                }
            };
        }
    },
    methods: {
        isPopup(page) {
            return typeof page.title === 'string' && page.title.endsWith(' PU');
        },
        getPopupKey(page) {
            if (!this.isPopup(page)) return null;
            const urlMap = this.popupKeyMap[page.url];
            if (urlMap && urlMap[page.title]) return urlMap[page.title];
            return null;
        },
        getFullUrl(page) {
            if (!page || !page.url) return '';
            let url = this.baseUrl + '/' + page.url;
            const popupKey = this.getPopupKey(page);
            if (popupKey) url += '?popup=' + popupKey;
            return url;
        },
        getStatusKey(page) {
            return page.category + '::' + page.title + '::' + page.url;
        },
        getStatus(page) {
            const key = this.getStatusKey(page);
            if (!this.statusMap[key]) {
                this.statusMap[key] = { design: false, publishing: '', saved: false };
            }
            return this.statusMap[key];
        },
        saveStatus(page) {
            const key = this.getStatusKey(page);
            this.statusMap[key].saved = true;
            localStorage.setItem('pagelists-status', JSON.stringify(this.statusMap));
        },
        editStatus(page) {
            const key = this.getStatusKey(page);
            this.statusMap[key].saved = false;
        },
        getSubcategory(page) {
            const map = {
                // 메시지 발송 — 채널별
                '#/send/sms': '문자메시지',
                '#/send/kakao': '알림톡',
                '#/send/rcs': 'RCS',
                '#/send/email-ai': '이메일',
                '#/send/push': 'PUSH',
                '#/send/flow': '복합(플로우)',
                // 발송 조회/통계 — 채널별
                '#/history/sms': '문자메시지',
                '#/history/kakao': '알림톡',
                '#/history/rcs': 'RCS',
                '#/history/email': '이메일',
                '#/history/push': 'PUSH',
                '#/history/stats': '통계',
                // 주소록 — 하위 메뉴별
                '#/contacts/list': '연락처 관리',
                '#/contacts/groups': '그룹 관리',
                '#/contacts/optout': '수신 거부 관리',
                // 발신 정보 — 하위 메뉴별
                '#/sender/numbers': '발신 번호 관리',
                '#/sender/brands': '브랜드 관리',
                '#/sender/domains': '도메인 관리',
                '#/sender/push-cert': 'PUSH 인증 관리',
                '#/sender/profiles': '발신 프로필 관리',
                '#/sender/optout-080': '080 수신 거부 관리',
                // 메시지관리 — 채널별
                '#/manage/sms': '문자메시지',
                '#/manage/kakao': '알림톡',
                '#/manage/rcs': 'RCS',
                '#/manage/email': '이메일',
                '#/manage/push': 'PUSH',
                '#/manage/landing-page': '랜딩페이지',
                '#/manage/settings': '상세 설정'
            };
            return map[page.url] || page.category;
        }
    }
};
