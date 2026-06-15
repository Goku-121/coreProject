import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AdminStore from "../../store/AdminStore";
import toast from "react-hot-toast";

const AdminOrders = () => {
    const { OrderList, AdminOrderListRequest, AdminUpdateOrderStatusRequest } = AdminStore();
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        (async () => { await AdminOrderListRequest(); })();
    }, []);

    const statusBadge = (status) => {
        const map = {
            success: "bg-success",
            pending: "bg-warning text-dark",
            failed: "bg-danger",
            cancelled: "bg-secondary",
            Delivered: "bg-success",
            Shipped: "bg-info text-dark",
            Processing: "bg-primary",
            Cancelled: "bg-danger",
        };
        return map[status] || "bg-secondary";
    };

    const onStatusChange = async (id, status) => {
        setUpdatingId(id);
        let res = await AdminUpdateOrderStatusRequest(id, status);
        if (res) {
            toast.success("Order status updated");
            await AdminOrderListRequest();
        } else {
            toast.error("Failed to update status");
        }
        setUpdatingId(null);
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">All Orders ({OrderList?.length || 0})</h5>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Invoice ID</th>
                                    <th>Amount</th>
                                    <th>Payment</th>
                                    <th>Delivery Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {OrderList?.length === 0 && (
                                    <tr><td colSpan={7} className="text-center text-muted py-4">No orders found</td></tr>
                                )}
                                {OrderList?.map((order, i) => (
                                    <tr key={order._id}>
                                        <td>{i + 1}</td>
                                        <td><small className="text-muted">{order._id}</small></td>
                                        <td className="fw-semibold text-success">৳{order.payable || order.total || 0}</td>
                                        <td>
                                            <span className={`badge ${statusBadge(order.payment_status)}`}>
                                                {order.payment_status || "pending"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${statusBadge(order.delivery_status)}`}>
                                                {order.delivery_status || "pending"}
                                            </span>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                style={{ minWidth: "130px" }}
                                                value={order.delivery_status || "pending"}
                                                disabled={updatingId === order._id}
                                                onChange={(e) => onStatusChange(order._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;