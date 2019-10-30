#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkServerlessAppStack } from '../lib/cdk-serverless-app-stack';

const app = new cdk.App();
new CdkServerlessAppStack(app, 'CdkServerlessAppStack');