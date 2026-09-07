export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="app-header">
      <div>
        <h1 className="app-title">{title}</h1>
        <p className="app-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}
