"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { company } from "@/lib/content/company";

// No backend: composes a mailto: link so the visitor's own email client
// sends the enquiry directly to sales@schwer-ph.com. No API keys, no
// server-side handling required.
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const subject = encodeURIComponent(
    form.company ? `Project enquiry from ${form.company}` : "Project enquiry"
  );
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`
  );
  const mailtoHref = `mailto:${company.emails.sales}?subject=${subject}&body=${body}`;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          placeholder="Your name"
          name="name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <Input
          placeholder="Your email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <Input
        placeholder="Company"
        name="company"
        value={form.company}
        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
      />
      <textarea
        placeholder="Tell us about your project"
        name="message"
        rows={5}
        required
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <button
        type="submit"
        className={cn(buttonVariants({ size: "lg" }), "self-start bg-brand text-black hover:bg-brand/90")}
      >
        Send Enquiry
        <ArrowUpRight className="size-4" />
      </button>
    </form>
  );
}
