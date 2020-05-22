import { EdgePattern } from "./EdgePattern.js"


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
    console.log(lineCount)

    // check for creating a new path
    if (edges[i] !== edges[i+1]){
      // check to see if need to draw line to center
      (lineCount === 1) ? currDraw += ` L${center.x} ${center.y}` : ""
      currDraw += 'Z'
      currPath.setAttribute("d", currDraw)
      console.log(currPath)
      paths.push(currPath)
      currPath = null;
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
  let quilt = document.getElementById(quiltID)
  let solidBlock = document.createElementNS("http://www.w3.org/2000/svg", "g")
  let solidPath = document.createElementNS("http://www.w3.org/2000/svg", "path")

  solidBlock.setAttribute("id", idName)
  solidPath.setAttribute("fill", colors[0])
  solidPath.setAttribute("d", `M${startX} ${startY} l0 ${height} l${width} 0 l0 ${-height}Z`)

  solidBlock.appendChild(solidPath)
  quilt.appendChild(solidBlock)
}

// create a triangle quilt block with diagonal line going down from orgin
let drawDownTriangle = (quiltID, idName, startX, startY, height, width, colors) => {
  let quilt = document.getElementById(quiltID)
  let triangleBlock = document.createElementNS("http://www.w3.org/2000/svg", "g")
  let trianglePath1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  let trianglePath2 = document.createElementNS("http://www.w3.org/2000/svg", "path")

  triangleBlock.setAttribute("id", idName)
  trianglePath1.setAttribute("fill", colors[0])
  trianglePath1.setAttribute("d", `M${startX} ${startY} l${width} 0 l0 ${height} Z`)
  trianglePath2.setAttribute("fill", colors[1])
  trianglePath2.setAttribute("d", `M${startX} ${startY} l0 ${height} l${width} 0 Z`)
  
  if (colors[0] === colors[1]){
    triangleOpacity(trianglePath1, trianglePath2)
  }

  triangleBlock.appendChild(trianglePath1)
  triangleBlock.appendChild(trianglePath2)
  quilt.appendChild(triangleBlock)
}

// create a triangle quilt block with diagonal line going up from orgin
let drawUpTriangle = (quiltID, idName, startX, startY, height, width, colors) => {
  let quilt = document.getElementById(quiltID)
  let triangleBlock = document.createElementNS("http://www.w3.org/2000/svg", "g")
  let trianglePath1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  let trianglePath2 = document.createElementNS("http://www.w3.org/2000/svg", "path")

  triangleBlock.setAttribute("id", idName)
  trianglePath1.setAttribute("fill", colors[0])
  trianglePath1.setAttribute("d", `M${startX} ${startY+height} l0 ${-height} l${width} 0 Z`)
  trianglePath2.setAttribute("fill", colors[1])
  trianglePath2.setAttribute("d", `M${startX} ${startY+height} l${width} 0 l0 ${-height} Z`)
  
  if (colors[0] === colors[1]){
    triangleOpacity(trianglePath1, trianglePath2)
  }

  triangleBlock.appendChild(trianglePath1)
  triangleBlock.appendChild(trianglePath2)
  quilt.appendChild(triangleBlock)
}

// create a quilt block with a vertical seam
let drawVertical = (quiltID, idName, startX, startY, height, width, colors) => {
  let quilt = document.getElementById(quiltID)
  let verticalBlock = document.createElementNS("http://www.w3.org/2000/svg", "g")
  let verticalPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  let verticalPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path")

  verticalBlock.setAttribute("id", idName)
  verticalPath1.setAttribute("fill", colors[0])
  verticalPath1.setAttribute("d", `M${startX} ${startY} l0 ${height} l${width/2} 0 l0 ${-height} Z`)
  verticalPath2.setAttribute("fill", colors[1])
  verticalPath2.setAttribute("d", `M${startX+(width/2)} ${startY} l0 ${height} l${width/2} 0 l0 ${-height} Z`)
  if (colors[0] === colors[1]){
    triangleOpacity(verticalPath1, verticalPath2)
  }

  verticalBlock.appendChild(verticalPath1)
  verticalBlock.appendChild(verticalPath2)
  quilt.appendChild(verticalBlock)
}

// create a quilt block with a horizontal seam
let drawHorizontal = (quiltID, idName, startX, startY, height, width, colors) => {
  
  let quilt = document.getElementById(quiltID)
  let horizontalBlock = document.createElementNS("http://www.w3.org/2000/svg", "g")
  let horizontalPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  let horizontalPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path")

  horizontalBlock.setAttribute("id", idName)
  horizontalPath1.setAttribute("fill", colors[0])
  horizontalPath1.setAttribute("d", `M${startX} ${startY} l0 ${height/2} l${width} 0 l0 ${-height/2} Z`)
  horizontalPath2.setAttribute("fill", colors[1])
  horizontalPath2.setAttribute("d", `M${startX} ${startY+(height/2)} l0 ${height/2} l${width} 0 l0 ${-height/2} Z`)
  if (colors[0] === colors[1]){
    triangleOpacity(horizontalPath1, horizontalPath2)
  }

  horizontalBlock.appendChild(horizontalPath1)
  horizontalBlock.appendChild(horizontalPath2)
  quilt.appendChild(horizontalBlock)
}

function triangleOpacity(path1, path2){
  let randNum = Math.random()
  if (randNum > .5){
    path1.setAttribute("opacity", .9)
  } else {
    path2.setAttribute("opacity", .9)
  }
}

let blockEdgePatterns = {
  "drawSolid" : new EdgePattern('A', 'A', 'A', 'A'),
  "drawDownTriangle" : new EdgePattern('A', 'A', 'B', 'B'),
  "drawUpTriangle" : new EdgePattern('A', 'B', 'B', 'A'),
  "drawHourglass" : new EdgePattern('A', 'B', 'A', 'B') // to implement
}

export { drawBlock, drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal, blockEdgePatterns }