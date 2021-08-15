import './script.js'
import './style.css'

export const BlogView = ({ categories }) => {
    return (
        <div>
            Blog
            <ul>
                { categories.map(cat =><li key={cat}>
                    <a href={'/blog/'+cat} is="a-link">{cat}</a>
                </li>) }
            </ul>
        </div>
    )
}
