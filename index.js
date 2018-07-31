var express = require('express')
var pg = require("pg")
const PORT = process.env.PORT || 8000
var conString = process.env.DATABASE_URL || "postgres://localhost:5432/swish"
var client = new pg.Client(conString)
// var fs = require("fs");

var app = express()
client.connect()

// Implementation of mergesort
function mergeSort (arr, query) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(
    mergeSort(left),
    mergeSort(right),
    query
  )
}

function merge (left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].player.id < right[indexRight].player.id) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

// Implementation of binary search
function binarySearch (array, targetValue, query) {
  if (array.length === 0) {
    return null
  }

  const middle = Math.floor(array.length / 2)

  if (query === 'eventId') {
    var currentObj = array[middle].player.event_id
  } else if (query === 'playerId') {
    var currentObj = array[middle].player.id
  }

  if (currentObj > targetValue) {
    const leftArray = array.slice(0, middle)
    return binarySearch(leftArray, targetValue, query)
  } else if (currentObj < targetValue) {
    const rightArray = array.slice(middle + 1)
    const subAnswer = binarySearch(rightArray, targetValue, query)
    return subAnswer === null ? null : (middle + 1) + subAnswer
  } else {
    return middle
  }
}

// Use binarySearch defined above to find all objects that is equal to the target(events query)
function bsearchFindAll (arr, target, query) {
  const idx = binarySearch(arr, target, query)
  const result = []

  let currentIndex = idx

  while (currentIndex >= 0 && target === arr[currentIndex].player.event_id) {
    result.push(arr[currentIndex])
    currentIndex -= 1
  }

  currentIndex = idx + 1
  while (target === arr[currentIndex].player.event_id) {
    result.push(arr[currentIndex])
    currentIndex += 1
  }

  return result
}

// express route

app.get('/', (req, res) => {
  var {playerId} = req.query
  var {eventId} = req.query
  playerId = parseInt(playerId)
  eventId = parseInt(eventId)

  const query = {
    text: 'SELECT * FROM players'
  }

  client.query(query, (err, response) => {
    let eventQuery
    let playerQuery

    if (eventId && playerId) {
      eventQuery = mergeSort(bsearchFindAll(response.rows, eventId, 'eventId'), playerId)
      res.send(eventQuery[binarySearch(eventQuery, playerId, 'playerId')])
      console.log('hit correct route')
    } else if (eventId) {
      res.send(bsearchFindAll(response.rows, eventId, 'eventId'))
    } else if (playerId) {
      playerQuery = mergeSort(response.rows, playerId)
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