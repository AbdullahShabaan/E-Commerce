import Category from "@components/ecommerce/Category/Category";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/common";
import { Container } from "react-bootstrap";
import { useCategories } from "@hooks/useCategories";

const Categories = () => {
  const { data, loading, error } = useCategories();

  return (
    <div>
      <Heading title="Categories" />
      <Container>
        <Loading loading={loading} error={error} type="category">
          <GridList
            message="there is no categories available!"
            data={data}
            iteration={(record) => <Category {...record} />}
          />
        </Loading>
      </Container>
    </div>
  );
};

export default Categories;
