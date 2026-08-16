


// import React, { useState, useEffect } from 'react';
// import Header from '../../components/Header/Header';
// import { useData } from '../../contexts/DataContext';
// import { useCurrency } from '../../contexts/CurrencyContext';
// import api from '../../services/api';
// // import img from '../../assets/watch.png'
// import './Products.css';

// const Products = ({ toggleSidebar }) => {
//     const { deleteProduct, updateProduct } = useData();
//     const [products, setProducts] = useState([]);
//     const { formatCurrency } = useCurrency();
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [productToDelete, setProductToDelete] = useState(null);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [editFormData, setEditFormData] = useState({});
//     const [editPreviews, setEditPreviews] = useState({
//         image: null,
//         hoverImg: null,
//         image2: null,
//         image3: null,
//         image4: null
//     });
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get('/products');
//                 // Handles API response whether array is in response.data or response.data.data
//                 const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Failed to fetch products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Fixed: Handles Mongo _id fallback and safe string checks
//     const filteredProducts = products.filter(product => {
//         if (!searchQuery) return true;
//         const query = searchQuery.toLowerCase();
//         const prodId = String(product._id || product.id || '');
//         const prodName = product.name ? product.name.toLowerCase() : '';
//         const prodCategory = product.category ? product.category.toLowerCase() : '';

//         return (
//             prodName.includes(query) ||
//             prodCategory.includes(query) ||
//             prodId.toLowerCase().includes(query)
//         );
//     });

//     const handleDelete = (product) => {
//         setProductToDelete(product);
//         setShowDeleteModal(true);
//     };

//     // Updated: Deletes from Database first, then removes from UI state and Data Context
//     const confirmDelete = async () => {
//         if (!productToDelete) return;

//         const productId = productToDelete._id;

//         try {
//             await api.delete(`/products/delete/${productId}`);

//             setProducts(products.filter(p => p._id !== productId));

//             setShowDeleteModal(false);
//             setProductToDelete(null);

//             alert("Product deleted successfully");

//         } catch (error) {
//             console.error(error);
//             alert("Delete failed");
//         }
//     };
//     const handleEdit = (product) => {
//         setEditingProduct(product);
//         setEditFormData({
//             name: product.name || '',
//             category: product.category || '',
//             price: product.price || 0,
//             stock: product.stock || 0,
//             description: product.description || ''
//         });
//         setEditPreviews({
//             image: product.image || null,
//             hoverImg: product.hoverImg || null,
//             image2: product.image2 || null,
//             image3: product.image3 || null,
//             image4: product.image4 || null
//         });
//         setShowEditModal(true);
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleEditImageChange = (e) => {
//         const file = e.target.files[0];

//         if (!file) return;

//         setEditFormData(prev => ({
//             ...prev,
//             image: file
//         }));

//         setEditPreviews(prev => ({
//             ...prev,
//             image: URL.createObjectURL(file)
//         }));
//     };
//     // Updated: Sends PUT request to backend DB first, then updates local UI state and Data Context
//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append("name", editFormData.name);
//         formData.append("category", editFormData.category);
//         formData.append("price", editFormData.price);
//         formData.append("stock", editFormData.stock);
//         formData.append("description", editFormData.description);

//         if (editFormData.image) {
//             formData.append("image", editFormData.image);
//         }

//         try {

//             await api.put(
//                 `/products/update/${editingProduct._id}`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             const response = await api.get("/products");

//             const data = Array.isArray(response.data)
//                 ? response.data
//                 : response.data.data;

//             setProducts(data);

//             setShowEditModal(false);
//             setEditingProduct(null);

//             alert("Product updated successfully");

//         } catch (error) {
//             console.error(error);
//             alert("Update failed");
//         }
//     };

//     return (
//         <div className="page-wrapper">
//             <Header title="Products" toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />
//             <div className="page-container">
//                 <div className="card">
//                     <div className="section-header">
//                         <h3>Product List ({filteredProducts.length})</h3>
//                     </div>
//                     <div className="table-responsive">
//                         <table className="data-table">
//                             <thead>
//                                 <tr>
//                                     <th>Product ID</th>
//                                     <th>Image</th>
//                                     <th>Name</th>
//                                     <th className="hide-on-mobile">Category</th>
//                                     <th>Price</th>
//                                     <th className="hide-on-mobile">Stock</th>
//                                     <th className="hide-on-mobile">Status</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredProducts.length > 0 ? (
//                                     filteredProducts.map((product) => {
//                                         const id = product._id || product.id;
//                                         const displayId = product._id ? product._id.slice(-6).toUpperCase() : product.id;
//                                         const inStock = product.stock > 0;

//                                         return (
//                                             <tr key={id}>
//                                                 <td>{displayId}</td>


//                                                 <td>
//                                                     <div className="product-img-container">
//                                                         <img
//                                                             src={
//                                                                 product.image
//                                                                     ? `http://localhost:3000${product.image}`
//                                                                     : ''
//                                                             }
//                                                             alt={product.name}
//                                                             className="product-img-thumbnail"
//                                                             style={{
//                                                                 width: '40px',
//                                                                 height: '40px',
//                                                                 objectFit: 'cover',
//                                                                 borderRadius: '4px'
//                                                             }}
//                                                         />
//                                                     </div>
//                                                 </td>






//                                                 <td>{product.name}</td>
//                                                 <td className="hide-on-mobile">{product.category}</td>
//                                                 <td>{formatCurrency ? formatCurrency(product.price) : `$${product.price}`}</td>
//                                                 <td className="hide-on-mobile">{product.stock}</td>
//                                                 <td className="hide-on-mobile">
//                                                     <span className={`status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
//                                                         {product.status || (inStock ? 'In Stock' : 'Out of Stock')}
//                                                     </span>
//                                                 </td>
//                                                 <td>
//                                                     <div className="actions">
//                                                         <button className="edit-btn" onClick={() => handleEdit(product)}>
//                                                             Edit
//                                                         </button>
//                                                         <button className="delete-btn" onClick={() => handleDelete(product)}>
//                                                             Delete
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
//                                             No products found.
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Product Modal */}
//             {showEditModal && (
//                 <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
//                     <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
//                         <h3>Edit Product</h3>
//                         <form onSubmit={handleEditSubmit}>
//                             <div className="form-group">
//                                 <label>Product Name *</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={editFormData.name}
//                                     onChange={handleEditChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Category *</label>
//                                 <input
//                                     type="text"
//                                     name="category"
//                                     value={editFormData.category}
//                                     onChange={handleEditChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Price ($) *</label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={editFormData.price}
//                                     onChange={handleEditChange}
//                                     step="0.01"
//                                     min="0"
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Stock *</label>
//                                 <input
//                                     type="number"
//                                     name="stock"
//                                     value={editFormData.stock}
//                                     onChange={handleEditChange}
//                                     min="0"
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Main Image</label>
//                                 {/* <input type="file" accept="image/*" onChange={(e) => handleEditImageChange(e, 'image')} className="file-input" /> */}
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleEditImageChange}
//                                     className="file-input"
//                                 />
//                                 {editPreviews.image && (
//                                     <div style={{ marginTop: '10px' }}>
//                                         <img src={editPreviews.image} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="form-group">
//                                 <label>Description</label>
//                                 <textarea
//                                     name="description"
//                                     value={editFormData.description}
//                                     onChange={handleEditChange}
//                                     rows="3"
//                                 />
//                             </div>
//                             <div className="modal-actions">
//                                 <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="confirm-btn">Save Changes</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             {showDeleteModal && (
//                 <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <h3>Confirm Delete</h3>
//                         <p>Are you sure you want to delete "{productToDelete?.name}"?</p>
//                         <div className="modal-actions">
//                             <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
//                             <button className="confirm-btn delete" onClick={confirmDelete}>Delete</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Products;
























import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import api from '../../services/api';
// import img from '../../assets/watch.png'
import './Products.css';

const Products = ({ toggleSidebar }) => {
    const { deleteProduct, updateProduct } = useData();
    const [products, setProducts] = useState([]);
    const { formatCurrency } = useCurrency();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [editPreviews, setEditPreviews] = useState({
        image: null,
        hoverImg: null,
        image2: null,
        image3: null,
        image4: null
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                // Handles API response whether array is in response.data or response.data.data
                const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Helper function to safely format image URL paths (handles absolute URLs, relative server paths, and blob previews)
    const getProductImageSrc = (imgpath) => {
        if (!imgpath) return '';
        if (typeof imgpath !== 'string') {
            try {
                return URL.createObjectURL(imgpath);
            } catch {
                return '';
            }
        }
        if (imgpath.startsWith('http://') || imgpath.startsWith('https://') || imgpath.startsWith('blob:') || imgpath.startsWith('data:')) {
            return imgpath;
        }
        // Prepend your backend URL if it's a relative path from uploads
        return `http://localhost:3000${imgpath.startsWith('/') ? '' : '/'}${imgpath}`;
    };

    // Fixed: Handles Mongo _id fallback and safe string checks
    const filteredProducts = products.filter(product => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        const prodId = String(product._id || product.id || '');
        const prodName = product.name ? product.name.toLowerCase() : '';
        const prodCategory = product.category ? product.category.toLowerCase() : '';

        return (
            prodName.includes(query) ||
            prodCategory.includes(query) ||
            prodId.toLowerCase().includes(query)
        );
    });

    const handleDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    // Updated: Deletes from Database first, then removes from UI state and Data Context
    const confirmDelete = async () => {
        if (!productToDelete) return;

        const productId = productToDelete._id;

        try {
            await api.delete(`/products/delete/${productId}`);

            setProducts(products.filter(p => p._id !== productId));

            setShowDeleteModal(false);
            setProductToDelete(null);

            alert("Product deleted successfully");

        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };
    const handleEdit = (product) => {
        setEditingProduct(product);
        setEditFormData({
            name: product.name || '',
            category: product.category || '',
            price: product.price || 0,
            stock: product.stock || 0,
            description: product.description || ''
        });
        setEditPreviews({
            image: product.image || null,
            hoverImg: product.hoverImg || null,
            image2: product.image2 || null,
            image3: product.image3 || null,
            image4: product.image4 || null
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setEditFormData(prev => ({
            ...prev,
            image: file
        }));

        setEditPreviews(prev => ({
            ...prev,
            image: URL.createObjectURL(file)
        }));
    };
    // Updated: Sends PUT request to backend DB first, then updates local UI state and Data Context
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", editFormData.name);
        formData.append("category", editFormData.category);
        formData.append("price", editFormData.price);
        formData.append("stock", editFormData.stock);
        formData.append("description", editFormData.description);

        if (editFormData.image) {
            formData.append("image", editFormData.image);
        }

        try {

            await api.put(
                `/products/update/${editingProduct._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const response = await api.get("/products");

            const data = Array.isArray(response.data)
                ? response.data
                : response.data.data;

            setProducts(data);

            setShowEditModal(false);
            setEditingProduct(null);

            alert("Product updated successfully");

        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    return (
        <div className="page-wrapper">
            <Header title="Products" toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />
            <div className="page-container">
                <div className="card">
                    <div className="section-header">
                        <h3>Product List ({filteredProducts.length})</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th className="hide-on-mobile">Category</th>
                                    <th>Price</th>
                                    <th className="hide-on-mobile">Stock</th>
                                    <th className="hide-on-mobile">Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => {
                                        const id = product._id || product.id;
                                        const displayId = product._id ? product._id.slice(-6).toUpperCase() : product.id;
                                        const inStock = product.stock > 0;

                                        return (
                                            <tr key={id}>
                                                <td>{displayId}</td>


                                                <td>
                                                    <div className="product-img-container">
                                                        <img
                                                            src={getProductImageSrc(product.image)}
                                                            alt={product.name}
                                                            className="product-img-thumbnail"
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px'
                                                            }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                                                            }}
                                                        />
                                                    </div>
                                                </td>






                                                <td>{product.name}</td>
                                                <td className="hide-on-mobile">{product.category}</td>
                                                <td>{formatCurrency ? formatCurrency(product.price) : `$${product.price}`}</td>
                                                <td className="hide-on-mobile">{product.stock}</td>
                                                <td className="hide-on-mobile">
                                                    <span className={`status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                                                        {product.status || (inStock ? 'In Stock' : 'Out of Stock')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="actions">
                                                        <button className="edit-btn" onClick={() => handleEdit(product)}>
                                                            Edit
                                                        </button>
                                                        <button className="delete-btn" onClick={() => handleDelete(product)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Product Modal */}
            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Product</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editFormData.category}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleEditChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={editFormData.stock}
                                    onChange={handleEditChange}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Main Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="file-input"
                                />
                                {editPreviews.image && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img 
                                            src={typeof editPreviews.image === 'string' && (editPreviews.image.startsWith('blob:') || editPreviews.image.startsWith('http')) ? editPreviews.image : getProductImageSrc(editPreviews.image)} 
                                            alt="preview" 
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditChange}
                                    rows="3"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-dir cancel-btn" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="confirm-btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{productToDelete?.name}"?</p>
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

export default Products;