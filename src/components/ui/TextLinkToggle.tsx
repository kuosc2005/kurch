import Link from "next/link";

interface TextLinkToggleProps {
  prompt?: string;
  linkText: string;
  to: string;
  className?: string;
}

export default function TextLinkToggle({
  prompt,
  linkText,
  to,
  className,
}: TextLinkToggleProps) {
  return (
    <div className={`w-[90%] text-center ${className}`}>
      <span className="text-sm text-gray-600 ">
        {prompt ? `${prompt} ` : ""}
        <Link
          href={to}
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          <span className="underline"> {linkText}</span>
        </Link>
      </span>
    </div>
  );
}
