class SetBlockMap{
  constructor(r, c){
    this.setBlocks = new Map()
    this.blockQueue = []
    this.rows = r
    this.cols = c
  }
  // [top, right, bottom, left]

  // method for generating blocks
  addGenerateQueue(r, c){
    if (!this.setBlocks.has(`${r},${c}`)){
      this.blockQueue.push({
        r : r,
        c : c,
      })
  
      //add block to rendered set
      this.setBlocks.set(`${r},${c}`, {top: undefined, right: undefined, bottom: undefined, left: undefined})
    }
  }

  /**
   * TEST MEEEEEEE
   */
  // initialize colors from neighboring blocks
  getEdges(r,c){
    let edges = {top: undefined, right: undefined, bottom: undefined, left: undefined}

    // top
    if (r - 1 >= 0 && this.setBlocks.has(`${r-1},${c}`)){
      edges.top = this.setBlocks.get(`${r-1},${c}`).bottom
    }
    
    // right 
    if (c + 1 <= this.cols && this.setBlocks.has(`${r},${c+1}`)){
      edges.right = this.setBlocks.get(`${r},${c+1}`).left
    }

    // bottom
    if (r + 1 <= this.rows && this.setBlocks.has(`${r+1},${c}`)){
      edges.bottom = this.setBlocks.get(`${r+1},${c}`).top
    }

    // left
    if (c - 1 >= 0 && this.setBlocks.has(`${r},${c-1}`)){
      edges.left = this.setBlocks.get(`${r},${c-1}`).right
    }

    this.setBlocks.set(`${r},${c}`, edges)
    return edges
  }

  // set the edge colors after the block edges have been finalized
  setEdges(r, c, edges){
    this.setBlocks.set(`${r},${c}`, edges)
  }

  // returns the oldest block in the to generate gueue
  getNextBlock(){
    if (this.blockQueue.length > 0){
      return this.blockQueue.shift()
    }
  }

  // returns if there are still more blocks to render
  hasNextBlock(){
    return this.blockQueue.length > 0
  }

}

export { SetBlockMap }