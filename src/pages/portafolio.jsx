import { PortafolioView as PortafolioPage } from '../views/Portafolio'

export const getStaticProps = () => {
    return {
        props: {
            title: 'Portafolio XDD'
        }
    }
}

export const Head = () => 
<>
    <title>DarwinVA - Portafolio</title>
</>

export default PortafolioPage