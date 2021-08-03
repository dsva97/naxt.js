import path from 'path'
import fs from 'fs'

export const getRelativePath = (abs_file, _path) => {
    const name = path.parse(abs_file).name
    const rest = abs_file.split(_path)[1]
    const parts = rest.split('/')
    parts.pop()
    const result = parts.join('/')
    return result+'/'+name
}
export const recursiveApply = (initDirectory, callback=()=>{}) => {
    if(typeof callback === 'object') {
        var { applyToFile=()=>{}, applyToDir=()=>{} } = callback
    } else { // is a function
        var applyToFile = callback, applyToDir = callback
    }
    const recursive = directory => 
    fs.readdir(directory, (err, files) => {
        if(err) throw err;
        for(const file of files) {
            const abs_file = path.resolve(directory, file) 
            const isDirectory = fs.statSync(abs_file).isDirectory()
            if(isDirectory) {
                applyToDir(abs_file)
                recursive(abs_file)
            } else {
                applyToFile(abs_file)
            }
        }
    })

    recursive(initDirectory)
}
export const forceWriteFile = (abs_file, content='') => {
    const directory = path.dirname(abs_file)
    if(!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(abs_file, content)
}