// app/officer/disputes/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ScaleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export default function DisputesPage() {
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
      pageTitle: { en: 'Dispute Resolution', am: 'የአለመግባባት መፍቻ' },
      totalDisputes: { en: 'Total {count} disputes', am: 'በአጠቃላይ {count} አለመግባባቶች' },
      
      // Buttons
      filter: { en: 'Filter', am: 'አጣራ' },
      export: { en: 'Export', am: 'ላክ' },
      resolveDispute: { en: 'Resolve Dispute', am: 'አለመግባባት ፍታ' },
      viewDetails: { en: 'View Details', am: 'ዝርዝሮችን ተመልከት' },
      assignMediator: { en: 'Assign Mediator', am: 'አስታራቂ መድብ' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      
      // Search
      searchPlaceholder: { en: 'Search by ID, complainant, or land...', am: 'በመታወቂያ፣ በአመልካች ወይም በመሬት ፈልግ...' },
      
      // Filter Dropdowns
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      allTypes: { en: 'All Dispute Types', am: 'ሁሉም የአለመግባባት አይነቶች' },
      
      // Dispute Status
      open: { en: 'Open', am: 'ክፍት' },
      underInvestigation: { en: 'Under Investigation', am: 'ምርመራ ላይ' },
      resolved: { en: 'Resolved', am: 'ተፈትቷል' },
      closed: { en: 'Closed', am: 'ተዘግቷል' },
      escalated: { en: 'Escalated', am: 'ደረጃ ጨምሯል' },
      
      // Dispute Types
      boundary: { en: 'Boundary Dispute', am: 'የድንበር አለመግባባት' },
      ownership: { en: 'Ownership Dispute', am: 'የባለቤትነት አለመግባባት' },
      inheritance: { en: 'Inheritance Dispute', am: 'የውርስ አለመግባባት' },
      encroachment: { en: 'Encroachment', am: 'ወረራ' },
      fraud: { en: 'Fraud', am: 'ማጭበርበር' },
      contract: { en: 'Contract Dispute', am: 'የውል አለመግባባት' },
      
      // Table Headers
      disputeId: { en: 'Dispute ID', am: 'የአለመግባባት መታወቂያ' },
      complainant: { en: 'Complainant', am: 'አመልካች' },
      respondent: { en: 'Respondent', am: 'ተከሳሽ' },
      type: { en: 'Type', am: 'አይነት' },
      landId: { en: 'Land ID', am: 'የመሬት መታወቂያ' },
      filedDate: { en: 'Filed Date', am: 'የቀረበበት ቀን' },
      status: { en: 'Status', am: 'ሁኔታ' },
      priority: { en: 'Priority', am: 'ቅድሚያ' },
      action: { en: 'Action', am: 'ድርጊት' },
      
      // Dispute Details
      disputeDetails: { en: 'Dispute Details', am: 'የአለመግባባት ዝርዝሮች' },
      complainantInfo: { en: 'Complainant Information', am: 'የአመልካች መረጃ' },
      respondentInfo: { en: 'Respondent Information', am: 'የተከሳሽ መረጃ' },
      landInfo: { en: 'Land Information', am: 'የመሬት መረጃ' },
      description: { en: 'Description', am: 'መግለጫ' },
      evidence: { en: 'Evidence', am: 'ማስረጃ' },
      mediator: { en: 'Mediator', am: 'አስታራቂ' },
      hearingDate: { en: 'Hearing Date', am: 'የችሎት ቀን' },
      resolution: { en: 'Resolution', am: 'መፍትሄ' },
      
      // Priority
      high: { en: 'High', am: 'ከፍተኛ' },
      medium: { en: 'Medium', am: 'መካከለኛ' },
      low: { en: 'Low', am: 'ዝቅተኛ' },
      
      // Summary Cards
      totalDisputes_card: { en: 'Total Disputes', am: 'ጠቅላላ አለመግባባቶች' },
      openDisputes: { en: 'Open', am: 'ክፍት' },
      resolvedDisputes: { en: 'Resolved', am: 'የተፈቱ' },
      highPriority: { en: 'High Priority', am: 'ከፍተኛ ቅድሚያ' },
      
      // Empty State
      noDisputes: { en: 'No disputes found', am: 'ምንም አለመግባባቶች አልተገኙም' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} results', am: '{start} እስከ {end} ከ {total} ውጤቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
      // Additional
      evidence_count: { en: 'evidence items', am: 'ማስረጃዎች' },
      
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

  // Get Ethiopian year from Gregorian year (using regular numbers)
  const getEthiopianYear = (dateStr: string): number => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // Ethiopian year is approximately 7-8 years behind Gregorian
    let ethiopianYear = year - 8
    
    // Adjust for dates after September (Ethiopian New Year)
    if (month >= 8) { // September-December (months 8-11)
      ethiopianYear = year - 7
    }
    
    return ethiopianYear
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
    }
    return userNames[nameKey]?.[language] || nameKey
  }

  // Format date with Ethiopian month and regular numbers for year
  const formatDate = (date: string): string => {
    const dateObj = new Date(date)
    
    if (language === 'am') {
      const day = dateObj.getDate()
      const ethiopianMonth = getEthiopianMonth(date)
      const ethiopianYear = getEthiopianYear(date)
      
      return `${ethiopianMonth} ${day}, ${ethiopianYear}`
    }
    
    // English format
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const disputes = [
    {
      id: 'DSP-2024-001',
      complainantKey: 'abebe',
      respondentKey: 'tekle',
      type: 'boundary',
      landId: 'BD-2024-001',
      location: 'Kebele 01, Tana Port',
      locationAm: 'ቀበሌ 01፣ የጣና ወደብ',
      filedDate: '2024-03-15',
      status: 'open',
      priority: 'high',
      description: 'Disagreement about property boundary line',
      descriptionAm: 'ስለ ንብረት ድንበር መስመር አለመግባባት',
      evidence: 3,
      mediator: null,
      hearingDate: '2024-03-25'
    },
    {
      id: 'DSP-2024-002',
      complainantKey: 'tigist',
      respondentKey: 'biruk',
      type: 'ownership',
      landId: 'BD-2024-003',
      location: 'Kebele 03, Polytechnic Area',
      locationAm: 'ቀበሌ 03፣ ፖሊቴክኒክ አካባቢ',
      filedDate: '2024-03-14',
      status: 'underInvestigation',
      priority: 'high',
      description: 'Claim of ownership over same parcel',
      descriptionAm: 'በአንድ ቦታ ላይ የባለቤትነት ይገባኛል ጥያቄ',
      evidence: 5,
      mediator: 'Meron Tadesse',
      hearingDate: '2024-03-22'
    },
    {
      id: 'DSP-2024-003',
      complainantKey: 'meron',
      respondentKey: 'alemitu',
      type: 'inheritance',
      landId: 'BD-2024-005',
      location: 'Kebele 02, Bezawit Area',
      locationAm: 'ቀበሌ 02፣ ቤዛዊት አካባቢ',
      filedDate: '2024-03-13',
      status: 'resolved',
      priority: 'medium',
      description: 'Dispute over inheritance of family land',
      descriptionAm: 'በቤተሰብ መሬት ውርስ ላይ አለመግባባት',
      evidence: 4,
      mediator: 'Biruk Alemu',
      resolution: 'Land divided equally among heirs',
      resolutionAm: 'መሬት በወራሾች መካከል በእኩል ተከፋፍሏል'
    },
    {
      id: 'DSP-2024-004',
      complainantKey: 'tekle',
      respondentKey: 'senait',
      type: 'encroachment',
      landId: 'BD-2024-008',
      location: 'Kebele 08, Tis Abay',
      locationAm: 'ቀበሌ 08፣ ጥስ አባይ',
      filedDate: '2024-03-12',
      status: 'open',
      priority: 'high',
      description: 'Neighbor built fence on my property',
      descriptionAm: 'ጎረቤት በንብረቴ ላይ አጥር ሠራ',
      evidence: 2,
      mediator: null,
      hearingDate: '2024-03-24'
    },
    {
      id: 'DSP-2024-005',
      complainantKey: 'senait',
      respondentKey: 'mulugeta',
      type: 'fraud',
      landId: 'BD-2024-010',
      location: 'Kebele 10, Tana',
      locationAm: 'ቀበሌ 10፣ ጣና',
      filedDate: '2024-03-11',
      status: 'underInvestigation',
      priority: 'high',
      description: 'Forged documents used to claim land',
      descriptionAm: 'መሬት ለመጠየቅ የተጭበረበሩ ሰነዶች መጠቀም',
      evidence: 6,
      mediator: 'Abebe Kebede',
      hearingDate: '2024-03-23'
    },
    {
      id: 'DSP-2024-006',
      complainantKey: 'mulugeta',
      respondentKey: 'getachew',
      type: 'contract',
      landId: 'BD-2024-002',
      location: 'Kebele 02, Bezawit Area',
      locationAm: 'ቀበሌ 02፣ ቤዛዊት አካባቢ',
      filedDate: '2024-03-10',
      status: 'closed',
      priority: 'medium',
      description: 'Breach of land sale contract',
      descriptionAm: 'የመሬት ሽያጭ ውል መጣስ',
      evidence: 3,
      mediator: 'Tigist Haile',
      resolution: 'Contract terminated, deposit returned',
      resolutionAm: 'ውል ተቋርጧል፣ ተቀማጭ ገንዘብ ተመልሷል'
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; text: string }> = {
      open: { 
        color: 'red', 
        icon: ShieldExclamationIcon,
        text: translate('open')
      },
      underInvestigation: { 
        color: 'yellow', 
        icon: ClockIcon,
        text: translate('underInvestigation')
      },
      resolved: { 
        color: 'green', 
        icon: CheckCircleIcon,
        text: translate('resolved')
      },
      closed: { 
        color: 'gray', 
        icon: XCircleIcon,
        text: translate('closed')
      },
      escalated: { 
        color: 'purple', 
        icon: ScaleIcon,
        text: translate('escalated')
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

  const getDisputeTypeBadge = (type: string) => {
    const typeConfig: Record<string, { color: string; text: string }> = {
      boundary: { color: 'blue', text: translate('boundary') },
      ownership: { color: 'purple', text: translate('ownership') },
      inheritance: { color: 'green', text: translate('inheritance') },
      encroachment: { color: 'red', text: translate('encroachment') },
      fraud: { color: 'orange', text: translate('fraud') },
      contract: { color: 'yellow', text: translate('contract') },
    }
    
    const config = typeConfig[type]
    if (!config) return <span>{type}</span>
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { color: string; text: string }> = {
      high: { color: 'red', text: translate('high') },
      medium: { color: 'yellow', text: translate('medium') },
      low: { color: 'green', text: translate('low') },
    }
    
    const config = priorityConfig[priority]
    if (!config) return <span>{priority}</span>
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    )
  }

  const filteredDisputes = disputes.filter(item => {
    const complainantName = getUserName(item.complainantKey).toLowerCase()
    const respondentName = getUserName(item.respondentKey).toLowerCase()
    const searchLower = searchQuery.toLowerCase()
    
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchLower) ||
      complainantName.includes(searchLower) ||
      respondentName.includes(searchLower) ||
      item.landId.toLowerCase().includes(searchLower)
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesType = filterType === 'all' || item.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate summary stats
  const totalDisputes = disputes.length
  const openDisputes = disputes.filter(d => d.status === 'open' || d.status === 'underInvestigation').length
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved' || d.status === 'closed').length
  const highPriorityCount = disputes.filter(d => d.priority === 'high').length

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDisputes = filteredDisputes.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
            {translate('pageTitle')}
          </h2>
          <p className={`${cn('text-gray-400', 'text-gray-600')} mt-1`}>
            {translate('totalDisputes').replace('{count}', filteredDisputes.length.toString())}
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
                {translate('totalDisputes_card')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{totalDisputes}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <ShieldExclamationIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('openDisputes')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{openDisputes}</p>
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
                {translate('resolvedDisputes')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{resolvedDisputes}</p>
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
                {translate('highPriority')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{highPriorityCount}</p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <ScaleIcon className="w-6 h-6 text-red-500" />
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
            <option value="open">{translate('open')}</option>
            <option value="underInvestigation">{translate('underInvestigation')}</option>
            <option value="resolved">{translate('resolved')}</option>
            <option value="closed">{translate('closed')}</option>
            <option value="escalated">{translate('escalated')}</option>
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
            <option value="boundary">{translate('boundary')}</option>
            <option value="ownership">{translate('ownership')}</option>
            <option value="inheritance">{translate('inheritance')}</option>
            <option value="encroachment">{translate('encroachment')}</option>
            <option value="fraud">{translate('fraud')}</option>
            <option value="contract">{translate('contract')}</option>
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

      {/* Disputes Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
        {filteredDisputes.length === 0 ? (
          <div className="text-center py-12">
            <ShieldExclamationIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className={`${cn('text-gray-300', 'text-gray-600')}`}>
              {translate('noDisputes')}
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
                      {translate('disputeId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('complainant')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('respondent')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('type')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('landId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('filedDate')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('priority')}
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
                  {paginatedDisputes.map((item) => (
                    <tr key={item.id} className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors`}>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm font-medium`}>
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm`}>
                            {getUserName(item.complainantKey)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm`}>
                            {getUserName(item.respondentKey)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getDisputeTypeBadge(item.type)}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {item.landId}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {formatDate(item.filedDate)}
                      </td>
                      <td className="px-6 py-4">
                        {getPriorityBadge(item.priority)}
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
                          {item.status === 'open' && (
                            <button
                              className="text-green-500 hover:text-green-400"
                              title={translate('assignMediator')}
                            >
                              <UserIcon className="w-5 h-5" />
                            </button>
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
                  .replace('{end}', Math.min(startIndex + itemsPerPage, filteredDisputes.length).toString())
                  .replace('{total}', filteredDisputes.length.toString())}
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