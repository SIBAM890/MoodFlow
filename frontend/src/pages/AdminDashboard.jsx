import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Ensure the user actually has admin rights
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/professional-login');
        }
    }, [user, navigate]);

    return (
        <div style={{ background: 'var(--bg-warm)', minHeight: '100vh', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>University Head Analytics Console</h1>
                        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0' }}>Institutional Wellness Overview</p>
                    </div>
                    <button 
                        onClick={() => { logout(); navigate('/professional-login'); }}
                        style={{ padding: '10px 20px', background: 'white', border: '1px solid var(--border-medium)', borderRadius: '25px', cursor: 'pointer' }}
                    >
                        Secure Logout
                    </button>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ color: 'var(--text-secondary)' }}>Total Students Monitored</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--forest)', margin: '10px 0' }}>4,251</p>
                        <span style={{ color: 'green', fontSize: '0.9rem' }}>+12% this month</span>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ color: 'var(--text-secondary)' }}>Campus Stress Level</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--terracotta)', margin: '10px 0' }}>Medium-High</p>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Based on recent AI sentiment check-ins</span>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ color: 'var(--text-secondary)' }}>Active Crisis Alerts</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'red', margin: '10px 0' }}>3</p>
                        <span style={{ color: 'red', fontSize: '0.9rem' }}>Requires immediate intervention routing</span>
                    </div>
                </div>

                <div style={{ marginTop: '40px', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                    <h2>Institutional Analytics Integrations</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>The Backend-Core analytics endpoint `app.analytics.routes` validates this portal.</p>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', borderRadius: '12px', marginTop: '20px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Macro-Level Chart Interface Ready</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
