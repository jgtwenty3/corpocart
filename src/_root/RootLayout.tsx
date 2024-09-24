import TopBar from "@/components/nav/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className='w-full md:flex flex-col'>
            <TopBar />
            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>
        </div>
    );
};

export default RootLayout;
