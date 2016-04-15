var xhr = require("xhr");

var f = function(obj){
  xhr({
      body: JSON.stringify(obj),
      uri: "booking.uz.gov.uz/search",
      headers: {
          "Content-Type": "application/json"
      }
  }, function (err, resp, body) {
      console.log(resp);
  })
}

module.exports = f;
