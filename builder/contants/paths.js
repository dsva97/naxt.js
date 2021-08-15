import path from 'path'

export const PREFIX_RESOURCE = '__'

export const ROOT_PATH = path.resolve(__dirname, '..', '..')
export const TMP_PATH = path.resolve(ROOT_PATH, 'tmp')
export const SRC_PATH = path.resolve(ROOT_PATH, 'src')
export const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
export const DIST_RESOURCES_PATH = path.resolve(DIST_PATH, PREFIX_RESOURCE)
export const DIST_JS_PATH = path.resolve(DIST_PATH, 'resources')
export const DIST_PAGES_PATH = path.resolve(DIST_PATH, 'pages')
export const DIST_ASSETS_PATH = path.resolve(DIST_PATH, 'assets')
export const PAGES_PATH = path.resolve(SRC_PATH, 'pages')