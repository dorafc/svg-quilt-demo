/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { BlockRender } from './BlockRender.js';
import { SetBlockMap } from './SetBlockMap.js'
import { drawBlock } from './drawBlocks.js'
 
class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes, matchEdges){
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
      let colorPick
      let blockType
    
      const blockColors = {
        drawSolid : [0, 0, 0, 0],
        drawDownTriangle : [0, 0, 1, 1],
        drawUpTriangle : [0, 1, 1, 0],
        drawHourglass : [0, 1, 0, 1]
      }

      if (this.matchEdges){
        // get edges as iterable object
        let edges = Object.entries(blockQueue.getEdges(currBlock.r, currBlock.c))

        // generate two color palette
        colorPick = this.colorPalette.selectObj(2, true).map(color => color.fill)

        // assume that the currently picked block is valid, update if not
        let validBlock = true;

        // get index of first defined color
        let shiftArray = edges.findIndex(edge => edge[1] !== null)
        if (shiftArray === -1) {shiftArray = 0}
        // console.log(shiftArray)

        // store new edges
        let newEdges = {}

        let currColor = null
        console.log("NEW BLOCK")

        do {
          // pick a block
          blockType = this.blockTypes.selectObj(1, true)[0].draw.name;

          // get the block rotation pattern
          let rotation = blockColors[blockType]
          // console.log(blockType, rotation)

          // go through all edges
          for (let i = shiftArray; i < 4 + shiftArray; i++){
            // 0 is edge, 1 is color
            let col = edges[i % 4][1]
            let edge = edges[i % 4][0]
            console.log(blockType, edge, col, colorPick, currColor)
            
            // no initial colors in the edge (is first block)
            if (col === null && currColor === null){
              currColor = colorPick[Math.round(Math.random())]
            } 
            // set new color from edges
            else if (currColor === null && col !== null){
              currColor = col
            } 
            else if (currColor !== null && col !== null && currColor !== col){
              console.log("nope")
              // validBlock = false;
            }

            // update Edge
            newEdges[edge] = currColor

            // switch for next color?
            // console.log(rotation[i % 4], rotation[(i + 1) % 4])
            if (rotation[i % 4] !== rotation[(i + 1) % 4]){
              currColor = null
            }

            // console.log(blockType, [newEdges.top, newEdges.right, newEdges.bottom, newEdges.left])
          }

          blockQueue.setEdges(currBlock.r, currBlock.c, newEdges)

          blocks.push( new BlockRender(drawBlock,
            `block${currBlock.r}c${currBlock.c}`,
            currBlock.startX,
            currBlock.startY,
            this.dimensions.blockHeight,
            this.dimensions.blockWidth,
            [newEdges.top, newEdges.right, newEdges.bottom, newEdges.left]
          ))
        } while (!validBlock)
        
      } else {
        // generate two color palette
        colorPick = this.colorPalette.selectObj(2, true).map(color => color.fill)        

        // get random block type
        
        blockType = this.blockTypes.selectObj(1, true)[0];
        // blockQueue.setEdges(currBlock.r, currBlock.c, mapBlockEdges(blockType.draw.name, colorPick))

        blocks.push( new BlockRender(blockType.draw,
          `block${currBlock.r}c${currBlock.c}`,
          currBlock.startX,
          currBlock.startY,
          this.dimensions.blockHeight,
          this.dimensions.blockWidth,
          colorPick
          )
        )
      }

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