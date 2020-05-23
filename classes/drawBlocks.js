
/**
 * Function that handles drawing triangle quilt blocks
 * @param {array} edges       array of edges
 * @param {int} startX        start X coord
 * @param {int} startY        start Y coord
 * @param {int} height        block height dimension
 * @param {int} width         block width dimension
 * @param {string} quiltID    ID of the quilt in the HTML
 */
let drawBlock = (edges, startX, startY, height, width) => {
  // get quilt DOM element and create block
  // const quilt = document.getElementById(quiltID)
  let block = document.createElementNS("http://www.w3.org/2000/svg", "g")

  // generate corner coordinates
  let coords = [{x : startX, y : startY}, 
                {x : startX+width, y : startY}, 
                {x : startX+width, y : startY+height}, 
                {x : startX, y : startY+height}]

  let center = {x : startX + width/2, y : startY + height/2}
  
  // check for number of colors
  let colors = new Set(edges)

  // determine if 2-3 colors edges need to be rotated
  if ((colors.size === 2 || colors.size === 3) && edges[0] === edges [3]){
    let edge = edges.shift()
    edges.push(edge)

    let coord = coords.shift()
    coords.push(coord)
  }

  // draw edges
  let currPath
  let currDraw
  let lineCount = 0
  let paths = []

  for (let i = 0; i < 4; i++){
    if (!currPath){
      // init current path
      currPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
      currPath.setAttribute("id", `path${paths.length}`)
      currPath.setAttribute("fill", edges[i])

      // init current draw
      currDraw = `M${coords[i].x} ${coords[i].y}`
    }

    // draw new line
    currDraw += ` L${coords[(i+1) % 4].x} ${coords[(i+1) % 4].y}`
    lineCount++

    // check for creating a new path
    if (edges[i] !== edges[i+1] || (colors.size > 1 && lineCount === 2)){
      // check to see if need to draw line to center
      (lineCount === 1) ? currDraw += ` L${center.x} ${center.y}` : ""
      currDraw += 'Z'
      currPath.setAttribute("d", currDraw)
      paths.push(currPath)
      currPath = null
      currDraw = ""
      lineCount = 0
    }
  }

  paths.forEach(path => {
    block.appendChild(path)
  })

  return block

  // complete edges
}

// create a solid color block
let drawSolid = (quiltID, idName, startX, startY, height, width, colors) => {
  return drawBlock([colors[0], colors[0], colors[0], colors[0]], startX, startY, height, width)
}

// create a triangle quilt block with diagonal line going down from orgin
let drawDownTriangle = (quiltID, idName, startX, startY, height, width, colors) => {
  return drawBlock([colors[0], colors[0], colors[1], colors[1]], startX, startY, height, width)
}

// create a triangle quilt block with diagonal line going up from orgin
let drawUpTriangle = (quiltID, idName, startX, startY, height, width, colors) => {
  // if (colors[0] === colors[1]){
  //   triangleOpacity(trianglePath1, trianglePath2)
  // }
  return drawBlock([colors[0], colors[1], colors[1], colors[0]], startX, startY, height, width)
}

let drawHourglass =  (quiltID, idName, startX, startY, height, width, colors) => {
  return drawBlock([colors[0], colors[1], colors[0], colors[1]], startX, startY, height, width)
}

export { drawBlock, drawSolid, drawDownTriangle, drawUpTriangle, drawHourglass }