var bot = require('./api/getTrainsData.js');

var token = process.env.TOKEN;
console.log(token);
console.log(process.env.NODE_ENV);
var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('bot server started...');

// hello command
bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    // reply sent!
  });
});

// hello command
bot.onText(/^\/start/, function (msg) {
  var from = false, to = false;
  trip_date = new Date();
  bot.sendMessage(msg.chat.id, 'Привіт! Звідки їдемо?').then(function () {
    bot.on('text', function (msg, match) {
      if (!from){
        from = msg.text;
        bot.sendMessage(msg.chat.id, 'Ок, отже ' + from + '. А куди?');
      }
      else if (!to){
        to = msg.text;
        bot.sendMessage(msg.chat.id, 'Ще скажи мені, коли ти збираєшся виїжджати в форматі ДД.ММ. Сьогодні ' + trip_date.getDate() + '.' + (trip_date.getMonth() + 1) );
      } else {
        date = msg.text;
        getTrainsData()
      }
    });
  });
});

// sum command
bot.onText(/^\/sum((\s+\d+)+)$/, function (msg, match) {
  var result = 0;
  match[1].trim().split(/\s+/).forEach(function (i) {
    result += (+i || 0);
  })
  bot.sendMessage(msg.chat.id, result).then(function () {
    // reply sent!
  });
});

module.exports = bot;
