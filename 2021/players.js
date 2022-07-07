const allGamesRegularSeason = require('./playerGames');
const teams = require('./teams');
const draftBoard2021 = require('./draft');

const onlyUnique = (val, index, self) => self.indexOf(val) === index;

const allNameStrings = allGamesRegularSeason.map(game => game.name);
const uniquePlayers = allNameStrings.filter(onlyUnique);

const checkDrafted = (player, draftBoard) => {
    const matches = draftBoard.filter(pick => pick.player_name === player.name);
    if (matches.length === 1) {
        return matches[0];
    } else if (matches.length > 1) {
        return matches.filter(match => match.player_position === player.position)[0];
    } else {
        return null;
    }
}

const uniquePlayersWithGames = uniquePlayers.map(playerName => {
    const playerGames = allGamesRegularSeason.filter(game => game.name === playerName);
    const playerDrafted = checkDrafted(playerGames[0], draftBoard2021);
    return {
        name: playerName,
        id: playerGames[0].playerId,
        teams: playerGames.map(game => game.team)
                    .filter(onlyUnique)
                    .map(teamId => teams.find(tm => tm.id === teamId).name),
        starts: playerGames.filter(game => game.starter).length,
        benched: playerGames.filter(game => !game.starter).length,
        drafted_round: playerDrafted ? playerDrafted.round_no : 0,
        sleeper_id: playerDrafted ? playerDrafted.player_id: "0000",
    };
});

module.exports = uniquePlayersWithGames;