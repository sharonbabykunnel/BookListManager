import { Outlet } from "react-router-dom"

const AuthLayout = ()=>{
    return (
    <section className="relative h-svh py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div className="absolute inset-0">
            <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/2/man-eating-noodles.jpg" alt="" />
        </div>
        <div className="absolute inset-0 bg-gray-900/20"></div>
        <Outlet/>
    </section>
    )
}

export default AuthLayout