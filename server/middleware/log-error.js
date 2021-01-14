module.exports = function() {
  return function logError(err, req, res, next) {
    console.log('ERR', req.url, err);
    throw new Error('BROKEN')
    // res.redirect('http://localhost:3000/signin');
    // return;
    // res.writeHead(302, {
    //   'Location': 'http://localhost:3000/signin'
    //   //add other headers here...
    // });
    // res.end();
  };
};
