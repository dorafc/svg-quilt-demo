/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { getTotalFreq, getRandomWeightedFreq } from '../src/util.js'
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

    // set up data for matching edges
    if (this.matchEdges){
      let edges = {}
      let blockQueue = []
      let renderedBlocks = new Set()

      // initialize edges
      for (let r  = 0; r < this.dimensions.rows; r++){
        for (let c = 0; c < this.dimensions.cols; c++){
          edges[`row${r}col${c}`] = new EdgePattern()
        }
      }

      // generate random start block
      const startRow = Math.floor(Math.random() * this.dimensions.rows)
      const startCol = Math.floor(Math.random() * this.dimensions.cols)

      //add to queue
      blockQueue.push({
        r : startRow,
        c : startCol,
        startX : startCol * this.dimensions.blockWidth,
        startY : startRow * this.dimensions.blockHeight
      })
      //add block to rendered set
      renderedBlocks.add(startRow + ', ' + startCol)

      // go through to push to blocks / generate pattern
      do {
        let currBlock = blockQueue.shift()

        // get edge colors
        let top = 0, right = 0, bottom = 0, left = 0
        if (currBlock.r - 1 >= 0){
          top = edges[`row${currBlock.r-1}col${currBlock.c}`].getBottomColor()
        }
        if (currBlock.c + 1 < this.dimensions.cols){
          right = edges[`row${currBlock.r}col${currBlock.c+1}`].getLeftColor()
        }
        if (currBlock.r + 1 < this.dimensions.rows){
          bottom = edges[`row${currBlock.r+1}col${currBlock.c}`].getTopColor()
        }
        if (currBlock.c - 1 >= 0){
          left = edges[`row${currBlock.r}col${currBlock.c-1}`].getRightColor()
        }
        let currEdge = new EdgePattern(top, right, bottom, left)
        currEdge.setEdgeColors([top, right, bottom, left])

        // generate two color palette
        let colorPick = this.colorPalette.selectObj(2, this.uniqueColor).map(color => color.fill)        

        // get random block type
        let blockType = this.blockTypes.selectObj(1, true)[0];

        // update edge map
        // edges[`row${currBlock.r}col${currBlock.c}`] = blockEdgePatterns[blockType.draw.name]
        // edges[`row${currBlock.r}col${currBlock.c}`].setEdgeColors(colorPick)

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
        if (currBlock.r - 1 >= 0 && !renderedBlocks.has(currBlock.r - 1 + ', ' + currBlock.c)){
          blockQueue.push({
            r : currBlock.r - 1,
            c : currBlock.c,
            startX : currBlock.startX,
            startY : currBlock.startY - this.dimensions.blockHeight
          })

          //add block to rendered set
          renderedBlocks.add(currBlock.r - 1 + ', ' + currBlock.c)
        }

        // block below
        if (currBlock.r + 1 < this.dimensions.rows && !renderedBlocks.has(currBlock.r + 1 + ', ' + currBlock.c)){
          blockQueue.push({
            r : currBlock.r + 1,
            c : currBlock.c,
            startX : currBlock.startX,
            startY : currBlock.startY + this.dimensions.blockHeight
          })

          //add block to rendered set
          renderedBlocks.add(currBlock.r + 1 + ', ' + currBlock.c)
        }

        // block right
        if (currBlock.c + 1 < this.dimensions.cols && !renderedBlocks.has(currBlock.r + ', ' + (currBlock.c + 1))){
          blockQueue.push({
            r : currBlock.r,
            c : currBlock.c+1,
            startX : currBlock.startX + this.dimensions.blockWidth,
            startY : currBlock.startY
          })

          //add block to rendered set
          renderedBlocks.add(currBlock.r + ', ' + (currBlock.c+1))
        }

        // block left
        if (currBlock.c - 1 >= 0 && !renderedBlocks.has(currBlock.r + ', ' + (currBlock.c - 1))){
          blockQueue.push({
            r : currBlock.r,
            c : currBlock.c-1,
            startX : currBlock.startX - this.dimensions.blockWidth,
            startY : currBlock.startY
          })

          //add block to rendered set
          renderedBlocks.add(currBlock.r + ', ' + (currBlock.c-1))
        }

      } while (blockQueue.length > 0)
    }

    // generate blocks without matching edges
    else {
      // loop through rows and columns to generate quilt blocks
      for (let r  = 0; r < this.dimensions.rows; r++){
        for (let c = 0; c < this.dimensions.cols; c++){
          let startX = c * this.dimensions.blockWidth  
          let startY = r * this.dimensions.blockHeight

          // generate two color palette
          let colorPick = this.colorPalette.selectObj(2, this.uniqueColor).map(color => color.fill)

          // get random block type
          let blockType = this.blockTypes.selectObj(1, true)[0];

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
    }

    return blocks;
  }
}

export { QuiltSettings }