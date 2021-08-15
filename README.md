# How to use this SSG Boilerplate project inspired on Next JS?

1) Get any static file server and serve the "/dist" directory of this project
2) Run "yarn start" or "npm start"
3) Code! 


## Limitations
- ¿ ERROR ? "Refused to apply style from 'http://127.0.0.1:5500/__/index/script.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled."
    - Only import a empty script.js and a empty style.css in each page view module.

- In development: API (fallback, revalidate), hot reload without small bugs, etc.


## Warning
- Esto es un experimento de un Vanilla Lover.
- Hay muchas cuestiones sobre el manejo de módulos que no se han resuelto de la mejor forma, pero funciona. Para resolverlo bien habría que trabajar en bajo nivel con el transpilador/compilador. Usé babel y esbuild para evitar este trabajo temporalmente.
- Esta es la prueba de concepto de un boilerplate que parecía obvio que debería de exister para un vanilla lover que encontró Next JS en su vida; o, al menos, así lo ve su, quizá, no-tan-humilde autor. 
