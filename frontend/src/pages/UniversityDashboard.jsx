import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UniversityDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Ensure the user actually has university admin rights
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/professional-login');
        }
    }, [user, navigate]);

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ color: '#0f172a', margin: 0, fontSize: '2rem' }}>University Wellness Command Center <span style={{fontSize:'1rem', background:'#4F46E5', color:'white', padding:'4px 12px', borderRadius:'12px', verticalAlign:'middle', marginLeft:'10px'}}>Head Admin</span></h1>
                        <p style={{ color: '#64748b', margin: '8px 0 0 0' }}>Institutional Sentiment, Alerts, and Clinical Routing</p>
                    </div>
                    <button 
                        onClick={() => { logout(); navigate('/professional-login'); }}
                        style={{ padding: '10px 20px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Secure Logout
                    </button>
                </header>

                {/* KPI Metrics Level */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '4px solid #4F46E5' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 5px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>Enrolled Students</h3>
                        <p style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>12,405</p>
                        <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 'bold' }}>Active on MoodFlow platform</span>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '4px solid #f59e0b' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 5px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>Current Campus Stress</h3>
                        <p style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>Moderate</p>
                        <span style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 'bold' }}>Elevated during midterm seasons</span>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '4px solid #ef4444' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 5px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>Active SOS Interventions</h3>
                        <p style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>3</p>
                        <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold' }}>Automatically routed to on-site docs</span>
                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
                        <h3 style={{ color: '#64748b', margin: '0 0 5px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>CBT Exercises Completed</h3>
                        <p style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#0f172a', margin: '0' }}>24.1k</p>
                        <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>Total AI interventions this week</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {/* Fake Chart CSS block */}
                    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.2rem' }}>Department Stress Distribution Heatmap</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ width: '150px', fontWeight: '500', color: '#475569' }}>Computer Science</span>
                                <div style={{ flex: 1, background: '#fee2e2', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '85%', background: '#ef4444', height: '100%' }}></div>
                                </div>
                                <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', color: '#991b1b' }}>85%</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ width: '150px', fontWeight: '500', color: '#475569' }}>Pre-Medicine</span>
                                <div style={{ flex: 1, background: '#fee2e2', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '75%', background: '#f97316', height: '100%' }}></div>
                                </div>
                                <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', color: '#c2410c' }}>75%</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ width: '150px', fontWeight: '500', color: '#475569' }}>Arts & Humanities</span>
                                <div style={{ flex: 1, background: '#dcfce7', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '40%', background: '#22c55e', height: '100%' }}></div>
                                </div>
                                <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', color: '#166534' }}>40%</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ width: '150px', fontWeight: '500', color: '#475569' }}>Business School</span>
                                <div style={{ flex: 1, background: '#fef3c7', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: '60%', background: '#eab308', height: '100%' }}></div>
                                </div>
                                <span style={{ width: '40px', textAlign: 'right', fontWeight: 'bold', color: '#854d0e' }}>60%</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.2rem' }}>Top Burnout Triggers</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{ color: '#0f172a', display: 'block' }}>Upcoming Final Exams</strong>
                                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Identified across 1,120 AI journals this week</span>
                                </div>
                                <span style={{ background: '#ede9fe', color: '#7c3aed', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', height: 'fit-content' }}>#1 Trigger</span>
                            </li>
                            <li style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{ color: '#0f172a', display: 'block' }}>Social Isolation / Loneliness</strong>
                                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Identified across 840 AI journals this week</span>
                                </div>
                                <span style={{ background: '#dbeafe', color: '#2563eb', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', height: 'fit-content' }}>#2 Trigger</span>
                            </li>
                            <li style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #14b8a6', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <strong style={{ color: '#0f172a', display: 'block' }}>Lack of Sleep / Insomnia</strong>
                                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Identified across 630 AI journals this week</span>
                                </div>
                                <span style={{ background: '#ccfbf1', color: '#0d9488', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', height: 'fit-content' }}>#3 Trigger</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UniversityDashboard;
