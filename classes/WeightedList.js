/*-------
List of weighted objects
-------*/

class WeightedList{
  constructor(){
    this.list = [...arguments];                         // array of weighted objects
    this.weights = getNormalizedWeights(this.list)
  }

  selectObj(count){
    let selectionLength = count ? count : 1;
    let selected = []

    for (let i = selectionLength; i >= 1; i--){
      let picked = false;
      let randomPick = Math.random()
       this.list.forEach((obj, i) => {
         if (!picked && randomPick < this.weights[i]){
           picked = true;
           selected.push(obj.fill)
         }
       })
    }

    console.log(selected)
    return selected
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