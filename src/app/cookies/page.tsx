import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";

export default function CookiePolicy() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white py-20 px-4">
                <div className="max-w-3xl mx-auto prose prose-red">
                    <h1 className="text-4xl font-bold font-unbounded mb-8 uppercase tracking-tighter">Cookie Policy</h1>
                    <p className="text-sm text-gray-500 mb-12 italic">Last Updated: January 15, 2026</p>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">1. What are Cookies?</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">2. How We Use Cookies</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Conflict Wire uses cookies for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li><strong>Essential Cookies:</strong> These are necessary for the website to function. For example, we use local storage to remember the items in your shopping cart.</li>
                            <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously (e.g., via Sanity analytics).</li>
                            <li><strong>Functional Cookies:</strong> These allow the website to remember choices you make (such as your sidebar navigation state).</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">3. Shopping Cart Persistence</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our shopping cart system uses your browser's <strong>Local Storage</strong> to keep track of the magazines you've added to your cart. This allows your cart to persist even if you refresh the page or return later. No personal data is stored in this local storage.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">4. Managing Cookies</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Most web browsers allow you to control cookies through their settings. You can set your browser to block all cookies or to notify you when a cookie is being set. However, please note that blocking essential storage may prevent the shopping cart and certain parts of the site from working correctly.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">5. Changes to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">6. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about our use of cookies, please contact us at: <br />
                            <strong className="text-black">Email: info@conflictwire.com</strong>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
