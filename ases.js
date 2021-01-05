const axios = require('axios');
const cheerio = require('cheerio');

module.exports =  function() {
this.getUpcomingMatches =  async function () {
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
}