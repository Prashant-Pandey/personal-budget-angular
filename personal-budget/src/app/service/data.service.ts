import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BudgetDataModel } from '../model/budget-data-schema.model';
import { ChartJSschema } from '../model/chart-js-schema.model';
import { D3JSSchema } from '../model/d3-js-schema.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public chartJSData = {
    datasets: [{
      data: [],
      backgroundColor: []
    }],
    labels: []
  };
  public d3JSData = [];
  private budgetData;
  budgetURL = 'http://localhost:3000/budget';
  constructor(private http: HttpClient) {
  }

  private async getBudgetData() {
    this.budgetData = await this.http.get<BudgetDataModel>(this.budgetURL).toPromise();
  }


  public async generateDataSchema() {
    const budgetData = await this.getBudgetData();
    this.budgetData.data.forEach(budget => {
      this.chartJSData.datasets[0].data.push(+budget.budget);
      this.chartJSData.datasets[0].backgroundColor.push(`rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, 1)`)
      this.chartJSData.labels.push(budget.title);
      this.d3JSData.push({ label: budget.title, value: budget.budget, color: `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, 1)` });
    });
  }


}
