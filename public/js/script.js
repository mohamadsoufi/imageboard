(function () {

    new Vue({
        // el - represents which element in our html will have access to our Vue code.
        el: '#main',
        data: {
            seen: true,
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
            created_at: '',
            id: '',
            current_id: location.hash.slice(1),
            current_image: [],
            comment: '',
            username: '',
            lastImageId: [],
            lastImgId: '',
            isHidden: false,

        }, // data ends

        mounted: function () {

            var self = this;
            var lastId = this.lastImageId
            axios.get('/images').then(function (response) {
                self.images = response.data.rows;
                let lastImageId = self.images[self.images.length - 1].id
                lastId.push(lastImageId)
                self.lastImgId = lastImageId

            }).catch(function (err) {
                console.log('err in GET/ images: ', err);
            });

            window.addEventListener('hashchange', function () {
                self.current_id = location.hash.slice(1)
            })
            this.scroll();
        },

        methods: {
            handleClick: function (e) {
                e.preventDefault();
                let self = this
                var formData = new FormData();
                formData.append('title', this.title);
                formData.append('description', this.description);
                formData.append('username', this.username);
                formData.append('file', this.file);

                axios.post('/upload', formData).then(function (resp) {
                    self.images.unshift(resp.data.image)

                }).catch(function (err) {
                    console.log('err in POST /upload: ', err);
                });
                self.title = ''
                self.description = ''
                self.username = ''
            },

            handleChange: function (e) {
                this.file = e.target.files[0]
            },

            closeModal: function () {
                this.current_id = null
                this.current_image = []
                location.hash = ''
                // var body = document.body;
                // body.style.height = '100vh';
                // body.style.overflowY = 'hidden';

            },


            scroll: function () {

                var self = this
                window.onscroll = function () {
                    let bottomOfWindow = Math.floor(document.documentElement.scrollTop) + Math.floor(window.innerHeight) + 1 > Math.floor(document.documentElement.offsetHeight) - 100

                    if (bottomOfWindow) {
                        axios.get('/more-images/' + self.lastImgId).then(function (resp) {
                            resp.data.forEach(function (ele) {
                                self.images.push(ele)
                            });
                            let lastImageId = self.images[self.images.length - 1].id
                            self.lastImgId = lastImageId
                            // console.log('scrolling ');
                        }).catch(function (err) {
                            console.log('err in axios GET/ more images :', err);
                        })

                    }
                };
            },

        }
    });

})()