# Project Name

Re-usa

## Description

Re-Usa es una app de intercambio de productos de segundamano en los que los usuarios pueden crear anuncios publicando aquellos artículos que ya no necesitan/usan y permite a otros usuarios contactar mediante mensaje para llegar a un acuerdo de intercambio y así evitar el consumismo y la creación de residuos innecesarios.

## User Stories

-  **404:** Esta página se muestra si el usuario trata de acceder a una ruta que no existe en la página
-  **Registro:** Como usuario puedo crear una nueva cuenta de usuario en la app
-  **Acceso:** Como usuario puedo autenticarme con mis credenciales para obtener acceso a la parte privada de la app
-  **Cerrar Sesión:** Como usuario puedo cerrar sesión en la plataforma cuando ya no necesite usarla
-  **Añadir anuncios** Como usuario puedo añadir anuncios para que el resto de usuarios pueda verlos
-  **Ver anuncios** Como usuario puedo ver todos los anuncios que hay disponible en la plataforma
-  **Buscar anuncios** Como usuario puedo filtrar los anuncios según su categoría o por palabra clave 
-  **Añadir anuncio favorito** Como usuario puedo añadir anuncios de otros usuarios a una lista de favoritos
-  **Ver mis favoritos** Como usuario puedo ver todos los anuncios que tengo añadidos a favoritos
-  **Filtrar favoritos** Como usuario puedo filtrar entre los anuncios favoritos por categoria o palabra clave
-  **Enviar mensajes** Como usuario puedo enviar mensajes a otros usuarios para ponerme en contacto con ellos
-  **Editar y borrar mensajes** Como usuario puedo editar y borrar los mensajes que yo envío
-  **Ver perfil** Como usuario puedo ver mi perfil de usuario 
-  **Editar perfil de usuario** Como usuario puedo editar el perfil de usuario cambiando los datos que se muestran así como la foto de perfil
-  **Eliminar el perfil de usuario** Como usuario puedo decidir eliminar la cuenta borrando con ella todos los anuncios publicados

## Backlog

Ver otros perfiles de usuario:
- Ver los perfiles de los usuarios que suben los anuncios

Añadir mapa mostrando la localización del usuario:
- Ver la localización del usuario

Editar el email y la contraseña
- Poder actualizar la contraseña y el email
  
# Client

## Routes

- / - Home
- /registro - Formulario de registro
- /acceso - Formulario de acceso
- /anuncios - Listar todos los anuncios
- /anuncios/:idProducto - Ver los detalles de un anuncio
- /anuncios/anadir - Añadir un anuncio nuevo
- /anuncios/:idProducto/editar - Editar la información de un anuncio
- /anuncios/favoritos - Listar los anuncios favoritos
- /perfil/:idUsuario - Ver el perfil de usuario
- /perfil/:idUsuario/misAnuncios - Ver los anuncios creados por el usuario
- /perfil/:idUsuario/editar - Editar un anuncio creado por el usuario
- /perfil/:idUsuario/borrarCuenta - Eliminar cuenta de usuario
- /mensajes - Listar todos los mensajes abiertos con otros usuarios
- /mensajes/:idUsuario - Ver todos los mensajes con otro usuario
- /error - Página de error por si el servidor falla
- /* - Página de error 404 por si se navega a una ruta que no existe

## Pages

- Home (publica)
- Registro (Usuarios no registrados)
- Acceso (Usuarios no registrados)
- Listar los anuncios (Usuarios registrados y no registrados)
- Añadir anuncios (Usuarios registrados)
- Editar anuncios (Usuarios registrados)
- Eliminar anuncios (Usuarios registrados)
- Anuncios favoritos (Usuarios registrados)
- Perfil de usuario (Usuarios registrados)
- Editar perfil de usuario (Usuarios registrados)
- Eliminar perfil de usuario (Usuarios registrados)
- Eliminar cuenta (Usuarios registrados)
- Listar mensajes (Usuarios registrados)
- Ver mensajes con un usuario (Usuarios registrados)
- Página 404 (Pública)

## Components

- Carousel 
    - Input: recibe las imágenes de un anuncio
    - Output: Renderiza la visualización de una imagen con dos botones para poder cambiar la imagen que se visualiza
- CloudinaryAdsUploader
    - Input: recibe las imágenes de un anuncio si las hay
    - Output: devuelve las Url de las imágenes que se han subido
- EditMessages
    - Input: recibe la información de un mensaje para editarlo o borrarlo
    - Output: Renderiza el editor de mensajes
- GoBack
    - OutPut: Renderiza un boton que navega a la página anterior que hayamos visualizado
- IsAdFavourite
    - Input: Recibe el Id de un anuncio y los anuncios favoritos de un usuario para compararlos y ver que boton se renderiza
    - Output: Renderiza un botón u otro dependiendo si un anuncio está como favorito o no
- Navbar 
    -Output: Renderiza un navbar u otro dependiendo del tamaño de pantalla donde estemos viendo la app
- OneElement 
    - Input: la información que va a ser renderizada
    - Output: renderiza una carta con la información que recibe
- PrivatePage
    - Input: recibe toda clase de informacion de la app
    - Output: si el usuario está logeado pasar toda la información al siguiente elemento en ser renderizado, sino redirige a home.
- SearchBar
    - Input: recibe la función a la va a enviar la información que se introduzca en sus inputs
    - Output: envía la información de búsqueda a través de props

## IO


## Services

- Auth Service
  - auth.registro(nuevoUsuario)
  - auth.acceso(user)
  - auth.verify()
- Ad Service
  - anuncios()
  - anuncios.:id(id)
  - anuncios.anadir(nuevoAd)
  - anuncios.:id.eliminar(id)
  - anuncios.:id.editar(id, auncioActualizado)
  - anuncios.:id.favorito(id, actualizarFav)
  - anuncios.favoritos()   
- Messages Service
  - mensajes.:id(id)
  - mensajes.:idMensaje(id, mensaje)
  - mensajes()
  - mensajes.:idMensaje.borrarTodos(id)
  - mensajes.:idMensaje(idMensaje)
  - mensajes.:idMensaje(idMensaje, mensajeActualizado)
- Profile Service
  - perfil.:id(id)
  - perfil.:id.misAnuncios(id)
  - perfil.:id.editar(id, perfilActualizado)
  - perfil.:id.delete(id)
- Upload Service 
  - upload(archivoDeImagen)

# Server

## Models

User model

```
username - String // required & unique // trim
email - String // required & unique // lowercase // trim
password - String // required
location - String
profileImage - String
favouritesAds - [ ObjectID<Ad> ]
```

Restaurant model

```
owner - ObjectID<User> 
title - String // required // trim
description - String // required
category - [ String ] // enum
adImages - [ String ]
```

Messages model

```
message - String // required // trim
transmitter - ObjectID<User>
receiver - ObjectID<User>
```

## API Endpoints/Backend Routes

- GET /verify
- POST /auth/registro
  - body:
    - username
    - email
    - password
    - repeatPassword
- POST /auth/acceso
  - body:
    - username
    - password
- GET /perfil/:idUsuario
  - body: (vacío)
  - params: idUsuario
- GET /perfil/:idUsuario/editar
  - body:
    - username
    - location
    - profileImage
  - params: idUsuario
- GET /perfil/:idUsuario/misAnuncios
  - body: (vacío)
  - params: idUsuario
- GET /perfil/:idUsuario/delete
  - body: (vacío)
  - params: idUsuario
- POST /anuncios/anadir
  - body:
    - owner
    - description
    - title
    - category
    - image1
    - image2
    - image3
    - image4
- GET /anuncios
  - body: (vacío)
- GET /anuncios/favoritos
  - body: (vacío)
- PATCH /anuncios/:idProducto/editar
  - body:
    - description
    - title
    - category
    - image1
    - image2
    - image3
    - image4
  - params: idProducto
- GET /anuncios/:idProducto
  - body: (vacío)
  - params: idProducto
- DELETE /anuncios/:idProducto/eliminar
  - body: (vacío)
  - params: idProducto
- PATCH /anuncios/:idProducto/favorito
  - body: (vacío)
  - params: idProducto
- GET /mensajes
  - body: (vacío)
- POST /mensajes/:idUsuario
  - body:
    - message
  - params: idUsuario
- GET /mensajes/:idUsuario
  - body: (vacío)
  - params: idUsuario
- DELETE /mensajes/:idUsuario/borrarTodos
  - body: (vacío)
  - params: idUsuario
- PATCH /mensajes/:idMensaje
  - body:
    - message
  - params: idMensaje
DELETE /mensajes/:idMensaje
  - body: (vacío)
  - params: idMensaje  

## Links

### Figma

[Figma Wireframes](https://www.figma.com/file/J1vINAz0XoUhjUyC5vY9l5/Re-Usa?node-id=8%3A703&t=rWcBKhjkdRK0IYmm-0)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Apleon89/re-usa-client)
[Server repository Link](https://github.com/Apleon89/re-usa-server)

[Deploy Link](https://re-usa.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/17HAKe2bnXugN8nRuGYAEshcpcfDOb_rwTgsl9CYWfas/edit#slide=id.p)