// 발신 정보 > 발신 프로필 관리
// 카카오톡 채널 기반 발신 프로필 등록/조회/삭제 + 그룹 관리
// 등록 플로우: 정보 입력 → 토큰 요청(휴대폰 6자리) → 토큰 입력 → 저장

// 발신 프로필 카테고리 — 카카오 알림톡 산업 분류 (대/중/소분류)
const CATEGORY_TREE = {
    health: {
        label: '건강',
        children: {
            hospital: {
                label: '병원',
                children: {
                    general: '종합병원',
                    skin: '피부과',
                    plastic: '성형외과',
                    eye: '안과',
                    ent: '이비인후과',
                    ortho: '정형외과',
                    dental: '치과',
                    urology: '비뇨기과',
                    proctology: '대장항문과',
                    obgyn: '산부인과',
                    pediatric: '소아과',
                    internal: '내과',
                    surgery: '외과',
                    psychiatric: '신경정신과',
                    physical: '물리치료과',
                    rehab: '재활의학과',
                    oriental: '한의원',
                    mental: '정신병원',
                    elderly: '노인병원',
                    nursing: '요양병원',
                    veterinary: '동물병원',
                    other: '기타병'
                }
            },
            pharmacy: { label: '약국', children: { item: '약국' } },
            medical: { label: '의료기기/의약품', children: { item: '의료기기/의약품' } },
            healthFood: { label: '건강식품/건강정보', children: { item: '건강식품/건강정보' } },
            therapy: { label: '심리치료/명상/기타대체의학', children: { item: '심리치료/명상/기타대체의학' } }
        }
    },
    education: {
        label: '교육',
        children: {
            school: {
                label: '학교',
                children: {
                    kindergarten: '유치원',
                    elementary: '초등학교',
                    middle: '중학교',
                    high: '고등학교',
                    college: '대학',
                    university: '대학교',
                    graduate: '대학원',
                    alternative: '대안학교/직업학교'
                }
            },
            academy: {
                label: '학원',
                children: {
                    offline: '오프라인 학원',
                    online: '온라인 학원'
                }
            },
            educationCenter: { label: '교육원', children: { item: '어린이집/평생교육원/문화센터' } },
            workbook: { label: '학습지', children: { item: '학습지' } },
            eduInfo: { label: '교육정보/접수대행/자격증', children: { item: '교육정보/접수대행/자격증' } },
            otherEdu: { label: '기타교육서비스', children: { item: '기타교육서비스' } }
        }
    },
    transport: {
        label: '교통/운송서비스',
        children: {
            shipping: {
                label: '운송서비스',
                children: {
                    moving: '이사',
                    parcel: '택배',
                    logistics: '물류/창고/컨테이너'
                }
            },
            airRail: { label: '항공/철도', children: { item: '항공/철도' } },
            taxi: {
                label: '택시/대리운전',
                children: {
                    designated: '대리운전',
                    callTaxi: '콜택시'
                }
            },
            otherTransport: { label: '기타교통/운송서비스', children: { item: '기타교통/운송서비스' } }
        }
    },
    finance: {
        label: '금융',
        children: {
            bank: {
                label: '은행',
                children: {
                    primary: '1 금융권',
                    secondary: '2 금융 은행권'
                }
            },
            credit: {
                label: '신용',
                children: {
                    card: '신용카드',
                    info: '신용정보/신용조사/채권추심'
                }
            },
            insurance: { label: '보험', children: { item: '보험' } },
            loan: {
                label: '대출',
                children: {
                    capital: '2 금융 캐피탈',
                    other: '기타 대출'
                }
            },
            invest: {
                label: '재테크',
                children: {
                    securities: '투자/증권',
                    crypto: '가상화폐'
                }
            },
            realEstate: { label: '부동산', children: { item: '부동산' } },
            otherFinance: { label: '기타금융서비스', children: { item: '기타금융서비스' } }
        }
    },
    beauty: {
        label: '미용',
        children: {
            beauty: {
                label: '미용',
                children: {
                    hair: '헤어샵',
                    bodyCare: '뷰티케어샵/체형클리닉',
                    goods: '미용용품/기기',
                    cosmetics: '뷰티/화장품',
                    other: '기타 미용'
                }
            }
        }
    },
    retail: {
        label: '소매(쇼핑몰)',
        children: {
            furniture: { label: '가구/인테리어', children: { item: '가구/인테리어' } },
            electronics: { label: '전자', children: { item: '전자' } },
            living: { label: '생활/주방/문구', children: { item: '생활/주방/문구' } },
            food: { label: '식품', children: { item: '식품' } },
            clothing: { label: '의류', children: { item: '의류' } },
            fashion: { label: '패션잡화', children: { item: '패션잡화' } },
            flower: { label: '꽃배달/선물', children: { item: '꽃배달/선물' } },
            hobby: { label: '취미', children: { item: '취미' } },
            mall: { label: '종합쇼핑몰/백화점', children: { item: '종합쇼핑몰/백화점' } },
            home: { label: '홈쇼핑', children: { item: '홈쇼핑' } },
            social: { label: '소셜커머스', children: { item: '소셜커머스' } },
            network: { label: '네트워크마케팅쇼핑몰', children: { item: '네트워크마케팅쇼핑몰' } },
            buying: { label: '구매대행', children: { item: '구매대행' } },
            otherRetail: { label: '기타소매', children: { item: '기타소매' } }
        }
    },
    entertainment: {
        label: '엔터테인먼트',
        children: {
            performance: { label: '공연/전시', children: { item: '공연/전시' } },
            ticket: { label: '티켓예매', children: { item: '티켓예매' } },
            movie: { label: '영화', children: { item: '영화' } },
            book: { label: '도서/만화', children: { item: '도서/만화' } },
            lottery: { label: '복권', children: { item: '복권' } },
            download: { label: '다운로드서비스', children: { item: '다운로드서비스' } },
            streaming: { label: '스트리밍서비스', children: { item: '스트리밍서비스' } },
            fortune: { label: '운세서비스', children: { item: '운세서비스' } },
            production: { label: '제작서비스', children: { item: '제작서비스' } },
            event: { label: '이벤트', children: { item: '이벤트' } },
            agency: { label: '기획사', children: { item: '기획사' } },
            otherEnt: { label: '기타엔터테인먼트', children: { item: '기타엔터테인먼트' } }
        }
    },
    leisure: {
        label: '여가',
        children: {
            domesticHotel: { label: '국내숙박', children: { item: '국내숙박' } },
            domesticTravel: { label: '국내여행', children: { item: '국내여행' } },
            overseasHotel: { label: '해외숙박', children: { item: '해외숙박' } },
            overseasTravel: { label: '해외여행', children: { item: '해외여행' } },
            travelAgency: { label: '종합여행사/여행정보', children: { item: '종합여행사/여행정보' } },
            airTicket: { label: '항공권', children: { item: '항공권' } },
            visa: { label: '여권/비자', children: { item: '여권/비자' } },
            sports: { label: '스포츠/레저', children: { item: '스포츠/레저' } },
            sportsGoods: { label: '스포츠/레저 용품', children: { item: '스포츠/레저 용품' } },
            otherLeisure: { label: '기타여가서비스', children: { item: '기타여가서비스' } }
        }
    },
    game: {
        label: '게임',
        children: {
            mobile: { label: '모바일 게임', children: { item: '모바일 게임' } },
            pc: { label: 'PC 게임', children: { item: 'PC 게임' } }
        }
    },
    parenting: {
        label: '출산/육아',
        children: {
            childcare: { label: '육아', children: { item: '돌/유아아동용품/육아정보' } },
            birth: { label: '출산', children: { item: '임부복/산후조리원/출산정보' } }
        }
    },
    restaurant: {
        label: '음식점',
        children: {
            restaurant: { label: '음식점', children: { item: '음식점' } },
            bakery: { label: '제과/제빵', children: { item: '제과/제빵' } },
            bar: { label: '유흥', children: { item: '유흥' } },
            cafe: { label: '카페', children: { item: '카페' } },
            franchise: { label: '프랜차이즈', children: { item: '프랜차이즈' } }
        }
    },
    car: {
        label: '자동차',
        children: {
            rental: { label: '렌트/차량공유', children: { item: '렌트/차량공유' } },
            newCar: { label: '신차판매', children: { item: '신차판매' } },
            management: { label: '자동차관리', children: { item: '자동차관리' } },
            accessories: { label: '자동차용품', children: { item: '자동차용품' } },
            parking: { label: '주차장', children: { item: '주차장' } },
            usedCar: { label: '중고차', children: { item: '중고차' } },
            scrap: { label: '폐차장', children: { item: '폐차장' } }
        }
    },
    computer: {
        label: '컴퓨터',
        children: {
            software: { label: '소프트웨어/솔루션', children: { item: '소프트웨어/솔루션' } },
            repair: { label: '컴퓨터수리/보수', children: { item: '컴퓨터수리/보수' } }
        }
    },
    industry: {
        label: '산업',
        children: {
            tools: { label: '공구/산업용품', children: { item: '공구/산업용품' } }
        }
    },
    organization: {
        label: '기관/단체',
        children: {
            public: { label: '공공기관', children: { item: '공공기관' } },
            general: { label: '일반단체', children: { item: '일반단체' } },
            housing: { label: '주거시설', children: { item: '주거시설' } },
            politics: { label: '정치', children: { item: '정당/정치후보자' } },
            religion: { label: '종교', children: { item: '종교' } }
        }
    },
    advertising: {
        label: '광고',
        children: {
            advertising: { label: '광고물', children: { item: '판촉물/광고컨설팅/기타광고서비스' } }
        }
    },
    media: {
        label: '방송사/출판',
        children: {
            broadcast: { label: '방송사/신문', children: { item: '방송사/신문' } },
            publication: { label: '출판', children: { item: '잡지/서적/출판사' } }
        }
    },
    internet: {
        label: '인터넷통신',
        children: {
            web: { label: '웹서비스', children: { item: '웹호스팅/도메인/기타웹서비스' } },
            line: { label: '전용선/방송', children: { item: '전용선/방송' } },
            telecom: { label: '통신서비스', children: { item: '통신서비스' } },
            portal: { label: '포털서비스', children: { item: '포털서비스' } }
        }
    },
    generalService: {
        label: '일반서비스',
        children: {
            wedding: { label: '결혼/소개팅', children: { item: '결혼/소개팅' } },
            security: { label: '보안서비스', children: { item: '보안서비스' } },
            life: {
                label: '생활서비스',
                children: {
                    landscape: '조경/청소/사진/심부름서비스',
                    rental: '정수기/가전렌탈',
                    boiler: '보일러/냉방',
                    gas: '정유/가스',
                    delivery: '배달/맛집정보',
                    funeral: '상조'
                }
            },
            employment: { label: '취업', children: { item: '취업/아르바이트' } },
            hr: { label: '인력파견', children: { item: '인력파견' } },
            otherGeneral: { label: '기타일반서비스', children: { item: '기타일반서비스' } }
        }
    },
    professional: {
        label: '전문서비스',
        children: {
            construction: { label: '건축', children: { item: '건축/설비/자재' } },
            legal: { label: '법률서비스', children: { item: '법률서비스' } },
            tax: { label: '세무/회계/금융서비스', children: { item: '세무/회계/금융서비스' } },
            translation: { label: '통역/번역', children: { item: '통역/번역' } },
            otherProfessional: { label: '기타전문서비스', children: { item: '기타전문서비스' } }
        }
    },
    other: {
        label: '기타서비스',
        children: {
            membership: { label: '멤버십/포인트', children: { item: '멤버십/포인트' } },
            workNotice: { label: '업무알림', children: { item: '업무알림' } }
        }
    }
};

const TOKEN_STATUS_LABEL = {
    none: '미요청',
    pending: '대기',
    completed: '완료'
};

const PROFILE_STATUS_LABEL = {
    normal: '정상',
    blocked: '차단',
    pending: '심사 중',
    rejected: '반려'
};

const SAMPLE_ROWS = [
    {
        id: 1,
        profileId: '@위캔디오',
        senderKey: '30c4fef0c603ab315b21b86ee5708bbc00bf86f9',
        registeredAt: '2026-02-04 13:28',
        tokenStatus: 'completed',
        tokenStatusLabel: TOKEN_STATUS_LABEL.completed,
        profileStatus: 'normal',
        profileStatusLabel: PROFILE_STATUS_LABEL.normal
    }
];

const SAMPLE_GROUPS = [];

function emptyForm() {
    return {
        profileId: '',
        phone: '',
        categoryL1: '',
        categoryL2: '',
        categoryL3: '',
        token: ''
    };
}

function nowStamp() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function randomKey() {
    const chars = 'abcdef0123456789';
    let key = '';
    for (let i = 0; i < 40; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
}

export default {
    name: 'SenderProfilesPage',
    layout: 'default',

    components: ['HistoryDropdown'],

    data() {
        return {
            rows: SAMPLE_ROWS.slice(),
            page: 1,
            pageSize: 10,
            selectedRowIds: [],
            searchTerm: '',
            appliedSearch: '',

            modals: {},

            form: emptyForm(),
            tokenRequested: false,

            groups: SAMPLE_GROUPS.slice(),
            groupForm: { name: '' }
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                register: new bootstrap.Modal(this.$refs.registerModal),
                group: new bootstrap.Modal(this.$refs.groupModal),
                deleteConfirm: new bootstrap.Modal(this.$refs.deleteConfirmModal),
                tokenSent: new bootstrap.Modal(this.$refs.tokenSentModal)
            };
        });
    },

    computed: {
        filteredRows() {
            if (!this.appliedSearch) return this.rows;
            const t = this.appliedSearch.toLowerCase();
            return this.rows.filter(r => r.profileId.toLowerCase().includes(t));
        },
        totalCount() { return this.filteredRows.length; },
        totalPages() { return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize)); },
        pagedRows() {
            const start = (this.page - 1) * this.pageSize;
            return this.filteredRows.slice(start, start + this.pageSize);
        },
        pageRange() {
            const pages = [];
            for (let p = 1; p <= this.totalPages; p++) pages.push(p);
            return pages;
        },
        isAllSelected() {
            return this.pagedRows.length > 0 && this.pagedRows.every(r => this.selectedRowIds.includes(r.id));
        },

        categoryL1Options() {
            return Object.keys(CATEGORY_TREE).map(k => ({ value: k, label: CATEGORY_TREE[k].label }));
        },
        categoryL2Options() {
            const l1 = CATEGORY_TREE[this.form.categoryL1];
            if (!l1) return [];
            return Object.keys(l1.children).map(k => ({ value: k, label: l1.children[k].label }));
        },
        categoryL3Options() {
            const l1 = CATEGORY_TREE[this.form.categoryL1];
            if (!l1) return [];
            const l2 = l1.children[this.form.categoryL2];
            if (!l2) return [];
            return Object.keys(l2.children).map(k => ({ value: k, label: l2.children[k] }));
        },

        canRequestToken() {
            return this.form.profileId.trim().length > 0
                && /^\d{10,11}$/.test(this.form.phone)
                && this.form.categoryL1
                && this.form.categoryL2
                && this.form.categoryL3;
        },

        canSubmit() {
            return this.canRequestToken && this.tokenRequested && /^\d{6}$/.test(this.form.token);
        }
    },

    watch: {
        'form.categoryL1'() {
            this.form.categoryL2 = '';
            this.form.categoryL3 = '';
        },
        'form.categoryL2'() {
            this.form.categoryL3 = '';
        }
    },

    methods: {
        profileStatusClass(status) {
            if (status === 'normal') return 'sender-status-approved';
            if (status === 'blocked' || status === 'rejected') return 'sender-status-rejected';
            return 'sender-status-pending';
        },

        applySearch() {
            this.appliedSearch = this.searchTerm.trim();
            this.page = 1;
        },

        refresh() {
            this.searchTerm = '';
            this.appliedSearch = '';
            this.page = 1;
            this.selectedRowIds = [];
        },

        goPage(p) {
            if (p < 1 || p > this.totalPages) return;
            this.page = p;
        },

        toggleAllRows(e) {
            if (e.target.checked) {
                const ids = this.pagedRows.map(r => r.id);
                this.selectedRowIds = Array.from(new Set([...this.selectedRowIds, ...ids]));
            } else {
                const ids = new Set(this.pagedRows.map(r => r.id));
                this.selectedRowIds = this.selectedRowIds.filter(id => !ids.has(id));
            }
        },

        // ===== 등록 =====
        openRegister() {
            this.form = emptyForm();
            this.tokenRequested = false;
            this.modals.register && this.modals.register.show();
        },

        onPhoneInput() {
            this.form.phone = this.form.phone.replace(/[^0-9]/g, '');
            if (this.tokenRequested) {
                this.tokenRequested = false;
                this.form.token = '';
            }
        },

        onTokenInput() {
            this.form.token = this.form.token.replace(/[^0-9]/g, '');
        },

        async requestToken() {
            if (!this.canRequestToken) return;
            this.tokenRequested = true;
            this.form.token = '';
            await this.$nextTick();
            this.modals.tokenSent && this.modals.tokenSent.show();
        },

        submitRegister() {
            if (!this.canSubmit) return;
            const profileId = this.form.profileId.trim().startsWith('@')
                ? this.form.profileId.trim()
                : '@' + this.form.profileId.trim();

            this.rows.unshift({
                id: Date.now(),
                profileId,
                senderKey: randomKey(),
                registeredAt: nowStamp(),
                tokenStatus: 'completed',
                tokenStatusLabel: TOKEN_STATUS_LABEL.completed,
                profileStatus: 'normal',
                profileStatusLabel: PROFILE_STATUS_LABEL.normal
            });

            this.closeModal('register');
        },

        // ===== 삭제 =====
        openDeleteConfirm() {
            if (this.selectedRowIds.length === 0) return;
            this.modals.deleteConfirm && this.modals.deleteConfirm.show();
        },

        confirmDelete() {
            const ids = new Set(this.selectedRowIds);
            this.rows = this.rows.filter(r => !ids.has(r.id));
            this.selectedRowIds = [];
            this.closeModal('deleteConfirm');
        },

        // ===== 그룹 =====
        openGroupManage() {
            this.groupForm.name = '';
            this.modals.group && this.modals.group.show();
        },

        addGroup() {
            const name = this.groupForm.name.trim();
            if (!name) return;
            this.groups.unshift({
                id: Date.now(),
                name,
                profileCount: 0,
                createdAt: nowStamp()
            });
            this.groupForm.name = '';
        },

        removeGroup(id) {
            this.groups = this.groups.filter(g => g.id !== id);
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        }
    }
};
