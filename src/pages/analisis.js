import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import Tree from 'react-d3-tree';

const names_cate = ["Categoria 2000", "Categoria 2002"];
const names_tipo = ["Alumno", "Administrador", "Director Deportivo", "Profesor"];


const BarChart = ({ data, names, width, height }) => {
    const svgRef = useRef();
  
    useEffect(() => {
      if (!data || !names || data.length !== names.length) return;
  
      const svg = d3.select(svgRef.current);
  
      const xScale = d3
        .scaleBand()
        .domain(data.map((d, i) => i))
        .range([0, width])
        .padding(0.1);
  
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);
  
      svg.selectAll('*').remove();
  
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d))
        .attr('fill', 'steelblue');
  
      // Agregar etiquetas de cantidad dentro de la barra
      svg
        .selectAll('.bar-text')
        .data(data)
        .enter()
        .append('text')
        .text((d, i) => `${d}\n${names[i]}`) // Separados por un salto de línea
        .attr('class', 'bar-text')
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d) + 10) // Ajuste para mostrar dentro de la barra con un espacio
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', 'white')
        .attr('dominant-baseline', 'middle') // Alineación vertical centrada
        .attr('text-anchor', 'middle'); // Alineación horizontal centrada
    }, [data, names, height, width]);
  
    return <svg ref={svgRef} width={width} height={height} />;
  };

const BoxPlot = ({ data, width, height }) => {
    const svgRef = useRef();
  
    useEffect(() => {
      if (!data) return;
  
      const svg = d3.select(svgRef.current);
  
      // Dimensiones del gráfico
      const margin = { top: 20, right: 40, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
  
      // Escala para el eje x
      const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i))
        .range([0, innerWidth])
        .padding(0.1);
  
      // Escala para el eje y
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data.flat())])
        .nice()
        .range([innerHeight, 0]);
  
      // Crear SVG
      svg.selectAll('*').remove();
  
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // Dibujar líneas de los bigotes
      g.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y1", d => yScale(d[0]))
        .attr("x2", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y2", d => yScale(d[d.length - 1]))
        .attr("stroke", "black")
        .attr("stroke-width", 2);
  
      // Dibujar rectángulos de los cuartiles
      g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d3.median(d)))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d[0]) - yScale(d[d.length - 1]))
        .attr("fill", "lightgrey");
  
      // Dibujar línea horizontal para la mediana
      g.selectAll("median-line")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", (d, i) => xScale(i))
        .attr("y1", d => yScale(d3.median(d)))
        .attr("x2", (d, i) => xScale(i) + xScale.bandwidth())
        .attr("y2", d => yScale(d3.median(d)))
        .attr("stroke", "black")
        .attr("stroke-width", 2);
  
      // Dibujar círculos para los valores atípicos
      g.selectAll("circle")
        .data(data)
        .enter()
        .selectAll("circle")
        .data(d => d)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("cy", d => yScale(d))
        .attr("r", 4)
        .attr("fill", "black");
  
      // Agregar ejes
      const xAxis = d3.axisBottom(xScale).tickFormat((d, i) => i + 1);
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);
  
      const yAxis = d3.axisLeft(yScale);
      g.append("g")
        .call(yAxis);
    }, [data, height, width]);
  
    return <svg ref={svgRef} width={width} height={height} />;
};

const HierarchicalBarChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const treemap = d3.treemap()
      .size([innerWidth, innerHeight])
      .padding(1)
      .round(true);

    treemap(root);

    svg.selectAll('*').remove();

    const cell = svg.selectAll('g')
      .data(root.leaves())
      .enter().append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => color(d.parent.data.name));

    cell.append('text')
      .attr('x', d => (d.x1 - d.x0) / 2)
      .attr('y', d => (d.y1 - d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .text(d => `${d.data.name}: ${d.data.value}`);
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

const OcclusionWordChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([innerHeight, 0]);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.value.length)]);

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value.length))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.value.length))
      .attr('fill', 'steelblue');

    g.selectAll('.bar-text')
      .data(data)
      .enter().append('text')
      .attr('class', 'bar-text')
      .attr('x', d => x(d.name) + x.bandwidth() / 2)
      .attr('y', d => y(d.value.length) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .text(d => d.value);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')));
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

const dataOc = [
  { name: 'Category A', value: 'Word1' },
  { name: 'Category B', value: 'Word1' },
  { name: 'Category C', value: 'Word4 Word5 Word6' },
  { name: 'Category D', value: 'Word7 Word8 Word9 Word10' }
];

const data = {
    name: 'Parent',
    children: [
      { name: 'Child 1', value: 5 },
      { name: 'Child 2', value: 3 },
      { name: 'Child 3', value: 2 },
      { name: 'Child 4', value: 4 },
    ]
  };

export default function Home({user, eventos, usuario_a, usuario_ad, usuario_d, usuario_p, edades_alumnos, tarjetas_a, tarjetas_r, direccion, pagos}) {
  //console.log(direccion)  
   
  //console.log(tarjetas_a)  

    let tarj_ama = {name: 'Parent', children: tarjetas_a}
    let tarj_roj = {name: 'Parent', children: tarjetas_r}
    let pagos_ = {name: 'Parent', children: pagos}

    //console.log(pagos_) 
    //console.log(tarj_ama)  

    let nacimiento_alumno = []
    let j = 0;
    while(j < eventos.length){ 
        nacimiento_alumno.push(Number(edades_alumnos[j].fecha_naci_usuario));
        j++;
    }
    //console.log(nacimiento_alumno)


    let usuarios = []

    usuarios.push(usuario_a[0].count, usuario_ad[0].count, usuario_d[0].count, usuario_p[0].count)

    //console.log(usuarios)

    let goles = []
    let i = 0;
    while(i < eventos.length){ 
        goles.push(eventos[i].goles_favor);
        i++;
    }
    //console.log(goles)

    return (
        <>
        <Navegador user={user}/>
        <div className="flex justify-center my-20">
            <BarChart data={goles} names={names_cate} width={400} height={300}/>
        </div> 
        <h1 className="flex justify-center">Cantidad de goles por partidos</h1>  

        <div className="flex justify-center my-20">
            <BarChart data={usuarios} names={names_tipo} width={400} height={300}/>
            
        </div> 
        <h1 className="flex justify-center">Cantidad de usuarios en la plataforma</h1>  
        
        <div className="flex justify-center my-20">
            <BoxPlot data={[nacimiento_alumno]} width={600} height={400} />
        </div> 
        <h1 className="flex justify-center">Cajas y bigotes correspondiente a edad por categoria</h1> <br></br>

        <div className="flex justify-center my-20">
          <HierarchicalBarChart data={tarj_ama} width={500} height={300} />
        </div>
        <h1 className="flex justify-center">Categorias y tarjetas Amarillas</h1> <br></br>
        
        <div className="flex justify-center my-20">
          <HierarchicalBarChart data={tarj_roj} width={500} height={300} />
        </div>
        <h1 className="flex justify-center">Categorias y tarjetas Rojas</h1> <br></br>

        <div className="flex justify-center my-20">
          <OcclusionWordChart data={direccion} width={500} height={300} /> 
        </div>
        <h1 className="flex justify-center">Categorias y direcciones de eventos</h1> <br></br>

        <div className="flex justify-center my-20">
          <HierarchicalBarChart data={pagos_} width={500} height={300} /> 
        </div>
        <h1 className="flex justify-center">Cuentas de pago y sus respectivas validaciones</h1> <br></br>
        

        </>
    )
    
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user");
    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
    const {data: eventos} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/eventos"
        );

    const {data: usuario_a} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/usuario_a"
        );
    const {data: usuario_ad} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/usuario_ad"
        );
    const {data: usuario_d} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/usuario_d"
        );
    const {data: usuario_p} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/usuario_p"
        ); 
    
    const {data: edades_alumnos} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/edades_alumnos"
        );

    const {data: tarjetas_a} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/tarjetas_a"
      );
    
    const {data: tarjetas_r} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/tarjetas_r"
      );
    const {data: direccion} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/dire_even"
      );

      const {data: pagos} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/graficas/pagos"
      );
        

    return {
      props: { eventos,
        usuario_a,
        usuario_ad,
        usuario_d,
        usuario_p,
        edades_alumnos,
        tarjetas_a,
        tarjetas_r,
        direccion,
        pagos,
               user: req.session.get("user"),     
        },
               
    };
  });