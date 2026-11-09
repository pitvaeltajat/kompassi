'use client';

import { useEffect } from 'react';

const SECRET = 'noni';
const WINDOW_MS = 10_000;
const TARGET = 'https://kamina.pitva.fi';

export function KaminaShortcut() {
  useEffect(() => {
    let typed = '';
    let startedAt = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
      typed = '';
      startedAt = 0;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = undefined;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.key.length !== 1) return;

      const now = Date.now();
      const character = event.key.toLowerCase();
      if (!startedAt || now - startedAt > WINDOW_MS) {
        typed = character;
        startedAt = now;
      } else {
        typed += character;
      }

      if (!SECRET.startsWith(typed)) {
        typed = character === SECRET[0] ? character : '';
        startedAt = typed ? now : 0;
      }

      if (typed === SECRET) {
        window.location.assign(TARGET);
        reset();
        return;
      }

      if (typed) {
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(reset, WINDOW_MS - (Date.now() - startedAt));
      } else {
        reset();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      reset();
    };
  }, []);

  return null;
}
