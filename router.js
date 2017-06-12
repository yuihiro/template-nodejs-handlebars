var express = require('express');
var axios = require('axios');
//var upload = multer()
var router = express.Router();
//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
router.use(function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// router.get('/', function(req, res, next) {
//     axios.get('/posts').then(function(result) {
//         console.log(result.data.length)
//         var data = {
//             title: "post",
//             comments: result.data
//         };
//         res.render('home', data);
//     }).catch(function(error) {});
// })
router.get('/photo', function(req, res, next) {
    axios.get('/photos').then(function(result) {
        console.log(result.data.length)
        var data = {
            title: "photo",
            comments: result.data
        };
        res.render('view1', data);
    }).catch(function(error) {});
})
// router.post('/post', upload.array(), function (req, res, next) {
//     res.json(req.body);
// });
// router.get('/search', function(req, res, next) {
//     log.debug(JSON.stringify(req.params));
//     var age = req.query.age;
//     var ua = req.headers['user-agent'];
//     var result = {
//         'age': age,
//         'ua': ua,
//         'value': JSON.stringify(req.params)
//     };
//     res.json(result);
// })
// router.get('/api/:name', function(req, res, next) {
//     res.send('hello ' + req.params.name);
// })
router.get('/mysql', function(req, res, next) {
    var result = [];
    connection.connect();
    //connection.query('SELECT * from system_log_tbl limit 10', function (error, results, fields) {
    connection.query("select * from user_type_config_tbl where used = 'Y' order by caption", function(error, results, fields) {
        if(error) throw error;
        log.debug(results);
        _.forEach(results, function(item) {
            result.push({
                id: item.type_code,
                item: item.caption,
                comment: item.vlan_id
            });
        });
        log.debug(result);
        res.json(result);
    });
    connection.end();
});
module.exports = router;