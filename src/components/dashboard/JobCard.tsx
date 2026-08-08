"use client";

import { MapPin } from "lucide-react";

interface Job {
  id: string;
  title:string;
  description:string;
  company:string;
  location:string | null;
  skills:string[];
  budget:number | string;

}

interface JobCardProps {
  job: Job;
}

export function JobCard({job}:JobCardProps){

const {
  title,
  company,
  location,
  skills,
  budget
} = job;


return (

<div
className="
bg-bg-raised
border border-line
rounded-2xl
p-6
hover:shadow-md
transition
"
>


<h3
className="
font-display
text-lg
text-ink
"
>
{title}
</h3>



<p
className="
text-sm
text-ink-muted
mt-1
"
>
{company}
</p>



<div
className="
flex items-center gap-2
text-xs
text-ink-muted
mt-4
"
>

<MapPin size={13}/>

{location}

</div>



<div
className="
flex flex-wrap gap-2
mt-4
"
>

{
skills.map(skill=>(

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

<div
className="
mt-5
flex justify-between items-center
"
>

<span
className="
font-medium
text-ink
"
>
{budget.toLocaleString()} SRD
</span>


<button
className="
text-sm
text-emerald-700
font-medium
"
>
Apply →
</button>

</div>

</div>

);


}