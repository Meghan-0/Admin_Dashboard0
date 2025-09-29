import React, { useState } from 'react';
import { Trophy, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-white/5" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and title */}
        <div className="text-center animate-fade-in">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-2xl animate-float">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-4xl font-bold text-white">
            Sportify Admin
          </h2>
          <p className="mt-2 text-lg text-white/80">
            Sign in to manage athlete talent assessments
          </p>
        </div>

        {/* Login form */}
        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
          <Card glass={true} className="p-8">
            <div className="space-y-6">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon={<Mail className="h-5 w-5" />}
                glass={true}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    icon={<Lock className="h-5 w-5" />}
                    glass={true}
                    required
                    className="pr-12"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white/60" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/60" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border border-white/30 backdrop-blur-sm text-white"
          >
            Sign in to Dashboard
          </Button>

          {/* Demo credentials */}
          <Card glass={true} className="p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Demo Credentials:</h3>
            <div className="space-y-2">
              <p className="text-sm text-white/80">
                Email: <code className="bg-white/20 px-2 py-1 rounded-lg text-white font-mono">admin@sportify.com</code>
              </p>
              <p className="text-sm text-white/80">
                Password: <code className="bg-white/20 px-2 py-1 rounded-lg text-white font-mono">admin123</code>
              </p>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Login;