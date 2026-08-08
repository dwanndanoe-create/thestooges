"use client";


import {
 MessageSquare,
 Briefcase
} from "lucide-react";


export function ActivityPanel(){


return (

<div
className="
bg-bg-raised
border border-line
rounded-2xl
p-6
flex flex-col gap-4
"
>


<div
className="
flex items-center gap-3
text-ink-muted
"
>

<MessageSquare size={18}/>

No messages yet

</div>



<div
className="
flex items-center gap-3
text-ink-muted
"
>

<Briefcase size={18}/>

No applications yet

</div>



</div>

);


}