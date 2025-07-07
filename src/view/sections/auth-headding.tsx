export default function AuthHeading({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      {title && <h1 className="text-dark text-3xl font-bold">{title}</h1>}
      {subtitle && <p className="text-secondary mb-5 text-base">{subtitle}</p>}
    </>
  );
}
