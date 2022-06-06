const fs = require('fs')
let content = {}

content.fase1 = [
    require('./contenido/000-001-glosario.json'),
    require('./contenido/000-002-introduccion.json'),
    require('./contenido/000-003-marco-normativo.json'),
    require('./contenido/000-004-vision.json'),
    require('./contenido/000-005-justificacion.json'),

    require('./contenido/001-fase1.00.json'),
    require('./contenido/001-fase1.01.json'),
    require('./contenido/001-fase1.02.json')
]

fs.writeFileSync('./contenido.js', 'window.contenido = '.concat(JSON.stringify(content.fase1)) )