

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../services/api'; // Adjust path if your services folder is located elsewhere

// const DataContext = createContext();

// export const useData = () => {
//     const context = useContext(DataContext);
//     if (!context) {
//         throw new Error('useData must be used within a DataProvider');
//     }
//     return context;
// };

// // Initial mock data for categories and other sections
// const initialCustomers = [
//     { id: 'C001', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', status: 'Active', orders: 12, totalSpent: 2450 },
//     { id: 'C002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', status: 'Inactive', orders: 5, totalSpent: 890 },
// ];

// const initialOrders = [
//     { id: '#12345', customer: 'John Doe', customerId: 'C001', date: '2023-10-01', total: 250.00, status: 'Delivered', items: [{ product: 'Premium Watch', quantity: 1, price: 250 }] },
// ];

// const initialPayments = [
//     { id: '#TRX2341', customer: 'John Doe', orderId: '#12345', amount: 250.00, status: 'Completed', date: '2023-10-01', method: 'Credit Card' },
// ];

// const initialCategories = [
//     { id: '1', name: 'Eyes Products', slug: 'Eye Products', count: 2, status: 'Active' },
//     { id: '2', name: 'Lip Products', slug: 'Lip Products', count: 2, status: 'Active' },
//     { id: '3', name: 'Face Products', slug: 'Face Products', count: 1, status: 'Active' },
//     { id: '4', name: 'Skincare', slug: 'Skincare', count: 1, status: 'Active' },
//     { id: '5', name: 'Herbal Wellness', slug: 'Herbal Wellness', count: 1, status: 'Active' },
// ];

// export const DataProvider = ({ children }) => {
//     const [products, setProducts] = useState([]);
//     const [customers, setCustomers] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [payments, setPayments] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [loadingProducts, setLoadingProducts] = useState(true);


// useEffect(() => {


//     const fetchBackendProducts = async () => {
//         try {
//             const response = await api.get('/products');
//             // setProducts(response.data);
//             setProducts(response.data.data);
//         } catch (error) {
//             console.error('Error fetching backend products:', error);
//         } finally {
//             setLoadingProducts(false);
//         }
//     };


//     const fetchBackendCategories = async () => {
//     try {
//         const response = await api.get('/categories');

//         console.log('Categories from database:', response.data);

//         setCategories(response.data.data);
//     } catch (error) {
//         console.error('Error fetching backend categories:', error);
//     }
// };

// fetchBackendCategories();

//     const fetchBackendCustomers = async () => {
//         try {
//             const response = await api.get('/customers');

//             console.log('Customers from database:', response.data);

//             setCustomers(response.data.data);
//         } catch (error) {
//             console.error('Error fetching backend customers:', error);
//         }
//     };

//     fetchBackendProducts();
//     fetchBackendCustomers();
//     fetchBackendCategories();
    

// // Fetch Orders from Backend API
// const fetchBackendOrders = async () => {
//     try {
//         const response = await api.get('/orders');

//         console.log('Orders from database:', response.data);

//         setOrders(response.data.data);
//     } catch (error) {
//         console.error('Error fetching backend orders:', error);
//     }
// };

// fetchBackendOrders();

// // Load non-order data from localStorage
// const loadedPayments = JSON.parse(localStorage.getItem('payments')) || initialPayments;

// setPayments(loadedPayments);

// }, []);




//     // Refresh products list on demand
//     const refreshProducts = async () => {
//         try {
//             const response = await api.get('/products');
//             // setProducts(response.data);
//             setProducts(response.data.data);
//         } catch (error) {
//             console.error('Error refreshing products:', error);
//         }
//     };

//     // Products CRUD operations mapped to API
//     const deleteProduct = async (id) => {
//         try {
//             await api.delete(`/products/${id}`);
//             setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
//         } catch (error) {
//             console.error('Failed to delete product:', error);
//         }
//     };

// const addCustomer = async (customer) => {
//     try {
//         const response = await api.post('/customers', {
//             ...customer,
//             orders: 0,
//             totalSpent: 0
//         });

//         const newCustomer = response.data.data;

//         // If customer already exists, don't create a duplicate in dashboard
//         const existingCustomer = customers.find(
//             existing =>
//                 existing.email.toLowerCase() === newCustomer.email.toLowerCase()
//         );

//         if (existingCustomer) {
//             const updated = customers.map(existing =>
//                 existing.id === newCustomer.id ? newCustomer : existing
//             );

//             setCustomers(updated);
//         } else {
//             const updated = [...customers, newCustomer];

//             setCustomers(updated);
//         }

//         return newCustomer;

//     } catch (error) {
//         console.error('Error adding customer to database:', error);
//         throw error;
//     }
// };



// const addCategory = async (category) => {
//     try {
//         const response = await api.post('/categories', {
//             name: category.name,
//             slug: category.slug,
//             status: category.status
//         });

//         const newCategory = response.data.data;

//         setCategories(prev => [...prev, newCategory]);

//         return newCategory;

//     } catch (error) {
//         console.error('Error adding category:', error);
//         throw error;
//     }
// };




// const deleteCategory = async (id) => {
//     try {
//         await api.delete(`/categories/${id}`);

//         setCategories(prev =>
//             prev.filter(category => (category._id || category.id) !== id)
//         );
//     } catch (error) {
//         console.error('Error deleting category:', error);
//         throw error;
//     }
// };



// const updateCustomer = async (id, updates) => {
//     try {
//         const response = await api.put(`/customers/${id}`, updates);

//         const updatedCustomer = response.data.data;

//         setCustomers(prev =>
//             prev.map(customer =>
//                 customer.id === id ? updatedCustomer : customer
//             )
//         );

//         return updatedCustomer;

//     } catch (error) {
//         console.error('Error updating customer:', error);
//         throw error;
//     }
// };



//     // const value = {
//     //     products,
//     //     loadingProducts,
//     //     refreshProducts,
//     //     deleteProduct,
//     //     customers,
//     //     orders,
//     //     payments,
//     //     categories,
//     //     addCustomer
//     // };





// const value = {
//     products,
//     loadingProducts,
//     refreshProducts,
//     deleteProduct,
//     customers,
//     orders,
//     payments,
//     categories,
//     addCustomer,
//     updateCustomer,
//     addCategory,
//     deleteCategory


// };



//     return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
// };

// export default DataContext;




















import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../services/api'; // Adjust path if your services folder is located elsewhere
import api, { paymentAPI } from '../services/api';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

// Initial mock data for categories and other sections
const initialCustomers = [
    { id: 'C001', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', status: 'Active', orders: 12, totalSpent: 2450 },
    { id: 'C002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', status: 'Inactive', orders: 5, totalSpent: 890 },
];

const initialOrders = [
    { id: '#12345', customer: 'John Doe', customerId: 'C001', date: '2023-10-01', total: 250.00, status: 'Delivered', items: [{ product: 'Premium Watch', quantity: 1, price: 250 }] },
];

const initialPayments = [
    { id: '#TRX2341', customer: 'John Doe', orderId: '#12345', amount: 250.00, status: 'Completed', date: '2023-10-01', method: 'Credit Card' },
];

const initialCategories = [
    { id: '1', name: 'Eyes Products', slug: 'Eye Products', count: 2, status: 'Active' },
    { id: '2', name: 'Lip Products', slug: 'Lip Products', count: 2, status: 'Active' },
    { id: '3', name: 'Face Products', slug: 'Face Products', count: 1, status: 'Active' },
    { id: '4', name: 'Skincare', slug: 'Skincare', count: 1, status: 'Active' },
    { id: '5', name: 'Herbal Wellness', slug: 'Herbal Wellness', count: 1, status: 'Active' },
];

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);


useEffect(() => {


    const fetchBackendProducts = async () => {
        try {
            const response = await api.get('/products');
            // setProducts(response.data);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching backend products:', error);
        } finally {
            setLoadingProducts(false);
        }
    };


    const fetchBackendCategories = async () => {
    try {
        const response = await api.get('/categories');

        console.log('Categories from database:', response.data);

        setCategories(response.data.data);
    } catch (error) {
        console.error('Error fetching backend categories:', error);
    }
};

// fetchBackendCategories();

    const fetchBackendCustomers = async () => {
        try {
            const response = await api.get('/customers');

            console.log('Customers from database:', response.data);

            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching backend customers:', error);
        }
    };

    fetchBackendProducts();
    fetchBackendCustomers();
    fetchBackendCategories();
    

// Fetch Orders from Backend API
const fetchBackendOrders = async () => {
    try {
        const response = await api.get('/orders');

        console.log('Orders from database:', response.data);

        setOrders(response.data.data);
    } catch (error) {
        console.error('Error fetching backend orders:', error);
    }
};



// Fetch Payments from Backend API
const fetchBackendPayments = async () => {
    try {
        const response = await api.get('/payments');

        console.log('Payments from database:', response.data);

        setPayments(response.data.data);
    } catch (error) {
        console.error('Error fetching backend payments:', error);
    }
};


fetchBackendOrders();
fetchBackendPayments();












// Load non-order data from localStorage
// const loadedPayments = JSON.parse(localStorage.getItem('payments')) || initialPayments;

// setPayments(loadedPayments);

}, []);




    // Refresh products list on demand
    const refreshProducts = async () => {
        try {
            const response = await api.get('/products');
            // setProducts(response.data);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error refreshing products:', error);
        }
    };

    // Products CRUD operations mapped to API
    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

const addCustomer = async (customer) => {
    try {
        const response = await api.post('/customers', {
            ...customer,
            orders: 0,
            totalSpent: 0
        });

        const newCustomer = response.data.data;

        // If customer already exists, don't create a duplicate in dashboard
        const existingCustomer = customers.find(
            existing =>
                existing.email.toLowerCase() === newCustomer.email.toLowerCase()
        );

        if (existingCustomer) {
            const updated = customers.map(existing =>
                existing.id === newCustomer.id ? newCustomer : existing
            );

            setCustomers(updated);
        } else {
            const updated = [...customers, newCustomer];

            setCustomers(updated);
        }

        return newCustomer;

    } catch (error) {
        console.error('Error adding customer to database:', error);
        throw error;
    }
};



const addCategory = async (category) => {
    try {
        const response = await api.post('/categories', {
            name: category.name,
            slug: category.slug,
            status: category.status
        });

        const newCategory = response.data.data;

        setCategories(prev => [...prev, newCategory]);

        return newCategory;

    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};




const deleteCategory = async (id) => {
    try {
        await api.delete(`/categories/${id}`);

        setCategories(prev =>
            prev.filter(category => (category._id || category.id) !== id)
        );
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};



const updatePayment = async (transactionId, status) => {
    try {
        const response = await paymentAPI.updateStatus(
            transactionId,
            status
        );

        const updatedPayment = response.data;

        setPayments(prev =>
            prev.map(payment =>
                payment.transactionId === transactionId
                    ? updatedPayment
                    : payment
            )
        );

        return updatedPayment;

    } catch (error) {
        console.error('Error updating payment:', error);
        throw error;
    }
};





const updateCustomer = async (id, updates) => {
    try {
        const response = await api.put(`/customers/${id}`, updates);

        const updatedCustomer = response.data.data;

        setCustomers(prev =>
            prev.map(customer =>
                customer.id === id ? updatedCustomer : customer
            )
        );

        return updatedCustomer;

    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};





const value = {
    products,
    loadingProducts,
    refreshProducts,
    deleteProduct,
    customers,
    orders,
    payments,
    categories,
    addCustomer,
    updatePayment,
    updateCustomer,
    addCategory,
    deleteCategory
    

};



    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;