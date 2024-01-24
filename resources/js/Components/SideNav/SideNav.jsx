import { Devider } from "../Devider/Devider";
import { FaBox, FaUser } from 'react-icons/fa';

export const SideNav = () => {
    return (
        <div className="h-screen w-96 bg-white flex flex-col">
            <div className="px-4">
                <div className="flex flex-row text-[32px] mb-8 mt-10">
                    <div className="py-2 font-bold mx-auto">
                        COOL
                        <span className="font-normal">
                            UI
                        </span>
                    </div>
                </div>
                <Devider className='mb-5'/>
            </div>
            <div className="container pl-6 font-bold">
                <a href='#' className="flex flex-row pl-2 mb-3 h-8 items-center text-primary border-r-primary border-r-4">
                    <FaBox/>
                    <div className="ml-5"> Dashboard </div>
                </a>
                <a href='/users' className="flex text-gray h-8 flex-row pl-2 mb-3 items-center">
                    <FaUser/>
                    <div className="ml-5"> User </div>
                </a>
                <a href='/shops' className="flex text-gray h-8 flex-row pl-2 mb-3 items-center">
                    <FaUser/>
                    <div className="ml-5"> Shop </div>
                </a>
            </div>
        </div>
    );
}