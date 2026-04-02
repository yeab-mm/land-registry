// app/contact/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useLanguage } from '@/lib/LanguageContext'

export default function ContactPage() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'am')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(language === 'en' ? 'Please fill in required fields' : 'እባክዎ አስፈላጊ መስኮችን ይሙሉ')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast.success(language === 'en' ? 'Message sent successfully!' : 'መልእክት በተሳካ ሁኔታ ተልኳል!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  // Simplified content object
  const content = {
    en: {
      brand: 'Digital',
      brandSpan: 'Land',
      back: 'Back to Home',
      badge: 'Contact Us',
      title: 'Get in Touch',
      subtitle: 'Have questions? We\'re here to help you with any inquiries about our services.',
      phoneSupport: 'Phone Support',
      email: 'Email',
      mainOffice: 'Main Office',
      officeHours: 'Mon-Fri, 8:00 - 17:00',
      emailResponse: '24/7 Email Response',
      appointmentRequired: 'Appointment required',
      sendMessage: 'Send us a Message',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your name',
      emailAddress: 'Email Address',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'Phone Number',
      phonePlaceholder: '+251 91 234 5678',
      optional: 'Optional',
      subject: 'Subject',
      selectSubject: 'Select a subject',
      general: 'General Inquiry',
      verification: 'Land Verification',
      marketplace: 'Marketplace',
      payment: 'Payment Issues',
      technical: 'Technical Support',
      message: 'Message',
      messagePlaceholder: 'Type your message here...',
      sending: 'Sending...',
      send: 'Send Message',
      quickAnswers: 'Looking for quick answers?',
      quickAnswersDesc: 'Check our Frequently Asked Questions section for instant help.',
      visitHelp: 'Visit Help Center',
      required: 'required'
    },
    am: {
      brand: 'ዲጂታል',
      brandSpan: 'መሬት',
      back: 'ወደ መነሻ ተመለስ',
      badge: 'ያግኙን',
      title: 'ግንኙነት ይፍጠሩ',
      subtitle: 'ጥያቄዎች አሉዎት? ስለ አገልግሎቶቻችን በማንኛውም ጥያቄ እርስዎን ለመርዳት እዚህ ነን።',
      phoneSupport: 'የስልክ ድጋፍ',
      email: 'ኢሜይል',
      mainOffice: 'ዋና ቢሮ',
      officeHours: 'ሰኞ-አርብ፣ 8:00 - 17:00',
      emailResponse: '24/7 የኢሜይል ምላሽ',
      appointmentRequired: 'ቀጠሮ ያስፈልጋል',
      sendMessage: 'መልእክት ላኩልን',
      fullName: 'ሙሉ ስም',
      fullNamePlaceholder: 'ስምዎን ያስገቡ',
      emailAddress: 'ኢሜይል አድራሻ',
      emailPlaceholder: 'you@example.com',
      phoneNumber: 'ስልክ ቁጥር',
      phonePlaceholder: '+251 91 234 5678',
      optional: 'አማራጭ',
      subject: 'ርዕስ',
      selectSubject: 'ርዕስ ይምረጡ',
      general: 'አጠቃላይ ጥያቄ',
      verification: 'የመሬት ማረጋገጫ',
      marketplace: 'ገበያ ቦታ',
      payment: 'የክፍያ ችግሮች',
      technical: 'ቴክኒካዊ ድጋፍ',
      message: 'መልእክት',
      messagePlaceholder: 'መልእክትዎን እዚህ ይተይቡ...',
      sending: 'በመላክ ላይ...',
      send: 'መልእክት ላክ',
      quickAnswers: 'ፈጣን መልሶችን ይፈልጋሉ?',
      quickAnswersDesc: 'ለፈጣን እርዳታ በተደጋጋሚ የሚጠየቁ ጥያቄዎች ክፍላችንን ይመልከቱ።',
      visitHelp: 'የእርዳታ ማዕከልን ይጎብኙ',
      required: 'የሚፈለግ'
    }
  }

  const t = content[language as keyof typeof content]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Green Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 pb-32">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
              <span className="text-2xl font-light text-white">
                {t.brand} <span className="font-semibold">{t.brandSpan}</span>
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
                {t.back}
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center px-4 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-green-100 mb-8">{t.subtitle}</p>
        </div>
      </div>

      {/* Content Section - White Card Overlay */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 pb-16">
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Phone Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <PhoneIcon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.phoneSupport}</h3>
            <p className="text-gray-600 mb-1">+251 912 345 678</p>
            <p className="text-gray-600 mb-3">+251 911 234 567</p>
            <div className="flex items-center text-sm text-green-600">
              <ClockIcon className="w-4 h-4 mr-1" />
              {t.officeHours}
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <EnvelopeIcon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.email}</h3>
            <p className="text-gray-600 mb-1">support@digitalland.gov.et</p>
            <p className="text-gray-600 mb-3">info@digitalland.gov.et</p>
            <div className="flex items-center text-sm text-green-600">
              <ClockIcon className="w-4 h-4 mr-1" />
              {t.emailResponse}
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <BuildingOfficeIcon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.mainOffice}</h3>
            <p className="text-gray-600 mb-1">Bahir Dar Institute of Technology</p>
            <p className="text-gray-600 mb-3">Bahir Dar, Ethiopia</p>
            <div className="flex items-center text-sm text-green-600">
              <MapPinIcon className="w-4 h-4 mr-1" />
              {t.appointmentRequired}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.sendMessage}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.fullName} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.emailAddress} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.phoneNumber} <span className="text-gray-400">({t.optional})</span>
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.phonePlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.subject}
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">{t.selectSubject}</option>
                  <option value="general">{t.general}</option>
                  <option value="verification">{t.verification}</option>
                  <option value="marketplace">{t.marketplace}</option>
                  <option value="payment">{t.payment}</option>
                  <option value="technical">{t.technical}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.message} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t.sending}
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                  {t.send}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Center Link */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.quickAnswers}</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{t.quickAnswersDesc}</p>
          <Link
            href="/help"
            className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-xl font-semibold border-2 border-green-600 hover:bg-green-50 transition-all shadow-md"
          >
            {t.visitHelp}
          </Link>
        </div>
      </div>
    </div>
  )
}