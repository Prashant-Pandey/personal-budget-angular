import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>
  private ctx: CanvasRenderingContext2D
  schema = {
    datasets: [{
      data: [100, 350, 90],
      backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Eat out',
      'Rent',
      'Groceries'
    ]
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      this.schema.datasets[0].data = [];
      this.schema.labels = [];
      this.schema.datasets[0].backgroundColor = [];
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.schema.datasets[0].data.push(data[i].budget);
        this.schema.datasets[0].backgroundColor.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`)
        this.schema.labels.push(data[i].title);
      }
      this.createChart()
    })
  }

  createChart() {
    const myPieChart = new Chart(this.ctx, { type: 'pie',  data: this.schema});
  }

}
