import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, UsersRound, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

const stats = [
    {
        name: "Articles Totaux",
        value: "150+",
        description: "Articles publiés",
        icon: FileText,
        color: "text-blue-500",
        link: "/admin/article"
    },
    {
        name: "Utilisateurs Actifs",
        value: "2.5k",
        description: "Utilisateurs enregistrés",
        icon: UsersRound,
        color: "text-green-500",
        link: "/admin/users"
    },
    {
        name: "Commentaires",
        value: "500+",
        description: "Interactions utilisateurs",
        icon: MessageSquare,
        color: "text-purple-500",
        link: "/admin/comment"
    },
    {
        name: "Engagement",
        value: "85%",
        description: "Taux d'engagement moyen",
        icon: BarChart,
        color: "text-orange-500",
        link: "/admin/analytics"
    }
];

export default function AdminDashboard() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.name} href={stat.link}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.name}
                                    </CardTitle>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Vue d&apos;ensemble</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            Graphique d&apos;activité à venir
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Activité récente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Nouvel article publié
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Il y a {i + 1} heure{i > 0 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}