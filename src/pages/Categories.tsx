import { useEffect } from "react";
import Category from "@components/ecommerce/Category/Category";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/common";
import { getCategories } from "@store/Categories/categoriesSlice";
import { AppDispatch, RootState } from "@store/store";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categoriesSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!data.length) {
      dispatch(getCategories());
    }
  }, [dispatch, data]);

  return (
    <div>
      <Heading>Categories</Heading>
      <Container>
        <Loading loading={loading} error={error}>
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
