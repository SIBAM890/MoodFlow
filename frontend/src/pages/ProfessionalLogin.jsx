import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import '../styles/pages/Auth.css';

function ProfessionalLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        full_name: '', 
        role: 'counselor' 
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (isLogin) {
            const result = await login({ email: formData.email, password: formData.password });
            if (result.success) {
                if (result.role === 'superadmin') navigate('/platform-admin');
                else if (result.role === 'admin') navigate('/university-dashboard');
                else if (result.role === 'counselor') navigate('/counselor-dashboard');
                else navigate('/dashboard'); // Fallback
            } else {
                setError(result.error);
            }
        } else {
            // Register
            const result = await api.auth.signup(formData);
            if (result && !result.error && !result.detail) {
                // Auto login after signup
                const loginResult = await login({ email: formData.email, password: formData.password });
                if (loginResult.success) {
                    if (loginResult.role === 'superadmin') navigate('/platform-admin');
                    else if (loginResult.role === 'admin') navigate('/university-dashboard');
                    else if (loginResult.role === 'counselor') navigate('/counselor-dashboard');
                    else navigate('/dashboard');
                }
            } else {
                setError(result.detail || result.error || 'Registration failed');
            }
        }
        setLoading(false);
    };

    return (
        <div className="auth-container" style={{ background: 'var(--bg-warm)' }}>
            <div className="auth-card" style={{ maxWidth: '450px' }}>
                <div className="auth-header">
                    <span className="auth-logo">🏛️</span>
                    <h1 className="auth-title">Staff Portal</h1>
                    <p className="auth-subtitle">
                        {isLogin ? 'Sign in to access clinical insights' : 'Register your staff credentials'}
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <select 
                                    className="form-input" 
                                    value={formData.role} 
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="counselor">Psychiatrist / Counselor</option>
                                    <option value="admin">University Head (Demo)</option>
                                    <option value="superadmin">Platform Sysadmin (Demo)</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading} style={{ background: 'var(--forest)' }}>
                        {loading ? 'Processing...' : isLogin ? 'Access Portal' : 'Register Portal'}
                    </button>
                    {error && <p className="auth-error" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Need staff access? " : "Already have access? "}
                        <button className="auth-link" onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>
                            {isLogin ? 'Register Here' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalLogin;
