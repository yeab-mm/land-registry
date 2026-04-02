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
  TrashIcon,
  EyeIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  timestamp: string;
  read: boolean;
  actionable: boolean;
  actionUrl?: string;
  sender?: string;
  priority: 'low' | 'medium' | 'high';
}

export default function AdminNotificationsPage() {
  const { darkMode, language } = useLanguage();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: language === 'am' ? 'አዲስ ተጠቃሚ ተመዝግቧል' : 'New User Registered',
      message: language === 'am' 
        ? 'አበበ ከበደ በስርዓቱ ተመዝግቧል' 
        : 'Abebe Kebede has registered to the system',
      type: 'info',
      timestamp: '2024-03-07T10:30:00',
      read: false,
      actionable: true,
      actionUrl: '/admin/users/1',
      sender: 'System',
      priority: 'low'
    },
    {
      id: 2,
      title: language === 'am' ? 'የመሬት ማረጋገጫ ጠይቋል' : 'Land Verification Request',
      message: language === 'am'
        ? 'ትግስት ኃይሉ የመሬት ማረጋገጫ ጠይቋል - ባለ 4 ቁጥር BA-2024-089'
        : 'Tigist Haile requested land verification - Parcel BA-2024-089',
      type: 'warning',
      timestamp: '2024-03-07T09:15:00',
      read: false,
      actionable: true,
      actionUrl: '/admin/verifications/2',
      sender: 'System',
      priority: 'high'
    },
    {
      id: 3,
      title: language === 'am' ? 'ክፍያ ተፈጽሟል' : 'Payment Completed',
      message: language === 'am'
        ? 'ብሩክ አለሙ 2,000 ብር ከፍሏል'
        : 'Biruk Alemu has completed payment of 2,000 ETB',
      type: 'success',
      timestamp: '2024-03-07T08:45:00',
      read: true,
      actionable: true,
      actionUrl: '/admin/payments/3',
      sender: 'Payment System',
      priority: 'medium'
    },
    {
      id: 4,
      title: language === 'am' ? 'ማረጋገጫ ጸድቋል' : 'Verification Approved',
      message: language === 'am'
        ? 'የአበበ ከበደ የመሬት ማረጋገጫ ጸድቋል'
        : 'Abebe Kebede\'s land verification has been approved',
      type: 'success',
      timestamp: '2024-03-06T16:20:00',
      read: true,
      actionable: false,
      sender: 'Verification Officer',
      priority: 'low'
    },
    {
      id: 5,
      title: language === 'am' ? 'ስርዓት ማሻሻያ' : 'System Update',
      message: language === 'am'
        ? 'ስርዓቱ ዛሬ ማታ 2 ሰአት ይዘጋል'
        : 'System will be down for maintenance tonight at 2 AM',
      type: 'error',
      timestamp: '2024-03-06T14:30:00',
      read: false,
      actionable: false,
      sender: 'Administrator',
      priority: 'high'
    },
    {
      id: 6,
      title: language === 'am' ? 'የወር አመላካች' : 'Monthly Milestone',
      message: language === 'am'
        ? 'በዚህ ወር 100ኛ ማረጋገጫዎን አጠናቀዋል!'
        : 'You have completed 100 verifications this month!',
      type: 'achievement',
      timestamp: '2024-03-06T09:00:00',
      read: true,
      actionable: false,
      sender: 'System',
      priority: 'low'
    }
  ]);

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (language === 'am') {
      if (diffMins < 1) return 'አሁን';
      if (diffMins < 60) return `${diffMins} ደቂቃ በፊት`;
      if (diffHours < 24) return `${diffHours} ሰዓት በፊት`;
      if (diffDays < 7) return `${diffDays} ቀን በፊት`;
      return past.toLocaleDateString('am-ET');
    } else {
      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays < 7) return `${diffDays} days ago`;
      return past.toLocaleDateString('en-US');
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch(type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      case 'achievement':
        return <StarIcon className="w-6 h-6 text-purple-500" />;
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch(priority) {
      case 'high':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {language === 'am' ? 'ከፍተኛ' : 'High'}
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {language === 'am' ? 'መካከለኛ' : 'Medium'}
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {language === 'am' ? 'ዝቅተኛ' : 'Low'}
          </span>
        );
      default:
        return null;
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

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header - FIXED: Removed stray tab character */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
            {t('notifications')}
          </h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
              {unreadCount} {language === 'am' ? 'አዲስ' : 'new'}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            {language === 'am' ? 'ሁሉንም አንብብ' : 'Mark all as read'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-1 inline-flex`}>
        <button
          onClick={() => setFilter('all')}
          className={`
            px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${filter === 'all'
              ? cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-700')
              : cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')
            }
          `}
        >
          {language === 'am' ? 'ሁሉም' : 'All'}
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`
            px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${filter === 'unread'
              ? cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-700')
              : cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')
            }
          `}
        >
          {language === 'am' ? 'ያልተነበቡ' : 'Unread'}
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`
            px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${filter === 'read'
              ? cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-700')
              : cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')
            }
          `}
        >
          {language === 'am' ? 'የተነበቡ' : 'Read'}
        </button>
      </div>

      {/* Notifications List */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        {filteredNotifications.length > 0 ? (
          <div className="divide-y ${cn('divide-gray-700', 'divide-gray-200')}">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  p-6 transition-colors relative
                  ${!notification.read ? cn('bg-gray-700/30', 'bg-blue-50/50') : ''}
                  ${cn('hover:bg-gray-700', 'hover:bg-gray-50')}
                `}
              >
                {!notification.read && (
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full"></span>
                )}
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-semibold ${cn('text-white', 'text-gray-900')}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(notification.priority)}
                        <span className={`text-xs ${cn('text-gray-400', 'text-gray-500')}`}>
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className={`text-sm ${cn('text-gray-300', 'text-gray-600')} mb-2`}>
                      {notification.message}
                    </p>
                    {notification.sender && (
                      <p className={`text-xs ${cn('text-gray-400', 'text-gray-500')}`}>
                        {language === 'am' ? 'ከ' : 'From'}: {notification.sender}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 rounded-lg hover:bg-gray-600 transition-colors"
                        title={language === 'am' ? 'አንብብ' : 'Mark as read'}
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      </button>
                    )}
                    {notification.actionable && (
                      <button
                        className="p-2 rounded-lg hover:bg-gray-600 transition-colors"
                        title={language === 'am' ? 'ተመልከት' : 'View'}
                      >
                        <EyeIcon className="w-5 h-5 text-blue-500" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 rounded-lg hover:bg-gray-600 transition-colors"
                      title={language === 'am' ? 'ሰርዝ' : 'Delete'}
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
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
              {language === 'am' ? 'ምንም ማሳወቂያዎች የሉም' : 'No notifications'}
            </p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ጠቅላላ' : 'Total'}
            </p>
            <BellIcon className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ያልተነበቡ' : 'Unread'}
            </p>
            <BellIconSolid className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ከፍተኛ ቅድሚያ' : 'High Priority'}
            </p>
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {notifications.filter(n => n.priority === 'high').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ዛሬ' : 'Today'}
            </p>
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {notifications.filter(n => {
              const today = new Date().toDateString();
              const notifDate = new Date(n.timestamp).toDateString();
              return today === notifDate;
            }).length}
          </p>
        </div>
      </div>
    </div>
  );
}