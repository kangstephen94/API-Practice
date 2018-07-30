var express = require('express')
var pg = require("pg");
const PORT = process.env.PORT || 8000;
var conString = process.env.DATABASE_URL || "postgres://localhost:5432/swish";
var client = new pg.Client(conString);
// var fs = require("fs");

var app = express();
client.connect();

// Implementation of mergesort
function mergeSort(arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

function merge(left, right) {
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

//Implementation of binary search
function binarySearch(array, targetValue) {

  if (array.length === 0) { 
    return "Search query returned no results" 
  }

  const middle = Math.floor(array.length/2)
  console.log(array[middle].player.id)
  
  if (array[middle].player.id > targetValue) {
    const leftArray = array.slice(0, middle)
    return binarySearch(leftArray, targetValue)
  } else if (array[middle].player.id < targetValue) {
    const rightArray = array.slice(middle + 1)
    return binarySearch(rightArray, targetValue)
  } else {
    return array[middle]
  }

}

app.get("/", (req, res) => {

  var {playerId} = req.query
  var {eventID} = req.query

  const query = {
    text: 'SELECT * FROM players'
  };

  client.query(query, (err, response) => {

    const sortedResults = mergeSort(response.rows)

    if (Object.keys(req.query).length !== 0) {
      res.send(binarySearch(sortedResults, parseInt(playerId)))
    } else {
      res.send(response.rows)
    }
  });
});

app.listen(PORT, () => {
  console.log(__dirname)
  console.log(`listening on ${PORT}`)
});



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