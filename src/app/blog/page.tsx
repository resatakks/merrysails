import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — İstanbul Rehberi & Cruise İpuçları",
  description: "İstanbul Boğazı, cruise turları, tekne kiralama ve organizasyonlar hakkında rehberler ve ipuçları.",
};

const blogPosts = [
  {
    slug: "istanbul-bogaz-turu-rehberi-2026",
    title: "İstanbul Boğaz Turu Rehberi 2026",
    excerpt: "İstanbul Boğazı'nda tur yapmayı düşünüyorsanız bilmeniz gereken her şey: en iyi zamanlar, rotalar, fiyatlar ve ipuçları.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    date: "2026-02-28",
    category: "Rehber",
  },
  {
    slug: "bogazda-gun-batimi-en-iyi-rotalar",
    title: "Boğaz'da Gün Batımı: En İyi Rotalar",
    excerpt: "İstanbul'da en güzel gün batımını Boğaz'da izleyin. En iyi rotalar, saatler ve fotoğraf çekimi ipuçları.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    date: "2026-02-20",
    category: "Manzara",
  },
  {
    slug: "teknede-evlilik-teklifi-nasil-yapilir",
    title: "Teknede Evlilik Teklifi Nasıl Yapılır?",
    excerpt: "Boğaz'da romantik bir evlilik teklifi planlamak için adım adım rehber. Dekorasyon, zamanlama ve sürpriz fikirleri.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    date: "2026-02-15",
    category: "Etkinlik",
  },
  {
    slug: "istanbulda-kurumsal-etkinlik-mekanlari",
    title: "İstanbul'da Kurumsal Etkinlik Mekanları",
    excerpt: "Şirket etkinlikleriniz için İstanbul'un en prestijli mekanları. Tekne organizasyonunun avantajları.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    date: "2026-02-10",
    category: "Kurumsal",
  },
  {
    slug: "bogazda-yemekli-tur-ne-beklenmeli",
    title: "Boğaz'da Yemekli Tur: Ne Beklenmeli?",
    excerpt: "Yemekli Boğaz turlarında menü seçenekleri, dress code, oturma düzeni ve turdan en iyi şekilde yararlanma ipuçları.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    date: "2026-02-05",
    category: "Rehber",
  },
  {
    slug: "prens-adalari-tekne-turu-rehberi",
    title: "Adalar Turu: Komple Rehber",
    excerpt: "Prens Adaları'na tekne turu ile nasıl gidilir? Büyükada, Heybeliada ve diğer adalar hakkında bilmeniz gerekenler.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    date: "2026-01-28",
    category: "Rehber",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Blog</h1>
          <p className="text-white/70 text-lg mt-4">İstanbul rehberleri, cruise ipuçları ve daha fazlası</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1290px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <h2 className="text-lg font-bold text-heading group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                    Devamını Oku <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
