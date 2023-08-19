// const {regularSeason, postSeason} = require('./weeklyRosters');
const {regularSeason} = require('./2022/weeklyRosters');

const scheduleTeamHomeOrAway = (game, teamId) => {
    if (game.away.teamId === teamId){
        return "away";
    } else if (game.home.teamId === teamId){
        return "home";
    } else {
        return null;
    }
};

const positionIdToString = posId => {
    switch (posId) {
        case 1:
            return "QB";
        case 2:
            return "RB";
        case 3:
            return "WR";
        case 4:
            return "TE";
        case 16:
            return "D/ST";
        default:
            return null;
    }
};

const statByPosition = weekJson => {
    // filter out games in schedule not in scoring period
    const selectedWeekGames = weekJson.schedule.filter(game => game.matchupPeriodId === weekJson.scoringPeriodId);
    // add games from filter to teams array
    const teamsWithGames = weekJson.teams.map(team => {
        const teamSchedule = selectedWeekGames.filter(game => game.home.teamId === team.id || game.away.teamId === team.id);
        team.schedule = teamSchedule.map(game => {
            // modify roster for simplified view of players
            const roster = game[scheduleTeamHomeOrAway(game, team.id)].rosterForCurrentScoringPeriod;
            // create simplified "players" array as part of roster obj
            if (roster) {
                roster.players = roster.entries.map(entry => {
                    return {
                        id: `pl${entry.playerPoolEntry.id}wk${game.matchupPeriodId}`,
                        team: team.id,
                        week: game.matchupPeriodId,
                        position: positionIdToString(entry.playerPoolEntry.player.defaultPositionId),
                        name: entry.playerPoolEntry.player.fullName,
                        playerId: entry.playerPoolEntry.id,
                        points: entry.playerPoolEntry.appliedStatTotal.toFixed(2) * 1,
                        starter: Boolean(entry.lineupSlotId !== 20)
                    }
                });
                // rm bloated entry array from roster obj
                delete roster.entries;
            } else {
                // some error (post season)
                console.log(`week ${game.matchupPeriodId} and team ${team.id}`);
            }
            return {
                week: game.matchupPeriodId,
                roster: roster
            };
        });
        return team;
    });
    return teamsWithGames;
}

const onlyPlayerGames = weekJson => {
    const teamsWithGames = statByPosition(weekJson);
    return teamsWithGames.map(team => team.schedule[0].roster.players).flat(2);
};

// const allWeeks = regularSeason.concat(postSeason)
//                     .map(wk => onlyPlayerGames(wk))
//                     .flat(1);

const regularSeasonRosters = regularSeason.map(wk => onlyPlayerGames(wk)).flat(1);

module.exports = regularSeasonRosters;
// console.log(allWeeks);