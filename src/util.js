// shuffle an array (Durstenfeld Shuffle)
function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }

  return arr;
}

// get the total possible frequency of options
function getTotalFreq(options){
  let total = 0;

  for (let value of Object.values(options)) {
    total += value.frequency;
  }

  return total
}

// selected a randomized option from an object with weighted frequency types
function getRandomWeightedFreq(totalFreq, options){
  let selection;
  let countFreq = 0;
  let randomPick = Math.floor(Math.random() * Math.floor(totalFreq)) + 1;

  for (let [key, value] of Object.entries(options)) {
        
    countFreq += value.frequency;
    if (randomPick <= countFreq){
      selection = key
      break;
    }
  }

  return selection;
}

export { shuffleArray, getTotalFreq, getRandomWeightedFreq };