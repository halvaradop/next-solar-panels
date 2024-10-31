export const Header = () => {
    return (
        <header>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between">
                <p className="text-white font-medium">Ache Engineering</p>
                <div className="space-y-1.5 hover:cursor-pointer">
                    <span className="w-8 h-0.5 block rounded bg-white"></span>
                    <span className="w-8 h-0.5 block rounded bg-white"></span>
                    <span className="w-8 h-0.5 block rounded bg-white"></span>
                </div>
            </nav>
        </header>
    )
}
