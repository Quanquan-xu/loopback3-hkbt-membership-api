'use strict';
module.exports = function () {
    //4XX - URLs not found
    return function customRaiseUrlNotFoundError(req, res, next) {
        res.redirect("https://membership.businesstimes.com.hk/signin")
        // res.sendFile('index.html', function (err) {
        //     if (err) {
        //         console.error(err);
        //         res.status(err.status).end();
        //     }
        // });
    };
};
