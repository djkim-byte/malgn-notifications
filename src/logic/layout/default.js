export default {
    data() {
        return {
            activeDropdown: null,
            dropdownTimeout: null,
            mobileMenuOpen: false,
            isLoggedIn: false,
            userName: '',
            credit: 120000
        };
    },

    mounted() {
        this.checkAuth();
        // 클릭 시 드롭다운 닫기
        document.addEventListener('click', this.handleOutsideClick);
    },

    unmounted() {
        document.removeEventListener('click', this.handleOutsideClick);
        if (this.dropdownTimeout) {
            clearTimeout(this.dropdownTimeout);
        }
    },

    methods: {
        checkAuth() {
            const token = localStorage.getItem('auth_token');
            const user = localStorage.getItem('user');
            this.isLoggedIn = !!token;
            if (user) {
                try {
                    const userData = JSON.parse(user);
                    this.userName = userData.name || userData.email || '사용자';
                } catch (e) {
                    this.userName = '사용자';
                }
            }
        },

        openDropdown(name) {
            if (this.dropdownTimeout) {
                clearTimeout(this.dropdownTimeout);
                this.dropdownTimeout = null;
            }
            this.activeDropdown = name;
        },

        closeDropdown(name) {
            this.dropdownTimeout = setTimeout(() => {
                if (this.activeDropdown === name) {
                    this.activeDropdown = null;
                }
            }, 150);
        },

        closeAllDropdowns() {
            this.activeDropdown = null;
            this.mobileMenuOpen = false;
        },

        handleOutsideClick(e) {
            const navbar = document.querySelector('.gnb-navbar');
            if (navbar && !navbar.contains(e.target)) {
                this.closeAllDropdowns();
            }
        },

        handleLogin() {
            this.closeAllDropdowns();
            this.navigateTo('/login');
        },

        handleMenuClick(path) {
            this.closeAllDropdowns();
            if (!this.isLoggedIn) {
                this.navigateTo('/login');
                return;
            }
            this.navigateTo(path);
        },

        handleParentMenuClick() {
            if (!this.isLoggedIn) {
                this.closeAllDropdowns();
                this.navigateTo('/login');
            }
        },

        handleLogout() {
            this.closeAllDropdowns();
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.userName = '';
        },

        formatCredit(value) {
            return Number(value || 0).toLocaleString('ko-KR');
        }
    }
}
