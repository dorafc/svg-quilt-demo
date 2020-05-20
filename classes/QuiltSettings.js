/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { getTotalFreq, getRandomWeightedFreq } from '../src/util.js'
import { blockEdgePatterns } from '../src/drawBlocks.js'
import { BlockRender } from './BlockRender.js';
import { EdgePattern } from './EdgePattern.js';

class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes, uniqueColor, matchEdges){
    this.quiltID = quiltID;                   // unique identifier for the quilt
    this.spaceName = spaceNameID;             // id of the element to append the quilt SVG
    this.dimensions = dimensions;             // dimensions of the quilt
    this.colorPalette = colorPalette;         // color palette for the quilt to render
    this.blockTypes = blockTypes              // block types for the quilt
    this.uniqueColor = uniqueColor            // toggle for quilt blocks to include patches of the same color
    this.matchEdges = matchEdges              // generate blocks to match edges of neighboring blocks
  }
  
  // generate random blocks based off of generator object
  generateBlocks(){
    let blocks = []
    let edges = {}

    // set up data for matching edges
    if (this.matchEdges){
      console.log("edge match time!")
      for (let r  = 0; r < this.dimensions.rows; r++){
        for (let c = 0; c < this.dimensions.cols; c++){
          edges[`row${r}col${c}`] = new EdgePattern()
        }
      }
      console.log(edges)
    }


    // loop through rows and columns to generate quilt blocks
    for (let r  = 0; r < this.dimensions.rows; r++){
      for (let c = 0; c < this.dimensions.cols; c++){
        let startX = c * this.dimensions.blockWidth  
        let startY = r * this.dimensions.blockHeight

        // generate two color palette
        let colorPick = this.colorPalette.selectObj(2, this.uniqueColor).map(color => color.fill)

        // get random block type
        let blockType = this.blockTypes.selectObj(1, true)[0];
        // console.log(blockEdgePatterns[blockType.draw.name])
        blocks.push( new BlockRender(blockType.draw,
                                     `block${r}c${c}`,
                                     startX,
                                     startY,
                                     this.dimensions.blockHeight,
                                     this.dimensions.blockWidth,
                                     colorPick
                                    )
        )
      }
    }

    return blocks;
  }
}

export { QuiltSettings }