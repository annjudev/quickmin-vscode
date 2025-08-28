# Quickmin

Quickmin es una extensión para Visual Studio Code que permite minificar archivos HTML y JavaScript utilizando la especificación actual de ECMAScript.

## Comando principal


**Minify (Quickmin)**

El comando detecta automáticamente si el archivo es **HTML** o **JavaScript** y aplica el minificado correspondiente:
- **HTML**
- **JavaScript** (ECMAScript actual)

## Minificado de JavaScript

Por defecto, el minificador elimina todas las llamadas a `console.log()` para reducir el tamaño y limpiar el código. Si deseas conservar los `console.log()`, añade el siguiente comentario en la primera línea del archivo:

```js
// quickmin-ignore
```

Esto hará que todos los `console.log()` permanezcan en el archivo minificado.

## Próximas actualizaciones

- Se agregará soporte para minificar archivos **CSS**.

## Características

- Minificación rápida y eficiente
- Preservación selectiva de `console.log()`
- Soporte para HTML y JavaScript moderno
- Fácil de usar desde el comando Minify(Quickmin)

## Licencia

MIT