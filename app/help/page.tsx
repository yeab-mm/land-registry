// app/help/page.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  ShieldCheckIcon, 
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  LifebuoyIcon,
  UserIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/lib/LanguageContext'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export default function HelpPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  // FAQ Categories
  const categories = [
    { id: 'all', name: language === 'en' ? 'All Categories' : 'ሁሉም ምድቦች', icon: BookOpenIcon },
    { id: 'account', name: language === 'en' ? 'Account & Registration' : 'መለያ እና ምዝገባ', icon: UserIcon },
    { id: 'verification', name: language === 'en' ? 'Land Verification' : 'የመሬት ማረጋገጫ', icon: ShieldCheckIcon },
    { id: 'marketplace', name: language === 'en' ? 'Marketplace' : 'ገበያ ቦታ', icon: ShoppingBagIcon },
    { id: 'payment', name: language === 'en' ? 'Payments' : 'ክፍያዎች', icon: CurrencyDollarIcon },
    { id: 'transfer', name: language === 'en' ? 'Ownership Transfer' : 'የባለቤትነት ሽግግር', icon: ArrowPathIcon }
  ]

  // FAQ Items
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: language === 'en' ? 'How do I create an account?' : 'መለያ እንዴት መፍጠር እችላለሁ?',
      answer: language === 'en' 
        ? 'To create an account, click on the "Create Account" button on the homepage. You will need to provide your full name, Kebele ID, phone number, and email address. After submitting the form, you will receive an OTP via SMS to verify your identity.'
        : 'መለያ ለመፍጠር በመነሻ ገጽ ላይ "መለያ ይፍጠሩ" የሚለውን ቁልፍ ይጫኑ። ሙሉ ስምዎን፣ የቀበሌ መታወቂያ ቁጥርዎን፣ ስልክ ቁጥርዎን እና ኢሜይል አድራሻዎን ማስገባት ያስፈልግዎታል። ቅጹን ካስገቡ በኋላ ማንነትዎን ለማረጋገጥ በኤስኤምኤስ አማካኝነት ኦቲፒ ይደርስዎታል።',
      category: 'account'
    },
    {
      id: '2',
      question: language === 'en' ? 'What documents are required for land verification?' : 'ለመሬት ማረጋገጫ ምን ሰነዶች ያስፈልጋሉ?',
      answer: language === 'en'
        ? 'For land verification, you need to upload: 1) Original land title deed (Sened), 2) Kebele ID card, 3) Recent tax payment receipt, 4) Site map/plot location. All documents should be in PDF, JPEG, or PNG format and must be clear and legible.'
        : 'ለመሬት ማረጋገጫ የሚከተሉትን ሰነዶች መጫን ያስፈልግዎታል፦ 1) ዋናው የመሬት ይዞታ ሰነድ (ሰነድ)፣ 2) የቀበሌ መታወቂያ ካርድ፣ 3) የቅርብ ጊዜ የግብር ክፍያ ደረሰኝ፣ 4) የቦታው ካርታ/የመሬቱ አቀማመጥ። ሁሉም ሰነዶች በPDF፣ JPEG፣ ወይም PNG ቅርጸት መሆን አለባቸው እና ግልጽ እና ሊነበቡ የሚችሉ መሆን አለባቸው።',
      category: 'verification'
    },
    {
      id: '3',
      question: language === 'en' ? 'How long does the verification process take?' : 'የማረጋገጫ ሂደቱ ምን ያህል ጊዜ ይወስዳል?',
      answer: language === 'en'
        ? 'The verification process typically takes 3-5 business days. You can track the status of your verification request in real-time through your dashboard. You will receive SMS and email notifications at each stage of the process.'
        : 'የማረጋገጫ ሂደቱ በተለምዶ ከ3-5 የስራ ቀናት ይወስዳል። የማረጋገጫ ጥያቄዎን ሁኔታ በእውነተኛ ጊዜ በዳሽቦርድዎ በኩል መከታተል ይችላሉ። በእያንዳንዱ የሂደቱ ደረጃ በኤስኤምኤስ እና በኢሜይል ማሳወቂያዎች ይደርስዎታል።',
      category: 'verification'
    },
    {
      id: '4',
      question: language === 'en' ? 'How do I list my land for sale in the marketplace?' : 'መሬቴን በገበያ ቦታ ለሽያጭ እንዴት ማቅረብ እችላለሁ?',
      answer: language === 'en'
        ? 'Only verified land can be listed for sale. Go to "My Lands" dashboard, select the verified land you want to sell, click "Sell This Land", and fill in the listing details including price, description, and upload photos. The listing will be reviewed by a land officer before being published.'
        : 'የተረጋገጠ መሬት ብቻ ለሽያጭ መቅረብ ይችላል። ወደ "የእኔ መሬቶች" ዳሽቦርድ ይሂዱ፣ ለመሸጥ የሚፈልጉትን የተረጋገጠ መሬት ይምረጡ፣ "ይህን መሬት ሽጥ" የሚለውን ይጫኑ እና ዋጋን፣ መግለጫን ጨምሮ የዝርዝር መረጃዎችን ይሙሉ እና ፎቶዎችን ይጫኑ። ዝርዝሩ ከመታተሙ በፊት በመሬት ኦፊሰር ይገመገማል።',
      category: 'marketplace'
    },
    {
      id: '5',
      question: language === 'en' ? 'What payment methods are accepted?' : 'ምን ዓይነት የክፍያ ዘዴዎች ተቀባይነት አላቸው?',
      answer: language === 'en'
        ? 'The system accepts payments through Ethiopian financial systems: TeleBirr, CBE Birr, and EthSwitch (bank transfers). All payments are secure and generate digital receipts with unique transaction IDs.'
        : 'ስርዓቱ በኢትዮጵያ የፋይናንስ ስርዓቶች አማካኝነት ክፍያዎችን ይቀበላል፦ ቴሌብር፣ ሲቢኢ ብር፣ እና ኢትስዊች (የባንክ ዝውውር)። ሁሉም ክፍያዎች ደህንነታቸው የተጠበቀ እና ልዩ የግብይት መታወቂያ ያላቸው ዲጂታል ደረሰኞችን ያመነጫሉ።',
      category: 'payment'
    },
    {
      id: '6',
      question: language === 'en' ? 'How do I transfer ownership of my land?' : 'የመሬቴን ባለቤትነት እንዴት ማስተላለፍ እችላለሁ?',
      answer: language === 'en'
        ? 'To transfer ownership, go to the land details page, select "Request Ownership Transfer", enter the buyer\'s details, upload required legal documents (sale agreement, tax clearance), and pay the transfer fee. The request will be reviewed by a land officer and approved upon validation.'
        : 'ባለቤትነትን ለማስተላለፍ ወደ መሬት ዝርዝሮች ገጽ ይሂዱ፣ "የባለቤትነት ሽግግር ጠይቅ" የሚለውን ይምረጡ፣ የገዢውን ዝርዝሮች ያስገቡ፣ አስፈላጊ የህግ ሰነዶችን (የሽያጭ ውል፣ የግብር ማረጋገጫ) ይጫኑ እና የሽግግር ክፍያውን ይክፈሉ። ጥያቄው በመሬት ኦፊሰር ይገመገማል እና ትክክለኛነቱ ከተረጋገጠ በኋላ ይፀድቃል።',
      category: 'transfer'
    },
    {
      id: '7',
      question: language === 'en' ? 'What should I do if I forget my password?' : 'የይለፍ ቃሌን ብረሳ ምን ማድረግ አለብኝ?',
      answer: language === 'en'
        ? 'Click on "Forgot Password" on the login page. Enter your registered email or phone number. You will receive an OTP to reset your password. Follow the instructions to create a new strong password.'
        : 'በመግቢያ ገጽ ላይ "የይለፍ ቃል ረሳሁ" የሚለውን ይጫኑ። የተመዘገበ ኢሜይልዎን ወይም ስልክ ቁጥርዎን ያስገቡ። የይለፍ ቃልዎን እንደገና ለማስጀመር ኦቲፒ ይደርስዎታል። አዲስ ጠንካራ የይለፍ ቃል ለመፍጠር መመሪያዎቹን ይከተሉ።',
      category: 'account'
    },
    {
      id: '8',
      question: language === 'en' ? 'How can I track my application status?' : 'የማመልከቻዬን ሁኔታ እንዴት መከታተል እችላለሁ?',
      answer: language === 'en'
        ? 'Log in to your account and navigate to "My Applications" dashboard. You will see a list of all your submitted applications with their current status (Pending, Under Review, Approved, Rejected). Click on any application to view detailed status history and officer comments.'
        : 'ወደ መለያዎ ይግቡ እና ወደ "የእኔ ማመልከቻዎች" ዳሽቦርድ ይሂዱ። ሁሉንም ያስገቧቸውን ማመልከቻዎች ከአሁኑ ሁኔታቸው ጋር (በመጠባበቅ ላይ፣ በግምገማ ላይ፣ ጸድቋል፣ ውድቅ ተደርጓል) ያያሉ። ዝርዝር የሁኔታ ታሪክ እና የኦፊሰር አስተያየቶችን ለማየት በማንኛውም ማመልከቻ ላይ ጠቅ ያድርጉ።',
      category: 'verification'
    }
  ]

  // Filter FAQs based on search and category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Green Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 pb-32">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
              <span className="text-2xl font-light text-white">
                {language === 'en' ? 'Digital' : 'ዲጂታል'} <span className="font-semibold">
                  {language === 'en' ? 'Land' : 'መሬት'}
                </span>
              </span>
            </div>
            <Link 
              href="/" 
              className="flex items-center text-white hover:text-green-100 transition-colors bg-white/10 px-4 py-2 rounded-lg"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back to Home' : 'ወደ መነሻ ተመለስ'}
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center px-4 mt-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <LifebuoyIcon className="h-5 w-5 text-white mr-2" />
            <span className="text-sm font-medium text-white">
              {language === 'en' ? 'Help Center' : 'የእርዳታ ማዕከል'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'en' ? 'How can we help you?' : 'እንዴት ልንረዳዎ እንችላለን?'}
          </h1>
          <p className="text-xl text-green-100 mb-8">
            {language === 'en'
              ? 'Find answers to common questions about land verification, marketplace, payments, and more.'
              : 'ስለ መሬት ማረጋገጫ፣ ገበያ ቦታ፣ ክፍያዎች እና ሌሎችም ለሚጠየቁ የተለመዱ ጥያቄዎች መልስ ያግኙ።'}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search for help...' : 'እርዳታ ይፈልጉ...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Content Section - White Card Overlay */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 pb-16">
        {/* Category Pills */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2 ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-500'
                  }`} />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'No results found' : 'ምንም ውጤት አልተገኘም'}
              </h3>
              <p className="text-gray-500">
                {language === 'en'
                  ? 'Try adjusting your search or filter to find what you\'re looking for.'
                  : 'የሚፈልጉትን ለማግኘት ፍለጋዎን ወይም ማጣሪያዎን ለማስተካከል ይሞክሩ።'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredFAQs.map((item) => (
                <div
                  key={item.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === item.id ? null : item.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between"
                  >
                    <span className="text-lg font-medium text-gray-900">{item.question}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFAQ === item.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === item.id && (
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4 bg-green-50/30">
                      <div className="flex items-start">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Still need help?' : 'አሁንም እርዳታ ያስፈልግዎታል?'}
            </h2>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Can\'t find what you\'re looking for? Our support team is here to help.'
                : 'የሚፈልጉትን ማግኘት አልቻሉም? የድጋፍ ቡድናችን ለመርዳት ዝግጁ ነው።'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/contact?subject=general"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === 'en' ? 'Live Chat' : 'የቀጥታ ውይይት'}
              </h3>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Chat with our support team' : 'ከድጋፍ ቡድናችን ጋር ይወያዩ'}
              </p>
            </Link>

            <Link 
              href="/contact"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <EnvelopeIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === 'en' ? 'Email Us' : 'ኢሜይል ይላኩልን'}
              </h3>
              <p className="text-sm text-gray-500">support@digitalland.gov.et</p>
            </Link>

            <Link 
              href="/contact"
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <PhoneIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {language === 'en' ? 'Call Us' : 'ደውልልን'}
              </h3>
              <p className="text-sm text-gray-500">+251 912 345 678</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}