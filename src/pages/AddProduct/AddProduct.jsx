import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AddProduct.css';

const AddProduct = ({ toggleSidebar }) => {
    const { addProduct, categories } = useData();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: ''
    });

    const [previews, setPreviews] = useState({
        image: null,
        hoverImg: null,
        image2: null,
        image3: null,
        image4: null
    });
    const [files, setFiles] = useState({
    image: null,
    hoverImg: null,
    image2: null,
    image3: null,
    image4: null
});

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];

    if (!file) return;

    // Save the actual file for uploading
    setFiles(prev => ({
        ...prev,
        [fieldName]: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
        setPreviews(prev => ({
            ...prev,
            [fieldName]: reader.result
        }));
    };
    reader.readAsDataURL(file);
};
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
        if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

       const form = new FormData();

form.append("name", formData.name);
form.append("category", formData.category);
form.append("price", parseFloat(formData.price));
form.append("stock", parseInt(formData.stock));
form.append("description", formData.description);

if (files.image) form.append("image", files.image);
if (files.hoverImg) form.append("hoverImg", files.hoverImg);
if (files.image2) form.append("image2", files.image2);
if (files.image3) form.append("image3", files.image3);
if (files.image4) form.append("image4", files.image4);

        // addProduct(productData);
//         try {
//    const response = await api.post("/products", form, {
//     headers: {
//         "Content-Type": "multipart/form-data",
//     },
// });
//     console.log(response.data);
//     alert('Product added successfully!');
//     navigate('/products');
// } catch (error) {
//     console.error(error);
//     alert('Failed to add product');
// }

//         // Show success and navigate
//         alert('Product added successfully!');
//         navigate('/products');

try {
    const response = await api.post("/products", form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    console.log(response.data);
    alert("Product added successfully!");
    navigate("/products");

// } catch (error) {
//     console.error(error);
//     alert("Failed to add product");
// }

} catch (error) {
    console.error("Full error details:", error);
    const serverMessage = error.response?.data?.message || error.message;
    alert(`Failed to add product: ${serverMessage}`);
}



    };

    return (
        <div className="page-wrapper">
            <Header title="Add Product" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                <div className="card form-card">
                    <h3>Product Information</h3>
                    <form className="product-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select category</option>
                                    {/* {categories.filter(cat => cat.status === 'Active').map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))} */}

{categories.filter(cat => cat.status === 'Active').map(cat => (
    <option key={cat._id || cat.id} value={cat.name}>{cat.name}</option>
))}



                                </select>
                                {errors.category && <span className="error-text">{errors.category}</span>}
                            </div>

                            <div className="form-group">
                                <label>Price ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                />
                                {errors.price && <span className="error-text">{errors.price}</span>}
                            </div>

                            <div className="form-group">
                                <label>Stock Quantity *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                />
                                {errors.stock && <span className="error-text">{errors.stock}</span>}
                            </div>

                            <div className="form-group">
                                <label>Main Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image')}
                                    className="file-input"
                                />
                                {previews.image && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previews.image} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Hover / Flip Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'hoverImg')}
                                    className="file-input"
                                />
                                {previews.hoverImg && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previews.hoverImg} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Additional Image 1</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image2')}
                                    className="file-input"
                                />
                                {previews.image2 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previews.image2} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Additional Image 2</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image3')}
                                    className="file-input"
                                />
                                {previews.image3 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previews.image3} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Additional Image 3</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'image4')}
                                    className="file-input"
                                />
                                {previews.image4 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previews.image4} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => navigate('/products')}>
                                Cancel
                            </button>
                            <button type="submit" className="submit-btn">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
