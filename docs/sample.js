import { drawSolid, drawDownTriangle, drawUpTriangle, drawHourglass } from "../functions/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { ColorOptions } from "../classes/weighted_obj/ColorOptions.js"
import { WeightedList } from "../classes/weighted_obj/WeightedList.js"
import { BlockOptions } from "../classes/weighted_obj/BlockOptions.js"

let quiltID = "sampleQuilt"
let spaceName = "quiltSpace"
let dimensions = new Dimensions(30, 30, 20, 20)

// colors
let hotpink = new ColorOptions(1, "hotpink")
let green = new ColorOptions(1, "green")
let limeGreen = new ColorOptions(1, "limegreen")
let deeppink = new ColorOptions(1, "deeppink")
let teal = new ColorOptions(1, "teal")
let yellow = new ColorOptions(1, "yellow")
let background = new ColorOptions(14000, "#c5b9c7")
let colorPalette = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)

// blocks
let solid = new BlockOptions(1, drawSolid)
let upTriangle = new BlockOptions(1, drawUpTriangle)
let downTriangle = new BlockOptions(1, drawDownTriangle)
let hourglass = new BlockOptions(0, drawHourglass)
let blockTypes = new WeightedList(solid, upTriangle, downTriangle, hourglass)

// match edges?
let matchEdges = true

// number of starting seeds for generating blocks
let startSeeds = 10

// Occassionally, there may be no valid blocks from the list of allowed blocks that match the edges of an ungenerated block. In this situation, quilt.b will need to either choose an unmatched block from the list or pick an unallowed block
const matchEdgeFailureOptions = ['pickAllowedBlock', 'pickMatchedColor']
let matchFallback = matchEdgeFailureOptions[1]


// debugging : show rendered block order
let debugging = false

// showSeam : show a dark line where the block seams will be
let showSeam = true

// animDelay : delay between block rendering as an animation
// setting as 0 will render everything at once
let animDelay = 1

// likelihood of recursive blocks (will only work on un matched edges)
let recursiveBlock = {frequency : .5,
                      levels : 3,
                      decay : .5,
                      minSize : 10}

let newQuilt = {
  quiltID : quiltID,                    // unique identifier for the quilt
  spaceName : spaceName,                // id of the element to append the quilt SVG
  dimensions : dimensions,              // dimensions of the quilt
  colorPalette : colorPalette,          // color palette for the quilt to render
  blockTypes : blockTypes,              // block types for the quilt
  matchEdges : matchEdges,              // generate blocks to match edges of neighboring blocks
  startSeeds : startSeeds,              // number of starting seeds for generating blocks
  matchFallback : matchFallback,        // how the block will match edges if no matching edges exist
  recursiveBlock : recursiveBlock,      // allow recursive blocks
  showSeam : showSeam,                  // show an outline for the seams
  debugging : debugging,
  animDelay : animDelay
}

export { newQuilt };