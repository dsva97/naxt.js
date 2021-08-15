export const handleFileParams = (initialRelativePath) => {
    let parts = initialRelativePath.split('/')
    let basePath = []
    let ifFinalBasePath = false
    parts = parts.map(part => {
        const letters = [...part]
        const initOk = letters.shift() === '['
        const endedOk = letters.pop() === ']'

        if(initOk && endedOk) {
            ifFinalBasePath = true
            return letters.join('')
        } else {
            if(!ifFinalBasePath) {
                basePath.push(part)
            }
            return null
        }
    }).filter(x=>x)

    return [basePath.join("/"), parts, initialRelativePath]
}