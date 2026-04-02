'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import Link from 'next/link'; // Make sure this is imported
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function AdminReportsPage() {
  const { darkMode, language } = useLanguage();
  const { t } = useTranslation();
  const [selectedReport, setSelectedReport] = useState('users');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  // Report types
  const reportTypes = [
    { id: 'users', nameEn: 'Users', nameAm: 'ተጠቃሚዎች', icon: ChartBarIcon },
    { id: 'verifications', nameEn: 'Verifications', nameAm: 'ማረጋገጫዎች', icon: ChartBarIcon },
    { id: 'payments', nameEn: 'Payments', nameAm: 'ክፍያዎች', icon: ChartBarIcon },
    { id: 'listings', nameEn: 'Listings', nameAm: 'ዝርዝሮች', icon: ChartBarIcon },
  ];

  // Sample reports
  const allReports = [
    { id: 1, nameEn: 'Users Report', nameAm: 'የተጠቃሚዎች ሪፖርት', type: 'users', date: '2024-03-01', size: '2.4' },
    { id: 2, nameEn: 'Verifications Report', nameAm: 'የማረጋገጫ ሪፖርት', type: 'verifications', date: '2024-03-01', size: '1.8' },
    { id: 3, nameEn: 'Payments Report', nameAm: 'የክፍያ ሪፖርት', type: 'payments', date: '2024-03-05', size: '3.2' },
    { id: 4, nameEn: 'Listings Report', nameAm: 'የዝርዝሮች ሪፖርት', type: 'listings', date: '2024-03-01', size: '1.5' },
    { id: 5, nameEn: 'March Users Report', nameAm: 'የመጋቢት ተጠቃሚዎች ሪፖርት', type: 'users', date: '2024-03-15', size: '3.1' },
    { id: 6, nameEn: 'Weekly Verifications', nameAm: 'ሳምንታዊ ማረጋገጫዎች', type: 'verifications', date: '2024-03-10', size: '0.9' },
    { id: 7, nameEn: 'Q1 Payments', nameAm: 'የመጀመሪያ ሩብ ክፍያዎች', type: 'payments', date: '2024-03-20', size: '4.5' },
    { id: 8, nameEn: 'New Listings', nameAm: 'አዳዲስ ዝርዝሮች', type: 'listings', date: '2024-03-18', size: '2.2' },
  ];

  const filteredReports = allReports.filter(report => report.type === selectedReport);
  const totalCount = filteredReports.length;
  const totalSize = filteredReports.reduce((acc, report) => acc + parseFloat(report.size), 0).toFixed(1);

  const getReportName = (report: any) => {
    return language === 'en' ? report.nameEn : report.nameAm;
  };

  const getReportTypeName = (typeId: string) => {
    const type = reportTypes.find(t => t.id === typeId);
    if (!type) return '';
    return language === 'en' ? type.nameEn : type.nameAm;
  };

  const getText = (enText: string, amText: string) => {
    return language === 'en' ? enText : amText;
  };

  return (
    <div className="space-y-6">
      {/* Header with New Report Button - Fixed Link */}
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
          {getText('Reports', 'ሪፖርቶች')}
        </h1>
        <Link href="/admin/reports/new">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            {getText('New Report', 'አዲስ ሪፖርት')}
          </button>
        </Link>
      </div>

      {/* Report Type Selection */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
        <h2 className={`text-sm font-medium mb-3 ${cn('text-gray-400', 'text-gray-500')}`}>
          {getText('Select Report Type', 'የሪፖርት አይነት ይምረጡ')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedReport === type.id;
            const typeName = language === 'en' ? type.nameEn : type.nameAm;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`
                  flex items-center px-4 py-2 rounded-lg text-sm transition-colors
                  ${isSelected 
                    ? 'bg-green-600 text-white' 
                    : cn('bg-gray-700 text-gray-300 hover:bg-gray-600', 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  }
                `}
              >
                <Icon className="w-4 h-4 mr-2" />
                {typeName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Filter Info */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
        <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
          {getText('Showing', 'የሚታየው')}: <span className="font-semibold text-green-600">
            {getReportTypeName(selectedReport)}
          </span>
        </p>
      </div>

      {/* Reports List */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
        <div className={`px-6 py-4 border-b ${cn('border-gray-700', 'border-gray-200')}`}>
          <h2 className={`font-semibold ${cn('text-white', 'text-gray-900')}`}>
            {getText('Generated Reports', 'የተፈጠሩ ሪፖርቶች')} ({totalCount})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn('bg-gray-700', 'bg-gray-50')}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {getText('Report Name', 'የሪፖርቱ ስም')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {getText('Date', 'ቀን')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {getText('Size', 'መጠን')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  {getText('Actions', 'ድርጊቶች')}
                </th>
              </tr>
            </thead>
            <tbody className={`${cn('bg-gray-800', 'bg-white')} divide-y ${cn('divide-gray-700', 'divide-gray-200')}`}>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50')}>
                    <td className="px-6 py-4">
                      <p className={`text-sm font-medium ${cn('text-white', 'text-gray-900')}`}>
                        {getReportName(report)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {report.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {report.size} {getText('MB', 'ሜባ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded transition-colors" title={getText('View', 'ተመልከት')}>
                          <EyeIcon className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-700 rounded transition-colors" title={getText('Download', 'አውርድ')}>
                          <ArrowDownTrayIcon className="w-4 h-4 text-green-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">
                    <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
                      {getText('No reports found', 'ምንም ሪፖርት አልተገኘም')}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
            {getText('Total Reports', 'ጠቅላላ ሪፖርቶች')} ({getReportTypeName(selectedReport)})
          </p>
          <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
            {getText('Total Size', 'ጠቅላላ መጠን')}
          </p>
          <p className="text-2xl font-bold text-purple-600">{totalSize} {getText('MB', 'ሜባ')}</p>
        </div>
      </div>
    </div>
  );
}