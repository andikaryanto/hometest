import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
// import MedicalCheckup from "./MedicalCheckup";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState } from "recoil";
import { medicalCheckupListNewObject, medicalCheckupListState, medicalCheckupNewObject, medicalCheckupState } from "@/States/MedicalCheckup";
import Loading from "@/Components/Loading";
import { url_medical_checkups } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { pagingParameter } from "@/States/Common";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Pill from "@/Components/Pill/Pill";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import Config from "@/Common/Config";
import MedicalCheckupHistoryDetail from "./MedicalCheckupHIstoryDetail";

export default function MedicalCheckupHistoryList({ patient = null }) {

    const [medicalCheckups, setMedicalCheckups] = useState(medicalCheckupListNewObject)
    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupState)
    const [isFormOpen, setFormOpen] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const loadMedicalCheckups = (params = {}) => {
        if (patient) {
            params = {
                patient_id: patient.id
            }
        }
        get(url_medical_checkups, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckups(result.data.data);
                } else if (result.status == 204) {
                    setMedicalCheckups(medicalCheckupListNewObject);
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
        loadMedicalCheckups({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (medicalCheckup) => {
        setMedicalCheckup(medicalCheckup);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadMedicalCheckups({
            ...paging,
            page: page
        });
    }
    // const getActionButtonsItems = () => {
    //     return [
    //         {
    //             caption: 'Lihat'
    //         }
    //     ];
    // }

    // const onButtonActionClick = (actionButton, selectedItem) => {
    //     if (actionButton.href != undefined && actionButton.caption == 'Bayar') {
    //         window.location = actionButton.href + '?medical_checkup_id=' + selectedItem.id;
    //     }
    // }

    useEffect(() => {
        loadMedicalCheckups(paging);
    }, [patient])

    const headers = ['No', 'Periksa Pasien', 'Pasien', 'Poli'];
    return <div className="flex w-full">
        {/* <SlideSideBar className={`w-10/12`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Detail Pemeriksaan Pasien">
            <div className="flex">
                <MedicalCheckupInformation title='Informasi Pemeriksaan Pasien' />
            </div>
        </SlideSideBar> */}
        <div className="w-1/2">
            <MedicalCheckupHistoryDetail selectedMedicalCheckup={medicalCheckup} />
        </div>
        <Table text={'Kasir'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
            showAddButton={false}
            showRefresh={false}
            page={medicalCheckups._paging.page}
            size={medicalCheckups._paging.limit}
            totalData={medicalCheckups._paging.total_data}>
            {medicalCheckups._resources && medicalCheckups._resources.map((e, i) => {
                const number = ((medicalCheckups._paging.page - 1) * medicalCheckups._paging.limit) + i + 1;
                return <TableRow addSpace={true} onClick={() => onEdit(e)}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        <span>{e.checkup_number}</span>
                        <div className="flex items-center text-sm">
                            <div className="mr-2">
                                {e.created_at}
                            </div>

                        </div>
                    </TableDetail>
                    <TableDetail>
                        <div className="flex items-center">
                            <div className="mr-2">
                                {e.checkup_record.registration.patient.person.name}
                            </div>
                            <Pill className="text-xs bg-green-600 text-white mr-2">{e.checkup_record.registration.patient.medical_record_number}</Pill>
                        </div>

                        <div className="text-sm">
                            {e.checkup_record.registration.patient.person.gender.name} &#8226; {e.checkup_record.registration.patient.person.age} Tahun
                        </div>
                    </TableDetail>
                    <TableDetail>
                        <div className="flex items-center">
                            <div className="mr-2">
                                {e.checkup_record.registration.clinic.name}
                            </div>

                        </div>
                        <div className="flex text-xs mb-2">
                            <Pill className="text-xs bg-blue-500 text-white mr-2">{e.doctor.name}</Pill>
                        </div>
                        <div className="flex text-xs mb-2">
                            <Pill className="text-xs bg-gray-500 text-white mr-2">{e.checkup_record.registration.registration_type.name}</Pill>
                            <Pill className="text-xs bg-green-600 text-white">{e.checkup_record.registration.visit_type.name}</Pill>
                        </div>
                        {e.medical_checkup ? <div className="flex text-xs">
                            <Pill className="text-xs bg-gray-500 text-white mr-2">{'Sudah diperiksa dokter'}</Pill>
                        </div> : null}
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </div>
}