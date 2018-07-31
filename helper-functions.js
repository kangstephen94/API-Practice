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

// Implementation of binary search using recursion
function binarySearch (array, targetValue, query) {
  if (array.length === 0) {
    return null
  }
  
  const middle = Math.floor(array.length / 2)
  
  var currentObj
  
  // Based on the query string, binarySearch changes dynamically
  query === 'eventId' ? currentObj = array[middle].player.event_id : array[middle].player.id
  
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

// Define another function bsearchFindAll using binarySearch defined above to find all objects that are related to a certain event
function bsearchFindAll(arr, target, query) {
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

module.exports.mergeSort = mergeSort
module.exports.binarySearch = binarySearch
module.exports.bsearchFindAll = bsearchFindAll
