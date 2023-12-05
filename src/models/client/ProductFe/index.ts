export type IProductFe = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export class ProductFe implements IProductFe {
  id: string;
  name: string;
  description: string;
  price: number;
}
