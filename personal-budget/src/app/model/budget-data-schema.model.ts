export class BudgetDataModel{
  data: Array<BudgetDataDataset>
}

class BudgetDataDataset{
  title: String
  budget: Number|String
}
