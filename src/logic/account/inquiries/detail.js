export default {
    name: 'AccountInquiryDetail',
    layout: 'default',

    data() {
        return {
            id: this.getParam('id'),
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
            inquiry: {
                id: 1,
                status: 'pending',
                category: 'payment',
                title: '1:1 문의 제목',
                time: '2000.00.00',
                commentCount: 10,
                content: '1:1 문의내역 내용',
                files: [
                    { name: 'image.jpg', url: '#' },
                    { name: 'image.jpg', url: '#' }
                ]
            },
            comments: [
                {
                    id: 1,
                    name: '관리자 닉네임',
                    time: '1시간 전',
                    text: '해당 강의는 초보자도 수강할 수 있도록 구성되어 있습니다. 기본 개념부터 차근차근 설명하며, 중간중간 실무 예시를 함께 다루기 때문에 관련 경험이 없으신 분들도 따라오실 수 있습니다.\n다만, 용어 자체가 처음인 경우에는 초반 강의에서 다소 낯설게 느껴질 수는 있으나 강의를 순서대로 수강하시면 자연스럽게 이해하실 수 있도록 구성되어 있습니다. 기초부터 정리하고 싶은 분들께 특히 추천드립니다.',
                    isMine: false,
                    mention: null,
                    replies: []
                },
                {
                    id: 2,
                    name: '닉네임',
                    time: '2000.00.00',
                    text: '해당 강의는 초보자도 수강할 수 있도록 구성되어 있습니다. 기본 개념부터 차근차근 설명하며, 중간중간 실무 예시를 함께 다루기 때문에 관련 경험이 없으신 분들도 따라오실 수 있습니다.\n다만, 용어 자체가 처음인 경우에는 초반 강의에서 다소 낯설게 느껴질 수는 있으나 강의를 순서대로 수강하시면 자연스럽게 이해하실 수 있도록 구성되어 있습니다.\n기초부터 정리하고 싶은 분들께 특히 추천드립니다.',
                    isMine: true,
                    mention: '닉네임',
                    replies: []
                },
                {
                    id: 3,
                    name: '관리자 닉네임',
                    time: '2000.00.00',
                    text: '해당 강의는 초보자도 수강할 수 있도록 구성되어 있습니다. 기본 개념부터 차근차근 설명하며, 중간중간 실무 예시를 함께 다루기 때문에 관련 경험이 없으신 분들도 따라오실 수 있습니다.\n다만, 용어 자체가 처음인 경우에는 초반 강의에서 다소 낯설게 느껴질 수는 있으나 강의를 순서대로 수강하시면 자연스럽게 이해하실 수 있도록 구성되어 있습니다.\n기초부터 정리하고 싶은 분들께 특히 추천드립니다.',
                    isMine: false,
                    mention: '닉네임',
                    replies: [
                        {
                            id: 31,
                            name: '닉네임',
                            time: '방금 전',
                            text: '당 강의는 초보자도 수강할 수 있도록 구성되어 있습니다. 기본 개념부터 차근차근 설명하며, 중간중간 실무 예시를 함께 다루기 때문에 관련 경험이 없으신 분들도 따라오실 수 있습니다.\n다만, 용어 자체가 처음인 경우에는 초반 강의에서 다소 낯설게 느껴질 수는 있으나 강의를 순서대로 수강하시면 자연스럽게 이해하실 수 있도록 구성되어 있습니다.',
                            isMine: true,
                            mention: '닉네임'
                        }
                    ]
                }
            ],
            openMenuKey: null,
            replyingTo: null,
            replyText: '',
            editingId: null,
            editingReplyId: null,
            editText: '',
            replyUid: 100,
            commentUid: 100,
            deleteModal: null,
            deleteTarget: null,
            deleteMessage: ''
        };
    },

    mounted() {
        this.$nextTick(() => {
            this.deleteModal = new bootstrap.Modal(this.$refs.deleteModal);
        });
    },

    methods: {
        toggleMenu(key) {
            this.openMenuKey = this.openMenuKey === key ? null : key;
        },

        closeAllMenus() {
            this.openMenuKey = null;
        },

        downloadFile(file) {
            // 실제 환경에서는 file.url 을 통해 다운로드
            this.log && this.log('download', file.name);
        },

        // 상단 액션
        onEdit() {
            this.openMenuKey = null;
            this.navigateTo('/inquiry', { id: this.inquiry.id, mode: 'edit' });
        },

        onDelete() {
            this.openMenuKey = null;
            this.deleteTarget = { type: 'inquiry' };
            this.deleteMessage = '문의 내역을 삭제하시겠습니까?';
            this.deleteModal.show();
        },

        // 답글 입력
        startReply(commentId, mentionName) {
            this.replyingTo = commentId;
            this.replyText = mentionName ? '@' + mentionName + ' ' : '';
            this.editingId = null;
            this.editingReplyId = null;
        },

        cancelReply() {
            this.replyingTo = null;
            this.replyText = '';
        },

        saveReply(commentId, parentName) {
            const text = this.replyText.trim();
            if (!text) return;
            const c = this.comments.find(x => x.id === commentId);
            if (!c) return;
            c.replies = c.replies || [];
            c.replies.push({
                id: ++this.replyUid,
                name: '닉네임',
                time: '방금 전',
                text,
                isMine: true,
                mention: parentName
            });
            this.cancelReply();
        },

        // 댓글 수정
        startEdit(comment) {
            this.openMenuKey = null;
            this.editingId = comment.id;
            this.editingReplyId = null;
            this.editText = comment.text;
            this.replyingTo = null;
        },

        startEditReply(commentId, reply) {
            this.openMenuKey = null;
            this.editingReplyId = reply.id;
            this.editingId = null;
            this.editText = reply.text;
            this.replyingTo = null;
        },

        cancelEdit() {
            this.editingId = null;
            this.editingReplyId = null;
            this.editText = '';
        },

        saveEdit(commentId) {
            const text = this.editText.trim();
            if (!text) return;
            const c = this.comments.find(x => x.id === commentId);
            if (c) c.text = text;
            this.cancelEdit();
        },

        saveEditReply(commentId, replyId) {
            const text = this.editText.trim();
            if (!text) return;
            const c = this.comments.find(x => x.id === commentId);
            if (!c) return;
            const r = (c.replies || []).find(x => x.id === replyId);
            if (r) r.text = text;
            this.cancelEdit();
        },

        // 댓글 삭제
        deleteComment(commentId) {
            this.openMenuKey = null;
            this.deleteTarget = { type: 'comment', commentId };
            this.deleteMessage = '댓글을 삭제하시겠습니까?';
            this.deleteModal.show();
        },

        deleteReply(commentId, replyId) {
            this.openMenuKey = null;
            this.deleteTarget = { type: 'reply', commentId, replyId };
            this.deleteMessage = '답글을 삭제하시겠습니까?';
            this.deleteModal.show();
        },

        confirmDelete() {
            const target = this.deleteTarget;
            if (!target) return;

            if (target.type === 'inquiry') {
                this.deleteModal.hide();
                this.navigateTo('/account/inquiries');
                return;
            }

            if (target.type === 'comment') {
                const idx = this.comments.findIndex(c => c.id === target.commentId);
                if (idx !== -1) this.comments.splice(idx, 1);
            }

            if (target.type === 'reply') {
                const c = this.comments.find(x => x.id === target.commentId);
                if (c && c.replies) {
                    const idx = c.replies.findIndex(r => r.id === target.replyId);
                    if (idx !== -1) c.replies.splice(idx, 1);
                }
            }

            this.deleteTarget = null;
            this.deleteModal.hide();
        }
    }
};
