'use strict';

// module.exports = function(Member) {

// };

var config = require('../../server/config.json');
var path = require('path');

//Replace this address with your actual address
var senderAddress = 'noreply@businesstimes.com.hk';

module.exports = function(Member) {
  //send verification email after registration
  Member.afterRemote('create', function(context, member, next) {
    var options = {
      type: 'email',
      to: member.email,
      from: senderAddress,
      subject: '歡迎註冊香港財經時報會員！',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: 'http://localhost/signin',
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
