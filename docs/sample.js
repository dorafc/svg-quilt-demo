import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"

let colorPalette = {
  "hotPink" : {
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

let sampleGenerator = {
  name : "sampleQuilt",
  spaceNameID :  "quiltSpace",
  dimensions : {
    rows : 10,
    cols : 10,
    blockWidth : 70,
    blockHeight : 70
  },
  colorPalette : colorPalette,
  blockTypes : blockTypes
}

export { sampleGenerator };