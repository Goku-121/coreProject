import React from 'react';
import CartList from "../components/cart/CartList.jsx";
import Layout from "../components/layout/Layout.jsx";
import Categories from "../components/products/Categories.jsx";

const CartPage = () => {
    return (
        <Layout>
            <CartList />
            <Categories />
        </Layout>
    );
};

export default CartPage;