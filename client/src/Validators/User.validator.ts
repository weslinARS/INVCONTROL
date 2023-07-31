import * as yup from 'yup';

const passwordRegex  = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
export const UserRegisterSchema = yup.object(
  {
    userName: yup.string().required('El nombre es requerido'),
    userLastName: yup.string().required('El apellido es requerido'),
    userEmail: yup.string().email('El email no es válido').required('El email es requerido'),
    userPassword: yup.string().required('La contraseña es requerida').matches(passwordRegex, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'),
    userRole: yup.string().required('El rol es requerido'),
  }
)