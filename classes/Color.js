/*-------
Color object contains a weight and fill
-------*/

import { WeightedObject } from "../classes/WeightedObject.js"

class Color extends WeightedObject{
  constructor(weight, fill){
    super(weight);                         // likelihood that an object will be randomly selected
    this.fill = fill
  }
}

export { Color };