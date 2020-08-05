/*-------
Functions to render quilt SVG
-------*/

// render blocks
const renderBlocks = (blocks, quiltID, debugging, showSeam, dimensions, animDelay) => {
  blocks.forEach((block, i) => {
    renderBlocksFunc(block,
      quiltID, 
      0,
      0,
      debugging, 
      showSeam,  
      dimensions.blockWidth, 
      dimensions.blockHeight,
      1,
      animDelay * i)
  })

  
}

const renderBlocksFunc = (blocks, quiltID, offsetX, offsetY, debugging, showSeam, width, height, recurseDivision, animDelay) => {
  let quiltSVG = document.getElementById(quiltID)
  if (blocks.length === 1){
    const block = blocks[0]
    const blockGroup = block.draw(block.colors, 
      block.col * width + offsetX, 
      block.row * height + offsetY, 
      height / recurseDivision, 
      width / recurseDivision, 
      block.count, 
      debugging, 
      showSeam,
      animDelay)

    quiltSVG.appendChild(blockGroup)
  } else {
    blocks.forEach((block, i) => {
      let division = recurseDivision * 2
      let newOffsetX = (i === 1 || i === 3) ? offsetX + (width / division) : offsetX
      let newOffsetY = (i === 2 || i === 3) ? offsetY + (height / division) : offsetY
      renderBlocksFunc(block, 
        quiltID,
        newOffsetX,
        newOffsetY, 
        debugging, 
        showSeam,  
        width, 
        height,
        division,
        animDelay)
    })
  }
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