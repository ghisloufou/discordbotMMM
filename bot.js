// require the discord.js module
const Discord = require('discord.js');
// require fetch
const fetch = require("node-fetch");

// create a new Discord client
const client = new Discord.Client();

var city = {
  name: 'Paris',
  icon: ''
}


// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready!');
  loop();
});

client.on('message', msg => {
  //ifReactThenTroll(msg);
  console.log(msg.author + ' ' + msg.content);
  if (!msg.content.startsWith('!') || msg.author.bot) return;

	const args = msg.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();
  const secondWord = msg.content.split(' ').slice(1,2).join();

	if (command === 'temp') {
    if (secondWord === '') {
      msg.channel.reply('Veuillez entrer un nom de ville ex: !temp Paris');
    } else {
      city.name = secondWord;
      getWeather(city.name);
    }
	} else if (command === 'beep') {
		console.log('boop');
	}
	// other commands...
});



function loop() {
  (function(){
    var date = new Date();
    // do some stuff
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    
    getWeather(city.name);
    setTimeout(arguments.callee, 360000);
  })();
}


// login to Discord with your app's token
client.login('NjQzMTYzODkzNTk3OTk1MDQz.XcrukQ.2ZO57H-rwzgjFfeCTAF3hp1GhWI');


function getWeather(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=cdc5d9f3e215146dd88f30a095878f91')
  .then((response) => { return response.json(); })
  .then((data) => {
    client.user.setPresence({
      game: {
        name : `${drawWeather(data)} à ${cityName}`
      }
    });
    client.user.setAvatar('https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png').catch(() => {});
    client.user.setUsername('Météo '+cityName).catch(() => {});
  })
  .catch((error) => {
    console.log(error);
  });
}

function drawWeather(data) {
	var celcius = Math.round(parseFloat(data.main.temp)-273.15);
	return celcius + '°C';
}


//Old content

function ifReactThenTroll(msg) {
  var date = new Date();
  var compteur = true;
  var compteur2 = true;

  // Create a reaction collector
  const filter = (reaction) => reaction.emoji.name === '🙆';
  const collector = msg.createReactionCollector(filter, { time: 360000 });
  if (!msg.author.bot) {
    console.log(date + ': ' + msg.content);
    collector.on('collect', r => {
      if (compteur === true){
        console.log('Collected' + r.emoji.name);
        msg.channel.send(troll(msg.content));
      }
      compteur = false;
    });
  } else if (msg.content !== ''){
    collector.on('collect', r => {
      if (compteur2 !== false) {
        msg.channel.send("", {
          file: "./bob.jpg"
        });
        compteur2 = false;
      }
    });
    
  }
  collector.on('end', collected => {});
}


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