import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
import { QuiltSettings } from "../classes/QuiltSettings.js"
import { Color } from "../classes/Color.js"
import { WeightedList } from "../classes/WeightedList.js"

let hotpink = new Color(1, "hotpink")
let green = new Color(1, "green")
let limeGreen = new Color(1, "limegreen")
let colorList = new WeightedList(hotpink, green, limeGreen)
colorList.normalizeWeight()

// color pallette
let colors = {
  "hotpink" : {
    frequency : 1,
    fill : "hotpink"
  },
  "green" : {
    frequency : 1,
    fill : "green"
  },
  "limegreen" : {
    frequency : 1,
    fill : "limegreen"
  },
  "deeppink" : {
    frequency : 1,
    fill : "deeppink"
  }
}

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

let newQuilt = new QuiltSettings("sampleQuilt", "quiltSpace", testDimensions, colors, blockTypes)

export { newQuilt };