const sleeperDraft2021 = require('./draft/sleeper.json');

// const calculateRound = (pickNo => {
//     if (pickNo % 10 )
// }

const getCompleteDraftOrder = sleeper => {
    const oddRoundArr = Object.keys(sleeper.get_draft.draft_order)
                                .map((id, i, arr) => {
                                    return {id:id, num: sleeper.get_draft.draft_order[id]}
                                })
                                .sort((a,b) => a.num - b.num);
    const evenRoundArr = oddRoundArr.slice().reverse();
    // create an array with accurate number of rounds, then fill with odd and even snake pattern
    const allRoundsArray = Array(sleeper.get_draft.settings.rounds)
                                .fill()
                                .map((nothing, i) => {
                                    // determine even or odd round
                                    if (((i + 1) % 2) == 0) {
                                        return evenRoundArr.map(obj => ({ ...obj, round: i+1 }));
                                    } else {
                                        return oddRoundArr.map(obj => ({ ...obj, round: i+1 }));
                                    }
                                });
    // convert array of rounds to flat array of picks with round data and overall pick number included
    const allPicks = allRoundsArray.flat().map((pick, i) => {
        return {
            teamId: pick.id,
            pickNo: i + 1,
            round: pick.round,
            positionInRound: pick.num
        }
    });
    return allPicks;
};

const getPicks = sleeperJSON => {
    const completeDraftOrder = getCompleteDraftOrder(sleeperJSON);
    const picks = sleeperJSON.draft_picks.map(pick => {
        const selectedByUserObj = sleeperJSON.user_drafts_by_draft.find(user => user.user_id === pick.picked_by);
        const selectedByName = selectedByUserObj ? selectedByUserObj.user_display_name : 'autopick';
        return {
            pick_no: pick.pick_no,
            round_no: completeDraftOrder[pick.pick_no - 1].round,
            team_drafted_id: completeDraftOrder[pick.pick_no - 1].teamId,
            team_draft_user_name: sleeperJSON.user_drafts_by_draft.find(user => user.user_id === completeDraftOrder[pick.pick_no - 1].teamId).user_display_name,
            picked_by: selectedByName,
            player_id: pick.player_id,
            player_name: pick.metadata.first_name + " " + pick.metadata.last_name,
            player_position: pick.metadata.position,
            player_exp: pick.metadata.years_exp
        }
    });
    return picks;
};

const draftBoard2021 = getPicks(sleeperDraft2021);

module.exports = draftBoard2021;
