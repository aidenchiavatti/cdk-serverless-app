import dynamodb = require('@aws-cdk/aws-dynamodb');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');

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

    const lambdaFunction = new lambda.Function(this, 'dynamoAdd', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: lambda.Code.asset('lambda'),
      environment: {
        ITEMS_TABLE_NAME: dynamoTable.tableName
      }
    });
    dynamoTable.grantReadWriteData(lambdaFunction);

    new apigw.LambdaRestApi(this, 'Endpont', {
      handler: lambdaFunction
    });
  }
}

const app = new cdk.App();
new CdkServerlessAppStack(app, 'CdkServerlessAppStack');
app.synth();
