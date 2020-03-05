/*-------
List of weighted objects
-------*/

class WeightedList{
  constructor(){
    this.list = [...arguments];                         // array of weighted objects
    this.weights = getNormalizedWeights(this.list)      // normalized list of weights for selecting values
  }

  selectObj(count){
    let selectionLength = count ? count : 1;            // number of objects selected from the list
    let selected = new Set()                            // set of selected objects

    // pick correct number of unique objects
    do {
      let randomPick = Math.random()                    // pick a random number

      let pick = this.weights.findIndex(val => randomPick <= val)
      let obj = this.list[pick]
      selected.add(obj)
    } while (selected.size < selectionLength)

    return Array.from(selected.values())
  }
}

// return normalized weights as an array
function getNormalizedWeights(list){
  let weights = []

  // get total weight of list
  let totalWeight = 0;

  list.forEach(obj => {
    totalWeight += obj.weight
  })  

  // update weight values and create values for choosing option
  let totalWeightVal = 0;
  list.forEach(obj => {
    totalWeightVal += obj.weight / totalWeight
    weights.push(totalWeightVal)
  })

  return weights
}

export { WeightedList };