import { useParams } from "react-router";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../store/slices/products-slice";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params.id ?? "";

  //const products = useAppSelector((state) => state.products.list);
  //const product = products.filter((item) => {

  //--------------back end-----------------

  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${productId}`).then((res) => {
      const product = res.data;
      setLoading(false);
      setProduct({
        ...res.data,
        id: res.data._id,
        name: product.title || "Not Found title",
        description: product.description || "Not Found dsec",
        price: product.price,
        category: product.category || "Not Found cat",
      });
    });
  }, [productId]);

  //--------------back end-----------------

  //   return item.id.toString() === productId.toString();
  // })[0];

  // id

  //list of products ( store )

  //get the current product

  if (!loading) return <div>Loading ...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      ProductDetailsPage <br />
      <br /> {/* {productId} */}
      <section className="d-flex flex-row gap-3">
        <img
          src={product.image}
          alt={product.name}
          style={{ maxHeight: "19rem", width: "60%", objectFit: "cover" }}
        />
        <Card style={{ width: "18rem", margin: "10px" }}>
          {/* <Card.Img variant="top" style={{maxHeight:"5rem"}} src={product.image} /> */}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Category: {product.category}</Card.Text>
            <Card.Text>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Card.Text>
            {product.stock > 0 && (
              <Button variant="primary">Add to cart</Button>
            )}
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
