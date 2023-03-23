import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'uploadImage',     
        cors :true,
        authorizer: {
          type: "COGNITO_USER_POOLS",
          authorizerId: {
            Ref: "CognitoAuthorizer"
          }, 
          scopes : ['openid']
        }
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
};


