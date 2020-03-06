/*-------
EdgePattern object contains information about the colors of a quilt block
edges are ordered akin to the CSS box model order (top, right, bottom, left)
the Edge Pattern class is used to validate if edges match or if blocks can line up
-------*/

const options = ['A', 'B', 'C', 'D']

class EdgePattern{
  constructor(){
    if (arguments.length === 4){
      [this.top, this.right, this.bottom, this.left] = arguments
    } else if (arguments[0].length === 4){
      [this.top, this.right, this.bottom, this.left] = this.generateEdgePattern(arguments[0])
    }
  }

  // generate an edge pattern from edge fills
  generateEdgePattern(edges){ 
    let optCount = 0;
    let inPattern = new Map()

    let pattern = edges.map((edge) =>{
      if (!edge){
        return 0
      }
      else {
        if (!inPattern.has(edge)){
          inPattern.set(edge, options[optCount])
        optCount++
        }
        return inPattern.get(edge)
      }
    })
    
    return pattern
  }
}
export { EdgePattern };