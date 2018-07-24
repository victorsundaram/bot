const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', (msg) => {
	const name = msg.from.first_name;

var hi = "hi";
if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
bot.sendMessage(msg.chat.id,'Hello ' + name + ' :-)');
} 
    
var bye = "bye";
if (msg.text.toString().toLowerCase().includes(bye)) {
bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name); 
} 

});

bot.onText(/\/sendpic/, (msg) => {

bot.sendPhoto(msg.chat.id,"https://www.nationalgeographic.com/photography/photo-of-the-day/2018/07/weedy-sea-dragon-australia/" ,{caption : "Here we go ! \nPicture of the day from NatGeo "} );
    
});

bot.on('message', (msg) => {
    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id,44.97108, -104.27719);
        bot.sendMessage(msg.chat.id, "Here is the point");

    }
});

module.exports = bot;