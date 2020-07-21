/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/
 
class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes, matchEdges, matchFallback, recursiveBlock, debugging){
    this.quiltID = quiltID;                   // unique identifier for the quilt
    this.spaceName = spaceNameID;             // id of the element to append the quilt SVG
    this.dimensions = dimensions;             // dimensions of the quilt
    this.colorPalette = colorPalette;         // color palette for the quilt to render
    this.blockTypes = blockTypes              // block types for the quilt
    this.matchEdges = matchEdges              // generate blocks to match edges of neighboring blocks
    this.matchFallback = matchFallback
    this.recursiveBlock = recursiveBlock
    this.debugging = debugging
  }
}

export { QuiltSettings }