import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import Customers from './pages/Customers/Customers';
import Payments from './pages/Payments/Payments';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import AddProduct from './pages/AddProduct/AddProduct';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  React.useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isSidebarOpen]);


  return (
    <AuthProvider>
      <CurrencyProvider>
        <DataProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <div className="app-container">
                    <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
                    {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
                    <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                      <Routes>
                        <Route path="/" element={<Dashboard toggleSidebar={toggleSidebar} />} />
                        <Route path="/products" element={<Products toggleSidebar={toggleSidebar} />} />
                        <Route path="/add-product" element={<AddProduct toggleSidebar={toggleSidebar} />} />
                        <Route path="/customers" element={<Customers toggleSidebar={toggleSidebar} />} />
                        <Route path="/orders" element={<Orders toggleSidebar={toggleSidebar} />} />
                        <Route path="/categories" element={<Categories toggleSidebar={toggleSidebar} />} />
                        <Route path="/payments" element={<Payments toggleSidebar={toggleSidebar} />} />
                        <Route path="/profile" element={<Profile toggleSidebar={toggleSidebar} />} />
                        <Route path="/settings" element={<Settings toggleSidebar={toggleSidebar} />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </DataProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;








