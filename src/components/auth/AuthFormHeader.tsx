type AuthFormHeaderProps = {
  eyebrow: string;
  title: string;
  description: React.ReactNode;
};


export function AuthFormHeader({
  eyebrow,
  title,
  description,
}: AuthFormHeaderProps) {


return (

<div>

<span
className="
font-mono
text-[12px]
uppercase
tracking-[0.14em]
text-emerald-700
"
>
{eyebrow}
</span>


<h1
className="
font-display
text-[30px]
leading-[1.1]
tracking-[-0.02em]
text-ink
mt-2
"
>
{title}
</h1>


<div
className="
text-[14.5px]
text-ink-muted
mt-2
mb-8
"
>
{description}
</div>


</div>

);


}