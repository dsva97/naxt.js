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
    <link rel="preload" href="/routes.json" as="fetch" type="application/json" crossOrigin="anonymous" />
    <link rel="stylesheet" href="/assets/css/global.css" />
    { css ? <link rel="stylesheet" href={css} /> : null }
    { children }
</head>

const Scripts = ({ js }) =>
<>
<script src="/client-router.js" defer={true}></script>
{ js ? <script src={js} defer={true}></script> : null }
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