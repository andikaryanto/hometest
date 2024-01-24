import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getScopes, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
// import User from "./User";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState } from "recoil";
import { userListState, userNewObject, userState } from "@/States/User";
import Loading from "@/Components/Loading";
import { url_users } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import Pill from "@/Components/Pill/Pill";
import User from "./User";

export default function UserList() {

    const [users, setUsers] = useRecoilState(userListState)
    const [user, setUser] = useRecoilState(userState)
    const [isFormOpen, setFormOpen] = useState(false);

    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })
    // const [user, setUser] = useState({})

    const loadUsers = (params = {}) => {
        get(url_users, getToken(), {
            ...params,
            embed: ['scope']
        })
            .then(result => {
                if (result.status == 200) {
                    setUsers(result.data.data);
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
        loadUsers({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (user) => {
        setUser(user);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadUsers({
            ...paging,
            page: page
        });
    }

    const onAddClick = () => {
        setUser(userNewObject);
        setFormOpen(true);
    }

    const onManipluate = () => {
        loadUsers(paging)
    }

    useEffect(() => {
        loadUsers(paging);
    }, [])

    const headers = ['No', 'Nama', 'Email', 'Aksi'];
    return <AdminLayout textName={'Akun'} breadCrumbItems={[
        {
            label: "Akun"
        }
    ]}>
        <div className="flex">
            <SlideSideBar className={`w-1/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Data Akun">
                <div className="flex">
                    <User title='Akun' onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <Table text={'Daftar Akun'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                onAddClick={onAddClick}
                page={users._paging.page}
                size={users._paging.limit}
                totalData={users._paging.total_data}>
                {users._resources && users._resources.map((e, i) => {
                    const number = ((users._paging.page - 1) * users._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            {e.username}
                        </TableDetail>
                        <TableDetail>
                            <div>{e.email}</div>
                            <div className="flex text-sm">
                                <Pill className={'bg-green-600 text-white h-5'}>
                                    {e.scopes.map((scope, i) => {
                                        return scope.name
                                    }).join(', ')}
                                </Pill>
                            </div>
                        </TableDetail>
                        <TableDetail className={'items-center'}>
                            {/* <BorderedRoundedButtonSmall onClick={() => onEdit(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Penyakit</BorderedRoundedButtonSmall> */}
                        </TableDetail>
                    </TableRow>
                })}
            </Table>
        </div>
    </AdminLayout>
}