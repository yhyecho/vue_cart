var express = require('express');
var app = express();
const cors = require('cors');

// cross-origin
app.use(cors());

app.get('/cart', function(req, res) {
  res.sendFile("cart.json", {root: "data"});
})

app.listen(8080, function () {
  console.log('listen on 8080')
}) 