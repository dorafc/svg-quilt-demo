/*-------
Quilt object contains information about a quilt to render
-------*/
import { generateBlocks, updateDimensions } from '../functions/blockGenerator.js'
import { insertQuiltSVG, renderBlocks } from '../functions/quiltRender.js'

class Quilt{
  // constructor
  constructor(quiltSettings){
    this.quiltID = quiltSettings.quiltID;                   // unique identifier for the quilt
    this.spaceName = quiltSettings.spaceName;               // id of the element to append the quilt SVG
    this.dimensions = quiltSettings.dimensions;             // dimensions of the quilt
    this.colorPalette = quiltSettings.colorPalette;         // color palette for the quilt to render
    this.blockTypes = quiltSettings.blockTypes              // block types for the quilt
    this.matchEdges = quiltSettings.matchEdges              // match edges along blocks or not
    this.startSeeds = quiltSettings.startSeeds
    this.matchFallback = quiltSettings.matchFallback
    this.recursiveBlock = quiltSettings.recursiveBlock      // percentage of blocks with recursive subblocks
    this.showSeam = quiltSettings.showSeam
    this.debugging = quiltSettings.debugging                // display order of block rendering

    // TO DO: remove dimensions so that quilts measurements can be modified, just pass rows and cols
    const blocks = generateBlocks(this.dimensions, 
      this.matchEdges, 
      this.startSeeds,
      this.matchFallback,
      this.blockTypes, 
      this.colorPalette, 
      this.recursiveBlock)

    // TO DO: call a function that add dimensions to list of block objects (probably do this first)
    // const toRenderBlocks = updateDimensions(blocks, this.dimensions.blockHeight, this.dimensions.blockWidth)

    insertQuiltSVG(this.spaceName, this.quiltID, this.dimensions)
    renderBlocks(blocks, this.quiltID, this.debugging, this.showSeam, this.dimensions)
  }
}

export { Quilt }