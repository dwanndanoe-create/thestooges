"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AuthTransition } from "@/components/auth/AuthTransition";


type AuthShellProps = {
  children: React.ReactNode;
  brand: React.ReactNode;
  reverse?: boolean;
};


export function AuthShell({
  children,
  brand,
  reverse = false,
}: AuthShellProps) {


return (

<div
  className="
    min-h-screen
    grid
    lg:grid-cols-2
    bg-bg
  "
>


{/* FORM SIDE */}

<div
  className={`
    flex
    flex-col
    px-6
    sm:px-10
    lg:px-16
    py-8

    ${reverse ? "lg:order-2" : "lg:order-1"}
  `}
>


<Link
  href="/"
  className="
    inline-flex
    items-center
    gap-2
    w-fit
  "
>

<Image
  src="/mj-logo-v2.png"
  alt="Microjobs logo"
  width={80}
  height={80}
  priority
/>


<span
  className="
    font-display
    font-semibold
    text-[30px]
    text-ink
  "
>
Microjobs<span className="text-emerald-700">.sr</span>
</span>


</Link>



<div
  className="
    flex-1
    flex
    items-center
  "
>

<AuthTransition reverse={reverse}>
  {children}
</AuthTransition>


</div>



<Link
href="/"
className="
inline-flex
items-center
gap-1.5
text-[13px]
text-ink-muted
"
>

<ArrowLeft size={14}/>

Back to homepage

</Link>


</div>





{/* BRAND SIDE */}

<div
className={`
hidden
lg:block

${reverse ? "lg:order-1" : "lg:order-2"}

`}
>


<motion.div

layoutId="auth-brand-panel"

transition={{
  layout:{
    duration:0.7,
    ease:[0.22,1,0.36,1]
  }
}}

className="h-full"

>

{brand}

</motion.div>


</div>


</div>

);


}