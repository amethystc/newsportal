
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">About Conflict Wire</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl leading-relaxed text-gray-700 mb-8">
                            Conflict Wire is an independent news platform dedicated to reporting on global conflicts, humanitarian crises, trade wars, and geopolitical shifts.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                        <p className="mb-6">
                            In an era of information overload, we strive to provide clear, verified, and in-depth analysis of the stories that shape our world. We believe that understanding conflict is the first step towards resolution.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">What We Cover</h2>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li><strong>Conflict & Security:</strong> Frontline reporting and strategic analysis.</li>
                            <li><strong>Humanitarian Impact:</strong> The human stories behind the headlines.</li>
                            <li><strong>Geopolitics:</strong> The shifts in global power dynamics.</li>
                            <li><strong>Trade & Resources:</strong> How economics drives conflict.</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Support Independent Journalism</h3>
                            <p className="mb-4">
                                We rely on the support of our readers to keep our reporting free and accessible.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
