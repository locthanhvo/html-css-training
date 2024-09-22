import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested.</p>
      <Link
        href="users/user-list"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go User List Page
      </Link>
    </main>
  );
};

export default NotFound;
