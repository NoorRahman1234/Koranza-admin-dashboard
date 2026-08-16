import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import './Dashboard.css';

const Dashboard = ({ toggleSidebar }) => {
    const { products, customers, orders } = useData();
    const { formatCurrency } = useCurrency();

    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalCustomers = customers.length;
    const totalProducts = products.length;

 

const pieData = useMemo(() => {
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const deliveredPercent = totalOrders > 0
        ? Math.round((deliveredOrders / totalOrders) * 100)
        : 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // New customers in current month
    const currentMonthCustomers = customers.filter(customer => {
        const date = new Date(customer.createdAt);
        return (
            !isNaN(date.getTime()) &&
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
    }).length;

    // New customers in previous month
    const previousMonthCustomers = customers.filter(customer => {
        const date = new Date(customer.createdAt);
        return (
            !isNaN(date.getTime()) &&
            date.getMonth() === previousMonth &&
            date.getFullYear() === previousMonthYear
        );
    }).length;

    const customerGrowth = previousMonthCustomers > 0
        ? Math.round(
            ((currentMonthCustomers - previousMonthCustomers) /
                previousMonthCustomers) * 100
        )
        : currentMonthCustomers > 0 ? 100 : 0;

    // Revenue for current month
    const currentMonthRevenue = orders
        .filter(order => {
            const date = new Date(order.date || order.createdAt);
            return (
                !isNaN(date.getTime()) &&
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        })
        .reduce((sum, order) => sum + Number(order.total || 0), 0);

    // Revenue for previous month
    const previousMonthRevenue = orders
        .filter(order => {
            const date = new Date(order.date || order.createdAt);
            return (
                !isNaN(date.getTime()) &&
                date.getMonth() === previousMonth &&
                date.getFullYear() === previousMonthYear
            );
        })
        .reduce((sum, order) => sum + Number(order.total || 0), 0);

    const revenueGrowth = previousMonthRevenue > 0
        ? Math.round(
            ((currentMonthRevenue - previousMonthRevenue) /
                previousMonthRevenue) * 100
        )
        : currentMonthRevenue > 0 ? 100 : 0;

    return {
        deliveredPercent,
        customerGrowth,
        revenueGrowth
    };
}, [orders, customers, totalOrders]);






    // Monthly revenue data for area chart
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


const monthlyRevenue = useMemo(() => {
    const revenue = Array(12).fill(0);

    orders.forEach(order => {
        const date = new Date(order.date || order.createdAt);

        if (!isNaN(date.getTime())) {
            revenue[date.getMonth()] += Number(order.total || 0);
        }
    });

    return revenue;
}, [orders]);

const maxRevenue = Math.max(...monthlyRevenue, 1);

const revenuePoints = monthlyRevenue.map((revenue, index) => {
    const x = (index / 11) * 500;
    const y = 180 - (revenue / maxRevenue) * 150;

    return { x, y };
});

const revenuePath = `
    M0,180
    L${revenuePoints[0].x},${revenuePoints[0].y}
    ${revenuePoints.slice(1).map(point => `L${point.x},${point.y}`).join(' ')}
    L500,180
    Z
`;





    return (
        <div className="page-wrapper">
            <Header title="Dashboard" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-title">Total revenue</span>
                        <span className="stat-value">{formatCurrency(totalRevenue)}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Orders</span>
                        <span className="stat-value">{totalOrders}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Products</span>
                        <span className="stat-value">{totalProducts}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Customers</span>
                        <span className="stat-value">{totalCustomers}</span>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="charts-row">
                    {/* Pie Charts Card */}
                    <div className="chart-card pie-chart-card">
                        <h3>Performance Metrics</h3>
                        <div className="pie-charts-container">
                            <div className="pie-chart-item">
                                <svg viewBox="0 0 100 100" className="pie-chart">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#e74c3c"
                                        strokeWidth="12"
                                        strokeDasharray={`${pieData.deliveredPercent * 2.512} 251.2`}
                                        transform="rotate(-90 50 50)"
                                    />
                                    <text x="50" y="55" textAnchor="middle" className="pie-chart-text">{pieData.deliveredPercent}%</text>
                                </svg>
                                <p className="pie-chart-label">Orders Delivered</p>
                            </div>
                            <div className="pie-chart-item">
                                <svg viewBox="0 0 100 100" className="pie-chart">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#1abc9c"
                                        strokeWidth="12"
                                        strokeDasharray={`${pieData.customerGrowth * 2.512} 251.2`}
                                        transform="rotate(-90 50 50)"
                                    />
                                    <text x="50" y="55" textAnchor="middle" className="pie-chart-text">+{pieData.customerGrowth}%</text>
                                </svg>
                                <p className="pie-chart-label">New Customers</p>
                            </div>
                            <div className="pie-chart-item">
                                <svg viewBox="0 0 100 100" className="pie-chart">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="12" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#3498db"
                                        strokeWidth="12"
                                        strokeDasharray={`${pieData.revenueGrowth * 2.512} 251.2`}
                                        transform="rotate(-90 50 50)"
                                    />
                                    <text x="50" y="55" textAnchor="middle" className="pie-chart-text">+{pieData.revenueGrowth}%</text>
                                </svg>
                                <p className="pie-chart-label">Revenue Growth</p>
                            </div>
                        </div>
                    </div>

                    {/* Area Chart Card */}
                    <div className="chart-card area-chart-card">
                        <h3>Revenue Overview</h3>
                        <div className="area-chart-container">
                            <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="area-chart">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#3498db', stopOpacity: 0.6 }} />
                                        <stop offset="100%" style={{ stopColor: '#3498db', stopOpacity: 0.05 }} />
                                    </linearGradient>
                                </defs>
                                {/* Grid lines */}
                                <line x1="0" y1="33" x2="500" y2="33" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.5" />
                                <line x1="0" y1="66" x2="500" y2="66" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.5" />
                                <line x1="0" y1="100" x2="500" y2="100" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.5" />
                                <line x1="0" y1="133" x2="500" y2="133" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.5" />
                                <line x1="0" y1="166" x2="500" y2="166" stroke="#e0e0e0" strokeWidth="0.5" opacity="0.5" />
                                {/* Area chart path */}
                                


                                    <path
    d={revenuePath}
    fill="url(#areaGradient)"
    stroke="#3498db"
    strokeWidth="3"
    vectorEffect="non-scaling-stroke"
/>







                            </svg>
                            <div className="chart-x-axis">
                                {months.map((month, index) => (
                                    <span key={index} className="x-label">{month}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
