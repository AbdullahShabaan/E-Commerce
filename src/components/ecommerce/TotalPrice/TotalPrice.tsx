import { removeProductsFromCart } from "@store/Cart/CartSlice";
import makeOrder from "@store/Orders/act/actMakeOrder";
import { AppDispatch, RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success mx-2",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const TotalPrice = ({ accessToken }: { accessToken: string | null }) => {
  const { productFullInfo, items } = useSelector(
    (state: RootState) => state.CartSlice
  );
  const { error: orderError } = useSelector(
    (state: RootState) => state.ordersSlice
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
  const dispatch = useDispatch<AppDispatch>();

  const handleMakeOrder = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Are you sure you want to place this order for a total of ${totalPriceComibne.toLocaleString()}? Please confirm to proceed.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        showLoaderOnConfirm: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(makeOrder(totalPriceComibne));
          if (orderError == null) {
            swalWithBootstrapButtons.fire({
              title: "Your order has been successfully placed!",
              text: "Thank you for shopping with us. You'll receive a confirmation email shortly.",
              icon: "success",
            });
            // reset cart products
            dispatch(removeProductsFromCart());
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "An error occurred while placing your order. Please try again later.",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your order has been successfully canceled :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
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
          {accessToken && (
            <button
              onClick={handleMakeOrder}
              disabled={totalPriceComibne == 0}
              type="button"
              data-mdb-button-init=""
              data-mdb-ripple-init=""
              className="btn btn-dark btn-block btn-lg"
              data-mdb-ripple-color="dark"
            >
              Make Order
            </button>
          )}
          {!accessToken && (
            <p>
              You have to <Link to="/login">login</Link> first to make order
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TotalPrice;
