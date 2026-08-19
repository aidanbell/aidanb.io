/// <reference types="vite/client" />

declare module "*.pdf" {
  const src: string;
  export default src;
}

interface ViewTransition {
  finished: Promise<void>;
}

interface Document {
  startViewTransition?: (updateCallback: () => void) => ViewTransition;
}
