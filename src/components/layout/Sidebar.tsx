import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">SaaS Panel</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/campaigns" className="hover:text-blue-400">
          Campaigns
        </Link>
      </nav>
    </div>
  );
}