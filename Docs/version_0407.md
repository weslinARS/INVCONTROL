
# Version 12.07

__fecha__ : 12/07/2023

la version 04.07 se enfoca principalmente en cubrir las funcionalidades crud de las entidades creadas, asi pues se ha realizado las modificaciones necesarias para cumplir con tal objetivo tanto en el frontend como el backend.
***

## Avances frontend

### Slices de redux

__ruta__ : `client/src/features`

* se añade a los sices creados las acciones para actualizar los estados almacenados en el store.

* se actualizaron los cinco slices la función mencionada.

### Hooks personalizados

__ruta__ : `client/src/hooks`

* se han agregado las funciones necesarias en los hooks para poder realizar las peticiones al servidor de las operaciones CRUD.

### Componentes

* Formularios para registrar y editar productos.
* Formulario para registrar una nueva categoria.

## Avances backend

### Controladores

__ruta__ : `server/src/controllers`

* se han agregado las funciones necesarias en los controladores para poder realizar las operaciones CRUD que el cliente solicita al servidor express.

### Seguridad

__ruta__ : `server/src/middlewares`

* se han aplicado las medidas necesarias para impedir que el cliente ingrese a ciertas rutas que requieren tanto estar registrado como tener un rol especifico.

* para lo anterior se han creado dos middleware que se encargan de verificar que el usuario este registrado y que tenga el rol necesario para acceder a la ruta solicitada.

* __modulos implementado__ :

  * `JWT` : se ha utilizado el modulo de JSON Web Token para la creacion de tokens de autenticacion que contienen ensencialmente el rol de usuario asi como el id del mismo , de tal forma que al momento de hacer peticiones al backend tan solo se debe de enviar este token en el header de la peticion.
  * `bcryptjs` : se ha utilizado el modulo de bcryptjs para la encriptacion de las contraseñas de los usuarios que se registran en la aplicacion para evitar que la integridad de los datos sean afectadas en caso de una violacion en la base de datos.
  
  * `express validator` : se ha utilizado el modulo de express validator tanto para la validacion de los datos que se reciben el servidor, asi como para evitar la inyeccion de codigo malicioso en los datos que se reciben en el servidor.

### Rutas

__ruta__ : `server/src/routes`

* se han agregado los middlewares de seguridad a las rutas que requieren ambas o solo una de ellas, este es el caso de las rutas para consumir datos de los usuarios que solo puede ser accedida por usuarios admin, asi como la ruta para iniciar sesion que no cuenta con ningun middleware de seguridad debido a que cualquier usuario puede acceder a ella.

### Entidades

* se ha agregado la entidad cashRegister para el manejo de los datos de la caja registrado, es decir se ha desarrollado tanto las rutas, controladores, validadores, y modelos necesarios para el manejo de los datos de la caja registradora.

## Nuevos modulos

* se han agregado nuevos modulo aparte de los ya mnencionados anteriormente para el testeo de la aplicacion tanto en el frontend como en el backend:

  * `jest` : se ha utilizado el modulo de jest para la realizacion de pruebas unitarias en el backend.

  * `supertest` : se ha utilizado el modulo de supertest para la realizacion de pruebas de integracion en el backend.

  * `cypress` : se ha utilizado el modulo de cypress para la realizacion de pruebas de integracion en el frontend asi como tambien para el testeo de los componentes de react creados.

# Testeo del backend

__ruta__ : `server/src/tests`

* se han creado las pruebas en las rutas de backend para verificar que las rutas funcionen correctamente y que los datos que se reciben sean los correctos, asi como tambien que la respuesta sea la adecuado segun el caso.

* test realizados:

  * [x] test de las rutas de produto.
  * [x] test de las rutas de provedores.
