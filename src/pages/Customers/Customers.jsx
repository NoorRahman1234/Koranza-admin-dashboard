import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import './Customers.css';

const Customers = ({ toggleSidebar }) => {
    const { customers, addCustomer, updateCustomer } = useData();
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Active'
    });

    // Filter customers based on search
    const filteredCustomers = customers.filter(customer => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            customer.name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.phone.includes(query) ||
            customer.id.toString().includes(query)
        );
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddCustomer = (e) => {
        e.preventDefault();
        addCustomer(formData);
        setShowAddModal(false);
        setFormData({ name: '', email: '', phone: '', status: 'Active' });
    };

    const toggleStatus = (customer) => {
        updateCustomer(customer.id, {
            status: customer.status === 'Active' ? 'Inactive' : 'Active'
        });
    };

    return (
        <div className="page-wrapper">
            <Header title="Customers" toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />
            <div className="page-container">
                <div className="card">
                    <div className="section-header">
                        <h3>Customer List ({filteredCustomers.length})</h3>
                        <button className="add-btn" onClick={() => setShowAddModal(true)}>
                            + Add Customer
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th className="hide-on-mobile">Email</th>
                                    <th className="hide-on-mobile">Phone</th>
                                    <th className="hide-on-mobile">Orders</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td className="hide-on-mobile">{customer.email}</td>
                                        <td className="hide-on-mobile">{customer.phone}</td>
                                        <td className="hide-on-mobile">{customer.orders || 0}</td>
                                        <td>
                                            <span className={`status ${customer.status.toLowerCase()}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`status-toggle ${customer.status.toLowerCase()}`}
                                                onClick={() => toggleStatus(customer)}
                                                title={`Set to ${customer.status === 'Active' ? 'Inactive' : 'Active'}`}
                                            >
                                                {customer.status === 'Active' ? '✓ Active' : '✕ Inactive'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {/* Add Customer Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add New Customer</h3>
                        <form onSubmit={handleAddCustomer}>
                            <div className="form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="confirm-btn">Add Customer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
