import middy from "@middy/core"
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import validator from "@middy/validator";
import cors from '@middy/http-cors';

export const middyfy = (handler, validatorSchema = {}) => {
  if(Object.keys(validatorSchema).length === 0){
    return middy(handler).use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(cors())
    .use(httpErrorHandler())
  } else {
    return middy(handler).use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(validator({inputSchema : validatorSchema}))
    .use(cors())
    .use(httpErrorHandler())
  }
}
