/*-------
Quilt object contains information about a quilt to render
-------*/

import { drawBlock } from "../classes/drawBlocks.js"

class Quilt{
  // constructor
  constructor(quiltSettings){
    this.quiltID = quiltSettings.quiltID;                   // unique identifier for the quilt
    this.spaceName = quiltSettings.spaceName;               // id of the element to append the quilt SVG
    this.dimensions = quiltSettings.dimensions;             // dimensions of the quilt
    this.colorPalette = quiltSettings.colorPalette;         // color palette for the quilt to render
    this.blockTypes = quiltSettings.blockTypes              // block types for the quilt
    this.matchEdges = quiltSettings.matchEdges
    this.debugging = quiltSettings.debugging

    this.blocks = quiltSettings.generateBlocks()
  }

  // render blocks
  renderBlocks(){
    this.insertQuiltSVG()

    this.blocks.forEach((block, i) => {
      const blockGroup = block.draw(block.colors, block.startX, block.startY, block.height, block.width, block.count, this.debugging)
      this.quiltSVG.appendChild(blockGroup)
    })
  }

  // initialize the Quilt SVG element
  insertQuiltSVG(){
    this.quiltSpace = document.getElementById(this.spaceName)
    this.quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

    this.quiltSVG.setAttribute("height", this.dimensions.quiltHeight)
    this.quiltSVG.setAttribute("width", this.dimensions.quiltWidth)
    this.quiltSVG.setAttribute("viewbox", `0 0 ${this.dimensions.quiltHeight} ${this.dimensions.quiltWidth}`)
    this.quiltSVG.setAttribute("id", this.quiltID)

    this.quiltSpace.appendChild(this.quiltSVG)
  }
}



export { Quilt }