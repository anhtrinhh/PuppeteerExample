import * as dotenv from 'dotenv';
dotenv.config();

import services from './service-collection';
import './service-registry';
import Program from './program';

!async function() {
    var program = services.getService(Program);
    await program.main();
}();