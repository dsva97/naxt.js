import { data } from '../../utils/data'

const metaDesc = document.createElement('meta')
metaDesc.setAttribute('name', 'description')
metaDesc.setAttribute('content', 'Contacto de la página web profesional.')
document.head.appendChild(metaDesc)

document.title = "Contact"

console.log("In Contact: ", data)
