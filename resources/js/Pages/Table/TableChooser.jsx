import { url_tables } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { Button } from "@/Components/Button/Button";
import { tableListState, tableState } from "@/States/Table";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function TableChooser({onTableChoosen}) {
    const [tables, setTables] = useRecoilState(tableListState);
    const [table, setTable] = useRecoilState(tableState);
    const loadTables = () => {
        get(url_tables, getToken())
        .then(result => {
            if(result.status == 200) {
                setTables(result.data.data);
            }
        })
    }

    const onSelectTable = (table) => {
        if(!table.is_reserved){
            setTable(table);
            onTableChoosen(table);
        }
    }

    useEffect(() => {
        loadTables();
    }, []);

    return <div className="flex">
        {tables._resources && tables._resources.map((e, i) => {
            let bg = (e.id == table.id ? ' bg-green-600 text-white' : ' bg-gray-100 text-black') + ' hover:text-black';

            if(e.is_reserved) {
                bg += ' cursor-not-allowed'
            }

            return <Button onClick={() => onSelectTable(e)} className={`w-32  py-2 px-4 rounded-lg ${bg} mr-4 `}>{e.name}</Button>
        })}
    </div>
}