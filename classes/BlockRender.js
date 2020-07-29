/*-------
BlockRender includes information for rendering an Block
-------*/

class BlockRender{
  constructor(draw, label, colors, count, row, col){
    this.draw = draw
    this.label = label
    this.colors = colors
    this.count = count
    this.row = row
    this.col = col
  }
}

export { BlockRender };