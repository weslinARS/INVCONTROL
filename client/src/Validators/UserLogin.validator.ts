import * as Yup from 'yup'


export const userLoginSchema = Yup.object({
  userEmail : Yup.string().required('el correo es requerido').email('Debe de ingresar un correo válido'),
  userPassword : Yup.string().required('la contraseña es requerido')
})