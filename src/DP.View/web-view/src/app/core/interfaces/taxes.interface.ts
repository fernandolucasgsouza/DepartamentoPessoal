export interface ITaxes {
  year?: string;
  datas: Array<IDatasTaxes>;
}

interface IDatasTaxes {
  description: string;
  minimum: number;
  maximum: number;
  percentage: number;
  deduction?: number;
}
