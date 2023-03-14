import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk'

const s3 = new S3()

const uploadImage =  async(event) => { 

  const Key = event.body.key
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Expires: 300,
    ContentType: 'image/jpeg'
  }
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  return {
    statusCode : 200,
    body : JSON.stringify({uploadURL, Key})
  }
  
}

export const main = middyfy(uploadImage);
