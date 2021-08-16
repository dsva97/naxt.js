import fs from "fs";
import path from "path";
import { buildSync } from "esbuild";
import ReactDOM from "react-dom/server";
import {
  recursiveApply,
  getRelativePath,
  forceWriteFile,
  getUpdatedTmp,
  cleanDirectories,
  handleFileParams,
} from "./utils";
import Document from "./components/Document";
import {
  PAGES_PATH,
  DIST_JS_PATH,
  DIST_PAGES_PATH,
  PREFIX_RESOURCE,
  DIST_PATH,
  SRC_PATH,
  DIST_RESOURCES_PATH,
} from "./contants";


cleanDirectories();

const path_App = path.join(PAGES_PATH, "_app.jsx");
let App;
if (fs.existsSync(path_App)) {
  import(path_App).then((modules) => (App = modules.default));
} else {
  App = ({ children }) => <div id="root-router">{children}</div>;
}

const final_routes = {}

const generatePage = async (relativePath, initialRelativePath, modules, context = {}) => {
  const distPageDir = path.join(DIST_PATH, relativePath);
  const distFetchedDir = path.join(DIST_RESOURCES_PATH, relativePath);

  const getStaticProps = modules.getStaticProps || (() => ({}));
  const Content = modules.default;
  const Head = modules.Head || (() => <></>)
  
  const initialDataPage = await getStaticProps(context) || {}
  const defaultProps = initialDataPage?.props || {}

  const pathForResource = context.params ? initialRelativePath : relativePath
  const css = "/" + PREFIX_RESOURCE + pathForResource + (pathForResource === '/' ? '' : '/') + "index/script.css";
  const js = "/" + PREFIX_RESOURCE + pathForResource + (pathForResource === '/' ? '' : '/')  + "index/script.js";

  // For fetch
  const fetchedContent = ReactDOM.renderToString(<Content {...defaultProps} />);
  forceWriteFile(distFetchedDir + "/index/index.html", fetchedContent);

  // Page
  const pageContent =
    "<!DOCTYPE html>" +
    ReactDOM.renderToString(
      <Document js={js} css={css} head={<Head  {...defaultProps} />}>
        <App>
          <Content {...defaultProps} />
        </App>
      </Document>
    );
    
  if (relativePath === '/index') {
    forceWriteFile(DIST_PATH + "/index.html", pageContent);
  }
  else if(relativePath.slice(-6) === '/index') {
    const _distPageDir = path.join(DIST_PATH, relativePath.slice(0, -6));
    forceWriteFile(_distPageDir + "/index.html", pageContent);
  } 
  else {
    forceWriteFile(distPageDir + "/index.html", pageContent);
  }

  final_routes[relativePath] = context
  if(context?.params) {
    final_routes[initialRelativePath] = {
      resourcesFetched: false
    }
    final_routes[relativePath].dynamicPath = initialRelativePath
  }
}

recursiveApply(PAGES_PATH, {
  applyToFile: async (abs_file) => {
    if (abs_file !== path_App) {
      let relativePath = getRelativePath(abs_file, PAGES_PATH);
      // const distResourceDir = path.join(DIST_JS_PATH, relativePath);
      const distResourceDir = path.join(DIST_RESOURCES_PATH, relativePath + '/index');
      const tmpFile = getUpdatedTmp(abs_file);

      buildSync({
        entryPoints: [tmpFile],
        bundle: true,
        outfile: distResourceDir + "/script.js",
      });

      const modules = await import(abs_file)
      const getStaticPaths = modules.getStaticPaths || (() => ({ paths: [] }));
      const [baseRelativePath, baseParams] = handleFileParams(relativePath)
      
      if(baseParams.length > 0) {
        const { paths } = await getStaticPaths() || { paths: [] }
        const realPaths = paths.map(({params}) => {
          const dynamicParamsPath = baseParams.map(_baseParam => {
            return '/'+params[_baseParam]
          }).join('')
          const realPath = baseRelativePath + dynamicParamsPath
          return [realPath, params]
        })
        const results = realPaths.map(async ([realRelativePath, params]) => {
          const context = { params }
          return generatePage(realRelativePath, relativePath, modules, context)
        })

        await Promise.all(results)
      } else {
        await generatePage(relativePath, relativePath, modules)
      }
    }
  }
}).then(() => {
  const cssGlobal = path.join(SRC_PATH, "css", "index.css");
  const jsGlobal = path.join(SRC_PATH, "js", "index.js");
  if (fs.existsSync(cssGlobal)) {
    buildSync({
      entryPoints: [cssGlobal],
      bundle: true,
      outfile: DIST_PATH + "/assets/css/global.css",
    });
  }
  if (fs.existsSync(jsGlobal)) {
    buildSync({
      entryPoints: [jsGlobal],
      bundle: true,
      outfile: DIST_PATH + "/assets/js/global.js",
    });
  }

  const contentRouter = fs.readFileSync(
    path.resolve(__dirname, "router", "client-router.js")
  )
  fs.writeFileSync(
    path.resolve(DIST_PATH, "client-router.js"),
    "const __ROUTES__ = (" + JSON.stringify(final_routes) + ");\n"
    + contentRouter
  )
  console.log('Ready')
})
