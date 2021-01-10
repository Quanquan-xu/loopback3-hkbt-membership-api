'use strict';

// module.exports = function(Member) {

// };

var config = require('../../server/config.json');
var path = require('path');

//Replace this address with your actual address
var senderAddress = 'noreply@businesstimes.com.hk';

module.exports = function(Member) {
  //send verification email after registration
  Member.disableRemoteMethodByName("upsert");                               // disables PATCH /Members
  Member.disableRemoteMethodByName("find");                                 // disables GET /Members
  Member.disableRemoteMethodByName("replaceOrCreate");                      // disables PUT /Members
  //Member.disableRemoteMethodByName("create");                               // disables POST /Members

  //Member.disableRemoteMethodByName("prototype.updateAttributes");           // disables PATCH /Members/{id}
  //Member.disableRemoteMethodByName("findById");                             // disables GET /Members/{id}
  Member.disableRemoteMethodByName("exists");                               // disables HEAD /Members/{id}
  Member.disableRemoteMethodByName("replaceById");                          // disables PUT /Members/{id}
  Member.disableRemoteMethodByName("deleteById");                           // disables DELETE /Members/{id}

  Member.disableRemoteMethodByName('prototype.__get__accessTokens');        // disable GET /Members/{id}/accessTokens
  Member.disableRemoteMethodByName('prototype.__create__accessTokens');     // disable POST /Members/{id}/accessTokens
  Member.disableRemoteMethodByName('prototype.__delete__accessTokens');     // disable DELETE /Members/{id}/accessTokens

  Member.disableRemoteMethodByName('prototype.__findById__accessTokens');   // disable GET /Members/{id}/accessTokens/{fk}
  Member.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // disable PUT /Members/{id}/accessTokens/{fk}
  Member.disableRemoteMethodByName('prototype.__destroyById__accessTokens');// disable DELETE /Members/{id}/accessTokens/{fk}

  Member.disableRemoteMethodByName('prototype.__count__accessTokens');      // disable  GET /Members/{id}/accessTokens/count

  //Member.disableRemoteMethodByName("prototype.verify");                     // disable POST /Members/{id}/verify
  //Member.disableRemoteMethodByName("changePassword");                       // disable POST /Members/change-password
  Member.disableRemoteMethodByName("createChangeStream");                   // disable GET and POST /Members/change-stream

  //Member.disableRemoteMethodByName("confirm");                              // disables GET /Members/confirm
  Member.disableRemoteMethodByName("count");                                // disables GET /Members/count
  Member.disableRemoteMethodByName("findOne");                              // disables GET /Members/findOne

  //Member.disableRemoteMethodByName("login");                                // disables POST /Members/login
  //Member.disableRemoteMethodByName("logout");                               // disables POST /Members/logout

  //Member.disableRemoteMethodByName("resetPassword");                        // disables POST /Members/reset
  //Member.disableRemoteMethodByName("setPassword");                          // disables POST /Members/reset-password
  Member.disableRemoteMethodByName("update");                               // disables POST /Members/update
  Member.disableRemoteMethodByName("upsertWithWhere");

  Member.afterRemote('create', function(context, member, next) {
    if(member.signUpBy==="email"){
      var options = {
        type: 'email',
        to: member.email,
        from: senderAddress,
        subject: '歡迎註冊香港財經時報會員！',
        template: path.resolve(__dirname, '../../server/views/verify.ejs'),
        redirect: 'http://localhost:3000/signin',
        member: member
      };
      member.verify(options, function(err, response) {
        if (err) {
          Member.deleteById(member.id);
          return next(err);
        }
        context.res.render('response', {
          title: 'Signed up successfully',
          content: 'Please check your email and click on the verification link ' +
              'before logging in.',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });
    }
  });

  // Method to render
  Member.afterRemote('prototype.verify', function(context, member, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent '+
        'to your email successfully',
      content: 'Please check your email and click on the verification link '+
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //send password reset link when requested
  Member.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    Member.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //render UI page after password change
  Member.afterRemote('changePassword', function(context, member, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //render UI page after password reset
  Member.afterRemote('setPassword', function(context, member, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
};
