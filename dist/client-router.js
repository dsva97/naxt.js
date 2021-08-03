window.customElements.define('a-link', class ALink extends HTMLAnchorElement {
    static routes = {}
    connectedCallback() {
        if(this.isConnected) {
            this.addEventListener('click', async e =>{
                e.preventDefault()
                const { pathname } = new URL(this.href)
                if(this.href !== window.location.href) {
                    var content = ALink.routes[pathname]
                    if(!content) {
                        const pathToComplete = pathname === '/' ? '/index' : pathname
                        await fetch('/pages'+pathToComplete+'/index.html').then(res=>res.text())
                        .then(_content => {
                            ALink.routes[pathname] = _content
                            content = _content
                            // CSS
                            const link = document.createElement('link')
                            link.setAttribute('rel', 'stylesheet')
                            link.setAttribute('href', '/resources'+pathToComplete+'/script.css')
                            // JS
                            const script = document.createElement('script')
                            script.setAttribute('src', '/resources'+pathToComplete+'/script.js')

                            // Append
                            document.head.appendChild(link)
                            document.body.appendChild(script)
                        })
                    }
                    document.getElementById('root-router').innerHTML = content
                    
                    history.pushState({}, '', pathname)
                }

                return false
            })
        }
    }
}, { extends: 'a' })