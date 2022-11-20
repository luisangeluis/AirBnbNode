# RUTAS
- /api/v1/users
- /api/v1/users:id
- /api/v1/users/me

- /api/v1/auth/login
- /api/v1/auth/register
- /api/v1/auth/password-recovery
- /api/v1/auth/verify-account

- /api/v1/users
- - GET

- /api/v1/users/:id
- - GET 
- - PUT (ADMIN)
- - DELETE (ADMIN)

- /api/v1/users/me
- - GET 
- - PUT
- - PATCH
- - DELETE

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST
- - PATCH

# Paths de mi usuario  a traves de mi aplicación

[✔]Registrar mi usuario.
[✔]Logguear mi usuario.

### Usuario sin sesión iniciada
1. Ver los lugares.<!--Ready-->
2. Puede ver la informacion de un lugar.<!--Ready-->

### Guest
1. Ver los lugares<!--Ready-->
2. Puede ver la informacion de un lugar.<!--Ready-->
3. Reservar.<!--Ready-->
4. Dar un score una vez finalizada la reservación. <!--Ready-->

### Host
1. Ver los lugares<!--Ready-->
2. Puede ver la informacion de un lugar.<!--Ready-->
3. Crear lugares.<!--Ready--> 
4. Cancelar reservaciones donde es host.<!--Ready-->
5. Puede ver perfiles de usuario.<!--Ready-->
6. Puede ver todos los lugares que le pertenecen.<!--Ready-->
7. Editar el lugar.<!--Ready-->
8. Puede eliminar el lugar.

### Admin
1. Ver los lugares<!--Ready-->
2. Puede ver la informacion de un lugar.<!--Ready-->
3. Puede ver perfiles de usuario.<!--Ready-->
4. Editar el lugar.
<!-- Elimina completamente el lugar -->
5. Puede eliminar el lugar.
<!-- Building the controllers of roles -->
6. Modificar roles.  
7. Eliminar un usuario.
8. Modificar un usuario. 
9. Ver los lugares de los host.

### Accommodations

/api/v1/accommodations

/
- GET
- POST

/:id
- GET
- DELETE
- PUT
- PATCH

/:id/available/?arrival=value&departure=value
- GET

/:id/make-reservation
- POST


