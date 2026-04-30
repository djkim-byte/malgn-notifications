// 발신 정보 > 브랜드 관리
// RCS Biz Center 연동 브랜드 목록 + 선택 시 대화방(발신 번호) 상세 조회

const SAMPLE_BRANDS = [
    {
        id: 1,
        name: '위캔디오',
        brandId: 'BR-4wb1ika561',
        status: '승인',
        approvedAt: '2026-03-25 15:43',
        linkedAt: '2026-04-24 16:26',
        channels: [
            { id: 1, name: '위캔디오', phone: '16447143', status: '승인', approvedAt: '2026-03-25 15:43' }
        ]
    }
];

export default {
    name: 'SenderBrandsPage',
    layout: 'default',

    data() {
        return {
            companyName: '주식회사 맑은소프트',
            brands: [],
            brandPage: 1,
            brandPageSize: 10,
            selectedBrandId: null,

            channelPage: 1,
            channelPageSize: 10,
            detailLayout: 'split',

            modals: {}
        };
    },

    mounted() {
        this.brands = SAMPLE_BRANDS.slice();

        this.$nextTick(() => {
            this.modals = {
                linkConfirm: new bootstrap.Modal(this.$refs.linkConfirmModal),
                linkDone: new bootstrap.Modal(this.$refs.linkDoneModal)
            };
        });
    },

    computed: {
        brandTotalPages() {
            return Math.max(1, Math.ceil(this.brands.length / this.brandPageSize));
        },
        pagedBrands() {
            const start = (this.brandPage - 1) * this.brandPageSize;
            return this.brands.slice(start, start + this.brandPageSize);
        },
        selectedBrand() {
            if (this.selectedBrandId === null) return null;
            return this.brands.find(b => b.id === this.selectedBrandId) || null;
        },
        channelTotalPages() {
            if (!this.selectedBrand) return 1;
            return Math.max(1, Math.ceil(this.selectedBrand.channels.length / this.channelPageSize));
        },
        pagedChannels() {
            if (!this.selectedBrand) return [];
            const start = (this.channelPage - 1) * this.channelPageSize;
            return this.selectedBrand.channels.slice(start, start + this.channelPageSize);
        }
    },

    methods: {
        selectBrand(brand) {
            this.selectedBrandId = brand.id;
            this.channelPage = 1;
        },

        closeDetail() {
            this.selectedBrandId = null;
        },

        openLinkConfirm() {
            this.modals.linkConfirm && this.modals.linkConfirm.show();
        },

        async confirmLink() {
            this.closeModal('linkConfirm');
            await this.$nextTick();
            this.modals.linkDone && this.modals.linkDone.show();
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        }
    }
};
