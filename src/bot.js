// the bot should join to general only automatically is someone is in it
// the bot shoould disconnect when anyone tell it to
// if you want the bot somewhere else you need to specify the channel

// setup
require('dotenv').config();

// no idea what the fuck this does
const { SSL_OP_EPHEMERAL_RSA } = require('constants'); // i really don't even think this is supposed to be in here but gonna be honest, too scared to delete so it stays
const { Client, Message } = require('discord.js');
const { PassThrough } = require('stream');

//setting up client
const client = new Client();
const PREFIX = '$'

// global variable for callback
var pog;
var previousbyte;

// settings
const CHANNELID = ""; // TODO: type channel ID here!!!!!
const soundboard = false;


client.on("ready", async () => {
    console.log(`logged in as ${client.user.tag}`);
    const channel = client.channels.cache.get(CHANNELID);
    if (!channel) return console.error("The channel does not exist!");
    await channel.join().then((connection) => {

        console.log("joined");
    });
})

client.on("guildMemberSpeaking", (member, speaking) => {
    const voicestate = speaking.bitfield;
    const channel = client.channels.cache.get(CHANNELID);
    async function laugh(channel) {
        await channel.join().then((connection) => {
            console.log("playing audio");
            connection.play('audio.mp3');
      });
    }

    if (soundboard == false) {
        if (voicestate == 1) {
            if (previousbyte == 1) {
                return;
            } else {
                clearTimeout(pog);
                console.log(`${voicestate} | cleared timeout`);
                previousbyte = 1;
            }
        } else {
            if (previousbyte == 0) {
                return;
            } else {
                pog = setTimeout(laugh, 10000, channel);
                console.log(`${voicestate} | setting timeout`);
                previousbyte = 0;
            }
        }
    }
})

client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME == "leave") {
            const channel = client.channels.cache.get(CHANNELID);
            clearTimeout(pog);
            channel.leave();
            message.delete();
        }

        if (CMD_NAME == "join") {
            const channel = client.channels.cache.get(CHANNELID);
            clearTimeout(pog);
            channel.join();
            message.delete();
        }

        if (CMD_NAME == "play") {
            const channel = client.channels.cache.get(CHANNELID);
            async function laugh(channel) {
                await channel.join().then((connection) => {
                    console.log("playing audio");
                    connection.play('audio.mp3');
              });
            }
            message.delete();
            laugh(channel);

        }
    }
})

// functional bot ↓↓↓↓↓↓↓↓↓↓↓↓
/*
client.on("ready", async () => {
    const fs = require('fs');
    console.log(`logged in as ${client.user.tag}`);
    const channel = client.channels.cache.get("713229505841332267");
    if (!channel) return console.error("The channel does not exist!");
    await channel.join().then((connection) => {
        console.log("wtf");
        connection.play('audio.mp3');
    });
})
*/


/*
client.on('message', async message => {
	// Join the same voice channel of the author of the message
    const fs = require('fs');
	if (message.member.voice.channel) {
        console.log(message.content);
		const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(fs.createReadStream('audio.mp3'));
        dispatcher.on('start', () => {
            console.log('audio.mp3 is now playing!');
        });        
	}
});
*/

client.login(process.env.DISCORDJS_TOKEN);