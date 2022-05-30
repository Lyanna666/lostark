# Lostark generador de equipos

Lost Ark es un juego de rol y acción online.

Este proyecto es una página web basada en dicho juego que permite al usuario generar y organizar de forma automática y/o manual los equipos de jugadores, así como los personajes con los que van a jugar.

Para formar un equipo es Lost Ark es necesario que se cumplan ciertas condiciones.

La idea del proyecto es que cada grupo de amigos pueda selecionar en un calendario semanal los días y horas que está disponible para jugar y automaticamente se formarán los equipos de la forma más óptima.

### Condiciones para formar un equipo

- Un equipo tiene como máximo 4 miembros y como mínimo 2.
- Cada equipo puede tener como máximo **1 personaje tipo support y 3 personajes tipo daño**.
- Un personaje solo puede estar en un equipo.
- Cada usuario tiene múltiples personajes pero un personaje solo puede usarse una vez por semana.
- Los equipos con más miembros tienen prioridad, es decir un equipo de 4 personas tiene prioridad sobre uno de 3.

## Partes del proyecto

### Parte pública (Usuario no ha hecho Login)

- Personajes:
  Los usuarios pueden ver las distintas clases disponibles.

Cuando pulsan en ellas aparece un pop-up indicando que tienen que hacer Sign in / Sign up para poder crear un nuevo personaje.

- Login / Registro:
  Los usuarios pueden ver un formulario para registrarse o para iniciar sesión.

### Parte privada (Usuario ha hecho Login)

- Personajes:
  Al igual que en la parte pública los usuarios pueden ver las distintas clases disponibles.

Cuando pulsan sobre cualquiera de las clases se abre un formulario para crear personajes donde pueden escribir el nombre de su nuevo personaje.

En la columna izquierda de la páginas los usuario pueden ver todos los personajes creados.

- Calendarios:
  Los usuarios pueden ver todos los calendarios disponbibles, ya sea creados por ellos o por otros usuarios, también pueden crear nuevos calendarios o eliminarlos.

Dentro del calendario pueden añadir eventos, modificarlos o eliminarlos.

Todos los usuarios pueden ver todos los eventos pero solo pueden modificar o eliminar los suyos.

- Equipos:
  Mediante un IA se generan automaticamente los equipos de la forma más óptima teniendo en cuenta las condiciones descritas en la descripción inicial.

- Perfil:
  Los usuarios pueden ver sus datos y modificarlos.

## Desarrollo

### Proceso de planificación

1. **Diseño:** El diseño dibujado es únicamente una idea muy general del proyecto. A medida que el desarrollo avance el diseño puede cambiar.

2. **Base de dato:** La base de datos es un base de datos no relacional y ha sido hecha desde Firebase.
