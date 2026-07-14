require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// توكن البوت
const TOKEN = process.env.TOKEN;

// ايدي روم الإداريين
const ADMIN_CHANNEL = "1526378668815810580";

// ايدي روم التصويت
const VOTE_CHANNEL = "1526378730581262467";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // نتأكد إن الرسالة في روم الإداريين
    if (message.channel.id !== ADMIN_CHANNEL) return;

    // نتأكد إن الرسالة فيها صورة
    const attachment = message.attachments.first();
    if (!attachment) return;

    // نجلب روم التصويت
    const voteChannel = await client.channels.fetch(VOTE_CHANNEL);

    // نرسل رابط الصورة (ديسكورد يعرضها كصورة تلقائيًا)
    const sentMsg = await voteChannel.send({
        content: `برأيكم فوز أو خسارة ؟\nفوز ( 👍 ) | خسارة ( 👎 )\n${attachment.url}`
    });

    // نحط رياكشنات
    await sentMsg.react("👍");
    await sentMsg.react("👎");
});

client.login(process.env.TOKEN);