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

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export { generateMonochrome, generateAnalogous, generateComplementary, generateTriadic, generateCompound }