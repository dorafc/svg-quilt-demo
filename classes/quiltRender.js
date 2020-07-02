/*-------
Functions to render quilt SVG
-------*/

// render blocks
const renderBlocks = (blocks, quiltID, debugging) => {
  let quiltSVG = document.getElementById(quiltID)
  blocks.forEach((block, i) => {
    const blockGroup = block.draw(block.colors, block.startX, block.startY, block.height, block.width, block.count, debugging)
    quiltSVG.appendChild(blockGroup)
  })
}

// initialize the Quilt SVG element
const insertQuiltSVG = (spaceName, quiltID, dimensions) => {

  let quiltSVG, quiltSpace

  quiltSpace = document.getElementById(spaceName)
  quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

  quiltSVG.setAttribute("height", dimensions.quiltHeight)
  quiltSVG.setAttribute("width", dimensions.quiltWidth)
  quiltSVG.setAttribute("viewbox", `0 0 ${dimensions.quiltHeight} ${dimensions.quiltWidth}`)
  quiltSVG.setAttribute("id", quiltID)

  quiltSpace.appendChild(quiltSVG)
}

export { insertQuiltSVG, renderBlocks }