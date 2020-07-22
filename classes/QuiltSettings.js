/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/
 
class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes, matchEdges, matchFallback, recursiveBlock, showSeam, debugging){
    this.quiltID = quiltID;                   // unique identifier for the quilt
    this.spaceName = spaceNameID;             // id of the element to append the quilt SVG
    this.dimensions = dimensions;             // dimensions of the quilt
    this.colorPalette = colorPalette;         // color palette for the quilt to render
    this.blockTypes = blockTypes              // block types for the quilt
    this.matchEdges = matchEdges              // generate blocks to match edges of neighboring blocks
    this.matchFallback = matchFallback        // how the block will match edges if no matching edges exist
    this.recursiveBlock = recursiveBlock      // allow recursive blocks
    this.showSeam = showSeam                  // show an outline for the seams
    this.debugging = debugging
  }
}

export { QuiltSettings }