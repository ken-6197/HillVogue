"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // Validation
    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting signup for:", email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone || "",
          },
        },
      });

      console.log("Signup response:", { data, error });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        setSuccess(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", data.user.email || "");
        localStorage.setItem("userName", name);
        localStorage.setItem("userPhone", phone);
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please check your connection.");
    }

    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: "google" | "facebook" | "instagram") => {
    setSocialLoading(provider);
    setError("");

    try {
      // For Instagram, we need to use the correct provider name
      const providerName = provider === "instagram" ? "instagram" : provider;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: providerName,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // For Instagram, we might need additional parameters
            ...(provider === "instagram" && {
              // Instagram might need specific scopes
              scope: 'user_profile,user_media',
            }),
          },
        },
      });

      console.log(`OAuth response for ${provider}:`, { data, error });

      if (error) {
        setError(error.message);
        setSocialLoading(null);
        return;
      }

      // The user will be redirected to the provider's login page
      // After successful login, they'll be redirected back to /auth/callback
      // The callback will handle the session creation
      
      // Store the provider for callback handling
      localStorage.setItem("oauthProvider", provider);
      
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`Failed to login with ${provider.charAt(0).toUpperCase() + provider.slice(1)}. Please try again.`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 to-accent/5 px-4 py-12">
      <Card className="w-full max-w-lg shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-4xl font-bold">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg border border-green-200 flex items-center gap-2">
                <Check className="h-4 w-4" />
                Account created successfully! Redirecting...
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 py-6 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number (Optional)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 py-6 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 py-6 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 py-6 text-base"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
              disabled={isLoading || success}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading || socialLoading !== null}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
              aria-label="Sign up with Google"
            >
              {socialLoading === "google" ? (
                <div className="w-8 h-8 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaGoogle className="h-8 w-8 text-[#4285F4]" />
              )}
            </button>
            
            <button
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading || socialLoading !== null}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
              aria-label="Sign up with Facebook"
            >
              {socialLoading === "facebook" ? (
                <div className="w-8 h-8 border-2 border-[#1877F2] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaFacebook className="h-8 w-8 text-[#1877F2]" />
              )}
            </button>
            
            <button
              onClick={() => handleSocialLogin("instagram")}
              disabled={isLoading || socialLoading !== null}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
              aria-label="Sign up with Instagram"
            >
              {socialLoading === "instagram" ? (
                <div className="w-8 h-8 border-2 border-[#E4405F] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaInstagram className="h-8 w-8 text-[#E4405F]" />
              )}
            </button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}