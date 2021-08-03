export const Html = ({children,...props}) => 
<>
<html {...props}>
    { children }
</html>
</>

export const Head = ({ children, css }) =>
<head>
    <link rel="stylesheet" href={css} />
    { children }
</head>

const Scripts = ({ js }) =>
<script src={js}></script>

export const Document = ({ children, css, js }) => 
<Html>
    <Head css={css}/>
    <body>
        { children }
        <Scripts js={js} />
    </body>
</Html>

export default Document