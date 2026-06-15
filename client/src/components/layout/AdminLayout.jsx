import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminStore from "../../store/AdminStore";

const AdminLayout = ({ children }) => {
    const location = useLocation();
    
    // Correctly destructure from Zustand store
    const { 
        AdminInfo, 
        getAdminInfo, 
        AdminLogout 
    } = AdminStore();

    const [collapsed, setCollapsed] = useState(false);

    // Fetch admin info when component mounts
    useEffect(() => {
        if (typeof getAdminInfo === "function") {
            getAdminInfo();
        }
    }, [getAdminInfo]);

    const navItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: "bi-speedometer2" },
        { path: "/admin/products", label: "Products", icon: "bi-box-seam" },
        { path: "/admin/orders", label: "Orders", icon: "bi-receipt" },
        { path: "/admin/users", label: "Users", icon: "bi-people" },
    ];

    const onLogout = () => {
        AdminLogout();
    };

    const sidebarWidth = collapsed ? "70px" : "240px";

    return (
        <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
            {/* ─── SIDEBAR ─── */}
            <div style={{
                width: sidebarWidth,
                minHeight: "100vh",
                background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 60%, #16213e 100%)",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.25s ease",
                overflow: "hidden",
                position: "fixed",
                top: 0, left: 0, bottom: 0,
                zIndex: 100,
                borderRight: "1px solid rgba(255,255,255,0.07)"
            }}>
                {/* Logo */}
                <div style={{
                    padding: collapsed ? "20px 0" : "24px 20px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between"
                }}>
                    {!collapsed && (
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: "10px",
                                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <i className="bi bi-shield-lock-fill" style={{ color: "#fff", fontSize: "16px" }}></i>
                                </div>
                                <div>
                                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", lineHeight: 1.2 }}>Admin</div>
                                    <div style={{ color: "#a0aec0", fontSize: "11px" }}>Control Panel</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {collapsed && (
                        <div style={{
                            width: 36, height: 36, borderRadius: "10px",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <i className="bi bi-shield-lock-fill" style={{ color: "#fff", fontSize: "16px" }}></i>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            background: "none", border: "none", color: "#a0aec0",
                            cursor: "pointer", fontSize: "16px",
                            display: collapsed ? "none" : "block"
                        }}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                </div>

                {/* Admin Info Badge */}
                {!collapsed && AdminInfo && (
                    <div style={{
                        margin: "14px 14px 0",
                        padding: "12px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.08)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%",
                                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0
                            }}>
                                {AdminInfo.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div style={{ overflow: "hidden" }}>
                                <div style={{ color: "#fff", fontWeight: 600, fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {AdminInfo.name}
                                </div>
                                <div style={{ color: "#718096", fontSize: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    ID: {AdminInfo._id?.slice(-8) || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nav Items */}
                <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {!collapsed && (
                        <div style={{ color: "#4a5568", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", padding: "0 8px 8px", textTransform: "uppercase" }}>
                            Main Menu
                        </div>
                    )}
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={collapsed ? item.label : ""}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: collapsed ? 0 : "12px",
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    padding: collapsed ? "12px" : "11px 14px",
                                    borderRadius: "10px",
                                    textDecoration: "none",
                                    background: isActive
                                        ? "linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))"
                                        : "transparent",
                                    color: isActive ? "#a78bfa" : "#718096",
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: "14px",
                                    transition: "all 0.18s ease",
                                    borderLeft: isActive ? "3px solid #a78bfa" : "3px solid transparent",
                                }}
                            >
                                <i className={`bi ${item.icon}`} style={{ fontSize: "17px", flexShrink: 0 }}></i>
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Buttons */}
                <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {!collapsed && (
                        <Link to="/" style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px 14px", borderRadius: "10px",
                            textDecoration: "none", color: "#718096", fontSize: "13px",
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)"
                        }}>
                            <i className="bi bi-shop" style={{ fontSize: "15px" }}></i>
                            <span>Visit Store</span>
                        </Link>
                    )}
                    <button
                        onClick={onLogout}
                        style={{
                            display: "flex", alignItems: "center",
                            gap: collapsed ? 0 : "10px",
                            justifyContent: collapsed ? "center" : "flex-start",
                            padding: collapsed ? "12px" : "10px 14px",
                            borderRadius: "10px", border: "none", cursor: "pointer",
                            color: "#fc8181", fontSize: "13px",
                            background: "rgba(252,129,129,0.08)",
                            width: "100%"
                        }}
                    >
                        <i className="bi bi-box-arrow-left" style={{ fontSize: "15px", flexShrink: 0 }}></i>
                        {!collapsed && <span>Logout</span>}
                    </button>
                    {collapsed && (
                        <button
                            onClick={() => setCollapsed(false)}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                padding: "10px", borderRadius: "10px", border: "none",
                                cursor: "pointer", color: "#a0aec0", background: "rgba(255,255,255,0.05)",
                                width: "100%"
                            }}
                        >
                            <i className="bi bi-chevron-right" style={{ fontSize: "14px" }}></i>
                        </button>
                    )}
                </div>
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div style={{
                marginLeft: sidebarWidth,
                flex: 1,
                transition: "margin-left 0.25s ease",
                background: "#f7f8fc",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Top Navbar */}
                <div style={{
                    background: "#fff",
                    borderBottom: "1px solid #e2e8f0",
                    padding: "0 28px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "sticky", top: 0, zIndex: 50
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <i className={`bi ${navItems.find(n => n.path === location.pathname)?.icon || "bi-grid"}`}
                           style={{ color: "#667eea", fontSize: "18px" }}></i>
                        <span style={{ fontWeight: 700, color: "#1a202c", fontSize: "16px" }}>
                            {navItems.find(n => n.path === location.pathname)?.label || "Admin"}
                        </span>
                    </div>

                    {AdminInfo && (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: "#2d3748" }}>{AdminInfo.name}</div>
                                <div style={{ fontSize: "11px", color: "#a0aec0" }}>{AdminInfo.email}</div>
                            </div>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%",
                                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "14px", fontWeight: 700, color: "#fff"
                            }}>
                                {AdminInfo.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                        </div>
                    )}
                </div>

                {/* Page Content */}
                <div style={{ padding: "28px", flex: 1 }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;