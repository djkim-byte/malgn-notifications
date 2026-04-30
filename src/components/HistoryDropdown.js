// Dropdown 공통 스타일 가이드 — Type B (In/H40 폼 스타일) 단일 선택 드롭다운
// searchable 옵션으로 메뉴 상단에 검색 입력 표시 (플로우 이름·발신 정보 케이스)
// 메뉴 패널: 흰 배경 + 스카이블루 테두리, 항목 hover=회색, selected=옅은 스카이 + 스카이 글자
export default {
    name: 'HistoryDropdown',
    props: {
        modelValue: { type: [String, Number, Boolean], default: '' },
        options: { type: Array, default: () => [] },
        placeholder: { type: String, default: '선택' },
        size: { type: String, default: 'h40' },
        disabled: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        searchable: { type: Boolean, default: false },
        searchPlaceholder: { type: String, default: '검색' }
    },
    emits: ['update:modelValue'],
    data() {
        return { open: false, searchTerm: '' };
    },
    computed: {
        currentLabel() {
            const opt = this.options.find(o => o.value === this.modelValue);
            return opt ? opt.label : '';
        },
        filteredOptions() {
            if (!this.searchable || !this.searchTerm) return this.options;
            const t = this.searchTerm.toLowerCase();
            return this.options.filter(o => String(o.label).toLowerCase().includes(t));
        }
    },
    mounted() {
        document.addEventListener('mousedown', this.handleClickOutside);
    },
    unmounted() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    methods: {
        toggle() {
            if (this.disabled) return;
            this.open = !this.open;
            if (this.open) {
                this.searchTerm = '';
                if (this.searchable) {
                    this.$nextTick(() => {
                        this.$refs.searchInput && this.$refs.searchInput.focus();
                    });
                }
            }
        },
        select(value) {
            this.$emit('update:modelValue', value);
            this.open = false;
        },
        handleClickOutside(e) {
            if (this.open && !this.$el.contains(e.target)) {
                this.open = false;
            }
        }
    },
    template: `
        <div class="history-dd"
            :class="['history-dd-' + size, { 'is-open': open, 'is-disabled': disabled, 'is-error': error, 'is-empty': !currentLabel }]">
            <button type="button" class="history-dd-toggle" :disabled="disabled" @click="toggle">
                <span class="history-dd-value">{{ currentLabel || placeholder }}</span>
                <i class="bi history-dd-chevron" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>
            <div class="history-dd-menu" v-show="open">
                <div v-if="searchable" class="history-dd-search">
                    <i class="bi bi-search"></i>
                    <input ref="searchInput" type="text" v-model="searchTerm" :placeholder="searchPlaceholder">
                </div>
                <div class="history-dd-list">
                    <button v-for="opt in filteredOptions" :key="opt.value" type="button"
                        class="history-dd-item"
                        :class="{ 'is-active': opt.value === modelValue }"
                        @click="select(opt.value)">
                        <span class="history-dd-item-label">{{ opt.label }}</span>
                        <i v-if="opt.value === modelValue" class="bi bi-check2 history-dd-item-check"></i>
                    </button>
                    <div v-if="filteredOptions.length === 0" class="history-dd-empty">검색 결과가 없습니다.</div>
                </div>
            </div>
        </div>
    `
};
