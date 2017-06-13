/**
 * Created by knp on 6/13/17.
 */
const  tb = require('node-telegram-bot-api');
const  token = '396896787:AAEXUHOtBsThsR4eg_otGxu3xBTSkGRCawM';
const  bot = new tb(token,{polling : true});
var list = [];
bot.onText(/\/add (.+)/, function(msg, match) {
    var resp;
    const chatId = msg.chat.id;
    if(match[1]!='') {
        if (list.indexOf(match[1]) < 0) {
            resp = list.push(match[1]);
        } else {
            resp = 'already in list';
        }
    }
    else resp = '(((';
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/remove (.+)/, function(msg, match) {
    var resp;
    const chatId = msg.chat.id;
    const index = list.indexOf(match[1]);
    if(index<0){
        resp = 'not found';
    } else {
        list.splice(index,1);
        resp = 'remove';
    }

    bot.sendMessage(chatId, resp);
});
bot.onText(/\/start/, function(msg, match) {

    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Кнопка 1', callback_data: '1' }],
                [{ text: 'Кнопка 2', callback_data: 'data 2' }],
                [{ text: 'Кнопка 3', callback_data: 'text 3' }]
            ]
        })
    };
    const chatId = msg.chat.id;

    const resp = '/add - \r\n/remove - \r\n/show - '
    bot.sendMessage(chatId, resp,options);
});
bot.onText(/\/show/, function(msg, match) {

    const chatId = msg.chat.id;
    var resp = '';
    if(list.length!=0) {
        var i = 0;
        list.forEach(function (p1, p2, p3) {
            resp += (p2 + 1) + '. ' + p1 + '\r\n';
        });
    } else {
        resp = 'list is empty';
    }

// send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
bot.onText(/\/addMany (.+)/, function(msg, match) {

    const chatId = msg.chat.id;
    const resp = match[1];

// send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});
bot.onText(/\/clear/, function(msg, match) {

    const chatId = msg.chat.id;
    const resp = 'Are you sure?'
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Yes', callback_data: 'y' }],
                [{ text: 'No', callback_data: 'n' }],
            ]
        })
    };
    bot.on('callback_query',function (cbq) {
        const opts = {
            chat_id: cbq.message.chat.id,
            message_id: cbq.message.message_id,
        };
        switch (cbq.data){
            case 'y':
                list = [];
                bot.editMessageText('cleared',opts);
                break;
            case 'n':
                bot.editMessageText('canceled',opts);
                break;
        }
    });


});
console.log('asdadaaaaa');