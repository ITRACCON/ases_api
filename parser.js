const axios = require('axios');
const cheerio = require('cheerio');

// ЛАЙФ МАТЧИ
const getLiveMatches = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const url = "https://www.hltv.org/matches";
    const $ = await getHTML(url);
    const liveMatches = [];

    $('.liveMatch-container').each((i, liveMatch) => {
        const match = {}; // объект матча

        const url = $(liveMatch).find('a.match').attr('href'); // ссылка на матч
        match.url = url;

        const matchMeta = $(liveMatch).find('div.matchMeta').text(); // тип матча
        match.matchMeta = matchMeta;

        const matchTeams = $(liveMatch).find('div.matchTeams'); // команды
        
        /// 1 Команда 
        const matchTeam1 = {}; // объект первой команды

        const team1 = matchTeams.children().first(); // получаем данные о первой команде

        const nameTeam1 = team1.find('div.matchTeamName').text(); //получаем Название команды
        matchTeam1.name = nameTeam1; // записываем в объект команды

        const logoTeam1 = team1.find('div.matchTeamLogoContainer').find('img.matchTeamLogo').attr('src'); // получаем лого команды
        matchTeam1.logo = logoTeam1; // записываемв объект команды

        const scoreTeam1 = {}; //объект информации о счет первой команды
        const score_team1 = team1.find('div.matchTeamScore');

        const scoreCurrentMapTeam1 = score_team1.find('.currentMapScore').text(); // счет на текущей карте
        scoreTeam1.currentMap = scoreCurrentMapTeam1;

        const scoreMapsTeam1 = score_team1.find('.mapScore').text(); // счет по картам
        scoreTeam1.scoreMaps = scoreMapsTeam1;
     
        matchTeam1.score = scoreTeam1;

        match.team1 = matchTeam1;

        /// 2 Команда 
        const matchTeam2 = {}; // объект первой команды

        const team2 = matchTeams.children().last(); // получаем данные о первой команде
    
        const nameTeam2 = team2.find('div.matchTeamName').text(); //получаем Название команды
        matchTeam2.name = nameTeam2; // записываем в объект команды

        const logoTeam2 = team2.find('div.matchTeamLogoContainer').find('img.matchTeamLogo').attr('src'); // получаем лого команды
        matchTeam2.logo = logoTeam2; // записываемв объект команды

        const scoreTeam2 = {}; //объект информации о счет 2 команды
        const score_team2 = team2.find('div.matchTeamScore');

        const scoreCurrentMapTeam2 = score_team2.find('.currentMapScore').text(); // счет на текущей карте
        scoreTeam2.currentMap = scoreCurrentMapTeam2;

        const scoreMapsTeam2 = score_team2.find('.mapScore').text(); // счет по картам
        scoreTeam2.scoreMaps = scoreMapsTeam2;
     
        matchTeam2.score = scoreTeam2;

        match.team2 = matchTeam2;

        liveMatches.push(match);
    })
    console.log(liveMatches);
};

// НОВОСТИ
const getNews = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const site = "https://cq.ru";
    const url = site + "/cs-go";
    const $ = await getHTML(url);
    var listNews = [];

    $('.article-item').each((i, itemNews) => {
        const news = {}; // объект новости

        const url = $(itemNews).find('a.article-item__link').attr('href'); // ссылка на матч
        news.url = url;

        const image = $(itemNews).find('img.article-item__picture').attr('src'); // ссылка на матч
        news.image = site + image;

        const content = $(itemNews).find('.article-item__content').find(".article-item__back-link");
        const title = content.find('h3.article-item__title').text();
        news.title = title;
        const text = content.find('p.article-item__excerpt').text();
        news.text = text;

        listNews.push(news);
    })
    console.log(listNews.length);
};

// РЕЙТИНГ КОМАНДЫ
const getTeamsRaiting = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const site = "https://cq.ru";
    const url = site + "/teams/cs-go";
    const $ = await getHTML(url);
    var listTeamsRaiting = [];

    $('a.teams-elo').each((i, teamReating) => {
        const team = {}; // объект новости

        const rank = $(teamReating).find('div.teams-elo__rank').text(); // ссылка на матч
        team.rank = rank.split(" ")[0];

        const infoTeam = $(teamReating).find("span.teams-elo__team");
        const name = infoTeam.find("span.teams-elo__team-name").text();
        team.name = name;
        const logo = infoTeam.find("img").attr('src');
        team.logo = site + logo;

        const score = $(teamReating).find("span.teams-elo__elo").text();
        team.score = score;

        listTeamsRaiting.push(team);
    })
    console.log(listTeamsRaiting);
    return listTeamsRaiting;
};


// ОЖИДАНИЕ МАТЧИ
var getUpcomingMatches = async function () {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const url = "https://www.hltv.org/matches";
    const $ = await getHTML(url);
    const upcomingMatches = [];

    $('div.upcomingMatchesSection').each((i, upcomingDateMatches) => {
        const upcomingDateMatch = {}; // объект матчей по дате

        const date = $(upcomingDateMatches).children('div.matchDayHeadline').text();
        upcomingDateMatch.date = date;
        const matches = [];
        var countMatchDay = $(upcomingDateMatches).children('div.upcomingMatch').length;
        /*console.log($(upcomingDateMatches).children('div.upcomingMatch').last().find('a.match').attr('href'));*/
        $(upcomingDateMatches).children('div.upcomingMatch').each((j, upcomingMatch) => {
            const match = {};// объект матча
    
            const url = $(upcomingMatch).find('a.match').attr('href'); // ссылка на матч
            match.url = url;
            
            /// Информация о матче
            const matchInfo = {};

            const matchTime = $(upcomingMatch).find('div.matchTime').text(); // ссылка на матч
            matchInfo.matchTime = matchTime;

            const matchMeta = $(upcomingMatch).find('div.matchMeta').text(); // ссылка на матч
            matchInfo.matchMeta = matchMeta;

            match.matchInfo = matchInfo;
            //console.log("empty: " + $(upcomingMatch).find('div.matchInfoEmpty').length);
            if($(upcomingMatch).find('div.matchInfoEmpty').length == 0) {
            /// 1 команда
            const team1 = {};
            const team1Parse = $(upcomingMatch).find('div.team1');

            const team1Logo = team1Parse.find('img.matchTeamLogo').attr('src'); // ссылка на матч
            team1.team1Logo = team1Logo;

            const team1Name = team1Parse.find('div.matchTeamName').text(); // ссылка на матч
            team1.team1Name = team1Name;

            match.team1 = team1;

              /// 2 команда
            const team2 = {};
            const team2Parse = $(upcomingMatch).find('div.team2');
            if($(upcomingMatch).find('div.team').length == 0) {
            const team2Logo = team2Parse.find('img.matchTeamLogo').attr('src'); // ссылка на матч
            team2.team2Logo = team2Logo;

            const team2Name = team2Parse.find('div.matchTeamName').text(); // ссылка на матч
            team2.team2Name = team2Name;
            }
            else {
            const team2Name = team2Parse.find('div.team').text(); // ссылка на матч
            team2.team2Name = team2Name;
            }
            match.team2 = team2;
            }
            else {
                match.emptyMatchInfo = true;
            }
            matches.push(match);
        })
        console.log("____________________________________________");
        upcomingDateMatch.mathes = matches;
        upcomingMatches.push(upcomingDateMatch);
   
        console.log(upcomingDateMatch.mathes);
    })
    /*console.log(upcomingMatches);*/
    return upcomingMatches;
};



const getMatchAnalitic = async (url) => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
    const site = "https://www.hltv.org";
    const urlMatch = site + url;
    const $ = await getHTML(urlMatch);
    var listTeamsMatchAnalitic = [];
    const teams = $('div.standard-box');

    const team1Analitic = {};

    const team1 = teams.find('div.team').first();
    const team1Url = team1.find('a').attr('href');

    const newteam1Url = team1Url.replace('team', 'teams');

    const urlTeamStats1 = site + '/stats' + newteam1Url;
    const $team1 = await getHTML(urlTeamStats1);

    const winRateTeam1 = $team1('div.large-strong').eq(1).text();
    const winMatchTeam1 = parseInt(winRateTeam1.split("/")[0].split(' ').join(''));
    const loseMatchTeam1 = parseInt(winRateTeam1.split("/")[2].split(' ').join(''));
    team1Analitic.winMatch = winMatchTeam1;
    team1Analitic.loseMatch = loseMatchTeam1;

    const team1Map = []; 
    $('div.map-stats-infobox-maps').each((i, mapStat) => {
      

         const mapPercentWinColumn = $(mapStat).find('div.map-stats-infobox-winpercentage').first(); 
         const mapPercentWin = mapPercentWinColumn.find('a').text();
         if(mapPercentWin != '-')
         { 
           
         const newmapPercentWin = mapPercentWin.replace('%', '');
       const PercentWin = parseInt(newmapPercentWin);
          team1Map.push(PercentWin);
         }
         else {
          const PercentWin = 50;
               team1Map.push(PercentWin);
         }
     
    })
    team1Analitic.mapStats = team1Map;

    const players1Team = {};
    const team1Players = $('div.lineups').find('div.lineups-compare-container').data('team1-players-data');
    var team1keys = Object.keys(team1Players); //получаем ключи объекта в виде массива
    players1Team.player1 = team1Players[team1keys[0]]['numericKpr'];
    players1Team.player2 = team1Players[team1keys[1]]['numericKpr'];
    players1Team.player3 = team1Players[team1keys[2]]['numericKpr'];
    players1Team.player4 = team1Players[team1keys[3]]['numericKpr'];
    players1Team.player5 = team1Players[team1keys[4]]['numericKpr'];

    team1Analitic.statsPlayer = players1Team;
    listTeamsMatchAnalitic.push(team1Analitic);

    const team2Analitic = {};

    const team2 = teams.find('div.team').last();
    const team2Url = team2.find('a').attr('href');

    const newteam2Url = team2Url.replace('team', 'teams');

    const urlTeamStats2 = site + '/stats' + newteam2Url;
    const $team2 = await getHTML(urlTeamStats2);

    const winRateTeam2 = $team2('div.large-strong').eq(1).text();
    const winMatchTeam2 = parseInt(winRateTeam2.split("/")[0].split(' ').join(''));
    const loseMatchTeam2 = parseInt(winRateTeam2.split("/")[2].split(' ').join(''));
    team2Analitic.winMatch = winMatchTeam2;
    team2Analitic.loseMatch = loseMatchTeam2;

    const team2Map = [];
    $('div.map-stats-infobox-maps').each((i, mapStat) => {
      
         const mapPercentWinColumn = $(mapStat).find('div.map-stats-infobox-winpercentage').last(); 
         const mapPercentWin = mapPercentWinColumn.find('a').text();
         if(mapPercentWin != '-')
         { 
           
         const newmapPercentWin = mapPercentWin.replace('%', '');
       const PercentWin = parseInt(newmapPercentWin);
             team2Map.push(PercentWin);
         }
         else {
          const PercentWin = 50;
                team2Map.push(PercentWin);
         }
    })

    team2Analitic.mapStats = team2Map;

 const players2Team = {};
    const team2Players = $('div.lineups').find('div.lineups-compare-container').data('team2-players-data');
    var team2keys = Object.keys(team2Players); //получаем ключи объекта в виде массива
    players2Team.player1 = team2Players[team2keys[0]]['numericKpr'];
    players2Team.player2 = team2Players[team2keys[1]]['numericKpr'];
    players2Team.player3 = team2Players[team2keys[2]]['numericKpr'];
    players2Team.player4 = team2Players[team2keys[3]]['numericKpr'];
    players2Team.player5 = team2Players[team2keys[4]]['numericKpr'];

    team2Analitic.statsPlayer = players2Team;

    listTeamsMatchAnalitic.push(team2Analitic);

    console.log(listTeamsMatchAnalitic);
    console.log('_______________________________________________________________________');
    return listTeamsMatchAnalitic;
};

const Analitic = async () => {

const teams = await getMatchAnalitic('/matches/2346250/unique-vs-the-incas-esea-winter-cash-cup-3-europe');

const team1 = teams[0];

// 1 команда переменные
WinAteam = team1.winMatch;

LoseAteam = team1.loseMatch;

Map1Ateam = team1.mapStats[0];

Map2Ateam = team1.mapStats[1];

Map3Ateam = team1.mapStats[2];

Map4Ateam = team1.mapStats[3];

Map5Ateam = team1.mapStats[4];

Map6Ateam = team1.mapStats[5];

Map7Ateam = team1.mapStats[6];


Player1Ateam = team1.statsPlayer['player1'];

Player2Ateam = team1.statsPlayer['player2'];

Player3Ateam = team1.statsPlayer['player3'];

Player4Ateam = team1.statsPlayer['player4'];

Player5Ateam = team1.statsPlayer['player5'];

console.log("team 1: " +
"\n winRate - " + WinAteam + 
"\n loseRate - " + LoseAteam + 
"\n Map1 - " + Map1Ateam  + 
"\n Map2 - " + Map2Ateam + 
"\n Map3 - " + Map3Ateam + 
"\n Map4 - " + Map4Ateam + 
"\n Map5 - " + Map5Ateam + 
"\n Map6 - " + Map6Ateam + 
"\n Map7 - " + Map7Ateam + 
"\n Player1 - " + Player1Ateam + 
"\n Player2 - " + Player2Ateam + 
"\n Player3 - " + Player3Ateam + 
"\n Player4 - " + Player4Ateam + 
"\n Player5 - " + Player5Ateam);

const team2 = teams[1];

// 1 команда переменные
WinBteam = team2.winMatch;

LoseBteam = team2.loseMatch;

Map1Bteam = team2.mapStats[0];

Map2Bteam = team2.mapStats[1];

Map3Bteam = team2.mapStats[2];

Map4Bteam = team2.mapStats[3];

Map5Bteam = team2.mapStats[4];

Map6Bteam = team2.mapStats[5];

Map7Bteam = team2.mapStats[6];


Player1Bteam = team2.statsPlayer['player1'];

Player2Bteam = team2.statsPlayer['player2'];

Player3Bteam = team2.statsPlayer['player3'];

Player4Bteam = team2.statsPlayer['player4'];

Player5Bteam = team2.statsPlayer['player5'];

console.log("team 2: " +
"\n winRate - " + WinBteam + 
"\n loseRate - " + LoseBteam + 
"\n Map1 - " + Map1Bteam  + 
"\n Map2 - " + Map2Bteam + 
"\n Map3 - " + Map3Bteam + 
"\n Map4 - " + Map4Bteam + 
"\n Map5 - " + Map5Bteam + 
"\n Map6 - " + Map6Bteam + 
"\n Map7 - " + Map7Bteam + 
"\n Player1 - " + Player1Bteam + 
"\n Player2 - " + Player2Bteam + 
"\n Player3 - " + Player3Bteam + 
"\n Player4 - " + Player4Bteam + 
"\n Player5 - " + Player5Bteam);


var Chans = 100;
var C = 1;


// переменные для расчета
if (WinAteam <= 0) {
KDA = 0;
} else {
// k/d 1 команды все матчи
KDA = parseFloat(WinAteam) / parseFloat(LoseAteam);
}
if (WinBteam <= 0) {
KDB = 0;
} else {
// k/d 2 команды все матчи
KDB = parseFloat(WinBteam) / parseFloat(LoseBteam);
}


// k/d 1 команды по картам
CardA = (parseFloat(Map1Ateam) / parseFloat(Chans)) + 
(parseFloat(Map2Ateam) / parseFloat(Chans)) + 
(parseFloat(Map3Ateam) / parseFloat(Chans)) + 
(parseFloat(Map4Ateam) / parseFloat(Chans)) + 
(parseFloat(Map5Ateam) / parseFloat(Chans)) + 
(parseFloat(Map6Ateam) / parseFloat(Chans)) + 
(parseFloat(Map7Ateam) / parseFloat(Chans));

// k/d 2 команды по картам
CardB = (parseFloat(Map1Bteam) / parseFloat(Chans)) + 
(parseFloat(Map2Bteam) / parseFloat(Chans)) + 
(parseFloat(Map3Bteam) / parseFloat(Chans)) + 
(parseFloat(Map4Bteam) / parseFloat(Chans)) + 
(parseFloat(Map5Bteam) / parseFloat(Chans)) + 
(parseFloat(Map6Bteam) / parseFloat(Chans)) + 
(parseFloat(Map7Bteam) / parseFloat(Chans));

// k/d 1 команды по игрокам
PlayersA = parseFloat(Player1Ateam) + parseFloat(Player2Ateam) + parseFloat(Player3Ateam) + parseFloat(Player4Ateam) + parseFloat(Player5Ateam);

// k/d 2 команды по игрокам
PlayersB = parseFloat(Player1Bteam) + parseFloat(Player2Bteam) + parseFloat(Player3Bteam) + parseFloat(Player4Bteam) + parseFloat(Player5Bteam);
console.log((parseFloat(KDA) * (parseFloat(C) - parseFloat(KDB)) + parseFloat(KDB) * (parseFloat(C) - parseFloat(KDB))));
// шанс победы 1 команды по матчам
ChansA = parseFloat(KDA) * (parseFloat(C) - parseFloat(KDB)) / (parseFloat(KDA) * (parseFloat(C) - parseFloat(KDB)) + parseFloat(KDB) * (parseFloat(C) - parseFloat(KDB)));
// шанс победы 2 команды по матчам
ChansB = parseFloat(C) - parseFloat(ChansA);


// шанс победы 1 команды по картам
ChansCardA = parseFloat(CardA) * (parseFloat(C) - parseFloat(CardB)) / (parseFloat(CardA) * (parseFloat(C) - parseFloat(CardB)) + parseFloat(CardB) * (parseFloat(C) - parseFloat(CardB)));

// шанс победы 2 команды по картам
ChansCardB = parseFloat(C) - parseFloat(ChansCardA);

// шанс победы 1 команды по игрокам
ChansPlayersA = parseFloat(PlayersA) * (parseFloat(C) - parseFloat(PlayersB)) / (parseFloat(PlayersA) * (parseFloat(C) - parseFloat(PlayersB)) + parseFloat(PlayersB) * (parseFloat(C) - parseFloat(PlayersB)));

// шанс победы 2 команды по игрокам
ChansPlayersB = parseFloat(C) - parseFloat(ChansPlayersA);

// шанс победы 1 команды по всем параметрам
ChansWinsA = parseFloat(ChansA) + parseFloat(ChansCardA) + parseFloat(ChansPlayersA);

// шанс победы 2 команды по всем параметрам
ChansWinsB = parseFloat(ChansB) + parseFloat(ChansCardB) + parseFloat(ChansPlayersB);

console.log('Analitic: \n team1: ' + ChansWinsA + '\n team2: ' +ChansWinsB);
};

Analitic();