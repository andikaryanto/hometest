import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import Clinic from "./Clinic";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState } from "recoil";
import { clinicListState, clinicNewObject, clinicState } from "@/States/Clinic";
import Loading from "@/Components/Loading";
import { url_clinics } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";

export default function ClinicList() {

    const [clinics, setClinics] = useRecoilState(clinicListState)
    const [clinic, setClinic] = useRecoilState(clinicState)
    const [isFormOpen, setFormOpen] = useState(false);

    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })

    // const [clinic, setClinic] = useState({})

    const loadClinics = (params = {}) => {
        const accessToken = getToken();
        get(url_clinics, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setClinics(result.data.data);
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
        loadClinics({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (clinic) => {
        setClinic(clinic);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadClinics({
            ...paging,
            page: page
        });
    }

    const onAddClick = () => {
        setClinic(clinicNewObject);
        setFormOpen(true);
    }

    const onManipluate = () => {
        loadClinics(paging)
    }

    useEffect(() => {
        loadClinics(paging);
    }, [])

    const headers = ['No', 'Poli', 'Deskripsi', 'Aksi'];
    return <AdminLayout textName={'Poli'} breadCrumbItems={[
        {
            label: "Master Data"
        }, {
            label: "Poli"
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-1/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Data Poli">
                <div className="flex">
                    <Clinic title='Poli' onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <Table text={'Daftar Poli'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                onAddClick={onAddClick}
                page={clinics._paging.page}
                size={clinics._paging.limit}
                totalData={clinics._paging.total_data}>
                {clinics._resources && clinics._resources.map((e, i) => {
                    const number = ((clinics._paging.page - 1) * clinics._paging.limit) + i + 1;
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