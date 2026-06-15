import React from 'react';
import { Link } from "react-router-dom";
import payment from '../../assets/images/payment.png';

function Footer() {
  return (
    <div>
      <div className="section-bottom shadow-sm bg-light">
        <div className="container py-5">
          <div className="row">

            {/* Legals */}
            <div className="col-md-4">
              <h1 className="bodyMedium">Legals</h1>
              <p className="my-2"><Link className="nav-link" to="/about">About</Link></p>
              <p className="my-2"><Link className="nav-link" to="/refund">Refund Policy</Link></p>
             <p className="my-2"><Link className="nav-link" to="/privacy">Privacy Policy</Link></p>
              <p className="my-2"><Link className="nav-link" to="/terms">Terms of Service</Link></p>
            </div>

            {/* Information */}
            <div className="col-md-4">
              <h1 className="bodyMedium">Information</h1>
              <p className="my-2"><Link className="nav-link" to="/howtobuy">How to buy</Link></p>
              <p className="my-2"><Link className="nav-link" to="/contact">Contact</Link></p>
              <p className="my-2"><Link className="nav-link" to="/complaint">Complain</Link></p>
            </div>

            {/* About */}
            <div className="col-md-4">
              <h1 className="bodyMedium">About</h1>
              <p className="mb-3">
             Core-Vault is Bangladesh's trusted tech shop offering premium laptops, smartphones, and gadgets at secured prices. Core Tech. Secured Deals.
              </p>

              {/* Clickable Payment Image */}
              <a
                href={payment}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="img-fluid"
                  style={{ maxWidth: "320px", height: "auto", cursor: "pointer" }}
                  src={payment}
                  alt="Payment Methods"
                />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-dark py-3 text-center">
        <p className="text-white bodySmal mb-0">All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;