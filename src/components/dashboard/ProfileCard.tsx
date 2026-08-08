"use client";

import Link from "next/link";
import {
  MapPin,
  Edit3,
  Star,
} from "lucide-react";


export function ProfileCard() {


return (

<div
className="
bg-bg-raised
border border-line
rounded-2xl
p-6
"
>


{/* Header */}

<div
className="
flex items-center gap-4
"
>

<div
className="
h-14
w-14
rounded-full
bg-emerald-800
text-white
grid
place-items-center
font-display
font-semibold
text-lg
"
>
NL
</div>



<div>

<h2
className="
font-display
text-xl
text-ink
"
>
Nikhiel Lingard
</h2>


<p
className="
text-sm
text-ink-muted
"
>
Software Developer
</p>


</div>


</div>




{/* Location */}

<div
className="
flex items-center gap-2
mt-5
text-sm
text-ink-muted
"
>

<MapPin size={15}/>

Paramaribo, Suriname

</div>





{/* Skills */}

<div
className="
mt-5
"
>

<p
className="
text-xs
font-mono
uppercase
tracking-wider
text-ink-faint
mb-3
"
>
Skills
</p>


<div
className="
flex flex-wrap gap-2
"
>

{
[
"React",
"TypeScript",
"Tailwind",
"UI Design"
].map(skill=>(

<span
key={skill}
className="
px-3
py-1
rounded-full
bg-emerald-100
text-emerald-800
text-xs
"
>

{skill}

</span>

))

}

</div>


</div>





{/* Reputation */}

<div
className="
mt-6
pt-5
border-t
border-line
"
>


<div
className="
flex items-center gap-1
text-sm
font-medium
text-ink
"
>

<Star
size={15}
className="text-gold-600"
/>

4.9

</div>


<p
className="
text-xs
text-ink-faint
"
>
Community rating
</p>


</div>





{/* Action */}

<Link
href="/profile"
className="
mt-6
flex
items-center
justify-center
gap-2
h-10
rounded-xl
border
border-line-strong
text-sm
font-medium
text-ink
hover:bg-bg-sunken
transition
"
>

<Edit3 size={15}/>

Edit Profile

</Link>



</div>

);


}