import { ServiciosView as ServiciosPage } from '../views/Servicios'

export const getStaticProps = () => {
    return {
        props: {
            title: 'INICIO XDD'
        }
    }
}

export const Head = () => 
<>
    <title>DarwinVA - Servicios</title>
    <meta name="description" content="DarwinVA ofrece servicios de Ecommerce, web informativas, correo corporativo, base de datos, CRM, y software A MEDIDA para ti, tu negocios y tus clientes." />
</>

export default ServiciosPage