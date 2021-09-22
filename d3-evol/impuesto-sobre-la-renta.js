

const LimiteInferior = 0;
const CuotaFija = 1;
const TasaExcedente = 2;
const TablaIsrMensual = [
    [0.01,0.00,1.92],
    [644.59,12.38,6.40],
    [5470.93,321.26,10.88],
    [9614.67,772.10,16.00],
    [11176.63,1022.01,17.92],
    [13381.48,1417.12,21.36],
    [26988.51,4323.58,23.52],
    [42537.59,7980.73,30.00],
    [81211.26,19582.83,32.00],
    [108281.68,28245.36,34.00],
    [324845.02,101876.90,35.00]
].reverse()


function CalculoISR(cantidad) {
    let limiteEncontrado = false;
    TablaIsrMensual.forEach((v, idx)=> {
        if(limiteEncontrado === false && cantidad > v[LimiteInferior]) limiteEncontrado = idx;
    });

    let limiteInferior = TablaIsrMensual[limiteEncontrado][LimiteInferior]
    let excedente = cantidad -  limiteInferior;
    let impuestoDelExcedente = excedente * TablaIsrMensual[limiteEncontrado][TasaExcedente] / 100
    let totalImpuesto = impuestoDelExcedente + TablaIsrMensual[limiteEncontrado][CuotaFija]
    let tasaCalculada = totalImpuesto / cantidad

    return {
       cantidad, 
       excedente, 
       impuestoDelExcedente, 
       totalImpuesto, 
       limiteInferior,
       tasaCalculada: tasaCalculada * 100, 
       neto: cantidad - totalImpuesto
    }
}


function draw () {
    const width  = 1300;
    const height = 600;
    const step   = 500;
    
    
    const form = d3.select('body').append('form')
    form.append('input').attr('type', 'text')
    form.append('input').attr('type', 'submit')

    form.on('submit', evt => {
        evt.stopPropagation()
        evt.preventDefault()
        
        let val =  d3.select(evt.target).select('input[type=text]').node().value;
        let mom = CalculoISR(Number(val));
        console.log(mom)

        svg.append('circle')
            .attr('r',100)
            .attr('opacity', 0)
            .attr('fill','steelblue')
            .attr("stroke", "steelblue")
            .attr('cx', X(mom.cantidad))
            .attr('cy', Y(100 - mom.tasaCalculada))
            .transition()
                .attr('r',3)
                .attr('opacity', 1)
    })

    

    const svg = d3.select('body').append('svg');

    svg.attr('width', width + 40)
       .attr('height', height + 40)
       .style('background-color', '#fff')
       .style('border', '1px solid #929292');
    
    const data = d3.range(2000)
        .filter(d => (d*step) >= 1000)
        .map(r =>  CalculoISR(step * r ));

    const X = d3.scaleLog()
        .domain([1000, 1000000]) // unit: km
        .range([40,  width]) // un

    const Y = d3.scaleLinear() 
        .domain([0, 100]) // unit: km
        .range([height, 20]) //

    const YP = d3.scaleLinear()
        .domain([0, .4]) // unit: km
        .range([ height, 40]) 

    const AreaImpuesto = d3.area()
        .x(d => X(d.cantidad))
        .y0(d => Y(100 - d.tasaCalculada))
        .y1(d => Y(100))
    
    const AreaNeto = d3.area()
        .x(d => X(d.cantidad))
        .y0(d => Y(0))
        .y1(d => Y(100 - d.tasaCalculada))

    const x_axis = d3.axisBottom()
        .scale(X)
        .ticks(6)

    const y_axis = d3.axisLeft()
        .scale(Y)
        .ticks(20)

    svg.append("path")
        .attr("d", AreaImpuesto(data))
        .attr("stroke", "none")
        .attr('fill', 'yellow')
        .attr('opacity', 0.7)

    svg.append("path")
        .attr("d", AreaNeto(data))
        .attr("stroke", "none")
        .attr('fill', 'lightgreen')
        .attr('opacity', 0.7)
    
    svg.append('g')
        .attr('transform', 'translate(0 600)')
        .call(x_axis)
        .call(g => g.selectAll(".tick line").clone()
        .attr("y2", -1 * (height - 20) )
        .attr("stroke-opacity", 0.2))

    svg.append('g')
        .attr('transform', 'translate(40 0)')
        .call(y_axis)
        .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - 40)
        .attr("stroke-opacity", 0.2))
}


draw();