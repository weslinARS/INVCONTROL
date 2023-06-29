
# Version 29.6

__fecha__ : 29/06/2023
***

la version 29.6 se creo con el fin de mejorar la organizacion de los archivos y carpeta de la aplicacion.

__fecha__ : 29/06/2023

## Novedades

### utilidades

__ruta__ : `client/src/utilities`

* se agrego un archivo (`/reduxActions.ts`) con las diferentes acciones que se pueden realizar en cada uno de los slices del store creado.

### validadores

__ruta__ : `client/src/Validators`

* se agrego una nueva carpeta en la que se ubicaran los validadores creados para verificar los datos que se capturan en los formularios.

* se agrego un archivo `Product.validator.ts` en el que se crearon las funciones para validar los datos del formulario de productos.

## store

__ruta__ : `client/src/Store`

* se crea una carpeta `store` en la que se ubicaran los archivos relacionados con el store de redux.

### componentes

__ruta__ : `client/src/Components`

* se reoganizaron los componentes en diferentes carpetas para tener una mejor organizacion.

* carpetas creadas:

| Nommbre carpeta | Descripcion |
| --------------- | ----------- |
| FormsComponents | Contiene los componentes que se usan para crear los formularios |
| Layouts | Contiene los componentes que se usan para crear los layouts de la aplicacion |
| InputsComponents | Contiene los componentes que se usan para crear los inputs de los formularios |

> Nota
>
> algunos componentes complejos se crean carpetas para cada uno de ellos dentro de la ruta de componentes.
>

### slices

__ruta__ : `client/src/features`

* se añaden a los slices creados las acciones para borrar y eliminar los objetos dentro de las entidades.

* se actualizaron los cincos slices.

### views

__ruta__ : `client/src/views`

* se crea una carpeta `views` en la que se ubicaran los archivos relacionados con las vistas de la aplicacion.
