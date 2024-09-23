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

const AppUserMasterPage = () => {
  const { translate, ...contextValue } = useAppUserMasterHook();

  return (
    <>
      <AppUserMasterContext.Provider value={contextValue}>
        <div className="page-content">
          <PageHeader
            title={translate("appUsers.master.title")}
            breadcrumbs={[
              {
                name: translate("appUsers.master.breadcrumb1"),
                path: APP_OVERVIEW,
              },
            ]}
          />
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
