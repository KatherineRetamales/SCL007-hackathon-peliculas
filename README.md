# FilmShare
FilmShare es una aplicación que combina la funcionalidad de un buscador de información de peliculas junto con una red social que sirva tanto para coordinar a amantes del cine, como a un grupo de amig@s que busque pasar un buen rato compartiendo una pelicula.

## HISTORIAS DE USUARIO

### MERCEDES

Mercedes, de 34 años, ha sido siempre fan del cine. Desde el colegio siempre se ha hecho tiempo para, al menos 1 vez a la semana, ir al cine a ver alguna pelicula de estreno, esto le ha permitido estar siempre al día en cuanto al mundo cinematográfico. Desde el inicio de este año ha estado sobrecargada de tareas en su trabajo, lo cual le ha impedido contonuar con su ritual de peliculas semanales y ha perdido la cuenta de qué peliculas le quedan pendientes para ver. A Mercedes le gustaría poder ayudarse a recordar qué peliculas ya ha visto y que peliculas tiene pendientes, para organizar mejor el poco tiempo disponible que tiene ultimamwente.

**Como:** Mercedes, como fanática del cine.

**Qué:** Quiere una aplicación que le permita llevar la cuenta de qué peliculas ha visto y qué peliculas le falta ver.

**Por qué:** Porque ya no tiene tiempo de ir siempre al cine y se le hace dificil llevar la cuenta de las peliculas que quiere ver.

#### DEFINICIÓN DE TERMINADO

- Que la página muestre una base de datos de peliculas.
- Que la página muestre las peliculas a estrenarse durante el año en curso.
- Que la página permita identificar al usuario.
- Que la página permita al usuario crear una lista de peliculas pendientes para ver.
- Que la página permita al usuario crear una lista de peliculas ya vistas.

### CARMEN (*"Hacker Edition"*)
Carmen, de 25 años, no es particularmente fanática de las películas. De lo que **si** es una **gran fan** es de las tardes con sus amigas en las cuales se juntan a conversar y ver peliculas. Generalmente planifican con anticipación, coordinan un día, quien llevara cada cosa, en casa de quien se juntarán, etc.
Ultimamente han tenido problemas para decidir qué película verán, y les gustaría una plataforma que les **permitiera a todas estar sintonizadas con las propuestas de las demas** para así decidir la pelicula que verán en cada ocasión.

**Como:** Carmen, como persona socialmente activa que le gusta pasar el tiempo con sus amigas viendo películas.

**Qué:** Quiere una aplicación que le permita a ella y sus amigas coordinar con facilidad que película veran cuando se junten.

**Por qué:** Porque ultimamente les ha costado mucho coordinar y decidir qué pelicula verán.

#### DEFINICIÓN DE TERMINADO

- Que la página muestre una base de datos de peliculas.
- Que la página permita buscar una película en particulas.
- Que la página muestre información sobre la pelicula como el año, sinopsis, director y actores.
- Que la página permita crearse un usuario.
- Que al usuario se le permita crear una lista de peliculas y compartirla en modo público o privado (solo determinadas personas).
- Que la página permita a las personas que pueden ver una lista de peliculas privada votar por una de ellas, para ver cual es la más popular.
- Que la página guarde un recuento de (pelicula que ha ganado una votación & pelicula por la que votaste)/ total de peliculas.

## INVESTIGACION Y PLANIFICACIÓN

Para el diseño de nuestro producto nos inspiramos principalmente en Spotify, en el sentido de ser esta una aplicación que permite crear listas de música, compartirlas, votar por ellas, ver que estan escuchando tus amigos, musica popular en tu región, etc. 

Junto con revisar Spotify, también investigamos sobre otras redes sociales para ver las formas de interconección y comunicación que tenian los usuarios. Lo anterior nos ayudó a definir algunas funcionalidades que estimamos como de *proyección* en nuestra aplicación, como la posibilidad de compartir las listas de peliculas con tus amigos, o compartirlas publicamente; también es esperable desarrollar una funcionalidad que permita a un grupo de amigos votar por ciertas peliculas propuestas por el grupo para así decidir, por ejemplo, que pelicula ver en una determinada ocasión.

En cuanto a la planificación se decidió dedicar el primer día a definir en concreto el concepto de la página así como a realizar una investigación sobre los aspectos técnicos que necesitabamos para desarrollarla, en definitiva, decidir si era posible en el tiempo establecido presentar un producto que reflejara nuestro PMV y el potencial de crecimiento de la página. 

Los dias siguientes se dedicaron a codear, priorizando las tareas que reflejaban la primera historia de usuario (Mercedes), la cual consideramos que representaba nuestro PMV.



## FLUJO DE LA APP

Para desarrollar el flujo de la aplicación se realizaron sketchs a mano sobre el contenido de la página, donde estaría posicionada cada información y como sería el despliegue de las distintas secciones.

A medida que se fue traspasando el flujo a código se hicieron evidentes algunas fallas que no se advirtieron en un inicio por lo que algunos detalles fueron modificados sin realizar un nuevo diagrama.

## TESTEO CON USUARIOS

Se aplicó un test de usabilidad a un usuario con la aplicación con algunas de sus funcionalidades activadas (display pagina inicial y buscador funcionando), y explicando las demas funcionalidades con sketchs de la página. Recibimos los siguientes comentarios:

1. El usuario manifestó que le gustaría que se pudiera agregar directamente las peliculas desde la sección de búsqueda general, sin necesidad de acceder previamente a la busqueda de la sección de creación de listas.
2. En la sección de creación de listas y la de configuración de cuenta de usuario no estaba claro cuando cada operacion (crear lista y modificar configuración de cuenta) había sido exitosa ya que la página no mostraba ningun cambio.
3. El color del fondo de la página (blanco), le parecía demasiado brillante.
4. El usado en el texto de la tarjetas de peliculas era demasiado claro, el usuario no podía leer con claridad.
5. Al usuario le gustaría que se permitiera busqueda por genero además de por titulo.

## ITERACIÓN POST TESTEO

Luego del testeo y en consideración a las limitaciones de tiempo se realizaron los siguientes cambios.

- Se arreglaron los colores de las tarjetas, generando más contraste entre el texto y el fondo, también se cambio el color de fondo de la página, manteniendolo en un tono claro pero menos brillante que el blanco.

- Se agregó una página que informaba cuando una determinada operación había sido realizada con éxito luego de crear una nueva lista y actualizar la información de la cuenta.

## DISTRIBUCIÓN DEL TRABAJO

En cuanto a la distribución del trabajo lo fuimos determinando de acuerdo a quien tenia mas tiempo disponible en cada momento y **las tareas mas dificiles como la interaccion de todo con Firebase las realizamos juntas porque dos cabezas piensan mejor que una.**

- (Día 1) Evaluación sobre las posibilidades de reales de llevar a cabo nuestra idea, incluye estudio sobre bases de datos y su posibilidad de que interactuen con JS y tecnologías alternativas como Firebase: **Ambas: Raquel y Katherine**

- (Día 1) Estructura básica HTML, función que muestra inicialmente las tarjetas, barra de navegación, login: **Raquel**

- (Día 1 y 2) Página que permite creación de listas: **Katherine**

- (Día 1 y 2) Página de configuración de información de la cuenta: **Raquel**

- (Día 2) Definición de los permisos de la página asociados a cada usuario, estructura de Firebase en que se almacenaran la información de los usuarios y las listas: **Raquel**

- (Día 2) Integración de la función de creación de listas con Firebase: **Ambas: Raquel y Katherine**

- (Día 2) Integración de la página de configuración de información de usuario con Firebase: **Ambas: Raquel y Katherine**

- (Día 2) Testeo con Usuario: **Raquel**

- (Día 3) Página que permite ver las listas ya creadas y su contenido: **Raquel**

- (Día 3) Integración de la página que permite ver las listas ya creadas y su contenido con Firebase: **Ambas: Raquel y Katherine**

- (Día 3) Revisión de la pagina, ver que todos los clicks mostrar e hicieran lo que tenian que mostar y hacer: **Katherine**

- (Día 3) Corrección de los errores encontrados al revisar que todo funcionara correctamente: **Ambas: Raquel y Katherine**

- (Día 3) Elaboración de README: **Raquel**