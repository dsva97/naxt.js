import './script'
import './style.css'

const ContactView = (props) => {
    return (
        <div id="contact">
            <h1> Contact 2! </h1>
        </div>
    )
}

export const getStaticProps = async () => {
    return {
        data: {
            title: "Contact"
        }
    }
}

export default ContactView