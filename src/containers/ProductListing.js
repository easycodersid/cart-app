import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ProductComponent from "./ProductComponent";
import { setProducts } from '../redux/actions/productActions'
import './ProductListing.css'

const ProductListing = (props) => {
    const products = useSelector((state) => state);

    const dispatch = useDispatch();

    const fetchProducts = async () => {
        let productsList = await axios.get('https://fakestoreapi.com/products')
            .catch((error) => {
                console.log(error);
            });

        dispatch(setProducts(productsList.data));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="ui grid prdt-listing-grid">
            <ProductComponent />
        </div>
    )
}

export default ProductListing;