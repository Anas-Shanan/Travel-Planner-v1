import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="empty-state" style={{ minHeight: "60vh" }}>
      <div className="empty-state-icon" style={{ fontSize: "8rem" }}>
        404
      </div>
      <div className="empty-state-title">Oops! Page Not Found</div>
      <div className="empty-state-text">
        The page you're looking for doesn't exist or has been moved.
      </div>
      <Link to="/" className="btn btn-primary" style={{ marginTop: "2rem" }}>
        Go Back Home
      </Link>
    </div>
  );
}
