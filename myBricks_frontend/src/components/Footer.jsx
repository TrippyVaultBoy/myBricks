function Footer() {
    return (
        <footer className="w-full flex-none text-[var(--color-bricksTeal)] mx-auto max-w-screen-xl mt-auto">
            <div className="bg-[var(--color-bricksNavy)] rounded-t-3xl flex justify-around text-center p-5">
                <p>
                    ©{new Date().getFullYear()} myBricks. All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;