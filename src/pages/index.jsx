export { default } from '../views/Index'
// export * from '../views/Index'

export const getStaticProps = async () => {
    return {
        data: {
            title: "Index"
        }
    }
}