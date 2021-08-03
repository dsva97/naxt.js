import path from 'path'
import { buildSync } from 'esbuild'
import ReactDOM from 'react-dom/server'
import { recursiveApply, getRelativePath, forceWriteFile } from './utils'
import Document from './components/Document'
import { PAGES_PATH, DIST_JS_PATH, DIST_PAGES_PATH, DIST_PATH } from './contants'


recursiveApply(PAGES_PATH, { applyToFile: (abs_file) => {
    const relativePath = getRelativePath(abs_file, PAGES_PATH)
    const distResourceDir = path.join(DIST_JS_PATH, relativePath)
    const distFetchedDir = path.join(DIST_PAGES_PATH, relativePath)
    const distPageDir = path.join(DIST_PATH, relativePath)
    buildSync({
        entryPoints: [abs_file],
        bundle: true,
        outfile: distResourceDir+'/script.js',
    })

    import(abs_file).then(modules => {
        const App = modules.default
        // For fetch
        const fetchedContent = ReactDOM.renderToString(<App />)
        forceWriteFile(distFetchedDir+'/index.html', fetchedContent)
        // Page
        const pageContent = ReactDOM.renderToString(<Document js=""><App /></Document>)
        if(relativePath === '/index') {
            forceWriteFile(distPageDir+'/index.html', pageContent)
        } else {
            forceWriteFile(DIST_PATH+'/index.html', pageContent)
        }
    })

}})