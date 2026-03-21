import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function PlatformAdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Ensure the user actually has superadmin rights
    useEffect(() => {
        if (!user || user.role !== 'superadmin') {
            navigate('/professional-login');
        }
    }, [user, navigate]);

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ color: '#0f172a', margin: 0, fontSize: '2rem' }}>MoodFlow Global Network <span style={{fontSize:'1rem', background:'#1e293b', color:'white', padding:'4px 12px', borderRadius:'12px', verticalAlign:'middle', marginLeft:'10px'}}>Super Admin</span></h1>
                        <p style={{ color: '#64748b', margin: '8px 0 0 0' }}>SaaS Platform Telemetry & Global Metrics</p>
                    </div>
                    <button 
                        onClick={() => { logout(); navigate('/professional-login'); }}
                        style={{ padding: '10px 20px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Secure Logout
                    </button>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Universities Onboarded</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 10px 0' }}>142</p>
                        <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '3px' }}>
                            <div style={{ width: '85%', background: '#4F46E5', height: '100%', borderRadius: '3px' }}></div>
                        </div>
                        <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#16a34a', fontWeight: 'bold' }}>+18% Year-over-Year Growth</p>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Global AI API Requests (24h)</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 10px 0' }}>1.2M</p>
                        <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '3px' }}>
                            <div style={{ width: '60%', background: '#3b82f6', height: '100%', borderRadius: '3px' }}></div>
                        </div>
                        <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Capacity at 60% load</p>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ledger Intrusions Blocked</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 10px 0' }}>0</p>
                        <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '3px' }}>
                            <div style={{ width: '100%', background: '#16a34a', height: '100%', borderRadius: '3px' }}></div>
                        </div>
                        <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#16a34a' }}>Blockchain Integrity: 100%</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Global System Health</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '500', color: '#334155' }}>FastAPI Vault Network</span>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>OPERATIONAL</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '500', color: '#334155' }}>Gemini AutoFlow Engines</span>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>OPERATIONAL</span>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '500', color: '#334155' }}>FAISS Vector Datastores</span>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>OPERATIONAL</span>
                            </li>
                        </ul>
                    </div>

                    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ margin: '0 0 20px 0', color: '#0f172a' }}>Top Client Instances</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#334155' }}>Stanford University</span>
                                    <span style={{ color: '#64748b' }}>45k Active Nodes</span>
                                </div>
                                <div style={{ width: '100%', background: '#e2e8f0', height: '8px', borderRadius: '4px' }}>
                                    <div style={{ width: '90%', background: '#4F46E5', height: '100%', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#334155' }}>Harvard Wellness Center</span>
                                    <span style={{ color: '#64748b' }}>32k Active Nodes</span>
                                </div>
                                <div style={{ width: '100%', background: '#e2e8f0', height: '8px', borderRadius: '4px' }}>
                                    <div style={{ width: '65%', background: '#3b82f6', height: '100%', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlatformAdminDashboard;
