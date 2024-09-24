import { Dropdown } from "antd";
import { AppUserFilter } from "models/AppUser";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  InputSearch,
  InputText,
  // OverflowMenu,
  Tag,
} from "react-components-design-system";
import MasterAdvanceFilter from "./AppUserMasterTabAdvanceFilter";
import classNames from "classnames";
import Funnel from "../../../../assets/images/Funnel.svg";
import { FilterActionEnum } from "core/services/service-types";
// import { importExportService } from "core/services/page-services/import-export-service";
import { useDebounceFn } from "ahooks";
import { AppUserMaster, AppUserMasterContext } from "../AppUserMasterHook";
// import { appUserRepository } from "pages/AppUserPage/AppUserRepository";

const AppUserMasterAction = () => {
  const appUserMaster = useContext<AppUserMaster>(AppUserMasterContext);
  const {
    modelFilter,
    countFilter,
    dispatchFilter,
    handleLoadList,
    handleResetList,
  } = appUserMaster;

  const [translate] = useTranslation();
  const [visibleFilter, setVisibleFilter] = React.useState(false);

  // const { handleListExport, handleExportTemplateList } =
  //   importExportService.useExport();

  // const {
  //   handleImportList,
  //   ref: importActionRef,
  //   handleClick: handleClickImport,
  // } = importExportService.useImport(handleResetList);

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

  // const listActions = [
  //   {
  //     title: translate("general.actions.import"),
  //     isShow: true,
  //     action: () => {
  //       importActionRef.current.click();
  //     },
  //   },
  //   {
  //     title: translate("general.actions.export"),
  //     isShow: true,
  //     action: handleListExport(modelFilter, appUserRepository.export),
  //   },
  //   {
  //     title: translate("general.actions.exportTemplate"),
  //     isShow: true,
  //     action: handleExportTemplateList(appUserRepository.exportTemplate),
  //   },
  // ];

  return (
    <>
      <div className="page-master__filter-action-search d-flex align-items-center">
        <div className="w-300px">
          <InputText
            value={modelFilter.search}
            placeHolder={translate("general.placeholder.search")}
            onChange={run}
            type={1}
            isSmall
          />
        </div>
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
            <Button
              type="tertiary"
              size="lg"
              icon={<img src={Funnel} alt="funnel" />}
              iconPlace="left"
            >
              {" "}
              Bộ lọc{" "}
            </Button>
          </button>
        </Dropdown>
        {/* <OverflowMenu size="xl" list={listActions}></OverflowMenu> */}
      </div>
      {/* <input
        ref={importActionRef}
        type="file"
        style={{ display: "none" }}
        id="master-import"
        onClick={handleClickImport}
        onChange={handleImportList(appUserRepository.import)}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      /> */}
    </>
  );
};

export default AppUserMasterAction;
