### TECHNICAL TEST BE

### V1.0.0

### PRERREQUISITOS

*   Tener Git instalado
*   Tener Node js Instalado (v​ 12.18.1​ o superior)
*   Clonar el repositorio con la url que has recibido vía email
*   Desde la consola, Ve a la carpeta src y ejecuta el comando: npm install
*   Desde la consola, ejecuta el comando: npm run test:watch, and happy code! :)

**(S) RESTFUL FEATURE<BR />**
El resto consiste en construir un par de endpoints (/books y /reports) en un servidor Express que nos permita obtener cierta información sobre los libros expuestos en una biblioteca, ademas de un reporte sobre su historial de uso. A continuación se listan las instrucciones para cumplir con el reto:<br />- (s) Crear un endpoint llamado /books que permita LISTAR los libros por rango de pages <code>(orderBy: { pages: asc | desc }) </code>. De los recursos entregados por el endpoint GET https://hiring.condorlabs.io/api/books<br />- (m) Crear un endpoint llamado /books que permita FILTRAR los libros por rango de pages, Ejemplo: Listar libros que tengan entre 170 y 180 páginas.<code>({ filterBy: 'pages', from: 170, to: 180})</code> De los recursos entregados por el endpoint GET https://hiring.condorlabs.io/api/books<br />- (l) Generar un reporte que cumpla con la siguientes especificaciones:    <ul><li>Debes construir y exportar una función en <code>src/test/handler.js</code> llamada “top3MostLentBooksQ22021()”, esta función debe hacer un request de tipo GET a esta url: https://hiring.condorlabs.io/api/books/logs con el fin de obtener la data necesaria para calcular y devolver un arreglo con los 3 libros más prestados en el segundo semestre (abril-junio) del año 2021</li>    <li>El resultado de la funcion top3MostLentBooksQ22021()  debe ser retornado desde el path /report</li></ul><br />

**UNIT TESTING**

En el repositorio puedes encontrar unos unit test preconstruidos que al inicio del test están en rojo, tu misión es ponerlos todos en verde agregando el código que satisface los requerimientos, tú NO ​debes modificarlos ya que están creados con el objetivo de evaluar las funcionalidades requeridas. Abre una consola y ejecuta el comando debajo para mantener los test corriendo mientras escribes el código. npm run test:watch O ejecutarlos cuando hayas finalizado la prueba. npm run test

Abre una consola y ejecuta el comando debajo para mantener los test corriendo mientras escribes el código.
```
npm run test:watch
```
O ejecutarlos cuando hayas finalizado la prueba.
```
npm run test
```

**EXAMPLE:**

En este caso, puedes ver un ejemplo de cómo jest muestra la interfaz mientras corre los tests.

<img src="https://user-images.githubusercontent.com/1033099/72554309-3fab8a80-384f-11ea-836c-86804973b64f.png" width="720px" height="520"/>
