import type { AWS } from '@serverless/typescript'
import { uploadImage }from '@functions'
import { AvatarBucket, AvatarBucketPolicy } from '@resources/avatarBucket';
import { CognitoAuthorizer } from '@resources/cognitoAuthorizer';

const serverlessConfiguration: AWS = {
  service: 'ProfileAvatarService',
  frameworkVersion: '3', 	
  useDotenv: true,
  plugins: [
    'serverless-esbuild', 
    'serverless-iam-roles-per-function'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'prod'}",
    region : 'eu-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment : "${self:custom.environment.${self:custom.stage}}" as any
  },
  functions: { 
    uploadImage
  },
  resources:{ 
    Resources: { 
      AvatarBucket,
      AvatarBucketPolicy,
      CognitoAuthorizer
    }
 
  },
  package: { individually: true },
  custom: {
    stage: "${opt:stage, self:provider.stage}", // if no opt then default to provider...
    environment : {
      dev : {
        STAGE : "${self:custom.stage}",
        BUCKET_NAME : "${env:BUCKET_NAME}",
        ORIGIN_URL: "${env:ORIGIN_URL}", // allow origin cors url
        AWS_ACCOUNT_ID:"${env:AWS_ACCOUNT_ID}",
        USER_POOL_ID: "${env:USER_POOL_ID}"
      },
      prod : {
        STAGE : "${self:custom.stage}",
        BUCKET_NAME : "${env:BUCKET_NAME}",
        ORIGIN_URL: "${env:ORIGIN_URL}",
        AWS_ACCOUNT_ID : "${env:AWS_ACCOUNT_ID}",
        USER_POOL_ID: "${env:USER_POOL_ID}"
      }
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
