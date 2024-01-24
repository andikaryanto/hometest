import InputLabel from "@/Components/InputLabel";
import { settingItemCOGSState, settingItemMarginAsMasterItemState, settingItemPriceAsMasterItemState, settingItemPriceMarginFlatState, settingItemPriceMarginPercentState, settingListState, settingMarginTypeState } from "@/States/Setting";
import { useRecoilState } from "recoil";
import ItemMarginListPopoverSearch from "../ItemMargin/ItemMarginListPopoverSearch";
import Toggle from "@/Components/Toggle";
import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";
import TextInput from "@/Components/Input/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { post } from "@/Common/Request/Request";
import { url_settings } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { ResponseMessages } from "@/Common/ResponseMessages";

export default function ItemSetting({ settings = [], ...props }) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [settingItemPriceAsMasterItem, setSettingItemPriceAsMasterItem] = useRecoilState(settingItemPriceAsMasterItemState);
    const [settingItemMarginAsMasterItem, setSettingItemMarginAsMasterItem] = useRecoilState(settingItemMarginAsMasterItemState);
    const [settingItemCOGS, setSettingItemCOGS] = useRecoilState(settingItemCOGSState);
    const [settingMarginType, setSettingMarginType] = useRecoilState(settingMarginTypeState);
    const [settingItemPriceMarginFlat, setSettingItemPriceMarginFlat] = useRecoilState(settingItemPriceMarginFlatState);
    const [settingItemPriceMarginPercent, setSettingItemPriceMarginPercent] = useRecoilState(settingItemPriceMarginPercentState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const onSettingItemPriceAsMasterItem = (isChecked) => {
        setSettingItemPriceAsMasterItem({
            ...settingItemPriceAsMasterItem,
            boolean_value: isChecked
        });

        setSettingItemCOGS({
            ...settingItemCOGS,
            boolean_value: !isChecked
        })
    }

    const onSettingItemCOGS = (isChecked) => {
        setSettingItemCOGS({
            ...settingItemCOGS,
            boolean_value: isChecked
        });

        setSettingItemPriceAsMasterItem({
            ...settingItemPriceAsMasterItem,
            boolean_value: !isChecked
        })
    }

    const onSettingMarginType = (margin) => {
        setSettingMarginType({
            ...settingMarginType,
            item_margin: margin,
            integer_value: margin.id,
            string_value: margin.name
        })
    }

    const onSubmit = () => {
        setProcessing(true);
        post(url_settings, getToken, {
            settings: [
                settingItemPriceAsMasterItem,
                settingItemMarginAsMasterItem,
                settingItemCOGS,
                settingMarginType,
                settingItemPriceMarginFlat,
                settingItemPriceMarginPercent,
                settingItemPriceMarginPercent
            ]
        })
        .then(result => {
            if(result.status == 204) {
                setProcessing(false);
                setToast({
                    color: ToastColor.success,
                    message: ResponseMessages.data_saved
                })
            }
        })
        .catch(err => {
            setProcessing(false);
            setToast({
                color: ToastColor.danger,
                message: ResponseMessages.data_failed_to_save
            })
        })
    }

    useEffect(() => {
        if (settings.length > 0) {
            setSettingItemPriceAsMasterItem(settings.find(x => x.id == 1));
            setSettingItemMarginAsMasterItem(settings.find(x => x.id == 2));
            setSettingItemCOGS(settings.find(x => x.id == 3));
            const margin = settings.find(x => x.id == 6);
            setSettingMarginType({
                ...margin,
                item_margin: {
                    id: margin.integer_value,
                    name: margin.string_value
                }
            });
            setSettingItemPriceMarginFlat(settings.find(x => x.id == 4));
            setSettingItemPriceMarginPercent(settings.find(x => x.id == 5));
        }
    }, [settings])

    return <div className="xl:w-1/4 lg:1/2">
        <div>
            <div className="flex my-6">
                <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Pengaturan Barang</div>
            </div>
            <div className="flex mb-4">
                <span className="mr-10 w-72">Gunakan harga yang ada pada master per barang</span>
                <Toggle checked={settingItemPriceAsMasterItem.boolean_value} onToggle={onSettingItemPriceAsMasterItem} />
            </div>
            <div className="flex mb-4">
                <span className="mr-10 w-72">Gunakan margin yang ada pada master per barang</span>
                <Toggle checked={settingItemMarginAsMasterItem.boolean_value} />
            </div>
            <div className="flex mb-4">
                <span className="mr-10 w-72">Gunakan Harga Pokok Penjualan</span>
                <Toggle checked={settingItemCOGS.boolean_value} onToggle={onSettingItemCOGS} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="clinic" value="Margin Penjualan" />
                <ItemMarginListPopoverSearch className='h-8 w-96' item={settingMarginType.item_margin} onSelect={onSettingMarginType} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="name" value="Margin Flat" />

                <TextInput
                    id="name"
                    type="number"
                    name="name"
                    value={settingItemPriceMarginFlat.integer_value}
                    className="mt-1 block w-full h-8"
                    onChange={(e) => setSettingItemPriceMarginFlat({ ...settingItemPriceMarginFlat, integer_value: e.target.value })}
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="name" value="Margin Persen" />

                <TextInput
                    id="name"
                    type="number"
                    name="name"
                    value={settingItemPriceMarginPercent.integer_value}
                    className="mt-1 block w-full h-8"
                    onChange={(e) => setSettingItemPriceMarginPercent({ ...settingItemPriceMarginPercent, integer_value: e.target.value })}
                />
            </div>
        </div>
        <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={onSubmit}>
                Simpan
            </PrimaryButton>
        </div>
    </div>

}