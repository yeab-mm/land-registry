'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  CreditCardIcon,
  BanknotesIcon,
  WalletIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface Payment {
  id: number;
  transactionId: string;
  payerName: string;
  payerPhone: string;
  amount: number;
  type: 'verification' | 'transfer' | 'listing' | 'tax';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: 'telebirr' | 'cbebirr' | 'cash' | 'bank';
  parcelId: string;
  date: string;
  time: string;
  reference: string;
}

export default function AdminPaymentsPage() {
  const { darkMode, language } = useLanguage();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const payments: Payment[] = [
    {
      id: 1,
      transactionId: 'TXN-2024-001',
      payerName: language === 'am' ? 'አበበ ከበደ' : 'Abebe Kebede',
      payerPhone: '+251 911 123 456',
      amount: 1500,
      type: 'verification',
      status: 'completed',
      method: 'telebirr',
      parcelId: 'BA-2024-001',
      date: '2024-03-07',
      time: '10:30 AM',
      reference: 'REF-001-2024'
    },
    {
      id: 2,
      transactionId: 'TXN-2024-002',
      payerName: language === 'am' ? 'ትግስት ኃይሉ' : 'Tigist Haile',
      payerPhone: '+251 922 234 567',
      amount: 5000,
      type: 'transfer',
      status: 'pending',
      method: 'cbebirr',
      parcelId: 'BA-2024-089',
      date: '2024-03-07',
      time: '11:45 AM',
      reference: 'REF-002-2024'
    },
    {
      id: 3,
      transactionId: 'TXN-2024-003',
      payerName: language === 'am' ? 'ብሩክ አለሙ' : 'Biruk Alemu',
      payerPhone: '+251 933 345 678',
      amount: 2000,
      type: 'listing',
      status: 'completed',
      method: 'cash',
      parcelId: 'BA-2024-045',
      date: '2024-03-06',
      time: '2:15 PM',
      reference: 'REF-003-2024'
    },
    {
      id: 4,
      transactionId: 'TXN-2024-004',
      payerName: language === 'am' ? 'መሮን ታደሰ' : 'Meron Tadesse',
      payerPhone: '+251 944 456 789',
      amount: 3500,
      type: 'tax',
      status: 'failed',
      method: 'bank',
      parcelId: 'BA-2024-123',
      date: '2024-03-06',
      time: '4:30 PM',
      reference: 'REF-004-2024'
    },
    {
      id: 5,
      transactionId: 'TXN-2024-005',
      payerName: language === 'am' ? 'ደሳለኝ መኮንን' : 'Desalegn Mekonnen',
      payerPhone: '+251 955 567 890',
      amount: 1200,
      type: 'verification',
      status: 'completed',
      method: 'telebirr',
      parcelId: 'BA-2024-067',
      date: '2024-03-05',
      time: '9:20 AM',
      reference: 'REF-005-2024'
    },
    {
      id: 6,
      transactionId: 'TXN-2024-006',
      payerName: language === 'am' ? 'አስናቀ በላይ' : 'Asnake Belay',
      payerPhone: '+251 966 678 901',
      amount: 8000,
      type: 'transfer',
      status: 'pending',
      method: 'cbebirr',
      parcelId: 'BA-2024-156',
      date: '2024-03-05',
      time: '1:10 PM',
      reference: 'REF-006-2024'
    }
  ];

  // Calculate summary statistics
  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const todayPayments = payments.filter(p => p.date === '2024-03-07').length;
  const todayAmount = payments.filter(p => p.date === '2024-03-07').reduce((sum, p) => sum + p.amount, 0);

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(language === 'am' ? 'am-ET' : 'en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status badge
  const getStatusBadge = (status: Payment['status']) => {
    switch(status) {
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {language === 'am' ? 'ተፈጽሟል' : 'Completed'}
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {language === 'am' ? 'በመጠባበቅ ላይ' : 'Pending'}
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {language === 'am' ? 'አልተሳካም' : 'Failed'}
          </span>
        );
      case 'refunded':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            {language === 'am' ? 'ተመላሽ ተደርጓል' : 'Refunded'}
          </span>
        );
      default:
        return null;
    }
  };

  // Get payment type badge
  const getTypeBadge = (type: Payment['type']) => {
    switch(type) {
      case 'verification':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {language === 'am' ? 'ማረጋገጫ' : 'Verification'}
          </span>
        );
      case 'transfer':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            {language === 'am' ? 'ዝውውር' : 'Transfer'}
          </span>
        );
      case 'listing':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {language === 'am' ? 'ዝርዝር' : 'Listing'}
          </span>
        );
      case 'tax':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
            {language === 'am' ? 'ግብር' : 'Tax'}
          </span>
        );
      default:
        return null;
    }
  };

  // Get payment method badge
  const getMethodBadge = (method: Payment['method']) => {
    switch(method) {
      case 'telebirr':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {language === 'am' ? 'ቴሌ ብር' : 'TeleBirr'}
          </span>
        );
      case 'cbebirr':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {language === 'am' ? 'ሲቢኢ ብር' : 'CBE Birr'}
          </span>
        );
      case 'cash':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {language === 'am' ? 'ጥሬ ገንዘብ' : 'Cash'}
          </span>
        );
      case 'bank':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            {language === 'am' ? 'ባንክ' : 'Bank'}
          </span>
        );
      default:
        return null;
    }
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.payerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.parcelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesMethod;
  });

  return (
    <div className="space-y-6">
      {/* Header - FIXED: Removed stray tab character */}
      <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
        {t('payments')}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ዛሬ ክፍያዎች' : 'Today\'s Payments'}
            </p>
            <CreditCardIcon className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{todayPayments}</p>
          <p className="text-xs text-gray-400 mt-1">{formatCurrency(todayAmount)}</p>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'ጠቅላላ ክፍያዎች' : 'Total Payments'}
            </p>
            <WalletIcon className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{totalPayments}</p>
          <p className="text-xs text-gray-400 mt-1">{formatCurrency(totalAmount)}</p>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'የተፈጸሙ' : 'Completed'}
            </p>
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(completedAmount)}</p>
          <p className="text-xs text-gray-400 mt-1">
            {payments.filter(p => p.status === 'completed').length} {language === 'am' ? 'ክፍያዎች' : 'payments'}
          </p>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
              {language === 'am' ? 'በመጠባበቅ ላይ' : 'Pending'}
            </p>
            <BanknotesIcon className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingAmount)}</p>
          <p className="text-xs text-gray-400 mt-1">
            {payments.filter(p => p.status === 'pending').length} {language === 'am' ? 'ክፍያዎች' : 'payments'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'am' 
                ? 'በስም፣ በመለያ ቁጥር ወይም በመሬት ቁጥር ፈልግ...' 
                : 'Search by name, transaction ID, or parcel...'}
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`
              px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          >
            <option value="all">{language === 'am' ? 'ሁሉም ሁኔታ' : 'All Status'}</option>
            <option value="completed">{language === 'am' ? 'የተፈጸመ' : 'Completed'}</option>
            <option value="pending">{language === 'am' ? 'በመጠባበቅ ላይ' : 'Pending'}</option>
            <option value="failed">{language === 'am' ? 'ያልተሳካ' : 'Failed'}</option>
            <option value="refunded">{language === 'am' ? 'የተመለሰ' : 'Refunded'}</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`
              px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          >
            <option value="all">{language === 'am' ? 'ሁሉም አይነት' : 'All Types'}</option>
            <option value="verification">{language === 'am' ? 'ማረጋገጫ' : 'Verification'}</option>
            <option value="transfer">{language === 'am' ? 'ዝውውር' : 'Transfer'}</option>
            <option value="listing">{language === 'am' ? 'ዝርዝር' : 'Listing'}</option>
            <option value="tax">{language === 'am' ? 'ግብር' : 'Tax'}</option>
          </select>

          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className={`
              px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          >
            <option value="all">{language === 'am' ? 'ሁሉም ዘዴ' : 'All Methods'}</option>
            <option value="telebirr">{language === 'am' ? 'ቴሌ ብር' : 'TeleBirr'}</option>
            <option value="cbebirr">{language === 'am' ? 'ሲቢኢ ብር' : 'CBE Birr'}</option>
            <option value="cash">{language === 'am' ? 'ጥሬ ገንዘብ' : 'Cash'}</option>
            <option value="bank">{language === 'am' ? 'ባንክ' : 'Bank'}</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn('bg-gray-700', 'bg-gray-50')}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'የግብይት መለያ' : 'Transaction ID'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'ከፋይ' : 'Payer'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'የመሬት ቁጥር' : 'Parcel ID'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'መጠን' : 'Amount'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'አይነት' : 'Type'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'ዘዴ' : 'Method'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'ሁኔታ' : 'Status'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'ቀን' : 'Date'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {language === 'am' ? 'ድርጊት' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className={`${cn('bg-gray-800', 'bg-white')} divide-y ${cn('divide-gray-700', 'divide-gray-200')}`}>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className={`font-medium ${cn('text-white', 'text-gray-900')}`}>
                        {payment.transactionId}
                      </p>
                      <p className="text-xs text-gray-400">{payment.reference}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className={`font-medium ${cn('text-white', 'text-gray-900')}`}>
                        {payment.payerName}
                      </p>
                      <p className="text-xs text-gray-400">{payment.payerPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">{payment.parcelId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-green-600">
                      {formatCurrency(payment.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(payment.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getMethodBadge(payment.method)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className={`text-sm ${cn('text-gray-300', 'text-gray-600')}`}>
                        {payment.date}
                      </p>
                      <p className="text-xs text-gray-400">{payment.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <EyeIcon className="w-5 h-5 text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <ArrowDownTrayIcon className="w-5 h-5 text-green-400" />
                      </button>
                      {payment.status === 'pending' && (
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
        {filteredPayments.length === 0 && (
          <div className="p-8 text-center">
            <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className={`text-lg ${cn('text-gray-300', 'text-gray-600')}`}>
              {language === 'am' ? 'ምንም ክፍያዎች አልተገኙም' : 'No payments found'}
            </p>
          </div>
        )}

        {/* Table Footer */}
        {filteredPayments.length > 0 && (
          <div className={`px-6 py-4 border-t ${cn('border-gray-700', 'border-gray-200')}`}>
            <div className="flex justify-between items-center">
              <p className={`text-sm ${cn('text-gray-400', 'text-gray-600')}`}>
                {language === 'am' 
                  ? `ጠቅላላ ${filteredPayments.length} ክፍያዎች ታይተዋል` 
                  : `Showing ${filteredPayments.length} payments`}
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  {language === 'am' ? 'ቀዳሚ' : 'Previous'}
                </button>
                <button className="px-3 py-1 border rounded-lg text-sm bg-green-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  2
                </button>
                <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  3
                </button>
                <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  {language === 'am' ? 'ቀጣይ' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}