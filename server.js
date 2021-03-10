var express = require("express");
var app = express();
app.use(express.static(__dirname));
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/not_found/"); 
});
app.listen(3000);