
module.exports = function(app) {
  var Favourite =  app.models.favourite;
  Favourite.create([
      {"name": "本地時事"},
      {"name": "香港樓市"},
      {"name": "內地新聞"},
      {"name": "國際新聞"},
      {"name": "股票"},
      {"name": "理財/儲蓄"},
      {"name": "黃金/白銀"}
    ], function(err, favourites) {
      if (err){
        console.log(err['messages'])
      } else{
        console.log('Created favourites:', favourites);
      }
  });
};
