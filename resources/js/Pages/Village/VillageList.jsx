
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { Column } from "@/Components/Grid/Column";
import { RoundedButton } from "@/Components/Button/RoundedButton";
import { ButtonLink } from "@/Components/Link/ButtonLink";

export default function VillageList() {

    const [villages, setVillages] = useState([]);
    // const [modalOpen, setModalOpen] = useState(false);

    const onOk = () => {
        alert('ok clicked')
    };

    const loadUser = () => {
        const accessToken = getCookie('access_token');
        get('/villages', accessToken)
        .then(result => {
            if(result.status == 200) {
                setVillages(result.data.data._resources);
            }
        })
        .catch(err => {

        });
    }

    useEffect(() => {
        loadUser();
    }, [])

    const headers = ['id', 'name', 'district', 'city'];
    return <AdminLayout textName={'Villages'}>
        <Column className={'justify-end'}>
            <ButtonLink href="/village/add" className={'bg-primary text-white hover:bg-dark-primary'}>Add</ButtonLink>
        </Column>
        <Table columns={headers}>
            {villages.map((e, i) => {
                const deleteModal = <ModalClean isDialog={true} className="text-primary hover:text-dark-primary" text={'Delete'}></ModalClean>;

                return <TableRow key={i}>
                    <TableDetail>{e.id}</TableDetail>
                    <TableDetail>{e.name}</TableDetail>
                    <TableDetail>{e.district_name}</TableDetail>
                    <TableDetail>{e.city_name}</TableDetail>
                    <TableDetail>{deleteModal}</TableDetail>
                </TableRow>
            })}
        </Table>
        
    </AdminLayout>
}