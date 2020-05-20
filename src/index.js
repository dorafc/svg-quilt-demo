let blocks;      // random block types in the quilt

// quilt parameters
import { newQuilt } from '../docs/sample.js';

// quilt building class
import { Quilt } from '../classes/Quilt.js';

import { EdgePattern } from "../classes/EdgePattern.js"
let edge = new EdgePattern(["green", "pink", null, null])
console.log(edge)

let quilt = new Quilt(newQuilt);
quilt.renderBlocks()