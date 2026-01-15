// src/components/Footer.tsx
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-[#111] text-white mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        {/* TOP ROW: logo + 3 columns */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          {/* logo */}
          <div className="shrink-0 flex justify-center md:justify-start">
            <div className="h-28 w-28">
              <Image
                src="/conflict-wire-logo.png"
                alt="Conflict Wire Logo"
                width={112}
                height={112}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* 3 columns on the right */}
          <div className="flex-1 grid gap-8 md:grid-cols-3">
            {/* col 1 */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Home</h4>
            </div>

            {/* col 2 */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-red-500">Services</h4>
              <ul className="space-y-1 text-sm text-gray-200">
                <li>Partnership</li>
                <li>About us</li>
              </ul>
            </div>

            {/* col 3 */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Contacts</h4>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: contact + address */}
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* spacer sebesar logo supaya sejajar */}
          <div className="hidden md:block h-0 w-28" />
          <div className="flex-1 grid gap-8 md:grid-cols-3">
            <div></div>
            {/* contact info */}
            <div className="space-y-1 order-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Contact us
              </p>
              <p className="text-sm">+1 987-889-11-91</p>
              <p className="text-sm">hello@loopjournal.com</p>
              <button className="mt-2 text-sm text-red-400 hover:text-red-300">
                Call me back
              </button>
            </div>

            {/* address */}
            <div className="order-2">
              <p className="text-sm">
                2972 Westheimer Rd. Santa Ana,
                <br />
                Illinois 85486
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* follow us */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
              Follow us
            </p>
            <div className="flex items-center gap-4">
              <a
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                href="#"
              >
                <Facebook size={16} />
              </a>
              <a
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                href="#"
              >
                <Instagram size={16} />
              </a>
              <a
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                href="#"
              >
                <Linkedin size={16} />
              </a>
              <a
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
                href="#"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* copyright */}
          <div className="text-xs text-gray-500 md:text-right">
            <p>© {new Date().getFullYear()} Conflict Wire. All rights reserved.</p>
            <div className="flex gap-4 mt-1 justify-center md:justify-end">
              <a href="/privacy" className="hover:text-red-400 transition-colors">Privacy Policy</a>
              <a href="/cookies" className="hover:text-red-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
