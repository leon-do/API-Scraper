//this script populates the summary section in sql

var AYLIENTextAPI = require('aylien_textapi');

var textapi = new AYLIENTextAPI({
  application_id: "d1a49f72",
  application_key: "55251e8d6cbbb636f144d1ecffa964d0"
});


var url = 'http://www.patientsfirst.com/about-us/'

textapi.summarize({
  url: url,
  sentences_number: 1
}, function(error, response) {
    response.sentences.forEach(function(summary) {
      console.log(summary);
    });
});