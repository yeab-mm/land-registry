// app/officer/users/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export default function UsersPage() {
  const { darkMode } = useLanguage()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  // Translation helper function with Ethiopian months
  const translate = (key: string): string => {
    const translations: Record<string, { en: string; am: string }> = {
      // Page Header
      pageTitle: { en: 'User Management', am: 'የተጠቃሚዎች አስተዳደር' },
      totalUsers: { en: 'Total {count} users', am: 'በአጠቃላይ {count} ተጠቃሚዎች' },
      
      // Buttons
      filter: { en: 'Filter', am: 'አጣራ' },
      export: { en: 'Export', am: 'ላክ' },
      addNewUser: { en: 'Add New User', am: 'አዲስ ተጠቃሚ ጨምር' },
      viewDetails: { en: 'View Details', am: 'ዝርዝሮችን ተመልከት' },
      editUser: { en: 'Edit User', am: 'ተጠቃሚ አርትዕ' },
      deleteUser: { en: 'Delete User', am: 'ተጠቃሚ ሰርዝ' },
      activateUser: { en: 'Activate User', am: 'ተጠቃሚ አንቃ' },
      deactivateUser: { en: 'Deactivate User', am: 'ተጠቃሚ አጥፋ' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      
      // Search
      searchPlaceholder: { en: 'Search by name, email, or ID...', am: 'በስም፣ በኢሜይል ወይም በመታወቂያ ፈልግ...' },
      
      // Filter Dropdowns
      allRoles: { en: 'All Roles', am: 'ሁሉም ሚናዎች' },
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      
      // User Roles
      admin: { en: 'Admin', am: 'አስተዳዳሪ' },
      officer: { en: 'Officer', am: 'ኦፊሰር' },
      citizen: { en: 'Citizen', am: 'ዜጋ' },
      
      // User Status
      active: { en: 'Active', am: 'ንቁ' },
      inactive: { en: 'Inactive', am: 'ንቁ ያልሆነ' },
      suspended: { en: 'Suspended', am: 'ታግዷል' },
      pending: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      
      // Table Headers
      userId: { en: 'User ID', am: 'የተጠቃሚ መታወቂያ' },
      name: { en: 'Name', am: 'ስም' },
      email: { en: 'Email', am: 'ኢሜይል' },
      phone: { en: 'Phone', am: 'ስልክ' },
      role: { en: 'Role', am: 'ሚና' },
      kebeleId: { en: 'Kebele ID', am: 'ቀበሌ መታወቂያ' },
      joinedDate: { en: 'Joined Date', am: 'የተቀላቀሉበት ቀን' },
      status: { en: 'Status', am: 'ሁኔታ' },
      action: { en: 'Action', am: 'ድርጊት' },
      
      // User Details
      userDetails: { en: 'User Details', am: 'የተጠቃሚ ዝርዝሮች' },
      fullName: { en: 'Full Name', am: 'ሙሉ ስም' },
      phoneNumber: { en: 'Phone Number', am: 'ስልክ ቁጥር' },
      address: { en: 'Address', am: 'አድራሻ' },
      lastLogin: { en: 'Last Login', am: 'የመጨረሻ ግባት' },
      properties: { en: 'Properties', am: 'ንብረቶች' },
      transactions: { en: 'Transactions', am: 'ግብይቶች' },
      
      // Add User Modal
      addNewUserModal: { en: 'Add New User', am: 'አዲስ ተጠቃሚ ጨምር' },
      selectRole: { en: 'Select Role', am: 'ሚና ይምረጡ' },
      enterFullName: { en: 'Enter full name', am: 'ሙሉ ስም ያስገቡ' },
      enterEmail: { en: 'Enter email', am: 'ኢሜይል ያስገቡ' },
      enterPhone: { en: 'Enter phone number', am: 'ስልክ ቁጥር ያስገቡ' },
      enterKebeleId: { en: 'Enter Kebele ID', am: 'ቀበሌ መታወቂያ ያስገቡ' },
      enterAddress: { en: 'Enter address', am: 'አድራሻ ያስገቡ' },
      createUser: { en: 'Create User', am: 'ተጠቃሚ ፍጠር' },
      cancel: { en: 'Cancel', am: 'ሰርዝ' },
      
      // Summary Cards
      totalUsersCard: { en: 'Total Users', am: 'ጠቅላላ ተጠቃሚዎች' },
      activeUsers: { en: 'Active Users', am: 'ንቁ ተጠቃሚዎች' },
      pendingUsers: { en: 'Pending Approval', am: 'በመጠባበቅ ላይ' },
      officers: { en: 'Officers', am: 'ኦፊሰሮች' },
      
      // Empty State
      noUsers: { en: 'No users found', am: 'ምንም ተጠቃሚዎች አልተገኙም' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} results', am: '{start} እስከ {end} ከ {total} ውጤቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
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
    }
    return userNames[nameKey]?.[language] || nameKey
  }

  // Format date with Ethiopian month and year
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

  const users = [
    {
      id: 'USR-001',
      nameKey: 'abebe',
      email: 'abebe.kebede@email.com',
      phone: '+251 91 234 5678',
      role: 'admin',
      kebeleId: 'KB-123456',
      address: 'Kebele 01, Bahir Dar',
      addressAm: 'ቀበሌ 01፣ ባሕር ዳር',
      joinedDate: '2023-01-15',
      lastLogin: '2024-03-15 10:30 AM',
      status: 'active',
      properties: 0,
      transactions: 156
    },
    {
      id: 'USR-002',
      nameKey: 'tigist',
      email: 'tigist.haile@email.com',
      phone: '+251 92 345 6789',
      role: 'officer',
      kebeleId: 'KB-234567',
      address: 'Kebele 03, Bahir Dar',
      addressAm: 'ቀበሌ 03፣ ባሕር ዳር',
      joinedDate: '2023-02-20',
      lastLogin: '2024-03-15 09:15 AM',
      status: 'active',
      properties: 0,
      transactions: 89
    },
    {
      id: 'USR-003',
      nameKey: 'biruk',
      email: 'biruk.alemu@email.com',
      phone: '+251 93 456 7890',
      role: 'officer',
      kebeleId: 'KB-345678',
      address: 'Kebele 05, Bahir Dar',
      addressAm: 'ቀበሌ 05፣ ባሕር ዳር',
      joinedDate: '2023-03-10',
      lastLogin: '2024-03-14 04:30 PM',
      status: 'active',
      properties: 0,
      transactions: 67
    },
    {
      id: 'USR-004',
      nameKey: 'meron',
      email: 'meron.tadesse@email.com',
      phone: '+251 94 567 8901',
      role: 'citizen',
      kebeleId: 'KB-456789',
      address: 'Kebele 02, Bahir Dar',
      addressAm: 'ቀበሌ 02፣ ባሕር ዳር',
      joinedDate: '2023-04-05',
      lastLogin: '2024-03-13 02:45 PM',
      status: 'active',
      properties: 2,
      transactions: 12
    },
    {
      id: 'USR-005',
      nameKey: 'alemitu',
      email: 'alemitu.bekele@email.com',
      phone: '+251 95 678 9012',
      role: 'citizen',
      kebeleId: 'KB-567890',
      address: 'Kebele 04, Bahir Dar',
      addressAm: 'ቀበሌ 04፣ ባሕር ዳር',
      joinedDate: '2023-05-12',
      lastLogin: '2024-03-12 11:20 AM',
      status: 'active',
      properties: 1,
      transactions: 8
    },
    {
      id: 'USR-006',
      nameKey: 'tekle',
      email: 'tekle.berhan@email.com',
      phone: '+251 96 789 0123',
      role: 'citizen',
      kebeleId: 'KB-678901',
      address: 'Kebele 06, Bahir Dar',
      addressAm: 'ቀበሌ 06፣ ባሕር ዳር',
      joinedDate: '2023-06-18',
      lastLogin: '2024-03-11 03:10 PM',
      status: 'inactive',
      properties: 0,
      transactions: 3
    },
    {
      id: 'USR-007',
      nameKey: 'senait',
      email: 'senait.gebre@email.com',
      phone: '+251 97 890 1234',
      role: 'citizen',
      kebeleId: 'KB-789012',
      address: 'Kebele 07, Bahir Dar',
      addressAm: 'ቀበሌ 07፣ ባሕር ዳር',
      joinedDate: '2023-07-22',
      lastLogin: '2024-03-10 10:00 AM',
      status: 'pending',
      properties: 0,
      transactions: 0
    },
    {
      id: 'USR-008',
      nameKey: 'mulugeta',
      email: 'mulugeta.ayele@email.com',
      phone: '+251 98 901 2345',
      role: 'citizen',
      kebeleId: 'KB-890123',
      address: 'Kebele 08, Bahir Dar',
      addressAm: 'ቀበሌ 08፣ ባሕር ዳር',
      joinedDate: '2023-08-30',
      lastLogin: '2024-03-09 01:30 PM',
      status: 'suspended',
      properties: 1,
      transactions: 5
    },
  ]

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { color: string; text: string }> = {
      admin: { color: 'purple', text: translate('admin') },
      officer: { color: 'blue', text: translate('officer') },
      citizen: { color: 'green', text: translate('citizen') },
    }
    
    const config = roleConfig[role]
    if (!config) return <span>{role}</span>
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; text: string }> = {
      active: { 
        color: 'green', 
        icon: CheckCircleIcon,
        text: translate('active')
      },
      inactive: { 
        color: 'gray', 
        icon: XCircleIcon,
        text: translate('inactive')
      },
      suspended: { 
        color: 'red', 
        icon: XCircleIcon,
        text: translate('suspended')
      },
      pending: { 
        color: 'yellow', 
        icon: ClockIcon,
        text: translate('pending')
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

  const filteredUsers = users.filter(item => {
    const name = getUserName(item.nameKey).toLowerCase()
    const searchLower = searchQuery.toLowerCase()
    
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchLower) ||
      name.includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.kebeleId.toLowerCase().includes(searchLower)
    
    const matchesRole = filterRole === 'all' || item.role === filterRole
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate summary stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const pendingUsers = users.filter(u => u.status === 'pending').length
  const totalOfficers = users.filter(u => u.role === 'officer').length

  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  // Add User Modal
  const AddUserModal = () => {
    if (!showAddModal) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${cn('text-white', 'text-gray-900')} text-xl font-bold`}>
                {translate('addNewUserModal')}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className={`${cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')}`}
              >
                ✕
              </button>
            </div>
            
            {/* Form */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('fullName')} *
                </label>
                <input
                  type="text"
                  placeholder={translate('enterFullName')}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              
              {/* Email */}
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  Email *
                </label>
                <input
                  type="email"
                  placeholder={translate('enterEmail')}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              
              {/* Phone */}
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('phoneNumber')} *
                </label>
                <input
                  type="tel"
                  placeholder={translate('enterPhone')}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              
              {/* Kebele ID */}
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('kebeleId')} *
                </label>
                <input
                  type="text"
                  placeholder={translate('enterKebeleId')}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              
              {/* Address */}
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('address')}
                </label>
                <input
                  type="text"
                  placeholder={translate('enterAddress')}
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              
              {/* Role */}
              <div>
                <label className={`${cn('text-gray-300', 'text-gray-700')} text-sm font-medium block mb-2`}>
                  {translate('role')} *
                </label>
                <select
                  className={`w-full px-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  <option value="">{translate('selectRole')}</option>
                  <option value="admin">{translate('admin')}</option>
                  <option value="officer">{translate('officer')}</option>
                  <option value="citizen">{translate('citizen')}</option>
                </select>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className={`px-4 py-2 ${cn('bg-gray-700 hover:bg-gray-600', 'bg-gray-200 hover:bg-gray-300')} rounded-lg transition-colors`}
              >
                {translate('cancel')}
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {translate('createUser')}
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
            {translate('totalUsers').replace('{count}', filteredUsers.length.toString())}
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
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            {translate('addNewUser')}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('totalUsersCard')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{totalUsers}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${cn('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('activeUsers')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{activeUsers}</p>
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
                {translate('pendingUsers')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{pendingUsers}</p>
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
                {translate('officers')}
              </p>
              <p className={`${cn('text-white', 'text-gray-900')} text-2xl font-bold`}>{totalOfficers}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <UserIcon className="w-6 h-6 text-purple-500" />
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
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-lg text-sm ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="all">{translate('allRoles')}</option>
            <option value="admin">{translate('admin')}</option>
            <option value="officer">{translate('officer')}</option>
            <option value="citizen">{translate('citizen')}</option>
          </select>

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
            <option value="active">{translate('active')}</option>
            <option value="inactive">{translate('inactive')}</option>
            <option value="pending">{translate('pending')}</option>
            <option value="suspended">{translate('suspended')}</option>
          </select>

          {(filterRole !== 'all' || filterStatus !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setFilterRole('all')
                setFilterStatus('all')
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

      {/* Users Table */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserGroupIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className={`${cn('text-gray-300', 'text-gray-600')}`}>
              {translate('noUsers')}
            </p>
            <button
              onClick={() => {
                setFilterRole('all')
                setFilterStatus('all')
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
                      {translate('userId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('name')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('email')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('phone')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('role')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('kebeleId')}
                    </th>
                    <th className={`${cn('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                      {translate('joinedDate')}
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
                  {paginatedUsers.map((item) => (
                    <tr key={item.id} className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors`}>
                      <td className={`${cn('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm font-medium`}>
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-white', 'text-gray-900')} text-sm`}>
                            {getUserName(item.nameKey)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-gray-300', 'text-gray-700')} text-sm`}>
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-gray-300', 'text-gray-700')} text-sm`}>
                            {item.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(item.role)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <IdentificationIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-gray-300', 'text-gray-700')} text-sm`}>
                            {item.kebeleId}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className={`${cn('text-gray-300', 'text-gray-700')} text-sm`}>
                            {formatDate(item.joinedDate)}
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
                          <button
                            className="text-green-500 hover:text-green-400"
                            title={translate('editUser')}
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-400"
                            title={translate('deleteUser')}
                          >
                            <TrashIcon className="w-5 h-5" />
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
                  .replace('{end}', Math.min(startIndex + itemsPerPage, filteredUsers.length).toString())
                  .replace('{total}', filteredUsers.length.toString())}
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

      {/* Add User Modal */}
      <AddUserModal />
    </div>
  )
}