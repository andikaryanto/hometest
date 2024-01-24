import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import Uom from "./Uom";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState } from "recoil";
import { uomListState, uomNewObject, uomState } from "@/States/Uom";
import Loading from "@/Components/Loading";
import { url_uoms } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { pagingParameter } from "@/States/Common";

export default function UomList() {

    const [uoms, setUoms] = useRecoilState(uomListState)
    const [uom, setUom] = useRecoilState(uomState)
    const [isFormOpen, setFormOpen] = useState(false);

    const [paging, setPaging] = useState(pagingParameter())

    const loadUoms = (params = {}) => {
        const accessToken = getToken();
        get(url_uoms, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setUoms(result.data.data);
                }
            })
            .catch(err => {

            });
    }

    const onSearch = (e) => {
        setPaging({
            ...paging,
            keyword: e.target.value
        });
        loadUoms({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (uom) => {
        setUom(uom);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadUoms({
            ...paging,
            page: page
        });
    }

    const onAddClick = () => {
        setUom(uomNewObject);
        setFormOpen(true);
    }

    const onManipluate = () => {
        loadUoms(paging)
    }

    useEffect(() => {
        loadUoms(paging);
    }, [])

    const headers = ['No', 'Ukuran Unit', 'Keterangan', 'Aksi'];
    return <AdminLayout textName={'Ukuran Unit'} breadCrumbItems={[
        {
            label: "Barang"
        }, {
            label: "Ukuran Unit"
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-1/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Data Ukuran Unit">
                <div className="flex">
                    <Uom title='Ukuran Unit' onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <Table text={'Daftar Ukuran'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                onAddClick={onAddClick}
                page={uoms._paging.page}
                size={uoms._paging.limit}
                totalData={uoms._paging.total_data}>
                {uoms._resources && uoms._resources.map((e, i) => {
                    const number = ((uoms._paging.page - 1) * uoms._paging.limit) + i + 1;
                    return <TableRow onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            {e.name}
                        </TableDetail>
                        <TableDetail>
                            {e.description}
                        </TableDetail>
                        <TableDetail className={'items-center'}>
                            {/* <BorderedRoundedButtonSmall onClick={() => onEdit(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Penyakit</BorderedRoundedButtonSmall> */}
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
        </div>
    </AdminLayout>
}