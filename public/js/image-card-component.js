(function () {

    Vue.component('image-card', {
        template: '#image-card-template',
        props: ['current_id'],
        data: function () {
            return {
                comment: '',
                username: '',
                comments: [],
                curImg: '',
                isHidden: false
            }
        },

        mounted:
            function () {
                var id = this.current_id
                var self = this
                this.comments = []

                axios.get('/image-card/' + id).then(function (response) {
                    response.data.rows.forEach(function (e) {
                        if (response.data.rows.length === 0) {
                            self.$emit('close')

                        }
                        self.comments.unshift(e)
                    });
                    console.log('response.data.rows :', response.data);
                    var { url, username, title, description, id } = response.data.rows[0]
                    self.curImg = response.data.rows[0]

                    var createdAt = response.data.rows[0].created_at
                    self.curImg.created_at = createdAt.slice(0, 10)

                    console.log('self.curImg :', self.curImg);
                }).catch(function (err) {
                    console.log(' closeeee');
                    closeCard()
                    self.$emit('close')

                    console.log('err in GET/ image: ', err);
                });

            },

        watch: {
            current_id: function () {
                var id = location.hash.slice(1)
                var self = this
                axios.get('/image-card/' + id).then(function (response) {
                    response.data.rows.forEach(function (e) {
                        self.comments.unshift(e)
                    })
                    var { url, username, title, description, created_at, id } = response.data.rows[0]

                    self.curImg = response.data.rows[0]
                }).catch(function (err) {
                    console.log('err in GET/ image: ', err);
                });
            }

        },

        methods: {
            //closeCard in temp
            // close in compo @close
            closeCard: function () {
                this.$emit('close')
            },

            addComment: function (e) {
                var self = this
                let comment = {
                    'comment': this.comment,
                    'username': this.username,
                    "id": this.current_id
                }

                axios.post('/comment', comment).then(function (resp) {
                    self.comments.unshift(resp.data)
                    self.comment = ''
                    self.username = ''
                }).catch(function (err) {
                    console.log('err in axios POST /comment: ', err);
                });
            },
        }
    })

})()