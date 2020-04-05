


d3.csv('/data.csv').then(data =>{
    draw(data);
})


function drawForm() {
    var inputs = [{}];
    let form = d3.select(document.body).append('form')

}


function drawTable(fecha, fechas, data) {
    d3.select('#--masinfo').html('');
    d3.select('#--masinfo').append('h4').text(fecha)
    let tTable =  d3.select('#--masinfo').append('table');
    let heading = tTable.append('thead').append('tr');

    heading.append('th').text('País')
   

    heading.append('th').text('Raíz 1')
    heading.append('th').text('Raíz 5')
    heading.append('th').text( 'Raíz 7')
    heading.append('th').text( 'Raíz 14')

    heading.append('th').text('Casos')
    heading.append('th').text('Casos n+1')
    heading.append('th').text('Casos n+7')


    let tbody = tTable.append('tbody')
    let rows = tbody.selectAll('tr').data(data)

    let enterRow = rows.enter().append('tr')

    let idx = fechas.indexOf(fecha)
    let show_n1 = false
    let show_n7 = false

    if(idx+1 < fechas.length) {
        show_n1 = idx+1
    }

    if(idx+7 < fechas.length) {
        show_n7 = idx+7
    }

    

    enterRow.append('th').text(d => d['Country/Region'])

    enterRow.append('td').text(d => d.vRaiz_1[idx])
    enterRow.append('td').text(d => d.vRaiz_5[idx])
    enterRow.append('td').text(d => d.vRaiz_7[idx])
    enterRow.append('td').text(d => d.vRaiz_14[idx])
    enterRow.append('th').text(d => d[fecha])
    enterRow.append('th').text(d =>show_n1 === false ? '' : d[fechas[show_n1]])
    enterRow.append('th').text(d =>show_n7 === false ? '' : d[fechas[show_n7]])

    enterRow.append('th').text(d => Math.round(d[fecha] * d.vRaiz_7[idx], 7))
    enterRow.append('th').text(d => Math.round(d[fecha] * Math.pow(d.vRaiz_7[idx], 7) ))
}


function draw(data) {
    var tWidth  = window.innerWidth  - 250;
    var tHeight = window.innerHeight - 160;
    var selection = ['Mexico', 'Spain', 'Italy', 'US'];

    var RaizReferencia0 = Math.pow(2, 1/7)
    var RaizReferencia  = Math.pow(2, 1/2.5)
    var RaizReferencia2 = Math.pow(2, 1/2) 

    drawForm();

   let svg = d3.select('#svgC')
        .append('svg')
        .attr('width',tWidth )
        .attr('height',tHeight)

    
    
    let originalData = data.filter(d => {
       return Boolean(selection.indexOf(d['Country/Region']) + 1)
    })

    let fechas = Object.keys(originalData[0]).filter((k,idx) => k && idx > 4);
        
    originalData.forEach((d,idx) => {
        d.vConfirmados = fechas.map(kFecha => d[kFecha])
    
        d.vRaiz_5  = getRaizal(5, d.vConfirmados)
        d.vRaiz_14 = getRaizal(14, d.vConfirmados)
        d.vRaiz_7  = getRaizal(7, d.vConfirmados)
        d.vRaiz_1  = getRaizal(1, d.vConfirmados)
        d.color    = d3.schemeCategory10[idx]

    });

    let xScaleDef = d3.scaleLinear().domain([0, fechas.length]).range([0, tWidth ])
    let yScaleDef = d3.scaleLinear().domain([0 ,2.7]).range([tHeight, 0])

    svg.append('path')
        .datum(fechas)
        .attr('stroke', 'none')
        .attr('fill', '#ccc')
        .attr('opacity', 0.5)   
        .attr("d", 
            d3.area()
                .x((l,n) => xScaleDef(n))
                .y0(d => yScaleDef(0))
                .y1(d => yScaleDef(RaizReferencia0))
                
        )

    svg.append('path')
        .datum(fechas)
        .attr('stroke', 'none')
        .attr('fill', '#F3B080')
        .attr('opacity', 0.5)
        .attr("d", 
            d3.area()
                .x((l,n) => xScaleDef(n))
                .y0(d => yScaleDef(RaizReferencia2))
                .y1(d => yScaleDef(RaizReferencia))
                  
        )

    svg.append('path')
        .datum(fechas)
        .attr('stroke', 'none')
        .attr('fill', '#f0aaaa')
        .attr('opacity', 0.5)
        .attr("d", 
            d3.area()
                .x((l,n) => xScaleDef(n))
                .y0(d => yScaleDef(RaizReferencia2))
                .y1(d => yScaleDef(2.7))
                  
        )

    svg.append('path')
        .datum(fechas)
        .attr('stroke', 'none')
        .attr('fill', '#f0f0a0')
        .attr('opacity', 0.5)
        .attr("d", 
            d3.area()
                .x((l,n) => xScaleDef(n))
                .y0(d => yScaleDef(RaizReferencia))
                .y1(d => yScaleDef(RaizReferencia0))
        )

    svg.append('path')
        .datum(fechas)
        .attr('stroke', 'none')
        .attr('fill', '#fbfbfb')
        .attr("d", 
            d3.area()
                .x((l,n) => xScaleDef(n))
                .y0(d => yScaleDef(0))
                .y1(d => yScaleDef(1))
                  
        )
    
    fechas.forEach((fecha,n) => {
        svg.append('line')
            .attr('class', 'fecha-' + fecha)
            .attr('stroke', 'gray')
            .attr('stroke-width', 1)
            .attr('opacity', 0.3)
            .attr("x1", xScaleDef(n)).attr("x2", xScaleDef(n))
            .attr("y1", yScaleDef(0)).attr("y2", yScaleDef(2.7))
            .on('mouseenter', function () {
                d3.select(this).attr('opacity',  1)
            })
            .on('mouseleave', function () {
                d3.select(this).attr('opacity',  0.3)
            })
            .on('click', function (date) {
                drawTable(fecha, fechas, originalData)
            })
    })

    var gData = svg.selectAll('g.data-pais').data(originalData);

    var gDataEnter = gData.enter().append('g')
        .attr('class', d => 'data-pais pais-' + d['Country/Region'])


    var mergeddata = gData.merge(gDataEnter);


    mergeddata.append('path')
        .attr('class', d => 'linea-pais-' + d['Country/Region'])
        .attr('stroke', d => d.color)
        .attr('stroke-width',1)
        .attr('fill','none')
        .attr('fill-opacity', 0.1)
        .datum(d => d.vRaiz_7)
        .attr("d", d3.line().x((l,n) => xScaleDef(n)).y(d => yScaleDef(d)) )
        

    console.log(originalData)


}


function getRaizal(raiz, confirmadosArr) {
    return confirmadosArr.map((c,idx) => {
        if(idx < raiz) {
            return null
        } else {
            //console.log(c, c/confirmadosArr[idx - raiz])
            return confirmadosArr[idx - raiz] == 0 ?  null : Math.pow(c/confirmadosArr[idx - raiz], 1/raiz)
        }
    })
}