import React, { useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AdminStore from "../../store/AdminStore";
import toast from "react-hot-toast";

const AdminUsers = () => {
    const { UserList, AdminUserListRequest, AdminDeleteUserRequest } = AdminStore();

    useEffect(() => {
        (async () => { await AdminUserListRequest(); })();
    }, []);

    const onDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        let res = await AdminDeleteUserRequest(id);
        if (res) {
            toast.success("User deleted");
            await AdminUserListRequest();
        } else {
            toast.error("Failed to delete user");
        }
    };

    return (
        <AdminLayout>
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white fw-semibold">All Users ({UserList?.length || 0})</div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Verified</th>
                                    <th>Joined</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {UserList?.length === 0 && (
                                    <tr><td colSpan={6} className="text-center text-muted py-4">No users found</td></tr>
                                )}
                                {UserList?.map((user, i) => (
                                    <tr key={user._id}>
                                        <td>{i + 1}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-secondary"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.is_verified ? "bg-success" : "bg-warning text-dark"}`}>
                                                {user.is_verified ? "Verified" : "Pending"}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {user.role !== "admin" && (
                                                <button
                                                    onClick={() => onDelete(user._id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            )}
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

export default AdminUsers;