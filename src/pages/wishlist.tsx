import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "../hooks/redux-hooks";
import ProductCard from "../assets/product-card";
import { useMemo } from "react";

const WhishlistPage = () => {
  const wishlistItems = useAppSelector((state) => state.wishlist.list);
  const products = useAppSelector((state) => state.products.list);

  const productsInWishlist = useMemo(
    () =>
      wishlistItems
        .map((id) => {
          const product = products.find((item) => item.id === id);
          return product;
        })
        .filter((item) => !!item),
    [wishlistItems,products ]
  );
  return (
    <section>
      <h3>Products</h3>
      <Row xs={1} md={2} lg={4} className="g-4">
        {productsInWishlist.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default WhishlistPage;
