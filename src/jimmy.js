// get .env file
require('dotenv').config();
const {Client, Message} = require('discord.js');
const client = new Client();

const jimmy_GIF = 'https://tenor.com/view/jerome-the-clapster-clapster-gif-21003744';

client.on("ready", async () => {
    console.log("bot is functional");
})

client.on("message", message => {
    console.log(message.content);
    if (message.content.includes(mention)) {
        console.log("pog");
        console.log('content: ' + message.content);
        const channel = message.channel;
        channel.send(jimmy_GIF);
    }
})      

client.login(process.env.DISCORDJS_TOKEN);
