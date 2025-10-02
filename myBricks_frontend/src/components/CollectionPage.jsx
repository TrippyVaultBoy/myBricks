import Header from "./Header";
import Collection from "./Collection";
import Footer from "./Footer";

function CollectionPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <Collection/>
            <Footer></Footer>
        </div>
    );
}

export default CollectionPage;