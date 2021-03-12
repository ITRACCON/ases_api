const axios = require('axios');
const cheerio = require('cheerio');

 const instance = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         'User-Agent':	'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0'
        },
    });

module.exports = function() {
 // ОЖИДАНИЕ МАТЧИ
this.getUpcomingMatches = async function (callback) {
    const getHTML = async (url) => {
        const { data } = await axios.get(url, ,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         'User-Agent':	'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0'
        },);
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
        upcomingDateMatch.mathes = matches;
        upcomingMatches.push(upcomingDateMatch);
    })
    return upcomingMatches;
};

// ЛАЙФ МАТЧИ
this.getLiveMatches = async function (callback) {
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
    return liveMatches;
};

// РЕЙТИНГ КОМАНДЫ
this.getTeamsRaiting = async function (callback) {
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
}


