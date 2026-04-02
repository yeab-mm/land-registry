'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import {
  ShieldCheckIcon,
  KeyIcon,
  UserGroupIcon,
  FingerPrintIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

interface SecurityLog {
  id: number;
  user: string;
  action: string;
  ip: string;
  device: string;
  location: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}

export default function AdminSecurityPage() {
  const { darkMode, language } = useLanguage();
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const securityLogs: SecurityLog[] = [
    {
      id: 1,
      user: 'admin@land.gov.et',
      action: language === 'am' ? 'መግቢያ' : 'Login',
      ip: '192.168.1.100',
      device: 'Windows PC',
      location: language === 'am' ? 'አዲስ አበባ, ኢትዮጵያ' : 'Addis Ababa, Ethiopia',
      timestamp: '2024-03-07T10:30:00',
      status: 'success'
    },
    {
      id: 2,
      user: 'john.doe@email.com',
      action: language === 'am' ? 'ያልተሳካ መግቢያ' : 'Failed Login',
      ip: '45.123.45.67',
      device: 'iPhone 14',
      location: language === 'am' ? 'ባሕር ዳር, ኢትዮጵያ' : 'Bahir Dar, Ethiopia',
      timestamp: '2024-03-07T09:15:00',
      status: 'failed'
    },
    {
      id: 3,
      user: 'officer@land.gov.et',
      action: language === 'am' ? 'የይለፍ ቃል ተቀይሯል' : 'Password Changed',
      ip: '10.0.0.45',
      device: 'MacBook Pro',
      location: language === 'am' ? 'ጎንደር, ኢትዮጵያ' : 'Gondar, Ethiopia',
      timestamp: '2024-03-06T16:20:00',
      status: 'success'
    },
    {
      id: 4,
      user: 'unknown@attempt.com',
      action: language === 'am' ? 'ያልተፈቀደ መድረስ' : 'Unauthorized Access',
      ip: '203.45.67.89',
      device: 'Unknown Device',
      location: language === 'am' ? 'ውጭ አገር' : 'Foreign Country',
      timestamp: '2024-03-06T14:30:00',
      status: 'warning'
    },
    {
      id: 5,
      user: 'abebe.kebede@email.com',
      action: language === 'am' ? 'ዘግቷል' : 'Logout',
      ip: '192.168.1.150',
      device: 'Samsung Galaxy S23',
      location: language === 'am' ? 'ባሕር ዳር, ኢትዮጵያ' : 'Bahir Dar, Ethiopia',
      timestamp: '2024-03-06T11:45:00',
      status: 'success'
    }
  ];

  const getStatusBadge = (status: SecurityLog['status']) => {
    switch(status) {
      case 'success':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {language === 'am' ? 'ተሳክቷል' : 'Success'}
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {language === 'am' ? 'አልተሳካም' : 'Failed'}
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {language === 'am' ? 'ማስጠንቀቂያ' : 'Warning'}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
        {t('security')}
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'የደህንነት ደረጃ' : 'Security Score'}
            </p>
            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">85%</p>
          <p className="text-xs text-gray-400 mt-1">
            {language === 'am' ? 'ጥሩ' : 'Good'}
          </p>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ንቁ ክፍለ ጊዜዎች' : 'Active Sessions'}
            </p>
            <ComputerDesktopIcon className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">3</p>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ያልተሳኩ ሙከራዎች' : 'Failed Attempts'}
            </p>
            <XCircleIcon className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">2</p>
          <p className="text-xs text-gray-400 mt-1">
            {language === 'am' ? 'ባለፉት 24 ሰዓታት' : 'Last 24 hours'}
          </p>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ኤምኤፍኤ ተጠቃሚዎች' : 'MFA Users'}
            </p>
            <UserGroupIcon className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-600">145</p>
          <p className="text-xs text-gray-400 mt-1">
            {language === 'am' ? 'ከጠቅላላ 234' : 'out of 234 total'}
          </p>
        </div>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${cn('bg-blue-900/30', 'bg-blue-100')}`}>
              <KeyIcon className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className={`font-medium ${cn('text-white', 'text-gray-900')}`}>
              {language === 'am' ? 'ሁለት-ደረጃ ማረጋገጫ' : 'Two-Factor Authentication'}
            </h3>
          </div>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-600')} mb-2`}>
            {language === 'am' 
              ? '62% የተጠቃሚዎች ኤምኤፍኤ አንቅተዋል' 
              : '62% of users have enabled 2FA'}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${cn('bg-green-900/30', 'bg-green-100')}`}>
              <LockClosedIcon className="w-5 h-5 text-green-500" />
            </div>
            <h3 className={`font-medium ${cn('text-white', 'text-gray-900')}`}>
              {language === 'am' ? 'የይለፍ ቃል ጥንካሬ' : 'Password Strength'}
            </h3>
          </div>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-600')} mb-2`}>
            {language === 'am' 
              ? '78% ጠንካራ ይለፍ ቃሎች' 
              : '78% strong passwords'}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${cn('bg-purple-900/30', 'bg-purple-100')}`}>
              <GlobeAltIcon className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className={`font-medium ${cn('text-white', 'text-gray-900')}`}>
              {language === 'am' ? 'የአይፒ መገደብ' : 'IP Restriction'}
            </h3>
          </div>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-600')} mb-2`}>
            {language === 'am' 
              ? '3 ያልተለመዱ አይፒዎች ተገኝተዋል' 
              : '3 unusual IPs detected'}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-red-500 font-medium">⚠️</span>
            <span className={`text-xs ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ትኩረት ያስፈልጋል' : 'Attention needed'}
            </span>
          </div>
        </div>
      </div>

      {/* Security Logs */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        <div className={`p-4 border-b ${cn('border-gray-700', 'border-gray-200')} flex justify-between items-center`}>
          <h2 className={`text-lg font-semibold ${cn('text-white', 'text-gray-900')}`}>
            {language === 'am' ? 'የደህንነት ምዝግብ' : 'Security Logs'}
          </h2>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={cn(
              'bg-gray-700 border-gray-600 text-white',
              'bg-white border-gray-300 text-gray-900'
            ) + ' px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
          >
            <option value="today">{language === 'am' ? 'ዛሬ' : 'Today'}</option>
            <option value="week">{language === 'am' ? 'ይህ ሳምንት' : 'This Week'}</option>
            <option value="month">{language === 'am' ? 'ይህ ወር' : 'This Month'}</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn('bg-gray-700', 'bg-gray-50')}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {language === 'am' ? 'ተጠቃሚ' : 'User'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {language === 'am' ? 'ድርጊት' : 'Action'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {language === 'am' ? 'አይፒ አድራሻ' : 'IP Address'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {language === 'am' ? 'መሣሪያ' : 'Device'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {language === 'am' ? 'አካባቢ' : 'Location'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {language === 'am' ? 'ሁኔታ' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody className={`${cn('bg-gray-800', 'bg-white')} divide-y ${cn('divide-gray-700', 'divide-gray-200')}`}>
              {securityLogs.map((log) => (
                <tr key={log.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className={`text-sm ${cn('text-white', 'text-gray-900')}`}>
                      {log.user.split('@')[0]}
                    </p>
                    <p className={`text-xs ${cn('text-gray-400', 'text-gray-500')}`}>
                      {new Date(log.timestamp).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className={`text-sm ${cn('text-gray-300', 'text-gray-600')}`}>
                      {log.action}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {log.device.includes('iPhone') || log.device.includes('Samsung') ? (
                        <DevicePhoneMobileIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ComputerDesktopIcon className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-400">{log.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {log.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(log.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}