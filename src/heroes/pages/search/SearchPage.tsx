import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="SuperHeroes Search"
                description="Discover, explore and admin superheroes and villains"
            />

            {/* Stats Dashboard */}
            <HeroStats />
        </>
    )
}

export default SearchPage;