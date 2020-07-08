import { drawSolid, drawDownTriangle, drawUpTriangle, drawHourglass } from "../functions/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { QuiltSettings } from "../classes/QuiltSettings.js"
import { ColorOptions } from "../classes/weighted_obj/ColorOptions.js"
import { WeightedList } from "../classes/weighted_obj/WeightedList.js"
import { BlockOptions } from "../classes/weighted_obj/BlockOptions.js"

let quiltID = "sampleQuilt"
let spaceName = "quiltSpace"
let testDimensions = new Dimensions(20, 20, 40, 40)

// colors
let hotpink = new ColorOptions(1, "hotpink")
let green = new ColorOptions(1, "green")
let limeGreen = new ColorOptions(1, "limegreen")
let deeppink = new ColorOptions(1, "deeppink")
let teal = new ColorOptions(1, "teal")
let yellow = new ColorOptions(1, "yellow")
let background = new ColorOptions(14000, "lightgray")
let colors = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)

// blocks
let solid = new BlockOptions(1, drawSolid)
let upTriangle = new BlockOptions(1, drawUpTriangle)
let downTriangle = new BlockOptions(1, drawDownTriangle)
let hourglass = new BlockOptions(0, drawHourglass)
let blocks = new WeightedList(solid, upTriangle, downTriangle, hourglass)

// match edges?
let matchEdges = false

// debugging : show rendered block order
let debugging = false

// likelyhood of recursive blocks (will only work on un matched edges)
let recursiveBlock = .1

let newQuilt = new QuiltSettings(quiltID, spaceName, testDimensions, colors, blocks, matchEdges, recursiveBlock, debugging)

export { newQuilt };