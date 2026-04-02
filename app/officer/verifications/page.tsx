// app/officer/verifications/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PhotoIcon,
  MapIcon,
  UserIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function VerificationsPage() {
  const { darkMode } = useLanguage()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  // Translation helper function
  const translate = (key: string): string => {
    const translations: { [key: string]: { en: string, am: string } } = {
      // Page Header
      pageTitle: { en: 'Land Verification Requests', am: 'የመሬት ማረጋገጫ ጥያቄዎች' },
      totalRequests: { en: 'Total {count} pending requests to process', am: 'በአጠቃላይ {count} ያልተፈቱ ጥያቄዎች አሉ' },
      
      // Buttons
      filter: { en: 'Filter', am: 'አጣራ' },
      export: { en: 'Export', am: 'ላክ' },
      review: { en: 'Review', am: 'ተመልከት' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      
      // Search
      searchPlaceholder: { en: 'Search by ID, applicant, or location...', am: 'በመታወቂያ፣ በአመልካች ወይም በአካባቢ ፈልግ...' },
      
      // Filter Dropdowns
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      allPriority: { en: 'All Priority', am: 'ሁሉም ቅድሚያ' },
      
      // Status
      pending: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      underReview: { en: 'Under Review', am: 'እየተገመገመ' },
      approved: { en: 'Approved', am: 'ጸድቋል' },
      rejected: { en: 'Rejected', am: 'ውድቅ ተደርጓል' },
      
      // Priority
      high: { en: 'High', am: 'ከፍተኛ' },
      medium: { en: 'Medium', am: 'መካከለኛ' },
      low: { en: 'Low', am: 'ዝቅተኛ' },
      
      // Table Headers
      requestId: { en: 'Request ID', am: 'የጥያቄ መታወቂያ' },
      applicant: { en: 'Applicant', am: 'አመልካች' },
      landInfo: { en: 'Land Info', am: 'የመሬት መረጃ' },
      type: { en: 'Type', am: 'አይነት' },
      submitted: { en: 'Submitted', am: 'የቀረበበት ቀን' },
      documents: { en: 'Documents', am: 'ሰነዶች' },
      status: { en: 'Status', am: 'ሁኔታ' },
      priority: { en: 'Priority', am: 'ቅድሚያ' },
      officer: { en: 'Officer', am: 'ኦፊሰር' },
      action: { en: 'Action', am: 'ድርጊት' },
      
      // Document Types
      titleDeed: { en: 'Title Deed', am: 'የባለቤትነት ሰነድ' },
      idCard: { en: 'ID Card', am: 'መታወቂያ' },
      sitePlan: { en: 'Site Plan', am: 'የቦታ ንድፍ' },
      taxClearance: { en: 'Tax Clearance', am: 'የግብር ክፍያ' },
      saleAgreement: { en: 'Sale Agreement', am: 'የሽያጭ ውል' },
      previousTitle: { en: 'Previous Title', am: 'የቀድሞ ባለቤትነት' },
      taxReceipt: { en: 'Tax Receipt', am: 'የግብር ደረሰኝ' },
      neighborAffidavit: { en: 'Neighbor Affidavit', am: 'የጎረቤት ማረጋገጫ' },
      courtOrder: { en: 'Court Order', am: 'የፍርድ ቤት ትእዛዝ' },
      previousDeed: { en: 'Previous Deed', am: 'የቀድሞ ሰነድ' },
      witnessStatements: { en: 'Witness Statements', am: 'የምስክሮች መግለጫ' },
      deathCertificate: { en: 'Death Certificate', am: 'የሞት ሰርተፍኬት' },
      familyAffidavit: { en: 'Family Affidavit', am: 'የቤተሰብ ማረጋገጫ' },
      oldTitle: { en: 'Old Title', am: 'የቀድሞ ሰነድ' },
      
      // Verification Types
      newRegistration: { en: 'New Registration', am: 'አዲስ ምዝገባ' },
      ownershipTransfer: { en: 'Ownership Transfer', am: 'የባለቤትነት ዝውውር' },
      boundaryConfirmation: { en: 'Boundary Confirmation', am: 'የድንበር ማረጋገጫ' },
      disputeResolution: { en: 'Dispute Resolution', am: 'የአለመግባባት መፍቻ' },
      inheritanceTransfer: { en: 'Inheritance Transfer', am: 'የውርስ ዝውውር' },
      
      // Purposes
      firstTimeRegistration: { en: 'First time land registration', am: 'የመጀመሪያ ጊዜ መሬት ምዝገባ' },
      fatherToSonTransfer: { en: 'Transfer from father to son', am: 'ከአባት ወደ ልጅ ዝውውር' },
      boundaryForConstruction: { en: 'Confirm property boundaries for construction', am: 'ለግንባታ የመሬት ድንበር ማረጋገጥ' },
      disputeWithNeighbor: { en: 'Resolve ownership dispute with neighbor', am: 'ከጎረቤት ጋር የባለቤትነት አለመግባባት መፍታት' },
      inheritanceFromParent: { en: 'Inheritance from deceased parent', am: 'ከሟች ወላጅ የተወረሰ' },
      newlyPurchased: { en: 'Register newly purchased land', am: 'አዲስ የተገዛ መሬት ማስመዝገብ' },
      
      // Officer
      unassigned: { en: 'Unassigned', am: 'አልተመደበም' },
      
      // Files
      files: { en: 'files', am: 'ፋይሎች' },
      
      // Empty State
      noRequests: { en: 'No verification requests found', am: 'ምንም የማረጋገጫ ጥያቄዎች አልተገኙም' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} results', am: '{start} እስከ {end} ከ {total} ውጤቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
      // Summary Cards
      totalRequestsCard: { en: 'Total Requests', am: 'ጠቅላላ ጥያቄዎች' },
      pendingCard: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      underReviewCard: { en: 'Under Review', am: 'እየተገመገመ' },
      highPriorityCard: { en: 'High Priority', am: 'ከፍተኛ ቅድሚያ' },
      
      // Location Terms
      kebele: { en: 'Kebele', am: 'ቀበሌ' },
      woreda: { en: 'Woreda', am: 'ወረዳ' },
      zone: { en: 'Zone', am: 'ዞን' },
    }
    
    return translations[key]?.[language] || key
  }

  // User names with Amharic translations
  const getUserName = (nameKey: string) => {
    const userNames: { [key: string]: { en: string, am: string } } = {
      almaz: { en: 'Almaz Worku', am: 'አልማዝ ወርቁ' },
      tsegaye: { en: 'Tsegaye Molla', am: 'ፀጋዬ ሞላ' },
      bizuayehu: { en: 'Bizuayehu Kassu', am: 'ብዙአየሁ ካሱ' },
      meron: { en: 'Meron Alemu', am: 'ሜሮን አለሙ' },
      dawit: { en: 'Dawit Haile', am: 'ዳዊት ኃይሌ' },
      eyerusalem: { en: 'Eyerusalem Kebede', am: 'ኢየሩሳሌም ከበደ' },
      abebe: { en: 'Abebe Belay', am: 'አበበ በላይ' },
      sara: { en: 'Sara Hailu', am: 'ሳራ ኃይሉ' },
      tekle: { en: 'Tekle Berhan', am: 'ተክሌ ብርሃን' },
    }
    return userNames[nameKey]?.[language] || nameKey
  }

  // Format location with Amharic translation
  const formatLocation = (kebele: string, woreda: string) => {
    if (language === 'am') {
      return `${translate('kebele')} ${kebele}, ${translate('woreda')} ${woreda}`
    }
    return `Kebele ${kebele}, Woreda ${woreda}`
  }

  const verifications = [
    {
      id: 'VR-2024-001',
      applicant: 'almaz',
      applicantId: 'KB-0123456789',
      landId: 'PL-2023-156',
      kebele: '01',
      woreda: '03',
      area: '450 sqm',
      type: 'newRegistration',
      submittedDate: '2024-03-15',
      submittedTime: '09:30 AM',
      documents: ['titleDeed', 'idCard', 'sitePlan', 'taxClearance'],
      documentCount: 4,
      status: 'approved',
      priority: 'high',
      officer: 'unassigned',
      purpose: 'firstTimeRegistration'
    },
    {
      id: 'VR-2024-002',
      applicant: 'tsegaye',
      applicantId: 'KB-9876543210',
      landId: 'PL-2023-089',
      kebele: '05',
      woreda: '02',
      area: '320 sqm',
      type: 'ownershipTransfer',
      submittedDate: '2024-03-14',
      submittedTime: '02:15 PM',
      documents: ['saleAgreement', 'idCard', 'previousTitle', 'taxReceipt'],
      documentCount: 4,
      status: 'rejected',
      priority: 'medium',
      officer: 'abebe',
      purpose: 'fatherToSonTransfer'
    },
    {
      id: 'VR-2024-003',
      applicant: 'bizuayehu',
      applicantId: 'KB-4567891230',
      landId: 'PL-2023-234',
      kebele: '03',
      woreda: '01',
      area: '280 sqm',
      type: 'boundaryConfirmation',
      submittedDate: '2024-03-13',
      submittedTime: '11:45 AM',
      documents: ['sitePlan', 'idCard', 'neighborAffidavit'],
      documentCount: 3,
      status: 'approved',
      priority: 'low',
      officer: 'sara',
      purpose: 'boundaryForConstruction'
    },
    {
      id: 'VR-2024-004',
      applicant: 'meron',
      applicantId: 'KB-7418529630',
      landId: 'PL-2023-178',
      kebele: '02',
      woreda: '04',
      area: '550 sqm',
      type: 'disputeResolution',
      submittedDate: '2024-03-12',
      submittedTime: '10:00 AM',
      documents: ['courtOrder', 'idCard', 'previousDeed', 'witnessStatements'],
      documentCount: 4,
      status: 'rejected',
      priority: 'high',
      officer: 'tekle',
      purpose: 'disputeWithNeighbor'
    },
    {
      id: 'VR-2024-005',
      applicant: 'dawit',
      applicantId: 'KB-1597534862',
      landId: 'PL-2023-312',
      kebele: '04',
      woreda: '05',
      area: '680 sqm',
      type: 'inheritanceTransfer',
      submittedDate: '2024-03-11',
      submittedTime: '03:30 PM',
      documents: ['deathCertificate', 'idCard', 'familyAffidavit', 'oldTitle'],
      documentCount: 4,
      status: 'approved',
      priority: 'medium',
      officer: 'unassigned',
      purpose: 'inheritanceFromParent'
    },
    {
      id: 'VR-2024-006',
      applicant: 'eyerusalem',
      applicantId: 'KB-3216549870',
      landId: 'PL-2023-401',
      kebele: '01',
      woreda: '02',
      area: '210 sqm',
      type: 'newRegistration',
      submittedDate: '2024-03-10',
      submittedTime: '01:20 PM',
      documents: ['titleDeed', 'idCard', 'sitePlan'],
      documentCount: 3,
      status: 'under_review',
      priority: 'high',
      officer: 'abebe',
      purpose: 'newlyPurchased'
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        color: 'yellow', 
        icon: ClockIcon,
        text: translate('pending')
      },
      under_review: { 
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
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || ClockIcon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${config?.color}-100 text-${config?.color}-800`}>
        <Icon className="w-3 h-3 mr-1" />
        {config?.text || status}
      </span>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { 
        color: 'red', 
        text: translate('high'), 
        bg: 'bg-red-100', 
        textColor: 'text-red-800' 
      },
      medium: { 
        color: 'yellow', 
        text: translate('medium'), 
        bg: 'bg-yellow-100', 
        textColor: 'text-yellow-800' 
      },
      low: { 
        color: 'green', 
        text: translate('low'), 
        bg: 'bg-green-100', 
        textColor: 'text-green-800' 
      },
    }
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.textColor}`}>
        {config.text}
      </span>
    )
  }

  const getDocumentIcon = (docType: string) => {
    if (docType.includes('sitePlan') || docType.includes('photo')) {
      return <PhotoIcon className="w-3 h-3" />
    }
    return <DocumentTextIcon className="w-3 h-3" />
  }

  const filteredVerifications = verifications.filter(item => {
    const applicantName = getUserName(item.applicant).toLowerCase()
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicantName.includes(searchQuery.toLowerCase()) ||
      item.landId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kebele.includes(searchQuery) ||
      item.woreda.includes(searchQuery)
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVerifications = filteredVerifications.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
            {translate('pageTitle')}
          </h2>
          <p className={`${cn('text-gray-400', 'text-gray-600')} mt-1`}>
            {translate('totalRequests').replace('{count}', filteredVerifications.length.toString())}
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
            <option value="under_review">{translate('underReview')}</option>
            <option value="approved">{translate('approved')}</option>
            <option value="rejected">{translate('rejected')}</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => {
              setFilterPriority(e.target.value)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-lg text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="all">{translate('allPriority')}</option>
            <option value="high">{translate('high')}</option>
            <option value="medium">{translate('medium')}</option>
            <option value="low">{translate('low')}</option>
          </select>

          {(filterStatus !== 'all' || filterPriority !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setFilterStatus('all')
                setFilterPriority('all')
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

      {/* Verifications List */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
        {filteredVerifications.length === 0 ? (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className={`${cn('text-gray-300', 'text-gray-600')}`}>
              {translate('noRequests')}
            </p>
            <button
              onClick={() => {
                setFilterStatus('all')
                setFilterPriority('all')
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
                      {translate('requestId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('applicant')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('landInfo')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('type')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('submitted')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('documents')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('status')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('priority')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('officer')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {paginatedVerifications.map((item) => (
                    <tr key={item.id} className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors`}>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm font-medium`}>
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <div>
                            <div className={`${cn('text-white', 'text-gray-900')} text-sm font-medium`}>
                              {getUserName(item.applicant)}
                            </div>
                            <div className={`${cn('text-gray-400', 'text-gray-600')} text-xs`}>
                              {item.applicantId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <MapIcon className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                            <span className={`${cn('text-gray-300', 'text-gray-700')}`}>
                              {item.landId}
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <BuildingOfficeIcon className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                            <span className={`${cn('text-gray-400', 'text-gray-600')}`}>
                              {formatLocation(item.kebele, item.woreda)}
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <CalendarIcon className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0" />
                            <span className={`${cn('text-gray-400', 'text-gray-600')}`}>
                              {item.area}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        <div className="max-w-[150px]">
                          <p className="font-medium">{translate(item.type)}</p>
                          <p className={`${cn('text-gray-400', 'text-gray-600')} text-xs mt-1 truncate`} title={translate(item.purpose)}>
                            {translate(item.purpose)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`${cn('text-gray-300', 'text-gray-900')} text-sm`}>
                          {item.submittedDate}
                        </div>
                        <div className={`${cn('text-gray-400', 'text-gray-600')} text-xs`}>
                          {item.submittedTime}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex -space-x-1 mr-2">
                            {item.documents.slice(0, 3).map((doc, index) => (
                              <div
                                key={index}
                                className={`w-6 h-6 rounded-full ${cn('bg-gray-700', 'bg-gray-200')} flex items-center justify-center border-2 ${cn('border-gray-800', 'border-white')}`}
                                title={translate(doc)}
                              >
                                {getDocumentIcon(doc)}
                              </div>
                            ))}
                          </div>
                          <span className={`${cn('text-gray-400', 'text-gray-600')} text-xs`}>
                            {item.documentCount} {translate('files')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-6 py-4">
                        {getPriorityBadge(item.priority)}
                      </td>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                        {item.officer === 'unassigned' ? translate('unassigned') : getUserName(item.officer)}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {translate('review')}
                        </button>
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
                  .replace('{end}', Math.min(startIndex + itemsPerPage, filteredVerifications.length).toString())
                  .replace('{total}', filteredVerifications.length.toString())}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('totalRequestsCard')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{verifications.length}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('pendingCard')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {verifications.filter(v => v.status === 'pending').length}
              </p>
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
                {translate('underReviewCard')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {verifications.filter(v => v.status === 'under_review').length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('highPriorityCard')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {verifications.filter(v => v.priority === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <XCircleIcon className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}