export const Html = ({children,...props}) => 
<>
<html lang="es" {...props}>
    { children }
</html>
</>

export const LinkCSS = ({href, ...props}) => 
<link onload="this.onload=null;this.rel='stylesheet'" 
    rel="preload" href={href} as="style" />

const textContent = `
document.getElementById("globalCss").onload = function () {
    this.onload=null; this.rel='stylesheet'
}
document.getElementById("pageCss")?.onload = function () {
    this.onload=null; this.rel='stylesheet'
}
`
export const Head = ({ children, css }) =>
<head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preload" href="/assets/css/global.css" as="style" rel="stylesheet" />
    { css ? <link rel="preload" href={css} as="style" rel="stylesheet" /> : null }
    { children }
</head>

const Scripts = ({ js }) =>
<>
    <script src="/client-router.js"></script>
    <script src="/assets/js/global.js"></script>
    { js ? <script src={js}></script> : null }
</>

export const Document = ({ children, head, css, js }) => 
<Html>
    <Head css={css}>
        { head }
    </Head>
    <body>
        { children }
        <Scripts js={js} />
    </body>
</Html>

export default Document