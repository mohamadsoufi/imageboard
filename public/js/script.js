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
            // current_id: '',
            current_id: location.hash.slice(1),

            current_image: [],
            comment: '',
            username: '',
            comments: [],
            lastImageId: [],
            lastImgId: ''
        }, // data ends

        mounted: function () {

            var self = this;
            var lastId = this.lastImageId
            axios.get('/images').then(function (response) {
                self.images = response.data.rows;
                let lastImageId = self.images[self.images.length - 1].id
                lastId.push(lastImageId)
                self.lastImgId = lastImageId
                // console.log('self.lastImgId :', self.lastImgId);
                // console.log('lastImageId up:', lastId);
            }).catch(function (err) {
                console.log('err in GET/ images: ', err);
            });

            window.addEventListener('hashchange', function () {
                self.current_id = location.hash.slice(1)
            })

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
            },

            handleChange: function (e) {
                this.file = e.target.files[0]
            },

            // getCurId: function (id) {
            //     this.current_id = id

            // },
            closeModal: function () {
                // console.log('this in close:', this.current_id);
                // console.log('close component ');
                this.current_id = null
                this.current_image = []
                this.comments = []
                location.hash = ''
                // var self = this
                // var body = document.body;
                // var content = document.getElementsByClassName("content");

                // body.style.height = '100vh';
                // body.style.overflowY = 'visible';

            },
            getComments: function () {
                // e.preventDefault()
                console.log('get comments');
                let self = this
                // console.log('this.comment :', this.comment);

            },
            // getLastId: function () {
            //     let lastImageId = this.images[this.images.length - 1].id
            //     console.log('lastImageId :', lastImageId);
            //     // lastId.push(lastImageId)
            // },
            getMoreImages: function () {
                // console.log('lastImageId in get more:', this.lastImageId[0]);
                // console.log('lastImageId cur id:', this.lastImageId);
                // console.log('self.images :', self.images);



                var self = this
                axios.get('/more-images/' + self.lastImgId).then(function (resp) {
                    // reset the id!!!
                    resp.data.forEach(function (ele) {
                        // console.log('ele :', ele);
                        self.images.push(ele)
                        if (ele.id == 1) {
                            var btn = document.getElementsByClassName('more-btn')[0]
                            btn.classList.add('no-more-btn')
                            btn.innerHTML = 'No More Images'
                        }

                    });
                    let lastImageId = self.images[self.images.length - 1].id

                    self.lastImgId = lastImageId
                }).catch(function (err) {
                    console.log('err in axios GET/ more images :', err);
                })

            },
            // closeCard: function () {
            //     this.current_id = null
            // }
        }
    });

})()