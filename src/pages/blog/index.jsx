import { BlogView as BlogPage } from '../../views/Blog'
import postsData from '../../posts.json'

export const getStaticProps = () => {
    const categories = Object.keys(postsData)
    return {
        props: {
            categories
        }
    }
}

export default BlogPage