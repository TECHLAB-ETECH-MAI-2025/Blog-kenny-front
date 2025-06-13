import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Newspaper, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                        Bienvenue sur le blog kenny
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Découvrez des articles passionnants, partagez vos idées et rejoignez notre communauté.
                    </p>
                    <Button asChild size="lg" className="rounded-full">
                        <Link href="/blog">
                            Explorer les Articles
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <Newspaper className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Articles Captivants</h3>
                            <p className="text-muted-foreground">
                                Des articles soigneusement rédigés sur divers sujets passionnants.
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <Users className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Communauté Active</h3>
                            <p className="text-muted-foreground">
                                Rejoignez une communauté dynamique et partagez vos perspectives.
                            </p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <MessageSquare className="h-12 w-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Discussions Enrichissantes</h3>
                            <p className="text-muted-foreground">
                                Participez à des discussions constructives et échangez des idées.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <div className="max-w-2xl mx-auto bg-primary/5 rounded-2xl p-8 border">
                        <h2 className="text-3xl font-bold mb-4">
                            Prêt à commencer ?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Rejoignez notre communauté et commencez à partager vos histoires dès aujourd&apos;hui.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button asChild variant="default">
                                <Link href="/blog">
                                    Explorer le Blog
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/login">
                                    Se Connecter
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
