# INVENTORY CONTROL

## descripcion de cada version

[version 29.6 - reestructuracion del proyecto cliente](/Docs/version_2806.md)

## Contenido

1. [Anvances del proyecto](#avances-del-proyecto)
2. [Estructura](#estructura-del-proyecto)
3. [Estructura del proyecto](#estructura-del-frontend)
4. [Carpeta del servidor](#estructura-del-backend)

## Avances del proyecto

*fecha* : 28/06/2023

1. Creacion del proyecto backen con express js
2. Creacion del proyecto frontend con react Ts
3. Configuracion de la base de datos con mongoDB
4. instalacion de los modulos necesario para cada proyecto (referirse a los package.json de cada proyecto para visualizar los modulos implementados actualmente)
5. Creacion de la estructura de carpetas de cada proyecto

6. ### Avances en el backend

    1. __Controladores__:
        * se desarollaron 6 controladores cada uno rige una entidad en la base de datos.
        ***
        | Controlador | Descripcion |
        | ----------- | ----------- |
        | `category.controller.js` | Controlador de la entidad categoria de productos|
        | `order.controller.js` | Controlador de la entidad ordenes de productos |
        | `product.controller.js` | Controlador de la entidad productos |
        |`supplier.controller.js` | Controlador de la entidad proveedores |
        | `user.controller.js` | Controlador de la entidad usuarios |
        | `sales.controller.js` | Controlador de la entidad ventas |
          >Nota
          >
          > actualmente solo el controlador de productos esta completo, los demas controladores estan en proceso de desarrollo donde para cada unos se agregara la funcion para actualizar los datos de la entidad para estar completos.

    2. __Rutas__:
        * se desarollaron 6 rutas donde cada una ejecuta un controlador de la entidad correspondiente segun sea la accion que se desea realizar.
        * las rutas se encuentran protegidas con el middleware de validacion del token del usuario de usuarios. desarrollado.
        * rutas creadas:
          * `category.routes.js`
          * `order.routes.js`
          * `product.routes.js`
          * `supplier.routes.js`
          * `user.routes.js`
          * `sales.routes.js`
    3. __Middlewares__:
        * se implementa el modulo JWT para la generacion de tokens de usuarios, en este caso se implementa el modulo para validar el tokem de tal forma si no ha sido modificado.
        * __ruta__ : `middlewares/requireAuthentication.middleware.js`
        * se desarrollo un middleware para validar el token del usuario que realiza la peticion a la ruta, en este caso se valida el token generado por JSON WEB TOKEN.
    4. __Validadores__:
        * se implementa el modulo express-validator para la validacion de los datos que se envian en las peticiones a las rutas.
        * __ruta__ : `/validators`
        * se desarrollaron 6 validadores cada uno rige una entidad en la base de datos.
        ***
        | Validador | Descripcion |
        | ----------- | ----------- |
        | `category.validator.js` | Validador de la entidad categoria de productos|
        | `order.validator.js` | Validador de la entidad ordenes de productos |
        | `product.validator.js` | Validador de la entidad productos |
        |`supplier.validator.js` | Validador de la entidad proveedores |
        | `user.validator.js` | Validador de la entidad usuarios |
        | `sales.validator.js` | Validador de la entidad ventas |
        * todos los validadores estan finalizados.
    5. __Modelos__:
        * se implementa el modulo mongoose para la creacion de los modelos de la base de datos.
        * se desarrollaron 6 modelos cada uno rige una entidad en la base de datos.
        ***
        | Modelo | Descripcion |
        | ----------- | ----------- |
        | `Category.model.js` | Modelo de la entidad categoria de productos|
        | `Order.model.js` | Modelo de la entidad ordenes de productos |
        | `Product.model.js` | Modelo de la entidad productos |
        |`Supplier.model.js` | Modelo de la entidad proveedores |
        | `User.model.js` | Modelo de la entidad usuarios |
        | `Sales.model.js` | Modelo de la entidad ventas |

7. ### Avances en el frontend

    1. __Store (Manejo de estado)__:
       * __ruta__ : `src/app/store.tsx`
       * Se implementa el modulo redux-toolkit para manejar el estado de las entidades a nivel global en el cliente. Para separar la logica del estado recibido del backend en el frontend se realizaron slices para cada entidad.
        > Nota
        >
        > Entiendase por logica a las operaciones CRUD de cada entidad, dicha logica se encuentra en los slices de cada entidad, y se implementa luego de que se recibe la respuesta del backend. con esto se busca minimizar la carga de datos evitando consumir cada que se hace una actualizacion de la entidad en la base de datos todos los datos.
        >
       * Slices :
        (en proceso) Se desarrollaron un total de 6 slices para el manejo de estados de cada entidad.
        ***
        __ruta__  : `src/features`
        | Slice | Descripcion | Estado |
        | ----------- | ----------- | ----------- |
        | `ProductSlice.slice.tsx` | Slice de para el manejo de las entidades producto y Categoria| Finalizado |
        | `OrderSlice.slice.tsx` | Slice de para el manejo de las entidades ordenes de productos | En proceso |
        | `SupplierSlice.slice.tsx` | Slice de para el manejo de las entidades proveedores | En proceso |
        | `UserSlice.slice.tsx` | Slice de para el manejo de las entidades usuarios | Finalizado  |
        | `SalesSlice.slice.tsx` | Slice de para el manejo de las entidades ventas | En proceso |
        >__Nota__
        >
        >Los slices que se encuentran en proceso de desarrollo se implementaran en los proximos dias.
        >
    2. __Contextos__ :
       * __ruta de los contextos__ : `src/contexts`
       * (en proceso) se finalizo el desarrollo del contexto para la autenticacion de usuario por el cual se inicia sesion y se registran nuevos usuarios.
       *se esta desarrollando el contexto para el manejo de los datos de todas entidades.
    3. __Hooks__ :
       * __ruta de los hooks__ : `src/hooks`
       * (En proceso) implementacion de hooks personalizados para las peticiones a las rutas del backend y actualizacion de los estados en store redux.
       ***
        | Hook | Descripcion | Estado |
        | ----------- | ----------- | ----------- |
        | `useCategory.hook.tsx` | Hook para el manejo de las entidades categoria de productos| En proceso |
        | `useOrder.hook.tsx` | Hook para el manejo de las entidades ordenes de productos | En proceso |
        | `useProduct.hook.tsx` | Hook para el manejo de las entidades productos | finalizado |
        | `useSupplier.hook.tsx` | Hook para el manejo de las entidades proveedores | En proceso |
        | `useSales.hook.tsx` | Hook para el manejo de las entidades ventas | En proceso |
    4. __Componentes__ :
       * __ruta de los componentes__ : `src/components`
       * (En proceso).
       * Lista de componentes terminados:
         * Input (`src/components/InputsComponents`) :
            * *Modulos implementados* : Formik
            * TextField.component.tsx : Componente para la creacion de campos de texto
            * NumberField.component.tsx : Componente para la creacion de campos numericos
            * SelectObjectField.component.tsx : Componente para la creacion de campos de seleccion que toman con valor una propiedad especifica de un objeto
            * BasicSelectField.component.tsx: Componente para la creacion de campos de seleccion que toman como valor el mismo valor que se muestra en el campo.
       >Nota
        >
        >Los componentes que no se enlista se encuentran en proceso de desarrollo debido a que se estan implementando los hooks personalizados asi como se busca optimizarlo para que sean reutilizables.
        >
    5. __Paginas__ :
     * __ruta de las paginas__ : `src/Pages`
     * (Finalizado la estructura).
     * se desarrollaron las 2 paginas principales de la aplicacion.
        * Login (`LoginPage.tsx`) : pagina principal de la aplicacion con el formulario de inicio de sesion, se manejan los errores de inicio de sesion y la direccion a la pagina de dashboard del inventario.
        * Dashboard (`Dashboard.tsx`) : pagina principal del sistema de inventario con la estructura para la navegacion entre las diferentes vistas (secciones) del dashboard.
    6. __Rutas provadas y publicas__ :
     * __ruta de las rutas__ : `src/routes`
     * (Finalizado)
     * se implementaron las rutas publicas y privadas para el manejo de la navegacion entre las diferentes vistas del dashboard considerando el rol de usuario de tal forma que se registre ciertas funciones.

***

### Estructura del proyecto

#### Estructura del frontend

* `src` : Contiene el codigo fuente del cliente
* `public` : Contiene los archivos estaticos del cliente
* dentro de la carpeta src se agrupan las siguientes carpetas:
  * `components` : Contiene los componentes de la aplicacion
  * `pages` : Contiene las paginas de la aplicacion
  * `feature` : Contiene los archivos slice del store de redux
  * `hooks` : Contiene los hooks personalizados
  * `Context` : Contiene los contextos de la aplicacion
  * `utils` : Contiene las funciones de utilidad
  * `interfaces` : Contiene las interfaces de los objetos
  * `styles` : Contiene los estilos globales de la aplicacion

#### Estructura del Backend

##### Archivos en la raiz de la carpeta server

* `app.js` : Archivo principal de la aplicacion express
* `index.js` : Archivo principal de la aplicacion
* `config.js` : Archivo de configuracion de la aplicacion
* `db.js` : Archivo de configuracion de la base de datos
* `.env` : Archivo de variables de entorno

##### Carpetas

* `controllers` : Contiene los controladores implementados en las rutas de la aplicacion express
* `models` : Contiene los modelos de la base de datos implementadas utilizando el modulo mongoose
* `routes` : Contiene las rutas de la aplicacion express
* `middleware` : contiene los middlewares de la aplicacion express
* `validatiors` : contiene los validadores de la aplicacion express implementados utilizando el modulo express-validator
