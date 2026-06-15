import React from 'react'
import Layout from "../components/layout/layout.jsx";
import WishList from "../components/wishlist/wish-list.jsx";
import Brands from "../components/products/Brands.jsx";

 const WishPage = () => {
    return (
        <Layout>
            <WishList/>
            <Brands/>
        </Layout>
    );
};
export default WishPage