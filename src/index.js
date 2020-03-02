let blocks;      // random block types in the quilt

import { newQuilt } from '../docs/sample.js';
import { Quilt } from '../classes/Quilt.js';

let quilt = new Quilt(newQuilt);
quilt.renderBlocks()

// insertQuiltSVG(newQuilt)
// blocks = newQuilt.generateBlocks()
// renderBlocks("sampleQuilt", blocks)