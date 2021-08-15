import { IndexView as IndexPage } from '../views/Index'

export const getStaticProps = () => {
    return {
        props: {
            title: 'INICIO XDD'
        }
    }
}

export const Head = () => 
<>
    <title>DarwinVA - Inicio</title>
</>

export default IndexPage