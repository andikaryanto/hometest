import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { useRecoilState, useRecoilValue } from "recoil";
import { url_medical_checkup_treatment_incentives } from "@/Common/Api";
import { pagingParameter } from "@/States/Common";
import Pill from "@/Components/Pill/Pill";
import { usePage } from "@inertiajs/react";
import getParameterValue, { formatCurrency } from "@/Common/Helper";
import { medicalCheckupTreatmentIncentiveFilterState, medicalCheckupTreatmentIncentiveListNewObject, medicalCheckupTreatmentIncentiveListState, medicalCheckupTreatmentIncentiveState }
    from "@/States/MedicalCheckup/Treatment/MedicalCheckupTreatmentIncentive";
import MedicalCheckupTreatmentIncentiveDoctorFilter from "./MedicalCheckupTreatmentIncentiveDoctorFilter";
import MedicalCheckupTreatmentIncentiveNurseFilter from "./MedicalCheckupTreatmentIncentiveNurseFilter";
import { FaArrowRight } from "react-icons/fa";

export default function MedicalCheckupTreatmentIncentiveList() {
    let title = '';
    const [medicalCheckupTreatmentIncentive, setMedicalCheckupTreatmentIncentive] = useRecoilState(medicalCheckupTreatmentIncentiveState)
    const [medicalCheckupTreatmentIncentives, setMedicalCheckupTreatmentIncentives] = useRecoilState(medicalCheckupTreatmentIncentiveListState);
    const [isFormOpen, setFormOpen] = useState(false);
    const medicalCheckupTreatmentIncentiveFilter = useRecoilValue(medicalCheckupTreatmentIncentiveFilterState);
    const [paging, setPaging] = useState(pagingParameter());
    const activeMenuItem = usePage();
    const worker = getParameterValue(activeMenuItem, 'worker');

    if(worker == 'doctor') {
        title = 'Dokter'
    }

    if(worker == 'nurse') {
        title = 'Perawat'
    }

    const loadMedicalCheckupTreatmentIncentives = (params = {}) => {
        params = {
            ...params,
            worker
        }

        if (medicalCheckupTreatmentIncentiveFilter.doctor.id > 0) {
            params = {
                ...params,
                doctor_id: medicalCheckupTreatmentIncentiveFilter.doctor.id
            }
        }

        if (medicalCheckupTreatmentIncentiveFilter.incentive_date != null) {
            params = {
                ...params,
                incentive_date: medicalCheckupTreatmentIncentiveFilter.incentive_date
            }
        }

        if (medicalCheckupTreatmentIncentiveFilter.health_worker.id > 0) {
            params = {
                ...params,
                health_worker_id: medicalCheckupTreatmentIncentiveFilter.health_worker.id
            }
        }

        const accessToken = getToken();
        get(url_medical_checkup_treatment_incentives, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckupTreatmentIncentives(result.data.data);
                }

                if (result.status == 204) {
                    setMedicalCheckupTreatmentIncentives(medicalCheckupTreatmentIncentiveListNewObject);
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
        loadMedicalCheckupTreatmentIncentives({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (medicalCheckupTreatmentIncentive) => {
        setMedicalCheckupTreatmentIncentive(medicalCheckupTreatmentIncentive);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadMedicalCheckupTreatmentIncentives({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadMedicalCheckupTreatmentIncentives(paging)
    }

    const onFilterApply = () => {
        loadMedicalCheckupTreatmentIncentives(paging);
    }

    const onAddClick = () => {
        setMedicalCheckupTreatmentIncentive(medicalCheckupTreatmentIncentiveNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadMedicalCheckupTreatmentIncentives(paging);
    }, []);

    let filterComponent = null;
    if (worker == 'doctor') {
        filterComponent = <MedicalCheckupTreatmentIncentiveDoctorFilter isVisible={true} className={`w-64`} onFilterApply={onFilterApply} />;
    } else {
        filterComponent = <MedicalCheckupTreatmentIncentiveNurseFilter isVisible={true} className={`w-64`} onFilterApply={onFilterApply} />;
    }

    const headers = ['No', 'Nama', 'Pemeriksaan', 'Tindakan Insentif'];
    return <AdminLayout textName={title} breadCrumbItems={[
        {
            label: "Insentif"
        }, {
            label: "Insentif " + title
        }
    ]}>
        <div className="flex">
            {filterComponent}
            <Table text={''} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                showAddButton={false}
                page={medicalCheckupTreatmentIncentives._paging.page}
                size={medicalCheckupTreatmentIncentives._paging.limit}
                totalData={medicalCheckupTreatmentIncentives._paging.total_data}>
                {medicalCheckupTreatmentIncentives._resources ? medicalCheckupTreatmentIncentives._resources.map((e, i) => {
                    const number = ((medicalCheckupTreatmentIncentives._paging.page - 1) * medicalCheckupTreatmentIncentives._paging.limit) + i + 1;
                    const workerName = worker == 'doctor' ? e.incentive.doctor?.name : e.incentive.health_worker?.name;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {workerName}
                                </div>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="items-center">
                                <div className="mr-2">
                                    {e.medical_checkup_treatment.medical_checkup.checkup_number}
                                </div>

                                <div className="mr-2 flex">
                                    <Pill className="text-xs bg-green-600 text-white">
                                        {e.medical_checkup_treatment.medical_checkup.created_at}
                                    </Pill>
                                </div>
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="mb-1">
                                {e.medical_checkup_treatment.treatment.name}
                            </div>
                            <div className="flex items-center">
                                <Pill className="text-xs bg-blue-600 text-white mr-2">
                                    {formatCurrency(e.medical_checkup_treatment.amount, false)}
                                </Pill>
                                <FaArrowRight className="text-sm mr-2" />
                                <Pill className="text-xs bg-blue-600 text-white mr-2">
                                    {formatCurrency(e.incentive_amount, false)}
                                </Pill>
                            </div>
                        </TableDetail>
                    </TableRow>
                }) : null}
            </Table>
        </div>
    </AdminLayout>
}