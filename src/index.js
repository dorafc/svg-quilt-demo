const height = 100;   // height of block
const width = 100;    // width of block
const numRows = 3;    // number of rows in the quilt
const numCols = 3;    // number of columnss in the quilt

let blocks;      // random block types in the quilt

import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"
import { sampleQuilt, sampleGenerator } from '../docs/sample.js';
import { shuffleArray } from '../src/util.js'

// initialize the Quilt SVG element
function initQuilt(quiltID, quiltSpaceID){
  let quiltSpace = document.getElementById(quiltSpaceID)
  let quilt = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  quilt.setAttribute("height", height*numRows)
  quilt.setAttribute("width", width*numCols)
  quilt.setAttribute("viewbox", `0 0 ${height*numRows} ${width*numCols}`)
  quilt.setAttribute("id", quiltID)

  quiltSpace.appendChild(quilt)
}

// render blocks
function renderBlocks(name, blocks){

  blocks.forEach((block, i) => {
    block.type.draw(name, `quilt ${i}`, block.startX, block.startY, block.height, block.width, block.colors)
  })
}

// generate random blocks based off of generator object
function generateBlocks(generator){
  let name = generator.name
  let { rows, cols, blockWidth, blockHeight } = generator.dimensions
  let colors = Object.keys(generator.colorPalette)
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
      let colorPalette = shuffleArray(colors).slice(0,2)

      // get random block type
      let blockType = typeKeys[Math.floor(Math.random() * Math.floor(typeKeys.length))]

      blocks.push(
        {
          type : types[blockType],
          name : `blockr${r}c${c}`,
          startX : startX,
          startY : startY,
          height : height,
          width : width,
          colors : colorPalette
        }
      )
    }
  }

  // console.log(blocks)
  return blocks;
}



initQuilt(sampleQuilt.name, sampleQuilt.spaceName)
blocks = generateBlocks(sampleGenerator)
console.log(blocks)
renderBlocks("sampleQuilt", blocks)

initQuilt("quilt2", "quiltSpace2")
drawSolid("quilt2", "solid", 0, 0, height, width, ["hotpink"])
drawDownTriangle("quilt2", "triangle1", 100, 0, height, width/2, ["green", "hotpink"])
drawUpTriangle("quilt2", "triangle2", 150, 0, height, width/2, ["green", "hotpink"])
drawSolid("quilt2", "solid2", 200, 0, height, width, ["hotpink"])

drawDownTriangle("quilt2", "triangle3", 0, 100, height/2, width, ["hotpink", "green"])
drawUpTriangle("quilt2", "triangle4", 0, 150, height/2, width, ["green", "hotpink"])
drawSolid("quilt2", "solid3", 100, 100, height, width, ["hotpink"])
drawUpTriangle("quilt2", "triangle5", 200, 100, height/2, width, ["hotpink", "green"])
drawDownTriangle("quilt2", "triangle6", 200, 150, height/2, width, ["green", "hotpink"])

drawSolid("quilt2", "solid", 0, 200, height, width, ["hotpink"])
drawUpTriangle("quilt2", "triangle1", 100, 200, height, width/2, ["hotpink", "green"])
drawDownTriangle("quilt2", "triangle2", 150, 200, height, width/2, ["hotpink", "green"])
drawSolid("quilt2", "solid2", 200, 200, height, width, ["hotpink"])