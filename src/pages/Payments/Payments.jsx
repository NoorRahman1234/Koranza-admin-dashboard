import React from 'react';
import Header from '../../components/Header/Header';
import { useData } from '../../contexts/DataContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import './Payments.css';

const Payments = ({ toggleSidebar }) => {
    // const { payments } = useData();
    const { payments, updatePayment } = useData();
    const { formatCurrency } = useCurrency();

    const handleStatusChange = async (transactionId, newStatus) => {
    try {
        await updatePayment(transactionId, newStatus);
    } catch (error) {
        console.error('Failed to update payment status:', error);
        alert('Failed to update payment status.');
    }
};

    return (
        <div className="page-wrapper">
            <Header title="Payments" toggleSidebar={toggleSidebar} />
            <div className="page-container">
                <div className="card">
                    <h3>Payment History ({payments.length})</h3>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th className="hide-on-mobile">Transaction ID</th>
                                    <th>Customer</th>
                                    <th className="hide-on-mobile">Order ID</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                    <th className="hide-on-mobile">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    // <tr key={payment.id}>
                                    <tr key={payment._id || payment.transactionId}>
                                        {/* <td className="hide-on-mobile">{payment.id}</td> */}
                                        <td className="hide-on-mobile">{payment.transactionId}</td>
                                        <td>{payment.customer}</td>
                                        <td className="hide-on-mobile">{payment.orderId}</td>
                                        {/* <td>{formatCurrency(payment.amount)}</td> */}
                                        <td>
    Rs {Number(payment.amount || 0).toLocaleString('en-PK', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}
</td>
                                        <td>{payment.method}</td>
                                        {/* <td>
                                            <span className={`status ${payment.status.toLowerCase()}`}>
                                                {payment.status}
                                            </span>
                                        </td> */}



                                            <td>
    <select
        value={payment.status}
        onChange={(e) =>
            handleStatusChange(
                payment.transactionId,
                e.target.value
            )
        }
        className={`status-select ${payment.status.toLowerCase()}`}
    >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
        <option value="Refunded">Refunded</option>
    </select>
</td>



                                        <td className="hide-on-mobile">{payment.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payments;
