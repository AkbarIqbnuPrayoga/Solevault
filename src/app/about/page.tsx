import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Compass, Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'About SOLEVAULT — Architectural Footwear Curation',
  description:
    'Learn about SOLEVAULT: our streetwear manifesto, physical authentication protocol, and concept spaces in Tokyo, London, and New York.',
};

export default function AboutPage() {
  const conceptSpaces = [
    {
      city: 'Tokyo',
      district: 'Daikanyama',
      address: '2-14 Sarugakucho, Shibuya-ku',
      focus: 'Tech Runner Archives & Japanese Exclusives',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85',
    },
    {
      city: 'London',
      district: 'Shoreditch',
      address: '42 Redchurch Street, E2 7DD',
      focus: 'Terrace Heritage, Suede Gum Soles & Britpop Relics',
      image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1000&q=85',
    },
    {
      city: 'New York',
      district: 'SoHo',
      address: '118 Mercer Street, NY 10012',
      focus: 'Hardwood Royalty, 80s High-Tops & Original Air Grails',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#E8E0D4] pb-8 mb-12">
          <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <Compass className="w-4 h-4" />
            <span>MANIFESTO & CULTURE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1814] tracking-tight">
            About <span className="italic text-[#B87333]">SOLEVAULT</span>
          </h1>
          <p className="mt-4 text-[#8C8275] text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            Founded with a singular mission: to eliminate the friction and uncertainty of modern sneaker culture while celebrating the design genius of footwear engineering.
          </p>
        </div>

        {/* Hero Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1814] tracking-tight leading-tight">
              More than footwear. <br />
              <span className="italic text-[#B87333]">It&apos;s an architectural statement.</span>
            </h2>

            <p className="text-[#1A1814] text-sm sm:text-base leading-relaxed font-sans">
              Footwear is the foundation of contemporary personal style. A single silhouette carries decades of athletic triumph, subcultural rebellion, musical counterculture, and industrial design evolution.
            </p>

            <p className="text-[#8C8275] text-xs sm:text-sm leading-relaxed font-sans">
              At SOLEVAULT, we reject generic algorithm-driven storefronts. Our team meticulously curates every silhouette across Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse. We prioritize timeless design over fleeting internet hype, giving collectors and casual dressers alike the confidence to build a rotation that stands the test of time.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-white border border-[#E8E0D4] shadow-sm">
                <span className="text-3xl font-serif font-bold text-[#B87333] block mb-1">
                  100%
                </span>
                <span className="text-[#8C8275] uppercase text-[11px] font-mono font-semibold">
                  Physical Verification
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E8E0D4] shadow-sm">
                <span className="text-3xl font-serif font-bold text-[#1A1814] block mb-1">
                  3
                </span>
                <span className="text-[#8C8275] uppercase text-[11px] font-mono font-semibold">
                  Global Concept Spaces
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E8E0D4] shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1200&q=85"
              alt="SOLEVAULT studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 font-mono text-xs text-white uppercase tracking-wider bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              SOLEVAULT DESIGN STUDIO // EST. 2024
            </div>
          </div>
        </div>

        {/* Authentication Protocol Section */}
        <div id="authenticity" className="p-8 sm:p-12 rounded-3xl bg-[#2C2318] text-white shadow-2xl mb-24 border border-[#3D3225]">
          <div className="flex items-center gap-2 text-[#D4955A] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>INSPECTION PROTOCOL</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            The 6-Point Vault Authentication
          </h2>
          <p className="text-[#C4B8A8] text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed font-sans">
            Every sneaker in our vault undergoes a rigorous physical examination prior to receiving the SOLEVAULT tamper-evident hologram seal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-[#3D3225]/70 border border-[#4E3F30]">
              <span className="text-[#D4955A] font-bold block mb-1">01 // UV FLUORESCENCE</span>
              <p className="text-[#C4B8A8] font-sans text-xs">
                Ultraviolet light screening to detect glue bleed, factory production stamps, and thread inconsistencies.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#3D3225]/70 border border-[#4E3F30]">
              <span className="text-[#D4955A] font-bold block mb-1">02 // STITCH DENSITY</span>
              <p className="text-[#C4B8A8] font-sans text-xs">
                Microscopic measurement of stitches per inch against master brand specification databases.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#3D3225]/70 border border-[#4E3F30]">
              <span className="text-[#D4955A] font-bold block mb-1">03 // FOAM DUROMETRY</span>
              <p className="text-[#C4B8A8] font-sans text-xs">
                Tactile and mechanical testing of midsole compound elasticity and weight tolerances.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#3D3225]/70 border border-[#4E3F30]">
              <span className="text-[#D4955A] font-bold block mb-1">04 // BOX & LABEL KERNING</span>
              <p className="text-[#C4B8A8] font-sans text-xs">
                Typography inspection of retail barcode labels, UPC fonts, and box fold patterns.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#3D3225]/70 border border-[#4E3F30]">
              <span className="text-[#D4955A] font-bold block mb-1">05 // MATERIAL PURITY</span>
              <p className="text-[#C4B8A8] font-sans text-xs">
                Verifying genuine full-grain leather texture, pigskin suede nap, and engineered mesh weaves.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#3D3225]/70 border border-[#4E3F30]">
              <span className="text-[#D4955A] font-bold block mb-1">06 // TAMPER-EVIDENT SEAL</span>
              <p className="text-[#C4B8A8] font-sans text-xs">
                Serialized hologram tags locked onto each pair before double-boxed secure dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Physical Concept Destinations */}
        <div id="concept-stores" className="mb-20">
          <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4" />
            <span>GLOBAL ARCHIVE SPACES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1814] tracking-tight mb-8">
            Concept Gallery Destinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {conceptSpaces.map((space) => (
              <div
                key={space.city}
                className="group rounded-3xl overflow-hidden bg-white border border-[#E8E0D4] hover:border-[#B87333]/50 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="relative aspect-video w-full bg-[#FAF7F2] overflow-hidden">
                  <ImageWithFallback
                    src={space.image}
                    alt={`${space.city} concept space`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A1814]/80 font-mono text-[10px] text-white font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    {space.city.toUpperCase()}
                  </div>
                </div>

                <div className="p-6">
                  <span className="font-mono text-xs text-[#B87333] uppercase font-semibold block">
                    {space.district}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1A1814] mt-1">
                    SOLEVAULT {space.city}
                  </h3>
                  <p className="font-mono text-xs text-[#8C8275] mt-1">
                    {space.address}
                  </p>
                  <p className="text-xs text-[#8C8275] mt-3 font-sans leading-relaxed">
                    {space.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[#2C2318] text-white text-center shadow-xl border border-[#3D3225]">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-3">
            Ready to Curate Your Rotation?
          </h2>
          <p className="text-[#C4B8A8] text-xs sm:text-sm max-w-md mx-auto mb-8 font-sans leading-relaxed">
            Explore handpicked silhouettes across retro basketball, vintage terrace, and high-tech running archives.
          </p>
          <Link
            href="/sneakers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full transition-all shadow-lg hover:scale-105"
          >
            <span>ENTER THE SNEAKER VAULT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
