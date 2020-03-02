/*-------
Dimensions object contains information related to the quilt dimensions
-------*/

class Dimensions{
  constructor(rows, cols, blockWidth, blockHeight){
    this.rows = rows;                         // unique identifier for the quilt
    this.cols = cols;                         // id of the element to append the quilt SVG
    this.blockWidth = blockWidth;             // dimensions of the quilt
    this.blockHeight = blockHeight;           // color palette for the quilt to render


    this.quiltWidth = this.cols * this.blockWidth;
    this.quiltHeight = this.rows * this.blockHeight;
  }
}


export { Dimensions };