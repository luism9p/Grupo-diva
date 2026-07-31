"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { locations } from "@/lib/locations";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = ["name", "email", "phone", "local", "date", "time"] as const;
type FieldName = (typeof REQUIRED_FIELDS)[number] | "message";

const initialForm: Record<FieldName, string> = {
  name: "",
  email: "",
  phone: "",
  local: "",
  date: "",
  time: "",
  message: "",
};

const inputClasses =
  "w-full border-0 border-b bg-transparent py-3 text-base font-light text-foreground transition-colors placeholder:font-light placeholder:text-[rgba(107,98,90,0.5)] focus:outline-none";

export function ContactoSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Set<FieldName>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Computed post-hydration (not in a lazy useState initializer) so the
    // statically-exported page never bakes in the build day as "today".
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  function updateField(field: FieldName, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = new Set<FieldName>();
    for (const field of REQUIRED_FIELDS) {
      if (!form[field].trim()) nextErrors.add(field);
    }
    if (form.email && !EMAIL_PATTERN.test(form.email)) {
      nextErrors.add("email");
    }

    if (nextErrors.size > 0) {
      setErrors(nextErrors);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setErrors(new Set()), 3000);
      return;
    }

    setSubmitted(true);
    successTimeoutRef.current = setTimeout(() => {
      setForm(initialForm);
      setSubmitted(false);
    }, 5000);
  }

  return (
    <section className="bg-card py-[100px] lg:py-[140px]" id="contacto" aria-label="Contacto y Reservas">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="mb-2 text-left text-4xl leading-tight md:text-5xl">Reserva tu mesa</h2>
            <hr className="mb-8 h-0.5 w-12 border-none bg-accent-gold" />

            {!submitted ? (
              <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="form-name" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                      Nombre
                    </label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      required
                      aria-required="true"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={cn(
                        inputClasses,
                        "focus:border-accent-gold",
                        errors.has("name") ? "border-accent-red" : "border-muted-foreground/30"
                      )}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="form-email" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                      Email
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      aria-required="true"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={cn(
                        inputClasses,
                        "focus:border-accent-gold",
                        errors.has("email") ? "border-accent-red" : "border-muted-foreground/30"
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="form-phone" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                      Teléfono
                    </label>
                    <input
                      id="form-phone"
                      name="phone"
                      type="tel"
                      placeholder="+34 600 000 000"
                      required
                      aria-required="true"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={cn(
                        inputClasses,
                        "focus:border-accent-gold",
                        errors.has("phone") ? "border-accent-red" : "border-muted-foreground/30"
                      )}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="form-local" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                      Local
                    </label>
                    <select
                      id="form-local"
                      name="local"
                      required
                      aria-required="true"
                      value={form.local}
                      onChange={(e) => updateField("local", e.target.value)}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B625A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 4px center",
                        backgroundSize: "16px",
                      }}
                      className={cn(
                        inputClasses,
                        "cursor-pointer appearance-none focus:border-accent-gold",
                        errors.has("local") ? "border-accent-red" : "border-muted-foreground/30"
                      )}
                    >
                      <option value="" disabled>
                        Selecciona un local
                      </option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="form-date" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                      Fecha
                    </label>
                    <input
                      id="form-date"
                      name="date"
                      type="date"
                      required
                      aria-required="true"
                      min={minDate}
                      value={form.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className={cn(
                        inputClasses,
                        "focus:border-accent-gold",
                        errors.has("date") ? "border-accent-red" : "border-muted-foreground/30"
                      )}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="form-time" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                      Hora
                    </label>
                    <input
                      id="form-time"
                      name="time"
                      type="time"
                      required
                      aria-required="true"
                      value={form.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className={cn(
                        inputClasses,
                        "focus:border-accent-gold",
                        errors.has("time") ? "border-accent-red" : "border-muted-foreground/30"
                      )}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="form-message" className="mb-2.5 block text-[0.722rem] font-bold tracking-[1.5px] text-muted-foreground uppercase">
                    Mensaje
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    placeholder="Número de personas, peticiones especiales..."
                    rows={3}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className={cn(inputClasses, "min-h-25 resize-y border-muted-foreground/30 focus:border-accent-gold")}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 self-start rounded border-[1.5px] border-accent-red bg-accent-red px-9 py-4 font-sans text-xs uppercase tracking-[2px] text-foreground transition-all hover:scale-[1.02] hover:border-accent-gold hover:bg-accent-gold hover:text-card"
                >
                  Solicitar Reserva
                </button>
              </form>
            ) : (
              <div
                role="alert"
                className="flex items-center gap-3 rounded-md border border-accent-gold/30 bg-accent-gold/10 px-6 py-5 text-sm text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 flex-shrink-0 text-accent-gold"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.</span>
              </div>
            )}
          </motion.div>

          {/* Right: Image + Social */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <Image
                src="/gente.jpg"
                alt="Ambiente íntimo en restaurante Diva Benidorm"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-7 flex items-center justify-center gap-6">
              <a
                href="https://instagram.com/divabenidorm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="group flex h-11 w-11 items-center justify-center transition-transform hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-accent-gold transition-colors group-hover:fill-accent-red">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/divabenidorm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="group flex h-11 w-11 items-center justify-center transition-transform hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-accent-gold transition-colors group-hover:fill-accent-red">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@divabenidorm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en TikTok"
                className="group flex h-11 w-11 items-center justify-center transition-transform hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-accent-gold transition-colors group-hover:fill-accent-red">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
