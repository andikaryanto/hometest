import { RoundedCard } from "@/Components/Card/RoundedCard"
import { FaBuilding, FaMap, FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapPin, FaMarker, FaUser } from "react-icons/fa"

export const NumberAssignmentItem = ({index, item}) => {
    return <RoundedCard>
        <div className="text-[24px] mb-3">
            <span className="ml-1">{index}</span>
        </div>
        <div className="flex flex-row mb-3 h-8 items-center mr-5 ">
            <div className="ml-1"> {item.created_at} </div> 
        </div>

        <div className="flex flex-row mb-3 h-8 items-center mr-5">
            <div className="ml-1"> {item.sequence} </div>
        </div>
        <div className="text-gray">  
            <span className="text-black ml-1">Aksi</span>
        </div>
    </RoundedCard>
}