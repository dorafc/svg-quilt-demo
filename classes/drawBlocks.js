import { EdgePattern } from "./EdgePattern.js"

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

export { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal, blockEdgePatterns }