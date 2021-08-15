const Link = ({ text, href}) => 
<li>
    <a href={href || '/'+text.toLowerCase() } is="a-link">{text}</a>
</li>

export const Header = () => {
    return (
        <header id="header">
            <a href="/" is="a-link">DarwinVA</a>
            <nav>
                <ul>
                    <Link text="Servicios" />
                    <Link text="Portafolio" />
                    <Link text="Contacto" />
                    <Link text="Blog" />
                </ul>
            </nav>
        </header>
    )
}
