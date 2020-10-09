import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import * as d3 from "d3";
import { ChartJSschema } from '../model/chart-js-schema.model';
import { DataService } from '../service/data.service';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>
  private ctx: CanvasRenderingContext2D
  private svg;
  private radius;
  public mainSvgGrp;
  constructor(private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    if (this.dataService.d3JSData.length === 0) {
      await this.dataService.generateDataSchema();
    }

    this.ctx = this.canvas.nativeElement.getContext('2d')
    await this.createD3Chart()
    await this.createChartJS()
  }

  async createD3Chart() {
    this.svg = d3.select("#d3Chart");
    const width = +this.svg.attr("width"),
      height = +this.svg.attr("height");
    this.radius = Math.min(width, height) / 2;

    this.mainSvgGrp = this.svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const pie = d3.pie()
      .sort(null)
      .value((d: any) => parseInt(d.value));

    const data_ready = pie(this.dataService.d3JSData);

    const arc = d3.arc()
      .innerRadius(this.radius * 0.4)
      .outerRadius(this.radius * 0.8)

    const outerArc = d3.arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9)

    const rad = this.radius;
    this.mainSvgGrp.selectAll('.arcs')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'arcs')
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', '2px');
    this.mainSvgGrp.selectAll('.polyline')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr('class', 'polyline')
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d)
        var posB = outerArc.centroid(d)
        var posC = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = rad * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC]
      });

    this.mainSvgGrp
      .selectAll('.text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.label)
      .attr('class', 'text')
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = rad * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
      })

  }

  async createChartJS() {
    const myPieChart = new Chart(this.ctx, { type: 'pie', data: this.dataService.chartJSData });
  }

}
