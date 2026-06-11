import {
    Heart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const HomePage = () => {

    const [ activeTab, setActiveTab ] = useState<
        'all' | 'favorites' | 'heroes' | 'villains'
    >('all');


    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title="SuperHero Universe"
                    description="Discover, explore and admin superheroes and villains"
                />
                <CustomBreadcrumbs currentPage="Super Heroes"/>

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={ activeTab } className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            value="all"
                            onClick={ () => setActiveTab('all')}
                        >All Characters (16)</TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            onClick={ () => setActiveTab('favorites')}
                        >
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>

                        <TabsTrigger
                            value="heroes"
                            onClick={ () => setActiveTab('heroes')}
                        >
                            Heroes (12)
                        </TabsTrigger>

                        <TabsTrigger
                            value="villains"
                            onClick={ () => setActiveTab('villains')}
                        >
                            Villains (2)
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        <HeroGrid />
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Mostrar todos los personajes favoritos */}
                        <h1>Favorites</h1>
                        <HeroGrid />
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Mostrar todos los héroes */}
                        <h1>Heroes</h1>
                        <HeroGrid />
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Mostrar todos los villanos */}
                        <h1>Villains</h1>
                        <HeroGrid />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                <CustomPagination totalPages={8} />
            </>
        </>
    );
};
