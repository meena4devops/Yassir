import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import {
  HashiCupsProvider,
  Order,
  OrderItem,
  Coffee,
} from '@cdktf/provider-hashicups';

class CoffeeOrderingPlatformStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Initialize the HashiCups provider
    const hashiCupsProvider = new HashiCupsProvider(this, 'hashicups', {
      version: '0.3.0',
    });

    // Define coffee types
    const espresso = new Coffee(this, 'espresso', {
      name: 'Espresso',
      description: 'A concentrated form of coffee served in small, strong shots',
      ingredients: ['ground coffee', 'hot water'],
      price: 2.99,
    });

    const latte = new Coffee(this, 'latte', {
      name: 'Latte',
      description: 'Espresso with steamed milk and a small amount of foam',
      ingredients: ['espresso', 'steamed milk', 'foam'],
      price: 3.99,
    });

    // Define the order resources
    const orderFolder = new Order(this, 'order', {
      folderName: 'my-order-folder',
    });

    // Read the files in the order folder and create order items
    const orderItems = orderFolder.readItems().map((item) => {
      return new OrderItem(this, `item-${item.name}`, {
        orderId: orderFolder.id,
        name: item.name,
        quantity: item.quantity,
      });
    });

    // Output the order ID
    new TerraformOutput(this, 'orderId', {
      value: orderFolder.id,
    });
  }
}

const app = new App();
new CoffeeOrderingPlatformStack(app, 'coffee-ordering-platform');
app.synth();
