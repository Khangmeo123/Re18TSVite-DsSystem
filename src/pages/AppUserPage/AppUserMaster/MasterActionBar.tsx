import { Dropdown } from "antd";
import { AppUserFilter } from "models/AppUser";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  InputSearch,
  OverflowMenu,
  Tag,
} from "react-components-design-system";
import MasterAdvanceFilter from "./MasterAdvanceFilter";
import { Add, Filter, Settings } from "@carbon/icons-react";
import classNames from "classnames";
import { FilterActionEnum } from "core/services/service-types";
import { importExportService } from "core/services/page-services/import-export-service";
import { useDebounceFn } from "ahooks";
import { AppUserMaster, AppUserMasterContext } from "./MasterHook";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";

const MasterActionBar = () => {
  const appUserMaster = useContext<AppUserMaster>(AppUserMasterContext);
  const {
    modelFilter,
    countFilter,
    dispatchFilter,
    drawerCreateRef,
    handleLoadList,
    handleResetList,
  } = appUserMaster;

  const [translate] = useTranslation();
  const [visibleFilter, setVisibleFilter] = React.useState(false);

  const { handleListExport, handleExportTemplateList } =
    importExportService.useExport();

  const {
    handleImportList,
    ref: importActionRef,
    handleClick: handleClickImport,
  } = importExportService.useImport(handleResetList);

  const handleOpenDrawer = React.useCallback(() => {
    drawerCreateRef.current.handleOpen();
  }, [drawerCreateRef]);

  const { run } = useDebounceFn(
    (search: string) => {
      dispatchFilter({
        type: FilterActionEnum.UPDATE,
        payload: {
          search: search,
        },
      });
      handleLoadList({ search: search });
    },
    {
      wait: 300,
    }
  );

  const listActions = [
    {
      title: translate("general.actions.import"),
      isShow: true,
      action: () => {
        importActionRef.current.click();
      },
    },
    {
      title: translate("general.actions.export"),
      isShow: true,
      action: handleListExport(modelFilter, appUserRepository.export),
    },
    {
      title: translate("general.actions.exportTemplate"),
      isShow: true,
      action: handleExportTemplateList(appUserRepository.exportTemplate),
    },
  ];

  return (
    <>
      <div className="page-master__filter-action-search d-flex align-items-center">
        <InputSearch
          value={modelFilter.search}
          classFilter={AppUserFilter}
          placeHolder={translate("general.placeholder.search")}
          onChange={run}
          position="right"
        />
      </div>
      <div className="page-master__actions d-flex align-items-center">
        {countFilter > 0 && (
          <Tag
            value={countFilter.toString()}
            action={handleResetList}
            className="page-master__filter-tag"
          />
        )}
        <Dropdown
          dropdownRender={() => (
            <MasterAdvanceFilter setVisible={setVisibleFilter} />
          )}
          open={visibleFilter}
          trigger={["click"]}
        >
          <button
            className={classNames(
              "btn-component btn-only-icon btn--icon-only-ghost btn--xl btn-filter",
              {
                "btn--shadow": visibleFilter,
              }
            )}
            onClick={() => setVisibleFilter(true)}
          >
            <Filter size={16} />
          </button>
        </Dropdown>
        <Button type="icon-ghost" icon={<Settings size={16} />} size="lg" />
        <OverflowMenu size="xl" list={listActions}></OverflowMenu>
        <Button
          type="primary"
          className="btn--lg"
          icon={<Add size={16} />}
          onClick={handleOpenDrawer}
        >
          {translate("general.actions.create")}
        </Button>
      </div>
      <input
        ref={importActionRef}
        type="file"
        style={{ display: "none" }}
        id="master-import"
        onClick={handleClickImport}
        onChange={handleImportList(appUserRepository.import)}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </>
  );
};

export default MasterActionBar;
