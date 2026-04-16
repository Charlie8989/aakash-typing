"use client";
import React, { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-[#111] max-w-full text-white rounded-lg mx-10 sm:mx-40 my-10 lg:mx-70 px-6 md:px-16 lg:px-24 py-16 sm:py-10 lg:py-15">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Get In Touch</h1>

        <p className="text-slate-400 mb-8">
          Have questions, suggestions, or feedback? We'd love to hear from you!
          Fill out the form below or reach out using our contact details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <Mail className="text-purple-500" size={24} />
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="font-semibold">sahuayush467@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <MapPin className="text-purple-500" size={24} />
            <div>
              <p className="text-sm text-slate-400">Location</p>
              <p className="font-semibold">India</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-12 p-6 bg-white/5 rounded-lg border border-white/10">
          <p className="text-slate-400 mb-2">Response Time</p>
          <p className="text-white">
            We typically respond to all inquiries within 24-48 hours. Thank you for reaching out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
