

init();


function init() {
    let vals = {}
    vals[2017] = [
        613071,
        450955,
        508093,
        503855,
        684282,
        531704,
        583258,
        563842,
        522442,
        591297,
        648826,
        971160
    ];
    
    vals[2018] = [
        724411,
        671385,
        698312,
        643832,
        682404,
        797461,
        798342,
        737013,
        745072,
        763366,
        848424,
        1145180
    ]
    
    vals[2019] = [
        974572,
        791032,
        819038,
        779628,
        845462,
        893092,
        934746,
        858865,
        946705,
        819517,
        1183301,
        1291307
    ];

    let months = [
        'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
    ]

    let data = {};
    
    ['2017', '2018', '2019'].forEach( (r,idx) => {
        let sumData = 0;

        data[r] = {
            nombre : r,
            fill: d3.schemeCategory10[idx],
            months : months.map((month, idx) => {
                sumData +=  vals[r][idx];
                return {month, v: vals[r][idx], value : sumData}
            })
        }
        data[r].months.unshift({month:0, v:0,value:0 })
    });


    const dCrec2019 = creceData(data[2018], 1.296568, '#999999')
    const dCrec2020 = creceData(data[2019], 1.25, d3.schemeCategory10[5])

    function creceData(d, pCrecimiento, fill) {
        return {
            fill : fill,
            nombre : 'p-' + String(Number(d.nombre)+1),
            label : 'Meta ' + String(Number(d.nombre)+1),
            months : d.months.map(d=>{
                return {month:d.month, vAnt:d.value, value:d.value*pCrecimiento}
            })
        }
    }

    const max2018 = d3.max(data[2018].months.map(d => d.value));
    const max2019 = d3.max(dCrec2019.months.map(d => d.value));
    const max2020 = d3.max(dCrec2020.months.map(d => d.value));

    var w = window.innerWidth - 50;
    var h = window.innerHeight - 50;

    var y = d3.scaleLinear().domain([20, max2018]).range([h, 20])
    var x = d3.scaleLinear().domain([0, 12]).range([20, w-250])
    var svg = d3.select('svg').attr('width', String(w).concat('px')).attr('height', String(w).concat('px'))
    var format = d3.format(',.0f')
    
    var xAxis = d3.axisBottom(x).tickSize(1);
    svg.append('g').call(xAxis).attr('transform', 'translate(0, ' + h+ ')');

    var gGrid = svg.append('g');
    
    d3.range(0,13).forEach((d) => {
        //<line x1="5" y1="5" x2="40" y2="40" stroke="gray" stroke-width="5"  />
        gGrid.append('line')
            .attr('x1',x(d))
            .attr('x2',x(d))
            .attr('y1',20)
            .attr('y2',h)
            .attr('stroke', '#AAA')
            .attr('stroke-width', '1')
    });

    d3.range(0,15).forEach((d) => {
        //<line x1="5" y1="5" x2="40" y2="40" stroke="gray" stroke-width="5"  />
        gGrid.append('line')
            .attr('class','yline-' + d)
            .attr('x1',20)
            .attr('x2',w-250)
            .attr('y1',y(d * 1000000))
            .attr('y2',y(d * 1000000))
            .attr('stroke', '#AAA')
            .attr('stroke-width', '1')
    })

    function start(){
        [dCrec2019, dCrec2020, data[2019], data[2018], data[2017]].forEach( (d1,idx) => {
            
            svg.append('path').attr('class', 'anual '+'y-'+d1.nombre)
                .datum(d1.months)
                .attr("fill",d1.fill)
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 0)
                .style('opacity', 0.8)
                .attr("d", 
                    d3.area()
                        .x((l,n) => x(n))
                        .y0(d => y(0))
                        .y1(d => y(0))
                );

            svg.append('text').attr('class', 'y-'+d1.nombre)
                .attr('x', w-170)
                .attr('y', y(d1.months[12].value))
                .attr('opacity', 0)
                .attr("fill",d1.fill)
                .text((d1.label || d1.nombre) + ': $' + format( Math.round(d1.months[12].value / 1000) ) + 'M')
        })
    } 

    function aniosAnteriores() {

        svg.select('path.y-2017')
            .transition().duration(2000)
            .attr("d", 
                    d3.area()
                        .x((l,n) => x(n))
                        .y0(d => y(0))
                        .y1(d => y(d.value))
                )
            .on('end', r =>{
                svg.select('text.y-2017')
                .attr('opacity', 1)
            })
           


        svg.select('path.y-2018')
                .transition().duration(2000).delay(2500)
                .attr("d", 
                        d3.area()
                            .x((l,n) => x(n))
                            .y0(d => y(0))
                            .y1(d => y(d.value))
                )
                .on('end', r =>{
                    svg.select('text.y-2018')
                    .attr('opacity', 1)
                })
    }


    function crecimiento2019() {
        y.domain([0, max2019]);

        svg.select('path.y-2017')
            .transition().duration(2000)
            .attr("d", 
                d3.area()
                    .x((l,n) => x(n))
                    .y0(d => y(0))
                    .y1(d => y(d.value))
            );

        
        svg.select('path.y-2018')
            .transition().duration(2000)
            .attr("d", 
                d3.area()
                    .x((l,n) => x(n))
                    .y0(d => y(0))
                    .y1(d => y(d.value))
            );

            d3.range(0,15).forEach((d) => {
                //<line x1="5" y1="5" x2="40" y2="40" stroke="gray" stroke-width="5"  />

                

                gGrid.select('line' +'.yline-' + d)
                    .transition().duration(2000)
                    .attr('y1',y(d * 1000000))
                    .attr('y2',y(d * 1000000))
                
            })
            

        svg.select('text.y-2017').transition().duration(2000).attr('y', y(data[2017].months[12].value)) 
        svg.select('text.y-2018').transition().duration(2000).attr('y', y(data[2018].months[12].value)) 


        svg.select('path.y-p-2019')
                .transition().duration(1).delay(2000)
                .style('opacity', 1)
                .attr("d", 
                    d3.area()
                        .x((l,n) => x(n))
                        .y0(d => y(d.vAnt))
                        .y1(d => y(d.vAnt))
                )
            .on('end', r=> {
                svg.select('path.y-p-2019')
                .transition().duration(2000)
                .attr("d", 
                        d3.area()
                            .x((l,n) => x(n))
                            .y0(d => y(d.vAnt))
                            .y1(d => y(d.value))
                    )
                .on('end', r=> {
                    svg.select('text.y-p-2019').attr('y', y(max2019)).attr('opacity', 1)
                })

                
            })
            
    }

    function ventas2019() {
        svg.select('path.y-2019')
            .transition().duration(2000)
            .attr("d", 
                    d3.area()
                        .x((l,n) => x(n))
                        .y0(d => y(0))
                        .y1(d => y(d.value))
                )
            .on('end', r =>{
                svg.select('text.y-2019').attr('opacity', 1).attr('y', y(data[2019].months[12].value)) 
            })
        
        svg.select('path.y-p-2019')
            .transition()
            .duration(2000)
            .delay(2500)
            .style("opacity",0 )
            .on('end', r => {
                svg.select('text.y-p-2019').attr('y', y(max2019)).attr('opacity', 0)
            })

        
    }


    function crecimiento2020() {
        y.domain([0, max2020]);

        svg.select('path.y-2017')
            .transition().duration(2000)
            .attr("d", 
                d3.area()
                    .x((l,n) => x(n))
                    .y0(d => y(0))
                    .y1(d => y(d.value))
            );

        svg.select('path.y-2018')
            .transition().duration(2000)
            .attr("d", 
                d3.area()
                    .x((l,n) => x(n))
                    .y0(d => y(0))
                    .y1(d => y(d.value))
            );

        svg.select('path.y-2019')
            .transition().duration(2000)
            .attr("d", 
                d3.area()
                    .x((l,n) => x(n))
                    .y0(d => y(0))
                    .y1(d => y(d.value))
            );


            d3.range(0,15).forEach((d) => {
                //<line x1="5" y1="5" x2="40" y2="40" stroke="gray" stroke-width="5"  />

                

                gGrid.select('line' +'.yline-' + d)
                    .transition().duration(2000)
                    .attr('y1',y(d * 1000000))
                    .attr('y2',y(d * 1000000))
                
            })

        svg.select('text.y-2017').transition().duration(2000).attr('y', y(data[2017].months[12].value)) 
        svg.select('text.y-2018').transition().duration(2000).attr('y', y(data[2018].months[12].value)) 
        svg.select('text.y-2019').transition().duration(2000).attr('y', y(data[2019].months[12].value)) 


        svg.select('path.y-p-2020')
                .style('opacity', 1)
                .attr("d", 
                    d3.area()
                        .x((l,n) => x(n))
                        .y0(d => y(d.vAnt))
                        .y1(d => y(d.vAnt))
                )
                .transition().duration(2000).delay(2500)
                .attr("d", 
                        d3.area()
                            .x((l,n) => x(n))
                            .y0(d => y(d.vAnt))
                            .y1(d => y(d.value))
                    )
                .on('end', r => {
                    svg.select('text.y-p-2020').attr('y', y(max2020)).attr('opacity', 1)
                })

        
    }
    
    start();
    setTimeout(aniosAnteriores, 0)
    setTimeout(crecimiento2019, 9000)
    setTimeout(ventas2019, 12000)
    setTimeout(crecimiento2020, 16000)


}

