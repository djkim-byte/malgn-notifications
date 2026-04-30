export default {
    name: 'ManageSettings',
    layout: 'default',

    data() {
        return {
            activeTab: 'sms',

            tabs: [
                { value: 'sms', label: '문자 메시지' },
                { value: 'rcs', label: 'RCS' },
                { value: 'push', label: 'PUSH' },
                { value: 'webhook', label: '웹훅' },
                { value: 'backup', label: '백업' }
            ],

            sections: {
                smsIntl: true,
                smsDup: true,
                smsAd: true,
                rcsAd: true,
                pushTokenExpire: true,
                pushAppType: true,
                pushDup: true,
                pushCollect: true,
                pushAdLabel: true,
                pushAdReconsent: true
            },

            sms: {
                intl: {
                    enabled: 'off',
                    monthlyLimit: 1000,
                    allowedCountries: [
                        { code: 'US', label: '미국/캐나다(1)' },
                        { code: 'GB', label: '영국(44)' },
                        { code: 'AU', label: '호주(61)' },
                        { code: 'IN', label: '인도네시아(62)' },
                        { code: 'PH', label: '필리핀(63)' },
                        { code: 'TH', label: '태국(66)' },
                        { code: 'JP', label: '일본(81)' },
                        { code: 'VN', label: '베트남(84)' },
                        { code: 'CN', label: '중국(86)' },
                        { code: 'IND', label: '인도(91)' },
                        { code: 'HK', label: '홍콩(852)' },
                        { code: 'TW', label: '대만(886)' }
                    ]
                },
                dup: {
                    enabled: 'off',
                    blockMinutes: '10'
                },
                ad: {
                    enabled: 'off',
                    startTime: '21:00',
                    endTime: '08:00',
                    failPolicy: 'fail'
                }
            },

            rcs: {
                ad: {
                    enabled: 'off',
                    startTime: '20:00',
                    endTime: '09:00',
                    failPolicy: 'fail'
                }
            },

            push: {
                token: {
                    expireMonths: '12',
                    appType: 'multi'
                },
                dup: {
                    enabled: 'off',
                    blockMinutes: '10'
                },
                collect: {
                    enabled: 'off'
                },
                adLabel: {
                    position: 'title'
                },
                adReconsent: {
                    reserveDay: '3',
                    reserveHour: '11',
                    inputType: 'basic',
                    title: '광고성 메시지 수신 동의 안내',
                    content: '정보통신망법 제50조 제8항(영리목적의 광고성 정보 전송 제한)에 따라 광고성 메시지 수신 동의 사실을 수신 동의를 받은 날로부터 2년마다 안내드립니다.\n- 광고성 메시지 수신 동의 일시: \'###AD_AGREEMENT_DATE_TIME###\'\n- 수신 동의 철회 방법: 알림 설정 메뉴'
                }
            },

            webhook: {
                enabled: 'off',
                url: '',
                retryCount: '3'
            },

            backup: {
                enabled: 'off',
                interval: 'daily',
                retention: '90'
            },

            substitution: {
                mode: 'replace'
            },

            // 시간 옵션 (광고 발송 제한)
            startTimeOptions: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
            endTimeOptions: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'],

            // 24시간 옵션 (PUSH 야간 차단)
            fullDayTimeOptions: (() => {
                const arr = [];
                for (let h = 0; h < 24; h++) {
                    const hh = String(h).padStart(2, '0');
                    arr.push(`${hh}:00`);
                    arr.push(`${hh}:30`);
                }
                return arr;
            })(),

            alertText: '',
            modals: null,

            // 마지막으로 저장된 스냅샷 (취소 시 복원)
            snapshot: null
        };
    },

    mounted() {
        this.snapshot = JSON.parse(JSON.stringify({
            sms: this.sms,
            rcs: this.rcs,
            push: this.push,
            webhook: this.webhook,
            backup: this.backup,
            substitution: this.substitution
        }));

        this.$nextTick(() => {
            this.modals = {
                alert: new bootstrap.Modal(this.$refs.alertModal),
                substitution: new bootstrap.Modal(this.$refs.substitutionModal)
            };
        });
    },

    methods: {
        showAlert(text) {
            this.alertText = text;
            if (this.modals && this.modals.alert) {
                this.modals.alert.show();
            }
        },

        closeAlert() {
            if (this.modals && this.modals.alert) {
                this.modals.alert.hide();
            }
        },

        openSubstitutionModal() {
            if (this.modals && this.modals.substitution) {
                this.modals.substitution.show();
            }
        },

        closeSubstitutionModal() {
            if (this.modals && this.modals.substitution) {
                this.modals.substitution.hide();
            }
        },

        confirmSubstitution() {
            this.closeSubstitutionModal();
            this.showAlert('대체 문자 설정이 저장되었습니다.');
        },

        saveSection(name) {
            this.updateSnapshot();
            const labels = {
                smsIntl: '국제 SMS 설정',
                smsDup: '메시지 중복 발송 차단',
                smsAd: '광고 발송 제한',
                rcsAd: 'RCS 광고 발송 제한',
                pushTokenExpire: '토큰 만료 기간',
                pushAppType: '앱 유형',
                pushDup: 'PUSH 중복 발송 차단',
                pushCollect: '메시지 수신/확인 수집',
                pushAdLabel: '광고 표시 문구 위치',
                pushAdReconsent: '광고성 수신 재동의 자동 발송',
                webhook: '웹훅',
                backup: '백업'
            };
            this.showAlert(`${labels[name] || '설정'}이(가) 저장되었습니다.`);
        },

        cancelSection(name) {
            if (!this.snapshot) return;
            const map = {
                smsIntl: () => { this.sms.intl = JSON.parse(JSON.stringify(this.snapshot.sms.intl)); },
                smsDup: () => { this.sms.dup = JSON.parse(JSON.stringify(this.snapshot.sms.dup)); },
                smsAd: () => { this.sms.ad = JSON.parse(JSON.stringify(this.snapshot.sms.ad)); },
                rcsAd: () => { this.rcs.ad = JSON.parse(JSON.stringify(this.snapshot.rcs.ad)); },
                pushTokenExpire: () => { this.push.token.expireMonths = this.snapshot.push.token.expireMonths; },
                pushAppType: () => { this.push.token.appType = this.snapshot.push.token.appType; },
                pushDup: () => { this.push.dup = JSON.parse(JSON.stringify(this.snapshot.push.dup)); },
                pushCollect: () => { this.push.collect = JSON.parse(JSON.stringify(this.snapshot.push.collect)); },
                pushAdLabel: () => { this.push.adLabel = JSON.parse(JSON.stringify(this.snapshot.push.adLabel)); },
                pushAdReconsent: () => { this.push.adReconsent = JSON.parse(JSON.stringify(this.snapshot.push.adReconsent)); },
                webhook: () => {
                    this.webhook = JSON.parse(JSON.stringify(this.snapshot.webhook));
                },
                backup: () => {
                    this.backup = JSON.parse(JSON.stringify(this.snapshot.backup));
                }
            };
            if (map[name]) map[name]();
        },

        sendReconsentTest() {
            this.showAlert('테스트 메시지가 발송되었습니다.');
        },

        saveAll() {
            this.updateSnapshot();
            this.showAlert('모든 설정이 저장되었습니다.');
        },

        cancelAll() {
            if (!this.snapshot) return;
            this.sms = JSON.parse(JSON.stringify(this.snapshot.sms));
            this.rcs = JSON.parse(JSON.stringify(this.snapshot.rcs));
            this.push = JSON.parse(JSON.stringify(this.snapshot.push));
            this.webhook = JSON.parse(JSON.stringify(this.snapshot.webhook));
            this.backup = JSON.parse(JSON.stringify(this.snapshot.backup));
            this.substitution = JSON.parse(JSON.stringify(this.snapshot.substitution));
        },

        updateSnapshot() {
            this.snapshot = JSON.parse(JSON.stringify({
                sms: this.sms,
                rcs: this.rcs,
                push: this.push,
                webhook: this.webhook,
                backup: this.backup,
                substitution: this.substitution
            }));
        }
    }
};
