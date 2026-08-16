


import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '../../services/api';
import Header from '../../components/Header/Header';
import './Orders.css';

const AdminOrders = ({ toggleSidebar }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // const response = await axios.get('http://localhost:3000/api/orders');
      const response = await api.get('/orders');

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    // Use _id if available, otherwise fallback to id
    const targetId = order._id || order.id;

    try {
      // const res = await axios.put(
      //   `http://localhost:3000/api/orders/${targetId}`,
      //   {
      //     status: newStatus
      //   }
      // );
      const res = await api.put(
  `/orders/${targetId}`,
  {
    status: newStatus
  }
);

      if (res.data.success) {
        // Update main orders table state
        setOrders(prev =>
          prev.map(ord =>
            (ord._id === targetId || ord.id === targetId)
              ? { ...ord, status: newStatus }
              : ord
          )
        );

        // Update detail card state if currently open
        if (
          selectedOrder &&
          (selectedOrder._id === targetId || selectedOrder.id === targetId)
        ) {
          setSelectedOrder(prev => ({
            ...prev,
            status: newStatus
          }));
        }
      }
    } catch (error) {
      console.error("Error updating status in database:", error);
      alert("Failed to update status in MongoDB.");
    }
  };

  // Search orders
  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    const orderId = String(order.id || order._id || '').toLowerCase();
    const customer = String(order.customer || '').toLowerCase();
    const date = String(order.date || '').toLowerCase();
    const status = String(order.status || '').toLowerCase();

    return (
      orderId.includes(query) ||
      customer.includes(query) ||
      date.includes(query) ||
      status.includes(query)
    );
  });

  if (loading) {
    return <div className="loading-container">Loading orders...</div>;
  }

  return (
    <div className="page-wrapper">

      {/* Same Header used by Customers page */}
      <Header
        title="Orders"
        toggleSidebar={toggleSidebar}
        onSearch={setSearchQuery}
      />

      <div className="page-container">

        {/* Recent Orders Card Table */}
        <div className="content-card">

          <h2 className="table-heading">
            Recent Orders ({filteredOrders.length})
          </h2>

          <table className="custom-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th className="align-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id || order.id}>

                    <td className="text-secondary">
                      {order.id}
                    </td>

                    <td className="text-primary-bold">
                      {order.customer}
                    </td>

                    <td className="text-secondary">
                      {order.date}
                    </td>

                    <td className="text-primary-bold">
                      ${order.total?.toFixed(2)}
                    </td>

                    <td>
                      <div
                        className={`status-pill ${
                          order.status?.toLowerCase()
                        }`}
                      >
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </div>
                    </td>

                    <td className="align-right">
                      <button
                        className="action-link"
                        onClick={() =>
                          setSelectedOrder(
                            selectedOrder?.id === order.id
                              ? null
                              : order
                          )
                        }
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div className="content-card modal-section">

            <button
              className="close-icon-btn"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>

            <h3 className="modal-header-title">
              Order Details - {selectedOrder.id}
            </h3>

            <div className="info-summary-box">

              <div className="info-column">

                <span className="field-label">
                  Customer Name
                </span>

                <span className="field-value bold">
                  {selectedOrder.customer}
                </span>

                <span className="field-label">
                  Order Date
                </span>

                <span className="field-value">
                  {selectedOrder.date}
                </span>

              </div>

              <div className="info-column">

                <span className="field-label">
                  Order ID
                </span>

                <span className="field-value bold">
                  {selectedOrder.id}
                </span>

                <span className="field-label">
                  Status
                </span>

                <span
                  className={`field-value status-text ${
                    selectedOrder.status?.toLowerCase()
                  }`}
                >
                  {selectedOrder.status}
                </span>

              </div>

            </div>

            <h4 className="center-subheading">
              Order Items
            </h4>

            <table className="custom-table items-subtable">

              <thead>
                <tr>
                  <th>Product</th>
                  <th className="align-center">
                    Quantity
                  </th>
                  <th className="align-center">
                    Price
                  </th>
                  <th className="align-right">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {selectedOrder.items?.map((item, index) => (
                  <tr key={index}>

                    <td className="text-primary">
                      {item.product}
                    </td>

                    <td className="align-center text-secondary">
                      {item.quantity}
                    </td>

                    <td className="align-center text-secondary">
                      ${item.price?.toFixed(2)}
                    </td>

                    <td className="align-right text-primary">
                      ${
                        (
                          item.price * item.quantity
                        ).toFixed(2)
                      }
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <div className="totals-footer">

              <div className="totals-row">
                <span>Subtotal:</span>

                <span className="bold">
                  ${selectedOrder.total?.toFixed(2)}
                </span>
              </div>

              <div className="totals-row highlight">

                <span>Total:</span>

                <span className="total-accent-price">
                  ${selectedOrder.total?.toFixed(2)}
                </span>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrders;