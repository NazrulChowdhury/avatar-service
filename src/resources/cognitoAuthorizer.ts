export const CognitoAuthorizer = {
    Type: "AWS::ApiGateway::Authorizer",
    Properties : {
      AuthorizerResultTtlInSeconds: 300,
      IdentitySource: "method.request.header.Authorization", //token-source
      Name: "NewBookishAuthorizer",
      RestApiId :{
        Ref: "ApiGatewayRestApi",
      },
      Type: "COGNITO_USER_POOLS",
      ProviderARNs : [
        "arn:aws:cognito-idp:${self:provider.region}:${env:AWS_ACCOUNT_ID}:userpool/${env:USER_POOL_ID}"
      ]
    }
}