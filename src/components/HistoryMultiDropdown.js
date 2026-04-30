// Dropdown 공통 스타일 가이드 — Type A (Out Area / H36) 다중 선택 드롭다운
// 사용처: 테이블/툴바 위 borderless 셀렉트 (예: 조회 필드 추가 설정)
// 트리거는 borderless, has-value/open 상태에 옅은 스카이블루 fill (pill 느낌)
export default {
    name: 'HistoryMultiDropdown',
    props: {
        modelValue: { type: Array, default: () => [] },
        options: { type: Array, default: () => [] },
        emptyLabel: { type: String, default: '없음' }
    },
    emits: ['update:modelValue'],
    data() {
        return { open: false };
    },
    computed: {
        displayLabel() {
            if (this.modelValue.length === 0) return this.emptyLabel;
            if (this.modelValue.length === 1) {
                const opt = this.options.find(o => o.value === this.modelValue[0]);
                return opt ? opt.label : this.emptyLabel;
            }
            return `${this.modelValue.length}개 선택`;
        }
    },
    mounted() {
        document.addEventListener('mousedown', this.handleClickOutside);
    },
    unmounted() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    methods: {
        toggle() { this.open = !this.open; },
        toggleOption(v) {
            const set = new Set(this.modelValue);
            set.has(v) ? set.delete(v) : set.add(v);
            this.$emit('update:modelValue', Array.from(set));
        },
        handleClickOutside(e) {
            if (this.open && !this.$el.contains(e.target)) {
                this.open = false;
            }
        }
    },
    template: `
        <div class="history-dd history-dd-h36 history-dd-out" :class="{ 'is-open': open, 'is-active': modelValue.length > 0 }">
            <button type="button" class="history-dd-toggle" @click="toggle">
                <span class="history-dd-value">{{ displayLabel }}</span>
                <i class="bi history-dd-chevron" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>
            <div class="history-dd-menu" v-show="open">
                <div class="history-dd-list">
                    <label v-for="opt in options" :key="opt.value" class="history-dd-item history-dd-item-multi">
                        <input type="checkbox" :value="opt.value" :checked="modelValue.includes(opt.value)"
                            @change="toggleOption(opt.value)">
                        <span class="history-dd-item-label">{{ opt.label }}</span>
                    </label>
                </div>
            </div>
        </div>
    `
};
