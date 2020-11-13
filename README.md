# Implementación del clasificador KNN y NaiveBayes

Este es un proyecto para la materia de tratamiento de la información. Impartida por el profesor Arturo Olvera López en la Benemérita Universidad Autónoma de Puebla. En el periodo escolar otoño 2020.

El proyecto fue realizado por el alumno José Fernando Flores López.

## Descripción del proyecto

### Implementación de los clasificadores
El proyecto consistió en implementar un clasificador, en este caso se eligió **knn**, al igual que utilizar la implementación de otra persona de un clasificador distinto al implementado, en este caso, se utilizo el [clasificador Ingenuo de Bayes](https://github.com/mljs/naive-bayes) implementado por el usuario de github [ml.js](https://github.com/mljs)

### Evaluación de precisión

Para poder medir la precisión de los algoritmos se utilizaron 2 metodos:

1. Un conjunto de prueba
2. Validacion cruzada

Y para la visualización de las pruebas se hace mediante un matriz de confusión

## Instrucciones de uso

**Por el momento el sistema no ha sido desplegado, pero espero en un futuro ponerlo en heroku o algun otro lugar para su uso**

### Pasos iniciales

Primero deberá subir el archivo con el conjunto de prueba en la sección correspondiente.
 El archivo debe estar en formato csv, sin cabeceras, y debe incluir el valor de la clase de cada elemento como su último atributo.

 Para la implementación de k-nn es necesario un número de vecinos y una funcion de distancia. por defecto el número de vecinos a considerar es 1, y la función de distancia es la **Euclediana**

 El número de los vecinos a considerar puede estar entre 1 y 10. Mientras que las opciones para la funcion de distancia son:

 1. Euclediana
 2. Manhatthan
 3. Chebychev

 ### Selección de prueba

 El siguiente paso es elegir la forma de evaluar el modelo. Se puede elegir entre usar un conjunto de prueba o validación cruzada

 #### Conjunto de Prueba

 Para el utilizar el conjunto de prueba solo debe marcar la casilla *subir conjunto de prueba* y subir su archivo en el espacio correspondiente. El archivo debe tener el **mismo** formato que el del conjunto de entrenamiento.

 #### Validación cruzada

 Para seleccionar la validación cruzada solo es necesario selecciónar la opcion *Validación Cruzada* y seleccionar la cantidad de pliegues en el que se va a dividir el conjunto de entrenamiento. El total de pliegues puede tomar valores entre 2 y 10, teniendo valor por defecto de 5


 ### Evaluación del modelo

 Una vez haya realizado los pasos anteriores y haya enviado los datos, se redirigirá a una página con 2 matrices de confusión. La matriz de la derecha son los resultados del clasificador ingenuo de bayes. Mientras que la tabla de la derecha muestra los resultados del clasificador KNN.

 **NOTA**: Si se utiliza el método de validación cruzada, solo se mostrará la matriz de confusión con los mejores resultados


 ## Instrucciones de instalación

 Para poder usar esta implementación se debe clonar el repositorio de manera local con  `git clone https://github.com/JFernando122/Clasificador-knn.git` y utlizar el comando `npm init`

