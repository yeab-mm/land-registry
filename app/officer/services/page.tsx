// app/officer/services/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  FolderIcon,
  DocumentTextIcon,
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
  PaperClipIcon
} from '@heroicons/react/24/outline'

export default function ServiceApplicationsPage() {
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
      pageTitle: { en: 'Service Applications', am: 'የአገልግሎት ማመልከቻዎች' },
      totalApplications: { en: 'Total {count} service applications', am: 'በአጠቃላይ {count} የአገልግሎት ማመልከቻዎች' },
      
      // Buttons
      filter: { en: 'Filter', am: 'አጣራ' },
      export: { en: 'Export', am: 'ላክ' },
      processApplication: { en: 'Process Application', am: 'ማመልከቻ አስኪድ' },
      viewDetails: { en: 'View Details', am: 'ዝርዝሮችን ተመልከት' },
      approve: { en: 'Approve', am: 'አጽድቅ' },
      reject: { en: 'Reject', am: 'ውድቅ አድርግ' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      
      // Search
      searchPlaceholder: { en: 'Search by ID, applicant, or purpose...', am: 'በመታወቂያ፣ በአመልካች ወይም በዓላማ ፈልግ...' },
      
      // Filter Dropdowns
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      allTypes: { en: 'All Service Types', am: 'ሁሉም የአገልግሎት አይነቶች' },
      
      // Application Status
      pending: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      underReview: { en: 'Under Review', am: 'እየተገመገመ' },
      approved: { en: 'Approved', am: 'ጸድቋል' },
      rejected: { en: 'Rejected', am: 'ውድቅ ተደርጓል' },
      completed: { en: 'Completed', am: 'ተጠናቋል' },
      infoNeeded: { en: 'Info Needed', am: 'መረጃ ያስፈልጋል' },
      
      // Service Types
      landSubdivision: { en: 'Land Subdivision', am: 'የመሬት ክፍፍል' },
      landMerger: { en: 'Land Merger', am: 'የመሬት ውህደት' },
      zoningChange: { en: 'Zoning Change', am: 'የዞን ለውጥ' },
      landUsePermit: { en: 'Land Use Permit', am: 'የመሬት አጠቃቀም ፈቃድ' },
      boundaryRealignment: { en: 'Boundary Realignment', am: 'የድንበር ማስተካከያ' },
      landCertificate: { en: 'Land Certificate', am: 'የመሬት ሰርተፍኬት' },
      taxAssessment: { en: 'Tax Assessment', am: 'የግብር ምዘና' },
      
      // Table Headers
      applicationId: { en: 'Application ID', am: 'የማመልከቻ መታወቂያ' },
      applicant: { en: 'Applicant', am: 'አመልካች' },
      serviceType: { en: 'Service Type', am: 'የአገልግሎት አይነት' },
      landId: { en: 'Land ID', am: 'የመሬት መታወቂያ' },
      submissionDate: { en: 'Submission Date', am: 'የቀረበበት ቀን' },
      fee: { en: 'Fee', am: 'ክፍያ' },
      status: { en: 'Status', am: 'ሁኔታ' },
      action: { en: 'Action', am: 'ድርጊት' },
      
      // Application Details
      applicationDetails: { en: 'Application Details', am: 'የማመልከቻ ዝርዝሮች' },
      applicantInfo: { en: 'Applicant Information', am: 'የአመልካች መረጃ' },
      landInfo: { en: 'Land Information', am: 'የመሬት መረጃ' },
      documents: { en: 'Documents', am: 'ሰነዶች' },
      purpose: { en: 'Purpose', am: 'ዓላማ' },
      feeAmount: { en: 'Fee Amount', am: 'የክፍያ መጠን' },
      paymentStatus: { en: 'Payment Status', am: 'የክፍያ ሁኔታ' },
      assignedOfficer: { en: 'Assigned Officer', am: 'የተመደበ ኦፊሰር' },
      
      // Summary Cards
      totalApplications_card: { en: 'Total Applications', am: 'ጠቅላላ ማመልከቻዎች' },
      pendingApplications: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      approvedApplications: { en: 'Approved', am: 'ጸድቋል' },
      totalFees: { en: 'Total Fees', am: 'ጠቅላላ ክፍያ' },
      
      // Empty State
      noApplications: { en: 'No service applications found', am: 'ምንም የአገልግሎት ማመልከቻዎች አልተገኙም' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} results', am: '{start} እስከ {end} ከ {total} ውጤቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
      // Additional
      documents_count: { en: 'documents', am: 'ሰነዶች' },
      paid: { en: 'Paid', am: 'ተከፍሏል' },
      unpaid: { en: 'Unpaid', am: 'አልተከፈለም' },
      
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

  const applications = [
    {
      id: 'APP-2024-001',
      applicantKey: 'abebe',
      serviceType: 'landSubdivision',
      landId: 'BD-2024-001',
      location: 'Kebele 01, Tana Port',
      locationAm: 'ቀበሌ ፩፣ የጣና ወደብ',
      submissionDate: '2024-03-15',
      fee: 2500,
      paymentStatus: 'paid',
      status: 'pending',
      documents: 3,
      purpose: 'Subdivide land into 2 plots for family',
      purposeAm: 'መሬት ለቤተሰብ ወደ 2 ቦታዎች መከፋፈል',
      assignedOfficer: 'Biruk Alemu'
    },
    {
      id: 'APP-2024-002',
      applicantKey: 'tigist',
      serviceType: 'zoningChange',
      landId: 'BD-2024-003',
      location: 'Kebele 03, Polytechnic Area',
      locationAm: 'ቀበሌ ፫፣ ፖሊቴክኒክ አካባቢ',
      submissionDate: '2024-03-14',
      fee: 3500,
      paymentStatus: 'paid',
      status: 'underReview',
      documents: 4,
      purpose: 'Change from residential to commercial',
      purposeAm: 'ከመኖሪያ ወደ ንግድ መቀየር',
      assignedOfficer: 'Meron Tadesse'
    },
    {
      id: 'APP-2024-003',
      applicantKey: 'biruk',
      serviceType: 'landCertificate',
      landId: 'BD-2024-005',
      location: 'Kebele 02, Bezawit Area',
      locationAm: 'ቀበሌ ፪፣ ቤዛዊት አካባቢ',
      submissionDate: '2024-03-13',
      fee: 1500,
      paymentStatus: 'paid',
      status: 'approved',
      documents: 2,
      purpose: 'Replacement of lost certificate',
      purposeAm: 'የጠፋ ሰርተፍኬት መተካት',
      assignedOfficer: 'Abebe Kebede'
    },
    {
      id: 'APP-2024-004',
      applicantKey: 'meron',
      serviceType: 'taxAssessment',
      landId: 'BD-2024-008',
      location: 'Kebele 08, Tis Abay',
      locationAm: 'ቀበሌ ፰፣ ጥስ አባይ',
      submissionDate: '2024-03-12',
      fee: 800,
      paymentStatus: 'unpaid',
      status: 'pending',
      documents: 1,
      purpose: 'Property tax re-assessment',
      purposeAm: 'የንብረት ግብር እንደገና መገምገም',
      assignedOfficer: null
    },
    {
      id: 'APP-2024-005',
      applicantKey: 'alemitu',
      serviceType: 'landMerger',
      landId: 'BD-2024-002',
      location: 'Kebele 02, Bezawit Area',
      locationAm: 'ቀበሌ ፪፣ ቤዛዊት አካባቢ',
      submissionDate: '2024-03-11',
      fee: 2000,
      paymentStatus: 'paid',
      status: 'infoNeeded',
      documents: 3,
      purpose: 'Merge two adjacent plots',
      purposeAm: 'ሁለት አጎራባች ቦታዎችን ማዋሃድ',
      assignedOfficer: 'Tigist Haile'
    },
    {
      id: 'APP-2024-006',
      applicantKey: 'tekle',
      serviceType: 'boundaryRealignment',
      landId: 'BD-2024-007',
      location: 'Kebele 07, Abay',
      locationAm: 'ቀበሌ ፯፣ አባይ',
      submissionDate: '2024-03-10',
      fee: 1800,
      paymentStatus: 'paid',
      status: 'rejected',
      documents: 2,
      purpose: 'Correct boundary with neighbor',
      purposeAm: 'ከጎረቤት ጋር ድንበር ማስተካከል',
      assignedOfficer: 'Biruk Alemu'
    },
    {
      id: 'APP-2024-007',
      applicantKey: 'senait',
      serviceType: 'landUsePermit',
      landId: 'BD-2024-010',
      location: 'Kebele 10, Tana',
      locationAm: 'ቀበሌ ፲፣ ጣና',
      submissionDate: '2024-03-09',
      fee: 5000,
      paymentStatus: 'paid',
      status: 'completed',
      documents: 4,
      purpose: 'Permit for eco-lodge construction',
      purposeAm: 'ለኢኮ-ሎጅ ግንባታ ፈቃድ',
      assignedOfficer: 'Meron Tadesse'
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
      infoNeeded: { 
        color: 'purple', 
        icon: DocumentTextIcon,
        text: translate('infoNeeded')
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

  const getServiceTypeBadge = (type: string) => {
    const typeConfig: Record<string, { color: string; text: string }> = {
      landSubdivision: { color: 'blue', text: translate('landSubdivision') },
      landMerger: { color: 'purple', text: translate('landMerger') },
      zoningChange: { color: 'yellow', text: translate('zoningChange') },
      landUsePermit: { color: 'green', text: translate('landUsePermit') },
      boundaryRealignment: { color: 'orange', text: translate('boundaryRealignment') },
      landCertificate: { color: 'indigo', text: translate('landCertificate') },
      taxAssessment: { color: 'red', text: translate('taxAssessment') },
    }
    
    const config = typeConfig[type]
    if (!config) return <span>{type}</span>
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    )
  }

  const filteredApplications = applications.filter(item => {
    const applicantName = getUserName(item.applicantKey).toLowerCase()
    const searchLower = searchQuery.toLowerCase()
    
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchLower) ||
      applicantName.includes(searchLower) ||
      item.landId.toLowerCase().includes(searchLower) ||
      item.purpose.toLowerCase().includes(searchLower)
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesType = filterType === 'all' || item.serviceType === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate summary stats
  const totalApplications = applications.length
  const pendingApplications = applications.filter(a => a.status === 'pending' || a.status === 'underReview' || a.status === 'infoNeeded').length
  const approvedApplications = applications.filter(a => a.status === 'approved' || a.status === 'completed').length
  const totalFees = applications
    .filter(a => a.paymentStatus === 'paid')
    .reduce((sum, a) => sum + a.fee, 0)

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
            {translate('pageTitle')}
          </h2>
          <p className={`${cn('text-gray-400', 'text-gray-600')} mt-1`}>
            {translate('totalApplications').replace('{count}', filteredApplications.length.toString())}
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
                {translate('totalApplications_card')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{totalApplications}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FolderIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('pendingApplications')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{pendingApplications}</p>
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
                {translate('approvedApplications')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{approvedApplications}</p>
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
                {translate('totalFees')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {formatPrice(totalFees)}
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
            <option value="infoNeeded">{translate('infoNeeded')}</option>
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
            <option value="landSubdivision">{translate('landSubdivision')}</option>
            <option value="landMerger">{translate('landMerger')}</option>
            <option value="zoningChange">{translate('zoningChange')}</option>
            <option value="landUsePermit">{translate('landUsePermit')}</option>
            <option value="boundaryRealignment">{translate('boundaryRealignment')}</option>
            <option value="landCertificate">{translate('landCertificate')}</option>
            <option value="taxAssessment">{translate('taxAssessment')}</option>
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

      {/* Applications Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FolderIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className={`${cn('text-gray-300', 'text-gray-600')}`}>
              {translate('noApplications')}
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
                      {translate('applicationId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('applicant')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('serviceType')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('landId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('submissionDate')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('fee')}
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
                  {paginatedApplications.map((item) => (
                    <tr key={item.id} className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors`}>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm font-medium`}>
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm`}>
                            {getUserName(item.applicantKey)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getServiceTypeBadge(item.serviceType)}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {item.landId}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {formatDate(item.submissionDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="text-green-500 font-semibold text-sm">
                            {formatPrice(item.fee)}
                          </span>
                          <span className={`ml-2 text-xs ${item.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                            ({item.paymentStatus === 'paid' ? translate('paid') : translate('unpaid')})
                          </span>
                        </div>
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
                  .replace('{end}', Math.min(startIndex + itemsPerPage, filteredApplications.length).toString())
                  .replace('{total}', filteredApplications.length.toString())}
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