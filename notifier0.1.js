// Notifier.   Be sure to run:
// node .\notifier.js > log.txt
// Get-Content -Path "log.txt" -Wait
//

//Requires
var Discord = require("discordie");
var _ = require('underscore');
var ini = require("ini")
var fs = require('fs')
var config = require('./config.json')

var log = console.log;
var pad = "====================="
log.sendMessage = console.log;

function dbg(str) {
    console.log(str);
    log.sendMessage(str);
}

dbg(pad + "begin" + pad);

var triggers = {};
var arr = [];


var client = new Discord(1000, 0, 2, true);


// On Connection
client.Dispatcher.on("GATEWAY_READY", e => {
    console.log("Connected as: " + client.User.username);
    log = client.Channels.get("344544993525891082");
    dbg(pad + "Opened Logging Channel: " + log.name + pad);
});

// On Disconnection
client.Dispatcher.on("GATEWAY_DISCONNECT", (e, autoReconnect, delay) => {
    console.log("Disconnected.  Reattempting in " + delay);
});

// On Message Recieved
client.Dispatcher.on("MESSAGE_CREATE", e => {
    if (e.message.author.id != config.logger.id) { // logger shouldn't check it's own stuff
        /* Example
  if (e.message.content == "ping")
 e.message.channel.sendMessage("pong");
  */
        // create a node for the user
        dbg("checking if user has node")
        if (!triggers[e.message.author.id]) {
            dbg("user has no node.  creating triggers[" + e.message.author.id + "]")
            triggers[e.message.author.id] = [];
        } else {
            dbg("Node for " + e.message.author.id + " exists")

            check = e.message.content.split(" ")
            switch (check[0]) {
                case "!help":
                    dbg("Help was asked for!")
                    break;


                case "!compliment":
                    dbg("Compliment for " + e.message.author.username + " from " + e.message.channel.mention);
                    log.sendMessage(e.message.author.mention + "'s a good looking human");
                    e.message.author.openDM().then((DM, e) => {
                        DM.sendMessage("You're awesome!");
                    });
                    break;

                    // List out the keywords for the user
                case "!keywords":
                    dbg("Keywords request from " + e.message.author.username + " in " + e.message.channel.mention);
                    switch (check.length) {
                        // Request for list of keywords
                        case 1:
                            dbg(triggers[e.message.author.id]);
                            break;
                            // Adding keywords
                        default:
                            keys = e.message.content.substr(10).trim().split(",").map(key => { return key.trim() })
                            dbg(pad + "adding triggers" + pad);
                            arr = [];
                            for (var i = 0; i < keys.length; i++) {
                                arr.push(keys[i].toUpperCase());
                                dbg("added " + keys[i] + " to arr")
                            }
                            dbg("arr: " + arr);
                            triggers[e.message.author.id] = triggers[e.message.author.id].concat(arr);
                            dbg("triggers[" + e.message.author.id + "] = " + triggers[e.message.author.id]);
                    }
                    break // end keywords
                    // Message isn't recognized, let it go
                default:
                    srch = triggers[e.message.author.id].join("|")
                    if (srch.length != 0)
                        if (e.message.content.toUpperCase().search(srch) >= 0) {
                            log.sendMessage(e.message.author.mention + " there is something for you to look at in " + e.message.channel.mention + " from " + e.message.author.username);
                            e.message.author.openDM().then((DM, e) => {
                                DM.sendMessage(e.message.author.mention + " there is something for you to look at in " + e.message.channel.mention + " from " + e.message.author.username);
                            })
                        }
            }
        }
    }
});



client.connect({ token: config.logger.token }); //logger