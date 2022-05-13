// --------------
// The below files are raw output from the espn API
// curl --location --request GET 'http://fantasy.espn.com/apis/v3/games/ffl/seasons/2021/segments/0/leagues/286565?view=mBoxscore&view=mMatchupScore&scoringPeriodId=18' > wk18.json

const week1 = require('./wk1.json');
const week2 = require('./wk2.json');
const week3 = require('./wk3.json');
const week4 = require('./wk4.json');
const week5 = require('./wk5.json');
const week6 = require('./wk6.json');
const week7 = require('./wk7.json');
const week8 = require('./wk8.json');
const week9 = require('./wk9.json');
const week10 = require('./wk10.json');
const week11 = require('./wk11.json');
const week12 = require('./wk12.json');
const week13 = require('./wk13.json');
const week14 = require('./wk14.json');

const regularSeason = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14];

module.exports = {
    regularSeason: regularSeason
};