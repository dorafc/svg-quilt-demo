let blocks;      // random block types in the quilt

import { sampleGenerator } from '../docs/sample.js';
import { shuffleArray } from '../src/util.js'

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

// generate random blocks based off of generator object
function generateBlocks(generator){
  // let name = generator.name
  let { rows, cols, blockWidth, blockHeight } = generator.dimensions
  let colors = generator.colorPalette
  let colorKeys = Object.keys(colors)
  let types = generator.blockTypes
  let typeKeys = Object.keys(generator.blockTypes)

  let blocks = []

  // loop through rows and columns to generate quilt blocks
  for (let c  = 0; c < cols; c++){
    for (let r = 0; r < rows; r++){
      // name, startX, startY, height, width, draw function, color pallette
      let startX = c * blockWidth  
      let startY = r * blockHeight

      // generate two color palette
      let colorPalette = shuffleArray(colorKeys).slice(0,2)
      colorPalette = colorPalette.map((color) => colors[color].fill)

      // get random block type
      let blockType = typeKeys[Math.floor(Math.random() * Math.floor(typeKeys.length))]

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

  // console.log(blocks)
  return blocks;
}



initQuilt(sampleGenerator)
blocks = generateBlocks(sampleGenerator)
renderBlocks("sampleQuilt", blocks)