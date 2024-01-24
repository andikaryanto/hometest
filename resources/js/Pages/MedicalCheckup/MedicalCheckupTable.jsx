import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
// import MedicalCheckup from "./MedicalCheckup";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { medicalCheckupFilterState, medicalCheckupListState, medicalCheckupNewObject, medicalCheckupState } from "@/States/MedicalCheckup";
import Loading from "@/Components/Loading";
import { url_medical_checkups } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { pagingParameter } from "@/States/Common";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Pill from "@/Components/Pill/Pill";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import Config from "@/Common/Config";
import MedicalCheckupInformation from "./MedicalCheckupInformation";
import MedicalCheckupFilter from "./MedicalCheckupFilter";
import { usePage } from "@inertiajs/react";
import getParameterValue from "@/Common/Helper";
import MedicalCheckupItem from "./MedicalCheckupItem";

export default function MedicalCheckupTable({ }) {

    const [medicalCheckups, setMedicalCheckups] = useRecoilState(medicalCheckupListState)
    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupState)
    const medicalCheckupFilter = useRecoilValue(medicalCheckupFilterState)
    const [isFormOpen, setFormOpen] = useState(false);
    const [paging, setPaging] = useState(pagingParameter());

    const activeMenuItem = usePage();
    const page = getParameterValue(activeMenuItem, 'page');

    const loadMedicalCheckups = (params = {}) => {
        if (medicalCheckupFilter.clinic.id > 0) {
            params = {
                ...params,
                clinic_id: medicalCheckupFilter.clinic.id
            }
        }

        if (medicalCheckupFilter.medical_record_number != '') {
            params = {
                ...params,
                medical_record_number: medicalCheckupFilter.medical_record_number
            }
        }
        get(url_medical_checkups, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckups(result.data.data);
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

    const getActionButtonsItems = () => {
        if (page == 'prescription') {
            return [{
                caption: 'Resep'
            }];
        }
        return [
            {
                caption: 'Bayar',
                href: Config.web_url + '/payment/add'
            }
        ];
    }

    const onButtonActionClick = (actionButton, selectedItem) => {
        if (actionButton.href != undefined && actionButton.caption == 'Bayar') {
            window.location = actionButton.href + '?medical_checkup_id=' + selectedItem.id;
        }

        if (actionButton.caption == 'Resep') {
            onEdit(selectedItem);
        }
    }

    let sideBarContent = <MedicalCheckupInformation title='Informasi Pemeriksaan Pasien' />;
    if (page == 'prescription') {
        sideBarContent = <MedicalCheckupItem title='Resep' onManipulate={() => loadMedicalCheckups(paging)} />
    }

    const onFilterApply = () => {
        loadMedicalCheckups(paging);
    }

    useEffect(() => {
        loadMedicalCheckups(paging);
    }, [])

    const headers = ['No', 'Periksa Pasien', 'Pasien', 'Poli', 'Aksi'];
    return <div className="flex">
        <SlideSideBar className={`w-10/12`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Resep">
            <div className="flex">
                {sideBarContent}
            </div>
        </SlideSideBar>
        <MedicalCheckupFilter isVisible={true} className={`w-64`} onFilterApply={onFilterApply} />
        <Table text={'Kasir'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
            showAddButton={false}
            page={medicalCheckups._paging.page}
            size={medicalCheckups._paging.limit}
            totalData={medicalCheckups._paging.total_data}>
            {medicalCheckups._resources && medicalCheckups._resources.map((e, i) => {
                const number = ((medicalCheckups._paging.page - 1) * medicalCheckups._paging.limit) + i + 1;
                return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        <span>{e.checkup_number}</span>
                        <div className="flex items-center text-sm">
                            <div className="mr-2">
                                {e.created_at}
                            </div>

                        </div>
                        <div className="flex text-sm">
                            <Pill className={`mb-1 text-xs ${e.payment ? 'bg-green-600' : 'bg-red-600'} text-white mr-2`}>
                                {e.payment ? 'Sudah Bayar #' + e.payment.payment_number : 'Belum Bayar'}
                            </Pill>
                            {e.is_prescription_given && <Pill className={`text-xs bg-yellow-600 text-white mr-2`}>
                                {'Sudah Obat'}
                            </Pill>}
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
                        <div className="flex text-xs">
                            <Pill className="text-xs bg-green-600 text-white mr-2">{e.checkup_record.registration.registration_status.name}</Pill>
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
                    <TableDetail className={'items-center'}>
                        <CircleActionButton items={getActionButtonsItems()} selectedItem={e} onOptionClick={onButtonActionClick} className={`text-xs p-1 rounded-lg`} />
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </div>
}