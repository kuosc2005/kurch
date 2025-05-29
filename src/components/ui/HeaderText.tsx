interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  headerStyle?: string;
  subtitleStyle?: string;
}

export default function HeaderText({
  title,
  subtitle,
  className = "tracking-wide",
  headerStyle = "text-heading font-bold text-gray-900",
  subtitleStyle = "text-sm font-bold text-gray-600",
}: HeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className={`mb-2 ${headerStyle}`}>{title}</h2>
      {subtitle && <p className={subtitleStyle}>{subtitle}</p>}
    </div>
  );
}
