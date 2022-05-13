const playerGames = require('./playerGames.out.json');

const rookies = [
    "Najee Harris",
    "Kyle Pitts",
    "Javonte Williams",
    "Ja'Marr Chase",
    "Trey Sermon",
    "Rondale Moore",
    "DeVonta Smith",
    "Justin Fields",
    "Jaylen Waddle",
    "Trevor Lawrence",
    "Elijah Moore",
    "Rhamondre Stevenson",
    "Trey Lance"
];

const gamesByRookies = playerGames.filter(game => rookies.includes(game.name));

const rookiesWithStats = rookies.map(rookie => {
    const games = playerGames.filter(game => game.name === rookie);
    const starts = games.filter(game => game.starter === true);
    const benched = games.filter(game => game.starter === false);
    return {
        name: rookie,
        starts: starts.length,
        benched: benched.length,
        totalPoints: games.map(game => game.points).reduce((prev, curr) => prev + curr, 0).toFixed(2),
        startPoints: starts.map(game => game.points).reduce((prev, curr) => prev + curr, 0).toFixed(2),
        benchPoints: benched.map(game => game.points).reduce((prev, curr) => prev + curr, 0).toFixed(2),
    }
});

console.log(JSON.stringify(rookiesWithStats.sort((a,b) => b.totalPoints - a.totalPoints)));