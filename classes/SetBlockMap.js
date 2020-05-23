class SetBlockMap{
  constructor(){
    this.setBlocks = new Set()
    this.blockQueue = []
  }

  // method for generating blocks
  addGenerateQueue(r, c, startX, startY){
    if (!this.setBlocks.has(r + ', ' + c)){
      this.blockQueue.push({
        r : r,
        c : c,
        startX : startX,
        startY : startY
      })
  
      //add block to rendered set
      this.setBlocks.add(r + ', ' + c)
    }
  }

  getNextBlock(){
    if (this.blockQueue.length > 0){
      return this.blockQueue.shift()
    }
  }

  hasNextBlock(){
    return this.blockQueue.length > 0
  }

}

export { SetBlockMap }