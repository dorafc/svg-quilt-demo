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
let background = new ColorOptions(14000, "#c5b9c7")
let colors = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)

// blocks
let solid = new BlockOptions(1, drawSolid)
let upTriangle = new BlockOptions(1, drawUpTriangle)
let downTriangle = new BlockOptions(1, drawDownTriangle)
let hourglass = new BlockOptions(0, drawHourglass)
let blocks = new WeightedList(solid, upTriangle, downTriangle, hourglass)

// match edges?
let matchEdges = true

// number of starting seeds for generating blocks
let startSeeds = 10

// Occassionally, there may be no valid blocks from the list of allowed blocks that match the edges of an ungenerated block. In this situation, quilt.b will need to either choose an unmatched block from the list or pick an unallowed block
const matchEdgeFailureOptions = ['pickAllowedBlock', 'pickMatchedColor']
let matchFallback = matchEdgeFailureOptions[0]


// debugging : show rendered block order
let debugging = false
let showSeam = true

// likelihood of recursive blocks (will only work on un matched edges)
let recursiveBlock = {frequency : .1,
                      levels : 3,
                      decay : .8,
                      minSize : 10}

let newQuilt = new QuiltSettings(quiltID, 
  spaceName, 
  testDimensions, 
  colors, 
  blocks, 
  matchEdges, 
  startSeeds,
  matchFallback, 
  recursiveBlock, 
  showSeam, 
  debugging)

export { newQuilt };