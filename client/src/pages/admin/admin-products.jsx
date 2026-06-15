import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AdminStore from "../../store/AdminStore";
import toast from "react-hot-toast";

const AdminProducts = () => {
    const {
        ProductList, AdminProductListRequest, AdminDeleteProductRequest,
        AdminCreateProductRequest, BrandList, CategoryList,
        AdminBrandListRequest, AdminCategoryListRequest,
        AdminCreateProductDetailsRequest,
        UploadImageRequest
    } = AdminStore();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "", shortDescription: "", price: "", discountPrice: "",
        discount: false, image: "", star: 0, stock: true,
        remark: "", brandId: "", categoryId: "",
        img1: "", img2: "", img3: "", img4: "",
        img5: "", img6: "", img7: "", img8: "",
        description: "", color: "", size: ""
    });

    const [uploading, setUploading] = useState({});

    useEffect(() => {
        const loadData = async () => {
            await AdminProductListRequest();
            await AdminBrandListRequest();
            await AdminCategoryListRequest();
        };
        loadData();
    }, []);

    const onDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        const res = await AdminDeleteProductRequest(id);
        if (res) {
            await AdminProductListRequest();
        }
    };

    const onChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ✅ Fix: axios/base64 সরিয়ে store এর UploadImageRequest use করছি
    const onImageUpload = async (field, file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setUploading(prev => ({ ...prev, [field]: true }));

        try {
            const url = await UploadImageRequest(file); // ✅ FormData দিয়ে পাঠাবে
            if (url) {
                onChange(field, url);
                toast.success("Image uploaded!");
            } else {
                toast.error("Upload failed");
            }
        } catch {
            toast.error("Upload failed. Try again.");
        } finally {
            setUploading(prev => ({ ...prev, [field]: false }));
        }
    };

    const ImageUploadField = ({ field, label }) => (
        <div className="mb-1">
            {label && <label className="form-label">{label}</label>}

            {formData[field] && (
                <div className="mb-2 position-relative" style={{ width: "100px" }}>
                    <img
                        src={formData[field]}
                        alt="preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid #dee2e6" }}
                    />
                    <button
                        onClick={() => onChange(field, "")}
                        style={{
                            position: "absolute", top: "-6px", right: "-6px",
                            background: "#dc3545", border: "none", borderRadius: "50%",
                            color: "#fff", width: "20px", height: "20px",
                            fontSize: "11px", cursor: "pointer", lineHeight: 1
                        }}
                    >✕</button>
                </div>
            )}

            {!formData[field] && (
                <label
                    style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center", border: "2px dashed #dee2e6",
                        borderRadius: "8px", padding: "14px 10px", cursor: "pointer",
                        background: "#f8f9fa", minHeight: "80px"
                    }}
                >
                    {uploading[field] ? (
                        <span className="spinner-border spinner-border-sm text-secondary"></span>
                    ) : (
                        <>
                            <i className="bi bi-cloud-upload fs-4 text-muted"></i>
                            <span className="text-muted" style={{ fontSize: "11px", marginTop: "4px" }}>
                                Click or drag image
                            </span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => onImageUpload(field, e.target.files[0])}
                        disabled={uploading[field]}
                    />
                </label>
            )}

            <input
                className="form-control form-control-sm mt-1"
                placeholder="Or paste image URL"
                value={formData[field]}
                onChange={(e) => onChange(field, e.target.value)}
            />
        </div>
    );

    const onSubmit = async () => {
        if (!formData.title || !formData.price || !formData.image ||
            !formData.brandId || !formData.categoryId ||
            !formData.shortDescription || !formData.description) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            const productRes = await AdminCreateProductRequest({
                title: formData.title,
                shortDescription: formData.shortDescription,
                price: Number(formData.price),
                discountPrice: Number(formData.discountPrice) || 0,
                discount: formData.discount,
                image: formData.image,
                star: Number(formData.star) || 0,
                stock: formData.stock,
                remark: formData.remark,
                brandId: formData.brandId,
                categoryId: formData.categoryId,
            });

            if (!productRes) { toast.error("Failed to create product"); return; }

            const productId = productRes?._id || productRes?.data?._id || productRes?.id;
            if (!productId) { toast.error("Product created but ID not returned"); return; }

            const detailsRes = await AdminCreateProductDetailsRequest({
                productID: productId,
                img1: formData.img1, img2: formData.img2,
                img3: formData.img3, img4: formData.img4,
                img5: formData.img5, img6: formData.img6,
                img7: formData.img7, img8: formData.img8,
                description: formData.description,
                color: formData.color,
                size: formData.size,
            });

            if (detailsRes) {
                toast.success("Product created successfully!");
                setShowModal(false);
                setFormData({
                    title: "", shortDescription: "", price: "", discountPrice: "",
                    discount: false, image: "", star: 0, stock: true,
                    remark: "", brandId: "", categoryId: "",
                    img1: "", img2: "", img3: "", img4: "",
                    img5: "", img6: "", img7: "", img8: "",
                    description: "", color: "", size: ""
                });
                await AdminProductListRequest();
            } else {
                toast.error("Product created but failed to save details");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white fw-semibold d-flex justify-content-between align-items-center">
                    All Products ({ProductList?.length || 0})
                    <button className="btn btn-dark btn-sm" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-lg me-1"></i> Add Product
                    </button>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th><th>Image</th><th>Title</th>
                                    <th>Brand</th><th>Category</th><th>Price</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(!ProductList || ProductList.length === 0) && (
                                    <tr>
                                        <td colSpan={7} className="text-center text-muted py-4">
                                            {ProductList === undefined ? "Loading..." : "No products found"}
                                        </td>
                                    </tr>
                                )}
                                {ProductList?.map((product, i) => {
                                    const brand = BrandList?.find(b => b._id === product.brandId || b._id === product.brandId?._id);
                                    const category = CategoryList?.find(c => c._id === product.categoryId || c._id === product.categoryId?._id);
                                    return (
                                        <tr key={product._id}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={product.image || product.img} alt={product.title}
                                                    style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "6px" }} />
                                            </td>
                                            <td style={{ maxWidth: "250px" }}><div className="text-truncate">{product.title}</div></td>
                                            <td>{brand?.brand || brand?.brandName || "-"}</td>
                                            <td>{category?.categoryName || "-"}</td>
                                            <td className="text-success fw-semibold">৳{product.price}</td>
                                            <td>
                                                <button onClick={() => onDelete(product._id)} className="btn btn-sm btn-outline-danger">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-xl modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">Add New Product</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12"><h6 className="fw-bold text-primary">Basic Information</h6></div>

                                    <div className="col-12">
                                        <label className="form-label">Title *</label>
                                        <input className="form-control" value={formData.title} onChange={(e) => onChange("title", e.target.value)} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Short Description *</label>
                                        <textarea className="form-control" rows={2} value={formData.shortDescription} onChange={(e) => onChange("shortDescription", e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Price *</label>
                                        <input type="number" className="form-control" value={formData.price} onChange={(e) => onChange("price", e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Discount Price</label>
                                        <input type="number" className="form-control" value={formData.discountPrice} onChange={(e) => onChange("discountPrice", e.target.value)} />
                                    </div>

                                    <div className="col-12">
                                        <ImageUploadField field="image" label="Featured Image *" />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Brand *</label>
                                        <select className="form-select" value={formData.brandId} onChange={(e) => onChange("brandId", e.target.value)}>
                                            <option value="">Select Brand</option>
                                            {BrandList?.map(b => <option key={b._id} value={b._id}>{b.brand || b.brandName}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Category *</label>
                                        <select className="form-select" value={formData.categoryId} onChange={(e) => onChange("categoryId", e.target.value)}>
                                            <option value="">Select Category</option>
                                            {CategoryList?.map(c => <option key={c._id} value={c._id}>{c.categoryName}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-12 mt-2"><h6 className="fw-bold text-primary">Product Details</h6></div>

                                    <div className="col-12">
                                        <label className="form-label">Full Description *</label>
                                        <textarea className="form-control" rows={5} value={formData.description} onChange={(e) => onChange("description", e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Color</label>
                                        <input className="form-control" placeholder="black, red, blue" value={formData.color} onChange={(e) => onChange("color", e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
    <label>Remark</label>
    <select className="form-select" value={formData.remark} onChange={(e) => onChange("remark", e.target.value)}>
        <option value="">Select Remark</option>
        <option value="new">New</option>
        <option value="trending">Trending</option>
        <option value="popular">Popular</option>
        <option value="top">Top</option>
        <option value="special">Special</option>
    </select>
</div>
                                    <div className="col-md-6">
                                        <label>Size</label>
                                        <input className="form-control" placeholder="5 inch, XL" value={formData.size} onChange={(e) => onChange("size", e.target.value)} />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-semibold">Additional Images</label>
                                        <div className="row g-3">
                                            {Array.from({ length: 8 }, (_, i) => (
                                                <div className="col-md-3" key={i}>
                                                    <ImageUploadField field={`img${i + 1}`} label={`Image ${i + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-dark" onClick={onSubmit} disabled={loading}>
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span>Creating...</>
                                    ) : "Create Product"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminProducts;