import { drawSolid, drawDownTriangle, drawUpTriangle, drawVertical, drawHorizontal } from "../src/drawBlocks.js"

let sampleQuilt = {
  name : "sampleQuilt",
  spaceName :  "quiltSpace",
  dimensions : {
    rows : 3,
    cols : 3,
    blockWidth : 100,
    blockHeight : 100
  },
  colorPalette : {
    "hotPink" : {
      frequency : 1,
      fill : "hotpink"
    },
    "green" : {
      frequency : 1,
      fill : "green"
    }
  },
  blockTypes : {
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
  },
  blocks : [
    {
      type : "solid",
      colors : ["hotPink"],    // get colors by keys
    },
    {
      type : "upTriangle",
      colors : ["hotPink", "green"]
    },
    {
      type : "downTriangle",
      colors : ["hotPink", "green"]
    },
    {
      type : "vertical",
      colors : ["hotPink", "green"]
    },
    {
      type : "horizontal",
      colors : ["hotPink", "green"]
    },
    {
      type : "vertical",
      colors : ["green", "hotpink"]
    },
    {
      type : "solid",
      colors : ["green"],    
    },
    {
      type : "upTriangle",
      colors : ["hotPink", "green"]
    },
    {
      type : "downTriangle",
      colors : ["hotPink", "green"]
    }
  ]
}

let sampleGenerator = {
  name : "sampleQuilt",
  spaceName :  "quiltSpace",
  dimensions : {
    rows : 3,
    cols : 3,
    blockWidth : 100,
    blockHeight : 100
  },
  colorPalette : {
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
      fill : "green"
    },
    "deeppink" : {
      frequency : 1,
      fill : "deeppink"
    }
  },
  blockTypes : {
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
}

export { sampleQuilt, sampleGenerator };