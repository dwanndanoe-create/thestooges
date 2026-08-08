"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { InputField } from "@/components/ui/InputField";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

import { AuthShell } from "@/components/auth/AuthShell";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { AuthFormHeader } from "@/components/auth/AuthFormHeader";
import { GoogleMark } from "@/components/auth/GoogleMark";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailError = touched && email.length > 0 && !emailValid ? "Enter a valid email address" : undefined;
  const passwordError = touched && password.length > 0 && password.length < 8 ? "Use at least 8 characters" : undefined;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!emailValid || password.length < 8) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 800);
  }
  //False data, im testing login flow
  return (
  <AuthShell
    brand={<AuthBrandPanel mode="login" />}
  >
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-95 mx-auto py-10"
    >
      <AuthFormHeader
        eyebrow="Odi baka! · Welcome back"
        title="Log in to your profile"
        description={
          <>
            New to Microjobs.sr?{" "}
            <Link
              href="/signup"
              className="text-emerald-700 font-medium hover:text-emerald-900"
            >
              Create a profile
            </Link>
          </>
        }
      />

      <div className="flex flex-col gap-3 mb-6">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2.5 h-11 rounded-[10px] border border-line-strong text-[14px] font-medium text-ink hover:bg-bg-sunken transition-colors"
        >
          <GoogleMark />
          Continue with Google
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="hairline flex-1" />
        <span className="text-[12px] text-ink-faint font-mono">or</span>
        <div className="hairline flex-1" />
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4"
      >
        <InputField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={emailError}
          required
        />

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          icon={<Lock size={16} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched(true)}
          error={passwordError}
          required
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-ink-faint hover:text-ink transition-colors"
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          }
        />

        <div className="flex items-center justify-between -mt-1">
          <label className="inline-flex items-center gap-2 text-[13.5px] text-ink-muted cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-700"
            />
            Remember me
          </label>

          <Link
            href="#"
            className="text-[13.5px] font-medium text-emerald-700 hover:text-emerald-900"
          >
            Forgot password?
          </Link>
        </div>

        <Magnetic strength={8}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Log in"}

            {!submitting && <ArrowRight size={16} />}
          </Button>
        </Magnetic>
      </form>

      <p className="text-[12.5px] text-ink-faint leading-relaxed mt-8">
        By continuing, you agree to Microjobs.sr's{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </motion.div>
  </AuthShell>
);
}
