import { TableRowSelection } from "antd/lib/table/interface";
import { FilterAction, KeyType } from "core/services/service-types";
import { listService } from "core/services/page-services/list-service";
import { queryStringService } from "core/services/page-services/query-string-service";
import { AppUser, AppUserFilter } from "models/AppUser";
import React, { createContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import {
  masterService,
  RepoState,
} from "core/services/page-services/master-service";

export interface AppUserMaster {
  modelFilter: AppUserFilter;
  list: AppUser[];
  count: number;
  loadingList: boolean;
  dispatchFilter: React.Dispatch<FilterAction<AppUserFilter>>;
  countFilter: number;
  handleLoadList: (filterParam?: AppUserFilter) => void;
  handleResetList: () => void;
  rowSelection: TableRowSelection<AppUser>;
  selectedRowKeys: KeyType[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<KeyType[]>>;
  canBulkAction: boolean;
}

export const AppUserMasterContext = createContext<AppUserMaster>({
  modelFilter: new AppUserFilter(),
  list: [],
  count: 0,
  loadingList: false,
  dispatchFilter: null,
  countFilter: 0,
  handleLoadList: null,
  handleResetList: null,
  rowSelection: null,
  selectedRowKeys: [],
  setSelectedRowKeys: null,
  canBulkAction: false,
});

export function useAppUserMasterHook() {
  const [translate] = useTranslation();

  const tabRepositories = React.useMemo<RepoState[]>(() => {
    return [
      {
        tabKey: "all",
        tabTitle: translate("appUser.tab.all"),
        list: appUserRepository.listAll,
        count: appUserRepository.countAll,
      },
      {
        tabKey: "owned",
        tabTitle: translate("appUser.tab.owned"),
        list: appUserRepository.listOwned,
        count: appUserRepository.countOwned,
      },
      {
        tabKey: "approved",
        tabTitle: translate("appUser.tab.approval"),
        list: appUserRepository.listApproval,
        count: appUserRepository.countApproval,
      },
    ];
  }, [translate]);

  const [modelFilter, dispatchFilter, countFilter, getModelFilter] =
    queryStringService.useQueryString(
      AppUserFilter,
      {
        ...new AppUserFilter(),
        skip: 0,
        take: 10,
      },
      ["orderBy", "orderType", "tabKey"]
    );

  const { repo, handleChangeTab } = masterService.useTabRepository(
    tabRepositories,
    dispatchFilter
  );

  const baseFilter = React.useMemo(() => {
    return {
      ...new AppUserFilter(),
      tabKey: repo.tabKey,
      skip: 0,
      take: 10,
    };
  }, [repo.tabKey]);

  const { list, count, loadingList, handleResetList, handleLoadList } =
    listService.useList<AppUser, AppUserFilter>(
      repo.list,
      repo.count,
      baseFilter,
      dispatchFilter,
      getModelFilter
    );

  const { canBulkAction, rowSelection, selectedRowKeys, setSelectedRowKeys } =
    listService.useRowSelection<AppUser>("checkbox", [], false);

  React.useEffect(() => {
    handleLoadList();
  }, [handleLoadList]);

  return {
    // context value:
    dispatchFilter,
    modelFilter,
    countFilter,
    list,
    count,
    loadingList,
    handleResetList,
    handleLoadList,
    canBulkAction,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
    repo,

    // non-context value:
    translate,
    handleChangeTab,
    tabRepositories,
  };
}
