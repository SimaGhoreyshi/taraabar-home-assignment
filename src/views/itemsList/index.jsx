import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Card, Span, Spinner } from "../../components";
import { fetchProductsList } from "../../store";

const Container = styled.main`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, minmax(30%, 35rem));
  grid-template-rows: repeat(auto);
  grid-gap: 2rem;
  width: 100%;
`;

export const ItemsList = () => {
  const dispatch = useDispatch();
  const onFetchProductsList = useCallback(() => {
    return dispatch(fetchProductsList());
  }, [dispatch]);

  useEffect(() => {
    debugger;
    onFetchProductsList();
  }, [onFetchProductsList]);

  const { error, loading, products } = useSelector(
    (state) => state?.productsList
  );

  if (error) {
    return <Span textAlign="center">خطایی رخ داد</Span>;
  }
  //if no error
  if (loading) {
    return <Spinner />;
  }
  console.log(products);

  //if no error and loading completed
  return (
    <Container>
      {products?.map((product) => (
        <Card
          key={product?.id}
          image={product?.image}
          title={product?.title}
          id={product?.id}
        />
      ))}
    </Container>
  );
};
