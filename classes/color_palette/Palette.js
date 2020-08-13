import { Color } from "../color_palette/Colors.js"

const generateMonochrome = (color) => {
  return [color.getLighterColor(30), 
    color.getLighterColor(15), 
    color, 
    color.getDarkerColor(15),
    color.getDarkerColor(30)]
}

const generateAnalogous = (color) => {
  const negColor = color.getNewHue(-60)
  const posColor = color.getNewHue(60)

  return [negColor.shiftColor(0, randomNum(-20, 20), randomNum(10, 15)),
    negColor,
    color,
    posColor,
    posColor.shiftColor(0, randomNum(-20, 20), randomNum(-20, -10))]
}

const generateComplementary = (color) => {
  const compColor = color.getNewHue(180)

  return [compColor.shiftColor(0, randomNum(-20, 20), randomNum(10, 15)),
    compColor,
    color,
    color.shiftColor(0, randomNum(-15, 15), randomNum(-20, -10)),
    color.shiftColor(0, randomNum(-15, 15), randomNum(-35, -25))]
}

const generateTriadic = (color) => {
  const negColor = color.getNewHue(-120)
  const posColor = color.getNewHue(120)

  return [negColor.shiftColor(0, randomNum(-20, 20), randomNum(10, 15)),
    negColor,
    color,
    posColor,
    posColor.shiftColor(0, randomNum(-20, 20), randomNum(-20, -10))]
}

const generateCompound = (color) => {
  const negColor = color.getNewHue(-160)
  const posColor = color.getNewHue(160)

  return [negColor.shiftColor(0, randomNum(-20, 20), randomNum(10, 15)),
    negColor,
    color,
    posColor,
    posColor.shiftColor(0, randomNum(-20, 20), randomNum(-20, -10))]
}


// function for selecting colors
const generateHexPalette = () => {
  // get palette type
  const types = [generateMonochrome, generateAnalogous, generateComplementary, generateTriadic, generateCompound]
  const type = types[randomNum(0, types.length - 1)]

  // pick hue (between 0 and 360), saturation (between 0 and 100), and lightness (between 30 and 70)
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 40) + 20
  const lightness = Math.floor(Math.random() * 50) + 30
  const color = new Color(hue, saturation, lightness)

  // return as list of HEX values
  return(type(color).map(col => col.toHex()))
}

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export { generateHexPalette }