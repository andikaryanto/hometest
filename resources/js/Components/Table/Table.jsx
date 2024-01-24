import { FaFilter, FaPlus, FaRecycle } from "react-icons/fa";
import { BorderedRoundedButtonSmall } from "../Button/BorderedRoundedButtonSmall";
import TextInput from "../Input/TextInput";
import Pagination from "./Pagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";
import PrimaryButton from "../PrimaryButton";
import NoData from "@/Pages/NoData";

export const Table = (
    {
        text,
        columns = [],
        body,
        children,
        onSearch,
        page,
        size,
        totalData,
        onPageChanged,
        onFilterClick,
        onAddClick,
        showRefresh = true,
        showSearch = true,
        showFilterButton = false,
        showAddButton = true,
        className,
        showResultPage = true,
        processing = false,
        showPaging = true,
        ...props
    }
) => {
    const { theme } = useTheme();
    const { layoutTheme, mainBgTheme } = applicationTheme(theme);

    const headers = columns.map((e, i) => {
        return <TableHeader key={i}>{e}</TableHeader>
    });

    const onSearchKeyDown = (e) => {
        if (e.key == 'Enter') {
            onSearch(e);
        }
    }

    return <div className={`w-full rounded-lg`}>
        <div className={`pt-4 rounded-lg ${className}`}>
            <div className="flex justify-between pb-4 px-6">
                <div className="flex">
                    {showSearch ? <div>Cari : <TextInput className="h-8 ml-3" onKeyDown={onSearchKeyDown} /></div> : null}
                    {showFilterButton ? <BorderedRoundedButtonSmall className={`bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center ml-4`}
                        onClick={onFilterClick} >
                        <div className="mr-2">Filter</div><FaFilter />
                    </BorderedRoundedButtonSmall> : null}
                </div>
                <div className="flex justify-between">
                    {showAddButton ? <div className="flex justify-end">
                        <PrimaryButton className={`h-8 mr-2 bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center`}
                            onClick={onAddClick} >
                            <div className="mr-2">Tambah</div><FaPlus />
                        </PrimaryButton>

                    </div> : null}
                    {showRefresh ? <div className="flex justify-end">
                        <PrimaryButton className={`h-8 mr-2 bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center`}
                            onClick={() => onEdit({
                                id: null,
                                name: '',
                                description: ''
                            })} >
                            <div className="mr-2">Refresh</div><FaRecycle />
                        </PrimaryButton>

                    </div> : null}
                </div>
            </div>
            <table className="min-w-full">
                <thead className="h-12">
                    <TableRow className={''} highLight={false}>
                        {headers}
                    </TableRow>
                </thead>
                
                { totalData > 0 && !processing ? 
                    <tbody className="h-14 mb-6">
                    {children}
                    </tbody> : 
                null }
            </table>

            { processing ? <div className="flex justify-center text-center">Sedang Memuat data... </div> : null }

            { totalData == 0 && !processing ? 
                    <NoData /> : 
                null }

            {showPaging ? <Pagination page={page} size={size} totalData={totalData} onPageChanged={onPageChanged} showResultPage={showResultPage} /> : null}
        </div>
    </div>;
}