import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CounselorDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Ensure the user actually has counselor rights
    useEffect(() => {
        if (!user || user.role !== 'counselor') {
            navigate('/professional-login');
        }
    }, [user, navigate]);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>Clinical Workspace</h1>
                        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0' }}>Psychiatrist & Student Support Portal</p>
                    </div>
                    <button 
                        onClick={() => { logout(); navigate('/professional-login'); }}
                        style={{ padding: '10px 20px', background: 'white', border: '1px solid var(--border-medium)', borderRadius: '25px', cursor: 'pointer' }}
                    >
                        Secure Logout
                    </button>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                            <h2>Active Student Escalations</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Students flagged by AutoFlow for high stress or distress.</p>
                            
                            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-soft)' }}>
                                        <th style={{ padding: '12px 0' }}>Student ID / Alias</th>
                                        <th>Risk Pattern</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '12px 0', fontWeight: '500' }}>Patient 10A-X (Anonymized)</td>
                                        <td style={{ color: 'var(--terracotta)' }}>Severe Academic Burnout</td>
                                        <td><span style={{ padding: '4px 8px', background: '#FEF2F2', color: '#B91C1C', borderRadius: '12px', fontSize: '0.8rem' }}>Needs Review</span></td>
                                        <td><button style={{ padding: '6px 12px', background: 'var(--indigo-600)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View Case</button></td>
                                    </tr>
                                    <tr style={{ borderTop: '1px solid var(--border-soft)' }}>
                                        <td style={{ padding: '12px 0', fontWeight: '500' }}>Patient 42B-Y (Anonymized)</td>
                                        <td style={{ color: 'var(--forest)' }}>Improving Resilience</td>
                                        <td><span style={{ padding: '4px 8px', background: '#F0FDF4', color: '#15803D', borderRadius: '12px', fontSize: '0.8rem' }}>Monitoring</span></td>
                                        <td><button style={{ padding: '6px 12px', background: 'var(--indigo-600)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View Case</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                            <h3>Clinical Notes & Integrations</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'green' }}></span>
                                    `app.counselor.routes` Connection OK
                                </li>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'green' }}></span>
                                    Privacy Ledger Synchronized
                                </li>
                            </ul>
                            <button style={{ width: '100%', padding: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-medium)', borderRadius: '8px', marginTop: '20px', cursor: 'pointer' }}>
                                Load AutoFlow Insight Summary
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CounselorDashboard;
