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
    let colorPick
    let blockType, blockEdges

    // order that the blocks are generateds
    count++;

    // get edges as iterable object
    let edges = Object.entries(blockQueue.getEdges(currBlock.r, currBlock.c))
    let edgeColors = edges.map(edge => edge[1])

    // store new edges
    let newEdges = {}

    // store edge colors
    let colors

    if (matchEdges){

      // pick a valid block
      do {
        // TO DO: add a check to stop if all blocktypes have been tried
        blockType = blockTypes.selectObj(1, true)[0].draw.name
        blockEdges = blockColors[blockType]
      } while (!checkMatch(edgeColors, blockEdges))
      
      // pick valid colors for 0,1 edges
      colors = getColorSet(edgeColors, blockEdges, colorPalette)

      // set edge colors
      newEdges.top = colors[blockEdges[0]]
      newEdges.right = colors[blockEdges[1]]
      newEdges.bottom = colors[blockEdges[2]]
      newEdges.left = colors[blockEdges[3]]

    } else {
      // get random block type
      blockType = blockTypes.selectObj(1, true)[0].draw.name;
      blockEdges = blockColors[blockType]

      // generate two color palette
      colorPick = colorPalette.selectObj(2, true).map(color => color.fill)   
      
      // update colors
      colors = blockEdges.map(x => colorPick[x])
    
      newEdges.top = colors[0]
      newEdges.right = colors[1]
      newEdges.bottom = colors[2]
      newEdges.left = colors[3]
    }

    // update blockQueue
    blockQueue.setEdges(currBlock.r, currBlock.c, newEdges)
    blocks.push( new BlockRender(drawBlock,
      `block${currBlock.r}c${currBlock.c}`,
      currBlock.startX,
      currBlock.startY,
      dimensions.blockHeight,
      dimensions.blockWidth,
      [newEdges.top, newEdges.right, newEdges.bottom, newEdges.left],
      count
    ))

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