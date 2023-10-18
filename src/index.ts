import * as dotenv from 'dotenv';
dotenv.config();

import DIContainer from './service-collection';
import './service-registry';
import Program from './program';

!async function() {
    var program = DIContainer.getService(Program);
    await program.main();
}();