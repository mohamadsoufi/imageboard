(function () {

    new Vue({
        // el - represents which element in our html will have access to our Vue code.
        el: '#main',
        // data - an object that we add any info to that is dynamic / we want to render onscreen
        data: {
            name: 'Caper',
            seen: true,
            images: []
        }, // data ends

        // mounted is a lifecycle method that runs when the Vue instance renders
        mounted: function () {
            // console.log('my vue has mounted!');  
            // console.log('this outside axios: ', this);

            var self = this;
            axios.get('/images').then(function (response) {
                // console.log('this inside axios: ', self);
                console.log('response from /images: ', response.data);
                //axios will ALWAYS store the info coming from the server inside a 'data' property
                self.images = response.data;
            });
        },
        methods: {
            myFunction: function () {
                console.log('myFunction is running!!!!!');
            }
        }
    });

})()