(function(window, document) {
    'use strict';
    log.enableAll()
    log.info("too easy");
    var $body = $('body');
    var $content = $body.find('#content')
    $content.html("<h1>sadfdsaf</h1");
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
    var me = this;
    axios.get('/photos').then(function(result) {
        console.log(result.data.length)
        var data = {
            title: "photos",
            comments: _.take(result.data, 100)
        };
        createTabel(data);
    }).catch(function(error) {});

    function createTabel(data) {
        var source = $("#test").html();
        //var template = Handlebars.compile(source);
        var template = Template.test;
        $("#content").html(template(data));
        $('.thumb').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
        // $('.thumb').on('click', function(e) {
        //     var url = e.target.getAttribute("data-url");
        //     $('.ui.modal .image.content .image').attr("src", url);
        //     $('.ui.modal').modal('show');
        // });
    }

    function popupImage(url) {
        $('.image-popup-no-margins').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    }
})(window, document);