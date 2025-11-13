'use client';
import { useState } from "react";
import { mockConferences } from "@/mocks/conference";

export default function AdminPage() {
  const [confs, setConfs] = useState(mockConferences);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  function handleAdd() {
    setConfs([
      ...confs,
      {
        id: Math.random().toString(36).substring(2, 9),
        name,
        date,
        location,
        description: "",
        price: 0,
        category: [],
        imageUrl: "",
        speakers: [],
        maxAttendees: 100,
        currentAttendees: 0,
        isFeatured: false,
      }
    ]);
    setName("");
    setDate("");
    setLocation("");
  }

  function handleDelete(id: string) {
    setConfs(confs.filter(c => c.id !== id));
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="mb-8 rounded-lg border p-6 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4">Add Conference</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            className="border rounded px-3 py-2 flex-1 bg-gray-50 dark:bg-gray-800"
          />
          <input
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Date (YYYY-MM-DD)"
            className="border rounded px-3 py-2 flex-1 bg-gray-50 dark:bg-gray-800"
            type="date"
          />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
            className="border rounded px-3 py-2 flex-1 bg-gray-50 dark:bg-gray-800"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">All Conferences</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Date</th>
              <th className="px-4 py-2 text-left font-medium">Location</th>
              <th className="px-4 py-2 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {confs.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-2 font-semibold">{c.name}</td>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">{c.location}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {confs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No conferences found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
