TELEGRAM_BOT_TOKEN = '1861955507:AAGx8fybLn2wi1y3I-oOHj8dhbK1liQOhB8';
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];
const CronJob = require('cron').CronJob;
const job = new CronJob('0/5 * * * * *', function() {
  console.log('You will see this message 5 second');
  chatIds.forEach((chatId) =>{
    bot.sendMessage(chatId, 'Salom')
  });
}, null, true);


bot.on('text', (msg) => msg.reply.text('Kelgan habar: ' + msg.text));

bot.on(['/start'], (msg) => {
    let chatId = msg.chat.id;
    if(!chatIds.includes(chatId)){
        chatIds.push(chatId);
        msg.reply.text('Boshladik!');
        job.start();
    }
});

bot.on(['/stop'], (msg) => {
    let chatId = msg.chat.id;
    chatIds.pop(chatIds);
});

bot.start();