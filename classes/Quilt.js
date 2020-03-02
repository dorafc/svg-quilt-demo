/*-------
Quilt object contains information about a quilt to render
-------*/

class Quilt{
  // constructor
  constructor(quiltSettings){
    this.quiltID = quiltSettings.quiltID;                   // unique identifier for the quilt
    this.spaceName = quiltSettings.spaceName;               // id of the element to append the quilt SVG
    this.dimensions = quiltSettings.dimensions;             // dimensions of the quilt
    this.colorPalette = quiltSettings.colorPalette;         // color palette for the quilt to render
    this.blockTypes = quiltSettings.blockTypes              // block types for the quilt

    this.blocks = quiltSettings.generateBlocks()
  }

  // render blocks
  renderBlocks(){
    this.insertQuiltSVG()

    this.blocks.forEach((block, i) => {
      block.type.draw(this.quiltID, `quilt${i}`, block.startX, block.startY, block.height, block.width, block.colors)
    })
  }

  // initialize the Quilt SVG element
  insertQuiltSVG(){
    let quiltSpace = document.getElementById(this.spaceName)
    let quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

    quiltSVG.setAttribute("height", this.dimensions.quiltHeight)
    quiltSVG.setAttribute("width", this.dimensions.quiltWidth)
    quiltSVG.setAttribute("viewbox", `0 0 ${this.dimensions.quiltHeight} ${this.dimensions.quiltWidth}`)
    quiltSVG.setAttribute("id", this.quiltID)

    quiltSpace.appendChild(quiltSVG)
  }
}



export { Quilt }