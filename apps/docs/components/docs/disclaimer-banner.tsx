export function DisclaimerBanner() {
  return (
    <div
      role="alert"
      className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
    >
      ⚠️{" "}
      <strong>Educational only</strong> — not for clinical diagnosis.
    </div>
  );
}
