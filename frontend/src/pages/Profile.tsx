import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startEditing = () => {
    if (user) {
      setFormData({
        full_name: user.full_name,
        email: user.email,
        currentPassword: '',
        password: '',
        confirmPassword: ''
      });
      setIsEditing(true);
      setError('');
      setSuccess('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (formData.password && !formData.currentPassword) {
      setError('Current password is required to set a new password');
      setLoading(false);
      return;
    }

    try {
      const updates: { full_name: string; email: string; password?: string, current_password?: string } = {
        full_name: formData.full_name,
        email: formData.email
      };
      if (formData.password) {
        updates.password = formData.password;
        updates.current_password = formData.currentPassword;
      }

      const response = await authService.updateProfile(updates);
      updateUser(response.user);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="page-container">
        <div className="profile-card">
          <p>Please log in to view your profile.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="profile-container">
        <h1 className="page-title">My Profile</h1>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-identity">
              <h2>{user.full_name}</h2>
              <span className={`role-badge ${user.role} badge-large`}>
                {user.role}
              </span>
            </div>
            {!isEditing && (
              <button onClick={startEditing} className="btn-secondary" style={{ marginLeft: 'auto' }}>
                ✏️ Edit
              </button>
            )}
          </div>

          {success && <div className="alert alert-success" style={{ marginTop: '1rem' }}>{success}</div>}

          {isEditing ? (
            <form onSubmit={handleSave} className="profile-edit-form" style={{ marginTop: '2rem' }}>
              {error && <div className="alert alert-error">{error}</div>}
              
              <div className="form-group" style={{ maxWidth: '500px' }}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleChange} 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ maxWidth: '500px' }}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ maxWidth: '500px' }}>
                <label>Current Password <span className="text-muted">(only if changing password)</span></label>
                <input 
                  type="password" 
                  name="currentPassword" 
                  value={formData.currentPassword} 
                  onChange={handleChange} 
                  className="form-input"
                  placeholder="Required for password changes"
                />
              </div>

              <div className="form-group" style={{ maxWidth: '500px' }}>
                <label>New Password <span className="text-muted">(optional)</span></label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="form-input"
                  placeholder="Leave blank to keep current"
                />
              </div>

              {formData.password && (
                <div className="form-group" style={{ maxWidth: '500px' }}>
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    className="form-input"
                    required
                  />
                </div>
              )}

              <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary" disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details-grid">
              <div className="detail-card">
                <label>Email Address</label>
                <div className="detail-value">{user.email}</div>
              </div>
              
              <div className="detail-card">
                <label>Role</label>
                <div className="detail-value capitalize">{user.role} Account</div>
              </div>

              <div className="detail-card">
                <label>Member Since</label>
                <div className="detail-value">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Just joined'}
                </div>
              </div>
              
              <div className="detail-card">
                <label>Account Status</label>
                <div className="detail-value">
                  <span className="status-badge active">
                    <span className="status-dot"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="profile-footer">
            <button 
              onClick={handleLogout}
              className="btn-danger icon-btn"
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
