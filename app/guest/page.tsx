// app/guest/page.tsx
'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  FunnelIcon,
  HeartIcon,
  ArrowLeftIcon,
  PhotoIcon,
  UserIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
  DocumentTextIcon,
  ScaleIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '@/lib/LanguageContext'

interface LandListing {
  id: number
  titleEn: string
  titleAm: string
  locationEn: string
  locationAm: string
  price: number
  area: number
  type: 'residential' | 'commercial' | 'agricultural' | 'mixedUse'
  image: string
  images?: string[]
  verified: boolean
  featured: boolean
  rating?: number
  reviews?: number
  ownerEn?: string
  ownerAm?: string
  descriptionEn?: string
  descriptionAm?: string
  features?: string[]
}

export default function GuestPage() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedListing, setSelectedListing] = useState<LandListing | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'am')
  }

  const toggleFavorite = (id: number) => {
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

  // Content based on language
  const content = {
    en: {
      brand: 'Digital',
      brandSpan: 'Land',
      back: 'Back to Home',
      badge: 'Continue as Guest',
      title: 'Browse Land in Bahir Dar',
      subtitle: 'Explore verified land listings across Bahir Dar city',
      searchPlaceholder: 'Search by location, size, or price...',
      filters: 'Filters',
      allTypes: 'All Types',
      residential: 'Residential',
      commercial: 'Commercial',
      agricultural: 'Agricultural',
      mixedUse: 'Mixed Use',
      allPrices: 'All Prices',
      under500k: 'Under 500,000 ETB',
      under1m: '500,000 - 1,000,000 ETB',
      under2m: '1,000,000 - 2,000,000 ETB',
      above2m: 'Above 2,000,000 ETB',
      clearFilters: 'Clear Filters',
      verified: 'Verified',
      featured: 'Featured',
      viewDetails: 'View Details',
      noListings: 'No listings found',
      noListingsDesc: 'Try adjusting your search or filters',
      loginPrompt: 'Want to save listings and get updates?',
      login: 'Login',
      register: 'Create Account',
      area: 'sq m',
      etb: 'ETB',
      guestMessage: 'You are browsing as a guest',
      guestDescription: 'Create an account to save listings and get notified about new properties',
      
      // New Sections
      trending: 'Trending Now',
      trendingDesc: 'Most viewed properties this week',
      recentlyAdded: 'Recently Added',
      recentlyAddedDesc: 'Newest listings in Bahir Dar',
      whyChoose: 'Why Choose Digital Land?',
      stats: {
        listings: 'Active Listings',
        users: 'Happy Users',
        verified: 'Verified Properties',
        cities: 'Cities'
      },
      
      // Listing Features
      features: 'Features',
      waterAccess: 'Water Access',
      electricity: 'Electricity',
      roadAccess: 'Road Access',
      fence: 'Fenced',
      titleDeed: 'Title Deed Available',
      surveyPlan: 'Survey Plan Available',
      
      // Categories
      categories: 'Browse by Category',
      viewAll: 'View All',
      
      // How It Works
      howItWorks: 'How It Works',
      step1: 'Search Properties',
      step1Desc: 'Browse through our extensive collection of verified land listings',
      step2: 'Compare & Analyze',
      step2Desc: 'Compare prices, locations, and features to find the perfect match',
      step3: 'Connect with Owner',
      step3Desc: 'Get in touch with property owners directly through our platform',
      
      // Testimonials
      testimonials: 'What Our Users Say',
      testimonial1: '"Found my dream property in just 3 days. The verification system gave me peace of mind."',
      testimonial1Author: 'Abebe Kebede',
      testimonial2: '"As an officer, this platform has streamlined our verification process significantly."',
      testimonial2Author: 'Tigist Haile - Land Officer',
      
      // FAQ Section
      faq: 'Frequently Asked Questions',
      faq1: 'How do I verify land ownership?',
      faq1Ans: 'You can request verification through our platform by submitting the required documents.',
      faq2: 'Is the platform free to use?',
      faq2Ans: 'Browsing listings is free. Verification and transaction services may have applicable fees.',
      faq3: 'How are listings verified?',
      faq3Ans: 'All listings are verified by certified land officers against official government records.',
      
      // Locations
      locations: {
        bdu: 'Bahir Dar University Area',
        tana: 'Lake Tana Area',
        downtown: 'Downtown',
        kebele16: 'Kebele 16',
        kebele17: 'Kebele 17',
        kebele18: 'Kebele 18',
        kebele19: 'Kebele 19',
        kebele20: 'Kebele 20'
      }
    },
    am: {
      brand: 'ዲጂታል',
      brandSpan: 'መሬት',
      back: 'ወደ መነሻ ተመለስ',
      badge: 'እንደ እንግዳ ይቀጥሉ',
      title: 'በባህር ዳር መሬት ይቃኙ',
      subtitle: 'በመላው ባህር ዳር ከተማ የተረጋገጡ የመሬት ዝርዝሮችን ይመልከቱ',
      searchPlaceholder: 'በአካባቢ፣ በመጠን ወይም በዋጋ ይፈልጉ...',
      filters: 'ማጣሪያዎች',
      allTypes: 'ሁሉም አይነቶች',
      residential: 'መኖሪያ',
      commercial: 'ንግድ',
      agricultural: 'እርሻ',
      mixedUse: 'ድብልቅ አገልግሎት',
      allPrices: 'ሁሉም ዋጋዎች',
      under500k: 'ከ500,000 ብር በታች',
      under1m: '500,000 - 1,000,000 ብር',
      under2m: '1,000,000 - 2,000,000 ብር',
      above2m: 'ከ2,000,000 ብር በላይ',
      clearFilters: 'ማጣሪያዎችን አጽዳ',
      verified: 'የተረጋገጠ',
      featured: 'ተለይቶ የቀረበ',
      viewDetails: 'ዝርዝሮችን ተመልከት',
      noListings: 'ምንም ዝርዝሮች አልተገኙም',
      noListingsDesc: 'ፍለጋዎን ወይም ማጣሪያዎችዎን ለማስተካከል ይሞክሩ',
      loginPrompt: 'ዝርዝሮችን ማስቀመጥ እና ማሻሻያዎችን ማግኘት ይፈልጋሉ?',
      login: 'ግባ',
      register: 'መለያ ይፍጠሩ',
      area: 'ካሬ ሜትር',
      etb: 'ብር',
      guestMessage: 'እንደ እንግዳ እየተመለከቱ ነው',
      guestDescription: 'ዝርዝሮችን ለማስቀመጥ እና ስለ አዳዲስ ንብረቶች ማሳወቂያ ለማግኘት መለያ ይፍጠሩ',
      
      // New Sections
      trending: 'አዳዲስ አዝማሚያዎች',
      trendingDesc: 'በዚህ ሳምንት በብዛት የታዩ ንብረቶች',
      recentlyAdded: 'አዲስ የተጨመሩ',
      recentlyAddedDesc: 'በባህር ዳር አዳዲስ ዝርዝሮች',
      whyChoose: 'ለምን ዲጂታል መሬት ይምረጡ?',
      stats: {
        listings: 'ንቁ ዝርዝሮች',
        users: 'ደስተኛ ተጠቃሚዎች',
        verified: 'የተረጋገጡ ንብረቶች',
        cities: 'ከተሞች'
      },
      
      // Listing Features
      features: 'ገጽታዎች',
      waterAccess: 'የውሃ አቅርቦት',
      electricity: 'ኤሌክትሪክ',
      roadAccess: 'የመንገድ አቅርቦት',
      fence: 'አጥር ያለው',
      titleDeed: 'የባለቤትነት ሰነድ አለ',
      surveyPlan: 'የቅየሳ ንድፍ አለ',
      
      // Categories
      categories: 'በምድብ ይቃኙ',
      viewAll: 'ሁሉንም ተመልከት',
      
      // How It Works
      howItWorks: 'እንዴት እንደሚሰራ',
      step1: 'ንብረቶችን ይፈልጉ',
      step1Desc: 'በሰፊው የተረጋገጡ የመሬት ዝርዝሮች ውስጥ ይቃኙ',
      step2: 'ያወዳድሩ እና ይተንትኑ',
      step2Desc: 'ዋጋዎችን፣ አካባቢዎችን እና ገጽታዎችን ያወዳድሩ',
      step3: 'ከባለቤት ጋር ይገናኙ',
      step3Desc: 'በመድረካችን በኩል ከንብረት ባለቤቶች ጋር ይገናኙ',
      
      // Testimonials
      testimonials: 'ተጠቃሚዎቻችን የሚሉት',
      testimonial1: '"በ3 ቀናት ውስጥ የሕልሜን ንብረት አገኘሁ። የማረጋገጫ ስርዓቱ አእምሮዬን ሰጠኝ።"',
      testimonial1Author: 'አበበ ከበደ',
      testimonial2: '"እንደ ኦፊሰር፣ ይህ መድረክ የማረጋገጫ ሂደታችንን በእጅጉ አቀላጥፎታል።"',
      testimonial2Author: 'ትግስት ኃይሌ - የመሬት ኦፊሰር',
      
      // FAQ Section
      faq: 'ተደጋጋሚ ጥያቄዎች',
      faq1: 'የመሬት ባለቤትነትን እንዴት ማረጋገጥ እችላለሁ?',
      faq1Ans: 'አስፈላጊ ሰነዶችን በማቅረብ በመድረካችን በኩል ማረጋገጫ መጠየቅ ይችላሉ።',
      faq2: 'መድረኩን መጠቀም ነፃ ነው?',
      faq2Ans: 'ዝርዝሮችን ማየት ነፃ ነው። የማረጋገጫ እና የግብይት አገልግሎቶች ተገቢ ክፍያዎች ሊኖራቸው ይችላል።',
      faq3: 'ዝርዝሮች እንዴት ይረጋገጣሉ?',
      faq3Ans: 'ሁሉም ዝርዝሮች በሰርተፍኬት የመሬት ኦፊሰሮች በይፋ የመንግስት መዝገቦች ላይ ይረጋገጣሉ።',
      
      // Locations
      locations: {
        bdu: 'ባህር ዳር ዩኒቨርሲቲ አካባቢ',
        tana: 'ጣና ሐይቅ አካባቢ',
        downtown: 'መሀል ከተማ',
        kebele16: 'ቀበሌ 16',
        kebele17: 'ቀበሌ 17',
        kebele18: 'ቀበሌ 18',
        kebele19: 'ቀበሌ 19',
        kebele20: 'ቀበሌ 20'
      }
    }
  }

  const t = content[language]

  // Sample land listings in Bahir Dar - Expanded with more details
  const listings: LandListing[] = [
    {
      id: 1,
      titleEn: 'Residential Plot near BDU',
      titleAm: 'በባህር ዳር ዩኒቨርሲቲ አቅራቢያ የመኖሪያ መሬት',
      locationEn: 'Bahir Dar University Area',
      locationAm: 'ባህር ዳር ዩኒቨርሲቲ አካባቢ',
      price: 750000,
      area: 400,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      verified: true,
      featured: true,
      rating: 4.8,
      reviews: 24,
      ownerEn: 'Tekle Berhan',
      ownerAm: 'ተክሌ ብርሃን',
      descriptionEn: 'Beautiful residential plot near Bahir Dar University. Perfect for building a family home with easy access to schools, shops, and public transportation.',
      descriptionAm: 'በባህር ዳር ዩኒቨርሲቲ አቅራቢያ ውብ የመኖሪያ መሬት። ለቤተሰብ መኖሪያ ቤት መገንባት በጣም ምቹ፣ ከትምህርት ቤቶች፣ ሱቆች እና የህዝብ ማመላለሻ አገልግሎት አቅራቢያ።',
      features: ['waterAccess', 'electricity', 'roadAccess', 'titleDeed']
    },
    {
      id: 2,
      titleEn: 'Commercial Space Downtown',
      titleAm: 'በመሀል ከተማ የንግድ ቦታ',
      locationEn: 'Downtown',
      locationAm: 'መሀል ከተማ',
      price: 1200000,
      area: 300,
      type: 'commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      verified: true,
      featured: true,
      rating: 4.9,
      reviews: 36,
      ownerEn: 'Senait Gebre',
      ownerAm: 'ሰናይት ገብረ',
      descriptionEn: 'Prime commercial location in the heart of downtown. High foot traffic area, perfect for retail, restaurant, or office space.',
      descriptionAm: 'በመሀል ከተማ እምብርት ፕሪም የንግድ ቦታ። ከፍተኛ የእግረኛ ፍሰት አካባቢ፣ ለችርቻሮ፣ ሬስቶራንት ወይም ቢሮ ቦታ በጣም ምቹ።',
      features: ['electricity', 'roadAccess', 'waterAccess']
    },
    {
      id: 3,
      titleEn: 'Agricultural Land near Lake Tana',
      titleAm: 'በጣና ሐይቅ አቅራቢያ የእርሻ መሬት',
      locationEn: 'Lake Tana Area',
      locationAm: 'ጣና ሐይቅ አካባቢ',
      price: 450000,
      area: 1500,
      type: 'agricultural',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      verified: true,
      featured: false,
      rating: 4.7,
      reviews: 12,
      ownerEn: 'Mulugeta Ayele',
      ownerAm: 'ሙሉጌታ አየለ',
      descriptionEn: 'Large agricultural land near Lake Tana. Fertile soil with water access, ideal for farming or investment.',
      descriptionAm: 'በጣና ሐይቅ አቅራቢያ ሰፊ የእርሻ መሬት። ለም አፈር ከውሃ አቅርቦት ጋር፣ ለእርሻ ወይም ለኢንቨስትመንት በጣም ምቹ።',
      features: ['waterAccess', 'roadAccess', 'fence', 'surveyPlan']
    },
    {
      id: 4,
      titleEn: 'Residential Land - Kebele 16',
      titleAm: 'የመኖሪያ መሬት - ቀበሌ 16',
      locationEn: 'Kebele 16',
      locationAm: 'ቀበሌ 16',
      price: 550000,
      area: 350,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: false,
      rating: 4.6,
      reviews: 8,
      ownerEn: 'Azeb Hailu',
      ownerAm: 'አዜብ ኃይሉ',
      features: ['electricity', 'roadAccess']
    },
    {
      id: 5,
      titleEn: 'Commercial Plot - Kebele 17',
      titleAm: 'የንግድ መሬት - ቀበሌ 17',
      locationEn: 'Kebele 17',
      locationAm: 'ቀበሌ 17',
      price: 890000,
      area: 280,
      type: 'commercial',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: true,
      rating: 4.8,
      reviews: 15,
      ownerEn: 'Getachew Tesfaye',
      ownerAm: 'ጌታቸው ተስፋዬ',
      features: ['electricity', 'roadAccess', 'waterAccess']
    },
    {
      id: 6,
      titleEn: 'Residential Land - Kebele 18',
      titleAm: 'የመኖሪያ መሬት - ቀበሌ 18',
      locationEn: 'Kebele 18',
      locationAm: 'ቀበሌ 18',
      price: 620000,
      area: 400,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: false,
      rating: 4.5,
      reviews: 6,
      ownerEn: 'Tsion Wondimu',
      ownerAm: 'ጽዮን ወንድሙ',
      features: ['electricity', 'roadAccess']
    },
    {
      id: 7,
      titleEn: 'Agricultural Land - Kebele 19',
      titleAm: 'የእርሻ መሬት - ቀበሌ 19',
      locationEn: 'Kebele 19',
      locationAm: 'ቀበሌ 19',
      price: 380000,
      area: 2000,
      type: 'agricultural',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: false,
      rating: 4.7,
      reviews: 9,
      ownerEn: 'Hailu Girmay',
      ownerAm: 'ኃይሉ ግርማይ',
      features: ['waterAccess', 'roadAccess', 'fence']
    },
    {
      id: 8,
      titleEn: 'Commercial Space - Kebele 20',
      titleAm: 'የንግድ ቦታ - ቀበሌ 20',
      locationEn: 'Kebele 20',
      locationAm: 'ቀበሌ 20',
      price: 950000,
      area: 320,
      type: 'commercial',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: true,
      rating: 4.9,
      reviews: 21,
      ownerEn: 'Mekdes Tesfaye',
      ownerAm: 'መቅደስ ተስፋዬ',
      features: ['electricity', 'roadAccess']
    }
  ]

  // Trending listings (most viewed/rated)
  const trendingListings = [...listings].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3)

  // Recently added (newest - using IDs as proxy for "newest")
  const recentListings = [...listings].sort((a, b) => b.id - a.id).slice(0, 4)

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const title = language === 'en' ? listing.titleEn : listing.titleAm
    const location = language === 'en' ? listing.locationEn : listing.locationAm
    
    const matchesSearch = searchTerm === '' || 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
      
    const matchesType = selectedType === 'all' || listing.type === selectedType
    
    let matchesPrice = true
    if (priceRange !== 'all') {
      if (priceRange === 'under500k') matchesPrice = listing.price < 500000
      else if (priceRange === 'under1m') matchesPrice = listing.price >= 500000 && listing.price < 1000000
      else if (priceRange === 'under2m') matchesPrice = listing.price >= 1000000 && listing.price < 2000000
      else if (priceRange === 'above2m') matchesPrice = listing.price >= 2000000
    }
    
    return matchesSearch && matchesType && matchesPrice
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat().format(price)
  }

  // Helper function to safely get translation
  const getTranslation = (key: string): string => {
    const tKey = key as keyof typeof t;
    const value = t[tKey];
    return typeof value === 'string' ? value : key;
  }

  // Category names mapping
  const categoryNames: Record<string, string> = {
    residential: getTranslation('residential'),
    commercial: getTranslation('commercial'),
    agricultural: getTranslation('agricultural'),
    mixedUse: getTranslation('mixedUse')
  };

  // Listing Detail Modal
  const ListingModal = () => {
    if (!selectedListing || !showModal) return null

    const images = selectedListing.images || [selectedListing.image]

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
                alt={language === 'en' ? selectedListing.titleEn : selectedListing.titleAm}
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
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title and Rating */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? selectedListing.titleEn : selectedListing.titleAm}
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
                  {language === 'en' ? selectedListing.locationEn : selectedListing.locationAm}
                </div>
                <div className="flex items-center text-gray-600">
                  <HomeIcon className="w-5 h-5 mr-2 text-green-600" />
                  {selectedListing.area} {getTranslation('area')}
                </div>
                <div className="flex items-center text-2xl font-bold text-green-600 col-span-2">
                  <CurrencyDollarIcon className="w-6 h-6 mr-2" />
                  {getTranslation('etb')} {formatPrice(selectedListing.price)}
                </div>
              </div>

              {/* Description */}
              {selectedListing.descriptionEn && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'en' ? selectedListing.descriptionEn : selectedListing.descriptionAm}
                  </p>
                </div>
              )}

              {/* Features */}
              {selectedListing.features && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{getTranslation('features')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedListing.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {getTranslation(feature)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Owner Information</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">
                        {language === 'en' ? selectedListing.ownerEn : selectedListing.ownerAm}
                      </p>
                      <p className="text-sm text-gray-500">Verified Owner</p>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Contact Owner
                  </Link>
                </div>
              </div>

              {/* Login Prompt */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Note:</span> You need to{' '}
                  <Link href="/login" className="text-green-600 font-semibold hover:underline">
                    login
                  </Link>
                  {' '}or{' '}
                  <Link href="/register" className="text-green-600 font-semibold hover:underline">
                    create an account
                  </Link>
                  {' '}to contact the owner and save this listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 pb-16">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
              <span className="text-2xl font-light text-white">
                {getTranslation('brand')} <span className="font-semibold">{getTranslation('brandSpan')}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer border border-white/30 rounded-lg px-3 py-1.5"
              >
                <option value="en" className="text-gray-900">English</option>
                <option value="am" className="text-gray-900">አማርኛ</option>
              </select>
              <Link 
                href="/" 
                className="flex items-center text-white hover:text-green-100 transition-colors bg-white/10 px-4 py-2 rounded-lg"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {getTranslation('back')}
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center px-4 mt-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <UserIcon className="h-4 w-4 text-white mr-2" />
            <span className="text-sm font-medium text-white">{getTranslation('badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{getTranslation('title')}</h1>
          <p className="text-xl text-green-100 mb-8">{getTranslation('subtitle')}</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={getTranslation('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">{t.stats.listings}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1000+</div>
              <div className="text-sm text-gray-600">{t.stats.users}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">{t.stats.verified}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8+</div>
              <div className="text-sm text-gray-600">{t.stats.cities}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 lg:hidden"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>{getTranslation('filters')}</span>
            </button>

            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap items-center gap-4 w-full lg:w-auto`}>
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">{getTranslation('allTypes')}</option>
                <option value="residential">{getTranslation('residential')}</option>
                <option value="commercial">{getTranslation('commercial')}</option>
                <option value="agricultural">{getTranslation('agricultural')}</option>
                <option value="mixedUse">{getTranslation('mixedUse')}</option>
              </select>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">{getTranslation('allPrices')}</option>
                <option value="under500k">{getTranslation('under500k')}</option>
                <option value="under1m">{getTranslation('under1m')}</option>
                <option value="under2m">{getTranslation('under2m')}</option>
                <option value="above2m">{getTranslation('above2m')}</option>
              </select>

              {/* Clear Filters */}
              {(selectedType !== 'all' || priceRange !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedType('all')
                    setPriceRange('all')
                    setSearchTerm('')
                  }}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  {getTranslation('clearFilters')}
                </button>
              )}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600">
              {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found
            </p>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <SparklesIcon className="w-6 h-6 text-yellow-500 mr-2" />
              {getTranslation('trending')}
            </h2>
            <p className="text-gray-600">{getTranslation('trendingDesc')}</p>
          </div>
          <Link href="/marketplace" className="text-green-600 hover:text-green-700 font-medium">
            {getTranslation('viewAll')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => openListingModal(listing)}
            >
              <div className="relative h-48">
                <img src={listing.image} alt={listing.titleEn} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {listing.rating} ⭐
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === 'en' ? listing.titleEn : listing.titleAm}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-1 text-green-600" />
                  {language === 'en' ? listing.locationEn : listing.locationAm}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold">
                    {getTranslation('etb')} {formatPrice(listing.price)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(listing.id)
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <HeartIcon className={`w-5 h-5 ${favorites.includes(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{getTranslation('categories')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['residential', 'commercial', 'agricultural', 'mixedUse'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center group"
              >
                <BuildingOfficeIcon className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-gray-900">{categoryNames[cat]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{getTranslation('howItWorks')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('step1')}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('step1Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('step2')}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('step2Desc')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('step3')}</h3>
            <p className="text-gray-600 text-sm">{getTranslation('step3Desc')}</p>
          </div>
        </div>
      </div>

      {/* Main Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <HomeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{getTranslation('noListings')}</h3>
            <p className="text-gray-600">{getTranslation('noListingsDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => openListingModal(listing)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={language === 'en' ? listing.titleEn : listing.titleAm}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {listing.featured && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        {getTranslation('featured')}
                      </span>
                    )}
                    {listing.verified && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <CheckBadgeIcon className="w-3 h-3 mr-1" />
                        {getTranslation('verified')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(listing.id)
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <HeartIcon className={`w-4 h-4 ${favorites.includes(listing.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  {listing.rating && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <StarIconSolid className="w-3 h-3 text-yellow-500 mr-1" />
                      {listing.rating} ({listing.reviews})
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {language === 'en' ? listing.titleEn : listing.titleAm}
                  </h3>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {language === 'en' ? listing.locationEn : listing.locationAm}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <HomeIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      {listing.area} {getTranslation('area')}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-green-600">
                      <CurrencyDollarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      {getTranslation('etb')} {formatPrice(listing.price)}
                    </div>
                  </div>

                  {/* Features Preview */}
                  {listing.features && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {listing.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {getTranslation(feature).slice(0, 10)}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    {getTranslation('viewDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Added Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{getTranslation('recentlyAdded')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openListingModal(listing)}
              >
                <div className="relative h-32">
                  <img src={listing.image} alt={listing.titleEn} className="w-full h-full object-cover" />
                  <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                    New
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">
                    {language === 'en' ? listing.titleEn : listing.titleAm}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      {listing.area} {getTranslation('area')}
                    </span>
                    <span className="text-green-600 font-semibold text-sm">
                      {getTranslation('etb')} {formatPrice(listing.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{getTranslation('testimonials')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900">{getTranslation('testimonial1Author')}</p>
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(i => <StarIconSolid key={i} className="w-4 h-4" />)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"{getTranslation('testimonial1')}"</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900">{getTranslation('testimonial2Author')}</p>
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(i => <StarIconSolid key={i} className="w-4 h-4" />)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"{getTranslation('testimonial2')}"</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{getTranslation('faq')}</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">❓ {getTranslation('faq1')}</h3>
              <p className="text-gray-600 text-sm">{getTranslation('faq1Ans')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">❓ {getTranslation('faq2')}</h3>
              <p className="text-gray-600 text-sm">{getTranslation('faq2Ans')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">❓ {getTranslation('faq3')}</h3>
              <p className="text-gray-600 text-sm">{getTranslation('faq3Ans')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest CTA */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <GlobeAltIcon className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">{getTranslation('guestMessage')}</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">{getTranslation('guestDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
            >
              {getTranslation('login')}
            </Link>
            <Link
              href="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              {getTranslation('register')}
            </Link>
          </div>
        </div>
      </div>

      {/* Listing Modal */}
      <ListingModal />
    </div>
  )
}