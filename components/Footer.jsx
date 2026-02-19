export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 py-6 text-sm text-slate-500">
      <div className="mx-auto w-[min(100%-2rem,1100px)]">
        <p>© {new Date().getFullYear()} Jayesh Chaudhary. All rights reserved.</p>
        <p className="mt-1 text-xs">Some company names and client details are anonymized to respect confidentiality obligations.</p>
      </div>
    </footer>
  );
}
