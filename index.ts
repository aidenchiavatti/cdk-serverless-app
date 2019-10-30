import dynamodb = require('@aws-cdk/aws-dynamodb');
import cdk = require('@aws-cdk/core');

export class CdkServerlessAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const dynamoTable = new dynamodb.Table(this, 'items', {
      tableName: 'items',
      partitionKey: {
        name: 'itemId',
        type: dynamodb.AttributeType.STRING
      }
    });
  }
}

const app = new cdk.App();
new CdkServerlessAppStack(app, 'CdkServerlessAppStack');
app.synth();
