import { RootState } from "@store/store";
import { useSelector } from "react-redux";

const TotalPrice = () => {
  const { productFullInfo, items } = useSelector(
    (state: RootState) => state.CartSlice
  );
  const itemsLength =
    Object.values(items).length > 0
      ? Object.values(items).reduce((prev, curr) => prev + curr)
      : [];
  const totalPrice =
    productFullInfo.length > 0
      ? productFullInfo.map((item) => item.price * items[item.id])
      : [];
  const totalPriceComibne =
    totalPrice.length > 0 ? totalPrice.reduce((prev, curr) => prev + curr) : 0;

  return (
    <div className="col-lg-4 bg-body-tertiary">
      <div className="p-5">
        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
        <hr className="my-4" />
        <div className="d-flex justify-content-between mb-4">
          <h5 className="text-uppercase">items {itemsLength}</h5>
          <h5>$ {totalPriceComibne.toLocaleString()}</h5>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <h5 className="text-uppercase mb-3">Shipping</h5>
          <h5> Free</h5>
        </div>

        <hr className="my-4" />
        <div className="d-flex justify-content-between mb-5">
          <h5 className="text-uppercase">Total price</h5>
          <h5>$ {totalPriceComibne.toLocaleString()}</h5>
        </div>
        <button
          disabled={totalPriceComibne == 0}
          type="button"
          data-mdb-button-init=""
          data-mdb-ripple-init=""
          className="btn btn-dark btn-block btn-lg"
          data-mdb-ripple-color="dark"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default TotalPrice;
