import fs from 'fs'
import path from 'path'
import { buildSync } from 'esbuild'
import ReactDOM from 'react-dom/server'
import { recursiveApply, getRelativePath, forceWriteFile, getUpdatedTmp, cleanDirectories } from './utils'
import Document from './components/Document'
import { PAGES_PATH, DIST_JS_PATH, DIST_PAGES_PATH, DIST_PATH, SRC_PATH } from './contants'

cleanDirectories()

const path_App = path.join(PAGES_PATH, '_app.jsx')
let App;
if(fs.existsSync(path_App)) {
    import(path_App).then(modules => App = modules.default)
} else {
    App = ({children}) => <div id="root-router">{children}</div>
}

recursiveApply(PAGES_PATH, { applyToFile: (abs_file) => {
    if(abs_file !== path_App) {
        const relativePath = getRelativePath(abs_file, PAGES_PATH)
        const distResourceDir = path.join(DIST_JS_PATH, relativePath)
        const distFetchedDir = path.join(DIST_PAGES_PATH, relativePath)
        const distPageDir = path.join(DIST_PATH, relativePath)
        const tmpFile = getUpdatedTmp(abs_file)

        buildSync({
            entryPoints: [tmpFile],
            bundle: true,
            outfile: distResourceDir+'/script.js',
        })

        import(abs_file).then(modules => {
            const Content = modules.default
            // const getStaticProps = modules.getStaticProps || (() => ({}));

            // Promise.resolve(getStaticProps()).then(initialProps => {
            //     App = () => <App {...initialProps} />

                const css = "/resources" + relativePath + "/script.css"
                const js = "/resources" + relativePath + "/script.js"
                // For fetch
                const fetchedContent = ReactDOM.renderToString(<Content />)
                forceWriteFile(distFetchedDir+'/index.html', fetchedContent)
                // Page
                const pageContent = "<!DOCTYPE html>" + ReactDOM.renderToString(<Document js={js} css={css}><App><Content /></App></Document>)
                if(relativePath === '/index') {
                    forceWriteFile(DIST_PATH+'/index.html', pageContent)
                } else {
                    forceWriteFile(distPageDir+'/index.html', pageContent)
                }
            // })
        })


    }
}})

const cssGlobal = path.join(SRC_PATH, 'css', 'index.css')
if(fs.existsSync(cssGlobal)) {
    buildSync({
        entryPoints: [cssGlobal],
        bundle: true,
        outfile: DIST_PATH+'/assets/css/global.css',
    })
}


fs.copyFileSync(
    path.resolve(__dirname, 'router', 'client-router.js'),
    path.resolve(DIST_PATH, 'client-router.js')
)