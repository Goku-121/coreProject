const {
    CreateInvoiceService,
    InvoiceListService,
    InvoiceProductListService,
    PaymentSuccessInvoiceService,
    PaymentCancelService,
    PaymentFailService,
    PaymentIPNInvoiceService
} = require("../services/InvoiceServices");

// ================= CREATE INVOICE =================
exports.CreateInvoiceService = async (req, res) => {
    let result = await CreateInvoiceService(req);
    return res.status(200).json(result);
};

// ================= INVOICE LIST =================
exports.InvoiceListService = async (req, res) => {
    let result = await InvoiceListService(req);
    return res.status(200).json(result);
};

// ================= INVOICE PRODUCTS =================
exports.InvoiceProductListService = async (req, res) => {
    let result = await InvoiceProductListService(req);
    return res.status(200).json(result);
};

// ================= PAYMENT SUCCESS =================
exports.PaymentSuccessInvoiceService = async (req, res) => {
    await PaymentSuccessInvoiceService(req);
    return res.redirect(`http://localhost:5173/orders`); 
};


// ================= PAYMENT CANCEL =================
exports.PaymentCancelService = async (req, res) => {
    await PaymentCancelService(req);
    return res.redirect(`http://localhost:5173/cart`); 
};

// ================= PAYMENT FAIL =================
exports.PaymentFailService = async (req, res) => {
    await PaymentFailService(req);
    return res.redirect(`http://localhost:5173/cart`); 
};

// ================= IPN =================
exports.PaymentIPNInvoiceService = async (req, res) => {
    let result = await PaymentIPNInvoiceService(req);
    return res.status(200).json(result);
};