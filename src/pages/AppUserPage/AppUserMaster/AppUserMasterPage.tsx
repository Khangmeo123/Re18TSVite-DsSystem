import LayoutMaster from "components/LayoutMaster/LayoutMaster";
import LayoutMasterActions from "components/LayoutMaster/LayoutMasterActions";
import LayoutMasterTitle from "components/LayoutMaster/LayoutMasterTitle";
import PageHeader from "components/PageHeader/PageHeader";
import {
  AppUserMasterContext,
  useAppUserMasterHook,
} from "./AppUserMasterHook";
import LayoutMasterContent from "components/LayoutMaster/LayoutMasterContent";
import MasterActionBar from "./AppUserMasterActionBar";
import MasterTable from "./AppUserMasterTable";
import ChangePasswordDrawer from "../AppUserDrawer/ChangePasswordDrawer";
import { APP_OVERVIEW } from "config/route-const";
import AppUserDetailDrawer from "../AppUserDrawer/AppUserDetailDrawer";
import { Button } from "react-components-design-system";
import CaretDown from "../../../assets/images/CaretDown.png";

const AppUserMasterPage = () => {
  const { translate, ...contextValue } = useAppUserMasterHook();

  return (
    <>
      <AppUserMasterContext.Provider value={contextValue}>
        <div className="page-content">
          <PageHeader
            title={translate("Danh sách yêu cầu ngân sách")} //Chỗ này phải dùng đa ngôn ngữ, fix tạm tiếng việt
            breadcrumbs={[
              {
                name: translate("Trang chủ"),
                path: APP_OVERVIEW,
              },
              {
                name: translate("Ngân sách"),
                path: APP_OVERVIEW,
              },
            ]}
          >
            <>
              <Button
                icon={<img src={CaretDown} alt="img" />}
                iconPlace="right"
                type="primary"
                size="lg"
                onClick={() => {
                  console.log("hihi");
                }}
              >
                Thêm mới
              </Button>
            </>
          </PageHeader>
          <LayoutMaster>
            <LayoutMasterTitle
              title={translate("appUsers.master.subTitle")}
              description={translate("appUsers.master.subTitleDescription")}
            />
            {!contextValue.canBulkAction && (
              <LayoutMasterActions>
                <MasterActionBar />
              </LayoutMasterActions>
            )}
            <LayoutMasterContent>
              <MasterTable />
            </LayoutMasterContent>
          </LayoutMaster>
        </div>
        <AppUserDetailDrawer ref={contextValue.drawerCreateRef} />
        <ChangePasswordDrawer ref={contextValue.drawerChangePasswordRef} />
      </AppUserMasterContext.Provider>
    </>
  );
};

export default AppUserMasterPage;
