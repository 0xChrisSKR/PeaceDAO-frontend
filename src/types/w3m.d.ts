// src/types/w3m.d.ts
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { balance?: 'hide' | 'show' };
    }
  }
}
