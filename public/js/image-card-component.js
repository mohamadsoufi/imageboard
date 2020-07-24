(function () {

    Vue.component('image-card', {
        template: '#image-card-template',
        props: ['current_image', 'current_id',],
        data: function () {
            return {
                // current_image ={}
                // current_image: image
            }
        },

        mounted: function () {

            var id = this.current_id
            var self = this

            axios.get('/image-card/' + id).then(function (response) {
                // console.log('this :', self.current_id);
                // console.log('response in get >>> :', response.data.image);
                var { url, username, title, description, created_at, id } = response.data.image
                self.current_image.unshift(response.data.image)
                // console.log('cardUrl :', current_image);
            })

        },

        methods: {
            closeCard: function () {
                this.$emit('close')
            }



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