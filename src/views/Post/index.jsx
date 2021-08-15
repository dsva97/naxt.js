import './script.js'
import './style.css'

export const PostView = ({ post: { title, content }, ...props }) => {
    return (
        <div id="PostView">
            <article>
                <h1>{title}</h1>
                <main dangerouslySetInnerHTML={{ __html: content }}></main>
            </article>
        </div>
    )
}
