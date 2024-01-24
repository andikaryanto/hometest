import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import Person from "./Person";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { personFilterState, personListState, personNewObject, personState } from "@/States/Person";
import SlideSideBar from "@/Layouts/SlideSideBar";
// import PersonFilter from "./PersonFilter";
import { url_persons } from "@/Common/Api";
import { pagingParameter } from "@/States/Common";
import Pill from "@/Components/Pill/Pill";
import MedicalCheckupInformation from "../MedicalCheckup/MedicalCheckupInformation";
import MedicalCheckupHistoryList from "../MedicalCheckup/MedicalCheckupHIstoryList";
import PersonFilter from "./PersonFilter";

export default function PersonList() {
    const title = 'Penyakit';
    const [person, setPerson] = useRecoilState(personState)
    const [persons, setPersons] = useRecoilState(personListState);
    const [isFormOpen, setFormOpen] = useState(false);
    const personFilter = useRecoilValue(personFilterState);

    const [paging, setPaging] = useState(pagingParameter())

    const loadPersons = (params = {}) => {
        if (personFilter.medical_record_number != '') {
            params = {
                ...params,
                medical_record_number: personFilter.medical_record_number
            }
        }

        const accessToken = getToken();
        get(url_persons, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setPersons(result.data.data);
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
        loadPersons({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (person) => {
        setPerson(person);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadPersons({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadPersons(paging)
    }

    const onFilterApply = () => {
        loadPersons(paging);
    }

    const onAddClick = () => {
        setPerson(personNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadPersons(paging);
    }, [])

    const headers = ['No', 'Pasien', 'Detil'];
    return <AdminLayout textName={title} breadCrumbItems={[
        {
            label: "Executive Summary"
        }, {
            label: "Rekam Medis"
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-10/12`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={true} title="Rekam Medis Pasien">
                <div className="flex">
                    <MedicalCheckupHistoryList patient={person.patient} />
                </div>
            </SlideSideBar>
            <PersonFilter isVisible={true} className={`w-64`} onFilterApply={onFilterApply} />
            <Table text={''} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                showAddButton={false}
                page={persons._paging.page}
                size={persons._paging.limit}
                totalData={persons._paging.total_data}>
                {persons._resources ? persons._resources.map((e, i) => {
                    const number = ((persons._paging.page - 1) * persons._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.name}
                                </div>
                                <Pill className="text-xs bg-green-600 text-white mr-2">{e.patient.medical_record_number}</Pill>
                            </div>

                            <div className="text-sm">
                                {e.gender.name} &#8226; {e.age} Tahun
                            </div>
                        </TableDetail>
                        <TableDetail>
                            <div className="mb-1 text-sm">
                                <div>{e.address}</div>
                                <div className="lowercase">
                                    {e.village.name}, {e.village.district.name}, {e.village.district.regency.name}, {e.village.district.regency.province.name}
                                </div>
                            </div>
                            <div className="flex items-center mb-1">
                                <Pill className="text-xs bg-green-600 text-white mr-2">
                                    {e.place_of_birth}, {e.date_of_birth}
                                </Pill>
                            </div>
                            <div className="flex items-center">
                                <Pill className="text-xs bg-blue-600 text-white mr-2">
                                    {e.job}
                                </Pill>
                            </div>
                        </TableDetail>
                    </TableRow>
                }) : null}
            </Table>
        </div>
    </AdminLayout>
}