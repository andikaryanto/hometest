import { url_medical_checkup, url_payment } from "@/Common/Api";
import getParameterValue, { formatCurrency, nanToZeroAmount } from "@/Common/Helper";
import { get, patch, post } from "@/Common/Request/Request";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { medicalCheckupState } from "@/States/MedicalCheckup";
import { Link, usePage } from "@inertiajs/react";
import { useRecoilState } from "recoil";
import PatientInformation from "../Patient/PatientInformation";
import { useEffect, useState } from "react";
import { getToken } from "@/Common/GetCookie";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";
import { paymentState } from "@/States/Payment";
import TextInput from "@/Components/Input/TextInput";
import Pill from "@/Components/Pill/Pill";
import PrimaryButton from "@/Components/PrimaryButton";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { ResponseMessages } from "@/Common/ResponseMessages";
import ButtonLink from "@/Components/Button/ButtonLink";

export default function PaymentAdd() {
    const { theme } = useTheme();
    const { bigFontColorTheme, borderedBottomTheme } = applicationTheme(theme);

    const page = usePage();
    const medicalCheckupId = getParameterValue(page, 'medical_checkup_id');

    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupState);
    const [payment, setPayment] = useRecoilState(paymentState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const loadMedicalCheckup = () => {
        get(url_medical_checkup + '/' + medicalCheckupId, getToken())
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckup(result.data.data._resources);
                    calculateTotal(result.data.data._resources);
                    if (result.data.data._resources.payment) {
                        setPayment(result.data.data._resources.payment);
                    }
                }
            })
            .catch(err => {

            })
    }

    const calculateTotal = (medicalCheckup) => {
        let subTotal = 0;
        if (medicalCheckup.medical_checkup_treatments)
            for (const treatment of medicalCheckup.medical_checkup_treatments) {
                subTotal += parseFloat(treatment.amount);
            }

        if (medicalCheckup.medical_checkup_items)
            for (const medicalCheckupItem of medicalCheckup.medical_checkup_items) {
                subTotal += parseFloat(medicalCheckupItem.amount);
            }

        if (medicalCheckup.medical_checkup_compounds)
            for (const compound of medicalCheckup.medical_checkup_compounds) {
                for (const medicalCheckupItem of compound.medical_checkup_items) {
                    subTotal += parseFloat(medicalCheckupItem.amount);
                }
            }
        setPayment({
            ...payment,
            amount: subTotal
        });
    }

    const onSubmitPayment = () => {
        if (payment.id == 0) {
            post(url_payment, getToken(), {
                ...payment,
                medical_checkup: medicalCheckup
            })
                .then(result => {
                    if (result.status == 201) {
                        setPayment(result.data.data._resources);
                        setToast({
                            color: ToastColor.success,
                            message: ResponseMessages.data_saved
                        });
                    }
                })
                .catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: ResponseMessages.data_failed_to_save
                    });
                })
        }

        if (payment.id > 0) {
            patch(url_payment + '/' + payment.id, getToken(), {
                ...payment,
                medical_checkup: medicalCheckup
            })
                .then(result => {
                    if (result.status == 200) {
                        setPayment(result.data.data._resources);
                        setToast({
                            color: ToastColor.success,
                            message: ResponseMessages.data_saved
                        });
                    }
                })
                .catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: ResponseMessages.data_failed_to_save
                    });
                })
        }
    }

    useEffect(() => {
        loadMedicalCheckup();

    }, []);




    return <AdminLayout textName={'Kasir'} breadCrumbItems={[
        {
            label: "Billing"
        }, {
            label: 'Kasir'
        }
    ]}>
        {medicalCheckup.id > 0 && <div className="pt-4 pl-4 pr-4 mb-10 w-full">
            <div className="w-full">
                <PatientInformation 
                    patient={medicalCheckup.checkup_record.registration.patient} 
                    registration={medicalCheckup.checkup_record.registration} 
                    showMMedicalCheckupHistory={false}/>

            </div>
            <div className="w-full xl:lg:w-1/2">

                <div className="flex mt-2 justify-between">
                    <Pill className={'bg-blue-600 h-6 text-white'}>
                        {medicalCheckup.doctor.name}
                    </Pill>
                    {payment.id > 0 ? <Pill className={'bg-green-600 h-6 text-white'}>
                        No. Bayar #{payment.payment_number}
                    </Pill> : null}
                </div>
                <div className=" text-sm">
                    <div className="mt-4">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Tarif</div>
                        </div>

                        <div className="pl-12">
                            {medicalCheckup.medical_checkup_treatments.map((e, i) => {
                                return <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                    <div className="">
                                        {e.treatment.name}
                                    </div>
                                    <div>
                                        {formatCurrency(e.amount, false)}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat</div>
                        </div>
                        <div className="pl-12">
                            {medicalCheckup.medical_checkup_items && medicalCheckup.medical_checkup_items.filter(x => x.item.item_type.id == 1).map((e, i) => {
                                return <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                    <div className="w-32">
                                        {e.item.name}
                                    </div><div>
                                        {e.quantity}
                                    </div>
                                    <div>
                                        {formatCurrency(e.price_per_unit, false)}
                                    </div><div>
                                        {formatCurrency(e.amount, false)}
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat Racikan</div>
                        </div>
                        <div className="">
                            {medicalCheckup.medical_checkup_compounds && medicalCheckup.medical_checkup_compounds.map((e, i) => {
                                return <div>
                                    <div className={`${bigFontColorTheme} mt-3`}>Racikan {i + 1}</div>
                                    {e.medical_checkup_items.map((medicalCheckupItem, j) => {
                                        return <div className={`ml-12 flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                            <div className="w-32">
                                                {medicalCheckupItem.item.name}
                                            </div><div>
                                                {medicalCheckupItem.quantity}
                                            </div>
                                            <div>
                                                {formatCurrency(medicalCheckupItem.price_per_unit, false)}
                                            </div><div>
                                                {formatCurrency(medicalCheckupItem.amount, false)}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            })}
                        </div>
                        <div className="ml-12">
                            <span className={`text-xs`}>Jasa Racik</span>
                            <TextInput
                                id="name"
                                type="number"
                                name="name"
                                value={payment.compound_fee}
                                className=" mt-1 block h-8 w-full text-right text-sm"
                                onChange={(e) => {
                                    setPayment({
                                        ...payment,
                                        compound_fee: parseInt(e.target.value),
                                        change: parseInt(payment.payment_amount) -
                                            (nanToZeroAmount(e.target.value) +
                                                parseFloat(payment.amount) -
                                                nanToZeroAmount(payment.discount))
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Bahan Habis Pakai</div>
                        </div>
                        <div className="pl-12">
                            {medicalCheckup.medical_checkup_items.filter(x => x.item.item_type.id == 2).map((e, i) => {
                                return <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                    <div className="w-32">
                                        {e.item.name}
                                    </div><div>
                                        {e.quantity}
                                    </div>
                                    <div>
                                        {formatCurrency(e.price_per_unit, false)}
                                    </div><div>
                                        {formatCurrency(e.amount, false)}
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Sub Total</div>
                        </div>
                        <div className="pl-12">
                            <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                <div className="w-32">
                                    Sub total
                                </div>
                                <div>
                                    {formatCurrency(
                                        parseFloat(payment.amount) +
                                        nanToZeroAmount(payment.compound_fee),
                                        false)}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Diskon</div>
                        </div>
                        <div className="ml-12">
                            <span className={`text-xs`}>Diskon</span>
                            <TextInput
                                id="name"
                                type="number"
                                name="name"
                                value={payment.discount}
                                className=" mt-1 block h-8 w-full text-right text-sm"
                                onChange={(e) => {
                                    setPayment({
                                        ...payment,
                                        discount: parseInt(e.target.value),
                                        change: parseInt(payment.payment_amount) -
                                            (nanToZeroAmount(payment.compound_fee) +
                                                parseFloat(payment.amount) -
                                                nanToZeroAmount(e.target.value))
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Grand Total</div>
                        </div>
                        <div className="pl-12">
                            <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                <div className="w-32">
                                    Grand total
                                </div>
                                <div>
                                    {formatCurrency(
                                        parseFloat(payment.amount) +
                                        nanToZeroAmount(payment.compound_fee) -
                                        nanToZeroAmount(payment.discount),
                                        false)}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Bayar</div>
                        </div>
                        <div className="ml-12">
                            <span className={`text-xs`}>Bayar</span>
                            <TextInput
                                id="name"
                                type="number"
                                name="name"
                                value={payment.payment_amount}
                                className=" mt-1 block h-8 w-full text-right text-sm"
                                onChange={(e) => {
                                    setPayment({
                                        ...payment,
                                        payment_amount: parseInt(e.target.value),
                                        change: parseInt(e.target.value) -
                                            (parseFloat(payment.amount) +
                                                nanToZeroAmount(payment.compound_fee) -
                                                nanToZeroAmount(payment.discount))
                                    })
                                }}
                            />
                            <span className={`text-xs ${payment.change < 0 ? 'text-red-600' : ''}`}>{payment.change < 0 ? 'Kurang bayar' : ''}</span>
                        </div>
                    </div>
                    <div className="mt-6 text-sm">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Kembalian</div>
                        </div>
                        <div className="pl-12">
                            <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                                <div className="w-32">
                                    Kembalian
                                </div>
                                <div>
                                    {formatCurrency(payment.change, false)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <ButtonLink target="_blank"
                            className="bg-blue-600 hover:bg-blue-400 mr-2"
                            disabled={payment.id == 0}
                            href={payment.id > 0 ? "/payment/print?medical_checkup_id=" + medicalCheckup.id : '#'}>
                            Cetak
                        </ButtonLink>
                        <PrimaryButton className="bg-green-500 hover:bg-green-400" disabled={processing} onClick={onSubmitPayment}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>}

    </AdminLayout>
}