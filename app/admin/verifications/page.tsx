'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Verification {
  id: number;
  applicant: string;
  parcelId: string;
  location: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: number;
}

export default function AdminVerificationsPage() {
  const { darkMode } = useLanguage();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const verifications: Verification[] = [
    {
      id: 1,
      applicant: t('abebe'),
      parcelId: 'BA-2024-001',
      location: t('zone1'),
      submittedDate: '2024-03-01',
      status: 'rejected',
      documents: 3
    },
    {
      id: 2,
      applicant: t('tigist'),
      parcelId: 'BA-2024-089',
      location: t('zone3'),
      submittedDate: '2024-03-02',
      status: 'approved',
      documents: 5
    },
    {
      id: 3,
      applicant: t('biruk'),
      parcelId: 'BA-2024-045',
      location: t('zone2'),
      submittedDate: '2024-03-03',
      status: 'approved',
      documents: 2
    },
    {
      id: 4,
      applicant: t('meron'),
      parcelId: 'BA-2024-123',
      location: t('zone4'),
      submittedDate: '2024-03-03',
      status: 'rejected',
      documents: 4
    }
  ];

  const getStatusBadge = (status: Verification['status']) => {
    switch(status) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {t('approved')}
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {t('rejected')}
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {t('pending')}
          </span>
        );
    }
  };

  const filteredVerifications = verifications.filter(v => {
    const matchesSearch = v.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.parcelId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
        {t('verifications')}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('total')}</p>
          <p className="text-2xl font-bold text-blue-600">{verifications.length}</p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('approved')}</p>
          <p className="text-2xl font-bold text-green-600">
            {verifications.filter(v => v.status === 'approved').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {verifications.filter(v => v.status === 'pending').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{t('rejected')}</p>
          <p className="text-2xl font-bold text-red-600">
            {verifications.filter(v => v.status === 'rejected').length}
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
              placeholder={t('searchPlaceholder')}
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-48
            `}
          >
            <option value="all">{t('allStatus')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="approved">{t('approved')}</option>
            <option value="rejected">{t('rejected')}</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 md:w-24">
            <FunnelIcon className="w-4 h-4 mr-2" />
            {t('filter')}
          </button>
        </div>
      </div>

      {/* Verifications Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn('bg-gray-700', 'bg-gray-50')}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('applicant')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('parcelId')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('location')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('submittedDate')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('documents')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={`${cn('bg-gray-800', 'bg-white')} divide-y ${cn('divide-gray-700', 'divide-gray-200')}`}>
              {filteredVerifications.map((verification) => (
                <tr key={verification.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {verification.applicant.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className={`${cn('text-white', 'text-gray-900')} text-sm font-medium`}>
                          {verification.applicant}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {verification.parcelId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {verification.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {verification.submittedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                      {verification.documents} {t('documents')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(verification.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <EyeIcon className="w-5 h-5 text-blue-400" />
                      </button>
                      {verification.status === 'pending' && (
                        <>
                          <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                            <CheckCircleIcon className="w-5 h-5 text-green-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                            <XCircleIcon className="w-5 h-5 text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredVerifications.length === 0 && (
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