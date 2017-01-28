var fs = require('fs');
var CronJob = require('cron').CronJob;
var request = require('request');
var jsonexport = require('jsonexport');



var token = "foobar"
var pageNumber = 1;




new CronJob('1 * * * * *', function() {

	var options = {
	  url: 'https://api.bbb.org/api/orgs/search?StateProvince=FL&PageNumber=' + pageNumber,
	  headers: {
		"Authorization": 'Bearer ' + token,
	  }
	};
	
	request(options, callback);

}, null, true, 'America/Los_Angeles');


function callback(error, response, body) {
	var jsonTxt = JSON.parse(JSON.stringify(response.body))
	string2CSV(jsonTxt)
}









function string2CSV(jsonString){
	var jsonObject = JSON.parse(jsonString);

	jsonexport(jsonObject.SearchResults,function(err, csv){
	    appendCSV(csv)
	})
}


function appendCSV(csv){
	fs.appendFile("total.csv", csv)
	console.log(pageNumber)
}
