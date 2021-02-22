'use strict';

module.exports = function(Rolemapping) {
    Rolemapping.beforeRemote('create', function(context, rolemapping, next) {
      context.args.data.principalType = Rolemapping.USER;
      next();
    });
};
