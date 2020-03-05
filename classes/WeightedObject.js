/*-------
Weighted object is the basis for any data type that can be selected by weight
-------*/

class WeightedObject{
  constructor(weight){
    this.weight = weight;                         // likelihood that an object will be randomly selected
  }
}

export { WeightedObject };