var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/math', function(request, response) {
  var result = 0;
  //get the operation....
  var operation = request.param('operation');
  //get the numbers..
  // var numTEST = request.query.number1; //this one is said to be preferred. 
  var num1 = request.param('number1'); //said to be deprecated?
  var num1 = parseInt(num1);
  var num2 = request.param('number2');
  var num2 = parseInt(num2);
  // console.log(num1);
  // console.log(num2);
  // console.log(operation);
  // console.log(numTEST);
  //perform the operation  
  if (operation == 'add') {
    result = num1 + num2;
  } else if (operation == 'subtract') {
    result = num1 - num2;
  } else if (operation == 'multiply') {
    result = num1 * num2;
  } else if (operation == 'divide') {
    result = num1 / num2;
  } else {
    result = 40;
  }
  //console the output
  console.log(result);
  response.render('pages/results', { result: result });
});
app.get('/math_service', function(request, response) {
  console.dir('test');
  var result = 0;
  //get the operation....
  var operation = request.param('operation');
  //get the numbers..
  // var numTEST = request.query.number1; //this one is said to be preferred. 
  var num1 = request.param('number1'); //said to be deprecated?
  console.dir(num1);
  var num1 = parseInt(num1);
  console.dir(num1);
  var num2 = request.param('number2');
  console.dir(num2);
  var num2 = parseInt(num2);
  console.dir(num2);
  //perform the operation  
  if (operation == 'add') {
    result = num1 + num2;
  } else if (operation == 'subtract') {
    result = num1 - num2;
  } else if (operation == 'multiply') {
    result = num1 * num2;
  } else if (operation == 'divide') {
    result = num1 / num2;
  } else {
    result = 40;
  }
  //console the output
  console.log(result);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ result: result }));
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});