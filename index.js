const { mergeSort, binarySearch, bsearchFindAll } = require('./helper-functions')

var express = require('express')
var pg = require('pg')
const PORT = process.env.PORT || 8000
var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/swish'
var client = new pg.Client(conString)
var fs = require("fs")

var app = express()
client.connect()

// express api endpoint at localhost:8000/

app.get('/', (req, res) => {
  var {playerId} = req.query
  var {eventId} = req.query
  playerId = parseInt(playerId)
  eventId = parseInt(eventId)

  const query = {
    text: 'SELECT * FROM players'
  }

  client.query(query, (err, response) => {

    if (eventId && playerId) {
      const eventQuery = mergeSort(bsearchFindAll(response.rows, eventId, 'eventId'), playerId)
      res.send(eventQuery[binarySearch(eventQuery, playerId, 'playerId')])
    } else if (eventId) {
      res.send(bsearchFindAll(response.rows, eventId, 'eventId'))
    } else if (playerId) {
      const playerQuery = mergeSort(response.rows, playerId)
      res.send(playerQuery[binarySearch(playerQuery, playerId, 'playerId')])
    } else {
      res.send(response.rows)
    }

    if (err) {
      res.send(err)
    }
  })
})

app.listen(PORT, () => {
  console.log(__dirname)
  console.log(`listening on ${PORT}`)
})

// Code used to seed database with data.json file

// fs.readFile('data.json', 'utf8', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   const parsedData = JSON.parse(data)

//   if (parsedData) {
//     for (var i = 0; i < parsedData.length; i++) {
    
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


// })