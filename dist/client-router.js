const __ROUTES__ = ({"/404":{},"/blog":{},"/blog/code":{"params":{"category":"code"},"dynamicPath":"/blog/[category]"},"/blog/[category]":{"resourcesFetched":false},"/blog/vida":{"params":{"category":"vida"},"dynamicPath":"/blog/[category]"},"/blog/code/hello-world":{"params":{"post":"hello-world","category":"code"},"dynamicPath":"/blog/[category]/[post]"},"/blog/[category]/[post]":{"resourcesFetched":false},"/blog/code/primer-commit":{"params":{"post":"primer-commit","category":"code"},"dynamicPath":"/blog/[category]/[post]"},"/blog/vida/vive-la-vida-y-no-dejes-que-la-vida-te-viva":{"params":{"post":"vive-la-vida-y-no-dejes-que-la-vida-te-viva","category":"vida"},"dynamicPath":"/blog/[category]/[post]"},"/contacto":{},"/":{},"/portafolio":{},"/servicios":{}});
class ALink extends HTMLAnchorElement {
    static routes = __ROUTES__
    static observers = new Set()
    connectedCallback() {
        if(this.isConnected) {
            this.addEventListener('click', async e => {
                if(!this.hash) {
                    e.preventDefault()
                    let pathname = this.pathname
                    if(pathname !== '/' && pathname.slice(-1) === '/') {
                        pathname = pathname.slice(0, -1)
                    }
                    if(this.href !== window.location.href) {
                        var content = ALink.routes[pathname].content
                        if(!content) {
                            const staticPageDir = (
                                '/__'+
                                (pathname === '/' ? '' : pathname)
                                +'/index'
                            )
                            await fetch(staticPageDir+'/index.html').then(res=>res.text())
                            .then(_content => {
                                if(_content) {
                                    ALink.routes[pathname].content = _content
                                    content = _content
                                    const dynamicPath = routes[pathname]?.dynamicPath
                                    const dynamicPageDir = (
                                        '/__'+
                                        dynamicPath
                                        +'/index'
                                    )
                                    if(dynamicPath) {
                                        if(!routes[dynamicPath].resourcesFetched) {
                                            // CSS
                                            const link = document.createElement('link')
                                            link.setAttribute('rel', 'stylesheet')
                                            link.setAttribute('href', dynamicPageDir+'/script.css')
                                            // JS
                                            const script = document.createElement('script')
                                            script.setAttribute('src', dynamicPageDir+'/script.js')
            
                                            // Append
                                            document.head.appendChild(link)
                                            document.body.appendChild(script)
                                            
                                            routes[dynamicPath].resourcesFetched = true
                                        }
                                    } else {
                                        const resourcesIsFetched = routes[pathname]?.resourcesFetched
                                        if(!resourcesIsFetched) {
                                            // CSS
                                            const link = document.createElement('link')
                                            link.setAttribute('rel', 'stylesheet')
                                            link.setAttribute('href', staticPageDir+'/script.css')
                                            // JS
                                            const script = document.createElement('script')
                                            script.setAttribute('src', staticPageDir+'/script.js')
                                            // Append
                                            document.head.appendChild(link)
                                            document.body.appendChild(script)
                                            routes[pathname].resourcesFetched = true
                                        }
                                    }
                                } else {
                                    return fetch('/__/404/index/index.html').then(res=>res.text())
                                    .then(_content=> {
                                        if(_content) {
                                            ALink.routes[pathname].content = _content
                                            content = _content
                                            
                                            if(!routes[pathname]?.resourcesFetched) {
                                                // CSS
                                                const link = document.createElement('link')
                                                link.setAttribute('rel', 'stylesheet')
                                                link.setAttribute('href', '/__/404/index/script.css')
                                                // JS
                                                const script = document.createElement('script')
                                                script.setAttribute('src', '/__/404/index/script.js')
                                                // Append
                                                document.head.appendChild(link)
                                                document.body.appendChild(script)
                                                routes[pathname].resourcesFetched = true
                                            }
                                        } else {
                                            content = "ERROR 404 - Not Found"
                                            console.error(err)
                                        }
                                    })
                                }
                            }).catch(err => {
                                return err
                            })
                        }
                        document.getElementById('root-router').innerHTML = content
                        
                        ALink.publicate(window.location.pathname, pathname)
                        history.pushState({}, '', pathname)
                    }

                    return false
                }
            })
        }
    }
    static subscribe(fn) {
        ALink.observers.add(fn)
        return () => ALink.static.unsubscribe(fn)
    }
    static unsubscribe(fn) {
        ALink.observers.delete(fn)
    }
    static publicate() {
        for(const fn of ALink.observers) {
            fn(...arguments)
        }
    }
}
window.ALink = ALink
var ALinkCurrentPath = ''
let pathname = window.location.pathname
if(pathname !== '/' && pathname.slice(-1) === '/') {
    ALinkCurrentPath = ALink.routes[pathname.slice(0, -1)]
} else {
    ALinkCurrentPath = ALink.routes[pathname]
}
ALinkCurrentPath.content = document.getElementById('root-router').innerHTML
if(ALinkCurrentPath.dynamicPath) {
    ALink.routes[ALinkCurrentPath.dynamicPath].resourcesFetched = true
} else {
    ALinkCurrentPath.resourcesFetched = true
}
window.customElements.define('a-link', ALink, { extends: 'a' })