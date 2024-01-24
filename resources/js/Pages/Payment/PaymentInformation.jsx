import { paymentState } from "@/States/Payment";
import { useRecoilValue } from "recoil";
import PatientInformation from "../Patient/PatientInformation";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";
import { formatCurrency } from "@/Common/Helper";
import Pill from "@/Components/Pill/Pill";
import ButtonLink from "@/Components/Button/ButtonLink";
import { FaEdit, FaPrint } from "react-icons/fa";

export default function PaymentInformation({ title, ...props }) {
    const { theme } = useTheme();
    const { bigFontColorTheme, borderedBottomTheme } = applicationTheme(theme);
    const payment = useRecoilValue(paymentState);
    return <div className="pt-4 pl-4 pr-4 mb-10 w-full">
        {payment.medical_checkup && <><div className="w-full">
            <PatientInformation patient={payment.medical_checkup.checkup_record.registration.patient} 
                registration={payment.medical_checkup.checkup_record.registration} 
                showMMedicalCheckupHistory={false}
            />
            <div className="flex mt-2 justify-between">
                <Pill className={`bg-blue-600 h-6 text-white`}>Nomor Bayar #{payment.payment_number}</Pill>
                <div className="flex justify-end">
                    <ButtonLink href={'payment/add?medical_checkup_id=' + payment.medical_checkup.id} 
                    className="bg-green-600 mr-2 hover:bg-green-400">
                        <FaEdit />
                    </ButtonLink>
                    <ButtonLink href={'payment/print?medical_checkup_id=' + payment.medical_checkup.id} 
                        className="bg-blue-600 hover:bg-blue-400">
                        <FaPrint />
                    </ButtonLink>
                </div>
            </div>
        </div>
            <div className="w-full text-sm">
                <div className="mt-4">
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Tarif</div>
                    </div>
                    <div className="pl-12">
                        {payment.medical_checkup.medical_checkup_treatments.map((e, i) => {
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
                <div className="mt-4">
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat</div>
                    </div>
                    <div className="pl-12">
                        {payment.medical_checkup.medical_checkup_items && payment.medical_checkup.medical_checkup_items.filter(x => x.item.item_type.id == 1).map((e, i) => {
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
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat Racikan</div>
                    </div>
                    <div className="">
                        {payment.medical_checkup.medical_checkup_compounds && payment.medical_checkup.medical_checkup_compounds.map((e, i) => {
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
                    <div className={`ml-12 flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                        <span className={``}>Jasa Racik</span>
                        <span className={``}>{formatCurrency(payment.compound_fee, false)}</span>

                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Bahan Habis Pakai</div>
                    </div>
                    <div className="pl-12">
                        {payment.medical_checkup.medical_checkup_items.filter(x => x.item.item_type.id == 2).map((e, i) => {
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
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Diskon</div>
                    </div>
                    <div className="pl-12">
                        <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                            <div className="w-32">
                                Diskon
                            </div>
                            <div>
                                {formatCurrency(
                                    parseFloat(payment.discount),
                                    false)}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-6 text-sm">
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Grand Total</div>
                    </div>
                    <div className="pl-12">
                        <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                            <div className={`w-32`}>
                                Grand total
                            </div>
                            <div className={` text-lime-600 text-xl font-bold`}>
                                {formatCurrency(
                                    parseFloat(payment.amount),
                                    false)}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-6 text-sm">
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Bayar</div>
                    </div>
                    <div className="pl-12">
                        <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                            <div className="w-32">
                                Bayar
                            </div>
                            <div>
                                {formatCurrency(
                                    parseFloat(payment.payment_amount),
                                    false)}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-6 text-sm">
                    <div className="flex">
                        <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Kembali</div>
                    </div>
                    <div className="pl-12">
                        <div className={`flex justify-between mb-3 pb-2 ${borderedBottomTheme}`}>
                            <div className="w-32">
                                Kembali
                            </div>
                            <div>
                                {formatCurrency(
                                    parseFloat(payment.change),
                                    false)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>}
    </div>
}