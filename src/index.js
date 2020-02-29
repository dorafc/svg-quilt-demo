let blocks;      // random block types in the quilt

import { sampleGenerator } from '../docs/sample.js';
import { shuffleArray, getTotalFreq, getRandomWeightedFreq } from '../src/util.js'

// initialize the Quilt SVG element
function insertQuiltSVG(quilt){
  let {name, spaceNameID, dimensions} = quilt 
  // console.log(dimensions)
  let {rows, cols, blockHeight, blockWidth} = dimensions
  // console.log(blockHeight, blockWidth)
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
    block.type.draw(name, `quilt${i}`, block.startX, block.startY, block.height, block.width, block.colors)
  })
}

// generate values for weighting block and color frequencies
function generateFrequencyTotals(generator){
  // make sure we create a new generator object
  let newQuiltGenerator = generator
  newQuiltGenerator.totalBlockFreq = getTotalFreq(generator.blockTypes)
  newQuiltGenerator.totalColorFreq = getTotalFreq(generator.colorPalette)

  return newQuiltGenerator
}

// generate random blocks based off of generator object
function generateBlocks(generator){
  let { rows, cols, blockWidth, blockHeight } = generator.dimensions
  let colors = generator.colorPalette
  let totalColorFreq = generator.totalColorFreq
  let types = generator.blockTypes
  let totalBlockFreq = generator.totalBlockFreq
  // console.log(generator)

  let blocks = []

  // loop through rows and columns to generate quilt blocks
  for (let r  = 0; r < cols; r++){
    for (let c = 0; c < rows; c++){
      let startX = c * blockWidth  
      let startY = r * blockHeight

      // generate two color palette
      // let colorPalette = shuffleArray(colorKeys).slice(0,2)
      // colorPalette = colorPalette.map((color) => colors[color].fill)
      let colorPalette = getRandomWeightedFreq(totalColorFreq, colors, 2)

      // get random block type
      let blockType = getRandomWeightedFreq(totalBlockFreq, types);

      blocks.push(
        {
          type : types[blockType[0]],
          name : `block${r}c${c}`,
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
insertQuiltSVG(newQuilt)
blocks = generateBlocks(newQuilt)
renderBlocks("sampleQuilt", blocks)