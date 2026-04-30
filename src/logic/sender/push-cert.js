// 발신 정보 > PUSH 인증 관리

const SECTIONS = [
    {
        key: 'fcm',
        label: 'FCM 인증 설정',
        title: 'FCM 서비스 계정 키 등록',
        toggleLabel: '서비스 계정 키 등록',
        notes: [
            'Android 기기에 푸시 알림 메시지를 전송하기 위해 유효한 FCM 서비스 계정 키(Service Account Credential) 정보를 입력하세요.'
        ]
    },
    {
        key: 'apns',
        label: 'APNS 인증 설정',
        title: 'APNS JWT 인증서 등록',
        toggleLabel: 'APNS JWT 인증서 등록',
        notes: [
            'iOS 기기에 푸시 알림 메시지를 전송하기 위해 Apple Developer 사이트에서 발급 받은 APNS JWT 인증서 정보를 입력하세요.'
        ]
    },
    {
        key: 'adm',
        label: 'ADM 인증 설정',
        title: 'ADM 자격 증명 등록',
        toggleLabel: '자격 증명 등록',
        notes: [
            'Kindle Fire 앱에 푸시 알림 메시지를 전송하기 위해 클라이언트 정보를 입력하세요.'
        ]
    }
];

function emptyForm() {
    return {
        fcm: {
            enabled: false,
            serviceAccountKey: ''
        },
        apns: {
            enabled: false,
            keyId: '',
            teamId: '',
            bundleId: '',
            env: 'production',
            fileName: '',
            file: null
        },
        adm: {
            enabled: false,
            clientId: '',
            clientSecret: ''
        }
    };
}

export default {
    name: 'SenderPushCertPage',
    layout: 'default',

    data() {
        return {
            sections: SECTIONS,
            open: { fcm: true, apns: true, adm: true },
            form: emptyForm(),
            savedForm: emptyForm(),
            modals: {},
            resultMessage: ''
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.modals = {
                result: new bootstrap.Modal(this.$refs.resultModal)
            };
        });
    },

    methods: {
        toggleOpen(key) {
            this.open[key] = !this.open[key];
        },

        pickFile(key) {
            const refKey = key + 'File';
            const ref = this.$refs[refKey];
            const el = Array.isArray(ref) ? ref[0] : ref;
            el && el.click();
        },

        onFileChange(e, key) {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            this.form[key].fileName = file.name;
            this.form[key].file = file;
        },

        validate(key) {
            const f = this.form[key];
            if (!f.enabled) return true;
            if (key === 'fcm') {
                if (!f.serviceAccountKey.trim()) {
                    this.showResult('FCM 서비스 계정 키를 입력해 주세요.');
                    return false;
                }
                try {
                    JSON.parse(f.serviceAccountKey);
                } catch (e) {
                    this.showResult('FCM 서비스 계정 키는 유효한 JSON 형식이어야 합니다.');
                    return false;
                }
            } else if (key === 'apns') {
                if (!f.keyId.trim() || !f.teamId.trim() || !f.bundleId.trim()) {
                    this.showResult('Key ID, Team ID, Bundle ID를 모두 입력해 주세요.');
                    return false;
                }
                if (!f.fileName) {
                    this.showResult('APNS 인증 키(.p8) 파일을 업로드해 주세요.');
                    return false;
                }
            } else if (key === 'adm') {
                if (!f.clientId.trim() || !f.clientSecret.trim()) {
                    this.showResult('Client ID와 Client Secret을 입력해 주세요.');
                    return false;
                }
            }
            return true;
        },

        save(key) {
            if (!this.validate(key)) return;
            this.savedForm[key] = JSON.parse(JSON.stringify({
                ...this.form[key],
                file: null
            }));
            this.showResult('저장되었습니다.');
        },

        cancel(key) {
            const snapshot = this.savedForm[key];
            this.form[key] = JSON.parse(JSON.stringify(snapshot));
        },

        openGuide(key) {
            const map = {
                fcm: 'FCM 서비스 계정 키 발급 가이드',
                apns: 'APNS JWT 인증서 발급 가이드',
                adm: 'ADM 자격 증명 발급 가이드'
            };
            this.showResult(map[key] + '는 운영가이드 문서를 참고해 주세요.');
        },

        showResult(msg) {
            this.resultMessage = msg;
            this.modals.result && this.modals.result.show();
        },

        closeModal(name) {
            this.modals[name] && this.modals[name].hide();
        }
    }
};
