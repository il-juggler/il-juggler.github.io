window.Manual = {}
var Tipos = {};
var DatosCronograma = [
   {
        fase : "EXPLORACIÓN INICIAL Y CO-PLANEACIÓN",
        bgColor:'#588AA3',
        actividades : [
            [1, "¡El primer encuentro!",1],
            [2, "Alistándonos para iniciar el viaje",2]
        ],
        duracion: 2
   },
   {
        fase : "CULTIVANDO FORTALEZAS Y UN SENTIDO DE PROPÓSITO",
        'bgColor':'#3C538C',
        actividades : [
            [3, "Planeando mi viaje",3],
            [4, "Los vagones y mis compañeros de viaje",4],
            [5, "Mi destino de viaje y sus escalas",5]
        ],
       duracion:3
   },
   {
        fase: "EMPODERAMIENTO E IMPLEMENTACIÓN DE PLAN DE VIDA",
        'bgColor':'#28365C',
        actividades : [
            [6, "Mi mapa de viaje",6],
            [7, "Insumos para mi viaje",7],
            [8, "Rumbo a la Estación Empleo",8],
            [9, "Rumbo a la Estación Educativa",9],
            [10, "Ampliando mis compañeros de viaje",10]
        ],
        duracion:5
   },
   {
        fase:"TRANSICIÓN Y SALIDA",
        'bgColor':'#111737',
        actividades : [
            [11, "El viaje continúa, revisemos sus rutas y cronograma",14],
            [12, "¿Me hace falta algo para continuar el viaje?",18],
            [13, "¿Quiénes quiero que sean mis acompañantes especiales de viaje en el futuro y cómo me gustaría que fuera la comunicación con ellos?",22],
            [14, "Reconociendo los aprendizajes y logros más importantes de mi viaje",26]
        ],
        duracion: 16
   }
];

var Portada = {};

Portada.view = function () {
    return m('div#Portada.mt-2.pb-2.mb-2', [
        m(".section.m-4.pt-6.p-4", [
            m('.box', [
                m('img[src="./a.jpg"]')
            ])
        ]),

        m('div', [
            m('img[src="./chuchu.png"]')
        ]),

        m('.section.has-text-centered', [
            m('a.is-info.is-outlined.button[href=./Cronograma del Modelo de Consejería.docx]', 'DESCARGAR CRONOGRAMA', m('i.icofont-download')),
            m('br'),
            m('br'),
            m('a.button.is-info.is-outlined[href=./Libreta_de_actividades_JuventudES_08 agosto_2022.pdf]', 'DESCARGAR LIBRETA DE ACTIVIDADES', m('i.icofont-download')),
            m('br'),
            m('br'),
            m('a.button.is-info.is-outlined[href=./Libreta_de_actividades_JuventudES_08 agosto_2022.pdf]', 'DESCARGAR LIBRETA DE ACTIVIDADES', m('i.icofont-download')),
        ])
    ])  
}


var Cronograma = {}
Cronograma.show = false;
Cronograma.section = false;

Cronograma.Boton = function () {
    return m('.has-text-centered', [
        m('a.button.is-success.is-outlined[href=javascript:;]', {
            onclick : () => {
                Cronograma.show = Boolean(1-Number(Cronograma.show))
                Cronograma.section = false
            }
        }, [
            Cronograma.show ? 'Ocultar Cronograma' : 'Mostrar Cronograma'
        ]),
    ])
}


Cronograma.BotonVolver = function () {
    return m('.has-text-centered', [
        m('a.button.is-info.is-outlined[href=javascript:;]', {
            onclick : () => {
                Cronograma.show = true
                Cronograma.section = false
            }
        }, 'Volver al Cronograma'),
    ])
}

Cronograma.view = function() {
    let celnumber = 0;
    return m('.table-container', [
        m('table.table', [
            m('thead', [
                m('tr', [
                    m('th', {rowspan:2},'Actividad'),
                    DatosCronograma.map(faseCol => {
                        return m('th', {
                            colspan: faseCol.duracion,
                            style: {textAlign:'center', backgroundColor:  faseCol.bgColor, color:'white'},
                        }, faseCol.fase)
                    })
                ]),

                m('tr', [
                    DatosCronograma.map(faseCol => {
                        var d = []
                        for(var i=0; i<faseCol.duracion; i++) {
                            ++celnumber;
                            d.push(
                                m('th', {
                                    style: {textAlign:'center', color:'white', 'background-color':  faseCol.bgColor }
                                }, celnumber)
                            )
                        }
                        return d
                    })
                ])
            ]),

            DatosCronograma.map(fase => {
                return m('tbody', {style:'border-bottom:1px solid gray'},[
                    fase.actividades.map(act => {
                        let celnumber =0;
                        return m('tr', [
                            m('th', {
                                style: {cursor:'pointer',borderBottom:'1px solid white', color:'white', backgroundColor: fase.bgColor},
                                onclick: () => {
                                    console.log('click:', act[2])
                                    Cronograma.section =    act[2]
                                }
                            }, 
                            
                            act[1]),
                            DatosCronograma.map(faseCol => {
                                var d = []
                                for(var i=0; i<faseCol.duracion; i++) {
                                    ++celnumber;
                                    d.push(
                                        m('td', {
                                            style: {
                                                border:'none', 
                                                'background-color': act[2] == celnumber? faseCol.bgColor : '#ACB9CA',
                                                'cursor': act[2] == celnumber? 'pointer' : 'inherit',
                                               
                                            },
                                            onclick : () => {
                                                console.log('click:', act[2])
                                                if(act[2] == celnumber) Cronograma.section = act[2]
                                            }
                                        })
                                    )
                                }
                                return d
                            })
                        ])
                    })
                ])
            })
        ])
    ])
}

ElementosDelMenu = [
    {'texto':'Fase 1', 'bgColor':'#588AA3', href:'#Fase1'},
    {'texto':'Fase 2', 'bgColor':'#3C538C', href:'#Fase2'},
    {'texto':'Fase 3', 'bgColor':'#28365C', href:'#Fase3'},
    {'texto':'Fase 4', 'bgColor':'#111737', href:'#Fase4'},
]

Manual.view = function(vnode) {
    return m('div.container', [
        m('div.content', [
           m('.columns', [
                m('.column.is-hidden-mobile.is-one-quarter', [
                    m('div', {'style':'position:fixed;border-left:10px solid #D66B31'}, [
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
                                'color' : '#fbfbfb',
                                'display' :'block'
                            };

                            return m('div', [
                                m('a', {style:style, href:el.href}, el.texto)
                            ])
                         })
                    ])
                ]),

                m('.column.is-full-mobile.is-three-quarters-tablet', [
                    m(Portada),
                    Cronograma.section == false ? Cronograma.Boton() : null,
                    Cronograma.show && Cronograma.section == false ? m(Cronograma) : '',
                    Cronograma.show && Cronograma.section == false ?  Cronograma.Boton() : '',
                    Cronograma.show && Cronograma.section != false ?  Cronograma.BotonVolver() : '',
                    vnode.children.map(d =>  Manual.displayFase(d, Cronograma.show, Cronograma.section)),
                    Cronograma.show && Cronograma.section != false ?  Cronograma.BotonVolver() : '',
                ])
           ])
        ])
    ])
}


Manual.displayFase = function (d, Enabled, val) {
    console.log(val, d.vcrono, d.id)
    if(Enabled) if(val != d.vcrono) return;
    return m(Tipos.Fase, d, d.contenido)
}

Manual.displayElement = function(elemento, Enabled, valor) {
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
                        m('td', {style: {verticalAlign:'middle', padding:"5px", width:"60px"}},m('img', {src : f.imagen})),
                        m('th', {style: {textAlign:'center', color:'#2A4879', borderColor:'#2A4879',backgroundColor:'#DBDFE9'}}, f.titulo),
                        m('td', {style: {borderColor:'#2A4879'}}, f.contenido ? Manual.displayElements(f.contenido) : f.texto) 
                    ])
                })
            ])
        ])
    ])
}


var TablaGuia = {}
Tipos.TablaGuia = TablaGuia
TablaGuia.view= function(vnode) {

    let Materiales = vnode.attrs.Materiales;
    if(typeof Materiales.map == 'function') {
        Materiales = vnode.attrs.Materiales.map(mat => m.trust(mat))
    }
    
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
             Materiales ? m('tr', {style:{border:'5px solid white'}}, [ 
                m('td', {style:{verticalAlign:'middle', width: '60px'}},m('div', {style: {width:'50px', height:'50px', backgroundColor:'#95A1BE', borderRadius:'25px', textAlign:'center'} }, m('img', {style:"padding-top:5px;width:40px", src:'./azules/materiales.png'}))),
                m('td', {style:{verticalAlign:'middle',backgroundColor:'#D9D9D9'}} ,m('b.fazul', 'Materiales'), m('br'), Materiales) 
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
    return m('.columns', [
        m('.column.is-half.has-text-right.is-hidden-mobile', [
            m('img[src=./naranjas/monito-indicador.png]', {style:'max-height:400px'})
        ]),
        m('div.elemento.PantallaMovil.is-half.column', {style:'background: #f0f0f0; border-radius:10px; padding:10px; margin:10px; border:10px solid gray;  border-bottom:50px solid gray; '}, [
            m('h3', vnode.attrs.titulo),
            Manual.displayElements(vnode.children)
        ])
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
Consejos.view = function(vnode) {
    return m('div', {style:{marginTop:'2em', border:'2px solid #588AA3', padding:'1em'}} ,[
        m('img', {style:'float:right;width:40px',src:'./foco-consejos.png'}),
        vnode.attrs.titulo ?  m('h5', {style:{color:"#4FADEA"}}, vnode.attrs.titulo) : '',
        Manual.displayElements(vnode.children)
    ])
}



var ConversacionPresencial = {}
Tipos.ConversacionPresencial = ConversacionPresencial
ConversacionPresencial.view= function(vnode) {
    return m('div', {style:'margin:20px'}, [
        m('div.elemento.ConversacionPresencial', {style:'background: #DCE0E9; border-radius:10px; padding:5px; margin:10px; border:3px solid #2E6784;'}, [
            vnode.attrs.titulo ? m('h3', vnode.attrs.titulo) : '',
            Manual.displayElements(vnode.children)
        ]),

        m('div.has-text-centered', [
            m('img', {style:'max-width:180px', src:'./naranjas/conversacion.png'}),
        ])
    ])
    
}

function Toggle(id) {
    let el = document.querySelector('#'+id)
    el.classList.toggle('is-active')
}

function Portada() {
    let el = document.querySelector('#navMenubd-example')
    el.classList.remove('is-active')
}