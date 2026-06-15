import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AdminStore from "../../store/AdminStore";

const AdminDashboard = () => {
    const { Summary, AdminSummaryRequest, isAdminLogin } = AdminStore();

    useEffect(() => {
        if (!isAdminLogin()) {
            window.location.href = "/admin/login";
            return;
        }
        (async () => {
            await AdminSummaryRequest();
        })();
    }, []);

    const cards = [
        { label: "Total Users", value: Summary?.totalUsers ?? "...", icon: "bi-people-fill", color: "primary" },
        { label: "Total Products", value: Summary?.totalProducts ?? "...", icon: "bi-box-seam-fill", color: "success" },
        { label: "Total Orders", value: Summary?.totalOrders ?? "...", icon: "bi-receipt-cutoff", color: "warning" },
        { label: "Pending Orders", value: Summary?.pendingOrders ?? "...", icon: "bi-hourglass-split", color: "danger" },
    ];

    return (
        <AdminLayout>
            <div className="row g-4">
                {cards.map((card, i) => (
                    <div key={i} className="col-xl-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className={`bg-${card.color} bg-opacity-10 rounded-3 p-3`}>
                                    <i className={`bi ${card.icon} fs-3 text-${card.color}`}></i>
                                </div>
                                <div>
                                    <div className="text-muted small">{card.label}</div>
                                    <div className="fw-bold fs-4">{card.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;