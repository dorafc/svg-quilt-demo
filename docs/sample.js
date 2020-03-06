import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { QuiltSettings } from "../classes/QuiltSettings.js"
import { ColorOptions } from "../classes/ColorOptions.js"
import { WeightedList } from "../classes/WeightedList.js"
import { BlockOptions } from "../classes/BlockOptions.js"

let quiltID = "sampleQuilt"
let spaceName = "quiltSpace"
let testDimensions = new Dimensions(10, 10, 50, 50)

// colors
let hotpink = new ColorOptions(1, "hotpink")
let green = new ColorOptions(1, "green")
let limeGreen = new ColorOptions(1, "limegreen")
let deeppink = new ColorOptions(1, "deeppink")
let teal = new ColorOptions(1, "teal")
let yellow = new ColorOptions(1, "yellow")
let colors = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)

// blocks
let solid = new BlockOptions(1, drawSolid)
let upTriangle = new BlockOptions(1, drawUpTriangle)
let downTriangle = new BlockOptions(1, drawDownTriangle)
let vertical = new BlockOptions(1, drawVertical)
let horizontal = new BlockOptions(1, drawHorizontal)
let blocks = new WeightedList(solid, upTriangle, downTriangle)

let uniqueColor = true

let newQuilt = new QuiltSettings(quiltID, spaceName, testDimensions, colors, blocks, uniqueColor)

export { newQuilt };