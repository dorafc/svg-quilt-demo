/*-------
EdgePattern object contains information about the colors of a quilt block edges are ordered akin to the CSS box model order (top, right, bottom, left) the Edge Pattern class is used to validate if edges match or if blocks can line up. A pattern includes letters to differentiate colors (A, B, C, D or 0), and not specific colors.
-------*/

const options = ['A', 'B', 'C', 'D']

class EdgePattern{
  constructor(){
    if (arguments.length === 4){
      // create EdgePattern object from parameters
      [this.top, this.right, this.bottom, this.left] = arguments
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
}
export { EdgePattern };