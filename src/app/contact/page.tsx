
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8 font-unbounded">Contact Us</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-lg text-gray-700 mb-8">
                                Have a story tip, a question, or feedback? We'd love to hear from you.
                                Reach out to our team using the form or the contact details below.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold font-unbounded text-lg">General Inquiries</h3>
                                    <p className="text-gray-600">info@conflictwire.com</p>
                                </div>

                                <div>
                                    <h3 className="font-bold font-unbounded text-lg">Editorial Team</h3>
                                    <p className="text-gray-600">editor@conflictwire.com</p>
                                </div>

                                <div>
                                    <h3 className="font-bold font-unbounded text-lg">Follow Us</h3>
                                    <div className="flex gap-4 mt-2">
                                        {/* Social Icons Placeholders */}
                                        <a href="#" className="text-gray-600 hover:text-red-600">Twitter/X</a>
                                        <a href="#" className="text-gray-600 hover:text-red-600">LinkedIn</a>
                                        <a href="#" className="text-gray-600 hover:text-red-600">Instagram</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                                    <Input id="name" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <Input id="email" type="email" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                                    <Input id="subject" placeholder="What is this about?" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                                    <Textarea id="message" placeholder="Your message..." rows={5} />
                                </div>
                                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
