const config = require('./config.json');

const Discord = require('discord.js');
const path = require('path');

const client = new Discord.Client();
/*
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Our First Command Group']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
    client.user.setGame('Fun things afoot!');
    // or if on master, client.user.setActivity('game');
});

client.login(config.notifier.token)*/