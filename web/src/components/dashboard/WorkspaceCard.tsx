import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";


type WorkspaceCardProps = {
  title: string;
  count: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  href: string;
};


export function WorkspaceCard({
  title,
  count,
  description,
  items,
  icon: Icon,
  href,
}: WorkspaceCardProps) {


  return (
    <div
      className="
      bg-white
      border
      border-line
      rounded-2xl
      p-5
      flex
      flex-col
      min-h-[190px]
      hover:border-emerald-600
      transition
      "
    >


      {/* Header */}

      <div className="flex justify-between items-start">


        <div
          className="
          h-10
          w-10
          rounded-xl
          bg-emerald-50
          grid
          place-items-center
          "
        >

          <Icon
            size={20}
            className="text-emerald-700"
          />

        </div>


        <span
          className="
          text-xs
          font-mono
          text-emerald-700
          "
        >
          {count}
        </span>


      </div>




      <h3
        className="
        font-display
        text-lg
        text-ink
        mt-5
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
        {description}
      </p>




      {/* Preview items */}

      <div className="mt-4 space-y-2 flex-1">


        {
          items.slice(0,2).map(item=>(

            <div
              key={item}
              className="
              text-sm
              text-ink
              truncate
              "
            >

              • {item}

            </div>

          ))
        }


        {
          items.length === 0 && (

            <p
              className="
              text-sm
              text-ink-faint
              "
            >
              Nothing here yet
            </p>

          )
        }


      </div>




      <Link
        href={href}
        className="
        mt-4
        flex
        items-center
        gap-2
        text-sm
        font-medium
        text-emerald-700
        "
      >

        View details

        <ArrowRight size={14}/>

      </Link>


    </div>
  );
}