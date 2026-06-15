import React from 'react';
import Layout from "../components/layout/layout.jsx";
import InvoiceList from "../components/invoice/invoice-list.jsx";
const OrderPage = () => {
    return (
        <Layout>
            <InvoiceList/>
        </Layout>
    );
};

export default OrderPage;