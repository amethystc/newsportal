"use client";
import { useState } from "react";

export function SubscriptionCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the waitlist API
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        throw new Error(data.message || "Failed to add to waitlist");
      }

      // Reset the form and show success message
      setIsSubmitted(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting email:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error submitting your email. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full ">
      <div className="relative w-full mx-auto h-72 md:h-84 overflow-hidden">
        {/* background image */}
        {/*<Image
          src="/images/subscription-bg.jpg" // ganti ke image kamu
          alt="Exclusive membership"
          fill
          className="object-cover"
          priority={false}
        />*/}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600 " />

        {/* overlay tipis biar teks kebaca */}
        <div className="absolute inset-0 bg-black/20" />

        {/* content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-2xl md:text-3xl font-unbounded-extrabold mb-2">
            Get the inside story on the world's update
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-5">
            Become an exclusive member today
          </p>

          {isSubmitted ? (
            <div className="bg-green-500 text-white px-6 py-3 rounded-full text-center max-w-xs">
              Thank you! Your email has been added to the whitelist.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 items-center justify-center "
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-gray-800 border-2 border-white text-white"
                style={{ width: "320px" }}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-white text-red-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-red-50 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "SUBMITTING..." : "JOIN WAIT LIST MEMBER"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
