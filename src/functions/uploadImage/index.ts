import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'uploadImage',     
        cors :true
      },
    },
  ], 
  iamRoleStatements: [{
    Effect: "Allow",
    Action: [
      "s3:GetObject",
      "s3:PutObject"
    ],
    Resource:"arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*"
  }]
  /* authorizer: {
    name: "cognitoAuthorizer",
    type: "COGNITO_USER_POOLS",
    arn: "arn:aws:cognito-idp:eu-west-2:${env:AWS_ACCOUNT_ID}:userpool/eu-west-2_q949XNcbI",
    identitySource : 'method.request.header.Authorization', //token-source
    scopes : ['openid'], 
   // claims : ['profile']
  }, */
};


