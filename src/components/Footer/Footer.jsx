export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-6 py-8 text-center dark:border-neutral-800">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} Aidan Bell
      </p>
    </footer>
  );
}
