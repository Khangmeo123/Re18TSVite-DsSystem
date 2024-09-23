import { TableRowSelection } from "antd/lib/table/interface";
import { FilterAction, KeyType } from "core/services/service-types";
import { listService } from "core/services/page-services/list-service";
import { queryStringService } from "core/services/page-services/query-string-service";
import { AppUser, AppUserFilter } from "models/AppUser";
import React, { createContext, createRef } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import type { AppUserChangePasswordDrawerType } from "../AppUserDrawer/ChangePasswordDrawer";
import type { AppUserCreateDrawerType } from "../AppUserDrawer/AppUserDetailDrawer";
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
  drawerCreateRef: React.RefObject<AppUserCreateDrawerType>;
  drawerChangePasswordRef: React.RefObject<AppUserChangePasswordDrawerType>;
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
  drawerCreateRef: null,
  drawerChangePasswordRef: null,
  handleLoadList: null,
  handleResetList: null,
  rowSelection: null,
  selectedRowKeys: [],
  setSelectedRowKeys: null,
  canBulkAction: false,
});

export function useAppUserMasterHook() {
  const [translate] = useTranslation();
  const baseFilter = React.useMemo(() => {
    return {
      ...new AppUserFilter(),
      skip: 0,
      take: 10,
    };
  }, []);
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
    queryStringService.useQueryString(AppUserFilter, baseFilter, [
      "orderBy",
      "orderType",
      "tabKey",
    ]);

  const { repo, handleChangeTab } = masterService.useTabRepository(
    tabRepositories,
    dispatchFilter
  );

  const drawerCreateRef = createRef<AppUserCreateDrawerType>();

  const drawerChangePasswordRef = createRef<AppUserChangePasswordDrawerType>();

  const { list, count, loadingList, handleResetList, handleLoadList } =
    listService.useList<AppUser, AppUserFilter>(
      appUserRepository.list,
      appUserRepository.count,
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
    drawerCreateRef,
    drawerChangePasswordRef,
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
