const fs = require('fs')
let content = {}

content.fase1 = [
    require('./contenido/001-fase1.00.json'),
    require('./contenido/001-fase1.01.json'),
    require('./contenido/001-fase1.02.json')
]

fs.writeFileSync('./contenido.js', 'window.contenido = '.concat(JSON.stringify(content.fase1)) )