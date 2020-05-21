/*-------
EdgePattern object contains information about the colors of a quilt block edges are ordered akin to the CSS box model order (top, right, bottom, left) the Edge Pattern class is used to validate if edges match or if blocks can line up. A pattern includes letters to differentiate colors (A, B, C, D or 0), and not specific colors.
-------*/

const options = ['A', 'B', 'C', 'D']

class EdgePattern{
  constructor(){
    if (arguments.length === 0){
      [this.top, this.right, this.bottom, this.left] = [0, 0, 0, 0]
    }
    else if (arguments.length === 4){
      // create EdgePattern object from parameters
      [this.top, this.right, this.bottom, this.left] = this.generateEdgePattern([arguments[0], arguments[1], arguments[2], arguments[3]])
    } else if (arguments[0].length === 4){
      // generate edge pattern object from a partially known edge fills
      [this.top, this.right, this.bottom, this.left] = this.generateEdgePattern(arguments[0])
    }
  }

  // generate an edge pattern from edge fills
  generateEdgePattern(edges){ 
    let optCount = 0;
    let inPattern = new Map()

    let pattern = edges.map((edge) =>{
      // no edge has been defined
      if (!edge){
        return 0
      }
      else {
        // edge color has not been used in the block edge, sets a letter associated with the color
        if (!inPattern.has(edge)){
          inPattern.set(edge, options[optCount])
          optCount++
        }
        // return letter associated with the edge color
        return inPattern.get(edge)
      }
    })
    return pattern
  }

  // set edge colors
  setEdgeColors(colors){
    this.colors = colors
  }

  getColor(side){
    
    const optIndex = options.indexOf(this[side])
    if (optIndex === -1 || !this.colors){
      return 0
    } else {
      return this.colors[optIndex]
    }
  }

  getTopColor(){
    return this.getColor("top")
  }

  getRightColor(){
    return this.getColor("right")
  }

  getBottomColor(){
    return this.getColor("bottom")
  }

  getLeftColor(){
    return this.getColor("left")
  }
}
export { EdgePattern };