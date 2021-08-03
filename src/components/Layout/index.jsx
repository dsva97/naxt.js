export const Layout = ({ children }) => {
    return (
        <>
            <header>
                <h1>Logo</h1>
                <nav>
                    <ul>
                        <li>Saludo-1</li>
                        <li>Saludo-2</li>
                        <li>Saludo-3</li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
            <footer>Footer</footer>
        </>
    )
}
