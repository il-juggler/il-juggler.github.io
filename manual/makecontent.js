const fs = require('fs')
let content = {}

content.fase1 = [
    require('./contenido/000-001-glosario.json'),
    require('./contenido/000-002-introduccion.json'),
    require('./contenido/000-003-marco-normativo.json'),
    require('./contenido/000-004-vision.json'),
    require('./contenido/000-005-justificacion.json'),
    require('./contenido/000-006-componentes.json'),
    require('./contenido/000-007-actitudes.json'),
    require('./contenido/000-008-estructura.json'),
    require('./contenido/000-009-etapas.json'),

    require('./contenido/001-fase1.00.json'),
    require('./contenido/001-fase1.01.json'),
    require('./contenido/001-fase1.02.json'),

    require('./contenido/002-fase2.00.json'),
    require('./contenido/002-fase2.10.json'),
    require('./contenido/002-fase2.11.json'),
    require('./contenido/002-fase2.20.json'),
    require('./contenido/002-fase2.21.json'),
    require('./contenido/002-fase2.30.json'),
    require('./contenido/002-fase2.31.json'),


    require('./contenido/003-fase3.00.json'),
    require('./contenido/004-fase4.00.json')
]

fs.writeFileSync('./contenido.js', 'window.contenido = '.concat(JSON.stringify(content.fase1)) )