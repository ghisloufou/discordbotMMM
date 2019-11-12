// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', msg => {
  var date = new Date();
  console.log(date + ': ' + msg.content);
  
  var compteur = true;

  // Create a reaction collector
  const filter = (reaction) => reaction.emoji.name === '🙆';
  const collector = msg.createReactionCollector(filter, { time: 300000 });
  collector.on('collect', r => {
    if (compteur === true){
      console.log('Collected' + r.emoji.name);
      msg.channel.send(troll(msg.content));
    }
    compteur = false;
  });
  collector.on('end', collected => {});
});



// login to Discord with your app's token
client.login('NjQzMTYzODkzNTk3OTk1MDQz.Xchfgw.buQFawTOSWjloAgUeQVYzwd19dU');

function troll(msg) {
  var tab = msg.split(' ');
  var response = '"';
  for (var j in tab) {
    for(var i in tab[j]) {
      // if i is even
      if(i%2 == 0) {
        response += tab[j][i].toLowerCase();
      } 
      // if i is odd
      else {
        response += tab[j][i].toUpperCase();
      }
    }
    response += ' ';
  }
  return response.slice(0, -1) + '"';
}