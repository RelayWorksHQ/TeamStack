import Link from "next/link";

export function Brand({ compact = false, light = false, small = false }) {
  return (
    <Link href="/" className={`flex items-center ${small ? "gap-2" : "gap-2.5"}`}>
      <span className={`relative block ${small ? "h-6 w-7" : "h-7 w-8"}`}>
        <span className={`absolute left-0 top-0 rounded-full bg-brand ${small ? "h-[5px] w-6" : "h-[6px] w-7"}`} />
        <span className={`absolute left-2 bg-blue-500 ${small ? "top-[8px] h-[5px] w-5 rounded-full" : "top-[10px] h-[6px] w-6 rounded-full"}`} />
        <span className={`absolute left-2 bg-blue-400 ${small ? "top-[16px] h-[4px] w-3 rounded-full" : "top-[20px] h-[5px] w-3 rounded-full"}`} />
      </span>
      {!compact && (
        <span className={`${small ? "text-[19px]" : "text-[22px]"} font-bold tracking-[-.04em] ${light ? "text-white" : "text-ink"}`}>
          Teamstack
        </span>
      )}
    </Link>
  );
}
