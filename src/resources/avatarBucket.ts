export const AvatarBucket = {
  Type : "AWS::S3::Bucket",
  Properties : {
    BucketName : "${self:provider.environment.BUCKET_NAME}",
    CorsConfiguration: {
      CorsRules: [
        {
          AllowedHeaders: [
            "*"
          ],
          AllowedMethods: [
            "GET",
            "PUT"
          ],
          AllowedOrigins: [
            "${self:provider.environment.ORIGIN_URL}"
          ],
          MaxAge: 86400
        }
      ]
    }
  }
}
export const AvatarBucketPolicy = {
  Type : "AWS::S3::BucketPolicy",
  Properties : {
    Bucket :  "${self:provider.environment.BUCKET_NAME}", // which bucket this policy is for
    PolicyDocument : {
      Statement : [
        {
          Sid: "PublicRead",
          Effect: "Allow",
          Principal: "*",
          Action: ["s3:GetObject"],
          Resource:"arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*"
        }
      ]
    }
  }
}