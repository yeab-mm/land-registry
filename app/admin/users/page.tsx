'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  kebeleId: string;
  role: 'citizen' | 'officer' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  properties: number;
}

export default function AdminUsersPage() {
  const { darkMode, language } = useLanguage();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const users: User[] = [
    {
      id: 1,
      name: language === 'am' ? 'አበበ ከበደ' : 'Abebe Kebede',
      email: 'abebe.kebede@email.com',
      phone: '+251 911 123 456',
      kebeleId: 'KB-2023-001',
      role: 'citizen',
      status: 'active',
      joinedDate: '2024-01-15',
      properties: 2
    },
    {
      id: 2,
      name: language === 'am' ? 'ትግስት ኃይሉ' : 'Tigist Haile',
      email: 'tigist.haile@email.com',
      phone: '+251 922 234 567',
      kebeleId: 'KB-2023-002',
      role: 'officer',
      status: 'active',
      joinedDate: '2024-02-20',
      properties: 0
    },
    {
      id: 3,
      name: language === 'am' ? 'ብሩክ አለሙ' : 'Biruk Alemu',
      email: 'biruk.alemu@email.com',
      phone: '+251 933 345 678',
      kebeleId: 'KB-2023-003',
      role: 'citizen',
      status: 'pending',
      joinedDate: '2024-03-01',
      properties: 1
    },
    {
      id: 4,
      name: language === 'am' ? 'መሮን ታደሰ' : 'Meron Tadesse',
      email: 'meron.tadesse@email.com',
      phone: '+251 944 456 789',
      kebeleId: 'KB-2023-004',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-05',
      properties: 0
    }
  ];

  const getRoleBadge = (role: User['role']) => {
    switch(role) {
      case 'admin':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">{t('admin')}</span>;
      case 'officer':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">{t('officer')}</span>;
      case 'citizen':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{t('citizen')}</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: User['status']) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{t('active')}</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">{t('inactive')}</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">{t('pending')}</span>;
      default:
        return null;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.kebeleId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
          {t('userManagement')}
        </h1>
      
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('totalUsers')}</p>
          <p className="text-2xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('activeUsers')}</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('pendingApproval')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {users.filter(u => u.status === 'pending').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('totalProperties')}</p>
          <p className="text-2xl font-bold text-purple-600">
            {users.reduce((sum, u) => sum + u.properties, 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchUsers')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-40
            `}
          >
            <option value="all">{t('allRoles')}</option>
            <option value="citizen">{t('citizen')}</option>
            <option value="officer">{t('officer')}</option>
            <option value="admin">{t('admin')}</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-40
            `}
          >
            <option value="all">{t('allStatus')}</option>
            <option value="active">{t('active')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="inactive">{t('inactive')}</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 md:w-24">
            <FunnelIcon className="w-4 h-4 mr-2" />
            {t('filter')}
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn('bg-gray-700', 'bg-gray-50')}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('user')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('contact')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('kebeleId')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('role')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('properties')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={`${cn('bg-gray-800', 'bg-white')} divide-y ${cn('divide-gray-700', 'divide-gray-200')}`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className={`${cn('text-white', 'text-gray-900')} text-sm font-medium`}>
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400 flex items-center">
                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center">
                        <PhoneIcon className="w-4 h-4 mr-1" />
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.kebeleId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.properties}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <EyeIcon className="w-5 h-5 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <PencilIcon className="w-5 h-5 text-green-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <TrashIcon className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center">
            <p className={`text-lg ${cn('text-gray-300', 'text-gray-600')}`}>
              {t('noResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}