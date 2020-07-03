/*-------
Quilt object contains information about a quilt to render
-------*/
import { generateBlocks } from './blockGenerator.js'
import { insertQuiltSVG, renderBlocks } from './quiltRender.js'

class Quilt{
  // constructor
  constructor(quiltSettings){
    this.quiltID = quiltSettings.quiltID;                   // unique identifier for the quilt
    this.spaceName = quiltSettings.spaceName;               // id of the element to append the quilt SVG
    this.dimensions = quiltSettings.dimensions;             // dimensions of the quilt
    this.colorPalette = quiltSettings.colorPalette;         // color palette for the quilt to render
    this.blockTypes = quiltSettings.blockTypes              // block types for the quilt
    this.matchEdges = quiltSettings.matchEdges
    this.debugging = quiltSettings.debugging

    this.blocks = generateBlocks(this.dimensions, this.matchEdges, this.blockTypes, this.colorPalette)

    insertQuiltSVG(this.spaceName, this.quiltID, this.dimensions)
    renderBlocks(this.blocks, this.quiltID, this.debugging)
  }
}



export { Quilt }