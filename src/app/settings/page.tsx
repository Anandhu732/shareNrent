"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiMessageCircle, FiSettings, FiSave } from 'react-icons/fi';

export default function SettingsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    location: '',
    bio: ''
  });
  
  const [notificationsForm, setNotificationsForm] = useState({
    email_messages: true,
    email_rentals: true,
    email_returns: true,
    email_marketing: false,
    push_messages: true,
    push_rentals: true,
    push_returns: true
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationsForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to an API
    console.log('Saving profile:', profileForm);
    // Show success message
    alert('Profile saved successfully!');
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to an API
    console.log('Saving notification preferences:', notificationsForm);
    // Show success message
    alert('Notification preferences saved!');
  };
  
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // In a real application, this would send data to an API
    console.log('Saving security settings:', securityForm);
    // Show success message
    alert('Password updated successfully!');
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-4 text-base font-medium ${
                activeTab === 'profile'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              <FiUser className="inline-block mr-2" /> Profile Information
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-4 text-base font-medium ${
                activeTab === 'notifications'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              <FiMessageCircle className="inline-block mr-2" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-4 text-base font-medium ${
                activeTab === 'security'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              <FiLock className="inline-block mr-2" /> Security
            </button>
          </div>
          
          <div className="p-6">
            {/* Profile Information Form */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={profileForm.location}
                      onChange={handleProfileChange}
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      About Me
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      placeholder="Tell others a bit about yourself..."
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiSave className="mr-2" /> Save Profile
                    </button>
                  </div>
                </div>
              </form>
            )}
            
            {/* Notifications Form */}
            {activeTab === 'notifications' && (
              <form onSubmit={handleSaveNotifications}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage which emails you receive from us</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email_messages"
                            name="email_messages"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.email_messages}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email_messages" className="font-medium text-gray-700">New messages</label>
                          <p className="text-gray-500">Get email notifications when you receive new messages</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email_rentals"
                            name="email_rentals"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.email_rentals}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email_rentals" className="font-medium text-gray-700">Rental requests and confirmations</label>
                          <p className="text-gray-500">Get notified about item rental activity</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email_returns"
                            name="email_returns"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.email_returns}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email_returns" className="font-medium text-gray-700">Return reminders</label>
                          <p className="text-gray-500">Get reminded when items are due for return</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email_marketing"
                            name="email_marketing"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.email_marketing}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email_marketing" className="font-medium text-gray-700">Marketing emails</label>
                          <p className="text-gray-500">Receive updates about new features and promotions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage app notifications (if installed)</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push_messages"
                            name="push_messages"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.push_messages}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push_messages" className="font-medium text-gray-700">New messages</label>
                          <p className="text-gray-500">Get push notifications for new messages</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push_rentals"
                            name="push_rentals"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.push_rentals}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push_rentals" className="font-medium text-gray-700">Rental activity</label>
                          <p className="text-gray-500">Get notified about rental requests and confirmations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push_returns"
                            name="push_returns"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={notificationsForm.push_returns}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push_returns" className="font-medium text-gray-700">Return reminders</label>
                          <p className="text-gray-500">Get reminded when items are due for return</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiSave className="mr-2" /> Save Notification Preferences
                    </button>
                  </div>
                </div>
              </form>
            )}
            
            {/* Security Form */}
            {activeTab === 'security' && (
              <form onSubmit={handleSaveSecurity}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Password</h3>
                    <p className="mt-1 text-sm text-gray-500">Update your password to keep your account secure</p>
                  </div>
                  
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      autoComplete="current-password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={securityForm.currentPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      autoComplete="new-password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={securityForm.newPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={securityForm.confirmPassword}
                      onChange={handleSecurityChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FiSave className="mr-2" /> Update Password
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 