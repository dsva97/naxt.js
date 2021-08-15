import { PostView as PostPage } from '../../../views/Post'
import postsData from '../../../posts.json'

export const getStaticPaths = () => {
    const paths = []
    for(const category in postsData) {
        const posts = postsData[category]
        for(const post in posts) {
            paths.push({ params: { post, category }})
        }
    }
    return {
        paths,
        fallback: true
    }
}
export const getStaticProps = ({ params: { category, post }}) => {
    return {
        props: {
            post: postsData[category][post]
        }
    }
}

export default PostPage


/*
const argumento = {
    params: {
        ['[category]/[post]']: 'string',
    },
    preview: true,
    previewData,
    locale,
    locales,
    defaultLocale
}

const retorna = {
    props: {},
    revalidate: true,
    notFound: true,
    redirect: {
        destination: '/',
        permanent: false,
    },
}
*/