import { url_settings } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import Tabs from "@/Components/Tabs";
import Toggle from "@/Components/Toggle";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { settingListNewObject, settingListState } from "@/States/Setting";
import { useTheme } from "@/app";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import ItemMarginListPopoverSearch from "../ItemMargin/ItemMarginListPopoverSearch";
import InputLabel from "@/Components/InputLabel";
import ItemSetting from "./ItemSetting";

export default function Setting() {
    const title = 'Pengaturan';
    const [settings, setSettings] = useRecoilState(settingListState);

    const loadSettings = () => {
        get(url_settings, getToken())
            .then(result => {
                if (result.status == 200) {
                    setSettings(result.data.data._resources);
                }
            })
    }

    useEffect(() => {
        loadSettings()
    }, [])

    return <AdminLayout textName={title} breadCrumbItems={[
        {
            label: "Pengaturan"
        }
    ]}>
        <div className="px-4 w-full">
            <Tabs headers={['Barang']}>
                <ItemSetting settings={settings} />
            </Tabs>
        </div>
    </AdminLayout>
}