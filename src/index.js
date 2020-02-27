let blocks;      // random block types in the quilt

import { sampleGenerator } from '../docs/sample.js';
import { shuffleArray, getTotalFreq, getRandomWeightedFreq } from '../src/util.js'

// initialize the Quilt SVG element
function initQuilt(quilt){
  let {name, spaceNameID, dimensions} = quilt 
  console.log(dimensions)
  let {rows, cols, blockHeight, blockWidth} = dimensions
  console.log(blockHeight, blockWidth)
  let quiltSpace = document.getElementById(spaceNameID)
  let quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  quiltSVG.setAttribute("height", blockHeight * rows)
  quiltSVG.setAttribute("width", blockWidth * cols)
  quiltSVG.setAttribute("viewbox", `0 0 ${blockHeight * rows} ${blockWidth * cols}`)
  quiltSVG.setAttribute("id", name)

  quiltSpace.appendChild(quiltSVG)
}

// render blocks
function renderBlocks(name, blocks){

  blocks.forEach((block, i) => {
    block.type.draw(name, `quilt ${i}`, block.startX, block.startY, block.height, block.width, block.colors)
  })
}

// generate values for weighting block and color frequencies
function generateFrequencyTotals(generator){
  let newQuiltGenerator = generator
  newQuiltGenerator.totalBlockFreq = getTotalFreq(generator.blockTypes)
  newQuiltGenerator.totalColorFreq = getTotalFreq(generator.colorPalette)
  return newQuiltGenerator
}

// generate random blocks based off of generator object
function generateBlocks(generator){
  let { rows, cols, blockWidth, blockHeight } = generator.dimensions
  let colors = generator.colorPalette
  let colorKeys = Object.keys(colors)
  let types = generator.blockTypes
  let totalBlockFreq = generator.totalBlockFreq

  let blocks = []

  // loop through rows and columns to generate quilt blocks
  for (let c  = 0; c < cols; c++){
    for (let r = 0; r < rows; r++){
      let startX = c * blockWidth  
      let startY = r * blockHeight

      // generate two color palette
      let colorPalette = shuffleArray(colorKeys).slice(0,2)
      colorPalette = colorPalette.map((color) => colors[color].fill)

      // get random block type
      let blockType = getRandomWeightedFreq(totalBlockFreq, types);

      blocks.push(
        {
          type : types[blockType],
          name : `blockr${r}c${c}`,
          startX : startX,
          startY : startY,
          height : blockHeight,
          width : blockWidth,
          colors : colorPalette
        }
      )
    }
  }

  return blocks;
}


const newQuilt = generateFrequencyTotals(sampleGenerator)
initQuilt(newQuilt)
blocks = generateBlocks(newQuilt)
renderBlocks("sampleQuilt", blocks)