import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/peace'); // 根目錄 -> /peace
  return null;
}
