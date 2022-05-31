const sleeperDraft = require('./draft/sleeper.json');

const completeDraftOrder = sleeper => {
    const totalPicks = sleeper.get_draft.settings.rounds * sleeper.get_draft.settings.teams;
    const array = Object.keys(sleeperDraft.get_draft.draft_order)
                                .map((id, i, arr) => {
                                    return {id:id, num: sleeperDraft.get_draft.draft_order[id]}
                                });
    // TODO create an array of teams through 2 rounds, cycle through and assign picks
        return array;
}

// const getPicks = sleeperJSON => {
//     const picks = sleeperJSON.draft_picks.map(pick => {
//         const draftedBy = sleeperJSON.user_drafts_by_draft.find(user => user.user_id === pick.picked_by);
//         const draftedByName = draftedBy ? draftedBy.user_display_name : 'autopick';
//         // console.log(draftedBy);
//         return {
//             pick_no: pick.pick_no,
//             picked_by: draftedByName,
//             player_id: pick.player_id,
//             player_name: pick.metadata.first_name + " " + pick.metadata.last_name,
//             player_position: pick.metadata.position,
//             player_exp: pick.metadata.years_exp
//         }
//     });
//     return picks;
// };


// console.log(JSON.stringify(getPicks(sleeperDraft)));
console.log(completeDraftOrder(sleeperDraft));
