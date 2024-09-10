import { TableRowSelection } from "antd/lib/table/interface";
import { FilterAction, KeyType } from "core/services/service-types";
import { listService } from "core/services/page-services/list-service";
import { queryStringService } from "core/services/page-services/query-string-service";
import { AppUser, AppUserFilter } from "models/AppUser";
import React, { createContext, createRef } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import type { AppUserChangePasswordDrawerType } from "../AppUserDrawer/ChangePasswordDrawer";
import type { AppUserCreateDrawerType } from "../AppUserDrawer/CreateDrawer";

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

export function useMasterHook() {
  const [translate] = useTranslation();
  const baseFilter = React.useMemo(() => {
    return {
      ...new AppUserFilter(),
      skip: 0,
      take: 10,
    };
  }, []);

  const [modelFilter, dispatch, countFilter, getModelFilter] =
    queryStringService.useQueryString(AppUserFilter, baseFilter, [
      "orderBy",
      "orderType",
    ]);

  const drawerCreateRef = createRef<AppUserCreateDrawerType>();

  const drawerChangePasswordRef = createRef<AppUserChangePasswordDrawerType>();

  const { list, count, loadingList, handleResetList, handleLoadList } =
    listService.useList<AppUser, AppUserFilter>(
      appUserRepository.list,
      appUserRepository.count,
      baseFilter,
      dispatch,
      getModelFilter
    );

  const { canBulkAction, rowSelection, selectedRowKeys, setSelectedRowKeys } =
    listService.useRowSelection<AppUser>("checkbox", [], false);

  React.useEffect(() => {
    handleLoadList();
  }, [handleLoadList]);

  return {
    translate,
    dispatchFilter: dispatch,
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
  };
}
