/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { BlockRender } from './BlockRender.js';
import { SetBlockMap } from './SetBlockMap.js'
 
class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes, uniqueColor, matchEdges){
    this.quiltID = quiltID;                   // unique identifier for the quilt
    this.spaceName = spaceNameID;             // id of the element to append the quilt SVG
    this.dimensions = dimensions;             // dimensions of the quilt
    this.colorPalette = colorPalette;         // color palette for the quilt to render
    this.blockTypes = blockTypes              // block types for the quilt
    this.matchEdges = matchEdges              // generate blocks to match edges of neighboring blocks
  }
  
  // generate random blocks based off of generator object
  generateBlocks(){

    /* 
    * IDEALLY THIS WILL GO AWAY
    */
    const mapBlockEdges = (block, colors) => {
      let edges = {top: 0, right: 0, bottom: 0, left: 0}
      
      block === 'drawSolid' ? edges = {top: colors[0], right: colors[0], bottom: colors[0], left: colors[0]} : ""
      block === 'drawDownTriangle' ? edges = {top: colors[0], right: colors[0], bottom: colors[1], left: colors[1]} : ""
      block === 'drawUpTriangle' ? edges = {top: colors[0], right: colors[1], bottom: colors[1], left: colors[0]} : ""
      block === 'drawHourglass' ? edges = {top: colors[0], right: colors[1], bottom: colors[0], left: colors[1]} : ""

      return edges
    }
    /*
    * END GOING AWAY
    */


    let blocks = []                   // blocks to be returned for rendering
    let blockQueue = new SetBlockMap(this.dimensions.rows, this.dimensions.cols)

    // generate random start block
    const startRow = Math.floor(Math.random() * this.dimensions.rows)
    const startCol = Math.floor(Math.random() * this.dimensions.cols)

    blockQueue.addGenerateQueue(startRow, 
      startCol, 
      startCol * this.dimensions.blockWidth, 
      startRow * this.dimensions.blockHeight)

    // go through to push to blocks / generate pattern
    do {
      let currBlock = blockQueue.getNextBlock()
      console.log(blockQueue.getEdges(currBlock.r, currBlock.c))

      // generate two color palette
      let colorPick = this.colorPalette.selectObj(2, true).map(color => color.fill)        

      // get random block type
      
      let blockType = this.blockTypes.selectObj(1, true)[0];
      blockQueue.setEdges(currBlock.r, currBlock.c, mapBlockEdges(blockType.draw.name, colorPick))

      blocks.push( new BlockRender(blockType.draw,
        `block${currBlock.r}c${currBlock.c}`,
        currBlock.startX,
        currBlock.startY,
        this.dimensions.blockHeight,
        this.dimensions.blockWidth,
        colorPick
        )
      )

      // add neighbors to queue, update edge pattern
      // block above
      if (currBlock.r - 1 >= 0){
        blockQueue.addGenerateQueue( currBlock.r-1, 
          currBlock.c, 
          currBlock.startX, 
          currBlock.startY - this.dimensions.blockHeight)
      }

      // block below
      if (currBlock.r + 1 < this.dimensions.rows){
        blockQueue.addGenerateQueue( currBlock.r+1, 
          currBlock.c, 
          currBlock.startX, 
          currBlock.startY + this.dimensions.blockHeight)
      }

      // block right
      if (currBlock.c + 1 < this.dimensions.cols){
        blockQueue.addGenerateQueue( currBlock.r, 
          currBlock.c+1, 
          currBlock.startX + this.dimensions.blockWidth, 
          currBlock.startY)
      }

      // block left
      if (currBlock.c - 1 >= 0){
        blockQueue.addGenerateQueue( currBlock.r, 
          currBlock.c-1, 
          currBlock.startX - this.dimensions.blockWidth, 
          currBlock.startY)
      }

    } while (blockQueue.hasNextBlock())
    return blocks;
  }
}

export { QuiltSettings }