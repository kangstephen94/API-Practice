const { send } = require("micro");
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://localhost:5432/swish";
var client = new pg.Client(conString);
// var fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.connect();

module.exports = (req, res) => {
  const query = {
    text: 'SELECT * FROM players LIMIT 10'
  };
  client.query(query, (err, response) => {

    send(res, 200, response.rows);
  });
}

// Code used to seed database with data.json file

// fs.readFile('data.json', 'utf8', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   const parsedData = JSON.parse(data)

//   if (parsedData) {
//     for (var i = 0; i < data.length; i++) {
    
//     const text = 'INSERT INTO players(id, player) VALUES($1, $2)'
//     const value = [i, JSON.stringify(parsedData[i])]

//     client.query(text, value, (err, res) => {
//       if (err) {
//         console.log(err.stack)
//       } else {
//         // console.log(res.rows[0])
//       }
//     })
//   }
// }


// });

