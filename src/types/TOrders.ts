import { TProducts } from "./TProducts";

type TOrder = {
  id: number;
  userId: number;
  totalPrice: number;
  items: TProducts[];
};

export default TOrder;
