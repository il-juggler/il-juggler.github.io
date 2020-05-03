var arcGenerator = d3.arc();



let w   = 500;
let h   = 500;
let svg = d3.select('#cursod3').append('svg').attr('width', w).attr('height', h)
let g   = svg.append('g').attr('transform','translate(' + [w/2, h/2].join(',') + ')')


let arcs = [
    {color:d3.schemeCategory10[0], start:1, end:2}, //unidades 
    {color:d3.schemeCategory10[1], start:2, end:3}, //decenas
    {color:d3.schemeCategory10[2], start:3, end:4}, //centenas
    {color:d3.schemeCategory10[3], start:4, end:5}, //millares
    {color:d3.schemeCategory10[4], start:5, end:6}, //d de millar
    {color:d3.schemeCategory10[7], start:7, end:8}, //segundos
]


arcs.forEach(arc => {
    arc.innerRadius = arc.start * (w/18) 
    arc.outerRadius = arc.end * (w/18);
    arc.startAngle = 0;
    arc.endAngle   = 0;

    arc.arc = d3.arc().innerRadius(arc.innerRadius).outerRadius(arc.outerRadius);
});

let objective = new Date()
objective.setDate(1)
objective.setMonth(5)
objective.setFullYear(2020)
objective.setHours(8);
objective.setMinutes(0)
objective.setSeconds(0);

function update () {

    let Arcs = g.selectAll('g.arc-cont').data(arcs);
    let now = new Date;
    let rest = Math.round((objective -now)/ 1000)
    let minRest = Math.floor(rest / 60)
    let secs = rest - (minRest * 60)
    let d = String(minRest).split('')
    
    d.forEach((num,idx) => {
        arcs[idx].oldEndAngle = arcs[idx].endAngle;
        arcs[idx].endAngle = 2*Math.PI * (num/9);
    })

    arcs[5].oldEndAngle = arcs[5].endAngle
    arcs[5].endAngle = 2*Math.PI * (secs/60)

    let arcEnter = Arcs.enter().append('g').attr('class','arc-cont')


    arcEnter.append('path').attr('class', 'bg-arc') 
        .attr('fill', a => a.color)
        .attr('d', d => d.arc({startAngle:0, endAngle: Math.PI * 2 }))
        .attr('opacity', 0.2)

    arcEnter.append('path').attr('class', 'arc')
        .attr('d', d => d.arc({startAngle:0, endAngle: d.endAngle}))
        .attr('fill', a => a.color)

    
    arcEnter.merge(Arcs)
        .selectAll('.arc')
        .transition()
        .ease(d3.easeElastic)
        .duration(500)
        
    .attrTween('d', function (d,idxd) {
        var start = {startAngle: 0, endAngle: d.oldEndAngle};
        var end   = {startAngle:0, endAngle: d.endAngle};
        if(idxd == 5) {
            //console.log(start, end);
        }
        var interpolate = d3.interpolate(start, end);
        return function (t) {
            if(idxd == 5) {
                //console.log(t, interpolate(t))
            }
            return d.arc(interpolate(t));
        };
    });

    setTimeout(update, 1000 - Date.now() % 1000)
}


update()




/*

d3.range(9).forEach(element => {
    if(element == 0) return;
    if(element == 8) return;

    let data = {
        startAngle: 0,
        endAngle: Math.random() * 2 * Math.PI,
        innerRadius: (w/2) * (1+element)/9 ,
        outerRadius:  (w/2) * (2+element)/9
    }

    var pathData = arcGenerator(data);
    g.append('path').attr('d', pathData)
});
*/
