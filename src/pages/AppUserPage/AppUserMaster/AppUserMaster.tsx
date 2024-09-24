import PageHeader from "components/PageHeader/PageHeader";
import {
  AppUserMasterContext,
  useAppUserMasterHook,
} from "./AppUserMasterHook";
// import ChangePasswordDrawer from "../AppUserDrawer/ChangePasswordDrawer";
import type { TabsProps } from "react-components-design-system/dist/esm/types/components/Tabs/Tabs";
import { APP_OVERVIEW } from "config/route-const";
// import AppUserDetailDrawer from "../AppUserDrawer/AppUserDetailDrawer";
import { Button, Tabs } from "react-components-design-system";
import CaretDown from "../../../assets/images/CaretDown.png";
import React from "react";
import { RepoState } from "core/services/page-services/master-service";
import AppUserMasterTab from "./AppUserMasterTab/AppUserMasterTab";

const AppUserMaster = () => {
  const { translate, tabRepositories, handleChangeTab, ...contextValue } =
    useAppUserMasterHook();

  const tabItems: TabsProps["items"] = React.useMemo<TabsProps["items"]>(() => {
    return (
      tabRepositories &&
      tabRepositories.length > 0 &&
      tabRepositories.map((tab: RepoState) => {
        return {
          label: tab.tabTitle,
          key: tab.tabKey,
          children: <AppUserMasterTab />,
        };
      })
    );
  }, [tabRepositories]);

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
            hasTabs={true}
          >
            <>
              <Button
                icon={<img src={CaretDown} alt="img" />}
                iconPlace="right"
                type="primary"
                size="lg"
              >
                Thêm mới
              </Button>
            </>
          </PageHeader>
          <div className="tab__master">
            <Tabs
              tabPosition="top"
              mode="line"
              onTabClick={handleChangeTab}
              activeKey={contextValue.repo.tabKey}
              items={tabItems}
              destroyInactiveTabPane={true}
            />
          </div>
        </div>
      </AppUserMasterContext.Provider>
    </>
  );
};

export default AppUserMaster;
