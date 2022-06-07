window.Manual = {}
var Tipos = {};

ElementosDelMenu = [
    {'texto':'Fase 1', 'bgColor':'#588AA3'},
    {'texto':'Fase 2', 'bgColor':'#3C538C'},
    {'texto':'Fase 3', 'bgColor':'#28365C'},
    {'texto':'Fase 4', 'bgColor':'#111737'},
]

Manual.view = function(vnode) {
    return m('div.container-fluid', [
       m('div.content', [
           m('.columns', [
                m('.column.is-hidden-mobile.is-one-quarter', [
                    m('div', {'style':'border-left:10px solid #D66B31'}, [
                        ElementosDelMenu.map(el => {
                            let style = {
                                'background-color' :  el.bgColor,
                                'border-radius' : '40px',
                                'border-top-left-radius' : '0',
                                'border-bottom-left-radius' : '0',
                                'height' : '10px',
                                'padding' : '20px 0 45px 20px',
                                'margin' : '20px auto 20px 0',
                                'width' : '120px',
                                'color' : '#fbfbfb'
                            }
                            return m('div.', {style:style}, el.texto)
                        })
                    ])
                ]),
                
                m('.column.is-full-mobile', [
                    vnode.children.map(Manual.displayElement)
                ])
           ])
       ])
    ])
}

Manual.displayElement = function(elemento) {
    let el = '';

    if(typeof elemento == 'string') return m.trust(elemento);
    if(!elemento.tipo) return m('div.has-text-danger', 'Sin tipo especificado');

    let tipo = Tipos[elemento.tipo];
    if(!tipo) return m('div.has-text-danger', 'InexistenteTipo:'.concat(elemento.tipo))
    return m(tipo, elemento, elemento.contenido || elemento.texto);
}

Manual.displayElements = function(elementos) {
    var ch = elementos || "";
    if(ch.__proto__ != Array.prototype) ch = [ch]
    return ch.filter(a => a).map(Manual.displayElement)
}


var Fase = {}
Tipos.Fase = Fase;
Fase.view = function(vnode) {
    return m('section.section.elemento.fase.block', {id:vnode.attrs.id}, [
        m('h2.is-size-3', {style:{paddingTop:'4rem',color:'#439798'}}, vnode.attrs.titulo),
        Manual.displayElements(vnode.children)
    ])
}


var tablaPrincipal = {}
Tipos.tablaPrincipal = tablaPrincipal
tablaPrincipal.view = function(vnode) {
    return m('div.elemento.tablaPrincipal', [
        m('table.table', [
            m('tbody', [
                vnode.attrs.filas.map(f => {
                    return m('tr', {style:{borderColor:'#2A4879'}}, [
                        m('td', {style:{verticalAlign:'middle'}},m('img', {style:"width:6em",src : f.imagen})),
                        m('th', {style: {textAlign:'center', color:'#2A4879', borderColor:'#2A4879',backgroundColor:'#DBDFE9'}}, f.titulo),
                        m('td', {style:{borderColor:'#2A4879'}}, f.contenido ? Manual.displayElements(f.contenido) : f.texto) 
                    ])
                })
            ])
        ])
    ])
}


var TablaGuia = {}
Tipos.TablaGuia = TablaGuia
TablaGuia.view= function(vnode) {
    return m('table', {style:'margin:20px 0 20px 0'}, [
       m('tbody', [
           vnode.attrs.Como ? m('tr', {style:{border:'5px solid white'}}, [ 
               m('td', {style:{verticalAlign:'middle', width: '60px'}}, m('div', {style: {width:'50px', height:'50px', backgroundColor:'#95A1BE', borderRadius:'25px', textAlign:'center'} }, m('img', {style:"padding-top:5px;width:40px", src:'./azules/como.png'}))),
               m('td', {style:{verticalAlign:'middle',backgroundColor:'#D9D9D9'}} ,m('b.fazul', '¿Cómo?'), m('br'), vnode.attrs.Como) 
            ]) : null,
            vnode.attrs.Cuando ? m('tr', {style:{border:'5px solid white'}}, [ 
                m('td', {style:{verticalAlign:'middle', width: '60px'}},m('div', {style: {width:'50px', height:'50px', backgroundColor:'#95A1BE', borderRadius:'25px', textAlign:'center'} }, m('img', {style:"padding-top:5px;width:40px", src:'./azules/cuando.png'}))),
                m('td', {style:{verticalAlign:'middle',backgroundColor:'#D9D9D9'}} ,m('b.fazul', '¿Cúando?'), m('br'), vnode.attrs.Cuando) 
             ]) : null,
             vnode.attrs.Donde ? m('tr', {style:{border:'5px solid white'}}, [ 
                m('td', {style:{verticalAlign:'middle', width: '60px'}},m('div', {style: {width:'50px', height:'50px', backgroundColor:'#95A1BE', borderRadius:'25px', textAlign:'center'} }, m('img', {style:"padding-top:5px;width:40px", src:'./azules/donde.png'}))),
                m('td', {style:{verticalAlign:'middle',backgroundColor:'#D9D9D9'}} ,m('b.fazul', '¿Dónde?'), m('br'), vnode.attrs.Donde) 
             ]) : null,
             vnode.attrs.Duracion ? m('tr', {style:{border:'5px solid white'}}, [ 
                m('td', {style:{verticalAlign:'middle', width: '60px'}},m('div', {style: {width:'50px', height:'50px', backgroundColor:'#95A1BE', borderRadius:'25px', textAlign:'center'} }, m('img', {style:"padding-top:5px;width:40px", src:'./azules/duracion.png'}))),
                m('td', {style:{verticalAlign:'middle',backgroundColor:'#D9D9D9'}} ,m('b.fazul', 'Duración'), m('br'), vnode.attrs.Duracion) 
             ]) : null,
             vnode.attrs.Materiales ? m('tr', {style:{border:'5px solid white'}}, [ 
                m('td', {style:{verticalAlign:'middle', width: '60px'}},m('div', {style: {width:'50px', height:'50px', backgroundColor:'#95A1BE', borderRadius:'25px', textAlign:'center'} }, m('img', {style:"padding-top:5px;width:40px", src:'./azules/materiales.png'}))),
                m('td', {style:{verticalAlign:'middle',backgroundColor:'#D9D9D9'}} ,m('b.fazul', 'Materiales'), m('br'), vnode.attrs.Materiales) 
             ]) : null
       ])
    ])
}

var Actividad = {}
Tipos.Actividad = Actividad
Actividad.view= function(vnode) {
    return m('section.section.elemento.actividad.block', [
        m('h3.is-size-4', {style:{color:'#4FADEA'}}, vnode.attrs.titulo),
        Manual.displayElements(vnode.children)
    ])
}


var ParrafoTitulado = {}
Tipos.ParrafoTitulado = ParrafoTitulado
ParrafoTitulado.view= function(vnode) {
    return m('div', {style: vnode.attrs.parrafoObjetivo ? {padding:"0.8em", backgroundColor:'#95A1BE'} : null },[
        m('h5.is-size-6.has-text-weight-bold', {style:{color:"#17365D"}}, vnode.attrs.titulo),
        m('p',{style: vnode.attrs.parrafoObjetivo ?  {color:'#17365D'} : null }, Manual.displayElements(  vnode.children ))
    ])
}

var CitaFondoAzul = {}
Tipos.CitaFondoAzul = CitaFondoAzul
CitaFondoAzul.view= function(vnode) {
    return m('div.fondoaqua', Manual.displayElements(  vnode.children ))
}


var Lista = {}
Tipos.Lista = Lista
Lista.view = function(vnode) {
    
    return m(vnode.attrs.numeros ? 'ol' : 'ul', [
        vnode.attrs.elementos.map(element => m('li', Manual.displayElement(element)) )
    ])
}

var PantallaMovil = {}
Tipos.PantallaMovil = PantallaMovil
PantallaMovil.view= function(vnode) {
    return m('div.elemento.PantallaMovil', {style:'background: #f0f0f0; border-radius:10px; padding:10px; margin:10px; border:30px solid gray'}, [
        m('h3', vnode.attrs.titulo),
        Manual.displayElements(vnode.children)
    ])
}


var TextoClave = {}
Tipos.TextoClave = TextoClave
TextoClave.view= function(vnode) {
    return m('span.TextoClave', {style:{color:'#D66B31'}} ,[
       vnode.children
    ])
}


var Consejos = {}
Tipos.Consejos = Consejos
Consejos.view= function(vnode) {
    return m('div', {style:{marginTop:'2em', border:'2px solid #588AA3', padding:'1em'}} ,[
        m('img', {style:'float:right;width:40px',src:'./foco-consejos.png'}),
        m('h5', {style:{color:"#4FADEA"}}, vnode.attrs.titulo),
        Manual.displayElements(vnode.children)
    ])
}

Tipos.ConversacionPresencial = Tipos.PantallaMovil


function Toggle(id) {
    let el = document.querySelector('#'+id)
    el.classList.toggle('is-active')
}

function Portada() {
    let el = document.querySelector('#navMenubd-example')
    el.classList.remove('is-active')
}