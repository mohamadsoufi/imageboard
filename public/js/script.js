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
            current_id: '',
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

            getCurId: function (id) {

                this.current_id = id

            },
            closeModal: function () {
                // console.log('this in close:', this.current_id);
                console.log('close component ');
                this.current_id = null
                var self = this
                // var body = document.body;
                // var content = document.getElementsByClassName("content");
                // console.log('content in close :', content[0]);
                // content[0].style.visibility = 'visible';

                // body.style.height = '100vh';
                // body.style.overflowY = 'visible';

            },





            // closeCard: function () {
            //     this.current_id = null
            // }
        }
    });

})()