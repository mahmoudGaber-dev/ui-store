import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductCard from "../assets/product-card";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { fetchAllCategories } from "../store/slices/categories-slice";
import {
  getAllProducts,
  IProduct,
  IProductApI,
} from "../store/slices/products-slice";
import axios from "axios";

const HomePage = () => {
  //const products = useAppSelector((state) => state.products.list);
  const categories = useAppSelector((state) => state.categories.list);

  const dispatch = useAppDispatch();

  //@ mounted
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(getAllProducts());
  }, []);

  //--------------back end-----------------

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      const productMapping: IProduct[] = res.data.map(
        (product: IProductApI) => ({
          ...product,
          id: product._id,
          name: product.title || "Not Found title",
          description: product.description || "Not Found dsec",
          price: product.price,
          category: product.category || "Not Found cat",
        })
      );

      //console.log(res.data);
      //setProducts(res.data);
      setProducts(productMapping);
      setLoading(false);
    });
  },[]);

  //--------------back end-----------------

  //string => {id , image , title}

  return (
    <div>
      <section>
        <h3>HomePage</h3>
      </section>
      <section>
        <h3>Categories</h3>
        {/*---------start categories cards ---------*/}
        <Row xs={1} md={4} lg={6} className="g-4">
          {categories.map((category) => (
            <Col key={category.id}>
              <Card style={{ width: "10rem" }}>
                <Card.Img
                  variant="top"
                  src={category.image}
                  style={{ height: "3rem", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{category.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/*---------end categories cards ---------*/}

      {/*---------start products cards ---------*/}
      <section>
        <h3>Products</h3>
        <Row xs={1} md={2} lg={4} className="g-4">
          {loading ? (
            <div>Loading ... </div>
          ) : (
            products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>
      </section>
      {/*---------end products cards ---------*/}
    </div>
  );
};

export default HomePage;
