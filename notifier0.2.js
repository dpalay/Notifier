const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
const config = require('./config.json');

const db = new sqlite3.Database('Notifier');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.author.id != config.logger.id) { // logger shouldn't check it's own stuff)

        /** FIXME: Delete this eventually */
        if (message.content === 'pingg') {
            message.author.createDM().then(
                (dm) => { dm.send("pongg"); }
            );
        }

        //does the user who sent the message exist?



        //is it a command?
        if (message.content.startsWith("!notifier")) {

            // get the 2nd command
            let parseArray = message.content.split(" ");

            if (parseArray.length == 1) {
                // Just !notifier.  DM Help Info
            } else {

                switch (parseArray[1]) {
                    case "help":
                        break;
                    case "add":
                        break;
                    case "remove":
                        break;
                    case "list":
                        break
                    default:
                        break;

                }
            }
        }
    }
});

client.login(config.logger.token) //logger