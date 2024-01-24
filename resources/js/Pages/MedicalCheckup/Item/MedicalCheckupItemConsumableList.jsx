import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState } from "recoil";
import { medicalCheckupItemConsumableListState, medicalCheckupItemConsumableState, medicalCheckupItemNewObject } from "@/States/MedicalCheckupItem";
import Loading from "@/Components/Loading";
import { url_item_movements, url_medical_checkup_items } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { pagingParameter } from "@/States/Common";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MedicalCheckupItemConsumable from "./MedicalCheckupItemConsumable";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";
import Pill from "@/Components/Pill/Pill";
import { formatCurrency } from "@/Common/Helper";

export default function MedicalCheckupItemConsumableItemList({ medicalCheckup, ...props }) {
    const { theme } = useTheme();
    const { borderedBottomTheme } = applicationTheme(theme);
    const [medicalCheckupItems, setMedicalCheckupItems] = useRecoilState(medicalCheckupItemConsumableListState)
    const [medicalCheckupItem, setMedicalCheckupItem] = useRecoilState(medicalCheckupItemConsumableState)
    const [isFormOpen, setFormOpen] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const loadMedicalCheckupItems = (params = {}) => {
        params = {
            ...params,
            item_type_id: 2
        }
        
        const accessToken = getToken();
        let url = url_medical_checkup_items.replace('{medicalCheckup}', medicalCheckup.id)
        get(url, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckupItems(result.data.data);
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
        loadMedicalCheckupItems({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (medicalCheckupItem) => {
        setMedicalCheckupItem(medicalCheckupItem);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadMedicalCheckupItems({
            ...paging,
            page: page
        });
    }

    const onAddClick = () => {
        setMedicalCheckupItem(medicalCheckupItemNewObject);
        setFormOpen(true);
    }

    const onManipluate = () => {
        loadMedicalCheckupItems(paging)
    }

    useEffect(() => {
        loadMedicalCheckupItems(paging);
    }, [medicalCheckup])

    const headers = ['No', 'Barang', 'Jumlah', 'Aksi'];
    return <div className="flex">
        {/* <SlideSideBar className={`w-3/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Data Keluar Masuk Barang"> */}
        <div className={`w-1/3 mr-4`}>
            <div className={`w-full pb-4`}>
                <MedicalCheckupItemConsumable title='Bahan Habis Pakai' onSubmit={onManipluate} />
            </div>
        </div>
        {/* </SlideSideBar> */}
        <Table text={'Daftar Bahan Habis Pakai'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
            onAddClick={onAddClick}
            page={medicalCheckupItems._paging.page}
            size={medicalCheckupItems._paging.limit}
            totalData={medicalCheckupItems._paging.total_data}>
            {medicalCheckupItems._resources && medicalCheckupItems._resources.map((e, i) => {
                const number = ((medicalCheckupItems._paging.page - 1) * medicalCheckupItems._paging.limit) + i + 1;
                return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        <div>
                            {e.item.name}
                        </div>
                    </TableDetail>
                    <TableDetail position={"left"}>
                        <div className="text-xs pr-2">
                            {e.quantity} x {formatCurrency(e.price_per_unit)}
                        </div>
                        <div className="flex justify-end">
                            <Pill className={`bg-green-600 text-white h-6`}>
                                {formatCurrency(e.amount)}
                            </Pill>
                        </div>
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        {/* <BorderedRoundedButtonSmall onClick={() => onEdit(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Penyakit</BorderedRoundedButtonSmall> */}
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </div>
}