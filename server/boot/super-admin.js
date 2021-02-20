// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  var Member = app.models.member;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Favourite =  app.models.favourite;

  Member.create([
    {username: 'HKBT', email: 'noreply@businesstimes.com.hk', emailInfo:'noreply@businesstimes.com.hk', password: 'Hkbt@2021',"signUpBy": "development","signUpInfo": "admin","emailVerified": true},
  ], function(err, users) {
    if (err){
      console.log(err['messages'])
    } else{
      console.log('Created users:', users);

      Role.create({
        name: 'admin',
        description:"能訪問，可用filler查找會員資料，能對會員資料增，刪，改，能對其他授權他們，且能對其他權限增，刪，查，改"
      }, function(err, role) {
        if (err) throw err;
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          if (err) throw err;
          Role.create({
            name: 'manager',
            description:"能訪問，可用filler查找會員資料，能對會員資料增，刪，改"
          }, function(err, role) {
            if (err) throw err;
            Role.create({
              name: 'general',
              description:"能訪問，可用filler查找會員資料，不能對會員資料增，刪，改"
            }, function(err, role) {
              if (err) throw err;
            });
          });
        });
      });
    }
  });
};
