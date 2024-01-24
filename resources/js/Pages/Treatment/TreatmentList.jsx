import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import Treatment from "./Treatment";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { treatmentFilterState, treatmentListState, treatmentNewObject, treatmentState } from "@/States/Treatment";
import SlideSideBar from "@/Layouts/SlideSideBar";
import TreatmentFilter from "./TreatmentFilter";
import { url_treatments } from "@/Common/Api";
import { formatCurrency } from "@/Common/Helper";

export default function TreatmentList() {
    const title = 'Tindakan';
    const [treatment, setTreatment] = useRecoilState(treatmentState)
    const [treatments, setTreatments] = useRecoilState(treatmentListState);
    const [isFormOpen, setFormOpen] = useState(false);
    const treatmentFilter = useRecoilValue(treatmentFilterState);

    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })

    const loadTreatments = (params = {}) => {
        // if(treatmentFilter.clinic.id > 0) {
        //     params = {
        //         ...params,
        //         clinic_id: treatmentFilter.clinic.id
        //     }
        // }
        
        const accessToken = getToken();
        get(url_treatments, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setTreatments(result.data.data);
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
        loadTreatments({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (treatment) => {
        setTreatment(treatment);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadTreatments({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadTreatments(paging)
    }

    const onFilterApply = () => {
        loadTreatments(paging);
    }

    const onAddClick = () => {
        setTreatment(treatmentNewObject);
        setFormOpen(true);
    }

    useEffect(() => {
        loadTreatments(paging);
    }, [])

    const headers = ['No', 'Tindakan', "Tarif Pasien", 'Aksi'];
    return <AdminLayout textName={title} breadCrumbItems={[
        {
            label: "Master Data"
        }, {
            label: "Tindakan"
        }
    ]}>
        <div className="flex">
            <SlideSideBar title="Tindakan" className={`w-1/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="right" isScrollabe={false}>
                <div className="flex">
                    <Treatment title={title} onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            {/* <TreatmentFilter isVisible={true} className={`w-64`} onFilterApply={onFilterApply} /> */}
            <Table text={'Daftar '.title} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
            onAddClick={onAddClick}
                page={treatments._paging.page}
                size={treatments._paging.limit}
                totalData={treatments._paging.total_data}>
                {treatments._resources ? treatments._resources.map((e, i) => {
                    const deleteModal = <ModalClean isDialog={true} className="text-primary hover:text-dark-primary" text={'Delete'}></ModalClean>;
                    const number = ((treatments._paging.page - 1) * treatments._paging.limit) + i + 1;
                    return <TableRow onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            {e.name}
                        </TableDetail>
                        <TableDetail>
                            {formatCurrency(e.price)}
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