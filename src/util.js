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

export { shuffleArray, getTotalFreq };