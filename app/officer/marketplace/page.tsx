// app/officer/marketplace/page.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  Squares2X2Icon,
  ListBulletIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface LandListing {
  id: string
  title: string
  titleAm: string
  description: string
  descriptionAm: string
  type: string
  price: number
  area: string
  kebele: string
  areaName: string
  seller: string
  sellerContact: string
  postedDate: string
  views: number
  status: string
  images: number
  features: string[]
  documents: string[]
  documentCount: number
  rating?: number
  reviews?: number
  ownerEn?: string
  ownerAm?: string
}

export default function MarketplacePage() {
  const { darkMode } = useLanguage()
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedListing, setSelectedListing] = useState<LandListing | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Simple dark mode class helper
  const getThemeClass = (darkClass: string, lightClass: string) => {
    return darkMode ? darkClass : lightClass
  }

  // Translation helper function
  const translate = (key: string): string => {
    const translations: Record<string, { en: string; am: string }> = {
      // Page Header
      pageTitle: { en: 'Land Marketplace - Bahir Dar', am: 'የመሬት ገበያ ቦታ - ባሕር ዳር' },
      totalListings: { en: 'Total {count} active listings in Bahir Dar', am: 'በአጠቃላይ {count} ንቁ ዝርዝሮች በባሕር ዳር' },
      
      // Buttons
      filter: { en: 'Filter', am: 'አጣራ' },
      export: { en: 'Export', am: 'ላክ' },
      addNew: { en: 'Add New Listing', am: 'አዲስ ዝርዝር ጨምር' },
      viewDetails: { en: 'View Details', am: 'ዝርዝሮችን ተመልከት' },
      approve: { en: 'Approve', am: 'አጽድቅ' },
      reject: { en: 'Reject', am: 'ውድቅ አድርግ' },
      clearFilters: { en: 'Clear Filters', am: 'ማጣሪያዎችን አጽዳ' },
      close: { en: 'Close', am: 'ዝጋ' },
      contactOwner: { en: 'Contact Owner', am: 'ከባለቤት ጋር ይገናኙ' },
      
      // Search
      searchPlaceholder: { en: 'Search by title, location, or seller...', am: 'በርዕስ፣ በአካባቢ ወይም በሻጭ ስም ፈልግ...' },
      
      // View Modes
      gridView: { en: 'Grid View', am: 'ፍርግርግ እይታ' },
      listView: { en: 'List View', am: 'ዝርዝር እይታ' },
      
      // Filter Dropdowns
      allTypes: { en: 'All Types', am: 'ሁሉም አይነቶች' },
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      
      // Property Types
      residential: { en: 'Residential', am: 'መኖሪያ' },
      commercial: { en: 'Commercial', am: 'ንግድ' },
      agricultural: { en: 'Agricultural', am: 'እርሻ' },
      mixedUse: { en: 'Mixed Use', am: 'ድብልቅ' },
      industrial: { en: 'Industrial', am: 'ኢንዱስትሪ' },
      
      // Status
      pending: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      approved: { en: 'Approved', am: 'ጸድቋል' },
      rejected: { en: 'Rejected', am: 'ውድቅ ተደርጓል' },
      sold: { en: 'Sold', am: 'ተሽጧል' },
      
      // Listing Cards
      priceLabel: { en: 'Price', am: 'ዋጋ' },
      locationLabel: { en: 'Location', am: 'አካባቢ' },
      area: { en: 'Area', am: 'ስፋት' },
      seller: { en: 'Seller', am: 'ሻጭ' },
      posted: { en: 'Posted', am: 'የተለጠፈበት' },
      views: { en: 'views', am: 'እይታዎች' },
      photos: { en: 'photos', am: 'ፎቶዎች' },
      
      // Table Headers (List View)
      listingId: { en: 'Listing ID', am: 'የዝርዝር መታወቂያ' },
      property: { en: 'Property', am: 'ንብረት' },
      type: { en: 'Type', am: 'አይነት' },
      priceHeader: { en: 'Price', am: 'ዋጋ' },
      locationHeader: { en: 'Location', am: 'አካባቢ' },
      statusHeader: { en: 'Status', am: 'ሁኔታ' },
      actionHeader: { en: 'Action', am: 'ድርጊት' },
      
      // Document Types
      titleDeed: { en: 'Title Deed', am: 'የባለቤትነት ሰነድ' },
      surveyPlan: { en: 'Survey Plan', am: 'የቅየሳ ንድፍ' },
      taxClearance: { en: 'Tax Clearance', am: 'የግብር ክፍያ' },
      
      // Features
      waterAccess: { en: 'Water Access', am: 'የውሃ አቅርቦት' },
      electricity: { en: 'Electricity', am: 'ኤሌክትሪክ' },
      roadAccess: { en: 'Road Access', am: 'የመንገድ አቅርቦት' },
      fence: { en: 'Fenced', am: 'አጥር ያለው' },
      lakeView: { en: 'Lake View', am: 'የሐይቅ እይታ' },
      
      // Modal Sections
      description: { en: 'Description', am: 'መግለጫ' },
      features: { en: 'Features', am: 'ገጽታዎች' },
      documents: { en: 'Documents', am: 'ሰነዶች' },
      ownerInformation: { en: 'Owner Information', am: 'የባለቤት መረጃ' },
      verifiedOwner: { en: 'Verified Owner', am: 'የተረጋገጠ ባለቤት' },
      contactInfo: { en: 'Contact Information', am: 'የመገኛ መረጃ' },
      
      // Empty State
      noListings: { en: 'No listings found in Bahir Dar', am: 'በባሕር ዳር ምንም ዝርዝሮች አልተገኙም' },
      
      // Pagination
      showing: { en: 'Showing {start} to {end} of {total} results', am: '{start} እስከ {end} ከ {total} ውጤቶች እየታየ ነው' },
      previous: { en: 'Previous', am: 'ቀዳሚ' },
      next: { en: 'Next', am: 'ቀጣይ' },
      
      // Summary Cards
      totalListingsCard: { en: 'Total Listings', am: 'ጠቅላላ ዝርዝሮች' },
      pendingApproval: { en: 'Pending Approval', am: 'ማጽደቅ ይጠብቃል' },
      activeListings: { en: 'Active Listings', am: 'ንቁ ዝርዝሮች' },
      totalValue: { en: 'Total Value', am: 'ጠቅላላ ዋጋ' },
      
      // Location Terms - Bahir Dar Specific
      bahirDar: { en: 'Bahir Dar', am: 'ባሕር ዳር' },
      kebele: { en: 'Kebele', am: 'ቀበሌ' },
      woreda: { en: 'Woreda', am: 'ወረዳ' },
      tana: { en: 'Lake Tana', am: 'ጣና ሐይቅ' },
      tanaPort: { en: 'Lake Tana Port', am: 'የጣና ሐይቅ ወደብ' },
      bezawit: { en: 'Bezawit', am: 'ቤዛዊት' },
      bezawitPalace: { en: 'Bezawit Palace', am: 'ቤዛዊት ቤተመንግስት' },
      piazza: { en: 'Piazza', am: 'ፒያሳ' },
      stadium: { en: 'Bahir Dar Stadium', am: 'ባሕር ዳር ስታዲየም' },
      university: { en: 'Bahir Dar University', am: 'ባሕር ዳር ዩኒቨርሲቲ' },
      polytechnic: { en: 'Bahir Dar Polytechnic', am: 'ባሕር ዳር ፖሊቴክኒክ' },
      abay: { en: 'Abay River', am: 'አባይ ወንዝ' },
      tisAbay: { en: 'Tis Abay', am: 'ጥስ አባይ' },
      delmena: { en: 'Delmena', am: 'ደልመና' },
      
      // Image related
      propertyImage: { en: 'Property Image', am: 'የንብረት ምስል' },
      noImage: { en: 'No Image', am: 'ምስል የለም' },
    }
    
    return translations[key]?.[language] || key
  }

  // User names with Amharic translations (Bahir Dar specific)
  const getUserName = (nameKey: string): string => {
    const userNames: Record<string, { en: string; am: string }> = {
      tekle: { en: 'Tekle Berhan', am: 'ተክሌ ብርሃን' },
      senait: { en: 'Senait Gebre', am: 'ሰናይት ገብረ' },
      mulugeta: { en: 'Mulugeta Ayele', am: 'ሙሉጌታ አየለ' },
      azeb: { en: 'Azeb Hailu', am: 'አዜብ ኃይሉ' },
      alemitu: { en: 'Alemitu Bekele', am: 'አለሚቱ በቀለ' },
      getachew: { en: 'Getachew Tesfaye', am: 'ጌታቸው ተስፋዬ' },
      tsion: { en: 'Tsion Wondimu', am: 'ጽዮን ወንድሙ' },
      hailu: { en: 'Hailu Girmay', am: 'ኃይሉ ግርማይ' },
      abebech: { en: 'Abebech Ayele', am: 'አበበች አየለ' },
      kassa: { en: 'Kassa Wondimu', am: 'ካሳ ወንድሙ' },
      mekdes: { en: 'Mekdes Tesfaye', am: 'መቅደስ ተስፋዬ' },
      yonas: { en: 'Yonas Desta', am: 'ዮናስ ደስታ' },
    }
    return userNames[nameKey]?.[language] || nameKey
  }

  // Bahir Dar specific kebeles and areas
  const bahirDarKebeles = [
    { num: '01', name: { en: 'Kebele 01 - Tana Port', am: 'ቀበሌ 1 - የጣና ወደብ' } },
    { num: '02', name: { en: 'Kebele 02 - Bezawit', am: 'ቀበሌ 2 - ቤዛዊት' } },
    { num: '03', name: { en: 'Kebele 03 - Polytechnic', am: 'ቀበሌ 3 - ፖሊቴክኒክ' } },
    { num: '04', name: { en: 'Kebele 04 - University', am: 'ቀበሌ 4 - ዩኒቨርሲቲ' } },
    { num: '05', name: { en: 'Kebele 05 - Stadium', am: 'ቀበሌ 5 - ስታዲየም' } },
    { num: '06', name: { en: 'Kebele 06 - Piazza', am: 'ቀበሌ 6 - ፒያሳ' } },
    { num: '07', name: { en: 'Kebele 07 - Abay', am: 'ቀበሌ 7 - አባይ' } },
    { num: '08', name: { en: 'Kebele 08 - Tis Abay', am: 'ቀበሌ 8 - ጥስ አባይ' } },
    { num: '09', name: { en: 'Kebele 09 - Delmena', am: 'ቀበሌ 9 - ደልመና' } },
    { num: '10', name: { en: 'Kebele 10 - Tana', am: 'ቀበሌ 10 - ጣና' } },
    { num: '11', name: { en: 'Kebele 11 - Abay Mado', am: 'ቀበሌ 11 - አባይ ማዶ' } },
  ]

  // Format location with Amharic translation - Bahir Dar specific
  const formatLocation = (kebele: string, area: string): string => {
    const kebeleInfo = bahirDarKebeles.find(k => k.num === kebele)
    
    if (language === 'am') {
      return `${translate('bahirDar')}፣ ${kebeleInfo?.name.am || `ቀበሌ ${kebele}`}`
    }
    return `Bahir Dar, ${kebeleInfo?.name.en || `Kebele ${kebele}`}`
  }

  // Format price with currency
  const formatPrice = (price: number): string => {
    if (language === 'am') {
      return `ብር ${price.toLocaleString()}`
    }
    return `ETB ${price.toLocaleString()}`
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

  // Get image source based on property type - Using reliable Unsplash images
  const getPropertyImage = (type: string, index: number = 0): string => {
    // Using Unsplash images that will definitely load
    const images: Record<string, string[]> = {
      residential: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format',
      ],
      commercial: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format',
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&auto=format',
      ],
      agricultural: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format',
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=500&auto=format',
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&auto=format',
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format',
      ],
      mixedUse: [
        'https://images.unsplash.com/photo-1448630360428-65456885c650?w=500&auto=format',
        'https://images.unsplash.com/photo-1431576901776-5390279479e2?w=500&auto=format',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format',
      ],
      industrial: [
        'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=500&auto=format',
        'https://images.unsplash.com/photo-1581092335871-4c7ff2f8321f?w=500&auto=format',
        'https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=500&auto=format',
      ],
      lakeView: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format',
        'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=500&auto=format',
      ],
      default: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format'
      ]
    }
    
    const typeImages = images[type] || images.default
    return typeImages[index % typeImages.length]
  }

  // Get multiple images for a listing (simulated)
  const getListingImages = (type: string, count: number): string[] => {
    const images: string[] = []
    for (let i = 0; i < count; i++) {
      images.push(getPropertyImage(type, i))
    }
    return images
  }

  // All listings are in Bahir Dar only
  const listings: LandListing[] = [
    {
      id: 'BD-2024-001',
      title: 'Residential Land - Tana Port Area',
      titleAm: 'የመኖሪያ መሬት - የጣና ወደብ አካባቢ',
      description: 'Beautiful residential plot near Lake Tana Port. Quiet neighborhood with stunning lake views. Perfect for building a family home with easy access to amenities.',
      descriptionAm: 'ከጣና ሐይቅ ወደብ አቅራቢያ ውብ የመኖሪያ መሬት። ጸጥታ የሰፈነበት አካባቢ አስደናቂ የሐይቅ እይታ ያለው። ለቤተሰብ መኖሪያ ቤት መገንባት በጣም ምቹ።',
      type: 'residential',
      price: 4500000,
      area: '350 sqm',
      kebele: '01',
      areaName: 'Tana Port',
      seller: 'tekle',
      sellerContact: '0912345678',
      postedDate: '2024-03-15',
      views: 234,
      status: 'approved',
      images: 3,
      features: ['waterAccess', 'electricity', 'roadAccess', 'lakeView'],
      documents: ['titleDeed', 'surveyPlan', 'taxClearance'],
      documentCount: 3,
      rating: 4.8,
      reviews: 24,
      ownerEn: 'Tekle Berhan',
      ownerAm: 'ተክሌ ብርሃን'
    },
    {
      id: 'BD-2024-002',
      title: 'Residential Land - Bezawit Area',
      titleAm: 'የመኖሪያ መሬት - ቤዛዊት አካባቢ',
      description: 'Luxury residential plot in Bezawit area near the palace. High-end neighborhood with beautiful views and secure environment.',
      descriptionAm: 'በቤዛዊት አካባቢ ከቤተመንግስት አቅራቢያ የቅንጦት የመኖሪያ መሬት። ከፍተኛ ደረጃ ሰፈር ውብ እይታዎች እና ደህንነቱ የተጠበቀ አካባቢ።',
      type: 'residential',
      price: 7200000,
      area: '500 sqm',
      kebele: '02',
      areaName: 'Bezawit',
      seller: 'alemitu',
      sellerContact: '0956789012',
      postedDate: '2024-03-11',
      views: 203,
      status: 'approved',
      images: 3,
      features: ['electricity', 'roadAccess', 'waterAccess', 'lakeView'],
      documents: ['titleDeed', 'surveyPlan', 'taxClearance'],
      documentCount: 3,
      rating: 4.9,
      reviews: 36,
      ownerEn: 'Alemitu Bekele',
      ownerAm: 'አለሚቱ በቀለ'
    },
    {
      id: 'BD-2024-003',
      title: 'Commercial Land - Polytechnic Area',
      titleAm: 'የንግድ መሬት - ፖሊቴክኒክ አካባቢ',
      description: 'Prime commercial location near Bahir Dar Polytechnic. High traffic area, perfect for business, retail, or office space.',
      descriptionAm: 'በባሕር ዳር ፖሊቴክኒክ አቅራቢያ ፕሪም የንግድ ቦታ። ከፍተኛ የሰው ፍሰት አካባቢ፣ ለንግድ፣ ችርቻሮ ወይም ቢሮ ቦታ በጣም ምቹ።',
      type: 'commercial',
      price: 5800000,
      area: '280 sqm',
      kebele: '03',
      areaName: 'Polytechnic',
      seller: 'senait',
      sellerContact: '0923456789',
      postedDate: '2024-03-14',
      views: 156,
      status: 'approved',
      images: 2,
      features: ['electricity', 'roadAccess', 'waterAccess'],
      documents: ['titleDeed', 'surveyPlan'],
      documentCount: 2,
      rating: 4.7,
      reviews: 18,
      ownerEn: 'Senait Gebre',
      ownerAm: 'ሰናይት ገብረ'
    },
    {
      id: 'BD-2024-004',
      title: 'Residential Land - University Area',
      titleAm: 'የመኖሪያ መሬት - ዩኒቨርሲቲ አካባቢ',
      description: 'Residential plot near Bahir Dar University. Ideal for student housing or family home with easy access to campus.',
      descriptionAm: 'በባሕር ዳር ዩኒቨርሲቲ አቅራቢያ የመኖሪያ መሬት። ለተማሪ መኖሪያ ቤቶች ወይም ለቤተሰብ መኖሪያ ቤት ከካምፓስ ቀላል መዳረሻ ጋር በጣም ምቹ።',
      type: 'residential',
      price: 3800000,
      area: '320 sqm',
      kebele: '04',
      areaName: 'University',
      seller: 'azeb',
      sellerContact: '0945678901',
      postedDate: '2024-03-12',
      views: 145,
      status: 'approved',
      images: 2,
      features: ['electricity', 'roadAccess', 'waterAccess'],
      documents: ['titleDeed', 'surveyPlan'],
      documentCount: 2,
      rating: 4.6,
      reviews: 12,
      ownerEn: 'Azeb Hailu',
      ownerAm: 'አዜብ ኃይሉ'
    },
    {
      id: 'BD-2024-005',
      title: 'Commercial Land - Stadium Area',
      titleAm: 'የንግድ መሬት - ስታዲየም አካባቢ',
      description: 'Commercial plot near Bahir Dar Stadium. High traffic on event days, perfect for restaurant, cafe, or retail.',
      descriptionAm: 'በባሕር ዳር ስታዲየም አቅራቢያ የንግድ መሬት። በዝግጅት ቀናት ከፍተኛ የሰው ፍሰት፣ ለሬስቶራንት፣ ካፌ ወይም ችርቻሮ በጣም ምቹ።',
      type: 'commercial',
      price: 8200000,
      area: '400 sqm',
      kebele: '05',
      areaName: 'Stadium',
      seller: 'getachew',
      sellerContact: '0967890123',
      postedDate: '2024-03-10',
      views: 178,
      status: 'pending',
      images: 2,
      features: ['electricity', 'roadAccess'],
      documents: ['titleDeed', 'surveyPlan'],
      documentCount: 2,
      rating: 4.5,
      reviews: 8,
      ownerEn: 'Getachew Tesfaye',
      ownerAm: 'ጌታቸው ተስፋዬ'
    },
    {
      id: 'BD-2024-006',
      title: 'Commercial Land - Piazza',
      titleAm: 'የንግድ መሬት - ፒያሳ',
      description: 'Commercial property in the heart of Piazza. High foot traffic, ideal for retail, restaurant, or office space in the city center.',
      descriptionAm: 'በፒያሳ እምብርት የንግድ መሬት። ከፍተኛ የእግረኛ ፍሰት፣ ለችርቻሮ፣ ሬስቶራንት ወይም ቢሮ ቦታ በከተማ መሀል በጣም ምቹ።',
      type: 'commercial',
      price: 9500000,
      area: '350 sqm',
      kebele: '06',
      areaName: 'Piazza',
      seller: 'tsion',
      sellerContact: '0978901234',
      postedDate: '2024-03-09',
      views: 267,
      status: 'approved',
      images: 2,
      features: ['electricity', 'roadAccess'],
      documents: ['titleDeed', 'surveyPlan'],
      documentCount: 2,
      rating: 4.9,
      reviews: 31,
      ownerEn: 'Tsion Wondimu',
      ownerAm: 'ጽዮን ወንድሙ'
    },
    {
      id: 'BD-2024-007',
      title: 'Agricultural Land - Abay River Area',
      titleAm: 'የእርሻ መሬት - አባይ ወንዝ አካባቢ',
      description: 'Fertile agricultural land near Abay River. Perfect for farming with irrigation access. Rich soil ideal for various crops.',
      descriptionAm: 'ከአባይ ወንዝ አቅራቢያ ለም የእርሻ መሬት። በመስኖ አቅርቦት ለእርሻ በጣም ምቹ። ለተለያዩ ሰብሎች የሚሆን ለም አፈር።',
      type: 'agricultural',
      price: 6800000,
      area: '1.5 hectares',
      kebele: '07',
      areaName: 'Abay',
      seller: 'hailu',
      sellerContact: '0989012345',
      postedDate: '2024-03-08',
      views: 98,
      status: 'pending',
      images: 3,
      features: ['waterAccess', 'roadAccess', 'fence'],
      documents: ['titleDeed', 'surveyPlan', 'taxClearance'],
      documentCount: 3,
      rating: 4.7,
      reviews: 14,
      ownerEn: 'Hailu Girmay',
      ownerAm: 'ኃይሉ ግርማይ'
    },
    {
      id: 'BD-2024-008',
      title: 'Agricultural Land - Tis Abay',
      titleAm: 'የእርሻ መሬት - ጥስ አባይ',
      description: 'Large agricultural land near Tis Abay Falls. Fertile soil with natural water sources. Perfect for commercial farming.',
      descriptionAm: 'ከጥስ አባይ ፏፏቴ አቅራቢያ ሰፊ የእርሻ መሬት። ለም አፈር ከተፈጥሮ ውሃ ምንጮች ጋር። ለንግድ እርሻ በጣም ምቹ።',
      type: 'agricultural',
      price: 11200000,
      area: '2.5 hectares',
      kebele: '08',
      areaName: 'Tis Abay',
      seller: 'yonas',
      sellerContact: '0990123456',
      postedDate: '2024-03-07',
      views: 112,
      status: 'approved',
      images: 3,
      features: ['waterAccess', 'roadAccess', 'fence'],
      documents: ['titleDeed', 'surveyPlan', 'taxClearance'],
      documentCount: 3,
      rating: 4.8,
      reviews: 22,
      ownerEn: 'Yonas Desta',
      ownerAm: 'ዮናስ ደስታ'
    },
    {
      id: 'BD-2024-009',
      title: 'Residential Land - Delmena',
      titleAm: 'የመኖሪያ መሬት - ደልመና',
      description: 'Peaceful residential plot in Delmena area. Good for family home away from the city noise.',
      descriptionAm: 'በደልመና አካባቢ ሰላማዊ የመኖሪያ መሬት። ከከተማ ጫጫታ ርቆ ለቤተሰብ መኖሪያ ቤት በጣም ምቹ።',
      type: 'residential',
      price: 3200000,
      area: '300 sqm',
      kebele: '09',
      areaName: 'Delmena',
      seller: 'abebech',
      sellerContact: '0911234567',
      postedDate: '2024-03-06',
      views: 87,
      status: 'approved',
      images: 2,
      features: ['electricity', 'roadAccess'],
      documents: ['titleDeed', 'surveyPlan'],
      documentCount: 2,
      rating: 4.5,
      reviews: 7,
      ownerEn: 'Abebech Ayele',
      ownerAm: 'አበበች አየለ'
    },
    {
      id: 'BD-2024-010',
      title: 'Lake Front Property - Tana',
      titleAm: 'የሐይቅ ዳርቻ ንብረት - ጣና',
      description: 'Beautiful lake front property with direct access to Lake Tana. Perfect for resort, hotel, or luxury villa development.',
      descriptionAm: 'ቀጥታ የጣና ሐይቅ አቅርቦት ያለው ውብ የሐይቅ ዳርቻ ንብረት። ለሪዞርት፣ ሆቴል ወይም የቅንጦት ቪላ ልማት በጣም ምቹ።',
      type: 'mixedUse',
      price: 18500000,
      area: '800 sqm',
      kebele: '10',
      areaName: 'Tana',
      seller: 'mekdes',
      sellerContact: '0922123456',
      postedDate: '2024-03-05',
      views: 312,
      status: 'pending',
      images: 4,
      features: ['waterAccess', 'electricity', 'roadAccess', 'lakeView'],
      documents: ['titleDeed', 'surveyPlan', 'taxClearance'],
      documentCount: 3,
      rating: 5.0,
      reviews: 8,
      ownerEn: 'Mekdes Tesfaye',
      ownerAm: 'መቅደስ ተስፋዬ'
    },
    {
      id: 'BD-2024-011',
      title: 'Industrial Land - Abay Mado',
      titleAm: 'የኢንዱስትሪ መሬት - አባይ ማዶ',
      description: 'Industrial plot in Abay Mado area. Suitable for warehouse, factory, or light manufacturing with good road access.',
      descriptionAm: 'በአባይ ማዶ አካባቢ የኢንዱስትሪ መሬት። ለመጋዘን፣ ፋብሪካ ወይም ቀላል ማምረቻ ከጥሩ የመንገድ አቅርቦት ጋር በጣም ምቹ።',
      type: 'industrial',
      price: 15600000,
      area: '1800 sqm',
      kebele: '11',
      areaName: 'Abay Mado',
      seller: 'kassa',
      sellerContact: '0933123456',
      postedDate: '2024-03-04',
      views: 76,
      status: 'approved',
      images: 2,
      features: ['electricity', 'roadAccess', 'waterAccess'],
      documents: ['titleDeed', 'surveyPlan', 'taxClearance'],
      documentCount: 3,
      rating: 4.6,
      reviews: 11,
      ownerEn: 'Kassa Wondimu',
      ownerAm: 'ካሳ ወንድሙ'
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; text: string }> = {
      pending: { 
        color: 'yellow', 
        icon: ClockIcon,
        text: translate('pending')
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
      sold: { 
        color: 'gray', 
        icon: XCircleIcon,
        text: translate('sold')
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
      residential: { color: 'blue', text: translate('residential') },
      commercial: { color: 'green', text: translate('commercial') },
      agricultural: { color: 'yellow', text: translate('agricultural') },
      mixedUse: { color: 'purple', text: translate('mixedUse') },
      industrial: { color: 'gray', text: translate('industrial') },
    }
    
    const config = typeConfig[type]
    if (!config) return <span>{type}</span>
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
        {config.text}
      </span>
    )
  }

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const openListingModal = (listing: LandListing) => {
    setSelectedListing(listing)
    setCurrentImageIndex(0)
    setShowModal(true)
  }

  const filteredListings = listings.filter(item => {
    const title = language === 'am' ? item.titleAm : item.title
    const sellerName = getUserName(item.seller).toLowerCase()
    const searchLower = searchQuery.toLowerCase()
    
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchLower) ||
      title.toLowerCase().includes(searchLower) ||
      sellerName.includes(searchLower) ||
      item.kebele.includes(searchQuery) ||
      item.areaName.toLowerCase().includes(searchLower)
    
    const matchesType = filterType === 'all' || item.type === filterType
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const itemsPerPage = viewMode === 'grid' ? 6 : 5
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage)

  // Listing Detail Modal
  const ListingModal = () => {
    if (!selectedListing || !showModal) return null

    const images = getListingImages(selectedListing.type, selectedListing.images)

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Gallery */}
            <div className="relative h-96 bg-gray-100">
              <img
                src={images[currentImageIndex]}
                alt={language === 'am' ? selectedListing.titleAm : selectedListing.title}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title and Rating */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'am' ? selectedListing.titleAm : selectedListing.title}
                </h2>
                {selectedListing.rating && (
                  <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <StarIconSolid className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-semibold">{selectedListing.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({selectedListing.reviews})</span>
                  </div>
                )}
              </div>

              {/* Location and Price */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-5 h-5 mr-2 text-green-600" />
                  {formatLocation(selectedListing.kebele, selectedListing.areaName)}
                </div>
                <div className="flex items-center text-gray-600">
                  <BuildingStorefrontIcon className="w-5 h-5 mr-2 text-green-600" />
                  {selectedListing.area}
                </div>
                <div className="flex items-center text-2xl font-bold text-green-600 col-span-2">
                  <CurrencyDollarIcon className="w-6 h-6 mr-2" />
                  {formatPrice(selectedListing.price)}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                {getStatusBadge(selectedListing.status)}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{translate('description')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'am' ? selectedListing.descriptionAm : selectedListing.description}
                </p>
              </div>

              {/* Features */}
              {selectedListing.features && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{translate('features')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {translate(feature)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {selectedListing.documents && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{translate('documents')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                      >
                        <DocumentTextIcon className="w-3 h-3 mr-1" />
                        {translate(doc)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{translate('ownerInformation')}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">
                        {getUserName(selectedListing.seller)}
                      </p>
                      <p className="text-sm text-gray-500">{translate('verifiedOwner')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      {translate('contactOwner')}
                    </button>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2 text-green-600" />
                    {selectedListing.sellerContact}
                  </p>
                </div>
              </div>

              {/* Views and Date */}
              <div className="mt-4 text-sm text-gray-500 flex items-center justify-end">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {translate('posted')}: {formatDate(selectedListing.postedDate)}
                <span className="mx-2">•</span>
                <EyeIcon className="w-4 h-4 mr-1" />
                {selectedListing.views} {translate('views')}
              </div>
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
          <h2 className={`${getThemeClass('text-white', 'text-gray-900')} text-2xl font-bold`}>
            {translate('pageTitle')}
          </h2>
          <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} mt-1`}>
            {translate('totalListings').replace('{count}', filteredListings.length.toString())}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className={`${getThemeClass('bg-gray-700 hover:bg-gray-600', 'bg-white hover:bg-gray-50 border border-gray-300')} px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center`}>
            <FunnelIcon className="w-4 h-4 mr-2" />
            {translate('filter')}
          </button>
          <button className={`${getThemeClass('bg-gray-700 hover:bg-gray-600', 'bg-white hover:bg-gray-50 border border-gray-300')} px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center`}>
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            {translate('export')}
          </button>
          
        </div>
      </div>

      {/* Filters */}
      <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg shadow-lg p-4`}>
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
            <option value="residential">{translate('residential')}</option>
            <option value="commercial">{translate('commercial')}</option>
            <option value="agricultural">{translate('agricultural')}</option>
            <option value="mixedUse">{translate('mixedUse')}</option>
            <option value="industrial">{translate('industrial')}</option>
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
            <option value="pending">{translate('pending')}</option>
            <option value="approved">{translate('approved')}</option>
            <option value="rejected">{translate('rejected')}</option>
            <option value="sold">{translate('sold')}</option>
          </select>

          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-green-600 text-white'
                  : `${getThemeClass('bg-gray-700 text-gray-300', 'bg-gray-200 text-gray-700')}`
              }`}
              title={translate('gridView')}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-green-600 text-white'
                  : `${getThemeClass('bg-gray-700 text-gray-300', 'bg-gray-200 text-gray-700')}`
              }`}
              title={translate('listView')}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>

          {(filterType !== 'all' || filterStatus !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setFilterType('all')
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

      {/* Listings */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <BuildingStorefrontIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className={`${getThemeClass('text-gray-300', 'text-gray-600')}`}>
            {translate('noListings')}
          </p>
          <button
            onClick={() => {
              setFilterType('all')
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
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedListings.map((item, index) => (
                <div
                  key={item.id}
                  className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer`}
                  onClick={() => openListingModal(item)}
                >
                  {/* Image Gallery */}
                  <div className="relative h-48 bg-gray-700 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    {/* Main Image */}
                    <div className="absolute inset-0">
                      <img
                        src={getPropertyImage(item.type, index)}
                        alt={language === 'am' ? item.titleAm : item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format';
                        }}
                      />
                    </div>
                    
                    {/* Image count indicator */}
                    {item.images > 1 && (
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {item.images} {translate('photos')}
                      </div>
                    )}
                    
                    {/* Rating badge */}
                    {item.rating && (
                      <div className="absolute top-2 right-12 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <StarIcon className="w-3 h-3 mr-1 fill-current" />
                        {item.rating}
                      </div>
                    )}
                    
                    {/* Favorite button */}
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        {favorites.includes(item.id) ? (
                          <HeartIconSolid className="w-4 h-4 text-red-500" />
                        ) : (
                          <HeartIcon className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                    
                    {/* Type badge */}
                    <div className="absolute bottom-2 left-2">
                      {getTypeBadge(item.type)}
                    </div>
                    
                    {/* Status badge */}
                    <div className="absolute bottom-2 right-2">
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className={`${getThemeClass('text-white', 'text-gray-900')} font-semibold text-lg mb-2 line-clamp-1`}>
                      {language === 'am' ? item.titleAm : item.title}
                    </h3>
                    
                    <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-sm mb-3 line-clamp-2`}>
                      {language === 'am' ? item.descriptionAm : item.description}
                    </p>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className={`${getThemeClass('text-gray-300', 'text-gray-700')} line-clamp-1`}>
                          {formatLocation(item.kebele, item.areaName)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CurrencyDollarIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-green-500 font-semibold">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className={`${getThemeClass('text-gray-300', 'text-gray-700')}`}>
                          {getUserName(item.seller)}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.features.slice(0, 3).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className={`text-xs px-2 py-1 rounded-full ${getThemeClass('bg-gray-700 text-gray-300', 'bg-gray-200 text-gray-700')}`}
                        >
                          {translate(feature)}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                      <div className="flex items-center text-xs text-gray-400">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatDate(item.postedDate)}
                        <span className="mx-2">•</span>
                        <EyeIcon className="w-3 h-3 mr-1" />
                        {item.views} {translate('views')}
                      </div>
                      <button 
                        className="text-green-500 hover:text-green-400 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          openListingModal(item);
                        }}
                      >
                        {translate('viewDetails')} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg shadow-lg overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${getThemeClass('bg-gray-700/50', 'bg-gray-50')}`}>
                    <tr>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('listingId')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('property')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('type')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('priceHeader')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('locationHeader')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('seller')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('statusHeader')}
                      </th>
                      <th className={`${getThemeClass('text-gray-300', 'text-gray-600')} text-left px-6 py-3 text-xs font-medium uppercase tracking-wider`}>
                        {translate('actionHeader')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {paginatedListings.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={`${getThemeClass('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors cursor-pointer`}
                        onClick={() => openListingModal(item)}
                      >
                        <td className={`${getThemeClass('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm font-medium`}>
                          {item.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {/* Thumbnail image for list view */}
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                              <img
                                src={getPropertyImage(item.type, index)}
                                alt={language === 'am' ? item.titleAm : item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&auto=format';
                                }}
                              />
                            </div>
                            <div className="max-w-xs">
                              <p className={`${getThemeClass('text-white', 'text-gray-900')} text-sm font-medium line-clamp-1`}>
                                {language === 'am' ? item.titleAm : item.title}
                              </p>
                              <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-xs mt-1 line-clamp-1`}>
                                {language === 'am' ? item.descriptionAm : item.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getTypeBadge(item.type)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-500 font-semibold text-sm">
                            {formatPrice(item.price)}
                          </span>
                        </td>
                        <td className={`${getThemeClass('text-gray-300', 'text-gray-700')} px-6 py-4 text-sm`}>
                          {formatLocation(item.kebele, item.areaName)}
                        </td>
                        <td className={`${getThemeClass('text-gray-300', 'text-gray-900')} px-6 py-4 text-sm`}>
                          {getUserName(item.seller)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              openListingModal(item);
                            }}
                          >
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {translate('viewDetails')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg shadow-lg px-6 py-4 flex items-center justify-between`}>
            <div className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-sm`}>
              {translate('showing')
                .replace('{start}', (startIndex + 1).toString())
                .replace('{end}', Math.min(startIndex + itemsPerPage, filteredListings.length).toString())
                .replace('{total}', filteredListings.length.toString())}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded flex items-center ${
                  currentPage === 1
                    ? `${getThemeClass('bg-gray-800 text-gray-600', 'bg-gray-100 text-gray-400')} cursor-not-allowed`
                    : `${getThemeClass('bg-gray-700 text-gray-300 hover:bg-green-600', 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white')} transition-colors`
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
                      : `${getThemeClass('bg-gray-700 text-gray-300 hover:bg-green-600', 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white')} transition-colors`
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
                    ? `${getThemeClass('bg-gray-800 text-gray-600', 'bg-gray-100 text-gray-400')} cursor-not-allowed`
                    : `${getThemeClass('bg-gray-700 text-gray-300 hover:bg-green-600', 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white')} transition-colors`
                }`}
              >
                {translate('next')}
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('totalListingsCard')}
              </p>
              <p className={`${getThemeClass('text-white', 'text-gray-900')} text-2xl font-bold`}>{listings.length}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <BuildingStorefrontIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('pendingApproval')}
              </p>
              <p className={`${getThemeClass('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {listings.filter(v => v.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('activeListings')}
              </p>
              <p className={`${getThemeClass('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {listings.filter(v => v.status === 'approved').length}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className={`${getThemeClass('bg-gray-800', 'bg-white')} rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${getThemeClass('text-gray-400', 'text-gray-600')} text-sm`}>
                {translate('totalValue')}
              </p>
              <p className={`${getThemeClass('text-white', 'text-gray-900')} text-2xl font-bold`}>
                {formatPrice(listings.reduce((sum, item) => sum + item.price, 0))}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Listing Modal */}
      <ListingModal />
    </div>
  )
}