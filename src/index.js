let blocks;      // random block types in the quilt

// quilt parameters
import { newQuilt } from '../docs/sample.js';

// quilt building class
import { Quilt } from '../classes/Quilt.js';

// version 2
import { drawBlock } from '../classes/drawBlocks.js'

let quilt = new Quilt(newQuilt);

quilt.renderBlocks()

// let quiltSpace = document.getElementById("newQuilt")
// let quiltSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

// quiltSVG.setAttribute("height", 500)
// quiltSVG.setAttribute("width", 500)
// quiltSVG.setAttribute("viewbox", `0 0 500 500`)
// quiltSVG.setAttribute("id", "test")

// quiltSpace.appendChild(quiltSVG)

// quiltSVG.appendChild(drawBlock(['lime', 'lime', 'hotpink', 'hotpink'], 0,0, 500, 500))