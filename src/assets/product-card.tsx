import type { IProduct } from "../store/slices/products-slice";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { addToWishlist } from "../store/slices/wishlist-slice";
import { useAppDispatch } from "../hooks/redux-hooks";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  return (
    <Card style={{ width: "12rem" }}>
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: "5rem", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        <div className="d-flex flex-column gap-1">
          <Button as={Link} to={`/product/${product.id}`} variant="primary">
            Details
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              dispatch(addToWishlist(product.id));
              toast.success("added to wishlist");
            }}
          >
            Add to wishlist
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
