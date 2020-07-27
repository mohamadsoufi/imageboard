(function () {

    Vue.component('image-card', {
        template: '#image-card-template',
        props: ['current_image', 'current_id'],
        data: function () {
            return {

                comment: '',
                username: '',
                comments: [],


            }
        },

        mounted:
            function () {
                // function getImg() {
                var id = this.current_id
                var self = this
                // this.$emit('resetImgArr')
                this.comments = []

                axios.get('/image-card/' + id).then(function (response) {
                    // console.log('response.data.rows all comments :', response.data.rows);
                    response.data.rows.forEach(function (e) {

                        self.comments.unshift(e)
                    });


                    var { url, username, title, description, created_at, id } = response.data.rows[0]
                    self.current_image.unshift(response.data.rows[0])
                }).catch(function (err) {

                    console.log('err in GET/ image: ', err);
                });


            },
        watch: {
            current_id: function () {

                var id = location.hash.slice(1)
                var self = this
                this.comments = []
                this.current_image = []
                // this.$emit('resetImgArr')

                axios.get('/image-card/' + id).then(function (response) {


                    self.comments.unshift(response.data.rows[0])

                    var { url, username, title, description, created_at, id } = response.data.rows[0]

                    self.current_image.unshift(response.data.rows[0])
                }).catch(function (err) {
                    console.log('err in GET/ image: ', err);
                });
            }

        },

        methods: {
            //closeCard in temp
            // close in compo @close
            closeCard: function () {
                // e.stopPropagation();

                // document.getElementsByClassName('no-click-area').addEventListener("click", function (el) {
                //     el.stopPropagation();
                // });
                console.log('clickedddddd');
                this.$emit('close')
                // if (closable) {

                // }
            },
            getComment: function (e) {
                var self = this
                e.preventDefault();
                document.getElementById('comment').value = ''
                document.getElementById('username').value = ''

                this.comments = []
                this.current_image = []
                let comment = {
                    'comment': this.comment,
                    'username': this.username,
                    "id": this.current_id
                }

                axios.post('/comment', comment).then(function (resp) {
                    // console.log('resp in comment :', resp);
                    // self.images.unshift(resp.data.image)

                }).catch(function (err) {
                    console.log('err in axios POST /comment: ', err);
                });

                // this.$emit('get')
            },

            // noScroll: function () {
            //     console.log('no scroll :');
            //     var body = document.body;
            //     var content = document.getElementsByClassName("content");
            //     console.log('content :', content[0]);
            //     // content[0].style.visibility = 'hidden';
            //     body.style.height = '100vh'
            //     body.style.overflowY = 'hidden';

            // },
        }
    })

})()