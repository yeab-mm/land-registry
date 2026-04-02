'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  KeyIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function AddNewUserPage() {
  const router = useRouter();
  const { darkMode } = useLanguage();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    kebeleId: '',
    role: 'citizen',
    status: 'active',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const cn = (darkClass: string, lightClass: string): string => {
    return darkMode ? darkClass : lightClass;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = t('fullNameRequired');
    }
    if (!formData.email) {
      newErrors.email = t('emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('emailInvalid');
    }
    if (!formData.phone) {
      newErrors.phone = t('phoneRequired');
    }
    if (!formData.kebeleId) {
      newErrors.kebeleId = t('kebeleIdRequired');
    }
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordTooShort');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordsDoNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className={`text-2xl font-bold ${cn('text-white', 'text-gray-900')}`}>
          {t('addNewUser')}
        </h1>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5" />
          <span>{t('userCreatedSuccess')}</span>
        </div>
      )}

      {/* Form */}
      <div className={`${cn('bg-gray-800', 'bg-white')} rounded-xl shadow-sm p-6`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('fullName')} *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`
                    w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                    ${errors.fullName 
                      ? 'border-red-500' 
                      : cn('border-gray-600', 'border-gray-300')
                    }
                    ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900'
                    }
                  `}
                  placeholder={t('enterFullName')}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('email')} *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                    ${errors.email 
                      ? 'border-red-500' 
                      : cn('border-gray-600', 'border-gray-300')
                    }
                    ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900'
                    }
                  `}
                  placeholder={t('enterEmail')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('phone')} *
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`
                    w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                    ${errors.phone 
                      ? 'border-red-500' 
                      : cn('border-gray-600', 'border-gray-300')
                    }
                    ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900'
                    }
                  `}
                  placeholder={t('enterPhone')}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Kebele ID */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('kebeleId')} *
              </label>
              <div className="relative">
                <IdentificationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="kebeleId"
                  value={formData.kebeleId}
                  onChange={handleChange}
                  className={`
                    w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                    ${errors.kebeleId 
                      ? 'border-red-500' 
                      : cn('border-gray-600', 'border-gray-300')
                    }
                    ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900'
                    }
                  `}
                  placeholder={t('enterKebeleId')}
                />
              </div>
              {errors.kebeleId && (
                <p className="mt-1 text-sm text-red-500">{errors.kebeleId}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('role')} *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`
                  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                  ${cn('border-gray-600', 'border-gray-300')}
                  ${darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-900'
                  }
                `}
              >
                <option value="citizen">{t('citizen')}</option>
                <option value="officer">{t('officer')}</option>
                <option value="admin">{t('admin')}</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('status')} *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`
                  w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                  ${cn('border-gray-600', 'border-gray-300')}
                  ${darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-900'
                  }
                `}
              >
                <option value="active">{t('active')}</option>
                <option value="inactive">{t('inactive')}</option>
                <option value="pending">{t('pending')}</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('password')} *
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                    ${errors.password 
                      ? 'border-red-500' 
                      : cn('border-gray-600', 'border-gray-300')
                    }
                    ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900'
                    }
                  `}
                  placeholder={t('enterPassword')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${cn('text-gray-300', 'text-gray-700')}`}>
                {t('confirmPassword')} *
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`
                    w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
                    ${errors.confirmPassword 
                      ? 'border-red-500' 
                      : cn('border-gray-600', 'border-gray-300')
                    }
                    ${darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900'
                    }
                  `}
                  placeholder={t('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t ${cn('border-gray-700', 'border-gray-200')}">
            <Link
              href="/admin/users"
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {t('cancel')}
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('creating')}
                </>
              ) : (
                t('createUser')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}