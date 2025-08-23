export function formatTs(ts) {
  try {
    const d = new Date(ts);
    const now = new Date();
    const sameYear = d.getFullYear() === now.getFullYear();
    const opts = sameYear
      ? { month: 'short', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };
    return 'Updated ' + d.toLocaleDateString(undefined, opts);
  } catch {
    return String(ts);
  }
}
