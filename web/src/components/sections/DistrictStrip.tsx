import { MapPin } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { RiverDivider } from "@/components/ui/RiverDivider";
import { districts } from "@/data/site-data";

export function DistrictStrip() {
  return (
    <div className="border-y border-line bg-bg-raised">
      <RiverDivider />
      <div className="py-4">
        <Marquee
          items={districts.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-ink-muted"
            >
              <MapPin size={12} className="text-emerald-500" />
              {d}
            </span>
          ))}
        />
      </div>
    </div>
  );
}
