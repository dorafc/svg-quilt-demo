/*-------
Functions to generate blocks types
-------*/

import { BlockRender } from '../classes/BlockRender.js';
import { SetBlockMap } from '../classes/SetBlockMap.js'
import { drawBlock } from "./drawBlocks.js"

const blockColors = {
  drawSolid : [0, 0, 0, 0],
  drawDownTriangle : [0, 0, 1, 1],
  drawUpTriangle : [0, 1, 1, 0],
  drawHourglass : [0, 1, 0, 1]
}

// generate random blocks based off of generator object
const generateBlocks = (dimensions, matchEdges, blockTypes, colorPalette, recursiveBlock) => {
  let count = 0
  let blocks = []                   // blocks to be returned for rendering
  let blockQueue = new SetBlockMap(dimensions.rows, dimensions.cols)

  // generate random start block
  const startRow = Math.floor(Math.random() * dimensions.rows)
  const startCol = Math.floor(Math.random() * dimensions.cols)

  blockQueue.addGenerateQueue(startRow, 
    startCol, 
    startCol * dimensions.blockWidth, 
    startRow * dimensions.blockHeight)

  // go through to push to blocks / generate pattern
  do {
    let currBlock = blockQueue.getNextBlock()

    // order that the blocks are generateds
    count++;

    if (matchEdges){
      // store new edges
      let newEdges = {}
      let block

      // geneerate block and new edges
      [block, newEdges] = pickMatchBlock(
        blockQueue, 
        blockTypes, 
        colorPalette,
        currBlock.startX, 
        currBlock.startY, 
        currBlock.r, 
        currBlock.c, 
        dimensions.blockHeight,
        dimensions.blockWidth, 
        count)

      // add blocks to render queue
      blocks.push(block)

      // update blockQueue
      blockQueue.setEdges(currBlock.r, currBlock.c, newEdges)

    } else {
      let blockList = pickBlock(recursiveBlock,
        0, 
        blockTypes, 
        colorPalette, 
        currBlock.startX, 
        currBlock.startY, 
        currBlock.r, 
        currBlock.c,
        dimensions.blockHeight, 
        dimensions.blockWidth, 
        count)

      // add block to render queue
      blockList.forEach((block) => {
        blocks.push(block)
      })
    }

    // add neighbors to queue, update edge pattern
    // block above
    if (currBlock.r - 1 >= 0){
      blockQueue.addGenerateQueue( currBlock.r-1, 
        currBlock.c, 
        currBlock.startX, 
        currBlock.startY - dimensions.blockHeight)
    }

    // block below
    if (currBlock.r + 1 < dimensions.rows){
      blockQueue.addGenerateQueue( currBlock.r+1, 
        currBlock.c, 
        currBlock.startX, 
        currBlock.startY + dimensions.blockHeight)
    }

    // block right
    if (currBlock.c + 1 < dimensions.cols){
      blockQueue.addGenerateQueue( currBlock.r, 
        currBlock.c+1, 
        currBlock.startX + dimensions.blockWidth, 
        currBlock.startY)
    }

    // block left
    if (currBlock.c - 1 >= 0){
      blockQueue.addGenerateQueue( currBlock.r, 
        currBlock.c-1, 
        currBlock.startX - dimensions.blockWidth, 
        currBlock.startY)
    }

  } while (blockQueue.hasNextBlock())
  return blocks;
}

// function to pick a block for matching edges
const pickMatchBlock = (blockQueue, blockTypes, colorPalette, startX, startY, r, c, height, width, count) => {
  let block, blockType, blockEdges, colors
  // store new edges
  let newEdges = {}

  //number of of valid blocks
  const validBlockCount = blockTypes.list.filter(type => type.weight != 0).length

  // get edges that the new block needs to map too
  let edges = Object.entries(blockQueue.getEdges(r, c))
  let edgeColors = edges.map(edge => edge[1])

  // pick a valid block
  let checkedBlocks = new Set()
  let noMatches = false
  do {
    noMatches = checkedBlocks.size === validBlockCount
    blockType = blockTypes.selectObj(1, true)[0].draw.name
    blockEdges = blockColors[blockType]
    checkedBlocks.add(blockType)
  } while (!checkMatch(edgeColors, blockEdges) && !noMatches)

  // if no blocks match...
  if (noMatches){
    blockType = ""
    blockEdges = [0,1,2,3]
  }
  
  // pick valid colors for 0,1 edges
  colors = getColorSet(edgeColors, blockEdges, colorPalette)
  console.log(colors, blockEdges)

  // set edge colors
  newEdges.top = colors[blockEdges[0]]
  newEdges.right = colors[blockEdges[1]]
  newEdges.bottom = colors[blockEdges[2]]
  newEdges.left = colors[blockEdges[3]]

  block = new BlockRender(drawBlock,
    `block${r}c${c}`,
    startX,
    startY,
    height,
    width,
    [newEdges.top, newEdges.right, newEdges.bottom, newEdges.left],
    count
  )

  return [block, newEdges]
}

// function to pick a block unmatched edges
const pickBlock = (recursiveBlock, recurseLevel, blockTypes, colorPalette, startX, startY, r, c, height, width, count) =>{
  let blockType, blockEdges, colorPick, colors

  // check if the block is recursive
  let decay = Math.pow(recursiveBlock.decay, recurseLevel)
  let validSize = height > recursiveBlock.minSize && width > recursiveBlock.minSize
  let recurseBlock = (Math.random() < (recursiveBlock.frequency * decay) 
                      && recurseLevel < recursiveBlock.levels
                      && validSize)
  let blockList = []

  // call function again for recursive block
  if (recurseBlock){
    let nextLevel = recurseLevel + 1
    let halfHeight = height / 2
    let halfWidth = width / 2

    for (let h = 0; h < height; h+=halfHeight){
      for (let w = 0; w < width; w+=halfWidth){
        blockList.push(
          pickBlock(recursiveBlock,
            nextLevel, 
            blockTypes, 
            colorPalette, 
            startX+w, 
            startY+h, 
            r, 
            c,
            halfHeight, 
            halfWidth, 
            count)
        )
      }
    }

  // pick a block
  } else {
    // get random block type
    blockType = blockTypes.selectObj(1, true)[0].draw.name;
    blockEdges = blockColors[blockType]

    // generate two color palette
    colorPick = colorPalette.selectObj(2, true).map(color => color.fill)   
    
    // update colors
    colors = blockEdges.map(x => colorPick[x])

    blockList.push(new BlockRender(drawBlock,
      `block${r}c${c}`,
      startX,
      startY,
      height,
      width,
      colors,
      count))
  }

  return blockList.flat()
}

// function to find valid edge colors
const getColorSet = (edges, pattern, colorPalette) => {
  let colorPick
  let colorSet = []
  // get set of color patterns in pattern
  const colorPatterns = new Set(pattern)

  // loop through all color patterns in set
  colorPatterns.forEach((colPattern, iColPatt) => {
    let indexOfColPattern = []

    // get indexes of instances of the color pattern
    pattern.forEach((pat, i) => {
      if (pat === colPattern){
        indexOfColPattern.push(i)
      }
    })

    // get list of colors that match the edge pattern
    let colorsFromPatternEddges = new Set()
    indexOfColPattern.forEach(colIndex => {
      colorsFromPatternEddges.add(edges[colIndex])
    })
    

    // if the colors from pattern edges has a defined color, set the color
    let colorsFromEdgesArray = Array.from(colorsFromPatternEddges.values())
    colorSet[iColPatt] = colorsFromEdgesArray.find(col => col !== undefined) || -1

    // pick for everything in colorSet currently set to -1
    colorSet.forEach((col, i) => {
      if (col === -1){
        // pick a color not already in colorSet
        do {
          colorPick = colorPalette.selectObj(1, true).map(color => color.fill)[0]
        } while (colorSet.includes(colorPick))
        colorSet[i] = colorPick
      }
    })
  })

  // pick colors for any values of -1 in colorSet
  return colorSet;
}

// function to check if the block pattern is valid
const checkMatch = (colors, pattern) => {
  let isValid = true
  let colorSets = new Set()

  // determine how many colors are in the pattern
  let toCheck = new Set(pattern)

  // loop through all pattern options, generate a set of predetermined colors that need to match
  toCheck.forEach(check => {
    let cols = []
    pattern.forEach((edge, i) => {
     if (edge === check){
      cols.push(colors[i])
     }
     colorSets.add(cols.filter(col => col != null))
    })          
  })

  // check if block matches all patterns
  colorSets.forEach( cols => {

    if (cols.length > 1){
      isValid = cols.every(col => col === cols[0])
    }
  })

  return isValid
}

export { generateBlocks }