const allGamesRegularSeason = require('./playerGames');
const teams = require('./teams');
const draftBoard = require('./draft');
const sleeperESPNmap = require('./sleeper_espn_map.json');

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
        // check for suffixes in ESPN names
        const suffixes = ["Jr.", "Sr.", "II", "III", "V"];
        const nameSuffix = suffixes.filter(element => player.name.split(" ").includes(element)); 
        const suffixIndex = player.name.split(" ").indexOf(nameSuffix[0]);
        // check for known exceptions
        if (sleeperESPNmap.some(plyr => plyr.espn_id === player.playerId)) {
            const mappedPlayer = sleeperESPNmap.find(plyr => plyr.espn_id === player.playerId);
            const match = draftBoard.find(pick => pick.player_id == mappedPlayer.sleeper_id);
            return match;
        } else if (suffixIndex > -1 ) {
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
            const defMatches = draftBoard.filter(pick => pick.player_name.split(" ")[pick.player_name.split(" ").length - 1] === defName);
            return defMatches[0] ? defMatches[0] : null;
        } else if (player.name.indexOf(".") > -1 ){
            // handle initialed names e.g. D.J.
            const initialNameRmDots = player.name.split(".").join("");
            const initialMatches = draftBoard.filter(pick => pick.player_name === initialNameRmDots);
            return initialMatches[0] ? initialMatches[0]: null;
        } else {
            console.log(player.name);
            // for undrafted players return no match
            return null;
        }
    }
}

const uniquePlayersWithGames = uniquePlayers.map(playerName => {
    const playerGames = allGamesRegularSeason.filter(game => game.name === playerName);
    const playerStarts = playerGames.filter(game => game.starter);
    const playerDrafted = checkDrafted(playerGames[0], draftBoard);
    return {
        name: playerName,
        id: playerGames[0].playerId,
        active_rosters: playerGames.map(game => game.team)
                    .filter(onlyUnique)
                    .map(teamId => teams.find(tm => tm.id === teamId).name),
        drafted_by: playerDrafted ? playerDrafted.team_draft_user_name : "NA",
        position: playerGames[0].position,
        years_exp: playerDrafted ? playerDrafted.player_exp * 1 : -1,
        starts: playerStarts.length,
        benched: playerGames.filter(game => !game.starter).length,
        total_points: playerGames.map(game => game.points).reduce((prev, curr) => prev + curr).toFixed(2) * 1,
        started_points: playerStarts.length > 0 ? playerStarts.map(game => game.points).reduce((prev, curr) => prev + curr).toFixed(2) * 1 : 0,
        drafted_round: playerDrafted ? playerDrafted.round_no : 0,
        sleeper_id: playerDrafted ? playerDrafted.player_id : "0000",
    };
});

// module.exports = uniquePlayersWithGames;
uniquePlayersWithGames();