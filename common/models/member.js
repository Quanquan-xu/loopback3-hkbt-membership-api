'use strict';

// module.exports = function(Member) {

// };
const clientUrl = process.env.NODE_ENV === 'production' ? "http://membership.businesstimes.com.hk" : "http://localhost:3000"
const speakeasy = require('speakeasy');
const config = require('../../server/config.json');
const path = require('path');
const APP_SECRET = "+nAufYi:~zJm@+e**$)}A_)UQ7@n]!SxhL-8.41ZL0MbW&6jo(,}S'Ewf#_;1[+"
//Replace this address with your actual address
const senderAddress = 'noreply@businesstimes.com.hk';

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

  Member.requestSMSCode = function(json, fn) {
    try {
      const credential = JSON.parse(json)
      if(credential && credential["signUpBy"]==="phone" && credential["password"] && credential["username"] && credential['signUpInfo']){
        credential['email'] = credential['signUpInfo'].replaceAll("+", "").replaceAll(" ","_").replaceAll("-","") + "@businesstimes.com.hk";
        this.findOne({where: { email: credential.email }}, function(err, member) {
          if(member){
            member.hasPassword(credential.password, function(err, isMatch) {
                if (isMatch) {
                  // Note that you’ll want to change the secret to something a lot more secure!
                  const code = speakeasy.totp({secret: APP_SECRET + credential.email});
                  const message = '歡迎註冊香港財經時報會員！妳的手機驗證碼是 ' + ': ' + code
                  console.log(message);

                  // [TODO] hook into your favorite SMS API and send your user their code!

                  fn(null, message);
                } else {
                  let err = new Error('Sorry, Authorization Required!'+ "code: Password");
                  err.statusCode = 401;
                  err.code = 'AUTHORIZATION_REQUIRED';
                  return fn(err);
                }
            });
          }else{
            let err = new Error('Sorry, Authorization Required!'+ "code: Member");
            err.statusCode = 401;
            err.code = 'AUTHORIZATION_REQUIRED';
            return fn(err);
          }
        });
      }else{
        let err = new Error('Sorry, Authorization Required!');
        err.statusCode = 401;
        err.code = 'AUTHORIZATION_REQUIRED';
        return fn(err);
      }
    } catch(e) {
      // var smsData = {
      //       type: 'sms',
      //       to: "+852 3619 0271",
      //       from: "+15005550006",
      //       body: 'Hello, from the LoopBack Twilio Connector!'
      // };
      // Member.app.models.Twilio.send(smsData, function (err, data) {
      //       if (err) {
      //           console.log(err);
      //       } else {
      //           console.log(data);
      //       }
      // });
      let err = new Error('Sorry, Authorization Required!');
      err.statusCode = 401;
      err.code = 'AUTHORIZATION_REQUIRED';
      return fn(err);
    }
  };
  Member.verifySMSCode = function(json, fn) {
    try {
      const credential = JSON.parse(json)
      if(credential && credential["signUpBy"]==="phone" && credential["code"] && credential['signUpInfo']){
        credential['email'] = credential['signUpInfo'].replaceAll("+", "").replaceAll(" ","_").replaceAll("-","") + "@businesstimes.com.hk";
        this.findOne({where: { email: credential.email }}, function(err, member) {
          var code = speakeasy.totp({secret: APP_SECRET + credential.email});
          if (code.toString() !== credential["code"]) {
            var err = new Error('Sorry, but that verification code does not work!'+code);
            err.statusCode = 401;
            err.code = 'VERIFIED_FAILED';
            return fn(err);
          }
          member.createAccessToken(600, function(err, token) {
            if (err) return fn(err);
            token.__data.member = member;
            fn(err, token);
          });
        });
      }else{
        let err = new Error('Sorry, Authorization Required!');
        err.statusCode = 401;
        err.code = 'AUTHORIZATION_REQUIRED';
        return fn(err);
      }
    } catch(e) {
      let err = new Error('Sorry, Authorization Required!');
      err.statusCode = 401;
      err.code = 'AUTHORIZATION_REQUIRED';
      return fn(err);
    }
  };
  Member.remoteMethod('requestSMSCode', {
    accepts: {arg: 'json', type: 'string'},
    returns: {arg: 'response', type: 'string'}
  });
  Member.remoteMethod('verifySMSCode', {
    accepts: {arg: 'json', type: 'string'},
    returns: {arg: 'response', type: 'string'}
  });
  Member.afterRemote('create', function(context, member, next) {
    if(member.signUpBy==="email"){
      var options = {
        type: 'email',
        to: member.email,
        from: senderAddress,
        subject: '歡迎註冊香港財經時報會員！',
        template: path.resolve(__dirname, '../../server/views/verify.ejs'),
        redirect: `${clientUrl}/signin`,
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
    var url = clientUrl + '/reset-password';
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
