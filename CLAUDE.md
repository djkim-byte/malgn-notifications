# 쏠쏠 - Brand Site

## 프로젝트 개요

(주)맑은소프트의 "쏠쏠" 브랜드 사이트. 크리에이터를 위한 올인원 AI 수익화 플랫폼의 랜딩/마케팅 페이지.
Vue 3 + ViewLogic Router 기반의 SPA. Bootstrap 5로 스타일링하며, 빌드 과정 없이 CDN으로 직접 실행 가능.

## 기술 스택

- **프레임워크**: Vue 3 (CDN)
- **라우터**: ViewLogic Router 1.4.0 (파일 기반 라우팅)
- **CSS**: Bootstrap 5.3.3 + 최소한의 커스텀 CSS (`css/base.css`)
- **빌드**: 없음 (정적 파일 서빙)

## 프로젝트 구조

```
project/
├── index.html              # 진입점 (Vue, ViewLogic, Bootstrap CDN 로드)
├── css/base.css            # 커스텀 CSS (Bootstrap 우선, 최소화)
├── data/                   # 정적 데이터 (JSON)
│   ├── terms.json          # 이용약관
│   ├── privacy.json        # 개인정보처리방침
│   └── marketing.json      # 마케팅 정보 수신 동의
├── src/
│   ├── views/              # HTML 템플릿 (CSS 금지)
│   │   ├── layout/         # 레이아웃 템플릿
│   │   └── {page}.html     # 페이지 뷰
│   ├── logic/              # JavaScript 로직
│   │   ├── layout/         # 레이아웃 스크립트
│   │   └── {page}.js       # 페이지 로직
│   └── components/         # 재사용 컴포넌트
├── i18n/                   # 다국어 파일 (선택)
└── docs/                   # 상세 문서
```

## 페이지 & 레이아웃 현황

| 페이지 | 라우트 | 레이아웃 | 설명 |
|--------|--------|----------|------|
| `home` | `#/home` | `default` | 메인 랜딩 페이지 (히어로, 크리에이터 쇼케이스, 통계, 기능 소개, CTA) |
| `signup` | `#/signup` | `default` | 회원가입 (플랜 선택 + 가입 폼, 이메일 인증코드) |
| `login` | `#/login` | 없음 (`null`) | 로그인 (이메일/비밀번호, 아이디 기억하기, 비밀번호 재설정, 회원가입 링크) |
| `pricing` | `#/pricing` | `default` | 가격 페이지 (플랜 카드, 월간/연간 토글, 기능 비교표, Enterprise 배너) |
| `checkout` | `#/checkout` | `default` | 결제 페이지 |
| `payment-complete` | `#/payment-complete` | `default` | 결제 완료 페이지 (신규: 다음→환영, 기존: 마이페이지) |
| `welcome` | `#/welcome` | `default` | 가입 완료/환영 페이지 |
| `mypage` | `#/mypage` | `default` | 마이페이지 (사이트 관리) |

| 레이아웃 | 설명 |
|----------|------|
| `default` | GNB 헤더 + 푸터 + 법적 문서 모달 3개 (이용약관, 개인정보처리방침, 마케팅 동의) |

## 브랜딩 정보

- **브랜드명**: 쏠쏠
- **서비스명**: 쏠쏠 - 크리에이터를 위한 올인원 AI 수익화 플랫폼
- **도메인**: solsol.so
- **회사명**: (주)맑은소프트
- **로고 텍스트**: 쏠쏠 / CREATOR PLATFORM
- **주요 색상**: `--primary-color: #6366f1` (인디고)
- **폰트**: Noto Sans KR (Google Fonts)

## 법적 문서 (data/ 폴더)

- `data/terms.json` - 이용약관 ((주)맑은소프트 쏠쏠 서비스, 제1조~제24조 + 부칙)
- `data/privacy.json` - 개인정보처리방침 (15개 섹션 + 위탁 테이블 포함)
- `data/marketing.json` - 마케팅 정보 수신 동의 (3개 조항)
- default 레이아웃의 `mounted()`에서 `fetch()`로 로드하여 Bootstrap 모달로 표시
- 푸터 링크 및 회원가입 동의 체크박스의 chevron에서 모달 트리거

## 플랜 구성

| 플랜 | 월 가격 | 수수료 | 용량 | 회원수 |
|------|---------|--------|------|--------|
| Free | 0원 (영구 무료) | 10% | 40GB | 20명 |
| Basic | 100,000원 | 0% | 1TB | 1,000명 |
| Growth | 300,000원 | 0% | 2TB | 5,000명 |
| Advanced | 500,000원 | 0% | 2TB | 10,000명 |
| Enterprise | 협의 | 협의 | 무제한 | 무제한 |

- 연간 구독 시 30% 할인
- 14일 무료 체험 (카드 등록 필수)

## 결제/구독 정책 요약

- **결제 방식**: 정액제 구독 (월간/연간), PG는 토스페이먼츠
- **결제 수단**: 신용카드, 체크카드 (계좌이체 미지원)
- **무료 체험**: 14일, 카드 등록 필수, 미취소 시 자동 결제
- **결제 실패**: 3일간 하루 2회 재시도(총 6회) → 결제유예(27일) → 미결제 시 상품 해지
- **구독 해지**: ①남은 기간 종료 후 해지 ②즉시 취소 및 환불(수동 접수)
- **환불**: 7일 이내+미사용=전액환불, 그 외=잔여기간 일할계산×70%(위약금 30%)
- **플랜 변경**: 즉시 적용, 미사용 기간 일할 계산 차액 제외
- **결제 주기 변경**: 월→연 즉시 가능, 연→월 구독기간 종료 후 적용
- **영수증**: 신용카드 매출전표 (세금계산서 대체)
- 상세: [docs/billing.md](docs/billing.md)

## 핵심 규칙

1. **파일 쌍**: `views/{name}.html` ↔ `logic/{name}.js` 반드시 동일 이름
2. **폴더 = 라우트**: `goals/my-goals.html` → `#/goals/my-goals`
3. **CSS**: HTML에 `<style>` 태그 금지, 모든 CSS는 `css/base.css`
4. **라우팅**: `this.navigateTo()` 사용, `window.location` 직접 조작 금지
5. **비동기**: `async/await` 사용, `Promise.then/catch` 금지
6. **레이아웃**: `layout: null` 사용, `layout: false` 금지
7. **정적 데이터**: 법적 문서 등 긴 콘텐츠는 `data/` 폴더에 JSON으로 분리

## 상세 문서

기능별 상세 문서는 `docs/` 폴더 참조:

| 문서 | 내용 |
|------|------|
| [docs/routing.md](docs/routing.md) | 파일 기반 라우팅, 페이지 이동, 파라미터 |
| [docs/data-fetching.md](docs/data-fetching.md) | dataURL 자동 로딩, 수동 API 호출 |
| [docs/forms.md](docs/forms.md) | 명령형/선언적 폼 처리 |
| [docs/api.md](docs/api.md) | $api 메서드 (GET/POST/PUT/DELETE), 에러 처리 |
| [docs/auth.md](docs/auth.md) | 인증 설정, 로그인/로그아웃, 토큰 관리 |
| [docs/i18n.md](docs/i18n.md) | 다국어 설정, 메시지 파일, 언어 전환 |
| [docs/components.md](docs/components.md) | 컴포넌트 생성/등록 |
| [docs/components-builtin.md](docs/components-builtin.md) | 내장 컴포넌트 상세 (DatePicker, Table, Sidebar 등) |
| [docs/layout.md](docs/layout.md) | 레이아웃 시스템, 레이아웃 지정 |
| [docs/patterns.md](docs/patterns.md) | 공통 패턴 (로딩 상태, 에러 처리, 폼 밸리데이션, 검색/필터) |
| [docs/advanced.md](docs/advanced.md) | 라이프사이클, computed, watch, 캐싱, 상태 관리 |
| [docs/configuration.md](docs/configuration.md) | ViewLogicRouter 전체 설정 옵션 |
| [docs/billing.md](docs/billing.md) | 결제, 구독, 청구서, 환불, 해지 정책 |

## 커맨드

다음 커맨드를 사용하여 빠르게 작업할 수 있습니다:

| 커맨드 | 설명 |
|--------|------|
| `/create-page` | 새 페이지 (view + logic) 생성 |
| `/create-component` | 새 재사용 컴포넌트 생성 |
| `/create-layout` | 새 레이아웃 생성 |

## 템플릿

`.claude/templates/` 폴더에 변형 패턴 포함 템플릿 문서가 있습니다:

| 템플릿 | 용도 |
|--------|------|
| `page.md` | 페이지 (정적, 목록, 상세, 폼 4가지 변형) |
| `component.md` | 컴포넌트 (기본, 슬롯, v-model 3가지 변형) |
| `layout.md` | 레이아웃 (네비게이션, 사이드바 2가지 변형) |

## 개발 서버

```bash
python -m http.server 8000
# 또는 VS Code Live Server (포트 5502)
```

## 추가 리소스

- **프로젝트 GitHub**: https://github.com/malgnsoft/creatorlms-brand
- **ViewLogic GitHub**: https://github.com/hopegiver/viewlogic
- **npm**: https://www.npmjs.com/package/viewlogic
