import Header from "./Header";
import Sidebar from "./Sidebar";
import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";
import Toast from "@/Components/Toast";
import Footer from "./Footer";
import Breadcrumb from "@/Components/Breadcrumb";

export const AdminLayout = ({ textName, breadCrumbItems = [], ...props }) => {
  const { theme } = useTheme();
  const { layoutTheme, layoutLightTheme, bigFontColorTheme } = applicationTheme(theme);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={textName} />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto w-full ${layoutTheme}`}>
          {/* <div className="flex justify-between p-4">
            <div className={`text-2xl font-bold ${bigFontColorTheme}`}>
              {textName}
            </div>
          </div> */}
          <Breadcrumb items={breadCrumbItems} />
          <div className={`justify-between p-1`}>
            {props.children}
          </div>
        </main>
        <Footer />
      </div>
      <Toast />
    </div>
  );
}