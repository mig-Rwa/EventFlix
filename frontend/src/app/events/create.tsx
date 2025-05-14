"use client";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
    },
    category: "",
    imageUrl: "",
    status: "published",
    ticketTypes: [
      { name: "", price: 0, quantity: 0 },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      setForm({
        ...form,
        location: {
          ...form.location,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleTicketChange = (idx: number, field: string, value: string | number) => {
    const ticketTypes = [...form.ticketTypes];
    ticketTypes[idx] = { ...ticketTypes[idx], [field]: value };
    setForm({ ...form, ticketTypes });
  };

  const addTicketType = () => {
    setForm({ ...form, ticketTypes: [...form.ticketTypes, { name: "", price: 0, quantity: 0 }] });
  };

  const removeTicketType = (idx: number) => {
    setForm({ ...form, ticketTypes: form.ticketTypes.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create event");
      }
      setSuccess("Event created successfully!");
      setForm({
        title: "",
        description: "",
        date: "",
        location: { address: "", city: "", state: "", country: "" },
        category: "",
        imageUrl: "",
        status: "published",
        ticketTypes: [{ name: "", price: 0, quantity: 0 }],
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Date</label>
          <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold">Address</label>
            <input name="location.address" value={form.location.address} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-semibold">City</label>
            <input name="location.city" value={form.location.city} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-semibold">State</label>
            <input name="location.state" value={form.location.state} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Country</label>
            <input name="location.country" value={form.location.country} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
        </div>
        <div>
          <label className="block font-semibold">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-semibold">Ticket Types</label>
          {form.ticketTypes.map((ticket, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Name"
                value={ticket.name}
                onChange={e => handleTicketChange(idx, "name", e.target.value)}
                className="input input-bordered"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={ticket.price}
                onChange={e => handleTicketChange(idx, "price", Number(e.target.value))}
                className="input input-bordered"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={e => handleTicketChange(idx, "quantity", Number(e.target.value))}
                className="input input-bordered"
                required
              />
              {form.ticketTypes.length > 1 && (
                <button type="button" onClick={() => removeTicketType(idx)} className="btn btn-error btn-sm">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTicketType} className="btn btn-secondary btn-sm mt-2">Add Ticket Type</button>
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="input input-bordered w-full">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
