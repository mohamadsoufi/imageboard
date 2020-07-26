(function () {

    Vue.component('image-card', {
        template: '#image-card-template',
        props: ['current_image', 'current_id', 'comments'],
        data: function () {
            return {

                comment: '',
                username: ''

            }
        },

        mounted:
            function () {

                var id = this.current_id
                var self = this


                self.comments = []
                self.current_image = []

                axios.get('/image-card/' + id).then(function (response) {

                    self.comments.unshift(response.data.rows[0])

                    var { url, username, title, description, created_at, id } = response.data.rows[0]
                    self.current_image.unshift(response.data.rows[0])
                }).catch(function (err) {

                    console.log('err in GET/ image: ', err);
                });



            },
        watch: {
            current_id: function () {



                var id = location.hash.slice(1)
                console.log('hash id :', id);
                var self = this
                self.comments = []
                self.current_image = []


                axios.get('/image-card/' + id).then(function (response) {
                    // console.log('response in get >>>>>>>> :', response.data.rows);


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
                this.$emit('close')
            },
            getComment: function (e) {
                var self = this
                e.preventDefault();
                document.getElementById('comment').value = ''
                document.getElementById('username').value = ''

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

                this.$emit('get')
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