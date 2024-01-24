import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import Disease from "./Disease";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { diseaseFilterState, diseaseListState, diseaseNewObject, diseaseState } from "@/States/Disease";
import SlideSideBar from "@/Layouts/SlideSideBar";
import DiseaseFilter from "./DiseaseFilter";
import { url_diseases } from "@/Common/Api";
import { pagingParameter } from "@/States/Common";

export default function DiseaseList() {
    const title = 'Penyakit';
    const [desease, setDisease] = useRecoilState(diseaseState)
    const [diseases, setDiseases] = useRecoilState(diseaseListState);
    const [isFormOpen, setFormOpen] = useState(false);
    const diseaseFilter = useRecoilValue(diseaseFilterState);

    const [paging, setPaging] = useState(pagingParameter())

    const loadDiseases = (params = {}) => {
        if(diseaseFilter.clinic.id > 0) {
            params = {
                ...params,
                clinic_id: diseaseFilter.clinic.id
            }
        }
        
        const accessToken = getToken();
        get(url_diseases, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setDiseases(result.data.data);
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
        loadDiseases({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (disease) => {
        setDisease(disease);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadDiseases({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadDiseases(paging)
    }

    const onFilterApply = () => {
        loadDiseases(paging);
    }

    const onAddClick = () => {
        setDisease(diseaseNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadDiseases(paging);
    }, [])

    const headers = ['No', 'Poli', 'Kode', 'Penyakit', 'Keterangan', 'Aksi'];
    return <AdminLayout textName={title} breadCrumbItems={[
        {
            label: "Master Data"
        }, {
            label: "Penyakit"
        }
    ]}>
        <div className="flex">
            <SlideSideBar title="Penyakit" className={`w-1/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false}>
                <div className="flex">
                    <Disease title={title} onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <DiseaseFilter isVisible={true} className={`w-64`} onFilterApply={onFilterApply} />
            <Table text={'Daftar '.title} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
            onAddClick={onAddClick}
                page={diseases._paging.page}
                size={diseases._paging.limit}
                totalData={diseases._paging.total_data}>
                {diseases._resources ? diseases._resources.map((e, i) => {
                    const number = ((diseases._paging.page - 1) * diseases._paging.limit) + i + 1;
                    return <TableRow onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            {e.clinic.name}
                        </TableDetail>
                        <TableDetail>
                            {e.code}
                        </TableDetail>
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
                }) : null}
            </Table>
        </div>
    </AdminLayout>
}