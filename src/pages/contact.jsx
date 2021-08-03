import { ContactView } from '../views/Contact'

const ContactPage = props => (
    <ContactView  {...props} />
)

export const getStaticProps = () => {
    return {
        data: {
            title: "Darwin - Contact"
        }
    }
}

export default ContactPage