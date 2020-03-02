import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"
import { Dimensions } from "../classes/Dimensions.js"
// import { getTotalFreq } from "../src/util.js"

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

let testDimensions = new Dimensions(10, 20, 50, 50)

let sampleGenerator = {
  name : "sampleQuilt",
  spaceNameID :  "quiltSpace",
  dimensions : testDimensions,
  colorPalette : colors,
  blockTypes : blockTypes,
}

export { sampleGenerator };