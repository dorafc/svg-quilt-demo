import { drawSolid, drawDownTriangle, drawUpTriangle, drawHourglass } from "../classes/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { QuiltSettings } from "../classes/QuiltSettings.js"
import { ColorOptions } from "../classes/ColorOptions.js"
import { WeightedList } from "../classes/WeightedList.js"
import { BlockOptions } from "../classes/BlockOptions.js"

let quiltID = "sampleQuilt"
let spaceName = "quiltSpace"
let testDimensions = new Dimensions(5, 5, 50, 50)

// colors
let hotpink = new ColorOptions(1, "hotpink")
let green = new ColorOptions(1, "green")
let limeGreen = new ColorOptions(1, "limegreen")
let deeppink = new ColorOptions(0, "deeppink")
let teal = new ColorOptions(0, "teal")
let yellow = new ColorOptions(0, "yellow")
// let background = new ColorOptions(140, "lightgrey")
let colors = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)

// blocks
let solid = new BlockOptions(1, drawSolid)
let upTriangle = new BlockOptions(1, drawUpTriangle)
let downTriangle = new BlockOptions(1, drawDownTriangle)
let hourglass = new BlockOptions(.5, drawHourglass)
let blocks = new WeightedList(solid, upTriangle, downTriangle, hourglass)

// match edges?
let matchEdges = true

let newQuilt = new QuiltSettings(quiltID, spaceName, testDimensions, colors, blocks, matchEdges)

export { newQuilt };