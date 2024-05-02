import Homepage from '../components/Homepage';
import Features from '../components/Features';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {

    const data = {
        title: "Welcome to BalCer Online Store",
        content: "Discover a world of quality products and unbeatable deals.",
        destination: "/products",
        label: "Explore Now"
    }

    return(
        <>
            <Homepage data={data}/>
            <Features />
            <FeaturedProducts />
        </>
    )
}
