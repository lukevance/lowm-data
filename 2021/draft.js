const sleeperDraft = require('./draft/sleeper.json');

const getPicks = sleeperJSON => {
    const picks = sleeperJSON.draft_picks.map(pick => {
        const draftedBy = sleeperJSON.user_drafts_by_draft.find(user => user.user_id === pick.picked_by);
        const draftedByName = draftedBy ? draftedBy.user_display_name : 'autopick';
        // console.log(draftedBy);
        return {
            pick_no: pick.pick_no,
            picked_by: draftedByName,
            player_id: pick.player_id,
            player_name: pick.metadata.first_name + " " + pick.metadata.last_name,
            player_position: pick.metadata.position,
            player_exp: pick.metadata.years_exp
        }
    });
    return picks;
};


console.log(JSON.stringify(getPicks(sleeperDraft)));
// const draftedBy = sleeperDraft.draft_picks[0].picked_by;
// console.log(sleeperDraft.user_drafts_by_draft.find(user => user.user_id === draftedBy));
