'use client';
import { useState, useEffect } from "react";

import { Navigation } from "@/components/Navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminPage() {
  const [confs, setConfs] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  async function fetchConfs() {
    try {
      const res = await fetch("/api/conferences");
      const data = await res.json();
      setConfs(data);
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  }

  useEffect(() => {
    fetchConfs();
  }, []);

  async function handleAdd() {
    try {
      await fetch("/api/conferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          date,
          location,
          description: "",
          price: 0,
          category: ["General"],
          imageUrl: "",
          maxAttendees: 100,
          currentAttendees: 0,
          isFeatured: false,
          status: "Open",
        }),
      });
      setName("");
      setDate("");
      setLocation("");
      fetchConfs();
    } catch (error) {
      console.error("Error adding conference:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/conferences/${id}`, { method: "DELETE" });
      fetchConfs();
    } catch (error) {
      console.error("Error deleting conference:", error);
    }
  }

  return (
    <>
      <Navigation />
      <main className="max-w-5xl px-6 py-12 mx-auto space-y-10">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Admin Panel</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your conference catalog. Add new events or remove ones that are no longer needed.
          </p>
        </section>

        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Add Conference</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Provide the basic details to create a new conference entry.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Conference Name"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              type="date"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleAdd}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">All Conferences</h2>
              <p className="text-sm text-muted-foreground">
                Review existing conferences, track attendee counts, and remove entries.
              </p>
            </div>
            <div className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              {confs.length} total
            </div>
          </header>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {confs.map((c: any) => (
                <TableRow key={c.id}>
                  <TableCell className="font-semibold text-slate-900 dark:text-slate-100">
                    {c.name}
                  </TableCell>
                  <TableCell>{c.date}</TableCell>
                  <TableCell>{c.location}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {c.status ?? "Open"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {confs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No conferences found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption>
              Need richer details? Extend the table component with more columns for pricing, capacity, or speaker
              info.
            </TableCaption>
          </Table>
        </section>
      </main>
    </>
  );
}
