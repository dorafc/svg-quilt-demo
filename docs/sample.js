import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { QuiltSettings } from "../classes/QuiltSettings.js"
import { Color } from "../classes/Color.js"
import { WeightedList } from "../classes/WeightedList.js"

let quiltID = "sampleQuilt"
let spaceName = "quiltSpace"

let hotpink = new Color(1, "hotpink")
let green = new Color(1, "green")
let limeGreen = new Color(1, "limegreen")
let deeppink = new Color(1, "deeppink")
let teal = new Color(1, "teal")
let yellow = new Color(1, "yellow")
let colors = new WeightedList(hotpink, green, limeGreen, deeppink, teal, yellow)


let blockTypes = {
  solid : {
    frequency : 1,
    draw : drawSolid
  },
  upTriangle : {
    frequency : 1,
    draw : drawUpTriangle
  },
  downTriangle : {
    frequency : 1,
    draw : drawDownTriangle
  },
  vertical : {
    frequency : 1,
    draw : drawVertical
  },
  horizontal : {
    frequency : 1,
    draw : drawHorizontal
  }
}

let testDimensions = new Dimensions(10, 10, 50, 50)
let uniqueColor = false

let newQuilt = new QuiltSettings(quiltID, spaceName, testDimensions, colors, blockTypes, uniqueColor)

export { newQuilt };