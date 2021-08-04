import './script.js'
import './style.css'

const BlogView = (props) => {
    return (
        <div id="blog">
            <h1> blog! </h1>
        </div>
    )
}

export const getStaticProps = () => {
    return {
        data: {
            title: "Blog"
        }
    }
}

export default BlogView