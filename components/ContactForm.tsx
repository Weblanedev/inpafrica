"use client";

import toast from "react-hot-toast";

export default function ContactForm() {
  return (
    <form
      className="space-y-4 rounded-xl border border-border bg-surface p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Message sent. We’ll get back to you soon.");
      }}
    >
      <div>
        <label className="text-xs text-muted">Name</label>
        <input
          required
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
        />
      </div>
      <div>
        <label className="text-xs text-muted">Email</label>
        <input
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
        />
      </div>
      <div>
        <label className="text-xs text-muted">Subject</label>
        <input
          required
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
        />
      </div>
      <div>
        <label className="text-xs text-muted">Message</label>
        <textarea
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-btn py-3 font-semibold text-white hover:bg-btn-hover"
      >
        Send Message
      </button>
    </form>
  );
}
