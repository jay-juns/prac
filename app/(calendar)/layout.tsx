const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return(
        <div className="h-full bg-slate-400">
            <main className="pt-40 pd-20 bg-slate-400">
                {children}
            </main>
        </div>
    )
}

export default MarketingLayout;