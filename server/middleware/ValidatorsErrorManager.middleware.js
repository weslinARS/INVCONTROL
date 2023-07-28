import { validationResult } from 'express-validator';
export const ValidatorErrorHandler =  (request, response, next) =>{
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    const errorsArrayAdapted = errorsArray.map((error) => {
      return { field: error.param, message: error.msg };
    });
    return response.status(400).json({PropertiesErrors : errorsArrayAdapted});
  }
  next();
}