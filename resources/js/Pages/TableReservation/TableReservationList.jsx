import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { url_table_reservations, url_patient_registration, url_patient_registrations, url_table_reservation } from "@/Common/Api";
import Pill from "@/Components/Pill/Pill";
import { personNewObject, personState } from "@/States/Person";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { usePage } from "@inertiajs/react";
import config from "../../Common/Config"
import getParameterValue from "@/Common/Helper";
import { tableReservationListNewObject, tableReservationListState, tableReservationNewObject, tableReservationState } from "@/States/TableReservation";

export default function TableRerservationList() {

    const [tableReservations, setTableRerservations] = useRecoilState(tableReservationListState)
    const [tableReservation, setTableRerservation] = useRecoilState(tableReservationState)
    const [notification, setNotification] = useRecoilState(toastState);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);
    const [isFiltePanelVisible, setIsFilterPanelVisible] = useState(false);


    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })

    const loadTableRerservations = (params = {}) => {
        setIsLoadingData(true);
        params = {
            ...params,
            embed: ['scope']
        }
        get(url_table_reservations, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setTableRerservations(result.data.data);
                }
                if (result.status == 204) {
                    setTableRerservations(tableReservationListNewObject);
                }

                setIsLoadingData(false);
            })
            .catch(err => {
                setIsLoadingData(false);
            });
    }

    const postTableReservation = () => {
        if (tableReservation.id > 0) {
            patch(url_table_reservation + '/' + tableReservation.id, getToken(), {
                is_complete: true
            })
                .then(result => {
                    if (result.status == 200) {
                        setToast({
                            color: ToastColor.success,
                            message: 'Success to update status'
                        });
                        loadTableRerservations();
                    }
                })
                .catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: 'Failed to update status'
                    })
                })
        }
    }

    const onSearch = (e) => {
        setPaging({
            ...paging,
            keyword: e.target.value
        });
        loadTableRerservations({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (tableReservation) => {
        setTableRerservation(tableReservation);
        setPerson(tableReservation.registration.patient.person)
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadTableRerservations({
            ...paging,
            page: page
        });
    }

    const onButtonActionClick = (actionButton, selectedItem) => {
        setTableRerservation(selectedItem);
        if (actionButton.caption == 'Complete') {
            postTableReservation();
        }
    }

    const getActionButtonsItems = () => {
        return [
            {
                caption: 'Complete'
            }
        ];
    }

    const onFilterApply = () => {
        loadTableRerservations(paging);
    }

    const onAddClick = () => {
        setPerson(personNewObject);
        setTableRerservation(tableReservationNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadTableRerservations(paging);
    }, []);

    const headers = ['No', 'Table', 'Reservation', 'Creator', 'Aksi'];
    return <AdminLayout textName={'Table Reservation'} breadCrumbItems={[
        {
            label: "Reservations"
        }, {
            label: "Table Rerservations"
        }
    ]}>
        <div className="flex">
            <Table processing={isLoadingData} text={''} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                showFilterButton={false}
                showAddButton={false}
                onAddClick={onAddClick}
                onFilterClick={() => setIsFilterPanelVisible(!isFiltePanelVisible)}
                page={tableReservations._paging.page}
                size={tableReservations._paging.limit}
                totalData={tableReservations._paging.total_data}>
                {tableReservations._resources && tableReservations._resources.map((e, i) => {
                    const number = ((tableReservations._paging.page - 1) * tableReservations._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => { onEdit(e) }}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <span>{e.table.name}</span>
                        </TableDetail>
                        <TableDetail>
                            <div className="items-center">
                                <div className="mr-2">
                                    {e.reserve_for}
                                </div>
                                <div className="flex">
                                    <Pill className="text-xs bg-green-600 text-white mr-2">{e.reserve_at}</Pill>
                                    {e.is_complete ?
                                        <Pill className="text-xs bg-blue-600 text-white mr-2">complete</Pill> :
                                        null}
                                </div>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="items-center">
                                <div className="mr-2">
                                    {e.user.username}
                                </div>
                                <div className="flex">
                                    <Pill className="text-xs bg-green-600 text-white mr-2 mb-1">{e.user.scopes.map((e, i) => e.name).join(', ')}</Pill>
                                    
                                </div>

                            </div>
                        </TableDetail>
                        <TableDetail className={'items-center'}>
                            <CircleActionButton items={getActionButtonsItems()} selectedItem={e} onOptionClick={onButtonActionClick} className={`text-xs p-1 rounded-lg`} />
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
            {/* </Page> */}
        </div>
    </AdminLayout>
}