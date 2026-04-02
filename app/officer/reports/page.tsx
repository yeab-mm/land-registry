// app/officer/reports/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  DocumentChartBarIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  BuildingStorefrontIcon,
  ShieldExclamationIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  TableCellsIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline'

export default function ReportsPage() {
  const { darkMode } = useLanguage()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [selectedReportType, setSelectedReportType] = useState('verifications')
  const [dateRange, setDateRange] = useState('month')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  // Translation helper function
  const translate = (key: string): string => {
    const translations: Record<string, { en: string; am: string }> = {
      // Page Header
      pageTitle: { en: 'Reports & Analytics', am: 'ሪፖርቶች እና ትንታኔዎች' },
      generateReports: { en: 'Generate Reports', am: 'ሪፖርቶችን አመንጭ' },
      
      // Buttons
      generate: { en: 'Generate Report', am: 'ሪፖርት አመንጭ' },
      download: { en: 'Download', am: 'አውርድ' },
      preview: { en: 'Preview', am: 'ቅድመ-እይታ' },
      export: { en: 'Export', am: 'ላክ' },
      print: { en: 'Print', am: 'አትም' },
      schedule: { en: 'Schedule', am: 'ቀጠሮ' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      
      // Report Types
      reportType: { en: 'Report Type', am: 'የሪፖርት አይነት' },
      verifications: { en: 'Verifications Report', am: 'የማረጋገጫ ሪፖርት' },
      transactions: { en: 'Transactions Report', am: 'የግብይት ሪፖርት' },
      users: { en: 'Users Report', am: 'የተጠቃሚዎች ሪፖርት' },
      marketplace: { en: 'Marketplace Report', am: 'የገበያ ቦታ ሪፖርት' },
      disputes: { en: 'Disputes Report', am: 'የአለመግባባት ሪፖርት' },
      payments: { en: 'Payments Report', am: 'የክፍያ ሪፖርት' },
      audit: { en: 'Audit Report', am: 'የኦዲት ሪፖርት' },
      
      // Date Range
      dateRange: { en: 'Date Range', am: 'የቀን ክልል' },
      today: { en: 'Today', am: 'ዛሬ' },
      yesterday: { en: 'Yesterday', am: 'ትናንት' },
      thisWeek: { en: 'This Week', am: 'በዚህ ሳምንት' },
      lastWeek: { en: 'Last Week', am: 'ባለፈው ሳምንት' },
      thisMonth: { en: 'This Month', am: 'በዚህ ወር' },
      lastMonth: { en: 'Last Month', am: 'ባለፈው ወር' },
      thisQuarter: { en: 'This Quarter', am: 'በዚህ ሩብ' },
      lastQuarter: { en: 'Last Quarter', am: 'ባለፈው ሩብ' },
      thisYear: { en: 'This Year', am: 'በዚህ አመት' },
      lastYear: { en: 'Last Year', am: 'ባለፈው አመት' },
      custom: { en: 'Custom Range', am: 'ብጁ ክልል' },
      
      // Date Labels
      startDate: { en: 'Start Date', am: 'የመጀመሪያ ቀን' },
      endDate: { en: 'End Date', am: 'የመጨረሻ ቀን' },
      
      // Report Formats
      format: { en: 'Format', am: 'ቅርጸት' },
      pdf: { en: 'PDF', am: 'ፒዲኤፍ' },
      excel: { en: 'Excel', am: 'ኤክሴል' },
      csv: { en: 'CSV', am: 'ሲኤስቪ' },
      
      // Report Sections
      summary: { en: 'Summary', am: 'ማጠቃለያ' },
      details: { en: 'Details', am: 'ዝርዝሮች' },
      charts: { en: 'Charts', am: 'ገበታዎች' },
      tables: { en: 'Tables', am: 'ሰንጠረዦች' },
      
      // Report Metrics
      totalCount: { en: 'Total Count', am: 'ጠቅላላ ቁጥር' },
      average: { en: 'Average', am: 'አማካይ' },
      percentage: { en: 'Percentage', am: 'መቶኛ' },
      growth: { en: 'Growth', am: 'እድገት' },
      comparison: { en: 'Comparison', am: 'ንጽጽር' },
      
      // Verification Metrics
      totalVerifications: { en: 'Total Verifications', am: 'ጠቅላላ ማረጋገጫዎች' },
      pendingVerifications: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      approvedVerifications: { en: 'Approved', am: 'የጸደቁ' },
      rejectedVerifications: { en: 'Rejected', am: 'ውድቅ የሆኑ' },
      avgProcessingTime: { en: 'Avg. Processing Time', am: 'አማካይ የሂደት ጊዜ' },
      
      // Transaction Metrics
      totalTransactions: { en: 'Total Transactions', am: 'ጠቅላላ ግብይቶች' },
      totalRevenue: { en: 'Total Revenue', am: 'ጠቅላላ ገቢ' },
      avgTransactionValue: { en: 'Avg. Transaction Value', am: 'አማካይ የግብይት ዋጋ' },
      paymentMethods: { en: 'Payment Methods', am: 'የክፍያ ዘዴዎች' },
      
      // User Metrics
      totalUsers: { en: 'Total Users', am: 'ጠቅላላ ተጠቃሚዎች' },
      newUsers: { en: 'New Users', am: 'አዲስ ተጠቃሚዎች' },
      activeUsers: { en: 'Active Users', am: 'ንቁ ተጠቃሚዎች' },
      userRoles: { en: 'User Roles', am: 'የተጠቃሚ ሚናዎች' },
      
      // Marketplace Metrics
      totalListings: { en: 'Total Listings', am: 'ጠቅላላ ዝርዝሮች' },
      activeListings: { en: 'Active Listings', am: 'ንቁ ዝርዝሮች' },
      soldProperties: { en: 'Sold Properties', am: 'የተሸጡ ንብረቶች' },
      totalValue: { en: 'Total Value', am: 'ጠቅላላ ዋጋ' },
      
      // Dispute Metrics
      totalDisputes: { en: 'Total Disputes', am: 'ጠቅላላ አለመግባባቶች' },
      resolvedDisputes: { en: 'Resolved', am: 'የተፈቱ' },
      pendingDisputes: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      avgResolutionTime: { en: 'Avg. Resolution Time', am: 'አማካይ የመፍቻ ጊዜ' },
      
      // Generated Reports
      generatedReports: { en: 'Generated Reports', am: 'የተዘጋጁ ሪፖርቶች' },
      reportName: { en: 'Report Name', am: 'የሪፖርት ስም' },
      generatedDate: { en: 'Generated Date', am: 'የተዘጋጀበት ቀን' },
      period: { en: 'Period', am: 'ጊዜ' },
      size: { en: 'Size', am: 'መጠን' },
      actions: { en: 'Actions', am: 'ድርጊቶች' },
      
      // Sample Reports
      monthlyVerificationReport: { en: 'Monthly Verification Report', am: 'ወርሃዊ የማረጋገጫ ሪፖርት' },
      march2024: { en: 'March 2024', am: 'መጋቢት 2015' },
      q1Transactions: { en: 'Q1 Transactions Report', am: 'የመጀመሪያ ሩብ የግብይት ሪፖርት' },
      userGrowthReport: { en: 'User Growth Report', am: 'የተጠቃሚ እድገት ሪፖርት' },
      marketplaceActivity: { en: 'Marketplace Activity Report', am: 'የገበያ ቦታ እንቅስቃሴ ሪፖርት' },
      
      // Empty State
      noReports: { en: 'No reports generated yet', am: 'ገና ምንም ሪፖርቶች አልተዘጋጁም' },
      generateFirst: { en: 'Generate your first report', am: 'የመጀመሪያ ሪፖርትዎን ያመንጩ' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} reports', am: '{start} እስከ {end} ከ {total} ሪፖርቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
      // Status
      generating_: { en: 'Generating...', am: 'በመዘጋጀት ላይ...' },
      ready: { en: 'Ready', am: 'ዝግጁ' },
      failed: { en: 'Failed', am: 'አልተሳካም' },
      
      // Preview Modal
      reportPreview: { en: 'Report Preview', am: 'የሪፖርት ቅድመ-እይታ' },
      close: { en: 'Close', am: 'ዝጋ' },
      downloadReport: { en: 'Download Report', am: 'ሪፖርት አውርድ' },
    }
    
    return translations[key]?.[language] || key
  }

  // Format date
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }
    
    if (language === 'am') {
      return new Date(date).toLocaleDateString('am-ET', options)
    }
    return new Date(date).toLocaleDateString('en-US', options)
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const reportTypes = [
    { id: 'verifications', name: translate('verifications'), icon: DocumentCheckIcon },
    { id: 'transactions', name: translate('transactions'), icon: CreditCardIcon },
    { id: 'users', name: translate('users'), icon: UserGroupIcon },
    { id: 'marketplace', name: translate('marketplace'), icon: BuildingStorefrontIcon },
    { id: 'disputes', name: translate('disputes'), icon: ShieldExclamationIcon },
    { id: 'payments', name: translate('payments'), icon: CreditCardIcon },
    { id: 'audit', name: translate('audit'), icon: DocumentTextIcon },
  ]

  const generatedReports = [
    {
      id: 1,
      name: translate('monthlyVerificationReport'),
      type: 'verifications',
      period: translate('march2024'),
      generatedDate: '2024-03-15',
      size: 245760, // 240 KB
      format: 'pdf',
      status: 'ready'
    },
    {
      id: 2,
      name: translate('q1Transactions'),
      type: 'transactions',
      period: 'Q1 2024',
      generatedDate: '2024-03-14',
      size: 524288, // 512 KB
      format: 'excel',
      status: 'ready'
    },
    {
      id: 3,
      name: translate('userGrowthReport'),
      type: 'users',
      period: translate('march2024'),
      generatedDate: '2024-03-13',
      size: 184320, // 180 KB
      format: 'pdf',
      status: 'ready'
    },
    {
      id: 4,
      name: translate('marketplaceActivity'),
      type: 'marketplace',
      period: translate('thisWeek'),
      generatedDate: '2024-03-12',
      size: 307200, // 300 KB
      format: 'csv',
      status: 'ready'
    },
    {
      id: 5,
      name: 'February Disputes Report',
      type: 'disputes',
      period: 'February 2024',
      generatedDate: '2024-03-01',
      size: 153600, // 150 KB
      format: 'pdf',
      status: 'ready'
    },
  ]

  const getReportIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      verifications: DocumentCheckIcon,
      transactions: CreditCardIcon,
      users: UserGroupIcon,
      marketplace: BuildingStorefrontIcon,
      disputes: ShieldExclamationIcon,
      payments: CreditCardIcon,
      audit: DocumentTextIcon,
    }
    const Icon = iconMap[type] || DocumentChartBarIcon
    return <Icon className="w-5 h-5" />
  }

  const handleGenerateReport = () => {
    setGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false)
      setShowPreview(true)
    }, 2000)
  }

  const filteredReports = generatedReports.filter(report => 
    selectedReportType === 'all' || report.type === selectedReportType
  )

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage)

  // Report Preview Modal
  const ReportPreviewModal = () => {
    if (!showPreview) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${cn('text-white', 'text-gray-900')} text-xl font-bold`}>
                {translate('reportPreview')}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className={`${cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')}`}
              >
                ✕
              </button>
            </div>
            
            {/* Report Content */}
            <div className={`${cn('bg-gray-700', 'bg-gray-50')} rounded-lg p-6 mb-6`}>
              {/* Header */}
              <div className="text-center mb-6">
                <h4 className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>BAHIR DAR CITY</h4>
                <p className={`${cn('text-gray-400', 'text-gray-600')}`}>Land Administration Office</p>
                <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                  {translate(reportTypes.find(r => r.id === selectedReportType)?.name || '')} - {translate(dateRange)}
                </p>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`${cn('bg-gray-800', 'bg-white')} p-4 rounded-lg`}>
                  <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>{translate('totalCount')}</p>
                  <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>1,234</p>
                </div>
                <div className={`${cn('bg-gray-800', 'bg-white')} p-4 rounded-lg`}>
                  <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>{translate('average')}</p>
                  <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>123</p>
                </div>
                <div className={`${cn('bg-gray-800', 'bg-white')} p-4 rounded-lg`}>
                  <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>{translate('growth')}</p>
                  <p className="text-green-500 text-2xl font-bold">+12%</p>
                </div>
                <div className={`${cn('bg-gray-800', 'bg-white')} p-4 rounded-lg`}>
                  <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>{translate('percentage')}</p>
                  <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>45%</p>
                </div>
              </div>
              
              {/* Chart Placeholder */}
              <div className={`${cn('bg-gray-800', 'bg-gray-200')} h-64 rounded-lg mb-6 flex items-center justify-center`}>
                <PresentationChartLineIcon className="w-16 h-16 text-gray-500" />
              </div>
              
              {/* Table Preview */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${cn('bg-gray-800', 'bg-gray-200')}`}>
                    <tr>
                      <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-4 py-2 text-xs font-medium`}>Date</th>
                      <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-4 py-2 text-xs font-medium`}>Count</th>
                      <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-4 py-2 text-xs font-medium`}>Amount</th>
                      <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-4 py-2 text-xs font-medium`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-t border-gray-700">
                        <td className={`${cn('text-gray-300', 'text-gray-700')} px-4 py-2 text-sm`}>2024-03-{i}</td>
                        <td className={`${cn('text-gray-300', 'text-gray-700')} px-4 py-2 text-sm`}>{i * 10}</td>
                        <td className={`${cn('text-gray-300', 'text-gray-700')} px-4 py-2 text-sm`}>
                          {language === 'am' ? 'ብር ' : 'ETB '}{(i * 10000).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {translate('completed')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className={`px-4 py-2 ${cn('bg-gray-700 hover:bg-gray-600', 'bg-gray-200 hover:bg-gray-300')} rounded-lg transition-colors`}
              >
                {translate('close')}
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                {translate('downloadReport')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
            {translate('pageTitle')}
          </h2>
          <p className={`${cn('text-gray-400', 'text-gray-600')} mt-1`}>
            {translate('generateReports')}
          </p>
        </div>
      </div>

      {/* Report Generator */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg p-6`}>
        <h3 className={`${cn('text-white', 'text-gray-900')} text-lg font-semibold mb-4`}>
          {translate('generate')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Report Type */}
          <div>
            <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
              {translate('reportType')}
            </label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          {/* Date Range */}
          <div>
            <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
              {translate('dateRange')}
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              <option value="today">{translate('today')}</option>
              <option value="yesterday">{translate('yesterday')}</option>
              <option value="thisWeek">{translate('thisWeek')}</option>
              <option value="lastWeek">{translate('lastWeek')}</option>
              <option value="thisMonth">{translate('thisMonth')}</option>
              <option value="lastMonth">{translate('lastMonth')}</option>
              <option value="thisQuarter">{translate('thisQuarter')}</option>
              <option value="lastQuarter">{translate('lastQuarter')}</option>
              <option value="thisYear">{translate('thisYear')}</option>
              <option value="lastYear">{translate('lastYear')}</option>
              <option value="custom">{translate('custom')}</option>
            </select>
          </div>
          
          {/* Custom Date Range */}
          {dateRange === 'custom' && (
            <>
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('startDate')}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('endDate')}
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
            </>
          )}
        </div>
        
        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {generating ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {translate('generating_')}
              </>
            ) : (
              translate('generate')
            )}
          </button>
        </div>
      </div>

      {/* Report Types Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {reportTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={() => setSelectedReportType(type.id)}
              className={`${cn('bg-gray-800 hover:bg-gray-700', 'bg-white hover:bg-gray-50 border border-gray-200')} p-4 rounded-lg text-center transition-colors ${
                selectedReportType === type.id ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <span className={`${cn('text-gray-300', 'text-gray-600')} text-xs block`}>
                {type.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Generated Reports */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className={`${cn('text-white', 'text-gray-900')} font-semibold`}>
            {translate('generatedReports')}
          </h3>
        </div>
        
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <DocumentChartBarIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className={`${cn('text-gray-300', 'text-gray-600')}`}>
              {translate('noReports')}
            </p>
            <p className={`${cn('text-gray-400', 'text-gray-500')} text-sm mt-1`}>
              {translate('generateFirst')}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${cn('bg-gray-700/50', 'bg-gray-50')}`}>
                  <tr>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('reportName')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('type')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('period')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('generatedDate')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('size')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('format')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paginatedReports.map((report) => (
                    <tr key={report.id} className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getReportIcon(report.type)}
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm font-medium ml-2`}>
                            {report.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${cn('text-gray-300', 'text-gray-700')} text-sm`}>
                          {translate(report.type)}
                        </span>
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-700')} px-6 py-4 text-sm`}>
                        {report.period}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-700')} px-6 py-4 text-sm`}>
                        {formatDate(report.generatedDate)}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-700')} px-6 py-4 text-sm`}>
                        {formatFileSize(report.size)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          report.format === 'pdf' ? 'bg-red-100 text-red-800' :
                          report.format === 'excel' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {report.format.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-400"
                            title={translate('preview')}
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          <button
                            className="text-green-500 hover:text-green-400"
                            title={translate('download')}
                          >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className={`${cn('border-gray-700', 'border-gray-200')} border-t px-6 py-4 flex items-center justify-between`}>
              <div className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('showing')
                  .replace('{start}', (startIndex + 1).toString())
                  .replace('{end}', Math.min(startIndex + itemsPerPage, filteredReports.length).toString())
                  .replace('{total}', filteredReports.length.toString())}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded flex items-center ${
                    currentPage === 1
                      ? `${cn('bg-gray-800 text-gray-600', 'bg-gray-100 text-gray-400')} cursor-not-allowed`
                      : `${cn('bg-gray-700 text-gray-300 hover:bg-green-600', 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white')} transition-colors`
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  {translate('previous')}
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded text-sm ${
                      currentPage === page
                        ? 'bg-green-600 text-white'
                        : `${cn('bg-gray-700 text-gray-300 hover:bg-green-600', 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white')} transition-colors`
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded flex items-center ${
                    currentPage === totalPages
                      ? `${cn('bg-gray-800 text-gray-600', 'bg-gray-100 text-gray-400')} cursor-not-allowed`
                      : `${cn('bg-gray-700 text-gray-300 hover:bg-green-600', 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white')} transition-colors`
                  }`}
                >
                  {translate('next')}
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Report Preview Modal */}
      <ReportPreviewModal />
    </div>
  )
}