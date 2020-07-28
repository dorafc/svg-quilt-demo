/*-------
BlockRender includes information for rendering an Block
-------*/

class BlockRender{
  constructor(draw, label, startX, startY, height, width, colors, count, row, col){
    this.draw = draw
    this.label = label
    this.startX = startX
    this.startY = startY
    this.height = height
    this.width = width
    this.colors = colors
    this.count = count
    this.row = row
    this.col = col
  }
}

export { BlockRender };