// const weeklyRosters2021 = require('./2021/weeklyRosters/index.js');
const weeklyRosters2022 = require('./2022/weeklyRosters/index.js');

const onlyUnique = (val, index, self) => self.indexOf(val) === index;

const onlyTeams = weekJson => weekJson.teams;

// TODO: turn this part into a function!!! 
const allWeeksTeams = weeklyRosters2022.regularSeason.map(wk => onlyTeams(wk)).flat(1);
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