import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import ItemMovement from "./ItemMovement";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState } from "recoil";
import { itemMovementListState, itemMovementNewObject, itemMovementState } from "@/States/ItemMovement";
import Loading from "@/Components/Loading";
import { url_item_movements } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { pagingParameter } from "@/States/Common";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default function ItemMovementList() {

    const [itemMovements, setItemMovements] = useRecoilState(itemMovementListState)
    const [itemMovement, setItemMovement] = useRecoilState(itemMovementState)
    const [isFormOpen, setFormOpen] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const loadItemMovements = (params = {}) => {
        const accessToken = getToken();
        get(url_item_movements, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setItemMovements(result.data.data);
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
        loadItemMovements({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (itemMovement) => {
        setItemMovement(itemMovement);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadItemMovements({
            ...paging,
            page: page
        });
    }

    const onAddClick = () => {
        setItemMovement(itemMovementNewObject);
        setFormOpen(true);
    }

    const onManipluate = () => {
        loadItemMovements(paging)
    }

    useEffect(() => {
        loadItemMovements(paging);
    }, [])

    const headers = ['No', 'Nomor', 'Deskripsi', 'Aksi'];
    return <AdminLayout textName={'Poli'} breadCrumbItems={[
        {
            label: "Master Data"
        }, {
            label: "Keluar Masuk Item"
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-3/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Data Keluar Masuk Barang">
                <div className="flex">
                    <ItemMovement title='Barang Masuk' onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <Table text={'Daftar Keluar Masuk Barang'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                onAddClick={onAddClick}
                page={itemMovements._paging.page}
                size={itemMovements._paging.limit}
                totalData={itemMovements._paging.total_data}>
                {itemMovements._resources && itemMovements._resources.map((e, i) => {
                    const number = ((itemMovements._paging.page - 1) * itemMovements._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <div>
                                {e.movement_number}
                            </div>
                            <div>
                                {e.movement_type.name}
                            </div>
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