import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { NumberAssignmentItem } from "./NumberAssignmentItem";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { CircleCard } from "@/Components/Card/CircleCardCard";
import { Button } from "@/Components/Button/Button";
import { BorderedRoundedButton } from "@/Components/Button/BorderedRoundedButton";
import { ButtonLink } from "@/Components/Link/ButtonLink";
import { RoundedButton } from "@/Components/Button/RoundedButton";
import { FaPlus } from "react-icons/fa";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import { url_number_assignments } from "@/Common/Api";

export default function NumberAssignmentList() {

    const [numberAssingments, setNumberAssignments] = useState({
        _resources: [],
        _paging: {}
    });
    // const [modalOpen, setModalOpen] = useState(false);

    const onOk = () => {
        alert('ok clicked')
    };

    const loadNumberAssigment = (params) => {
        const accessToken = getCookie('access_token');
        get(url_number_assignments, accessToken, params)
        .then(result => {
            if(result.status == 200) {
                setNumberAssignments(result.data.data);
            }
        })
        .catch(err => {

        });
    }

    const onSearch = (e) => {
        const search = {
            keyword: e.target.value
        }
        loadNumberAssigment(search);
    }

    const getLastCalledNumber = () => {
        const lastCalledNumbers = numberAssingments._resources.filter(item => item.is_called).sort((a, b) => b.id - a.id);
        if(lastCalledNumbers.length > 0) {
            return lastCalledNumbers[0].sequence;
        }

        return '';

    }

    const call = (numberAssigment) => {
        const accessToken = getCookie('access_token');
        patch('/number-assignment/' + numberAssigment.id, accessToken, {
            is_called: true
        }).then((result) => {
            if(result.status == 200) {
                const nomor = numberAssigment.sequence.split('-');
                const nomorString = Array.from(nomor[0]).join('..') + '..' + nomor[1] + '..';
                const speak = `Nomor Antrean.... ${nomorString} Silakan Ke Loket Satu`;
                const utterance = new SpeechSynthesisUtterance(speak);
                utterance.lang = 'id-ID';
                window.speechSynthesis.speak(utterance);
                loadNumberAssigment();
            }
        })
    }

    const addNumber = () => {
        const accessToken = getCookie('access_token');
        post('/number-assignment', accessToken, {
            is_called: false
        }).then((result) => {
            if(result.status == 201) {
                loadNumberAssigment();
            }
        })
    }

    useEffect(() => {
        loadNumberAssigment();
    }, [])

    const headers = ['No', 'Waktu Ambil', 'Antrean', 'Aksi'];
    return <AdminLayout textName={'Antrean Front Office'}>
        {/* <div className="flex justify-end">
            <RoundedButton className={`bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center`}
                onClick={addNumber} >
            <div className="mr-2">Tambah Antrean</div>  <FaPlus/> 
            </RoundedButton>
        </div> */}
        <div className="flex">            
            <div className="w-1/4 mr-4">
                <RoundedCard className={'text-center w-full border-gray-200 border border-opacity-20 justify-center'}>
                    <div className="text-xl mb-10">No Antrian Dipanggil</div>
                    <div className="text-3xl mb-2 text-green-500">{getLastCalledNumber()}</div>
                    <div className="text-lg">LOKET 1</div>
                </RoundedCard>
            </div>
            <Table text={'Daftar Antrean'}  columns={headers} onSearch={onSearch}
                onAddClick={addNumber}
                page={numberAssingments._paging.page}
                size={numberAssingments._paging.limit}
                totalData={numberAssingments._paging.total_data}
                showRefresh={false}>
                {numberAssingments._resources.map((e, i) => {
                    const deleteModal = <ModalClean isDialog={true} className="text-primary hover:text-dark-primary" text={'Delete'}></ModalClean>;
                    const number = i+1;
                    return <TableRow>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            {e.pick_at}
                        </TableDetail>
                        <TableDetail>
                            {e.sequence}
                        </TableDetail>                    
                        <TableDetail className={'items-center'}>
                            <BorderedRoundedButtonSmall onClick={() => call(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Panggil</BorderedRoundedButtonSmall>
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
        </div>
    </AdminLayout>
}