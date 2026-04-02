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
  BuildingStorefrontIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HeartIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  ClockIcon,
  StarIcon,
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ScaleIcon,
  BoltIcon,
  WrenchIcon,
  MapIcon,
  ChartBarIcon,
  FolderIcon,
  BeakerIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Listing {
  id: number;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  location: string;
  locationAm: string;
  price: number;
  area: string;
  areaValue: number;
  areaUnit: 'sqm' | 'hectare';
  type: 'residential' | 'commercial' | 'agricultural' | 'mixedUse' | 'industrial';
  status: 'active' | 'pending' | 'sold' | 'rejected' | 'featured';
  image: string;
  images?: string[];
  seller: string;
  sellerAm: string;
  sellerContact: string;
  sellerEmail: string;
  sellerId: string;
  views: number;
  likes: number;
  features: string[];
  featuresAm: string[];
  documents: string[];
  documentsAm: string[];
  postedDate: string;
  expiryDate: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedByAm?: string;
  verifiedDate?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyAmenities?: string[];
  nearbyAmenitiesAm?: string[];
  propertyTax?: number;
  zoning?: string;
  zoningAm?: string;
  yearBuilt?: number;
  bedrooms?: number;
  bathrooms?: number;
  floorLevel?: number;
  totalFloors?: number;
  parkingSpaces?: number;
  hasElectricity: boolean;
  hasWater: boolean;
  hasSewage: boolean;
  hasRoad: boolean;
  rating?: number;
  reviews?: number;
}

export default function AdminMarketplacePage() {
  const { darkMode, language } = useLanguage();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'documents' | 'location' | 'analytics'>('details');

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  // Translation helper function
  const translate = (key: string): string => {
    const translations: Record<string, { en: string; am: string }> = {
      marketplace: { en: 'Marketplace', am: 'የገበያ ቦታ' },
      totalListings: { en: 'Total Listings', am: 'ጠቅላላ ዝርዝሮች' },
      totalValue: { en: 'Total Value', am: 'ጠቅላላ ዋጋ' },
      property: { en: 'Property', am: 'ንብረት' },
      actions: { en: 'Actions', am: 'ድርጊቶች' },
      active: { en: 'Active', am: 'ንቁ' },
      pending: { en: 'Pending', am: 'በመጠባበቅ ላይ' },
      sold: { en: 'Sold', am: 'ተሽጧል' },
      rejected: { en: 'Rejected', am: 'ውድቅ ተደርጓል' },
      featured: { en: 'Featured', am: 'ተለይቶ የቀረበ' },
      verified: { en: 'Verified', am: 'የተረጋገጠ' },
      residential: { en: 'Residential', am: 'መኖሪያ' },
      commercial: { en: 'Commercial', am: 'ንግድ' },
      agricultural: { en: 'Agricultural', am: 'እርሻ' },
      mixedUse: { en: 'Mixed Use', am: 'ድብልቅ አገልግሎት' },
      industrial: { en: 'Industrial', am: 'ኢንዱስትሪ' },
      searchPlaceholder: { en: 'Search by title or location...', am: 'በርዕስ ወይም በአካባቢ ፈልግ...' },
      allTypes: { en: 'All Types', am: 'ሁሉም አይነቶች' },
      allStatus: { en: 'All Status', am: 'ሁሉም ሁኔታ' },
      allPrices: { en: 'All Prices', am: 'ሁሉም ዋጋዎች' },
      under1M: { en: 'Under 1M', am: 'ከ1 ሚሊዮን በታች' },
      above3M: { en: 'Above 3M', am: 'ከ3 ሚሊዮን በላይ' },
      filter: { en: 'Filter', am: 'አጣራ' },
      sortBy: { en: 'Sort by', am: 'ደርድር በ' },
      newest: { en: 'Newest', am: 'አዲስ' },
      oldest: { en: 'Oldest', am: 'የድሮ' },
      priceHighToLow: { en: 'Price: High to Low', am: 'ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ' },
      priceLowToHigh: { en: 'Price: Low to High', am: 'ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ' },
      mostViewed: { en: 'Most Viewed', am: 'በብዛት የታዩ' },
      mostLiked: { en: 'Most Liked', am: 'በብዛት የተወደዱ' },
      price: { en: 'Price', am: 'ዋጋ' },
      area: { en: 'Area', am: 'ስፋት' },
      type: { en: 'Type', am: 'አይነት' },
      propertyTax: { en: 'Property Tax', am: 'የንብረት ግብር' },
      features: { en: 'Features', am: 'ገጽታዎች' },
      bedrooms: { en: 'Bedrooms', am: 'መኝታ ቤቶች' },
      bathrooms: { en: 'Bathrooms', am: 'መታጠቢያ ቤቶች' },
      parking: { en: 'Parking', am: 'መኪና ማቆሚያ' },
      floor: { en: 'Floor', am: 'ፎቅ' },
      utilities: { en: 'Utilities', am: 'መገልገያዎች' },
      electricity: { en: 'Electricity', am: 'ኤሌክትሪክ' },
      water: { en: 'Water', am: 'ውሃ' },
      sewage: { en: 'Sewage', am: 'የፍሳሽ ማስወገጃ' },
      roadAccess: { en: 'Road Access', am: 'የመንገድ አቅርቦት' },
      documents: { en: 'Documents', am: 'ሰነዶች' },
      uploadedDocuments: { en: 'Uploaded Documents', am: 'የተሰቀሉ ሰነዶች' },
      verifiedBy: { en: 'Verified by', am: 'የተረጋገጠው በ' },
      location: { en: 'Location', am: 'አካባቢ' },
      mapView: { en: 'Map View', am: 'የካርታ እይታ' },
      nearbyAmenities: { en: 'Nearby Amenities', am: 'በአካባቢው ያሉ አገልግሎቶች' },
      analytics: { en: 'Analytics', am: 'ትንታኔ' },
      views: { en: 'Views', am: 'እይታዎች' },
      likes: { en: 'Likes', am: 'የተወደደ' },
      postedDate: { en: 'Posted Date', am: 'የተለጠፈበት ቀን' },
      expiryDate: { en: 'Expiry Date', am: 'የሚያበቃበት ቀን' },
      sellerInformation: { en: 'Seller Information', am: 'የሻጭ መረጃ' },
      verifiedSeller: { en: 'Verified Seller', am: 'የተረጋገጠ ሻጭ' },
      sellerId: { en: 'Seller ID', am: 'የሻጭ መታወቂያ' },
      approve: { en: 'Approve', am: 'አጽድቅ' },
      reject: { en: 'Reject', am: 'ውድቅ አድርግ' },
      edit: { en: 'Edit', am: 'አርትዕ' },
      delete: { en: 'Delete', am: 'ሰርዝ' },
      viewDetails: { en: 'View Details', am: 'ዝርዝሮችን ተመልከት' },
      seller: { en: 'Seller', am: 'ሻጭ' },
      noListings: { en: 'No listings found', am: 'ምንም ዝርዝሮች አልተገኙም' },
      adjustSearch: { en: 'Please adjust your search criteria', am: 'እባክዎ የፍለጋ መስፈርቶችዎን ያስተካክሉ' },
      details: { en: 'Details', am: 'ዝርዝሮች' },
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
      beds: { en: 'beds', am: 'አልጋ' },
      baths: { en: 'baths', am: 'መታጠቢያ' },
      addNew: { en: 'Add New', am: 'አዲስ ያስገቡ' },
      cancel: { en: 'Cancel', am: 'ሰርዝ' },
      submitListing: { en: 'Submit Listing', am: 'አስገባ' },
      basicInformation: { en: 'Basic Information', am: 'መሰረታዊ መረጃ' },
      title: { en: 'Title', am: 'ርዕስ' },
      description: { en: 'Description', am: 'መግለጫ' },
      images: { en: 'Images', am: 'ምስሎች' },
      chooseImages: { en: 'Choose Images', am: 'ምስሎችን ምረጥ' },
      dragAndDrop: { en: 'Click to upload or drag and drop', am: 'ምስሎችን ለመጫን ጠቅ ያድርጉ ወይም ጎትተው ይጣሉ' },
      propertyDetails: { en: 'Property Details', am: 'የንብረት ዝርዝሮች' },
    };
    
    return translations[key]?.[language] || key;
  };

  // Get Ethiopian month name from date
  const getEthiopianMonth = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth();
    
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
    ];
    
    const ethiopianMonthIndex = (month + 4) % 12;
    return monthNames[ethiopianMonthIndex];
  };

  // Get Ethiopian year from Gregorian year
  const getEthiopianYear = (dateStr: string): number => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    
    let ethiopianYear = year - 8;
    
    if (month >= 8) {
      ethiopianYear = year - 7;
    }
    
    return ethiopianYear;
  };

  // Format date with Ethiopian month and year
  const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    
    if (language === 'am') {
      const day = dateObj.getDate();
      const ethiopianMonth = getEthiopianMonth(date);
      const ethiopianYear = getEthiopianYear(date);
      
      return `${ethiopianMonth} ${day}, ${ethiopianYear}`;
    }
    
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const listings: Listing[] = [
    {
      id: 1,
      title: 'Coffee House - Downtown',
      titleAm: 'ቡና ቤት - መሀል ከተማ',
      description: 'Prime location coffee shop with outdoor seating. High traffic area perfect for business. Fully equipped kitchen and modern interior.',
      descriptionAm: 'ፕሪም ሎኬሽን ላይ የሚገኝ የቡና ቤት ከውጪ መቀመጫ ጋር። ከፍተኛ የሰው ፍሰት ላለበት አካባቢ ለንግድ በጣም ምቹ። ሙሉ በሙሉ የታጠቀ ኩሽና እና ዘመናዊ ውስጣዊ ንድፍ።',
      location: 'Zone 1, Bahir Dar',
      locationAm: 'ዞን 1, ባሕር ዳር',
      price: 850000,
      area: '120 sqm',
      areaValue: 120,
      areaUnit: 'sqm',
      type: 'commercial',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format'
      ],
      seller: 'Abebe Kebede',
      sellerAm: 'አበበ ከበደ',
      sellerContact: '+251 91 234 5678',
      sellerEmail: 'abebe.kebede@email.com',
      sellerId: 'USR-001',
      views: 245,
      likes: 12,
      features: ['Outdoor seating', 'Kitchen ready', 'High traffic', 'Parking available', 'Near public transport'],
      featuresAm: ['የውጪ መቀመጫ', 'ዝግጁ ኩሽና', 'ከፍተኛ የሰው ፍሰት', 'መኪና ማቆሚያ', 'ከህዝብ ማመላለሻ አጠገብ'],
      documents: ['Title Deed', 'Business License', 'Tax Clearance'],
      documentsAm: ['የባለቤትነት ሰነድ', 'የንግድ ፈቃድ', 'የግብር ክፍያ'],
      postedDate: '2024-01-15',
      expiryDate: '2024-04-15',
      verified: true,
      verifiedBy: 'Tigist Haile',
      verifiedByAm: 'ትግስት ኃይሉ',
      verifiedDate: '2024-01-16',
      coordinates: { lat: 11.5742, lng: 37.3614 },
      nearbyAmenities: ['Bus station', 'School', 'Hospital', 'Shopping center'],
      nearbyAmenitiesAm: ['የአውቶቡስ ጣቢያ', 'ትምህርት ቤት', 'ሆስፒታል', 'የገበያ ማዕከል'],
      propertyTax: 12500,
      zoning: 'Commercial',
      zoningAm: 'ንግድ',
      hasElectricity: true,
      hasWater: true,
      hasSewage: true,
      hasRoad: true,
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      title: 'Modern Apartment',
      titleAm: 'ዘመናዊ አፓርትመንት',
      description: 'Luxury apartment with stunning lake view. 3 bedrooms, 2 bathrooms, modern kitchen, and spacious balcony.',
      descriptionAm: 'የሐይቅ እይታ ያለው የቅንጦት አፓርትመንት። 3 መኝታ ቤቶች፣ 2 መታጠቢያ ቤቶች፣ ዘመናዊ ኩሽና እና ሰፊ በረንዳ።',
      location: 'Zone 3, Bahir Dar',
      locationAm: 'ዞን 3, ባሕር ዳር',
      price: 1200000,
      area: '180 sqm',
      areaValue: 180,
      areaUnit: 'sqm',
      type: 'residential',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format'
      ],
      seller: 'Tigist Haile',
      sellerAm: 'ትግስት ኃይሉ',
      sellerContact: '+251 92 345 6789',
      sellerEmail: 'tigist.haile@email.com',
      sellerId: 'USR-002',
      views: 189,
      likes: 8,
      features: ['Lake view', 'Balcony', 'Parking', 'Elevator', 'Security'],
      featuresAm: ['የሐይቅ እይታ', 'በረንዳ', 'መኪና ማቆሚያ', 'አሳንሰር', 'ደህንነት'],
      documents: ['Title Deed', 'Building Permit'],
      documentsAm: ['የባለቤትነት ሰነድ', 'የግንባታ ፈቃድ'],
      postedDate: '2024-02-10',
      expiryDate: '2024-05-10',
      verified: false,
      coordinates: { lat: 11.5852, lng: 37.3714 },
      nearbyAmenities: ['Supermarket', 'Restaurant', 'Park'],
      nearbyAmenitiesAm: ['ሱፐርማርኬት', 'ሬስቶራንት', 'መናፈሻ'],
      propertyTax: 18500,
      zoning: 'Residential',
      zoningAm: 'መኖሪያ',
      bedrooms: 3,
      bathrooms: 2,
      floorLevel: 5,
      totalFloors: 12,
      parkingSpaces: 1,
      hasElectricity: true,
      hasWater: true,
      hasSewage: true,
      hasRoad: true,
      rating: 4.5,
      reviews: 12
    },
    {
      id: 3,
      title: 'Farm Land',
      titleAm: 'የእርሻ መሬት',
      description: 'Large agricultural land suitable for farming. Fertile soil with water access and road frontage.',
      descriptionAm: 'ለእርሻ ምቹ የሆነ ሰፊ መሬት። ለም አፈር ከውሃ አቅርቦት እና ከመንገድ ዳርቻ ጋር።',
      location: 'Zone 2, Bahir Dar',
      locationAm: 'ዞን 2, ባሕር ዳር',
      price: 2200000,
      area: '5000 sqm',
      areaValue: 0.5,
      areaUnit: 'hectare',
      type: 'agricultural',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format',
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format',
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format'
      ],
      seller: 'Biruk Alemu',
      sellerAm: 'ብሩክ አለሙ',
      sellerContact: '+251 93 456 7890',
      sellerEmail: 'biruk.alemu@email.com',
      sellerId: 'USR-003',
      views: 312,
      likes: 15,
      features: ['Water access', 'Fertile soil', 'Road access', 'Irrigation system', 'Electricity nearby'],
      featuresAm: ['የውሃ አቅርቦት', 'ለም አፈር', 'የመንገድ አቅርቦት', 'የመስኖ ስርዓት', 'ኤሌክትሪክ አቅራቢያ'],
      documents: ['Title Deed', 'Land Survey', 'Tax Clearance'],
      documentsAm: ['የባለቤትነት ሰነድ', 'የመሬት ቅየሳ', 'የግብር ክፍያ'],
      postedDate: '2024-01-20',
      expiryDate: '2024-04-20',
      verified: true,
      verifiedBy: 'Meron Tadesse',
      verifiedByAm: 'መሮን ታደሰ',
      verifiedDate: '2024-01-22',
      coordinates: { lat: 11.5652, lng: 37.3514 },
      nearbyAmenities: ['Market', 'School'],
      nearbyAmenitiesAm: ['ገበያ', 'ትምህርት ቤት'],
      propertyTax: 8500,
      zoning: 'Agricultural',
      zoningAm: 'እርሻ',
      hasElectricity: true,
      hasWater: true,
      hasSewage: false,
      hasRoad: true,
      rating: 4.7,
      reviews: 18
    },
    {
      id: 4,
      title: 'Office Space',
      titleAm: 'የቢሮ ቦታ',
      description: 'Spacious office space in commercial area. Perfect for corporate headquarters or professional services.',
      descriptionAm: 'በንግድ አካባቢ የሚገኝ ሰፊ የቢሮ ቦታ። ለኮርፖሬት ዋና መሥሪያ ቤት ወይም ለሙያዊ አገልግሎቶች በጣም ምቹ።',
      location: 'Zone 4, Bahir Dar',
      locationAm: 'ዞን 4, ባሕር ዳር',
      price: 3200000,
      area: '250 sqm',
      areaValue: 250,
      areaUnit: 'sqm',
      type: 'commercial',
      status: 'sold',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format'
      ],
      seller: 'Meron Tadesse',
      sellerAm: 'መሮን ታደሰ',
      sellerContact: '+251 94 567 8901',
      sellerEmail: 'meron.tadesse@email.com',
      sellerId: 'USR-004',
      views: 278,
      likes: 5,
      features: ['Conference room', 'Reception', 'Parking', 'Security', 'High-speed internet'],
      featuresAm: ['የስብሰባ ክፍል', 'እንግዳ መቀበያ', 'መኪና ማቆሚያ', 'ደህንነት', 'ፈጣን ኢንተርኔት'],
      documents: ['Title Deed', 'Business License', 'Fire Safety Certificate'],
      documentsAm: ['የባለቤትነት ሰነድ', 'የንግድ ፈቃድ', 'የእሳት ደህንነት ሰርተፍኬት'],
      postedDate: '2024-01-05',
      expiryDate: '2024-04-05',
      verified: true,
      verifiedBy: 'Abebe Kebede',
      verifiedByAm: 'አበበ ከበደ',
      verifiedDate: '2024-01-07',
      coordinates: { lat: 11.5952, lng: 37.3814 },
      nearbyAmenities: ['Bank', 'Restaurant', 'Hotel', 'Shopping mall'],
      nearbyAmenitiesAm: ['ባንክ', 'ሬስቶራንት', 'ሆቴል', 'የገበያ አዳራሽ'],
      propertyTax: 28500,
      zoning: 'Commercial',
      zoningAm: 'ንግድ',
      floorLevel: 2,
      totalFloors: 5,
      parkingSpaces: 4,
      hasElectricity: true,
      hasWater: true,
      hasSewage: true,
      hasRoad: true,
      rating: 4.9,
      reviews: 32
    }
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(language === 'am' ? 'am-ET' : 'en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status: Listing['status']) => {
    const config = {
      active: { color: 'green', text: translate('active') },
      pending: { color: 'yellow', text: translate('pending') },
      sold: { color: 'gray', text: translate('sold') },
      rejected: { color: 'red', text: translate('rejected') },
      featured: { color: 'purple', text: translate('featured') }
    };
    
    const statusConfig = config[status] || config.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${statusConfig.color}-100 text-${statusConfig.color}-800 dark:bg-${statusConfig.color}-900/30 dark:text-${statusConfig.color}-400`}>
        {statusConfig.text}
      </span>
    );
  };

  const getTypeBadge = (type: Listing['type']) => {
    const config = {
      residential: { color: 'blue', text: translate('residential') },
      commercial: { color: 'purple', text: translate('commercial') },
      agricultural: { color: 'green', text: translate('agricultural') },
      mixedUse: { color: 'orange', text: translate('mixedUse') },
      industrial: { color: 'gray', text: translate('industrial') }
    };
    
    const typeConfig = config[type] || config.residential;
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${typeConfig.color}-100 text-${typeConfig.color}-800 dark:bg-${typeConfig.color}-900/30 dark:text-${typeConfig.color}-400`}>
        {typeConfig.text}
      </span>
    );
  };

  const openListingModal = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentImageIndex(0);
    setActiveTab('details');
    setShowModal(true);
  };

  const handleAddNewListing = () => {
    setShowAddModal(true);
  };

  const filteredListings = listings.filter(listing => {
    const title = language === 'am' ? listing.titleAm : listing.title;
    const description = language === 'am' ? listing.descriptionAm : listing.description;
    const location = language === 'am' ? listing.locationAm : listing.location;
    const seller = language === 'am' ? listing.sellerAm : listing.seller;
    
    const matchesSearch = searchTerm === '' || 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || listing.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    
    let matchesPrice = true;
    if (priceRange === 'under1m') matchesPrice = listing.price < 1000000;
    else if (priceRange === '1m-2m') matchesPrice = listing.price >= 1000000 && listing.price < 2000000;
    else if (priceRange === '2m-3m') matchesPrice = listing.price >= 2000000 && listing.price < 3000000;
    else if (priceRange === 'above3m') matchesPrice = listing.price >= 3000000;
    
    return matchesSearch && matchesType && matchesStatus && matchesPrice;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    if (sortBy === 'oldest') return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'views') return b.views - a.views;
    if (sortBy === 'likes') return b.likes - a.likes;
    return 0;
  });

  // Add New Listing Modal Component
  const AddListingModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translate('addNew')}
            </h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {translate('basicInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('title')} *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      placeholder={language === 'am' ? 'ለምሳሌ: ዘመናዊ አፓርትመንት' : 'e.g., Modern Apartment'}
                    />
                  </div>

                  {/* Title Amharic */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'am' ? 'ርዕስ (አማርኛ)' : 'Title (Amharic)'}
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      placeholder="ለምሳሌ: ዘመናዊ አፓርትመንት"
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('description')} *
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      placeholder={language === 'am' ? 'የንብረቱ ዝርዝር መግለጫ...' : 'Detailed description of the property...'}
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('type')} *
                    </label>
                    <select className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                      ${darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}>
                      <option value="residential">{translate('residential')}</option>
                      <option value="commercial">{translate('commercial')}</option>
                      <option value="agricultural">{translate('agricultural')}</option>
                      <option value="mixedUse">{translate('mixedUse')}</option>
                      <option value="industrial">{translate('industrial')}</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('allStatus')} *
                    </label>
                    <select className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                      ${darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }`}>
                      <option value="active">{translate('active')}</option>
                      <option value="pending">{translate('pending')}</option>
                      <option value="featured">{translate('featured')}</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('price')} (ETB) *
                    </label>
                    <input
                      type="number"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      placeholder="1,000,000"
                    />
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('area')} *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                          ${darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        placeholder="120"
                      />
                      <select className={`w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}>
                        <option value="sqm">sqm</option>
                        <option value="hectare">hectare</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('location')} *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      placeholder="Zone 1, Bahir Dar"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('images')} *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                      <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {translate('dragAndDrop')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        {translate('chooseImages')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {translate('propertyDetails')}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('bedrooms')}
                    </label>
                    <input type="number" className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('bathrooms')}
                    </label>
                    <input type="number" className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('parking')}
                    </label>
                    <input type="number" className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('floor')}
                    </label>
                    <input type="number" className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                </div>

                {/* Utilities */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translate('utilities')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{translate('electricity')}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{translate('water')}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{translate('sewage')}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{translate('roadAccess')}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {translate('sellerInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('seller')} *
                    </label>
                    <input type="text" className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {translate('sellerId')} *
                    </label>
                    <input type="text" className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone *
                    </label>
                    <input type="tel" className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input type="email" className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {translate('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {translate('submitListing')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Listing Detail Modal
  const ListingModal = () => {
    if (!selectedListing || !showModal) return null;

    const images = selectedListing.images || [selectedListing.image];

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Image Gallery */}
            <div className="relative h-96 bg-gray-100 dark:bg-gray-900">
              <img
                src={images[currentImageIndex]}
                alt={language === 'am' ? selectedListing.titleAm : selectedListing.title}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Status badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {getTypeBadge(selectedListing.type)}
                {selectedListing.verified && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                    {translate('verified')}
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-16">
                {getStatusBadge(selectedListing.status)}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {translate('details')}
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'documents'
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {translate('documents')}
                </button>
                <button
                  onClick={() => setActiveTab('location')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'location'
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {translate('location')}
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {translate('analytics')}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Title and Price */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'am' ? selectedListing.titleAm : selectedListing.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'am' ? selectedListing.descriptionAm : selectedListing.description}
                      </p>
                    </div>
                    {selectedListing.rating && (
                      <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        <StarIconSolid className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-semibold text-gray-900 dark:text-white">{selectedListing.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">({selectedListing.reviews})</span>
                      </div>
                    )}
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('price')}</p>
                      <p className="text-xl font-bold text-green-600">{formatPrice(selectedListing.price)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('area')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedListing.area}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('type')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{getTypeBadge(selectedListing.type)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('propertyTax')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(selectedListing.propertyTax || 0)}/yr</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{translate('features')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'am' ? selectedListing.featuresAm : selectedListing.features).map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedListing.bedrooms && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{translate('bedrooms')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedListing.bedrooms}</p>
                      </div>
                    )}
                    {selectedListing.bathrooms && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{translate('bathrooms')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedListing.bathrooms}</p>
                      </div>
                    )}
                    {selectedListing.parkingSpaces && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{translate('parking')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedListing.parkingSpaces}</p>
                      </div>
                    )}
                    {selectedListing.floorLevel && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{translate('floor')}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {selectedListing.floorLevel}/{selectedListing.totalFloors}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Utilities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{translate('utilities')}</h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedListing.hasElectricity && (
                        <span className="flex items-center text-green-600">
                          <BoltIcon className="w-5 h-5 mr-1" />
                          {translate('electricity')}
                        </span>
                      )}
                      {selectedListing.hasWater && (
                        <span className="flex items-center text-green-600">
                          <BeakerIcon className="w-5 h-5 mr-1" />
                          {translate('water')}
                        </span>
                      )}
                      {selectedListing.hasSewage && (
                        <span className="flex items-center text-green-600">
                          <WrenchIcon className="w-5 h-5 mr-1" />
                          {translate('sewage')}
                        </span>
                      )}
                      {selectedListing.hasRoad && (
                        <span className="flex items-center text-green-600">
                          <MapIcon className="w-5 h-5 mr-1" />
                          {translate('roadAccess')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{translate('uploadedDocuments')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(language === 'am' ? selectedListing.documentsAm : selectedListing.documents).map((doc, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <DocumentTextIcon className="w-8 h-8 text-blue-500 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{doc}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 2.5 MB</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Verification Info */}
                  {selectedListing.verified && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-semibold text-green-800 dark:text-green-400">{translate('verifiedBy')}</h4>
                      </div>
                      <p className="text-green-700 dark:text-green-300">
                        {language === 'am' ? selectedListing.verifiedByAm : selectedListing.verifiedBy} • {formatDate(selectedListing.verifiedDate || '')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-900 dark:text-white">
                      {language === 'am' ? selectedListing.locationAm : selectedListing.location}
                    </span>
                  </div>
                  
                  {/* Map placeholder */}
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">{translate('mapView')}</p>
                  </div>

                  {/* Nearby Amenities */}
                  {selectedListing.nearbyAmenities && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{translate('nearbyAmenities')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(language === 'am' ? selectedListing.nearbyAmenitiesAm : selectedListing.nearbyAmenities)?.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('views')}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedListing.views}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('likes')}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedListing.likes}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('postedDate')}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(selectedListing.postedDate)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{translate('expiryDate')}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(selectedListing.expiryDate)}</p>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{translate('sellerInformation')}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {language === 'am' ? selectedListing.sellerAm : selectedListing.seller}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{translate('verifiedSeller')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{translate('sellerId')}: {selectedListing.sellerId}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedListing.sellerContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end space-x-3">
              {selectedListing.status === 'pending' && (
                <>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    {translate('approve')}
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    {translate('reject')}
                  </button>
                </>
              )}
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <PencilIcon className="w-4 h-4 mr-2" />
                {translate('edit')}
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                <TrashIcon className="w-4 h-4 mr-2" />
                {translate('delete')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Add New Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
            {translate('marketplace')}
          </h1>
          <p className={`text-sm mt-1 ${cn('text-gray-400', 'text-gray-600')}`}>
            {translate('totalListings')}: {sortedListings.length}
          </p>
        </div>
        <div className="flex space-x-2">
          {/* Add New Listing Button */}
          <button
            onClick={handleAddNewListing}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {translate('addNew')}
          </button>
          
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : cn('bg-gray-700 text-gray-300', 'bg-gray-200 text-gray-700')}`}
            title={language === 'am' ? 'የፍርግርግ እይታ' : 'Grid View'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-600 text-white' : cn('bg-gray-700 text-gray-300', 'bg-gray-200 text-gray-700')}`}
            title={language === 'am' ? 'የዝርዝር እይታ' : 'List View'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{translate('totalListings')}</p>
          <p className="text-2xl font-bold text-blue-600">{listings.length}</p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{translate('active')}</p>
          <p className="text-2xl font-bold text-green-600">
            {listings.filter(l => l.status === 'active').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{translate('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {listings.filter(l => l.status === 'pending').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{translate('featured')}</p>
          <p className="text-2xl font-bold text-purple-600">
            {listings.filter(l => l.status === 'featured').length}
          </p>
        </div>
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
          <p className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>{translate('totalValue')}</p>
          <p className="text-2xl font-bold text-purple-600">
            {formatPrice(listings.reduce((sum, l) => sum + l.price, 0))}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={translate('searchPlaceholder')}
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-40
            `}
          >
            <option value="all">{translate('allTypes')}</option>
            <option value="residential">{translate('residential')}</option>
            <option value="commercial">{translate('commercial')}</option>
            <option value="agricultural">{translate('agricultural')}</option>
            <option value="mixedUse">{translate('mixedUse')}</option>
            <option value="industrial">{translate('industrial')}</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-40
            `}
          >
            <option value="all">{translate('allStatus')}</option>
            <option value="active">{translate('active')}</option>
            <option value="pending">{translate('pending')}</option>
            <option value="sold">{translate('sold')}</option>
            <option value="rejected">{translate('rejected')}</option>
            <option value="featured">{translate('featured')}</option>
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-40
            `}
          >
            <option value="all">{translate('allPrices')}</option>
            <option value="under1m">{translate('under1M')}</option>
            <option value="1m-2m">1M - 2M</option>
            <option value="2m-3m">2M - 3M</option>
            <option value="above3m">{translate('above3M')}</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`
              px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              } md:w-40
            `}
          >
            <option value="newest">{translate('newest')}</option>
            <option value="oldest">{translate('oldest')}</option>
            <option value="price-high">{translate('priceHighToLow')}</option>
            <option value="price-low">{translate('priceLowToHigh')}</option>
            <option value="views">{translate('mostViewed')}</option>
            <option value="likes">{translate('mostLiked')}</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 md:w-24">
            <FunnelIcon className="w-4 h-4 mr-2" />
            {translate('filter')}
          </button>
        </div>
      </div>

      {/* Listings Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings.map((listing) => (
            <div 
              key={listing.id} 
              className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer`}
              onClick={() => openListingModal(listing)}
            >
              <div className="relative h-48">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(listing.status)}
                </div>
                <div className="absolute top-2 left-2 flex gap-2">
                  {getTypeBadge(listing.type)}
                  {listing.verified && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      <CheckCircleIcon className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${cn('text-white', 'text-gray-900')}`}>
                  {language === 'am' ? listing.titleAm : listing.title}
                </h3>
                
                <p className={`text-sm mb-2 line-clamp-2 ${cn('text-gray-400', 'text-gray-600')}`}>
                  {language === 'am' ? listing.descriptionAm : listing.description}
                </p>
                
                <div className="flex items-center mb-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                  <span className={`text-sm line-clamp-1 ${cn('text-gray-400', 'text-gray-600')}`}>
                    {language === 'am' ? listing.locationAm : listing.location}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-sm ${cn('text-gray-400', 'text-gray-600')}`}>
                    {listing.area}
                  </span>
                  <div className="flex items-center space-x-2">
                    {(language === 'am' ? listing.featuresAm : listing.features).slice(0, 2).map((feature, idx) => (
                      <span key={idx} className={`px-2 py-1 text-xs rounded-full ${cn('bg-gray-700 text-gray-300', 'bg-gray-100 text-gray-600')}`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">{translate('seller')}</p>
                    <p className={`text-sm font-medium line-clamp-1 ${cn('text-white', 'text-gray-900')}`}>
                      {language === 'am' ? listing.sellerAm : listing.seller}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {formatPrice(listing.price)}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span className="flex items-center">
                        <EyeIcon className="w-3 h-3 mr-1" />
                        {listing.views}
                      </span>
                      <span className="flex items-center">
                        <HeartIcon className="w-3 h-3 mr-1" />
                        {listing.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm overflow-hidden`}>
          <table className="w-full">
            <thead className={`${cn('bg-gray-700/50', 'bg-gray-50')}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('property')}
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('type')}
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('status')}
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('price')}
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('seller')}
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('views')}
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${cn('text-gray-300', 'text-gray-600')}`}>
                  {translate('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedListings.map((listing) => (
                <tr 
                  key={listing.id} 
                  className={`${cn('hover:bg-gray-700/50', 'hover:bg-gray-50')} transition-colors cursor-pointer`}
                  onClick={() => openListingModal(listing)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${cn('text-white', 'text-gray-900')}`}>
                          {language === 'am' ? listing.titleAm : listing.title}
                        </div>
                        <div className={`text-sm ${cn('text-gray-400', 'text-gray-500')}`}>
                          {listing.area}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(listing.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(listing.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600 font-semibold">
                      {formatPrice(listing.price)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${cn('text-gray-300', 'text-gray-600')}`}>
                    {language === 'am' ? listing.sellerAm : listing.seller}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${cn('text-gray-300', 'text-gray-600')}`}>
                    {listing.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        openListingModal(listing);
                      }}
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Results */}
      {sortedListings.length === 0 && (
        <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-12 text-center`}>
          <BuildingStorefrontIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className={`text-lg ${cn('text-gray-300', 'text-gray-600')}`}>
            {translate('noListings')}
          </p>
          <p className={`text-sm mt-2 ${cn('text-gray-500', 'text-gray-400')}`}>
            {translate('adjustSearch')}
          </p>
        </div>
      )}

      {/* Add New Listing Modal */}
      <AddListingModal />

      {/* Listing Modal */}
      <ListingModal />
    </div>
  );
}