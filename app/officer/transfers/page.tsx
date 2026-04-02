// app/officer/transfers/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function TransfersPage() {
  const { darkMode } = useLanguage()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  // Translation helper function with Ethiopian months
  const translate = (key: string): string => {
    const translations: Record<string, { en: string; am: string }> = {
      // Page Header
      pageTitle: { en: 'Transfer Requests', am: 'የዝውውር ጥያቄዎች' },
      totalTransfers: { en: 'Total {count} transfer requests', am: 'በአጠቃላይ {count} የዝውውር ጥያቄዎች' },
      
      // Buttons
      filter: { en: 'Filter', am: 'አጣራ' },
      export: { en: 'Export', am: 'ላክ' },
      processTransfer: { en: 'Process Transfer', am: 'ዝውውር አስኪድ' },
      viewDetails: { en: 'View Details', am: 'ዝርዝሮችን ተመልከት' },
      approve: { en: 'Approve', am: 'አጽድቅ' },
      reject: { en: 'Reject', am: 'ውድቅ አድርግ' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      
      // Search
      searchPlaceholder: { en: 'Search by ID, seller, or buyer...', am: 'በመታወቂያ፣ በሻጭ ወይም በገዢ ስም ፈልግ...' },
      
      // Filter Dropdowns
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      allTypes: { en: 'All Types', am: 'ሁሉም አይነቶች' },
      
      // Transfer Status
      pending: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      underReview: { en: 'Under Review', am: 'እየተገመገመ' },
      approved: { en: 'Approved', am: 'ጸድቋል' },
      rejected: { en: 'Rejected', am: 'ውድቅ ተደርጓል' },
      completed: { en: 'Completed', am: 'ተጠናቋል' },
      
      // Transfer Types
      sale: { en: 'Sale', am: 'ሽያጭ' },
      gift: { en: 'Gift', am: 'ስጦታ' },
      inheritance: { en: 'Inheritance', am: 'ውርስ' },
      exchange: { en: 'Exchange', am: 'ልውውጥ' },
      
      // Table Headers
      transferId: { en: 'Transfer ID', am: 'የዝውውር መታወቂያ' },
      landId: { en: 'Land ID', am: 'የመሬት መታወቂያ' },
      seller: { en: 'Seller', am: 'ሻጭ' },
      buyer: { en: 'Buyer', am: 'ገዢ' },
      type: { en: 'Type', am: 'አይነት' },
      date: { en: 'Request Date', am: 'የጥያቄ ቀን' },
      amount: { en: 'Amount', am: 'መጠን' },
      status: { en: 'Status', am: 'ሁኔታ' },
      action: { en: 'Action', am: 'ድርጊት' },
      
      // Transfer Details
      transferDetails: { en: 'Transfer Details', am: 'የዝውውር ዝርዝሮች' },
      sellerInfo: { en: 'Seller Information', am: 'የሻጭ መረጃ' },
      buyerInfo: { en: 'Buyer Information', am: 'የገዢ መረጃ' },
      landInfo: { en: 'Land Information', am: 'የመሬት መረጃ' },
      documents: { en: 'Documents', am: 'ሰነዶች' },
      transferDate: { en: 'Transfer Date', am: 'የዝውውር ቀን' },
      reason: { en: 'Reason', am: 'ምክንያት' },
      
      // Summary Cards
      totalRequests: { en: 'Total Requests', am: 'ጠቅላላ ጥያቄዎች' },
      pendingRequests: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      approvedTransfers: { en: 'Approved', am: 'ጸድቋል' },
      totalValue: { en: 'Total Value', am: 'ጠቅላላ ዋጋ' },
      
      // Empty State
      noTransfers: { en: 'No transfer requests found', am: 'ምንም የዝውውር ጥያቄዎች አልተገኙም' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} results', am: '{start} እስከ {end} ከ {total} ውጤቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
      // Additional
      viewAll: { en: 'View All', am: 'ሁሉንም ተመልከት' },
      documents_count: { en: 'documents', am: 'ሰነዶች' },
      
      // Ethiopian Months
      january: { en: 'January', am: 'ጥር' },
      february: { en: 'February', am: 'የካቲት' },
      march: { en: 'March', am: 'መጋቢት' },
      april: { en: 'April', am: 'ሚያዝያ' },
      may: { en: 'May', am: 'ግንቦት' },
      june: { en: 'June', am: 'ሰኔ' },
      july: { en: 'July', am: 'ሐምሌ' },
      august: { en: 'August', am: 'ነሐሴ' },
      september: { en: 'September', am: 'መስከረም' },
      october: { en: 'October', am: 'ጥቅምት' },
      november: { en: 'November', am: 'ህዳር' },
      december: { en: 'December', am: 'ታህሳስ' },
    }
    
    return translations[key]?.[language] || key
  }

  // Get Ethiopian month name from date
  const getEthiopianMonth = (dateStr: string): string => {
    const date = new Date(dateStr)
    const month = date.getMonth()
    
    const monthNames = [
      translate('september'), // September (መስከረም)
      translate('october'),   // October (ጥቅምት)
      translate('november'),  // November (ህዳር)
      translate('december'),  // December (ታህሳስ)
      translate('january'),   // January (ጥር)
      translate('february'),  // February (የካቲት)
      translate('march'),     // March (መጋቢት)
      translate('april'),     // April (ሚያዝያ)
      translate('may'),       // May (ግንቦት)
      translate('june'),      // June (ሰኔ)
      translate('july'),      // July (ሐምሌ)
      translate('august'),    // August (ነሐሴ)
    ]
    
    // Ethiopian calendar starts in September
    const ethiopianMonthIndex = (month + 4) % 12
    return monthNames[ethiopianMonthIndex]
  }

  // User names with Amharic translations
  const getUserName = (nameKey: string): string => {
    const userNames: Record<string, { en: string; am: string }> = {
      abebe: { en: 'Abebe Kebede', am: 'አበበ ከበደ' },
      tigist: { en: 'Tigist Haile', am: 'ትግስት ኃይሌ' },
      biruk: { en: 'Biruk Alemu', am: 'ብሩክ አለሙ' },
      meron: { en: 'Meron Tadesse', am: 'ሜሮን ታደሰ' },
      alemitu: { en: 'Alemitu Bekele', am: 'አለሚቱ በቀለ' },
      tekle: { en: 'Tekle Berhan', am: 'ተክሌ ብርሃን' },
      senait: { en: 'Senait Gebre', am: 'ሰናይት ገብረ' },
      mulugeta: { en: 'Mulugeta Ayele', am: 'ሙሉጌታ አየለ' },
      getachew: { en: 'Getachew Tesfaye', am: 'ጌታቸው ተስፋዬ' },
      tsion: { en: 'Tsion Wondimu', am: 'ጽዮን ወንድሙ' },
      hailu: { en: 'Hailu Girmay', am: 'ኃይሉ ግርማይ' },
      azeb: { en: 'Azeb Hailu', am: 'አዜብ ኃይሉ' },
      mekdes: { en: 'Mekdes Tesfaye', am: 'መቅደስ ተስፋዬ' },
      yonas: { en: 'Yonas Desta', am: 'ዮናስ ደስታ' },
    }
    return userNames[nameKey]?.[language] || nameKey
  }

  // Format price with currency
  const formatPrice = (price: number): string => {
    if (language === 'am') {
      return `ብር ${price.toLocaleString()}`
    }
    return `ETB ${price.toLocaleString()}`
  }

  // Format date with Ethiopian month names
  const formatDate = (date: string): string => {
    const dateObj = new Date(date)
    
    if (language === 'am') {
      const month = dateObj.getMonth()
      const day = dateObj.getDate()
      
      const monthNames = [
        translate('september'),
        translate('october'),
        translate('november'),
        translate('december'),
        translate('january'),
        translate('february'),
        translate('march'),
        translate('april'),
        translate('may'),
        translate('june'),
        translate('july'),
        translate('august'),
      ]
      
      // Ethiopian calendar starts in September
      const ethiopianMonthIndex = (month + 4) % 12
      const ethiopianMonth = monthNames[ethiopianMonthIndex]
      
      return `${ethiopianMonth} ${day}`
    }
    
    // English format
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const transfers = [
    {
      id: 'TR-2024-001',
      landId: 'BD-2024-003',
      sellerKey: 'tekle',
      buyerKey: 'abebe',
      type: 'sale',
      requestDate: '2024-03-15',
      amount: 5800000,
      status: 'pending',
      documents: 3,
      location: 'Kebele 03, Polytechnic Area',
      locationAm: 'ቀበሌ 03፣ ፖሊቴክኒክ አካባቢ',
      reason: 'Sale of commercial property',
      reasonAm: 'የንግድ ንብረት ሽያጭ'
    },
    {
      id: 'TR-2024-002',
      landId: 'BD-2024-005',
      sellerKey: 'alemitu',
      buyerKey: 'biruk',
      type: 'sale',
      requestDate: '2024-03-14',
      amount: 7200000,
      status: 'underReview',
      documents: 4,
      location: 'Kebele 02, Bezawit Area',
      locationAm: 'ቀበሌ 02፣ ቤዛዊት አካባቢ',
      reason: 'Sale of residential land',
      reasonAm: 'የመኖሪያ መሬት ሽያጭ'
    },
    {
      id: 'TR-2024-003',
      landId: 'BD-2024-008',
      sellerKey: 'hailu',
      buyerKey: 'meron',
      type: 'sale',
      requestDate: '2024-03-13',
      amount: 11200000,
      status: 'approved',
      documents: 4,
      location: 'Kebele 08, Tis Abay',
      locationAm: 'ቀበሌ 08፣ ጥስ አባይ',
      reason: 'Sale of agricultural land',
      reasonAm: 'የእርሻ መሬት ሽያጭ'
    },
    {
      id: 'TR-2024-004',
      landId: 'BD-2024-002',
      sellerKey: 'senait',
      buyerKey: 'getachew',
      type: 'gift',
      requestDate: '2024-03-12',
      amount: 0,
      status: 'pending',
      documents: 2,
      location: 'Kebele 02, Bezawit Area',
      locationAm: 'ቀበሌ 02፣ ቤዛዊት አካባቢ',
      reason: 'Gift to family member',
      reasonAm: 'ለቤተሰብ አባል ስጦታ'
    },
    {
      id: 'TR-2024-005',
      landId: 'BD-2024-010',
      sellerKey: 'tsion',
      buyerKey: 'mulugeta',
      type: 'sale',
      requestDate: '2024-03-11',
      amount: 18500000,
      status: 'rejected',
      documents: 3,
      location: 'Kebele 10, Tana',
      locationAm: 'ቀበሌ 10፣ ጣና',
      reason: 'Sale of lake front property',
      reasonAm: 'የሐይቅ ዳርቻ ንብረት ሽያጭ'
    },
    {
      id: 'TR-2024-006',
      landId: 'BD-2024-001',
      sellerKey: 'abebe',
      buyerKey: 'tigist',
      type: 'exchange',
      requestDate: '2024-03-10',
      amount: 4500000,
      status: 'completed',
      documents: 5,
      location: 'Kebele 01, Tana Port',
      locationAm: 'ቀበሌ 01፣ የጣና ወደብ',
      reason: 'Property exchange agreement',
      reasonAm: 'የንብረት ልውውጥ ስምምነት'
    },
    {
      id: 'TR-2024-007',
      landId: 'BD-2024-009',
      sellerKey: 'mekdes',
      buyerKey: 'yonas',
      type: 'inheritance',
      requestDate: '2024-03-09',
      amount: 0,
      status: 'pending',
      documents: 4,
      location: 'Kebele 09, Delmena',
      locationAm: 'ቀበሌ 9፣ ደልመና',
      reason: 'Inheritance transfer',
      reasonAm: 'የውርስ ዝውውር'
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; text: string }> = {
      pending: { 
        color: 'yellow', 
        icon: ClockIcon,
        text: translate('pending')
      },
      underReview: { 
        color: 'blue', 
        icon: DocumentTextIcon,
        text: translate('underReview')
      },
      approved: { 
        color: 'green', 
        icon: CheckCircleIcon,
        text: translate('approved')
      },
      rejected: { 
        color: 'red', 
        icon: XCircleIcon,
        text: translate('rejected')
      },
      completed: { 
        color: 'green', 
        icon: CheckCircleIcon,
        text: translate('completed')
      },
    }
    
    const config = statusConfig[status]
    if (!config) return <span>{status}</span>
    
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    )
  }

  const getTypeBadge = (type: string) => {
    const typeConfig: Record<string, { color: string; text: string }> = {
      sale: { color: 'green', text: translate('sale') },
      gift: { color: 'purple', text: translate('gift') },
      inheritance: { color: 'blue', text: translate('inheritance') },
      exchange: { color: 'yellow', text: translate('exchange') },
    }
    
    const config = typeConfig[type]
    if (!config) return <span>{type}</span>
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    )
  }

  const filteredTransfers = transfers.filter(item => {
    const sellerName = getUserName(item.sellerKey).toLowerCase()
    const buyerName = getUserName(item.buyerKey).toLowerCase()
    const searchLower = searchQuery.toLowerCase()
    
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchLower) ||
      item.landId.toLowerCase().includes(searchLower) ||
      sellerName.includes(searchLower) ||
      buyerName.includes(searchLower)
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesType = filterType === 'all' || item.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate summary stats
  const totalRequests = transfers.length
  const pendingRequests = transfers.filter(t => t.status === 'pending' || t.status === 'underReview').length
  const approvedTransfers = transfers.filter(t => t.status === 'approved' || t.status === 'completed').length
  const totalValue = transfers
    .filter(t => t.status !== 'rejected')
    .reduce((sum, t) => sum + t.amount, 0)

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransfers = filteredTransfers.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
            {translate('pageTitle')}
          </h2>
          <p className={`${cn('text-gray-400', 'text-gray-600')} mt-1`}>
            {translate('totalTransfers').replace('{count}', filteredTransfers.length.toString())}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className={`${cn('bg-gray-700 hover:bg-gray-600', 'bg-white hover:bg-gray-50 border border-gray-300')} px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center`}>
            <FunnelIcon className="w-4 h-4 mr-2" />
            {translate('filter')}
          </button>
          <button className={`${cn('bg-gray-700 hover:bg-gray-600', 'bg-white hover:bg-gray-50 border border-gray-300')} px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center`}>
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            {translate('export')}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('totalRequests')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{totalRequests}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('pendingRequests')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{pendingRequests}</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('approvedTransfers')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{approvedTransfers}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('totalValue')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {formatPrice(totalValue)}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg p-4`}>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={translate('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-lg text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="all">{translate('allStatus')}</option>
            <option value="pending">{translate('pending')}</option>
            <option value="underReview">{translate('underReview')}</option>
            <option value="approved">{translate('approved')}</option>
            <option value="rejected">{translate('rejected')}</option>
            <option value="completed">{translate('completed')}</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-lg text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="all">{translate('allTypes')}</option>
            <option value="sale">{translate('sale')}</option>
            <option value="gift">{translate('gift')}</option>
            <option value="inheritance">{translate('inheritance')}</option>
            <option value="exchange">{translate('exchange')}</option>
          </select>

          {(filterStatus !== 'all' || filterType !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setFilterStatus('all')
                setFilterType('all')
                setSearchQuery('')
                setCurrentPage(1)
              }}
              className="text-sm text-green-500 hover:text-green-400"
            >
              {translate('clearFilters')}
            </button>
          )}
        </div>
      </div>

      {/* Transfers Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
        {filteredTransfers.length === 0 ? (
          <div className="text-center py-12">
            <ArrowPathIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className={`${cn('text-gray-300', 'text-gray-600')}`}>
              {translate('noTransfers')}
            </p>
            <button
              onClick={() => {
                setFilterStatus('all')
                setFilterType('all')
                setSearchQuery('')
              }}
              className="mt-2 text-sm text-green-500 hover:text-green-400"
            >
              {translate('clearFilters')}
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${cn('bg-gray-700/50', 'bg-gray-50')}`}>
                  <tr>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('transferId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('landId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('seller')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('buyer')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('type')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('date')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('amount')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('status')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paginatedTransfers.map((item) => (
                    <tr key={item.id} className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors`}>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm font-medium`}>
                        {item.id}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {item.landId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm`}>
                            {getUserName(item.sellerKey)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm`}>
                            {getUserName(item.buyerKey)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getTypeBadge(item.type)}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {formatDate(item.requestDate)}
                      </td>
                      <td className="px-6 py-4">
                        {item.amount > 0 ? (
                          <span className="text-green-500 font-semibold text-sm">
                            {formatPrice(item.amount)}
                          </span>
                        ) : (
                          <span className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                            N/A
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-400"
                            title={translate('viewDetails')}
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          {item.status === 'pending' && (
                            <>
                              <button
                                className="text-green-500 hover:text-green-400"
                                title={translate('approve')}
                              >
                                <CheckCircleIcon className="w-5 h-5" />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-400"
                                title={translate('reject')}
                              >
                                <XCircleIcon className="w-5 h-5" />
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
            
            {/* Pagination */}
            <div className={`${cn('border-gray-700', 'border-gray-200')} border-t px-6 py-4 flex items-center justify-between`}>
              <div className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('showing')
                  .replace('{start}', (startIndex + 1).toString())
                  .replace('{end}', Math.min(startIndex + itemsPerPage, filteredTransfers.length).toString())
                  .replace('{total}', filteredTransfers.length.toString())}
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
    </div>
  )
}