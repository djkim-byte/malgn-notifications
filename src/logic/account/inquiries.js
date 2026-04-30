const PAGE_SIZE = 5;

export default {
    name: 'AccountInquiries',
    layout: 'default',

    data() {
        return {
            stats: { pending: 10, answering: 30, complete: 20 },
            statusLabels: {
                pending: '답변대기',
                answering: '답변중',
                complete: '답변완료'
            },
            categoryLabels: {
                kakao: '카카오톡',
                sms: '문자',
                rcs: 'RCS',
                email: '이메일',
                push: 'PUSH',
                payment: '결제',
                partnership: '제휴',
                etc: '기타'
            },
            items: [
                {
                    id: 1,
                    status: 'pending',
                    category: 'kakao',
                    title: '문의 제목이 들어갑니다.',
                    preview: '온라인 강의는 단순히 콘텐츠를 잘 만드는 것만으로는 수익이 발생하지 않습니다. 수익이 나는 강의는 기획 단계부터 구조가 다르게 설계됩니다. 이번 심화 특강에서는 강의 상품을 기획할 때 반드시 고려해야 할 수익 구조 설계 방식을 다룹니다. 무료 콘텐츠와 유료 콘텐츠의 경계 설정 방...',
                    time: '방금전',
                    commentCount: 10
                },
                {
                    id: 2,
                    status: 'pending',
                    category: 'kakao',
                    title: '문의 제목이 들어갑니다.',
                    preview: '온라인 강의는 단순히 콘텐츠를 잘 만드는 것만으로는 수익이 발생하지 않습니다. 수익이 나는 강의는 기획 단계부터 구조가 다르게 설계됩니다. 이번 심화 특강에서는 강의 상품을 기획할 때 반드시 고려해야 할 수익 구조 설계 방식을 다룹니다. 무료 콘텐츠와 유료 콘텐츠의 경계 설정 방...',
                    time: '1시간전',
                    commentCount: 10
                },
                {
                    id: 3,
                    status: 'answering',
                    category: 'kakao',
                    title: '문의 제목이 들어갑니다.',
                    preview: '온라인 강의는 단순히 콘텐츠를 잘 만드는 것만으로는 수익이 발생하지 않습니다. 수익이 나는 강의는 기획 단계부터 구조가 다르게 설계됩니다. 이번 심화 특강에서는 강의 상품을 기획할 때 반드시 고려해야 할 수익 구조 설계 방식을 다룹니다. 무료 콘텐츠와 유료 콘텐츠의 경계 설정 방...',
                    time: '6시간전',
                    commentCount: 10
                },
                {
                    id: 4,
                    status: 'answering',
                    category: 'kakao',
                    title: '문의 제목이 들어갑니다.',
                    preview: '온라인 강의는 단순히 콘텐츠를 잘 만드는 것만으로는 수익이 발생하지 않습니다. 수익이 나는 강의는 기획 단계부터 구조가 다르게 설계됩니다. 이번 심화 특강에서는 강의 상품을 기획할 때 반드시 고려해야 할 수익 구조 설계 방식을 다룹니다. 무료 콘텐츠와 유료 콘텐츠의 경계 설정 방...',
                    time: '2000.00.00',
                    commentCount: 10
                },
                {
                    id: 5,
                    status: 'complete',
                    category: 'kakao',
                    title: '문의 제목이 들어갑니다.',
                    preview: '온라인 강의는 단순히 콘텐츠를 잘 만드는 것만으로는 수익이 발생하지 않습니다. 수익이 나는 강의는 기획 단계부터 구조가 다르게 설계됩니다. 이번 심화 특강에서는 강의 상품을 기획할 때 반드시 고려해야 할 수익 구조 설계 방식을 다룹니다. 무료 콘텐츠와 유료 콘텐츠의 경계 설정 방...',
                    time: '2000.00.00',
                    commentCount: 10
                },
                {
                    id: 6,
                    status: 'complete',
                    category: 'payment',
                    title: '결제 환불 관련 문의 드립니다.',
                    preview: '지난주 결제한 건에 대해 환불 문의 드립니다. 결제 후 사용하지 않은 상태이며 환불 정책에 따라 처리 부탁드립니다.',
                    time: '2000.00.00',
                    commentCount: 3
                }
            ],
            searchQuery: '',
            visibleCount: PAGE_SIZE,
            openMenuId: null,
            pendingDeleteId: null,
            deleteModal: null
        };
    },

    computed: {
        filteredItems() {
            const q = this.searchQuery.trim().toLowerCase();
            if (!q) return this.items;
            return this.items.filter(it =>
                it.title.toLowerCase().includes(q) ||
                it.preview.toLowerCase().includes(q)
            );
        },

        visibleItems() {
            return this.filteredItems.slice(0, this.visibleCount);
        }
    },

    watch: {
        searchQuery() {
            this.visibleCount = PAGE_SIZE;
        }
    },

    mounted() {
        // 데모용: ?empty=1 쿼리로 빈 상태 확인
        if (this.getParam('empty')) {
            this.items = [];
        }
        this.$nextTick(() => {
            this.deleteModal = new bootstrap.Modal(this.$refs.deleteModal);
        });
    },

    methods: {
        goDetail(id) {
            this.navigateTo('/account/inquiries/detail', { id });
        },

        toggleMenu(id) {
            this.openMenuId = this.openMenuId === id ? null : id;
        },

        closeMenus() {
            this.openMenuId = null;
        },

        loadMore() {
            this.visibleCount += PAGE_SIZE;
        },

        deleteItem(id) {
            this.openMenuId = null;
            this.pendingDeleteId = id;
            this.deleteModal.show();
        },

        confirmDelete() {
            const idx = this.items.findIndex(it => it.id === this.pendingDeleteId);
            if (idx !== -1) {
                this.items.splice(idx, 1);
            }
            this.pendingDeleteId = null;
            this.deleteModal.hide();
        }
    }
};
