(function () {

    Vue.component('image-card', {
        template: '#image-card-template',
        props: ['current_image'],
        data: function () {
            return {
                // current_image
            }
        },

        mounted: function () {
            // var self = this
            // axios.get('/image-card/' + self.props).then(function (response) {
            //     // console.log('this.props :', this.props);
            //     // console.log('id in image card :', self.propes);
            // })
        },

        methods: {
            closeModal: function () {

                console.log('close component ');
                // this.$emit('close', data.id = null)
            }
        },

    })



})()