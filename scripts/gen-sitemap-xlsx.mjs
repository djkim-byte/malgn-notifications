// 사이트맵 & 기능명세 엑셀 생성기
//
// 데이터 출처: src/logic/sitemap.js (의 computed.menuData / channelOptions)
// 출력 파일  : docs/Service/맑은message_사이트맵_기능명세.xlsx
//
// 실행 방법:
//   1) (최초 1회) exceljs 설치  -- 프로젝트 루트의 node_modules는 .gitignore 처리됨
//      npm i -D exceljs
//   2) 스크립트 실행
//      node scripts/gen-sitemap-xlsx.mjs
//
// 시트 구성:
//   1. 개요                : 카테고리 통계 + 채널 범례
//   2. 전체 메뉴구조        : 모든 항목 1장 평면 테이블 (검색/필터용)
//   3~14. 카테고리별 시트   : 각 카테고리의 상세 (메뉴구조 + 기능명세)

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import ExcelJS from 'exceljs';

import sitemap from '../src/logic/sitemap.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(PROJECT_ROOT, 'docs', 'Service');
const OUT_FILE = path.join(OUT_DIR, '맑은message_사이트맵_기능명세.xlsx');

await mkdir(OUT_DIR, { recursive: true });

// computed 함수는 Vue 컨텍스트 없이도 호출 가능 (this 미사용 순수 데이터)
const menuData = sitemap.computed.menuData.call({});
const channelOptions = sitemap.computed.channelOptions.call({});

const channelNameMap = Object.fromEntries(channelOptions.map(c => [c.code, c.name]));
const channelDescMap = Object.fromEntries(channelOptions.map(c => [c.code, c.desc]));

// 채널별 색상 (sitemap의 .bo-channel-* 와 동일 매핑)
const CHANNEL_FILL = {
    COMMON: { bg: 'FFF1F5F9', fg: 'FF334155' },
    SMS:    { bg: 'FFEFF6FF', fg: 'FF1D4ED8' },
    KAKAO:  { bg: 'FFFEF9C3', fg: 'FF854D0E' },
    RCS:    { bg: 'FFF5F3FF', fg: 'FF6D28D9' },
    EMAIL:  { bg: 'FFECFDF5', fg: 'FF047857' },
    PUSH:   { bg: 'FFFFF1F2', fg: 'FFBE123C' },
    MULTI:  { bg: 'FFE0F2FE', fg: 'FF0284C7' }
};

const HEADER_FILL = 'FFE2E8F0';
const HEADER_FONT = { bold: true, color: { argb: 'FF1E293B' } };

const wb = new ExcelJS.Workbook();
wb.creator = '맑은소프트';
wb.created = new Date();
wb.title = '맑은message 사이트맵 & 기능명세';

// ===== 1. 개요 시트 =====
{
    const ws = wb.addWorksheet('개요', { views: [{ state: 'frozen', ySplit: 1 }] });
    ws.columns = [
        { header: '구분',     key: 'k',  width: 22 },
        { header: '값',        key: 'v',  width: 60 }
    ];
    styleHeader(ws.getRow(1));

    ws.addRow({ k: '문서명',     v: '맑은message 사이트맵 & 기능명세' });
    ws.addRow({ k: '작성일',     v: new Date().toISOString().slice(0, 10) });
    ws.addRow({ k: '대상 서비스', v: '맑은message (사용자 서비스)' });
    ws.addRow({ k: '카테고리 수', v: menuData.length });
    ws.addRow({ k: '페이지 수',   v: countDepth(menuData, 2) });
    ws.addRow({ k: '팝업 수',     v: countDepth(menuData, 3) });
    ws.addRow({ k: '총 항목 수',  v: countDepth(menuData, 2) + countDepth(menuData, 3) });

    ws.addRow([]);

    // 카테고리별 통계
    const catHeaderRow = ws.addRow(['#', '카테고리', '페이지', '팝업', '합계', '주요 채널']);
    styleHeader(catHeaderRow);
    for (const cat of menuData) {
        const pages = cat.items.filter(i => i.depth === 2).length;
        const popups = cat.items.filter(i => i.depth === 3).length;
        const channels = uniqueChannels(cat.items).map(c => channelNameMap[c]).join(', ');
        ws.addRow([cat.id, cat.name, pages, popups, pages + popups, channels]);
    }
    // 통계 영역 폭 조정용 가상 컬럼
    ws.getColumn(3).width = 12;
    ws.getColumn(4).width = 12;
    ws.getColumn(5).width = 12;
    ws.getColumn(6).width = 40;

    ws.addRow([]);

    // 채널 범례
    const legendHeader = ws.addRow(['채널 코드', '명칭', '설명']);
    styleHeader(legendHeader);
    for (const ch of channelOptions) {
        const row = ws.addRow([ch.code, ch.name, ch.desc]);
        styleChannel(row.getCell(1), ch.code);
        styleChannel(row.getCell(2), ch.code);
    }
}

// ===== 2. 전체 메뉴구조 시트 =====
{
    const ws = wb.addWorksheet('전체 메뉴구조', {
        views: [{ state: 'frozen', ySplit: 1 }]
    });
    ws.columns = [
        { header: '대분류',   key: 'cat',     width: 22 },
        { header: '코드',     key: 'code',    width: 10 },
        { header: '메뉴명',   key: 'name',    width: 32 },
        { header: 'Depth',    key: 'depth',   width: 8 },
        { header: '라우트',   key: 'route',   width: 32 },
        { header: '채널',     key: 'channel', width: 10 },
        { header: '기능명세', key: 'desc',    width: 80 }
    ];
    styleHeader(ws.getRow(1));

    for (const cat of menuData) {
        for (const item of cat.items) {
            const channelCode = (item.channels && item.channels[0]) || '';
            const row = ws.addRow({
                cat: `${cat.id}. ${cat.name}`,
                code: item.code,
                name: indentName(item),
                depth: item.depth,
                route: item.route || '',
                channel: channelCode ? channelNameMap[channelCode] : '',
                desc: item.description || ''
            });
            row.alignment = { vertical: 'top', wrapText: true };
            if (channelCode) styleChannel(row.getCell('channel'), channelCode);
            if (item.depth === 3) {
                row.getCell('name').font = { color: { argb: 'FF64748B' } };
            } else {
                row.getCell('name').font = { bold: true };
            }
        }
    }
    addFilter(ws);
}

// ===== 3~14. 카테고리별 시트 =====
for (const cat of menuData) {
    const sheetName = sanitizeSheetName(`${cat.id}. ${cat.name}`);
    const ws = wb.addWorksheet(sheetName, {
        views: [{ state: 'frozen', ySplit: 3 }]
    });

    // 시트 머리글 (카테고리 정보)
    ws.mergeCells('A1:G1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `${cat.id}. ${cat.name}`;
    titleCell.font = { bold: true, size: 14, color: { argb: 'FF0F172A' } };
    titleCell.alignment = { vertical: 'middle' };
    ws.getRow(1).height = 26;

    ws.mergeCells('A2:G2');
    const subCell = ws.getCell('A2');
    const pages = cat.items.filter(i => i.depth === 2).length;
    const popups = cat.items.filter(i => i.depth === 3).length;
    subCell.value = `페이지 ${pages}개 · 팝업 ${popups}개 · 합계 ${pages + popups}개`;
    subCell.font = { color: { argb: 'FF64748B' } };

    // 컬럼 정의
    const headerRow = ws.getRow(3);
    headerRow.values = ['코드', '메뉴명', 'Depth', '라우트', '채널', '기능명세'];
    styleHeader(headerRow);

    ws.columns = [
        { key: 'code',    width: 10 },
        { key: 'name',    width: 36 },
        { key: 'depth',   width: 8 },
        { key: 'route',   width: 32 },
        { key: 'channel', width: 10 },
        { key: 'desc',    width: 80 }
    ];
    // header row already set on row 3

    for (const item of cat.items) {
        const channelCode = (item.channels && item.channels[0]) || '';
        const row = ws.addRow({
            code: item.code,
            name: indentName(item),
            depth: item.depth,
            route: item.route || '',
            channel: channelCode ? channelNameMap[channelCode] : '',
            desc: item.description || ''
        });
        row.alignment = { vertical: 'top', wrapText: true };
        if (channelCode) styleChannel(row.getCell('channel'), channelCode);
        if (item.depth === 3) {
            row.getCell('name').font = { color: { argb: 'FF64748B' } };
        } else {
            row.getCell('name').font = { bold: true };
            row.getCell('code').font = { bold: true };
        }
    }
    ws.autoFilter = { from: 'A3', to: 'F3' };
}

await wb.xlsx.writeFile(OUT_FILE);

console.log(`✓ 생성 완료: ${path.relative(PROJECT_ROOT, OUT_FILE)}`);
console.log(`  · 시트 ${wb.worksheets.length}개`);
console.log(`  · 페이지 ${countDepth(menuData, 2)}개 / 팝업 ${countDepth(menuData, 3)}개`);

// ----- 헬퍼 -----
function countDepth(data, d) {
    return data.reduce((s, c) => s + c.items.filter(i => i.depth === d).length, 0);
}

function uniqueChannels(items) {
    const set = new Set();
    for (const it of items) for (const c of (it.channels || [])) set.add(c);
    return [...set];
}

function indentName(item) {
    return item.depth === 3 ? `    ↳ ${item.name}` : item.name;
}

function styleHeader(row) {
    row.font = HEADER_FONT;
    row.alignment = { vertical: 'middle' };
    row.eachCell(cell => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_FILL } };
        cell.border = {
            top:    { style: 'thin', color: { argb: 'FFCBD5E1' } },
            bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            left:   { style: 'thin', color: { argb: 'FFCBD5E1' } },
            right:  { style: 'thin', color: { argb: 'FFCBD5E1' } }
        };
    });
}

function styleChannel(cell, code) {
    const c = CHANNEL_FILL[code];
    if (!c) return;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: c.bg } };
    cell.font = { bold: true, color: { argb: c.fg } };
    cell.alignment = { horizontal: 'center', vertical: 'top' };
}

function addFilter(ws) {
    const last = ws.getRow(1).cellCount;
    const lastCol = String.fromCharCode(64 + last);
    ws.autoFilter = { from: 'A1', to: `${lastCol}1` };
}

function sanitizeSheetName(name) {
    // 엑셀 시트명 제약: 31자 이하, [] : * ? / \ 사용 불가
    return name.replace(/[\[\]:*?\/\\]/g, '_').slice(0, 31);
}
