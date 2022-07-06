const allGamesRegularSeason = require('./playerGames');
const teams = require('./teams');
const draftBoard2021 = require('./draft');

const onlyUnique = (val, index, self) => self.indexOf(val) === index;

const allNameStrings = allGamesRegularSeason.map(game => game.name);
const uniquePlayers = allNameStrings.filter(onlyUnique);

// const getRoundDrafted = (name, draftBoard) => {

// }

const uniquePlayersWithGames = uniquePlayers.map(playerName => {
    const playerGames = allGamesRegularSeason.filter(game => game.name === playerName);
    return {
        name: playerName,
        id: playerGames[0].playerId,
        teams: playerGames.map(game => game.team)
                    .filter(onlyUnique)
                    .map(teamId => teams.find(tm => tm.id === teamId).name),
        starts: playerGames.filter(game => game.starter).length,
        benched: playerGames.filter(game => !game.starter).length,
        // TODO: add round_drafted
    };
});

module.exports = uniquePlayersWithGames;