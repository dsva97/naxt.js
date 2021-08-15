import { ContactoView as ContactoPage } from '../views/Contacto'

export const getStaticProps = () => {
    return {
        props: {
            title: "Contacto"
        }
    }
}

export const Head = () => 
<>
    <title>DarwinVA - Contactoo</title>
</>

export default ContactoPage