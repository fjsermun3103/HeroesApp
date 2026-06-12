import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";

export const SearchPage = () => {

    const [ searchParams ] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;

    const { data: heroes = [] } = useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesAction({name, strength}),
        staleTime: 1000 * 60 * 5, // 5 min
    })

    return (
        <>
            <CustomJumbotron
                title="SuperHeroes Search"
                description="Discover, explore and admin superheroes and villains"
            />
            <CustomBreadcrumbs currentPage="Search Heroes"
                // breadcrumbs={[
                //     { label: 'Home1', to: '/'},
                //     { label: 'Home2', to: '/'},
                //     { label: 'Home3', to: '/'},
                // ]}
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            {/* */}
            <HeroGrid heroes={heroes}></HeroGrid>
        </>
    )
}

export default SearchPage;