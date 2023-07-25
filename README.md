This is a private-use app for generating and archiving Fantasy Football data for the League of Ordinary Working Men. This league uses Sleeper.app for annual drafting and ESPN for in-season competition tracking. This app pulls data from both those sources and has various use cases for use.

# Setup

* Install Node
* Install `json2csv`


# Data

## Archiving

In order to archive and provide backups of data, follow the steps below:

Every active roster from a completed week can be recorded by making the following request to the ESPN API:

// curl --location --request GET 'http://fantasy.espn.com/apis/v3/games/ffl/seasons/{YEAR}/segments/0/leagues/286565?view=mBoxscore&view=mMatchupScore&scoringPeriodId={WEEK}' 

Responses from the above request are titled after the  week requested: wk{number}.json

## Structuring

In order to make the raw data more useful, the  `writeJsonOut.js` script is used to create structured files.

Use this script by uncommenting only the structured data desired and then running the script and directing the output into an appropriately named file. For example:

After uncommenting the `draft` script:
```
node writeJsonOut.js >> 2022/structured/draft.out.json
```

> NOTE: the above methodology should be improved (as should the data storage pattern)

# Best Ball

For post-season analysis or just for fun. Best Ball scores for each season can be generated by the following steps. Best Ball scoring uses the results of the draft as a source for each team's roster and generates best possible scoring rosters for each week while ignoring any movement on waivers, free agency, trades, etc.




### Additional Notes

CSVs generated by "json2csv"

```json2csv -i {pathToJSONDataFile} -o {pathToExportCSV}