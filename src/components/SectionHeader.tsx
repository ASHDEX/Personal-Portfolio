interface SectionHeaderProps {
  tag?: string;
  title: string;
}

export default function SectionHeader({
  tag = "MODULE",
  title,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-7 pb-3 border-b border-[#1b2430]">
      <span className="text-[10px] tracking-[2px] uppercase text-[#0a0e14] bg-[#00ff9c] px-2.5 py-0.5 font-semibold">
        {tag}
      </span>
      <span className="text-[13px] text-[#6e7a88] tracking-wider">
        {title}
      </span>
    </div>
  );
}
