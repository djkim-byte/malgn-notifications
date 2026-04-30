export default {
    data() {
        return {
            currentCredit: 120000,
            chargeOptions: [
                { amount: 10000, bonus: 0 },
                { amount: 50000, bonus: 0 },
                { amount: 100000, bonus: 5000 },
                { amount: 300000, bonus: 19500 },
                { amount: 500000, bonus: 40000 },
                { amount: 1000000, bonus: 100000 }
            ],
            selectedAmount: 100000,
            cards: [
                { id: 'master-5547', brand: 'master', maskedNumber: '**********5547', thumbNumber: '1234 · 5678 · 9012 · 3456' },
                { id: 'visa-6118',   brand: 'visa',   maskedNumber: '**********6118', thumbNumber: '1234 · 5678 · 9012 · 3456' }
            ],
            selectedCardId: 'master-5547',
            agreed: false,
            errors: {
                card: false,
                terms: false
            },
            confirmModal: null,
            addCardModal: null,
            cardForm: {
                type: 'personal',
                number: ['', '', '', ''],
                expiryMonth: '',
                expiryYear: '',
                cvc: '',
                password: '',
                alias: ''
            },
            cardErrors: {
                number: false,
                expiry: false,
                cvc: false,
                password: false
            }
        };
    },

    computed: {
        canPay() {
            return this.cards.length > 0 && this.agreed;
        }
    },

    watch: {
        selectedCardId(v) { if (v) this.errors.card = false; },
        agreed(v)         { if (v) this.errors.terms = false; }
    },

    mounted() {
        this.$nextTick(() => {
            this.confirmModal = new bootstrap.Modal(this.$refs.confirmModal);
            this.addCardModal = new bootstrap.Modal(this.$refs.addCardModal);
        });
    },

    methods: {
        formatNumber(value) {
            return Number(value || 0).toLocaleString('ko-KR');
        },

        openAddCardModal() {
            this.resetCardForm();
            if (this.addCardModal) this.addCardModal.show();
        },

        resetCardForm() {
            this.cardForm = {
                number: ['', '', '', ''],
                expiryMonth: '',
                expiryYear: '',
                cvc: '',
                password: '',
                birth: '',
                alias: ''
            };
            this.cardErrors = {
                number: false,
                expiry: false,
                cvc: false,
                password: false
            };
        },

        onCardNumberInput(idx, e) {
            const cleaned = (e.target.value || '').replace(/\D/g, '').slice(0, 4);
            this.cardForm.number[idx] = cleaned;
            if (cleaned) this.cardErrors.number = false;
            if (cleaned.length === 4 && idx < 3) {
                this.$nextTick(() => {
                    const next = e.target.parentElement.querySelector(`[data-cardnum-idx="${idx + 1}"]`);
                    if (next) next.focus();
                });
            }
        },

        onCardNumberKeydown(idx, e) {
            if (e.key === 'Backspace' && !this.cardForm.number[idx] && idx > 0) {
                const prev = e.target.parentElement.querySelector(`[data-cardnum-idx="${idx - 1}"]`);
                if (prev) prev.focus();
            }
        },

        validateCardForm() {
            const f = this.cardForm;
            this.cardErrors.number   = f.number.some(seg => !/^\d{4}$/.test(seg));
            const mm = parseInt(f.expiryMonth, 10);
            this.cardErrors.expiry   = !(/^\d{2}$/.test(f.expiryMonth) && /^\d{2}$/.test(f.expiryYear) && mm >= 1 && mm <= 12);
            this.cardErrors.cvc      = !/^\d{3}$/.test(f.cvc);
            this.cardErrors.password = !/^\d{2}$/.test(f.password);

            return !Object.values(this.cardErrors).some(Boolean);
        },

        submitAddCard() {
            if (!this.validateCardForm()) return;

            const f      = this.cardForm;
            const digits = f.number.join('');
            const last4  = digits.slice(-4);
            const brand  = this.detectBrand(digits);
            const id     = 'card-' + Date.now();

            this.cards.push({
                id,
                brand,
                type: f.type,
                maskedNumber: '**********' + last4,
                thumbNumber: `${f.number[0]} · ${f.number[1]} · **** · ${last4}`,
                alias: f.alias || ''
            });
            this.selectedCardId = id;
            this.errors.card = false;

            if (this.addCardModal) this.addCardModal.hide();
        },

        detectBrand(digits) {
            if (/^4/.test(digits))               return 'visa';
            if (/^(5[1-5]|2[2-7])/.test(digits)) return 'master';
            if (/^3[47]/.test(digits))           return 'amex';
            return 'visa';
        },

        onPayClick() {
            this.errors.card  = this.cards.length === 0;
            this.errors.terms = !this.agreed;
            if (this.errors.card || this.errors.terms) return;

            if (this.confirmModal) this.confirmModal.show();
        },

        confirmCharge() {
            if (this.confirmModal) this.confirmModal.hide();

            // 데모용: 라운드로빈으로 성공/실패 교차
            const turn = parseInt(localStorage.getItem('charge_demo_turn') || '0', 10);
            const isSuccess = turn % 2 === 0;
            localStorage.setItem('charge_demo_turn', String(turn + 1));

            const selected = this.chargeOptions.find(o => o.amount === this.selectedAmount);
            const card     = this.cards.find(c => c.id === this.selectedCardId);
            const orderNo  = this.generateOrderNo();
            const now      = new Date();

            const result = {
                status: isSuccess ? 'success' : 'failed',
                orderNo,
                orderedAt: this.formatDateTime(now),
                amount: this.selectedAmount,
                bonus: selected ? selected.bonus : 0,
                paymentInfo: card ? this.buildPaymentInfo(card) : '신용카드',
                creditBefore: this.currentCredit,
                creditAfter: this.currentCredit + this.selectedAmount + (selected ? selected.bonus : 0),
                bonusExpireAt: this.formatExpireDate(now),
                failReason: '한도 초과'
            };

            sessionStorage.setItem('charge_result', JSON.stringify(result));
            this.navigateTo('/charge/result');
        },

        generateOrderNo() {
            const d = new Date();
            const pad = (n, w = 2) => String(n).padStart(w, '0');
            const random = String(Math.floor(Math.random() * 1e6)).padStart(6, '0');
            return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${random}`;
        },

        formatDateTime(d) {
            const pad = (n) => String(n).padStart(2, '0');
            const hour = d.getHours();
            const ampm = hour < 12 ? '오전' : '오후';
            const h12 = hour % 12 === 0 ? 12 : hour % 12;
            return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${ampm} ${pad(h12)}:${pad(d.getMinutes())}`;
        },

        formatExpireDate(d) {
            const pad = (n) => String(n).padStart(2, '0');
            const expire = new Date(d);
            expire.setFullYear(expire.getFullYear() + 1);
            return `${expire.getFullYear()}.${pad(expire.getMonth() + 1)}.${pad(expire.getDate())}`;
        },

        buildPaymentInfo(card) {
            const brandLabel = card.brand === 'master' ? 'MASTER'
                             : card.brand === 'visa'   ? 'VISA'
                             : '신용카드';
            return `${brandLabel} (${card.maskedNumber}, 일시불)`;
        }
    }
};
