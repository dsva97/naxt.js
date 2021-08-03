import React from 'react'

const App = ({ children }) =>
<>
    <header>
        <h1>Logo</h1>
        <nav>
            <ul>
                <li><a href="/" is="a-link">Inicio</a></li>
                <li><a href="/contact" is="a-link">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main id="root-router">{children}</main>
    <footer>Footer</footer>
</>

export default App
