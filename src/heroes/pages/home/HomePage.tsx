import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";




export const HomePage = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab])

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)
    const { data: summary } = useHeroSummary();

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
                <Tabs value={ selectedTab } className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            value="all"
                            onClick={ () => setSearchParams((prev) => {
                                prev.set('tab', 'all');
                                prev.set('category', 'all');
                                prev.set('page', '1');
                                return prev;
                            })}
                        >All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            onClick={ () => setSearchParams((prev) => {
                                prev.set('tab', 'favorites')
                                return prev;
                            })}
                        >
                            {/* TODO: Hay que calcularlo */}
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>

                        <TabsTrigger
                            value="heroes"
                            onClick={ () => setSearchParams((prev) => {
                                prev.set('tab', 'heroes');
                                prev.set('category', 'hero');
                                prev.set('page', '1');
                                return prev;
                            })}
                        >
                            Heroes ({summary?.heroCount})
                        </TabsTrigger>

                        <TabsTrigger
                            value="villains"
                            onClick={ () => setSearchParams((prev) => {
                                prev.set('tab', 'villains');
                                prev.set('category', 'villain');
                                prev.set('page', '1');
                                return prev;
                            })}
                        >
                            Villains ({summary?.villainCount})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/>
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Mostrar todos los personajes favoritos */}
                        <h1>Favorites</h1>
                        {/* <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/> */}
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Mostrar todos los héroes */}
                        <h1>Heroes</h1>
                        <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/>
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Mostrar todos los villanos */}
                        <h1>Villains</h1>
                        <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/>
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
            </>
        </>
    );
};
