// const schema =  {
//   type: 'object',
//   properties: {
//     amount: { type: 'number' }
//   },
//   required: ['amount']
// } 
// export default schema
 
export default {
  type: "object",
  properties: {
    amount: { type: 'number' }
  },
  required: ['amount']
} as const;


 