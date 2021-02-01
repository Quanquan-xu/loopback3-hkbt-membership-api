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
    {username: 'HKBT', email: 'noreply@businesstimes.com.hk', password: 'Hkbt@2021',"signUpBy": "development","signUpInfo": "admin","emailVerified": true},
    {"bidMonth": "8","bidYear": "2000","education": "研究生", "favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro@gmail.com","signUpInfo": "susan1457fro@gmail.com","username": "susan1457fro","email": "susan1457fro@gmail.com", "emailVerified": true},
    {"bidMonth": "4","bidYear": "2000","education": "大學","favourites": "內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 6031","signUpInfo": "+852 1337 6031","username": "john","email": "852_1337_6031@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "2","bidYear": "2001","education": "博士", "favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro1@gmail.com","signUpInfo": "susan1457fro1@gmail.com","username": "susan1457fro1","email": "susan1457fro1@gmail.com", "emailVerified": true},
    {"bidMonth": "4","bidYear": "2002","education": "高中及以下", "favourites": "內地新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "小於10000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro2@gmail.com","signUpInfo": "susan1457fro2@gmail.com","username": "susan1457fro2","email": "susan1457fro2@gmail.com", "emailVerified": true},
    {"bidMonth": "11","bidYear": "1987","education": "大學","favourites": "本地時事,香港樓市,內地新聞,國際新聞","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 0344","signUpInfo": "+852 1337 0344","username": "john13","email": "852_1337_0344@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "2","bidYear": "1986","education": "博士","favourites": "內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 0345","signUpInfo": "+852 1337 0345","username": "john14","email": "852_1337_0345@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "3","bidYear": "1985","education": "高中及以下","favourites": "內地新聞,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 0348","signUpInfo": "+852 1337 0348","username": "john15","email": "852_1337_0348@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "4","bidYear": "1977","education": "大學","favourites": "本地時事,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 0349","signUpInfo": "+852 1337 0349","username": "john16","email": "852_1337_0349@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "12","bidYear": "1969","education": "博士","favourites": "內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 0350","signUpInfo": "+852 1337 0350","username": "john17","email": "852_1337_0350@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "9","bidYear": "2003","education": "研究生", "favourites": "本地時事,香港樓市,內地新聞,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro3@gmail.com","signUpInfo": "susan1457fro3@gmail.com","username": "susan1457fro3","email": "susan1457fro3@gmail.com", "emailVerified": true},
    {"bidMonth": "12","bidYear": "1992","education": "高中及以下", "favourites": "本地時事,香港樓市,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro4@gmail.com","signUpInfo": "susan1457fro4@gmail.com","username": "susan1457fro4","email": "susan1457fro4@gmail.com", "emailVerified": true},
    {"bidMonth": "3","bidYear": "1982","education": "研究生","favourites": "股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16039","signUpInfo": "+852 1337 16039","username": "john8","email": "noreply8@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "9","bidYear": "1981","education": "博士","favourites": "內地新聞,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 160340","signUpInfo": "+852 1337 160340","username": "john9","email": "noreply9@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "1","bidYear": "1994","education": "大學", "favourites": "本地時事,香港樓市,內地新聞,股票","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro5@gmail.com","signUpInfo": "susan1457fro5@gmail.com","username": "susan1457fro5","email": "susan1457fro5@gmail.com", "emailVerified": true},
    {"bidMonth": "3","bidYear": "1991","education": "研究生", "favourites": "本地時事,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro6@gmail.com","signUpInfo": "susan1457fro6@gmail.com","username": "susan1457fro6","email": "susan1457fro6@gmail.com", "emailVerified": true},
    {"bidMonth": "4","bidYear": "1990","education": "高中及以下", "favourites": "本地時事,內地新聞,國際新聞,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro7@gmail.com","signUpInfo": "susan1457fro7@gmail.com","username": "susan1457fro7","email": "susan1457fro7@gmail.com", "emailVerified": true},
    {"bidMonth": "8","bidYear": "1996","education": "研究生", "favourites": "本地時事,香港樓市,內地新聞","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro8@gmail.com","signUpInfo": "susan1457fro8@gmail.com","username": "susan1457fro8","email": "susan1457fro8@gmail.com", "emailVerified": true},
    {"bidMonth": "9","bidYear": "1996","education": "高中及以下", "favourites": "本地時事,香港樓市,內地新聞,黃金/白銀","gender": "female","monIncome": "小於10000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro9@gmail.com","signUpInfo": "susan1457fro9@gmail.com","username": "susan1457fro9","email": "susan1457fro9@gmail.com", "emailVerified": true},
    {"bidMonth": "4","bidYear": "1983","education": "大學","favourites": "期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16038","signUpInfo": "+852 1337 16038","username": "john7","email": "noreply7@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "7","bidYear": "1999","education": "研究生", "favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro10@gmail.com","signUpInfo": "susan1457fro10@gmail.com","username": "susan1457fro10","email": "susan1457fro10@gmail.com", "emailVerified": true},
    {"bidMonth": "10","bidYear": "1998","education": "研究生", "favourites": "本地時事,內地新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro11@gmail.com","signUpInfo": "susan1457fro11@gmail.com","username": "susan1457fro11","email": "susan1457fro11@gmail.com", "emailVerified": true},
    {"bidMonth": "11","bidYear": "1993","education": "高中及以下", "favourites": "本地時事,香港樓市,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro12@gmail.com","signUpInfo": "susan1457fro12@gmail.com","username": "susan1457fro12","email": "susan1457fro12@gmail.com", "emailVerified": true},
    {"bidMonth": "1","bidYear": "1983","education": "研究生", "favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro13@gmail.com","signUpInfo": "susan1457fro13@gmail.com","username": "susan1457fro13","email": "susan1457fro13@gmail.com", "emailVerified": true},
    {"bidMonth": "9","bidYear": "2001","education": "研究生","favourites": "股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16032","signUpInfo": "+852 1337 16032","username": "john1","email": "noreply1@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "10","bidYear": "1992","education": "大學","favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16033","signUpInfo": "+852 1337 16033","username": "john2","email": "noreply2@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "8","bidYear": "1993","education": "高中及以下","favourites": "內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16034","signUpInfo": "+852 1337 16034","username": "john3","email": "noreply3@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "7","bidYear": "1995","education": "大學","favourites": "本地時事,黃金/白銀","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16035","signUpInfo": "+852 1337 16035","username": "john4","email": "noreply4@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "1","bidYear": "1998","education": "研究生","favourites": "內地新聞,股票","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16036","signUpInfo": "+852 1337 16036","username": "john5","email": "noreply5@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "2","bidYear": "1990","education": "高中及以下","favourites": "內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 16037","signUpInfo": "+852 1337 16037","username": "john6","email": "noreply6@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "2","bidYear": "1984","education": "研究生", "favourites": "本地時事,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro14@gmail.com","signUpInfo": "susan1457fro14@gmail.com","username": "susan1457fro14","email": "susan1457fro14@gmail.com", "emailVerified": true},
    {"bidMonth": "4","bidYear": "1986","education": "大學", "favourites": "本地時事,香港樓市,","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro15@gmail.com","signUpInfo": "susan1457fro15@gmail.com","username": "susan1457fro15","email": "susan1457fro15@gmail.com", "emailVerified": true},
    {"bidMonth": "8","bidYear": "1988","education": "高中及以下", "favourites": "本地時事,香港樓市,黃金/白銀","gender": "female","monIncome": "小於10000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro16@gmail.com","signUpInfo": "susan1457fro16@gmail.com","username": "susan1457fro16","email": "susan1457fro16@gmail.com", "emailVerified": true},
    {"bidMonth": "6","bidYear": "1980","education": "研究生", "favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro17@gmail.com","signUpInfo": "susan1457fro17@gmail.com","username": "susan1457fro17","email": "susan1457fro17@gmail.com", "emailVerified": true},
    {"bidMonth": "8","bidYear": "1987","education": "大學", "favourites": "本地時事,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro18@gmail.com","signUpInfo": "susan1457fro18@gmail.com","username": "susan1457fro18","email": "susan1457fro18@gmail.com", "emailVerified": true},
    {"bidMonth": "3","bidYear": "1984","education": "研究生", "favourites": "本地時事,黃金/白銀","gender": "female","monIncome": "大於20000","password": "Shenai1224","signUpBy": "email","emailInfo": "susan1457fro19@gmail.com","signUpInfo": "susan1457fro19@gmail.com","username": "susan1457fro19","email": "susan1457fro19@gmail.com", "emailVerified": true},
    {"bidMonth": "8","bidYear": "1985","education": "大學","favourites": ",內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 160341","signUpInfo": "+852 1337 160341","username": "john10","email": "noreply10@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "5","bidYear": "1989","education": "研究生","favourites": "本地時事,香港樓市,內地新聞,國際新聞,股票,理財/儲蓄,黃金/白銀","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 160342","signUpInfo": "+852 1337 160342","username": "john11","email": "noreply11@businesstimes.com.hk","emailVerified": true},
    {"bidMonth": "6","bidYear": "1988","education": "高中及以下","favourites": "內地新聞,股票,期貨","gender": "male","monIncome": "小於10000","password": "Shenai1224","signUpBy": "phone","phoneNumber": "+852 1337 160343","signUpInfo": "+852 1337 160343","username": "john12","email": "noreply12@businesstimes.com.hk","emailVerified": true}
  ], function(err, users) {
    if (err){
      console.log(err['messages'])
    } else{
      console.log('Created users:', users);

      //create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) throw err;
        //console.log('Created role:', role);
        //make bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          if (err) throw err;
          //console.log('Created principal:', principal);
        });
      });
    }
  });
};
