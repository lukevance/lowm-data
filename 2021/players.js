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
        // check for suffixes between Sleeper/ESPN names
        const suffixes = ["Jr.", "Sr.", "II", "III", "V"];
        const nameSuffix = suffixes.filter(element => player.name.split(" ").includes(element)); 
        const suffixIndex = player.name.split(" ").indexOf(nameSuffix[0]);
        if (suffixIndex > -1 ) {
            // look for matches after removing suffixes
            const modName = player.name.split(" ").filter((v, i) => i != suffixIndex).join(" ");
            const looseMatches = draftBoard.filter(pick => pick.player_name === modName);
            if (looseMatches && looseMatches[0]) {
                return looseMatches[0];
            } else {
                return null;
            } 
        } else if (player.position === "D/ST") {
            // handle Defenses
            const defName = player.name.split(" ")[0];
            const defMatches = draftBoard.filter(pick => pick.player_name.split(" ")[1] === defName);
            return defMatches[0] ? defMatches[0] : null;
        } else if (player.name.indexOf(".") > -1 ){
            // handle initialed names e.g. D.J.
            console.log(player.name)
            return null;
        } else {
            return null;
        }
    }
}

const uniquePlayersWithGames = uniquePlayers.map(playerName => {
    const playerGames = allGamesRegularSeason.filter(game => game.name === playerName);
    const playerStarts = playerGames.filter(game => game.starter);
    const playerDrafted = checkDrafted(playerGames[0], draftBoard2021);
    return {
        name: playerName,
        id: playerGames[0].playerId,
        teams: playerGames.map(game => game.team)
                    .filter(onlyUnique)
                    .map(teamId => teams.find(tm => tm.id === teamId).name),
        position: playerGames[0].position,
        starts: playerStarts.length,
        benched: playerGames.filter(game => !game.starter).length,
        total_points: playerGames.map(game => game.points).reduce((prev, curr) => prev + curr).toFixed(2) * 1,
        started_points: playerStarts.length > 0 ? playerStarts.map(game => game.points).reduce((prev, curr) => prev + curr).toFixed(2) * 1 : 0,
        drafted_round: playerDrafted ? playerDrafted.round_no : 0,
        sleeper_id: playerDrafted ? playerDrafted.player_id: "0000",
    };
});

// module.exports = uniquePlayersWithGames;
uniquePlayersWithGames();