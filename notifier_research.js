//notifier research


// INI files
var ini = require("ini")
var _ = require('underscore')

function user(id, name) {
    this.id = id;
    this.name = null;
    this.keywords = [];
}

u1id = "1234"
u2id = "9382"

var notifier = {};
notifier[u1id] = new user(u1id);
notifier[u2id] = new user(u2id);
notifier[u1id].keywords = _.union(notifier[u1id].keywords, ["test"])
notifier[u1id].keywords = _.union(notifier[u1id].keywords, ["test3"])
notifier[u1id].keywords = _.union(notifier[u1id].keywords, ["test2"])
notifier[u1id].keywords = _.union(notifier[u1id].keywords, ["test"])
delete notifier[u2id]

ini.stringify(notifier)



// SQLite3
//https://github.com/mapbox/node-sqlite3/wiki/API
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('Notifier');
db.run("CREATE TABLE notifiers (id int, phrase varchar, user varchar)")
db.run("INSERT INTO notifiers VALUES (1,'test','me')")
db.all("SELECT * FROM notifiers", (e, r) => { console.log(r); })


//better-sqlite3
let sqlite3 = require('better-sqlite3')
let db = new sqlite3('./Notifier.db')
da.prepare("SELECT * FROM notifiers").get()


// node persist
const storage = require('node-persist');
storage.initSync({
    dir: './database',
    ttl: 1000 * 60 * 2
})

storage.forEach((k, v) => {
    if (v.expires <= Date.now()) {
        storage.removeItemSync(k); // remove the raid to disk
    } else {

        activeRaids[k] = new raid(v.time, v.poke.id, v.location, v.owner, v.owner.count, v.id);
        activeRaids[k].gym = v.gym;
        activeRaids[k].locationComment = v.locationComment
        activeRaids[k].expires = v.expires
        activeRaids[k].owner = v.owner
        activeRaids[k].attendees = {}
        _.each(v.attendees, (att) => {
            activeRaids[k].attendees[att.id] = new attendee(att.id, att.username, att.mention, att.count)
        })
        activeRaids[k].to = setTimeout(() => clearRaidID(activeRaids[k].id), activeRaids[k].expires - Date.now())
    }
})