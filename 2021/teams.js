const weeklyRosters2021 = require('./weeklyRosters/index.js');

const onlyUnique = (val, index, self) => self.indexOf(val) === index;

const onlyTeams = weekJson => weekJson.teams;

const allWeeksTeams = weeklyRosters2021.regularSeason.map(wk => onlyTeams(wk)).flat(1);
const allTeamsIds = allWeeksTeams.map(team => team.id);
const uniqueTeamIds = allTeamsIds.filter(onlyUnique);

const uniqueTeams = uniqueTeamIds.map(id => {
    const teamGames = allWeeksTeams.filter(team => team.id === id);
    return {
        id: id,
        abbrev: teamGames.map(team => team.abbrev).filter(onlyUnique)[0],
        name: teamGames.map(team => `${team.location} ${team.nickname}`).filter(onlyUnique)[0],
        logo: teamGames.map(team => team.logo).filter(onlyUnique)[0]
    };
});

module.exports = uniqueTeams;