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
app.get('/getRate', function(request, response) {
  console.dir('test');
  var result = 0;
  var base = 0;
  //get the package type....
  var package = request.query.package;
  //get the numbers.. 
  var weight = request.query.weight;
  var weight = parseInt(weight);
  var rounded = Math.ceil(weight);

  //perform the calculation  
  if (package == 'stamped') {
    base = .28;
    result = base + rounded * .21;
  } else if (package == 'metered') {
    base = .25;
    result = base + rounded * .21;
  } else if (package == 'flat') {
    base = .77;
    result = base + rounded * .21;
  } else if (package == 'parcel') {
    if (rounded < 5) {
      result = 3.00;
    } else {
      base = 3.00;
      rounded = rounded - 4;
      result = base + rounded * .16;
    }
  } else {
    result = 0;
  }
  //console the output
  console.log(result);
  response.render('pages/results', { result: result });
});
app.get('/calculateRate', function(request, response) {
  console.dir('test');
  var result = 0;
  var base = 0;
  //get the package type....
  var package = request.query.package;
  //get the numbers.. 
  var weight = request.query.weight;
  var weight = parseInt(weight);
  var rounded = Math.ceil(weight);

  //perform the calculation
  if (package == 'stamped') {
    base = .28;
    result = base + rounded * .21;
  } else if (package == 'metered') {
    base = .25;
    result = base + rounded * .21;
  } else if (package == 'flat') {
    base = .77;
    result = base + rounded * .21;
  } else if (package == 'parcel') {
    if (rounded < 5) {
      result = 3.00;
    } else {
      base = 3.00;
      rounded = rounded - 4;
      result = base + rounded * .16;
    }
  } else {
    result = 0;
  }
  //console the output
  console.log(result);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({ result: result }));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});