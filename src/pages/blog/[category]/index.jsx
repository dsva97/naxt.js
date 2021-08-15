import { CategoryView as CategoryPage } from '../../../views/Category'
import postsData from '../../../posts.json'

export const getStaticPaths = () => {
    return {
        paths: Object.keys(postsData).map(category => ({ params: { category }})),
        fallback: true
    }
}

export const getStaticProps = ({ params: { category } }) => {
    return {
        props: {
            posts: Object.values(postsData[category])
        }
    }
}

export default CategoryPage