export const Html = ({children,...props}) => 
<>
<html lang="es" {...props}>
    { children }
</html>
</>

export const Head = ({ children, css }) =>
<head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/assets/css/global.css" />
    <link rel="stylesheet" href={css} />
    { children }
</head>

const Scripts = ({ js }) =>
<>
<script src="/client-router.js" defer={true}></script>
<script src={js} defer={true}></script>
</>

export const Document = ({ children, css, js }) => 
<Html>
    <Head css={css}/>
    <body>
        { children }
        <Scripts js={js} />
    </body>
</Html>

export default Document