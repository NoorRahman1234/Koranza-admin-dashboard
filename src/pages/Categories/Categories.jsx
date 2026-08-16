import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import './Categories.css';

const Categories = ({ toggleSidebar }) => {
    const { categories, addCategory, updateCategory, deleteCategory } = useData();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        status: 'Active'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            slug: name === 'name' ? value.toLowerCase().replace(/\s+/g, '-') : prev.slug
        }));
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        addCategory(formData);
        setShowAddModal(false);
        setFormData({ name: '', slug: '', status: 'Active' });
    };

    const handleDelete = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            // deleteCategory(categoryToDelete.id);
            deleteCategory(categoryToDelete._id || categoryToDelete.id);
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    const toggleStatus = (category) => {
        updateCategory(category.id, {
            status: category.status === 'Active' ? 'Inactive' : 'Active'
        });
    };

    return (
        <div className="page-wrapper">
            <Header title="Categories" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                <div className="card">
                    <div className="section-header">
                        <h3>Category List ({categories.length})</h3>
                        <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add Category</button>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th className="hide-on-mobile">Slug</th>
                                    <th className="hide-on-mobile">Products</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {categories.map((category) => ( */}
                                {categories.map((category, index) => (

                                    // <tr key={category.id}>
                                    <tr key={category._id || category.id}>
                                        {/* <td>{category.id}</td> */}
                                        {/* <td>{category._id || category.id}</td> */}
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td className="hide-on-mobile">{category.slug}</td>
                                        {/* <td className="hide-on-mobile">{category.count}</td> */}
                                        <td className="hide-on-mobile">{category.count || 0}</td>
                                        <td>
                                            <span className={`status ${category.status.toLowerCase()}`}>
                                                {category.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button
                                                    className={`status-toggle ${category.status.toLowerCase()}`}
                                                    onClick={() => toggleStatus(category)}
                                                    title={`Set to ${category.status === 'Active' ? 'Inactive' : 'Active'}`}
                                                >
                                                    {category.status === 'Active' ? '✓' : '✕'}
                                                </button>
                                                <button className="delete-btn" onClick={() => handleDelete(category)}>
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {/* Add Category Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add New Category</h3>
                        <form onSubmit={handleAddCategory}>
                            <div className="form-group">
                                <label>Category Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    readOnly
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
                                <button type="submit" className="confirm-btn">Add Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{categoryToDelete?.name}"?</p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="confirm-btn delete" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
