const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock data storage (in production, this would be in database)
let listings = [
  {
    id: 1,
    title: 'Coffee House - Downtown',
    titleAm: 'ቡና ቤት - መሀል ከተማ',
    description: 'Prime location coffee shop with outdoor seating. High traffic area perfect for business.',
    descriptionAm: 'ፕሪም ሎኬሽን ላይ የሚገኝ የቡና ቤት ከውጪ መቀመጫ ጋር።',
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
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format'
    ],
    seller: 'Abebe Kebede',
    sellerAm: 'አበበ ከበደ',
    sellerContact: '+251 91 234 5678',
    sellerEmail: 'abebe.kebede@email.com',
    sellerId: 'USR-001',
    views: 245,
    likes: 12,
    features: ['Outdoor seating', 'Kitchen ready', 'High traffic', 'Parking available'],
    featuresAm: ['የውጪ መቀመጫ', 'ዝግጁ ኩሽና', 'ከፍተኛ የሰው ፍሰት', 'መኪና ማቆሚያ'],
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
    reviews: 24,
    bedrooms: null,
    bathrooms: null,
    floorLevel: null,
    totalFloors: null,
    parkingSpaces: 2,
    yearBuilt: 2020
  },
  {
    id: 2,
    title: 'Modern Apartment',
    titleAm: 'ዘመናዊ አፓርትመንት',
    description: 'Luxury apartment with stunning lake view. 3 bedrooms, 2 bathrooms, modern kitchen.',
    descriptionAm: 'የሐይቅ እይታ ያለው የቅንጦት አፓርትመንት።',
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
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format'
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
    hasElectricity: true,
    hasWater: true,
    hasSewage: true,
    hasRoad: true,
    rating: 4.5,
    reviews: 12,
    bedrooms: 3,
    bathrooms: 2,
    floorLevel: 5,
    totalFloors: 12,
    parkingSpaces: 1,
    yearBuilt: 2022
  },
  {
    id: 3,
    title: 'Farm Land',
    titleAm: 'የእርሻ መሬት',
    description: 'Large agricultural land suitable for farming. Fertile soil with water access.',
    descriptionAm: 'ለእርሻ ምቹ የሆነ ሰፊ መሬት።',
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
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format'
    ],
    seller: 'Biruk Alemu',
    sellerAm: 'ብሩክ አለሙ',
    sellerContact: '+251 93 456 7890',
    sellerEmail: 'biruk.alemu@email.com',
    sellerId: 'USR-003',
    views: 312,
    likes: 15,
    features: ['Water access', 'Fertile soil', 'Road access', 'Irrigation system'],
    featuresAm: ['የውሃ አቅርቦት', 'ለም አፈር', 'የመንገድ አቅርቦት', 'የመስኖ ስርዓት'],
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
    reviews: 18,
    bedrooms: null,
    bathrooms: null,
    floorLevel: null,
    totalFloors: null,
    parkingSpaces: null,
    yearBuilt: null
  },
  {
    id: 4,
    title: 'Office Space',
    titleAm: 'የቢሮ ቦታ',
    description: 'Spacious office space in commercial area. Perfect for corporate headquarters.',
    descriptionAm: 'በንግድ አካባቢ የሚገኝ ሰፊ የቢሮ ቦታ።',
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
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format'
    ],
    seller: 'Meron Tadesse',
    sellerAm: 'መሮን ታደሰ',
    sellerContact: '+251 94 567 8901',
    sellerEmail: 'meron.tadesse@email.com',
    sellerId: 'USR-004',
    views: 278,
    likes: 5,
    features: ['Conference room', 'Reception', 'Parking', 'Security'],
    featuresAm: ['የስብሰባ ክፍል', 'እንግዳ መቀበያ', 'መኪና ማቆሚያ', 'ደህንነት'],
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
    hasElectricity: true,
    hasWater: true,
    hasSewage: true,
    hasRoad: true,
    rating: 4.9,
    reviews: 32,
    bedrooms: null,
    bathrooms: null,
    floorLevel: 2,
    totalFloors: 5,
    parkingSpaces: 4,
    yearBuilt: 2019
  }
];

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all listings with filters
router.get('/listings', verifyAdmin, (req, res) => {
  const { 
    search, 
    type, 
    status, 
    minPrice, 
    maxPrice, 
    sortBy = 'newest',
    page = 1, 
    limit = 10 
  } = req.query;
  
  let filteredListings = [...listings];
  
  // Apply filters
  if (search) {
    const searchLower = search.toLowerCase();
    filteredListings = filteredListings.filter(l => 
      l.title.toLowerCase().includes(searchLower) ||
      l.titleAm.toLowerCase().includes(searchLower) ||
      l.description.toLowerCase().includes(searchLower) ||
      l.location.toLowerCase().includes(searchLower)
    );
  }
  
  if (type && type !== 'all') {
    filteredListings = filteredListings.filter(l => l.type === type);
  }
  
  if (status && status !== 'all') {
    filteredListings = filteredListings.filter(l => l.status === status);
  }
  
  if (minPrice) {
    filteredListings = filteredListings.filter(l => l.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredListings = filteredListings.filter(l => l.price <= parseInt(maxPrice));
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'newest':
      filteredListings.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      break;
    case 'oldest':
      filteredListings.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
      break;
    case 'price-high':
      filteredListings.sort((a, b) => b.price - a.price);
      break;
    case 'price-low':
      filteredListings.sort((a, b) => a.price - b.price);
      break;
    case 'views':
      filteredListings.sort((a, b) => b.views - a.views);
      break;
    case 'likes':
      filteredListings.sort((a, b) => b.likes - a.likes);
      break;
    default:
      filteredListings.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedListings = filteredListings.slice(startIndex, endIndex);
  
  res.json({
    listings: paginatedListings,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredListings.length,
      pages: Math.ceil(filteredListings.length / limit)
    }
  });
});

// Get listing by ID
router.get('/listings/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const listing = listings.find(l => l.id === parseInt(id));
  
  if (!listing) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  
  res.json(listing);
});

// Create new listing (POST)
router.post('/listings', verifyAdmin, (req, res) => {
  const {
    title,
    titleAm,
    description,
    descriptionAm,
    location,
    locationAm,
    price,
    area,
    areaValue,
    areaUnit,
    type,
    status,
    image,
    images,
    seller,
    sellerAm,
    sellerContact,
    sellerEmail,
    sellerId,
    features,
    featuresAm,
    documents,
    documentsAm,
    hasElectricity,
    hasWater,
    hasSewage,
    hasRoad,
    bedrooms,
    bathrooms,
    parkingSpaces,
    floorLevel,
    totalFloors,
    propertyTax,
    zoning,
    zoningAm
  } = req.body;
  
  // Validate required fields
  if (!title || !description || !location || !price || !seller) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newListing = {
    id: listings.length + 1,
    title,
    titleAm: titleAm || title,
    description,
    descriptionAm: descriptionAm || description,
    location,
    locationAm: locationAm || location,
    price: parseFloat(price),
    area: area || `${areaValue || 0} ${areaUnit || 'sqm'}`,
    areaValue: areaValue || 0,
    areaUnit: areaUnit || 'sqm',
    type: type || 'residential',
    status: status || 'pending',
    image: image || 'https://via.placeholder.com/400x300?text=No+Image',
    images: images || [image],
    seller,
    sellerAm: sellerAm || seller,
    sellerContact,
    sellerEmail,
    sellerId: sellerId || `USR-${String(listings.length + 1).padStart(3, '0')}`,
    views: 0,
    likes: 0,
    features: features || [],
    featuresAm: featuresAm || features || [],
    documents: documents || [],
    documentsAm: documentsAm || [],
    postedDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    verified: false,
    coordinates: { lat: 11.5742, lng: 37.3614 },
    nearbyAmenities: [],
    nearbyAmenitiesAm: [],
    propertyTax: propertyTax || 0,
    zoning: zoning || 'Residential',
    zoningAm: zoningAm || 'መኖሪያ',
    hasElectricity: hasElectricity || false,
    hasWater: hasWater || false,
    hasSewage: hasSewage || false,
    hasRoad: hasRoad || false,
    rating: 0,
    reviews: 0,
    bedrooms: bedrooms || null,
    bathrooms: bathrooms || null,
    parkingSpaces: parkingSpaces || null,
    floorLevel: floorLevel || null,
    totalFloors: totalFloors || null,
    yearBuilt: new Date().getFullYear()
  };
  
  listings.push(newListing);
  
  res.status(201).json({
    message: 'Listing created successfully',
    listing: newListing
  });
});

// Update listing (PUT)
router.put('/listings/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const index = listings.findIndex(l => l.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  
  const updatedListing = {
    ...listings[index],
    ...req.body,
    id: listings[index].id,
    updatedAt: new Date().toISOString()
  };
  
  listings[index] = updatedListing;
  
  res.json({
    message: 'Listing updated successfully',
    listing: updatedListing
  });
});

// Delete listing (DELETE)
router.delete('/listings/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const index = listings.findIndex(l => l.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  
  const deletedListing = listings[index];
  listings.splice(index, 1);
  
  res.json({
    message: 'Listing deleted successfully',
    listing: deletedListing
  });
});

// Update listing status (approve/reject)
router.put('/listings/:id/status', verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const index = listings.findIndex(l => l.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  
  listings[index].status = status;
  
  if (status === 'active') {
    listings[index].verified = true;
    listings[index].verifiedBy = req.user.email;
    listings[index].verifiedByAm = req.user.email;
    listings[index].verifiedDate = new Date().toISOString().split('T')[0];
  }
  
  res.json({
    message: `Listing ${status === 'active' ? 'approved' : (status === 'rejected' ? 'rejected' : 'updated')}`,
    listing: listings[index]
  });
});

// Get marketplace statistics
router.get('/stats', verifyAdmin, (req, res) => {
  const totalListings = listings.length;
  const activeListings = listings.filter(l => l.status === 'active').length;
  const pendingListings = listings.filter(l => l.status === 'pending').length;
  const soldListings = listings.filter(l => l.status === 'sold').length;
  const featuredListings = listings.filter(l => l.status === 'featured').length;
  const totalValue = listings.reduce((sum, l) => sum + l.price, 0);
  
  // Group by type
  const byType = {
    residential: listings.filter(l => l.type === 'residential').length,
    commercial: listings.filter(l => l.type === 'commercial').length,
    agricultural: listings.filter(l => l.type === 'agricultural').length,
    mixedUse: listings.filter(l => l.type === 'mixedUse').length,
    industrial: listings.filter(l => l.type === 'industrial').length
  };
  
  // Recent activity
  const recentActivities = listings
    .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    .slice(0, 5)
    .map(l => ({
      id: l.id,
      title: l.title,
      action: 'New listing added',
      date: l.postedDate
    }));
  
  res.json({
    totalListings,
    activeListings,
    pendingListings,
    soldListings,
    featuredListings,
    totalValue,
    byType,
    recentActivities
  });
});

// Bulk update status (for multiple listings)
router.post('/listings/bulk-status', verifyAdmin, (req, res) => {
  const { listingIds, status } = req.body;
  
  if (!listingIds || !Array.isArray(listingIds) || listingIds.length === 0) {
    return res.status(400).json({ error: 'listingIds array required' });
  }
  
  const updatedIds = [];
  
  for (const id of listingIds) {
    const index = listings.findIndex(l => l.id === parseInt(id));
    if (index !== -1) {
      listings[index].status = status;
      updatedIds.push(parseInt(id));
    }
  }
  
  res.json({
    message: `${updatedIds.length} listings updated to ${status}`,
    updatedIds
  });
});

// Get marketplace analytics
router.get('/analytics', verifyAdmin, (req, res) => {
  const { period = 'month' } = req.query;
  
  // Calculate analytics based on period
  const now = new Date();
  let startDate;
  
  switch (period) {
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(now.setMonth(now.getMonth() - 1));
  }
  
  const recentListings = listings.filter(l => new Date(l.postedDate) >= startDate);
  
  res.json({
    period,
    totalListingsThisPeriod: recentListings.length,
    totalValueThisPeriod: recentListings.reduce((sum, l) => sum + l.price, 0),
    averagePrice: recentListings.length > 0 
      ? recentListings.reduce((sum, l) => sum + l.price, 0) / recentListings.length 
      : 0,
    totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    totalLikes: listings.reduce((sum, l) => sum + l.likes, 0),
    mostViewed: [...listings].sort((a, b) => b.views - a.views).slice(0, 5),
    mostLiked: [...listings].sort((a, b) => b.likes - a.likes).slice(0, 5)
  });
});

module.exports = router;