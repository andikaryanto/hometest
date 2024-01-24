import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { paymentFilterState, paymentListNewObject, paymentListState, paymentNewObject, paymentState } from "@/States/Payment";
import { url_payments, url_patient_registration, url_patient_registrations } from "@/Common/Api";
import Pill from "@/Components/Pill/Pill";
import { personNewObject, personState } from "@/States/Person";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { usePage } from "@inertiajs/react";
import config from "../../Common/Config"
import getParameterValue, { formatCurrency } from "@/Common/Helper";
import PaymentFilter from "../Payment/PaymentFilter";
import MedicalCheckupInformation from "../MedicalCheckup/MedicalCheckupInformation";
import SlideSideBar from "@/Layouts/SlideSideBar";
import PaymentInformation from "./PaymentInformation";

export default function PaymentList() {

    const [payments, setPayments] = useRecoilState(paymentListState)
    const [payment, setPayment] = useRecoilState(paymentState)
    const [person, setPerson] = useRecoilState(personState);
    const [notification, setNotification] = useRecoilState(toastState);
    const paymentFilter = useRecoilValue(paymentFilterState);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isFiltePanelVisible, setIsFilterPanelVisible] = useState(true);
    const activeMenuItem = usePage();
    const registrationStatusId = getParameterValue(activeMenuItem, 'registration_status_id');


    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })

    const loadPayments = (params = {}) => {
        setIsLoadingData(true);
        if (paymentFilter.payment_date != '') {
            params = {
                ...params,
                payment_date: paymentFilter.payment_date
            }
        }

        if (paymentFilter.clinic.id > 0) {
            params = {
                ...params,
                clinic_id: paymentFilter.clinic.id
            }
        }

        if (paymentFilter.medical_record_number != '') {
            params = {
                ...params,
                medical_record_number: paymentFilter.medical_record_number
            }
        }

        get(url_payments, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setPayments(result.data.data);
                }
                if (result.status == 204) {
                    setPayments(paymentListNewObject);
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
        loadPayments({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (payment) => {
        setPayment(payment);
        setPerson(payment.medical_checkup.checkup_record.registration.patient.person)
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadPayments({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadPayments(paging)
    }

    const checkin = (e) => {

    }

    const onButtonActionClick = (actionButton, selectedItem) => {
        if (actionButton.href != undefined && actionButton.caption == 'Detail') {
            window.location = actionButton.href + '?registration_id=' + selectedItem.registration.id;
        }

        if (actionButton.href != undefined && actionButton.caption == 'Periksa Pasien') {
            window.location = actionButton.href + '?payment_id=' + selectedItem.id + '&clinic=' + selectedItem.registration.clinic.name;
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
        loadPayments(paging);
    }

    const onAddClick = () => {
        setPerson(personNewObject);
        setPayment(paymentNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadPayments(paging);
    }, []);

    let caption = 'Kasir';

    const headers = ['No', 'Pasien', 'Poli', 'Bayar'];
    return <AdminLayout textName={caption} breadCrumbItems={[
        {
            label: "Billing"
        }, {
            label: "Rekap"
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-1/2`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={true} title="Detail Pembayaran">
                <div className="flex">
                    <PaymentInformation title='Informasi Pembayaran'/>
                </div>
            </SlideSideBar>
            <PaymentFilter isVisible={isFiltePanelVisible} className={`w-64`} onFilterApply={onFilterApply} />
            {/* <Page className="w-full" textName={`Pendaftran Pasien`}> */}
            <Table processing={isLoadingData} text={''} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                showFilterButton={false}
                showAddButton={false}
                onAddClick={onAddClick}
                onFilterClick={() => setIsFilterPanelVisible(!isFiltePanelVisible)}
                page={payments._paging.page}
                size={payments._paging.limit}
                totalData={payments._paging.total_data}>
                {payments._resources && payments._resources.map((e, i) => {
                    const number = ((payments._paging.page - 1) * payments._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.medical_checkup.checkup_record.registration.patient.person.name}
                                </div>
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.medical_checkup.checkup_record.registration.patient.medical_record_number}</Pill>
                            </div>

                            <div className="text-sm">
                                {e.medical_checkup.checkup_record.registration.patient.person.gender.name} &#8226; {e.medical_checkup.checkup_record.registration.patient.person.age} Tahun
                            </div>
                            <div className="flex text-xs">
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.medical_checkup.checkup_record.registration.registration_status.name}</Pill>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.medical_checkup.checkup_record.registration.clinic.name}
                                </div>

                            </div>
                            <div className="flex text-xs mb-2">
                                <Pill className="text-xs bg-blue-500 text-white mr-2">{e.medical_checkup.checkup_record.registration.doctor.name}</Pill>
                            </div>
                            <div className="flex text-xs mb-2">
                                <Pill className="text-xs bg-gray-500 text-white mr-2">{e.medical_checkup.checkup_record.registration.registration_type.name}</Pill>
                                <Pill className="text-xs bg-green-600 text-white">{e.medical_checkup.checkup_record.registration.visit_type.name}</Pill>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.payment_number}
                                </div>

                            </div>
                            <div className="flex text-xs mb-2">
                                <Pill className="text-xs bg-green-600 text-white mr-2">{formatCurrency(e.amount)}</Pill>
                            </div>
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
            {/* </Page> */}
        </div>
    </AdminLayout>
}