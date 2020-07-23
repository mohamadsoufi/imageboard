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
            currentId: '',
            current_image: [],
        }, // data ends

        mounted: function () {

            var self = this;
            axios.get('/images').then(function (response) {
                self.images = response.data;
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
            clickImage: function (id) {
                var self = this

                console.log('content clicked')
                // console.log('id :', id);
                this.currentId = id

                axios.get('/image-card/' + self.currentId).then(function (response) {
                    // console.log('this :', self.currentId);
                    // console.log('response in get >>> :', response.data.image);
                    var { url, username, title, description, created_at, id } = response.data.image
                    self.current_image.unshift(response.data.image)
                    // console.log('cardUrl :', current_image);
                })

            },
            closeModal: function () {
                console.log('click handled')
                //   this.file = e.target.files[0] something like that 

            },
        }
    });

})()