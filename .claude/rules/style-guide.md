# CSS 스타일 규칙

적용 대상: .html, .css

## 최우선 원칙
Bootstrap 5 클래스 최대 활용, Custom CSS 최소화. 모든 커스텀 CSS는 `css/base.css`에 작성.
마이페이지 커스텀 CSS는 `css/mypage.css`에 작성.

## 금지
- HTML 파일에 `<style>` 태그 사용 금지

## 필수
- CSS 값은 CSS 변수 사용: `var(--primary-color)`, `var(--gray-100)`
- 반응형: Bootstrap grid 사용 (`col-12 col-md-6 col-xl-3`)

## 반응형 브레이크포인트
- 모바일: `max-width: 768px`
- 태블릿: `max-width: 1024px`

## 콘텐츠 레이아웃 표준
- **콘텐츠 너비**: 모든 페이지는 `<div class="container">` 사용. `.page-content > .container`에 `max-width: 1320px`가 전역 적용되므로 페이지별 별도 너비 지정 금지.
- **2단 구성**: 메인 + 우측 보조 패널(미리보기/가이드/사이드 정보 등)은 `.content-2col` 클래스 사용 (1fr + 360px, gap 32px). 우측 영역에 `.content-2col-aside` 클래스 부여하면 1024px 이하에서 단일 컬럼으로 스택되며 위로 올라감.

## 상세 문서
색상 변수, 신호등 시스템, 주요 클래스 → `CLAUDE.md` 참조
