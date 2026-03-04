"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Users, Ship, ArrowRight, Check, CreditCard } from "lucide-react";
import { tours } from "@/data/tours";
import { formatPrice, cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Tur Seçimi", icon: Ship },
  { id: 2, name: "Bilgiler", icon: Users },
  { id: 3, name: "Ödeme", icon: CreditCard },
  { id: 4, name: "Onay", icon: Check },
];

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-lg text-gray-400">Yükleniyor...</div></div>}>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedTour = searchParams.get("tour") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTour, setSelectedTour] = useState(preselectedTour);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hotel: "",
    notes: "",
    transfer: false,
  });

  const selectedTourData = tours.find((t) => t.slug === selectedTour);
  const totalPrice = selectedTourData ? selectedTourData.priceEur * guests : 0;

  return (
    <>
      {/* Header */}
      <section className="bg-primary pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Rezervasyon
          </h1>

          {/* Steps */}
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                      currentStep >= step.id
                        ? "bg-secondary text-heading"
                        : "bg-white/10 text-white/40"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "hidden md:block text-sm font-semibold",
                      currentStep >= step.id ? "text-white" : "text-white/40"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 md:w-16 h-0.5",
                      currentStep > step.id ? "bg-secondary" : "bg-white/10"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-bg-body">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Tour Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading mb-6">
                Tur ve Tarih Seçin
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {tours.map((tour) => (
                  <button
                    key={tour.id}
                    onClick={() => setSelectedTour(tour.slug)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all",
                      selectedTour === tour.slug
                        ? "border-accent bg-white shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={tour.image}
                          alt={tour.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading text-sm">{tour.name}</h3>
                        <p className="text-gray-400 text-xs mt-0.5">{tour.duration} · {tour.capacity}</p>
                        <p className="text-accent font-bold font-bold mt-1">{formatPrice(tour.priceEur)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Tarih *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Kişi Sayısı *</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent appearance-none"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} Kişi</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedTourData && (
                <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Toplam</span>
                    <span className="text-2xl font-bold text-heading font-bold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => selectedTour && date && setCurrentStep(2)}
                disabled={!selectedTour || !date}
                className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Devam Et <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading mb-6">
                Kişisel Bilgiler
              </h2>

              <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Ad Soyad *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Telefon *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Otel (Transfer için)</label>
                    <input
                      type="text"
                      value={formData.hotel}
                      onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                      placeholder="Otel adı (opsiyonel)"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Özel İstekler</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent resize-none"
                    rows={3}
                    placeholder="Diyet, doğum günü pastası, vb."
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.transfer}
                    onChange={(e) => setFormData({ ...formData, transfer: e.target.checked })}
                    className="w-5 h-5 rounded accent-accent"
                  />
                  <span className="text-sm text-gray-600">Otel transferi istiyorum (+€10/kişi)</span>
                </label>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-colors hover:bg-gray-50"
                >
                  Geri
                </button>
                <button
                  onClick={() => formData.name && formData.email && formData.phone && setCurrentStep(3)}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="flex-1 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Ödemeye Geç <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading mb-6">Ödeme</h2>

              {/* Order Summary */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="font-semibold text-heading mb-4">Sipariş Özeti</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Tur</span><span>{selectedTourData?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tarih</span><span>{date}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Kişi</span><span>{guests} kişi</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Birim Fiyat</span><span>{formatPrice(selectedTourData?.priceEur || 0)}</span></div>
                  {formData.transfer && (
                    <div className="flex justify-between"><span className="text-gray-500">Transfer</span><span>{formatPrice(10 * guests)}</span></div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Toplam</span>
                    <span className="text-heading font-bold">
                      {formatPrice(totalPrice + (formData.transfer ? 10 * guests : 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="font-semibold text-heading mb-4">Kart Bilgileri</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Kart Numarası</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Son Kullanma</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                        placeholder="AA/YY"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">CVV</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  256-bit SSL ile güvenli ödeme · Stripe & iyzico
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-colors hover:bg-gray-50"
                >
                  Geri
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Ödemeyi Tamamla
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-heading mb-4">
                Rezervasyonunuz Onaylandı!
              </h2>
              <p className="text-gray-500 max-w-md mx-auto mb-2">
                Rezervasyon detaylarınız <strong>{formData.email}</strong> adresine gönderildi.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Rezervasyon No: <span className="font-bold font-bold text-heading">MS-2026-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
              </p>

              <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-md mx-auto text-left mb-8">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Tur</span><span className="font-semibold">{selectedTourData?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tarih</span><span>{date}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Kişi</span><span>{guests} kişi</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Ad Soyad</span><span>{formData.name}</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Toplam</span>
                    <span className="font-bold">{formatPrice(totalPrice + (formData.transfer ? 10 * guests : 0))}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/")}
                className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Ana Sayfaya Dön
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
