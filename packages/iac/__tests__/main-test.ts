import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import { App } from 'cdktf';
import { CoffeeOrderingPlatformStack } from '../packages/iac/coffee-ordering-platform-stack';

test('CoffeeOrderingPlatformStack has the necessary resources', () => {
  const app = new App();
  const stack = new CoffeeOrderingPlatformStack(app, 'test-stack');

  expectCDK(stack).to(haveResource('hashicups_order'));
  expectCDK(stack).to(haveResource('hashicups_order_item'));
  // Add additional assertions as needed for other resources

  expectCDK(stack).toMatchTemplate({
    Resources: {
      // Include expected resource definitions
    },
  });
});
