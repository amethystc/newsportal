
import { client } from "@/sanity/client";
import { magazineQuery } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";

// Revalidate every hour
export const revalidate = 3600;

export default async function MagazinePage() {
    const magazines = await client.fetch(magazineQuery);

    return (
        <>
            <Header />
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8 font-unbounded">Magazine Issues</h1>
                    <p className="mb-12 text-gray-600 max-w-2xl">
                        Download our latest digital magazine issues. Deep dives into conflict, humanitarian crises, and geopolitics.
                    </p>

                    {magazines.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p>No magazine issues found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {magazines.map((mag: any) => (
                                <div key={mag.slug?.current || mag.title} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                                    <div className="relative h-[400px] w-full bg-gray-100 items-center justify-center flex">
                                        {mag.coverImage ? (
                                            <Image
                                                src={mag.coverImage}
                                                alt={mag.title}
                                                fill
                                                className="object-contain p-4"
                                            />
                                        ) : (
                                            <div className="text-gray-400">No Cover Image</div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h2 className="text-xl font-bold font-unbounded leading-tight">{mag.title}</h2>
                                            {mag.issueNumber && (
                                                <span className="text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-1 rounded whitespace-nowrap">
                                                    Issue #{mag.issueNumber}
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-500 mb-4">
                                            {new Date(mag.publishedAt).toLocaleDateString()}
                                        </div>

                                        {mag.description && (
                                            <p className="text-gray-600 mb-6 text-sm line-clamp-3 flex-grow">
                                                {mag.description}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            {mag.price !== null && mag.price !== undefined && (
                                                <div className="text-2xl font-bold text-gray-900 mb-4">
                                                    ${mag.price}
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-3">
                                                {mag.checkoutUrl && (
                                                    <Button asChild className="w-full bg-black hover:bg-gray-800 text-white shadow-md transition-all hover:translate-y-[-1px]">
                                                        <a href={mag.checkoutUrl} target="_blank" rel="noopener noreferrer">
                                                            Buy Now
                                                        </a>
                                                    </Button>
                                                )}

                                                {mag.magazinePdf ? (
                                                    <Button asChild variant={mag.checkoutUrl ? "outline" : "default"} className={`w-full ${!mag.checkoutUrl ? "bg-red-600 hover:bg-red-700 text-white" : "border-gray-300"}`}>
                                                        <a href={mag.magazinePdf} target="_blank" rel="noopener noreferrer" download>
                                                            {mag.checkoutUrl ? "Download Preview" : "Download PDF"}
                                                        </a>
                                                    </Button>
                                                ) : (
                                                    !mag.checkoutUrl && (
                                                        <Button disabled className="w-full">
                                                            Unavailable
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
