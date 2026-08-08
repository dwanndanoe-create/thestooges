"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { InputField } from "@/components/ui/InputField";

import { AuthShell } from "@/components/auth/AuthShell";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { AuthFormHeader } from "@/components/auth/AuthFormHeader";
import { GoogleMark } from "@/components/auth/GoogleMark";


export default function SignupPage() {


const router = useRouter();


const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);

const [touched,setTouched] = useState(false);
const [submitting,setSubmitting] = useState(false);



const emailValid =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const emailError =
touched && email.length > 0 && !emailValid
? "Enter a valid email address"
: undefined;


const passwordError =
touched && password.length > 0 && password.length < 8
? "Use at least 8 characters"
: undefined;



function handleSubmit(e:FormEvent){

e.preventDefault();

setTouched(true);


if(
name.length < 2 ||
!emailValid ||
password.length < 8
) return;


setSubmitting(true);


setTimeout(()=>{

setSubmitting(false);

router.push("/dashboard");

},800);


}




return (

<AuthShell
reverse
brand={
<AuthBrandPanel mode="signup"/>
}
>


<motion.div

initial={{
opacity:0,
y:14
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

className="
w-full
max-w-95
mx-auto
py-10
"

>


<AuthFormHeader

eyebrow="Welcome · Create your profile"

title="Join Microjobs.sr"

description={
<>
Already have an account?{" "}
<Link
href="/login"
className="
text-emerald-700
font-medium
hover:text-emerald-900
"
>
Log in
</Link>
</>
}

/>



<div
className="
flex
flex-col
gap-3
mb-6
"
>

<button

type="button"

className="
inline-flex
items-center
justify-center
gap-2.5
h-11
rounded-[10px]
border
border-line-strong
text-[14px]
font-medium
text-ink
hover:bg-bg-sunken
transition
"

>

<GoogleMark/>

Continue with Google

</button>


</div>



<div className="flex items-center gap-3 mb-6">

<div className="hairline flex-1"/>

<span
className="
text-[12px]
text-ink-faint
font-mono
"
>
or
</span>

<div className="hairline flex-1"/>

</div>





<form
onSubmit={handleSubmit}
className="
flex
flex-col
gap-4
"
>


<InputField

label="Full name"

name="name"

placeholder="Your name"

icon={<User size={16}/>}

value={name}

onChange={(e)=>setName(e.target.value)}

required

/>




<InputField

label="Email"

type="email"

name="email"

placeholder="you@example.com"

icon={<Mail size={16}/>}

value={email}

onChange={(e)=>setEmail(e.target.value)}

onBlur={()=>setTouched(true)}

error={emailError}

required

/>





<InputField

label="Password"

type={showPassword ? "text":"password"}

name="password"

placeholder="••••••••"

icon={<Lock size={16}/>}

value={password}

onChange={(e)=>setPassword(e.target.value)}

onBlur={()=>setTouched(true)}

error={passwordError}

required


trailing={

<button

type="button"

onClick={()=>setShowPassword(v=>!v)}

className="
text-ink-faint
hover:text-ink
"

>

{
showPassword
?
<EyeOff size={16}/>
:
<Eye size={16}/>
}

</button>

}

/>





<Magnetic strength={8}>

<Button

type="submit"

variant="primary"

size="lg"

className="w-full mt-2"

disabled={submitting}

>

{
submitting
?
"Creating account..."
:
"Create account"
}


{
!submitting &&
<ArrowRight size={16}/>
}


</Button>


</Magnetic>



</form>



<p
className="
text-[12.5px]
text-ink-faint
leading-relaxed
mt-8
"
>

By continuing, you agree to Microjobs.sr's{" "}

<Link href="#" className="underline">
Terms of Service
</Link>

{" "}and{" "}

<Link href="#" className="underline">
Privacy Policy
</Link>

.

</p>



</motion.div>


</AuthShell>

);

}