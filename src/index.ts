import * as dotenv from 'dotenv';
dotenv.config();

import DIContainer from './di-container';
import Program from './program';

!async function() {
    var program = DIContainer.resolve(Program);
    await program.main();
}();