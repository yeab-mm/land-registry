'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import {
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
}

export default function OfficerNotificationsPage() {
  const { darkMode } = useLanguage();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: t('newVerification'),
      message: t('newVerificationMsg'),
      time: '5 min ago',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: t('paymentReceived'),
      message: t('paymentReceivedMsg'),
      time: '15 min ago',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: t('verificationApproved'),
      message: t('verificationApprovedMsg'),
      time: '1 hour ago',
      read: true,
      type: 'success'
    },
    {
      id: 4,
      title: t('systemAlert'),
      message: t('systemAlertMsg'),
      time: '2 hours ago',
      read: false,
      type: 'warning'
    },
    {
      id: 5,
      title: t('verificationRejected'),
      message: t('verificationRejectedMsg'),
      time: '3 hours ago',
      read: true,
      type: 'error'
    },
    {
      id: 6,
      title: t('achievement'),
      message: t('achievementMsg'),
      time: '1 day ago',
      read: true,
      type: 'achievement'
    }
  ]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
      case 'achievement':
        return <StarIcon className="w-6 h-6 text-purple-500" />;
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
            {t('notifications')}
          </h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
              {unreadCount} {t('new')}
            </span>
          )}
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          {t('markAllAsRead')}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-1 inline-flex`}>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'all'
              ? cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-700')
              : cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')
          }`}
        >
          {t('all')}
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'unread'
              ? cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-700')
              : cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')
          }`}
        >
          {t('unread')}
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'read'
              ? cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-700')
              : cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')
          }`}
        >
          {t('read')}
        </button>
      </div>

      {/* Notifications List */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        {filteredNotifications.length > 0 ? (
          <div className="divide-y ${cn('divide-gray-700', 'divide-gray-200')}">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 transition-colors relative ${
                  !notification.read ? cn('bg-gray-700/30', 'bg-blue-50/50') : ''
                } ${cn('hover:bg-gray-700', 'hover:bg-gray-50')}`}
              >
                {!notification.read && (
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full"></span>
                )}
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-semibold ${cn('text-white', 'text-gray-900')}`}>
                        {notification.title}
                      </h3>
                      <span className={`text-xs ${cn('text-gray-400', 'text-gray-500')}`}>
                        {notification.time}
                      </span>
                    </div>
                    <p className={`text-sm ${cn('text-gray-300', 'text-gray-600')} mt-1`}>
                      {notification.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 rounded-lg hover:bg-gray-600 transition-colors"
                        title={t('markAsRead')}
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      </button>
                    )}
                    <button className="p-2 rounded-lg hover:bg-gray-600 transition-colors">
                      <EyeIcon className="w-5 h-5 text-blue-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className={`text-lg ${cn('text-gray-300', 'text-gray-600')}`}>
              {t('noNotifications')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}