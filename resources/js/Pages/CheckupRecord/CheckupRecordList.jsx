import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { checkupRecordFilterState, checkupRecordListNewObject, checkupRecordListState, checkupRecordNewObject, checkupRecordState } from "@/States/CheckupRecord";
import { url_checkup_records, url_patient_registration, url_patient_registrations } from "@/Common/Api";
import Pill from "@/Components/Pill/Pill";
import { personNewObject, personState } from "@/States/Person";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { usePage } from "@inertiajs/react";
import config from "../../Common/Config"
import getParameterValue from "@/Common/Helper";
import CheckupRecordFilter from "../CheckupRecord/CheckupRecordFilter";

export default function CheckupRecordList() {

    const [checkupRecords, setCheckupRecords] = useRecoilState(checkupRecordListState)
    const [checkupRecord, setCheckupRecord] = useRecoilState(checkupRecordState)
    const [person, setPerson] = useRecoilState(personState);
    const [notification, setNotification] = useRecoilState(toastState);
    const checkupRecordFilter = useRecoilValue(checkupRecordFilterState);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isFiltePanelVisible, setIsFilterPanelVisible] = useState(false);
    const activeMenuItem = usePage();
    const registrationStatusId = getParameterValue(activeMenuItem, 'registration_status_id');


    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })

    const loadCheckupRecords = (params = {}) => {
        setIsLoadingData(true);
        if (registrationStatusId) {
            params = {
                ...params,
                registration_status_id: registrationStatusId
            }
        }

        if (checkupRecordFilter.registration.doctor.id > 0) {
            params = {
                ...params,
                doctor_id: checkupRecordFilter.registration.doctor.id
            }
        }

        if (checkupRecordFilter.registration.clinic.id > 0) {
            params = {
                ...params,
                clinic_id: checkupRecordFilter.registration.clinic.id
            }
        }

        if (checkupRecordFilter.registration.registration_type.id > 0) {
            params = {
                ...params,
                registration_type_id: checkupRecordFilter.registration.registration_type.id
            }
        }

        if (checkupRecordFilter.registration.visit_type.id > 0) {
            params = {
                ...params,
                visit_type_id: checkupRecordFilter.registration.visit_type.id
            }
        }

        params = {
            ...params,
            embed: ['medical_checkup']
        }

        get(url_checkup_records, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setCheckupRecords(result.data.data);
                }
                if (result.status == 204) {
                    setCheckupRecords(checkupRecordListNewObject);
                }

                setIsLoadingData(false);
            })
            .catch(err => {
                setIsLoadingData(false);
            });
    }

    const onSearch = (e) => {
        setPaging({
            ...paging,
            keyword: e.target.value
        });
        loadCheckupRecords({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (checkupRecord) => {
        setCheckupRecord(checkupRecord);
        setPerson(checkupRecord.registration.patient.person)
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadCheckupRecords({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadCheckupRecords(paging)
    }

    const checkin = (e) => {

    }

    const onButtonActionClick = (actionButton, selectedItem) => {
        if (actionButton.href != undefined && actionButton.caption == 'Detail' ) {
            window.location = actionButton.href + '?registration_id=' + selectedItem.registration.id;
        }

        if (actionButton.href != undefined && actionButton.caption == 'Periksa Pasien' ) {
            window.location = actionButton.href + '?checkup_record_id=' + selectedItem.id + '&clinic=' + selectedItem.registration.clinic.name;
        }
    }

    const getActionButtonsItems = () => {
        return [
            {
                caption: 'Detail',
                href: config.web_url + '/checkup-record/add'
            },
            {
                caption: 'Periksa Pasien',
                href: config.web_url + '/medical-checkup/add'
            }
        ];
    }

    const onFilterApply = () => {
        loadCheckupRecords(paging);
    }

    const onAddClick = () => {
        setPerson(personNewObject);
        setCheckupRecord(checkupRecordNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadCheckupRecords(paging);
    }, []);

    let caption = registrationStatusId == 1 ? 'Pemerikasaan Awal' : 'Pendaftaran Pasien';

    const headers = ['No', 'Periksa Awal', 'Pasien', 'Poli', 'Aksi'];
    return <AdminLayout textName={caption} breadCrumbItems={[
        {
            label: "Pemeriksaan Pasien"
        }, {
            label: "Pasien Daftar"
        }
    ]}>
        <div className="flex">
            <CheckupRecordFilter isVisible={isFiltePanelVisible} className={`w-64`} onFilterApply={onFilterApply} />
            {/* <Page className="w-full" textName={`Pendaftran Pasien`}> */}
            <Table processing={isLoadingData} text={''} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                showFilterButton={false}
                showAddButton={false}
                onAddClick={onAddClick}
                onFilterClick={() => setIsFilterPanelVisible(!isFiltePanelVisible)}
                page={checkupRecords._paging.page}
                size={checkupRecords._paging.limit}
                totalData={checkupRecords._paging.total_data}>
                {checkupRecords._resources && checkupRecords._resources.map((e, i) => {
                    const number = ((checkupRecords._paging.page - 1) * checkupRecords._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => {onEdit(e)}}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <span>{e.checkup_number}</span>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.registration.created_at}
                                </div>

                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.registration.patient.person.name}
                                </div>
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.registration.patient.medical_record_number}</Pill>
                            </div>

                            <div className="text-sm">
                                {e.registration.patient.person.gender.name} &#8226; {e.registration.patient.person.age} Tahun
                            </div>
                            <div className="flex text-xs">
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.registration.registration_status.name}</Pill>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.registration.clinic.name}
                                </div>

                            </div>
                            <div className="flex text-xs mb-2">
                                <Pill className="text-xs bg-blue-500 text-white mr-2">{e.registration.doctor.name}</Pill>
                            </div>
                            <div className="flex text-xs mb-2">
                                <Pill className="text-xs bg-gray-500 text-white mr-2">{e.registration.registration_type.name}</Pill>
                                <Pill className="text-xs bg-green-600 text-white">{e.registration.visit_type.name}</Pill>
                            </div>
                            {e.medical_checkup ? <div className="flex text-xs">
                                <Pill className="text-xs bg-gray-500 text-white mr-2">{'Sudah diperiksa dokter'}</Pill>
                            </div> : null}
                        </TableDetail>
                        <TableDetail className={'items-center'}>
                            <CircleActionButton items={getActionButtonsItems()} selectedItem={e} onOptionClick={onButtonActionClick} className={`text-xs p-1 rounded-lg`}/>
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
            {/* </Page> */}
        </div>
    </AdminLayout>
}