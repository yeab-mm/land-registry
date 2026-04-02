// app/about/page.tsx
'use client'

import Link from 'next/link'
import { 
  ShieldCheckIcon,
  InformationCircleIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  ClockIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/lib/LanguageContext'

export default function AboutPage() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'am')
  }

  // Content based on language
  const content = {
    en: {
      brand: 'Digital',
      brandSpan: 'Land',
      back: 'Back to Home',
      badge: 'About Us',
      title: 'Digital Land Citizen Portal',
      subtitle: 'Ethiopia\'s secure and transparent platform for land ownership verification and property marketplace.',
      mission: 'Our Mission',
      missionText: 'To modernize Ethiopia\'s land administration by providing a secure, transparent, and efficient digital platform that empowers citizens to verify ownership, manage land records, and conduct property transactions with confidence.',
      vision: 'Our Vision',
      visionText: 'To be Ethiopia\'s trusted digital foundation for land governance, creating a future where every citizen can access, verify, and transact land with ease, contributing to sustainable urban development and economic growth.',
      services: 'Our Services',
      servicesDesc: 'What We Offer',
      servicesSub: 'Comprehensive digital solutions for all your land administration needs',
      verification: 'Land Verification',
      verificationDesc: 'Verify land ownership and title authenticity through our secure digital registry.',
      marketplace: 'Land Marketplace',
      marketplaceDesc: 'Browse, list, and purchase verified land properties in a transparent marketplace.',
      payments: 'Digital Payments',
      paymentsDesc: 'Secure payment processing through TeleBirr, CBE Birr, and EthSwitch.',
      certificates: 'Digital Certificates',
      certificatesDesc: 'Generate and download digital land ownership certificates with QR codes.',
      citizenPortal: 'Citizen Portal',
      citizenPortalDesc: 'Personal dashboard to manage your land records and track application status.',
      officerPortal: 'Officer Portal',
      officerPortalDesc: 'Dedicated interface for land officers to process verifications and transfers.',
      whyChoose: 'Why Choose Digital Land',
      whyChooseDesc: 'Secure, transparent, and efficient land administration for all Ethiopians',
      secure: 'Secure',
      secureDesc: 'Bank-level encryption',
      transparent: 'Transparent',
      transparentDesc: 'Real-time tracking',
      efficient: 'Efficient',
      efficientDesc: '3-5 day processing',
      accessible: 'Accessible',
      accessibleDesc: 'Web & mobile access',
      registeredUsers: 'Registered Users',
      verifiedLands: 'Verified Lands',
      transactions: 'Transactions',
      satisfaction: 'Satisfaction',
      ready: 'Ready to get started?',
      readyDesc: 'Create an account today and experience secure, transparent land administration.',
      createAccount: 'Create Account',
      contactUs: 'Contact Us'
    },
    am: {
      brand: 'ዲጂታል',
      brandSpan: 'መሬት',
      back: 'ወደ መነሻ ተመለስ',
      badge: 'ስለ እኛ',
      title: 'ዲጂታል የመሬት ዜጋ መግቢያ',
      subtitle: 'የኢትዮጵያ ደህንነቱ የተጠበቀ እና ግልጽ የሆነ የመሬት ባለቤትነት ማረጋገጫ እና የንብረት ገበያ ቦታ።',
      mission: 'ተልዕኮአችን',
      missionText: 'የኢትዮጵያን የመሬት አስተዳደር ደህንነቱ የተጠበቀ፣ ግልጽ እና ቀልጣፋ ዲጂታል መድረክ በማቅረብ ዜጎች ባለቤትነትን እንዲያረጋግጡ፣ የመሬት መዝገቦችን እንዲያስተዳድሩ እና የንብረት ግብይቶችን በልበ ሙሉነት እንዲፈጽሙ ማስቻል።',
      vision: 'ራዕያችን',
      visionText: 'ለመሬት አስተዳደር የኢትዮጵያ አስተማማኝ ዲጂታል መሠረት ለመሆን፣ እያንዳንዱ ዜጋ በቀላሉ መሬት ማግኘት፣ ማረጋገጥ እና ግብይት የሚችልበትን የወደፊት ሁኔታ መፍጠር፣ ለዘላቂ የከተማ ልማት እና ኢኮኖሚያዊ እድገት አስተዋፅዖ ማድረግ።',
      services: 'አገልግሎቶቻችን',
      servicesDesc: 'የምንሰጠው አገልግሎት',
      servicesSub: 'ለሁሉም የመሬት አስተዳደር ፍላጎቶችዎ አጠቃላይ ዲጂታል መፍትሄዎች',
      verification: 'የመሬት ማረጋገጫ',
      verificationDesc: 'በአስተማማኝ ዲጂታል መዝገብ በኩል የመሬት ባለቤትነት እና የይዞታ ሰነድ ትክክለኛነት ያረጋግጡ።',
      marketplace: 'የመሬት ገበያ ቦታ',
      marketplaceDesc: 'ግልጽ በሆነ የገበያ ቦታ የተረጋገጡ የመሬት ንብረቶችን ይቃኙ፣ ይዘርዝሩ እና ይግዙ።',
      payments: 'ዲጂታል ክፍያዎች',
      paymentsDesc: 'በቴሌብር፣ ሲቢኢ ብር እና ኢትስዊች በኩል ደህንነቱ የተጠበቀ የክፍያ አፈፃፀም።',
      certificates: 'ዲጂታል ሰርተፊኬቶች',
      certificatesDesc: 'የዲጂታል መሬት ባለቤትነት ሰርተፊኬቶችን ከQR ኮድ ጋር ይፍጠሩ እና ያውርዱ።',
      citizenPortal: 'የዜጋ መግቢያ',
      citizenPortalDesc: 'የመሬት መዝገቦችዎን ለማስተዳደር እና የማመልከቻ ሁኔታን ለመከታተል የግል ዳሽቦርድ።',
      officerPortal: 'የኦፊሰር መግቢያ',
      officerPortalDesc: 'ማረጋገጫዎችን እና ዝውውሮችን ለማስኬድ ለመሬት ኦፊሰሮች የተዘጋጀ በይነገጽ።',
      whyChoose: 'ለምን ዲጂታል መሬት ይምረጡ',
      whyChooseDesc: 'ለሁሉም ኢትዮጵያውያን ደህንነቱ የተጠበቀ፣ ግልጽ እና ቀልጣፋ የመሬት አስተዳደር',
      secure: 'አስተማማኝ',
      secureDesc: 'የባንክ ደረጃ ምስጠራ',
      transparent: 'ግልጽ',
      transparentDesc: 'የእውነተኛ ጊዜ ክትትል',
      efficient: 'ቀልጣፋ',
      efficientDesc: 'ከ3-5 ቀናት ሂደት',
      accessible: 'ተደራሽ',
      accessibleDesc: 'የድር እና ሞባይል መዳረሻ',
      registeredUsers: 'የተመዘገቡ ተጠቃሚዎች',
      verifiedLands: 'የተረጋገጠ መሬቶች',
      transactions: 'ግብይቶች',
      satisfaction: 'እርካታ',
      ready: 'ለመጀመር ዝግጁ ነዎት?',
      readyDesc: 'ዛሬ መለያ ይፍጠሩ እና ደህንነቱ የተጠበቀ፣ ግልጽ የሆነ የመሬት አስተዳደር ይለማመዱ።',
      createAccount: 'መለያ ይፍጠሩ',
      contactUs: 'ያግኙን'
    }
  }

  const t = content[language]

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
              <div className="flex items-center space-x-2 mr-4 border-r border-white/30 pr-4">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="en" className="text-gray-900">English</option>
                  <option value="am" className="text-gray-900">አማርኛ</option>
                </select>
              </div>
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
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <InformationCircleIcon className="h-5 w-5 text-white mr-2" />
            <span className="text-sm font-medium text-white">{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-green-100 mb-8">{t.subtitle}</p>
        </div>
      </div>

      {/* Content Section - White Card Overlay */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 pb-16">
        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow group">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
              <SparklesIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-600 rounded-full mr-3"></span>
              {t.mission}
            </h2>
            <p className="text-gray-600 leading-relaxed">{t.missionText}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow group">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
              <GlobeAltIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-600 rounded-full mr-3"></span>
              {t.vision}
            </h2>
            <p className="text-gray-600 leading-relaxed">{t.visionText}</p>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-4">
              <BuildingOfficeIcon className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">{t.services}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.servicesDesc}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.servicesSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.verification}</h3>
              <p className="text-gray-600 text-sm">{t.verificationDesc}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <MapIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.marketplace}</h3>
              <p className="text-gray-600 text-sm">{t.marketplaceDesc}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.payments}</h3>
              <p className="text-gray-600 text-sm">{t.paymentsDesc}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.certificates}</h3>
              <p className="text-gray-600 text-sm">{t.certificatesDesc}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.citizenPortal}</h3>
              <p className="text-gray-600 text-sm">{t.citizenPortalDesc}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.officerPortal}</h3>
              <p className="text-gray-600 text-sm">{t.officerPortalDesc}</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 mb-12 text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">{t.whyChoose}</h2>
            <p className="text-green-100 max-w-2xl mx-auto">{t.whyChooseDesc}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <LockClosedIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{t.secure}</h3>
              <p className="text-sm text-green-100">{t.secureDesc}</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <GlobeAltIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{t.transparent}</h3>
              <p className="text-sm text-green-100">{t.transparentDesc}</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{t.efficient}</h3>
              <p className="text-sm text-green-100">{t.efficientDesc}</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{t.accessible}</h3>
              <p className="text-sm text-green-100">{t.accessibleDesc}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">15K+</div>
              <div className="text-sm text-gray-600">{t.registeredUsers}</div>
              <div className="w-12 h-1 bg-green-200 mx-auto mt-2"></div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">8K+</div>
              <div className="text-sm text-gray-600">{t.verifiedLands}</div>
              <div className="w-12 h-1 bg-green-200 mx-auto mt-2"></div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">₿45M+</div>
              <div className="text-sm text-gray-600">{t.transactions}</div>
              <div className="w-12 h-1 bg-green-200 mx-auto mt-2"></div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">{t.satisfaction}</div>
              <div className="w-12 h-1 bg-green-200 mx-auto mt-2"></div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-12 text-center border border-green-200">
          <HeartIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.ready}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t.readyDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
            >
              {t.createAccount}
            </Link>
            <Link
              href="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold border-2 border-green-600 hover:bg-green-50 transition-all shadow-md hover:shadow-lg"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}