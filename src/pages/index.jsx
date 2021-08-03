import { IndexView } from '../views/Index'

const IndexPage = props => (
    <IndexView {...props} />
)

export const getStaticProps = () => {
    return {
        data: {
            title: "Darwin - Inicio"
        }
    }
}

export default IndexPage