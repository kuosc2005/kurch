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
  className = "",
  headerStyle = "text-2xl md:text-3xl font-bold text-gray-900",
  subtitleStyle = "text-sm text-gray-600",
}: HeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className={`mb-2 ${headerStyle}`}>{title}</h2>
      {subtitle && <p className={subtitleStyle}>{subtitle}</p>}
    </div>
  );
}
