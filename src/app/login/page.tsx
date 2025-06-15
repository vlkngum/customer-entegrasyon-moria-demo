"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      router.push('/');
    } else {
      setError('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden border border-black/10"> 
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 p-12 flex-col justify-between">
          <div className="space-y-6">
            <Image 
              src="/cmapps-logo.svg" 
              alt="CMApps Logo"
              width={200}
              height={60}
              className="brightness-0 invert"
            />
            <h2 className="text-3xl font-bold text-white">
              CMApps Müşteri Portalı
            </h2>
            <p className="text-blue-100">
              Tüm müşteri işlemlerinizi tek bir yerden yönetin.
            </p>
          </div>
          <div className="text-blue-100 text-sm">
            © 2025 CM Apps
          </div>
        </div>

        {/* Sağ taraf - Giriş Formu */}
        <div className="w-full md:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <div className="md:hidden mb-8">
              <Image 
                src="/cmapps-logo.svg" 
                alt="CMApps Logo"
                width={150}
                height={45}
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Hoş Geldiniz
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-md font-medium text-gray-700 mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-black/50 text-black"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-2">
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-black/50 text-black"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 