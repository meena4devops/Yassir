import { App } from 'cdktf';
import { CoffeeOrderingPlatformStack } from './coffee-ordering-platform-stack';

const app = new App();
const stack = new CoffeeOrderingPlatformStack(app, 'coffee-ordering-platform');
app.synth();

// Run `cdk destroy` on the stack
stack.destroy();
