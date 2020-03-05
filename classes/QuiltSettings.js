/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { getTotalFreq, getRandomWeightedFreq } from '../src/util.js'

class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes){
    this.quiltID = quiltID;                   // unique identifier for the quilt
    this.spaceName = spaceNameID;             // id of the element to append the quilt SVG
    this.dimensions = dimensions;             // dimensions of the quilt
    this.colorPalette = colorPalette;         // color palette for the quilt to render
    this.blockTypes = blockTypes              // block types for the quilt

    this.totalBlockFreq = getTotalFreq(this.blockTypes)
    this.totalColorFreq = getTotalFreq(this.colorPalette)
  }
  
  // generate random blocks based off of generator object
  generateBlocks(){
    let blocks = []

    // loop through rows and columns to generate quilt blocks
    for (let r  = 0; r < this.dimensions.rows; r++){
      for (let c = 0; c < this.dimensions.cols; c++){
        let startX = c * this.dimensions.blockWidth  
        let startY = r * this.dimensions.blockHeight

        // generate two color palette
        let colorPick = this.colorPalette.selectObj(2).map(color => color.fill)

        // get random block type
        let blockType = getRandomWeightedFreq(this.totalBlockFreq, this.blockTypes);

        blocks.push(
          {
            type : this.blockTypes[blockType[0]],
            name : `block${r}c${c}`,
            startX : startX,
            startY : startY,
            height : this.dimensions.blockHeight,
            width : this.dimensions.blockWidth,
            colors : colorPick
          }
        )
      }
    }

    return blocks;
  }
}

export { QuiltSettings }