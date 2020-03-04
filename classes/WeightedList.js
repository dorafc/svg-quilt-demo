/*-------
List of weighted objects
-------*/

class WeightedList{
  constructor(){
    this.list = [...arguments];                         // array of weighted objects
  }

  normalizeWeight(){
    // get total weight of list
    let totalWeight = 0;

    this.list.forEach(obj => {
      totalWeight += obj.weight
    })  

    // update weight values and create values for choosing option
    let selectVal = 0
    this.list.forEach(obj => {
      obj.normWeight = obj.weight / totalWeight
      selectVal += obj.normWeight
      obj.selectWeightValue = selectVal
    })
  }
}

export { WeightedList };