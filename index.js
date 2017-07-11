const  tb = require('node-telegram-bot-api');
const  token = '396896787:AAEXUHOtBsThsR4eg_otGxu3xBTSkGRCawM';
const  bot = new tb(token,{polling : true});
var list = [];

bot.onText(/\/add (.+)/, function(msg, match) {
    var resp;
    const chatId = msg.from.id;
    //const chatId = msg.chat.id;
    if(match[1]!='') {
        if (list.indexOf(match[1]) < 0) {
            resp = 'OK!'

        } else {
            resp = 'already in list';
        }
    }
    else resp = '(((';
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/remove (.+)/, function(msg, match) {
    var resp;
    const chatId = msg.from.id;
    const index = list.indexOf(match[1]);
    if(index<0){
        resp = 'not found';
    } else {
        list.splice(index,1);
        resp = 'removed';
    }

    bot.sendMessage(chatId, resp);
});
bot.onText(/\/start/, function(msg, match) {

    const chatId = msg.from.id;

    const resp = '/add - добавить; \r\n/remove - удалить; \r\n/show - показать.'
    bot.sendMessage(chatId, resp);
});
bot.onText(/\/show/, function(msg) {
    const chatId = msg.from.id;
    var resp = '';
    if(list.length!=0) {
        var i = 0;
        list.forEach(function (p1, p2, p3) {
            resp += (p2 + 1) + '. ' + p1 + '\r\n';
        });
    } else {
        resp = 'list is empty';
    }

    bot.sendMessage(chatId, resp);
});

bot.onText(/\/clear/, function(msg) {
    const chatId = msg.chat.id;
    const resp = 'Ok!';
    list = [];
    bot.sendMessage(chatId,resp);
});

console.log('asdadaaaaa');
