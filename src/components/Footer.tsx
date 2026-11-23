export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card-bg py-8 text-xs text-muted">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">SecurePass</span>
          <span>·</span>
          <span>© 2026</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ask8962/securepass-password-manager"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground hover:underline"
          >
            GitHub
          </a>
          <span>·</span>
          <span>GLA University</span>
        </div>
      </div>
    </footer>
  );
}
