/*-------
QuiltSettings object contains parameters that a creates a quilt object
-------*/

import { getTotalFreq } from '../src/util.js'

class QuiltSettings{
  constructor(quiltID, spaceNameID, dimensions, colorPalette, blockTypes){
    this.quiltID = quiltID;                   // unique identifier for the quilt
    this.spaceName = spaceNameID;             // id of the element to append the quilt SVG
    this.dimensions = dimensions;             // dimensions of the quilt
    this.colorPalette = colorPalette;         // color palette for the quilt to render
    this.blockTypes = blockTypes              // block types for the quilt

    this.totalBlockFreq = getTotalFreq(this.blockTypes)
    this.totalColorFreq = getTotalFreq(this.colorPalette)

  }
}

export { QuiltSettings }