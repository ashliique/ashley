(() => {
  const storageKey = 'ashley-hunt-letters-v1';
  let visitOnlyLetters = [];
  let visitOnly = false;

  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const parsed = new Date(year, month - 1, day);
    return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
  }

  function today() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  function dateLabel(date) {
    const [year, month, day] = date.split('-').map(Number);
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
      .format(new Date(year, month - 1, day, 12));
  }

  function normalize(entry) {
    if (!entry || !validDate(entry.date) || !Array.isArray(entry.paragraphs)) return null;
    const paragraphs = entry.paragraphs.filter(line => typeof line === 'string' && line.trim()).map(line => line.trim());
    if (!paragraphs.length) return null;
    return {
      date: entry.date,
      emoji: typeof entry.emoji === 'string' ? entry.emoji : '😘',
      corner: typeof entry.corner === 'string' ? entry.corner : '✦',
      paragraphs
    };
  }

  function entries() {
    let saved = visitOnlyLetters;
    if (!visitOnly) {
      try {
        const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (Array.isArray(parsed)) saved = parsed;
      } catch { visitOnly = true; }
    }
    return saved.map(normalize).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date));
  }

  function save(entry) {
    const letter = normalize(entry);
    if (!letter) return false;
    const updated = [letter, ...entries().filter(saved => saved.date !== letter.date)]
      .sort((a, b) => b.date.localeCompare(a.date));
    visitOnlyLetters = updated;
    if (!visitOnly) {
      try { localStorage.setItem(storageKey, JSON.stringify(updated)); }
      catch { visitOnly = true; }
    }
    return true;
  }

  window.AshleyHuntLetters = { entries, save, today, dateLabel, validDate };
})();
