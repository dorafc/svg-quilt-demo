/*-------
ColorOptions object contains a weight and fill
-------*/

import { WeightedObject } from "./WeightedObject.js"

class ColorOptions extends WeightedObject{
  constructor(weight, fill){
    super(weight);                         // likelihood that an object will be randomly selected
    this.fill = fill
  }
}

export { ColorOptions };