export type TypeWithKey <T> = {
  [key: string]: T;
}
export const getValidationErrors = (errorCode: any) => {
  const codeMatcher : TypeWithKey <string> ={
    'ERR_BAD_REQUEST': 'Error en la petición',
  }
  return codeMatcher[errorCode] || 'error desconocido';
}