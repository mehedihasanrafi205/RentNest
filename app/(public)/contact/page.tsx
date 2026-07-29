"use client"

import React, { useState } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Navigation,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "Tenant",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle")

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate API call
    setTimeout(() => {
      setFormStatus("success")
      setFormData({
        fullName: "",
        email: "",
        userType: "Tenant",
        subject: "",
        message: "",
      })

      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
    }, 1500)
  }

  const faqs = [
    {
      id: "item-1",
      question: "How do I verify my listing?",
      answer:
        "Listings are verified through a combination of property document checks and phone verification. Simply upload a proof of ownership or management agreement in your dashboard under 'Identity Verification' to get the 'Verified' badge.",
    },
    {
      id: "item-2",
      question: "How do rent payments work?",
      answer:
        "RentNest facilitates secure digital payments via bank transfer or credit card. Tenants can set up auto-pay, and landlords receive funds directly into their connected accounts within 3-5 business days.",
    },
    {
      id: "item-3",
      question: "What fees does RentNest charge?",
      answer:
        "Searching for a home is free. For landlords, we offer tiered subscription plans or a small percentage of the first month's rent for premium listings. Contact our sales team for custom volume pricing.",
    },
    {
      id: "item-4",
      question: "Can I cancel my membership anytime?",
      answer:
        "Yes, you can cancel your subscription at any time through your account settings. There are no long-term contracts for our standard monthly listing packages.",
    },
  ]

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-background py-16 md:py-24">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-10">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Whether you&apos;re looking for your dream home in Bangladesh or have
              questions about listing your property, our team is here to help
              you every step of the way.
            </p>
          </div>
        </section>

        {/* Main Content: Form & Info Cards */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Column: Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10 lg:col-span-7">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="h-12 w-full rounded-lg border border-input bg-muted/50 px-4 text-base transition-all outline-none focus:border-primary focus:bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="h-12 w-full rounded-lg border border-input bg-muted/50 px-4 text-base transition-all outline-none focus:border-primary focus:bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      User Type
                    </label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="h-12 w-full cursor-pointer rounded-lg border border-input bg-muted/50 px-4 text-base transition-all outline-none focus:border-primary focus:bg-background"
                    >
                      <option value="Tenant">Tenant</option>
                      <option value="Landlord">Landlord</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="General Inquiry"
                      className="h-12 w-full rounded-lg border border-input bg-muted/50 px-4 text-base transition-all outline-none focus:border-primary focus:bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you today?"
                    className="w-full resize-none rounded-lg border border-input bg-muted/50 p-4 text-base transition-all outline-none focus:border-primary focus:bg-background"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-8 text-base font-medium text-primary-foreground shadow-sm transition-all md:w-auto ${
                    formStatus === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-primary hover:bg-primary/90 active:scale-[0.98]"
                  } ${formStatus === "submitting" ? "cursor-not-allowed opacity-80" : ""}`}
                >
                  {formStatus === "submitting" && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  )}
                  {formStatus === "success" && (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Message Sent!
                    </>
                  )}
                  {formStatus === "idle" && (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Info Cards */}
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
                    Office Address
                  </h3>
                  <p className="text-base font-medium text-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
                    Phone Number
                  </h3>
                  <p className="text-base font-medium text-foreground">
                    +880 1700-000000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
                    Email Support
                  </h3>
                  <p className="text-base font-medium text-foreground">
                    support@rentnest.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-muted-foreground">
                    Operating Hours
                  </h3>
                  <p className="text-base font-medium text-foreground">
                    Sat–Thu, 9 AM – 6 PM (BST)
                  </p>
                </div>
              </div>

              <div className="group relative h-48 overflow-hidden rounded-2xl border border-border">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNG8-a-DNbi3deaxyJosZFM_AuTftRp2j4w6ZMS3hv0F_PiufhXa5qoa_73BI7PUjNHogLY7pltM3sWEeHVVTClRB6gengcACeBYtqgX-pMoy61j79s_SyO_OpatiV80TGr3k4zfglSBJMQgRqelAphQROMLLRXnZhaH8wUFajdmT12wP5E5YY7hKMWwNWGkHsi88dQsExDBztyBYWEXMh5uhhM-rKIr7tS_9pl5GnH-7CgPyLkOrf')",
                  }}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                  <span className="text-sm font-semibold text-white">
                    Bangladesh&apos;s most trusted rental marketplace.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with shadcn/ui Accordion */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">
                Common Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to frequently asked questions.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-2xl border border-border bg-card px-6 transition-all"
                >
                  <AccordionTrigger className="py-6 text-lg font-semibold hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative h-100 w-full overflow-hidden border-t border-border">
          {/* Google Map iframe */}
          <div className="absolute inset-0 h-full w-full">
            <iframe
              title="Office Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.37218775956!2d90.27923849999999!3d23.780573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
              className="h-full w-full opacity-90 contrast-[0.9] grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>

          {/* Floating Location Card */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md md:bottom-10 md:gap-6 md:px-8 md:py-6">
            <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Visit our HQ</h4>
              <p className="text-xs text-muted-foreground">
                Dhaka, Bangladesh
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Dhaka,+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions"
              className="pointer-events-auto rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
            >
              <Navigation className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
