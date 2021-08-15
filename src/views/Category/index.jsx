export const CategoryView = ({ posts, ...props }) => {
    return (
        <div>
            Category
            <ul>
                { posts.map(({title, url}) =><li key={url}>
                    <a href={url} is="a-link">{title}</a>
                </li>) }
            </ul>
        </div>
    )
}
