import { AdminLayout } from "@/Layouts/AdminLayout";
import MedicalCheckupTable from "./MedicalCheckupTable";

export default function MedicalCheckupList() {
    return <AdminLayout textName={'Kasir'} breadCrumbItems={[
        {
            label: "Billing"
        }, {
            label: "Kasir"
        }
    ]}>
        <MedicalCheckupTable/>
    </AdminLayout>
}