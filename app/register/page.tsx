// app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  UserIcon,
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ShieldCheckIcon,
  ArrowLeftIcon,
  PhoneIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    kebeleId: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.kebeleId || !formData.phoneNumber || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.agreeTerms) {
      toast.error('You must agree to the terms and conditions')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      toast.success('Registration successful! Please login.')
      router.push('/login')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Green Card */}
      <div className="max-w-md w-full bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl p-8 relative">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="absolute top-4 left-4 text-green-200 hover:text-white transition-colors"
          title="Back to Home"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheckIcon className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-green-100">Join Digital Land Portal today</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Kebele ID */}
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Kebele ID Number
            </label>
            <div className="relative">
              <IdentificationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="text"
                placeholder="Enter Your Kebele ID"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.kebeleId}
                onChange={(e) => setFormData({ ...formData, kebeleId: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="tel"
                placeholder="+251 91 234 5678"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full pl-10 pr-10 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-green-300 hover:text-white" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-green-300 hover:text-white" />
                )}
              </button>
            </div>
            <p className="text-xs text-green-200 mt-1">
              Minimum 8 characters with letters and numbers
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-10 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-green-300 hover:text-white" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-green-300 hover:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-2"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              required
            />
            <label htmlFor="terms" className="text-sm text-green-200">
              I agree to the{' '}
              <Link href="/terms" className="text-white hover:text-green-100 font-medium">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-white hover:text-green-100 font-medium">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-green-200">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-green-100 font-medium">
              Login
            </Link>
          </p>

          {/* Guest Link */}
          <div className="text-center">
            <Link href="/marketplace" className="text-sm text-green-300 hover:text-white">
              Continue as Guest
            </Link>
          </div>
        </form>

        {/* Terms Footer */}
        <p className="mt-6 text-xs text-center text-green-300">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}