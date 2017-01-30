//this script populates the email column in sql

var mysql = require('mysql');
var jsdom = require("jsdom");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'BBB'
});
 
connection.connect();

var id = 1;

getURL()

function getURL(){
  console.log(id)
  connection.query('SELECT ReportURL FROM d WHERE id=?',[id], function (error, results, fields) {
    getEmail(results[0].ReportURL)
  });
}


function getEmail(url){
  jsdom.env(
    url,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      var contact = window.$(".business-buttons").children().attr('href')
      check4Email(contact)
    }
  );
}




function check4Email(contact){
  if (contact === undefined){
    id++;
    getURL()    
  }
  else if (contact.indexOf('@') > 0) {
    add2Sql(contact)
  } else {
    id++;
    getURL()    
  }
}


function add2Sql(email){
  email = email.replace('mailto:','');
  connection.query('UPDATE d SET Email=? WHERE id=?',[email,id], function (error, results, fields) {
    id++;
    getURL();
  });

}