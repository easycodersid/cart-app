import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedProduct, removeSelectedProduct } from "../redux/actions/productActions";

const ProductDetail = (props) => {
  const { productId } = useParams();

  const product = useSelector((state) => state.product);
  const { title, price, category, image, description } = product;
  console.log(product)

  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
      .catch((error) => {
        console.log(error)
      })
    dispatch(selectedProduct(response.data));
  }

  useEffect(() => {
    if (productId !== "") fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    }
  }, [productId])

  // console.log("product --> ",product)

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" alt={title} style={{ height: "auto" }} src={image} />
              </div>
              <div className="column rp">
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}><a href="/">Back</a></div>
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header" style={{ height: "auto" }}>{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail;