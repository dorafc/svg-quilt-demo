import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { QuiltSettings } from "../classes/QuiltSettings.js"
import { Color } from "../classes/Color.js"
import { WeightedList } from "../classes/WeightedList.js"
import { Block } from "../classes/Blocks.js"

let quiltID = "sampleQuilt"
let spaceName = "quiltSpace"
let testDimensions = new Dimensions(10, 10, 50, 50)

// colors
let hotpink = new Color(1, "hotpink")
let green = new Color(1, "green")
let limeGreen = new Color(1, "limegreen")
let deeppink = new Color(1, "deeppink")
let teal = new Color(1, "teal")
let yellow = new Color(1, "yellow")
let colors = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)

// blocks
let solid = new Block(1, drawSolid)
let upTriangle = new Block(1, drawUpTriangle)
let downTriangle = new Block(1, drawDownTriangle)
let vertical = new Block(1, drawVertical)
let horizontal = new Block(1, drawHorizontal)
let blocks = new WeightedList(solid, upTriangle, downTriangle, vertical, horizontal)

let uniqueColor = true

let newQuilt = new QuiltSettings(quiltID, spaceName, testDimensions, colors, blocks, uniqueColor)

export { newQuilt };