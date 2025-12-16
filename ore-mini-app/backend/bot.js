const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '8429481024:AAG3rrg2K-sGv6gNQCtW7CW4qa2o56SWXC4';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 ORE Mining Bot running...');

// Receive data from Mini App
bot.on('message', async (msg) => {
  if (!msg.web_app_data) return;

  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);

  if (data.action === 'buy_mining_power') {
    await bot.sendInvoice(
      chatId,
      'ORE Mining Power',
      'Buy mining power to mine ORE',
      'ore_payload',
      'XTR', // Telegram Stars
      [
        {
          label: 'Mining Power Package',
          amount: 50
        }
      ]
    );
  }
});

// Payment success handler
bot.on('successful_payment', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    '✅ Payment successful!\nMining power has been added to your account.'
  );
});
