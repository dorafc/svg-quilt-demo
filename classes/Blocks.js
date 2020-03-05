/*-------
Block object contains a weight and draw function
-------*/

import { WeightedObject } from "../classes/WeightedObject.js"

class Block extends WeightedObject{
  constructor(weight, draw){
    super(weight);                         // likelihood that an object will be randomly selected
    this.draw = draw                       // function to call when the block is rendered
  }
}

export { Block };