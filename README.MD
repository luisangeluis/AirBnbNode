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
1. Ver los lugares.
2. Puede ver la informacion de un lugar.

### Guest
1. Ver los lugares
2. Puede ver la informacion de un lugar.
3. Reservar.
4. Dar un score una vez finalizada la reservación.

### Host
1. Ver los lugares
2. Puede ver la informacion de un lugar.
3. Reservar.
4. Dar un score una vez finalizada la reservación.
5. Crear lugares.
6. Cancelar reservaciones donde es host.
7. Puede ver perfiles de usuario.
8. Puede ver todos los lugares que le pertenecen.
9. Editar el lugar.
10. Puede eliminar el lugar.

### Admin
1. Ver los lugares
2. Puede ver la informacion de un lugar.
3. Reservar.
4. Dar un score una vez finalizada la reservación.
5. Puede ver perfiles de usuario.
6. Editar el lugar.
7. Puede eliminar el lugar.
8. Modificar roles.
9. Eliminar un usuario.
10. Modificar un usuario.
11. Ver los lugares de los host.

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


