# 맑은 message BackOffice 메뉴 구조 (Site Map)

문서 버전: v1.0
작성일: 2026-05-08
대상 서비스: 맑은 message (대용량 메시지 기업용 전송 서비스)
대상 시스템: BackOffice (운영자 관리 시스템)

---

## 1. 메뉴 개요

본 문서는 맑은 message 서비스 운영을 위한 BackOffice의 메뉴 체계(Site Map)를 정의한다.
사용자(고객사) 서비스에서 제공되는 기능을 운영/관리하기 위한 1~3 Depth 메뉴 구조와 라우트 체계를 포함한다.

| 구분 | 내용 |
|------|------|
| 시스템명 | 맑은 message BackOffice |
| 라우트 prefix | `/admin` (예: `/admin/members/list`) |
| 사용자 | 운영자, 검수자, 고객지원, 회계, 시스템관리자 |
| 접근 | 운영자 계정 + 2FA(OTP/이메일) 필수 |

---

## 2. 전체 메뉴 트리 (1~3 Depth)

```
[BackOffice]
├─ 1. 대시보드
│   ├─ 1.1 운영 현황
│   ├─ 1.2 매출/크레딧 현황
│   ├─ 1.3 회원/고객사 현황
│   └─ 1.4 시스템 상태
│
├─ 2. 회원/고객사 관리
│   ├─ 2.1 고객사(기업) 관리
│   │   ├─ 2.1.1 고객사 목록
│   │   ├─ 2.1.2 고객사 상세/등록
│   │   └─ 2.1.3 고객사 사용 통계
│   ├─ 2.2 회원 계정 관리
│   │   ├─ 2.2.1 회원 목록
│   │   ├─ 2.2.2 회원 상세 (정보/권한/이력)
│   │   ├─ 2.2.3 계정 상태 변경 (활성/정지/탈퇴)
│   │   └─ 2.2.4 비밀번호 초기화
│   ├─ 2.3 권한 그룹 관리
│   │   ├─ 2.3.1 권한 그룹(역할) 목록
│   │   └─ 2.3.2 권한 매트릭스
│   ├─ 2.4 로그인 이력
│   └─ 2.5 탈퇴 회원 관리
│
├─ 3. 발송 운영 모니터링
│   ├─ 3.1 통합 발송 모니터링
│   │   ├─ 3.1.1 실시간 발송 현황(채널별)
│   │   ├─ 3.1.2 발송 큐 / 처리율
│   │   └─ 3.1.3 채널별 도달률/실패율
│   ├─ 3.2 채널별 발송 이력
│   │   ├─ 3.2.1 SMS 발송 이력
│   │   ├─ 3.2.2 알림톡 발송 이력
│   │   ├─ 3.2.3 RCS 발송 이력
│   │   ├─ 3.2.4 이메일 발송 이력
│   │   └─ 3.2.5 PUSH 발송 이력
│   ├─ 3.3 캠페인 모니터링
│   ├─ 3.4 플로우(복합) 모니터링
│   ├─ 3.5 실패 / 재처리 관리
│   └─ 3.6 차단/스팸 메시지 관리
│       ├─ 3.6.1 키워드 필터
│       └─ 3.6.2 스팸 신고 처리
│
├─ 4. 발신 정보 검수
│   ├─ 4.1 발신번호 검수
│   │   ├─ 4.1.1 신청 목록
│   │   └─ 4.1.2 승인/반려 처리
│   ├─ 4.2 도메인 검수(이메일)
│   │   ├─ 4.2.1 도메인 등록 검수
│   │   └─ 4.2.2 DKIM/SPF 검증
│   ├─ 4.3 브랜드 검수(RCS)
│   ├─ 4.4 발신 프로필 검수(카카오)
│   ├─ 4.5 PUSH 인증서 검증(FCM/APNs)
│   └─ 4.6 080 수신거부번호 신청 처리
│
├─ 5. 템플릿 검수/관리
│   ├─ 5.1 알림톡 템플릿 검수
│   ├─ 5.2 RCS 템플릿 검수
│   ├─ 5.3 광고성(080) 메시지 검수
│   ├─ 5.4 샘플 템플릿 관리
│   │   ├─ 5.4.1 SMS 샘플
│   │   ├─ 5.4.2 알림톡 샘플
│   │   ├─ 5.4.3 RCS 샘플
│   │   ├─ 5.4.4 이메일 샘플
│   │   └─ 5.4.5 PUSH 샘플
│   └─ 5.5 AI 템플릿 정책 관리
│       ├─ 5.5.1 프롬프트 정책
│       ├─ 5.5.2 금칙어/필터
│       └─ 5.5.3 사용 한도
│
├─ 6. 결제/크레딧 관리
│   ├─ 6.1 충전 내역
│   ├─ 6.2 결제 내역(PG)
│   ├─ 6.3 환불 처리
│   │   ├─ 6.3.1 환불 신청 목록
│   │   └─ 6.3.2 환불 승인/반려
│   ├─ 6.4 크레딧 수동 충전/차감
│   ├─ 6.5 무료 크레딧 / 프로모션
│   │   ├─ 6.5.1 프로모션 코드
│   │   └─ 6.5.2 일괄 지급
│   └─ 6.6 영수증/세금계산서
│
├─ 7. 요금/단가 관리
│   ├─ 7.1 채널별 단가
│   │   ├─ 7.1.1 SMS 단가
│   │   ├─ 7.1.2 알림톡 단가
│   │   ├─ 7.1.3 RCS 단가
│   │   ├─ 7.1.4 이메일 단가
│   │   └─ 7.1.5 PUSH 단가
│   ├─ 7.2 단가 정책(고객사별/플랜별)
│   └─ 7.3 할인/쿠폰 정책
│
├─ 8. 수신거부 (운영)
│   ├─ 8.1 통합 수신거부 DB
│   ├─ 8.2 080 수신거부 통계
│   └─ 8.3 수신거부 요청 처리
│
├─ 9. 고객 지원
│   ├─ 9.1 1:1 문의 관리
│   │   ├─ 9.1.1 문의 목록
│   │   ├─ 9.1.2 답변/처리
│   │   └─ 9.1.3 문의 카테고리 관리
│   ├─ 9.2 FAQ 관리
│   ├─ 9.3 공지사항 관리
│   ├─ 9.4 운영 가이드 관리
│   └─ 9.5 다운로드 요청 관리
│
├─ 10. 콘텐츠/사이트 관리
│   ├─ 10.1 메인/랜딩 콘텐츠
│   ├─ 10.2 약관 관리(이용/개인정보/마케팅/스팸)
│   ├─ 10.3 시스템 메일 템플릿
│   │   ├─ 10.3.1 인증 메일
│   │   └─ 10.3.2 비밀번호 재설정
│   └─ 10.4 점검/공지 페이지
│
├─ 11. 통계/리포트
│   ├─ 11.1 발송 통계(채널별/기간별)
│   ├─ 11.2 매출 리포트
│   ├─ 11.3 회원/고객사 활동
│   ├─ 11.4 도달률/실패율 분석
│   └─ 11.5 리포트 다운로드
│
├─ 12. 시스템 관리
│   ├─ 12.1 운영자 계정 관리
│   ├─ 12.2 권한/역할 관리(RBAC)
│   ├─ 12.3 감사 로그(Audit Log)
│   ├─ 12.4 시스템 설정
│   ├─ 12.5 점검 모드 관리
│   └─ 12.6 외부 연동 설정
│       (PG / 문자사 / 카카오 / 통신사 / FCM / APNs)
│
└─ 13. API 관리
    ├─ 13.1 API 키 발급/관리
    ├─ 13.2 API 사용량 모니터링
    ├─ 13.3 Rate Limit / IP 화이트리스트
    └─ 13.4 Webhook 설정/이력
```

---

## 3. 메뉴 상세표 (라우트 / 권한)

### 3.1 대시보드

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 대시보드 | `/admin/dashboard` | ALL | 운영자 메인 화면 |
| 2 | 운영 현황 | `/admin/dashboard/operation` | ALL | 실시간 발송/처리율/오류율 위젯 |
| 2 | 매출/크레딧 현황 | `/admin/dashboard/revenue` | 회계, 운영 | 일/월/누적 매출, 크레딧 잔액 합계 |
| 2 | 회원/고객사 현황 | `/admin/dashboard/members` | 운영 | 신규/활성/이탈, 고객사 증감 |
| 2 | 시스템 상태 | `/admin/dashboard/system` | 시스템 | 외부 연동 헬스체크, 큐 적체 |

### 3.2 회원/고객사 관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 회원/고객사 관리 | `/admin/members` | 운영 | - |
| 2 | 고객사 관리 | `/admin/members/companies` | 운영 | - |
| 3 | 고객사 목록 | `/admin/members/companies/list` | 운영 | 검색/필터/엑셀 |
| 3 | 고객사 상세/등록 | `/admin/members/companies/detail` | 운영 | CRUD |
| 3 | 고객사 사용 통계 | `/admin/members/companies/stats` | 운영 | 채널별 발송량, 매출 |
| 2 | 회원 계정 관리 | `/admin/members/users` | 운영 | - |
| 3 | 회원 목록 | `/admin/members/users/list` | 운영 | - |
| 3 | 회원 상세 | `/admin/members/users/detail` | 운영 | 정보/권한/이력 탭 |
| 3 | 계정 상태 변경 | `/admin/members/users/status` | 운영 | 활성/정지/탈퇴 |
| 3 | 비밀번호 초기화 | `/admin/members/users/reset-password` | 운영 | 운영자 권한 초기화 |
| 2 | 권한 그룹 관리 | `/admin/members/roles` | 시스템 | - |
| 3 | 권한 그룹(역할) 목록 | `/admin/members/roles/list` | 시스템 | 역할(롤) CRUD |
| 3 | 권한 매트릭스 | `/admin/members/roles/matrix` | 시스템 | 메뉴×권한 매트릭스 |
| 2 | 로그인 이력 | `/admin/members/login-logs` | 운영, 시스템 | IP/디바이스/실패 이력 |
| 2 | 탈퇴 회원 관리 | `/admin/members/withdrawn` | 운영 | 탈퇴 사유, 보존기간 |

### 3.3 발송 운영 모니터링

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 발송 운영 모니터링 | `/admin/sending` | 운영 | - |
| 2 | 통합 발송 모니터링 | `/admin/sending/monitor` | 운영 | - |
| 3 | 실시간 발송 현황 | `/admin/sending/monitor/realtime` | 운영 | 채널별 TPS |
| 3 | 발송 큐/처리율 | `/admin/sending/monitor/queue` | 운영 | 큐 길이, 적체 |
| 3 | 도달률/실패율 | `/admin/sending/monitor/delivery` | 운영 | 채널별 KPI |
| 2 | 채널별 발송 이력 | `/admin/sending/history` | 운영 | - |
| 3 | SMS 발송 이력 | `/admin/sending/history/sms` | 운영 | 검색/엑셀 |
| 3 | 알림톡 발송 이력 | `/admin/sending/history/kakao` | 운영 | 검색/엑셀 |
| 3 | RCS 발송 이력 | `/admin/sending/history/rcs` | 운영 | 검색/엑셀 |
| 3 | 이메일 발송 이력 | `/admin/sending/history/email` | 운영 | 오픈/클릭/바운스 포함 |
| 3 | PUSH 발송 이력 | `/admin/sending/history/push` | 운영 | iOS/Android 분리 |
| 2 | 캠페인 모니터링 | `/admin/sending/campaigns` | 운영 | 진행/예약/완료 |
| 2 | 플로우(복합) 모니터링 | `/admin/sending/flows` | 운영 | 노드 단위 진척률 |
| 2 | 실패/재처리 관리 | `/admin/sending/retry` | 운영 | 실패건 재발송 |
| 2 | 차단/스팸 메시지 관리 | `/admin/sending/spam` | 운영 | - |
| 3 | 키워드 필터 | `/admin/sending/spam/keywords` | 운영 | 금칙어 룰 |
| 3 | 스팸 신고 처리 | `/admin/sending/spam/reports` | 운영 | 신고 → 차단/경고 |

### 3.4 발신 정보 검수

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 발신 정보 검수 | `/admin/sender` | 검수 | - |
| 2 | 발신번호 검수 | `/admin/sender/numbers` | 검수 | - |
| 3 | 신청 목록 | `/admin/sender/numbers/list` | 검수 | 대기/승인/반려 |
| 3 | 승인/반려 처리 | `/admin/sender/numbers/review` | 검수 | 서류 확인 |
| 2 | 도메인 검수 | `/admin/sender/domains` | 검수 | - |
| 3 | 도메인 등록 검수 | `/admin/sender/domains/list` | 검수 | - |
| 3 | DKIM/SPF 검증 | `/admin/sender/domains/dkim` | 검수 | DNS 레코드 검증 |
| 2 | 브랜드 검수(RCS) | `/admin/sender/brands` | 검수 | - |
| 2 | 발신 프로필 검수(카카오) | `/admin/sender/profiles` | 검수 | - |
| 2 | PUSH 인증서 검증 | `/admin/sender/push-cert` | 검수 | FCM/APNs 인증서 |
| 2 | 080 수신거부번호 신청 처리 | `/admin/sender/optout-080` | 검수 | - |

### 3.5 템플릿 검수/관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 템플릿 검수/관리 | `/admin/templates` | 검수 | - |
| 2 | 알림톡 템플릿 검수 | `/admin/templates/kakao-review` | 검수 | 카카오 정책 검수 |
| 2 | RCS 템플릿 검수 | `/admin/templates/rcs-review` | 검수 | 통신사 정책 검수 |
| 2 | 광고성(080) 메시지 검수 | `/admin/templates/ad-review` | 검수 | 야간발송/수신동의 |
| 2 | 샘플 템플릿 관리 | `/admin/templates/samples` | 운영 | - |
| 3 | SMS 샘플 | `/admin/templates/samples/sms` | 운영 | - |
| 3 | 알림톡 샘플 | `/admin/templates/samples/kakao` | 운영 | - |
| 3 | RCS 샘플 | `/admin/templates/samples/rcs` | 운영 | - |
| 3 | 이메일 샘플 | `/admin/templates/samples/email` | 운영 | - |
| 3 | PUSH 샘플 | `/admin/templates/samples/push` | 운영 | - |
| 2 | AI 템플릿 정책 관리 | `/admin/templates/ai` | 운영 | - |
| 3 | 프롬프트 정책 | `/admin/templates/ai/prompt` | 운영 | 시스템 프롬프트 |
| 3 | 금칙어/필터 | `/admin/templates/ai/filter` | 운영 | 출력 필터 |
| 3 | 사용 한도 | `/admin/templates/ai/limit` | 운영 | 회원당 호출 한도 |

### 3.6 결제/크레딧 관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 결제/크레딧 관리 | `/admin/billing` | 회계 | - |
| 2 | 충전 내역 | `/admin/billing/charges` | 회계 | - |
| 2 | 결제 내역(PG) | `/admin/billing/payments` | 회계 | PG 거래 ID |
| 2 | 환불 처리 | `/admin/billing/refunds` | 회계 | - |
| 3 | 환불 신청 목록 | `/admin/billing/refunds/list` | 회계 | - |
| 3 | 환불 승인/반려 | `/admin/billing/refunds/review` | 회계 | PG 부분취소 연동 |
| 2 | 크레딧 수동 충전/차감 | `/admin/billing/credit-adjust` | 회계 | 사유 의무 입력 |
| 2 | 무료 크레딧/프로모션 | `/admin/billing/promotion` | 회계 | - |
| 3 | 프로모션 코드 | `/admin/billing/promotion/code` | 회계 | 코드 발급/유효기간 |
| 3 | 일괄 지급 | `/admin/billing/promotion/grant` | 회계 | 대상 일괄 지급 |
| 2 | 영수증/세금계산서 | `/admin/billing/receipts` | 회계 | 발행/재발행 |

### 3.7 요금/단가 관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 요금/단가 관리 | `/admin/pricing` | 회계, 시스템 | - |
| 2 | 채널별 단가 | `/admin/pricing/channels` | 회계 | - |
| 3 | SMS 단가 | `/admin/pricing/channels/sms` | 회계 | SMS/LMS/MMS |
| 3 | 알림톡 단가 | `/admin/pricing/channels/kakao` | 회계 | 알림톡/친구톡 |
| 3 | RCS 단가 | `/admin/pricing/channels/rcs` | 회계 | 템플릿/이미지 |
| 3 | 이메일 단가 | `/admin/pricing/channels/email` | 회계 | - |
| 3 | PUSH 단가 | `/admin/pricing/channels/push` | 회계 | - |
| 2 | 단가 정책(고객사별/플랜별) | `/admin/pricing/policy` | 회계 | 단가 오버라이드 |
| 2 | 할인/쿠폰 정책 | `/admin/pricing/discount` | 회계 | - |

### 3.8 수신거부 (운영)

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 수신거부 | `/admin/optout` | 운영 | - |
| 2 | 통합 수신거부 DB | `/admin/optout/db` | 운영 | 휴대폰/이메일/푸시 |
| 2 | 080 수신거부 통계 | `/admin/optout/stats-080` | 운영 | - |
| 2 | 수신거부 요청 처리 | `/admin/optout/requests` | 운영 | 민원/요청 처리 |

### 3.9 고객 지원

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 고객 지원 | `/admin/cs` | 고객지원 | - |
| 2 | 1:1 문의 관리 | `/admin/cs/inquiries` | 고객지원 | - |
| 3 | 문의 목록 | `/admin/cs/inquiries/list` | 고객지원 | 검색/상태 |
| 3 | 답변/처리 | `/admin/cs/inquiries/reply` | 고객지원 | 첨부, 템플릿 답변 |
| 3 | 문의 카테고리 관리 | `/admin/cs/inquiries/categories` | 고객지원 | - |
| 2 | FAQ 관리 | `/admin/cs/faq` | 고객지원 | - |
| 2 | 공지사항 관리 | `/admin/cs/notice` | 고객지원 | 팝업/배너 노출 |
| 2 | 운영 가이드 관리 | `/admin/cs/guide` | 운영 | 도움말 콘텐츠 |
| 2 | 다운로드 요청 관리 | `/admin/cs/downloads` | 고객지원 | 사용자 요청 추적 |

### 3.10 콘텐츠/사이트 관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 콘텐츠/사이트 관리 | `/admin/content` | 운영 | - |
| 2 | 메인/랜딩 콘텐츠 | `/admin/content/landing` | 운영 | 히어로/배너 |
| 2 | 약관 관리 | `/admin/content/terms` | 운영 | 이용/개인정보/마케팅/스팸 |
| 2 | 시스템 메일 템플릿 | `/admin/content/mail-templates` | 운영 | - |
| 3 | 인증 메일 | `/admin/content/mail-templates/verify` | 운영 | - |
| 3 | 비밀번호 재설정 | `/admin/content/mail-templates/reset-password` | 운영 | - |
| 2 | 점검/공지 페이지 | `/admin/content/inspection` | 시스템 | 긴급/정기 점검 |

### 3.11 통계/리포트

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 통계/리포트 | `/admin/reports` | 운영, 회계 | - |
| 2 | 발송 통계 | `/admin/reports/sending` | 운영 | 채널별/기간별 |
| 2 | 매출 리포트 | `/admin/reports/revenue` | 회계 | 일/월/연 |
| 2 | 회원/고객사 활동 | `/admin/reports/members` | 운영 | DAU/MAU |
| 2 | 도달률/실패율 분석 | `/admin/reports/delivery` | 운영 | 채널 KPI |
| 2 | 리포트 다운로드 | `/admin/reports/downloads` | 운영, 회계 | 비동기 다운로드 |

### 3.12 시스템 관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | 시스템 관리 | `/admin/system` | 시스템 | - |
| 2 | 운영자 계정 관리 | `/admin/system/admins` | 시스템 | - |
| 2 | 권한/역할 관리(RBAC) | `/admin/system/rbac` | 시스템 | - |
| 2 | 감사 로그 | `/admin/system/audit` | 시스템 | 변경 이력 |
| 2 | 시스템 설정 | `/admin/system/config` | 시스템 | 글로벌 설정 |
| 2 | 점검 모드 관리 | `/admin/system/maintenance` | 시스템 | 페이지 점검 토글 |
| 2 | 외부 연동 설정 | `/admin/system/integrations` | 시스템 | PG/문자사/카카오/FCM/APNs |

### 3.13 API 관리

| Depth | 메뉴명 | 라우트 | 권한 | 설명 |
|-------|--------|--------|------|------|
| 1 | API 관리 | `/admin/api` | 시스템, 운영 | - |
| 2 | API 키 발급/관리 | `/admin/api/keys` | 시스템 | 고객사별 키 |
| 2 | API 사용량 모니터링 | `/admin/api/usage` | 운영 | 호출량/에러율 |
| 2 | Rate Limit / IP 화이트리스트 | `/admin/api/limits` | 시스템 | - |
| 2 | Webhook 설정/이력 | `/admin/api/webhooks` | 시스템 | 발송결과 콜백 등 |

---

## 4. 권한(Role) 정의

| 코드 | 명칭 | 설명 |
|------|------|------|
| SUPER | 슈퍼관리자 | 전체 메뉴 접근 / 시스템 설정, 권한 변경 가능 |
| OPS | 운영자 | 발송/회원/고객사/콘텐츠 운영 |
| REVIEWER | 검수자 | 발신정보/템플릿 검수 |
| FINANCE | 회계 | 결제/단가/매출/세금계산서 |
| CS | 고객지원 | 1:1 문의/공지/FAQ 답변 |
| SYSTEM | 시스템관리자 | 외부연동/점검모드/감사로그 |
| READONLY | 조회 전용 | 모든 메뉴 조회만 가능 |

---

## 5. 공통 화면 구성

| 영역 | 설명 |
|------|------|
| GNB(상단) | 로고, 검색(글로벌), 알림, 운영자 프로필 |
| LNB(좌측) | 1~3 Depth 트리 메뉴 (접힘/펼침) |
| 콘텐츠 | 페이지 제목, Breadcrumb, 검색 영역, 리스트, 페이지네이션 |
| 푸터 | 시스템 버전, 점검 모드 표시 |

> 콘텐츠 너비, 2단 구성 등 디자인 시스템은 사용자 서비스의 표준(`.page-content > .container` max-width 1320px,
> `.content-2col` 1fr+360px)을 그대로 준수하되, 운영용 고밀도 테이블에는 `.bo-table-dense` 변형을 사용한다.
