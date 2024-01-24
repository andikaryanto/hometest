import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { patientRegistrationFilterState, patientRegistrationListNewObject, patientRegistrationListState, patientRegistrationNewObject, patientRegistrationState } from "@/States/Patient/Registration";
import Loading from "@/Components/Loading";
import NoData from "@/Pages/NoData";
import Person from "@/Pages/Person/Person";
import { url_patient_registration, url_patient_registrations } from "@/Common/Api";
import PatientRegistration from "./Registration";
import Pill from "@/Components/Pill/Pill";
import { personNewObject, personState } from "@/States/Person";
import { Button } from "@/Components/Button/Button";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import SlideSideBar from "@/Layouts/SlideSideBar";
import SlideLeftSideBar from "@/Layouts/SlideSideBar";
import { usePage } from "@inertiajs/react";
import config from "../../../Common/Config"
import getParameterValue from "@/Common/Helper";
import Panel from "@/Components/Panel";
import Page from "@/Components/Page";
import RegistrationFilter from "./RegistrationFilter";

export default function RegistrationList() {

    const [patientRegistrations, setRegistrations] = useRecoilState(patientRegistrationListState)
    const [patientRegistration, setRegistration] = useRecoilState(patientRegistrationState)
    const [person, setPerson] = useRecoilState(personState);
    const [notification, setNotification] = useRecoilState(toastState);
    const patientRegistrationFilter = useRecoilValue(patientRegistrationFilterState);
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

    const loadRegistrations = (params = {}) => {
        setIsLoadingData(true);
        if (registrationStatusId) {
            params = {
                ...params,
                registration_status_id: registrationStatusId
            }
        }

        if (patientRegistrationFilter.doctor.id > 0) {
            params = {
                ...params,
                doctor_id: patientRegistrationFilter.doctor.id
            }
        }

        if (patientRegistrationFilter.clinic.id > 0) {
            params = {
                ...params,
                clinic_id: patientRegistrationFilter.clinic.id
            }
        }

        if (patientRegistrationFilter.registration_type.id > 0) {
            params = {
                ...params,
                registration_type_id: patientRegistrationFilter.registration_type.id
            }
        }

        if (patientRegistrationFilter.visit_type.id > 0) {
            params = {
                ...params,
                visit_type_id: patientRegistrationFilter.visit_type.id
            }
        }

        const accessToken = getToken();
        get(url_patient_registrations, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setRegistrations(result.data.data);
                }
                if (result.status == 204) {
                    setRegistrations(patientRegistrationListNewObject);
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
        loadRegistrations({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (patientRegistration) => {
        setRegistration(patientRegistration);
        setPerson(patientRegistration.patient.person)
        if (registrationStatusId != 1) {
            setFormOpen(true);
        }
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadRegistrations({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadRegistrations(paging)
    }

    const checkin = (e) => {

    }

    const onButtonActionClick = (actionButton, selectedItem) => {
        if (actionButton.href != undefined) {
            window.location = actionButton.href + '?registration_id=' + selectedItem.id;
        } else {
            const params = {
                registration_status: {
                    id: actionButton.value
                }
            }

            patch(url_patient_registration + '/' + selectedItem.id, getToken(), params)
                .then(result => {
                    if (result.status == 200) {
                        setNotification({
                            color: ToastColor.success,
                            message: 'Berhasil Ubah Status: ' + actionButton.caption
                        });

                        loadRegistrations(paging);
                    }
                }).catch(err => {
                    setNotification({
                        color: ToastColor.danger,
                        message: 'Gagal Ubah Status: ' + actionButton.caption
                    });
                });
        }
    }

    const getActionButtonsItems = () => {
        if (registrationStatusId == 1) {
            return [
                {
                    caption: 'Periksa',
                    href: config.web_url + '/checkup-record/add',
                    value: 2
                }
            ]
        } else {
            return [{
                caption: 'Check In',
                value: 1
            }, {

                caption: 'Selesai',
                value: 3
            }, {

                caption: 'Pending',
                value: 4
            }]
        }
    }

    const onFilterApply = () => {
        loadRegistrations(paging);
    }

    const onAddClick = () => {
        setPerson(personNewObject);
        setRegistration(patientRegistrationNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadRegistrations(paging);
    }, []);

    let caption = registrationStatusId == 1 ? 'Pemerikasaan Awal' : 'Pendaftaran Pasien';

    const headers = ['No', 'Pasien', 'Poli', 'Tanggal', 'Aksi'];
    return <AdminLayout textName={caption} breadCrumbItems={[
        {
            label: "Pendaftaran Pasien"
        }, {
            label: registrationStatusId == 1 ? 'Pemerikasaan Awal' : 'Pendaftaran Pasien'
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-2/4`} title="Registrasi Pasien" isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false}>
                <div className="flex">
                    <Person title='Data Pasien' onSubmit={onManipluate} className={`mr-8`} />
                    <PatientRegistration title={'Pendaftaran'} onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <RegistrationFilter isVisible={isFiltePanelVisible} className={`w-64`} onFilterApply={onFilterApply} />
            {/* <Page className="w-full" textName={`Pendaftran Pasien`}> */}
            <Table processing={isLoadingData} text={''} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                showFilterButton={false}
                showAddButton={registrationStatusId == null}
                onAddClick={onAddClick}
                onFilterClick={() => setIsFilterPanelVisible(!isFiltePanelVisible)}
                page={patientRegistrations._paging.page}
                size={patientRegistrations._paging.limit}
                totalData={patientRegistrations._paging.total_data}>
                {patientRegistrations._resources && patientRegistrations._resources.map((e, i) => {
                    const number = ((patientRegistrations._paging.page - 1) * patientRegistrations._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.patient.person.name}
                                </div>
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.patient.medical_record_number}</Pill>
                            </div>

                            <div className="text-sm">
                                {e.patient.person.gender.name} &#8226; {e.patient.person.age} Tahun
                            </div>
                            <div className="flex text-xs">
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.registration_status.name}</Pill>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.clinic.name}
                                </div>

                            </div>
                            <div className="flex text-xs mb-2">
                                <Pill className="text-xs bg-blue-500 text-white mr-2">{e.doctor.name}</Pill>
                            </div>
                            <div className="flex text-xs">
                                <Pill className="text-xs bg-gray-500 text-white mr-2">{e.registration_type.name}</Pill>
                                <Pill className="text-xs bg-green-600 text-white">{e.visit_type.name}</Pill>
                            </div>
                        </TableDetail>
                        <TableDetail>{e.created_at}</TableDetail>
                        <TableDetail className={'items-center'}>
                            <CircleActionButton items={getActionButtonsItems()} selectedItem={e} onOptionClick={onButtonActionClick} className={`text-xs p-1 rounded-lg`}>Check in</CircleActionButton>
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
            {/* </Page> */}
        </div>
    </AdminLayout>
}