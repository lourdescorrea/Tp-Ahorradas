# Ahorradas! 📊

![alt text](assets/imagenreadme.PNG)


**Te invitamos a visitarnos haciendo click 🔗 [aqui](https://lourdescorrea.github.io/Tp-Ahorradas/)!**

## Introducción 📌
***

Ahorradas es el segundo proyecto correspondiente al módulo de JavaScript en el curso de front-end dictado por adaITW! 

Este es un controlador de gastos, en el cual el usuario podrá registrar todas sus operaciones tanto ingresos como egresos, ver un balance de los mismos, filtrar la información que desee, crear categorías específicas según sus necesidades, también cuenta con un reporte general de sus actividades en base al total de sus movimientos. 

Hasta el momento es el proyecto más grande en el que trabajamos, nuestra primera experiencia en equipo; Durante el trayecto nos encontramos con muchos desafíos, cosas por aprender, y muchas ganas para poder llegar a este punto de nuestro desarrollo como futuras programadoras front-end!

Los invitamos a descubrir en profundidad de que se trata y como fue ejecutado a continuación!

## Desarrollo 📌
***

- HTML5 como base del proyecto y maquetado ⚒️
- JAVASCRIPT desarrollo lógico y funcional 📚
- TAILWIND y CSS estilado  🖌️
- GITHUB herramienta para trabajar en conjunto 📂	

## Funcionalidades ⚙️
***

Este proyecto cuenta con tres secciones centrales, a las mismas se puede acceder desde el nav, estas son:

- Balance
- Categorías 
- Reportes

### Balance 📌

![alt text](assets/balancereadme.PNG)

Esta pantalla cuenta con tres sub secciones:

- Operaciones
- Balance
- Filtros

La sección de Operaciones, a través de un formulario, el usuario podra registrar sus movimientos financieros, los mismos se almacenan sobre un array de objetos alojado en localStorage, de forma tal, que se mantenga un registro de sus interacciones incluso cuando se cierre el navegador y se lo vuelva a abrir; 

Las operaciones ya registradas cuentan con la posibilidad de ser editadas y eliminadas. Esta sección en el caso de no registrar operaciones mostrara una imagen. 

La sección de Balance, donde se muestra el acumulado de ganancias, y de gastos así como también el cálculo de la diferencia entres ambos; Aquí trabajamos con un ciclo for of para filtrar y devolver los valores deseados. 

Por ultimo la sección de Filtros donde el usuario seleccionara lo que desea visualizar en la pantalla principal, contamos con filtros de tipo, categoría, y fecha; Ademas de la opcion de ordenar, que puede ser alfabéticamente, por monto y por antigüedad.

 
### Categorías 📌

![alt text](assets/categoriesreadme.PNG)

La sección de Categorías cuenta con la posibilidad de agregar nuevas categorías, editar las pre existentes y eliminarlas, al igual que en Operaciones trabajamos con un array de objetos almacenado sobre localStorage

### Reportes 📌

![alt text](assets/reportesreadme.PNG)

La sección de reportes es un resumen de todos los movimientos realizados sobre la cuenta, tenemos resúmenes, totales por categoría y totales por mes.


*Gracias por llegar hasta acá y espero que lo disfruten!* 😊

Desarrollado con 💜 por Lourdes Correa y Lucia Martinez 