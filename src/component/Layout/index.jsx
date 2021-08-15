import { Header } from './Header'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
    return (
        <div id="container">
            <Header />
            <main id="root-router">{children}</main>
            <Footer />
        </div>
    )
}