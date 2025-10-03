import Header from "./Header";
import Footer from "./Footer";

function HomePage() {
    return (
        <div className="flex flex-col  min-h-screen">
            <Header></Header>
            <div className="mt-6 bg-[url(../assets/greeble_white.jpg)] mx-auto w-full max-w-screen-xl h-88">
                <div className="flex flex-col gap-6 text-center items-center justify-center w-full h-full">
                    <h2 className="text-3xl text-bricksTeal bg-bricksNavy rounded-2xl px-4 py-2">Find LEGO Sets</h2>
                    <form className="flex gap-2">
                        <label for="username" className="hidden">Find LEGO Sets</label>
                        <input type="text" className="bg-bricksWhite text-center border-2 border-bricksNavy rounded-lg w-100 h-16" id="username" name="username" placeholder="Enter a LEGO set number"/>
                    <button type="submit" className="bg-bricksRed text-bricksWhite rounded-lg p-4">Submit</button>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default HomePage;