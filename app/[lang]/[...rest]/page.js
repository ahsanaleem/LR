import { notFound } from 'next/navigation';

// Any unknown path (e.g. /does-not-exist → /en/does-not-exist) renders [lang]/not-found with a 404
export default function CatchAll() {
  notFound();
}
