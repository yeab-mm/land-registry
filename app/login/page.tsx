// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ShieldCheckIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// API URL - change this to your backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Call your backend API
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok && data.token) {
        // Save to localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', data.user.email)
        localStorage.setItem('userRole', data.user.role)
        localStorage.setItem('userName', data.user.fullName)
        localStorage.setItem('token', data.token)
        
        // Save remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }
        
        toast.success(`Welcome ${data.user.fullName}!`)
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/admin')
        } else if (data.user.role === 'officer') {
          router.push('/officer')
        } else {
          router.push('/dashboard')
        }
      } else {
        toast.error(data.error || 'Invalid credentials')
        setLoading(false)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Cannot connect to server. Make sure backend is running on port 5000')
      setLoading(false)
    }
  }

  // Load remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }))
    }
  }, [])

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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-green-100">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <label htmlFor="remember" className="text-sm text-green-200">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-green-200 hover:text-white font-medium">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Login'
            )}
          </button>

          <p className="text-center text-green-200">
            Don't have an account?{' '}
            <Link href="/register" className="text-white hover:text-green-100 font-medium">
              Register
            </Link>
          </p>

          <div className="text-center">
            <Link href="/guest" className="text-sm text-green-300 hover:text-white">
              Continue as Guest
            </Link>
          </div>
        </form>

        <p className="mt-6 text-xs text-center text-green-300">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}