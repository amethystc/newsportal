import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white py-20 px-4">
                <div className="max-w-3xl mx-auto prose prose-red">
                    <h1 className="text-4xl font-bold font-unbounded mb-8 uppercase tracking-tighter">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-12 italic">Last Updated: January 15, 2026</p>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">1. Introduction</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Conflict Wire ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Conflict Wire.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">2. Information We Collect</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We collect information that you provide directly to us when you:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Sign up for our newsletter or waitlist.</li>
                            <li>Purchase a magazine or digital product (Email address for delivery).</li>
                            <li>Contact us via our contact forms.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">3. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li>Deliver digital magazine issues to your email address.</li>
                            <li>Send you updates, news, and promotional content (with your consent).</li>
                            <li>Respond to your comments, questions, and provide customer service.</li>
                            <li>Verify manual payments made via third-party providers like Stripe.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">4. Third-Party Services</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use third-party services to operate Conflict Wire:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                            <li><strong>Sanity.io:</strong> For content management and storage.</li>
                            <li><strong>Stripe:</strong> For processing payments. We do not store your financial details on our servers; payments are handled directly by Stripe.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">5. Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@conflictwire.com.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold font-unbounded mb-4 text-red-600">6. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at: <br />
                            <strong className="text-black">Email: info@conflictwire.com</strong>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
