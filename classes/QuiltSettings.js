/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { BlockRender } from './BlockRender.js';

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
    let blocks = []                   // blocks to be returned for rendering
    let blockQueue = []               // queue of blocks to be generated
    let setBlocks = new Set()    // blocks already generated

    // generate random start block
    const startRow = Math.floor(Math.random() * this.dimensions.rows)
    const startCol = Math.floor(Math.random() * this.dimensions.cols)

    //add the dimensions to the generation queue
    blockQueue.push({
      r : startRow,
      c : startCol,
      startX : startCol * this.dimensions.blockWidth,
      startY : startRow * this.dimensions.blockHeight
    })
    //add block to rendered set
    setBlocks.add(startRow + ', ' + startCol)

    // go through to push to blocks / generate pattern
    do {
      let currBlock = blockQueue.shift()

      // generate two color palette
      let colorPick = this.colorPalette.selectObj(2, true).map(color => color.fill)        

      // get random block type
      let blockType = this.blockTypes.selectObj(1, true)[0];

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
      if (currBlock.r - 1 >= 0 && !setBlocks.has(currBlock.r - 1 + ', ' + currBlock.c)){
        blockQueue.push({
          r : currBlock.r - 1,
          c : currBlock.c,
          startX : currBlock.startX,
          startY : currBlock.startY - this.dimensions.blockHeight
        })

        //add block to rendered set
        setBlocks.add(currBlock.r - 1 + ', ' + currBlock.c)
      }

      // block below
      if (currBlock.r + 1 < this.dimensions.rows && !setBlocks.has(currBlock.r + 1 + ', ' + currBlock.c)){
        blockQueue.push({
          r : currBlock.r + 1,
          c : currBlock.c,
          startX : currBlock.startX,
          startY : currBlock.startY + this.dimensions.blockHeight
        })

        //add block to rendered set
        setBlocks.add(currBlock.r + 1 + ', ' + currBlock.c)
      }

      // block right
      if (currBlock.c + 1 < this.dimensions.cols && !setBlocks.has(currBlock.r + ', ' + (currBlock.c + 1))){
        blockQueue.push({
          r : currBlock.r,
          c : currBlock.c+1,
          startX : currBlock.startX + this.dimensions.blockWidth,
          startY : currBlock.startY
        })

        //add block to rendered set
        setBlocks.add(currBlock.r + ', ' + (currBlock.c+1))
      }

      // block left
      if (currBlock.c - 1 >= 0 && !setBlocks.has(currBlock.r + ', ' + (currBlock.c - 1))){
        blockQueue.push({
          r : currBlock.r,
          c : currBlock.c-1,
          startX : currBlock.startX - this.dimensions.blockWidth,
          startY : currBlock.startY
        })

        //add block to rendered set
        setBlocks.add(currBlock.r + ', ' + (currBlock.c-1))
      }

    } while (blockQueue.length > 0)
    return blocks;
  }
}

export { QuiltSettings }