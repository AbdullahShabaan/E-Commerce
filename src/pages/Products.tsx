import Product from "@components/ecommerce/Product/Product";
import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import Loading from "@components/feedback/Loading/Loading";
import { useProducts } from "@hooks/useProducts";

const Products = () => {
  const { catTitle, fullDataInfo, error, loading } = useProducts();
  return (
    <div>
      <Heading title={`${catTitle} Products`} />
      <Container>
        <Loading loading={loading} error={error}>
          <GridList
            message="there is no products available!"
            data={fullDataInfo}
            iteration={(record) => <Product {...record} />}
          />
        </Loading>
      </Container>
    </div>
  );
};

export default Products;
