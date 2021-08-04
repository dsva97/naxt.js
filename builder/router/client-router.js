class ALink extends HTMLAnchorElement {
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
                            if(_content) {
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
                            } else {
                                return fetch('/pages/404/index.html').then(res=>res.text())
                                .then(_content=> {
                                    if(_content) {
                                        ALink.routes[pathname] = _content
                                        content = _content
                                    } else {
                                        content = "ERROR 404 - Not Found"
                                        console.error(err)
                                    }
                                })
                            }
                        }).catch(err => {
                            return 
                        })
                    }
                    document.getElementById('root-router').innerHTML = content
                    
                    history.pushState({}, '', pathname)
                }

                return false
            })
        }
    }
}
ALink.routes[window.location.pathname] = document.getElementById('root-router').innerHTML
window.customElements.define('a-link', ALink, { extends: 'a' })