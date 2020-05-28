/*-------
BlockRender includes information for rendering an Block
-------*/

class BlockRender{
  constructor(draw, label, startX, startY, height, width, colors, count){
    this.draw = draw
    this.label = label
    this.startX = startX
    this.startY = startY
    this.height = height
    this.width = width
    this.colors = colors
    this.count = count
  }
}

export { BlockRender };