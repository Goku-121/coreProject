import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductStroe from '../store/ProductStore';   
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';

const ProductByKeyword = () => {
    const { ListByKeywordRequest } = ProductStroe();
    const { keyword } = useParams();

    useEffect(() => {
        if (keyword) {
            ListByKeywordRequest(keyword);
        }
    }, [keyword]);

    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;