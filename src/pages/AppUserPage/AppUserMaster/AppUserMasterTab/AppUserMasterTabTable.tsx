import { Modal } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AxiosError } from "axios";
import {
  globalAdminType,
  organizationAdminType,
  siteAdminType,
  user,
} from "config/const";
import {
  APP_USER_EDIT_ROUTE,
  ORGANIZATION_TYPE_ROUTE,
} from "config/route-const";
import { DEFAULT_PAGE_SIZE_OPTION } from "core/config/consts";
import appMessageService from "core/services/common-services/app-message-service";
import { utilService } from "core/services/common-services/util-service";
import { masterService } from "core/services/page-services/master-service";
import {
  getAntOrderType,
  tableService,
} from "core/services/page-services/table-service";
import { FilterAction, KeyType } from "core/services/service-types";
import { ADMIN_TYPE, AdminType } from "models/AdminType";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Profile } from "models/Profile";
import { Status } from "models/Status";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import React, { useContext } from "react";
import {
  LayoutCell,
  OneLineText,
  OverflowMenu,
  Pagination,
  StandardTable,
  StatusLine,
} from "react-components-design-system";
import type { ListOverflowMenu } from "react-components-design-system/dist/esm/types/components/OverflowMenu/OverflowMenuList";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "rtk/hook";
import type { AppUserChangePasswordDrawerType } from "../../AppUserDrawer/ChangePasswordDrawer";
import { AppUserMaster, AppUserMasterContext } from "../AppUserMasterHook";

export interface AppUserMasterTabTableProps {
  filter?: AppUserFilter;
  updateFilter?: React.Dispatch<FilterAction<AppUserFilter>>;
  drawerChangePasswordRef?: React.RefObject<AppUserChangePasswordDrawerType>;
  list?: AppUser[];
  count?: number;
  loadingList?: boolean;
  handleResetList?: () => void;
  handleLoadList?: (filter?: AppUserFilter) => void;
}

const AppUserMasterTabTable = () => {
  const appUserMaster = useContext<AppUserMaster>(AppUserMasterContext);
  const {
    drawerChangePasswordRef,
    modelFilter,
    dispatchFilter,
    list,
    count,
    loadingList,
    handleResetList,
    handleLoadList,
    // canBulkAction,
    rowSelection,
    selectedRowKeys,
    setSelectedRowKeys,
  } = appUserMaster;
  const profile = useAppSelector<Profile>((state) => state.profile);
  const [translate] = useTranslation();

  const listData = [
    {
      id: 1,
      code: "hihi",
      displayName: "Tao văn A",
      email: "Atv@mail.com",
      status: { id: 1, name: "Hoạt động", color: "#10e52c" },
    },
    {
      id: 2,
      code: "hihioooo",
      displayName: "Tao văn B",
      email: "Btv@mail.com",
      status: { id: 2, name: "Không hoạt động", color: "#767979" },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMapAdminType = React.useCallback((adminType: AdminType) => {
    if (adminType && adminType.code) {
      let adminTypeModified: AdminType;
      switch (adminType.code) {
        case ADMIN_TYPE.GLOBAL_ADMIN:
          adminTypeModified = { ...adminType, ...globalAdminType };
          return adminTypeModified;
        case ADMIN_TYPE.ORGANIZATION_ADMIN:
          adminTypeModified = { ...adminType, ...organizationAdminType };
          return adminTypeModified;
        case ADMIN_TYPE.SITE_ADMIN:
          adminTypeModified = { ...adminType, ...siteAdminType };
          return adminTypeModified;
        case ADMIN_TYPE.USER:
          adminTypeModified = { ...adminType, ...user };
          return adminTypeModified;
        default:
          return adminType;
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canBulkDelete = React.useMemo(() => {
    let booleanValue = true;
    selectedRowKeys.forEach((value) => {
      const record = list.filter((record) => record.id === value)[0];
      if (record && record.used) {
        booleanValue &&= false;
      }
    });
    return booleanValue;
  }, [list, selectedRowKeys]);

  const { handleTableChange, handlePagination } = tableService.useTable(
    modelFilter,
    dispatchFilter,
    handleLoadList
  );

  const { notifyUpdateItemSuccess, notifyUpdateItemError } =
    appMessageService.useCRUDMessage();

  const { handleGoElseWhere } = masterService.useMasterAction(
    ORGANIZATION_TYPE_ROUTE
  );

  const handleDelete = React.useCallback(
    (appUser: AppUser) => () => {
      Modal.confirm({
        wrapClassName: "modal-confirm__wrapper",
        title: translate("appUsers.delete.title"),
        content: (
          <span>
            {translate("appUsers.delete.content")}{" "}
            <span className="bold-text m-r-2xs">
              {appUser.code} - {appUser.displayName}
            </span>
          </span>
        ),
        cancelText: translate("appUsers.delete.cancel"),
        okText: translate("appUsers.delete.confirm"),
        onOk() {
          appUserRepository.delete(appUser).subscribe({
            next: () => {
              notifyUpdateItemSuccess({
                message: translate("appUsers.delete.success"),
              });
              handleResetList();
            },
            error: (error: AxiosError) => {
              notifyUpdateItemError({
                message: translate("appUsers.delete.error"),
                description: utilService.getGeneralError(error),
              });
            },
          });
        },
        okType: "danger",
        closable: true,
      });
    },
    [handleResetList, notifyUpdateItemError, notifyUpdateItemSuccess, translate]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkDelete = React.useCallback(() => {
    Modal.confirm({
      wrapClassName: "modal-confirm__wrapper",
      title: translate("appUsers.delete.title"),
      content: (
        <span>
          {translate("appUsers.delete.content1")}
          <span className="bold-text m-x--2xs">{selectedRowKeys.length}</span>
          {translate("appUsers.delete.content2")}
        </span>
      ),
      cancelText: translate("appUsers.delete.cancel"),
      okText: translate("appUsers.delete.confirm"),
      onOk() {
        appUserRepository.bulkDelete(selectedRowKeys).subscribe({
          next: () => {
            notifyUpdateItemSuccess({
              message: translate("appUsers.delete.success"),
            });
            setSelectedRowKeys([]);
            handleResetList();
          },
          error: () => {
            notifyUpdateItemError({
              message: translate("appUsers.delete.error"),
            });
          },
        });
      },
      okType: "danger",
      closable: true,
    });
  }, [
    handleResetList,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    selectedRowKeys,
    setSelectedRowKeys,
    translate,
  ]);

  const handleActive = React.useCallback(
    (appUser: AppUser) => () => {
      Modal.confirm({
        wrapClassName: "modal-confirm__wrapper",
        title: translate("appUsers.active.title"),
        content: (
          <span>
            {translate("appUsers.active.content")}{" "}
            <span className="bold-text m-r-2xs">
              <span className="bold-text m-r-2xs">
                {appUser.code} - {appUser.displayName}
              </span>
            </span>
          </span>
        ),
        cancelText: translate("appUsers.active.cancelText"),
        okText: translate("appUsers.active.confirm"),
        onOk() {
          appUserRepository.active(appUser).subscribe({
            next: () => {
              notifyUpdateItemSuccess({
                message: translate("appUsers.active.success"),
              });
              handleResetList();
            },
            error: () => {
              notifyUpdateItemError({
                message: translate("appUsers.active.error"),
              });
            },
          });
        },
        closable: true,
      });
    },
    [handleResetList, notifyUpdateItemError, notifyUpdateItemSuccess, translate]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkActive = React.useCallback(() => {
    Modal.confirm({
      wrapClassName: "modal-confirm__wrapper",
      title: translate("appUsers.active.content"),
      content: (
        <span>
          {translate("appUsers.active.content1")}
          <span className="bold-text m-x--2xs">{selectedRowKeys.length}</span>
          {translate("appUsers.active.content2")}
        </span>
      ),
      cancelText: translate("appUsers.active.cancel"),
      okText: translate("appUsers.active.confirm"),
      onOk() {
        appUserRepository.bulkActive(selectedRowKeys).subscribe({
          next: () => {
            notifyUpdateItemSuccess({
              message: translate("appUsers.active.success"),
            });
            setSelectedRowKeys([]);
            handleResetList();
          },
          error: () => {
            notifyUpdateItemError({
              message: translate("appUsers.active.error"),
            });
          },
        });
      },
      closable: true,
    });
  }, [
    handleResetList,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    selectedRowKeys,
    setSelectedRowKeys,
    translate,
  ]);

  const handleDeactive = React.useCallback(
    (appUser: AppUser) => () => {
      Modal.confirm({
        wrapClassName: "modal-confirm__wrapper",
        title: translate("appUsers.deactive.title"),
        content: (
          <span>
            {translate("appUsers.deactive.content")}{" "}
            <span className="bold-text m-r-2xs">
              {appUser.code} - {appUser.displayName}
            </span>
          </span>
        ),
        cancelText: translate("appUsers.deactive.cancel"),
        okText: translate("appUsers.deactive.confirm"),
        onOk() {
          appUserRepository.deactive(appUser).subscribe({
            next: () => {
              notifyUpdateItemSuccess({
                message: translate("appUsers.deactive.success"),
              });
              handleResetList();
            },
            error: (error: AxiosError) => {
              notifyUpdateItemError({
                message: translate("appUsers.deactive.error"),
                description: utilService.getGeneralError(error),
              });
            },
          });
        },
        closable: true,
      });
    },
    [handleResetList, notifyUpdateItemError, notifyUpdateItemSuccess, translate]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkDeactive = React.useCallback(() => {
    Modal.confirm({
      wrapClassName: "modal-confirm__wrapper",
      title: translate("appUsers.deactive.title"),
      content: (
        <span>
          {translate("appUsers.deactive.content1")}
          <span className="bold-text m-x--2xs">{selectedRowKeys.length}</span>
          {translate("appUsers.deactive.content2")}
        </span>
      ),
      cancelText: translate("appUsers.deactive.cancel"),
      okText: translate("appUsers.deactive.confirm"),
      onOk() {
        appUserRepository.bulkDeactive(selectedRowKeys).subscribe({
          next: () => {
            notifyUpdateItemSuccess({
              message: translate("appUsers.deactive.success"),
            });
            setSelectedRowKeys([]);
            handleResetList();
          },
          error: () => {
            notifyUpdateItemError({
              message: translate("appUsers.deactive.error"),
            });
          },
        });
      },
      closable: true,
    });
  }, [
    handleResetList,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    selectedRowKeys,
    setSelectedRowKeys,
    translate,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkChangePassword = React.useCallback(
    (selectedRowKeys: KeyType[]) => () => {
      drawerChangePasswordRef.current.handleOpen(selectedRowKeys);
    },
    [drawerChangePasswordRef]
  );

  const isEditable = React.useCallback(
    (appUser: AppUser) => {
      if (profile.userId === appUser.id) {
        return true;
      }
      const currentAdminType = profile.adminType;
      if (currentAdminType && currentAdminType.code) {
        switch (currentAdminType.code) {
          case ADMIN_TYPE.GLOBAL_ADMIN:
            if (appUser.adminType?.code === ADMIN_TYPE.GLOBAL_ADMIN) {
              return false;
            }
            return true;
          case ADMIN_TYPE.ORGANIZATION_ADMIN:
            if (
              appUser.adminType?.code === ADMIN_TYPE.GLOBAL_ADMIN ||
              appUser.adminType?.code === ADMIN_TYPE.ORGANIZATION_ADMIN
            ) {
              return false;
            }
            return true;
          case ADMIN_TYPE.SITE_ADMIN:
            if (
              appUser.adminType?.code === ADMIN_TYPE.GLOBAL_ADMIN ||
              appUser.adminType?.code === ADMIN_TYPE.ORGANIZATION_ADMIN ||
              appUser.adminType?.code === ADMIN_TYPE.SITE_ADMIN
            ) {
              return false;
            }
            return true;
          case ADMIN_TYPE.USER:
            if (
              appUser.adminType?.code === ADMIN_TYPE.GLOBAL_ADMIN ||
              appUser.adminType?.code === ADMIN_TYPE.ORGANIZATION_ADMIN ||
              appUser.adminType?.code === ADMIN_TYPE.SITE_ADMIN
            ) {
              return false;
            }
            return true;
          default:
            return true;
        }
      }
    },
    [profile]
  );

  const menu = React.useCallback(
    (appUser: AppUser) => {
      const isGlobalAdmin =
        appUser.adminType && appUser.adminType.code === ADMIN_TYPE.GLOBAL_ADMIN;
      const canEdit = isEditable(appUser);
      const list: ListOverflowMenu[] = [
        {
          title: translate("appUsers.actions.edit"),
          action: () => {
            handleGoElseWhere(APP_USER_EDIT_ROUTE, {
              key: "appUserId",
              value: appUser.id,
            });
          },
          isShow: true,
        },
        {
          title: translate("appUsers.actions.changePassword"),
          action: () => {
            drawerChangePasswordRef.current.handleOpen(appUser);
          },
          isShow: true,
        },
        {
          title: translate("appUsers.actions.deactive"),
          action: handleDeactive(appUser),
          isShow: appUser.statusId === 1 && !isGlobalAdmin,
        },
        {
          title: translate("appUsers.actions.active"),
          action: handleActive(appUser),
          isShow: appUser.statusId === 0 && !isGlobalAdmin,
        },
        {
          title: translate("appUsers.actions.delete"),
          action: handleDelete(appUser),
          isShow: !appUser.used && !isGlobalAdmin,
        },
      ];
      return <OverflowMenu list={list} disabled={!canEdit}></OverflowMenu>;
    },
    [
      drawerChangePasswordRef,
      handleActive,
      handleDeactive,
      handleDelete,
      handleGoElseWhere,
      isEditable,
      translate,
    ]
  );

  const columns: ColumnProps<AppUser>[] = React.useMemo(
    () => [
      {
        title: translate("appUsers.code"),
        key: "code",
        dataIndex: "code",
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(modelFilter, "code"),
        ellipsis: true,
        render(...params: [string, AppUser, number]) {
          return (
            <LayoutCell>
              <OneLineText value={params[0]} />
            </LayoutCell>
          );
        },
      },
      {
        title: translate("appUsers.displayName"),
        key: "displayName",
        dataIndex: "displayName",
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          modelFilter,
          "displayName"
        ),
        ellipsis: true,
        render(...params: [string, AppUser, number]) {
          return (
            <LayoutCell>
              <OneLineText countCharacters={45} value={params[0]} />
            </LayoutCell>
          );
        },
      },

      {
        title: translate("appUsers.email"),
        key: "email",
        dataIndex: "email",
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          modelFilter,
          "email"
        ),
        ellipsis: true,
        render(...params: [string, AppUser, number]) {
          return (
            <LayoutCell>
              <OneLineText value={params[0]} countCharacters={80} />
            </LayoutCell>
          );
        },
      },

      // {
      //   title: (
      //     <LayoutHeader
      //       orderType="left"
      //       title={translate("appUsers.adminType")}
      //     />
      //   ),
      //   key: "adminType",
      //   dataIndex: "adminType",
      //   ellipsis: true,
      //   render(adminType: AdminType) {
      //     const value = handleMapAdminType(adminType);
      //     return (
      //       <LayoutCell orderType="left" tableSize="md">
      //         <BadgeText
      //           value={value?.name}
      //           backgroundColor={value?.bgColor}
      //           color={value?.color}
      //         />
      //       </LayoutCell>
      //     );
      //   },
      // },

      {
        title: translate("appUsers.status"),
        key: "status",
        dataIndex: "status",
        sorter: true,
        sortOrder: getAntOrderType<AppUser, AppUserFilter>(
          modelFilter,
          "status"
        ),
        ellipsis: true,
        render(status: Status) {
          return (
            <LayoutCell>
              <StatusLine value={status?.name} color={status?.color} />
            </LayoutCell>
          );
        },
      },

      {
        key: "action",
        dataIndex: "id",
        fixed: "right",
        width: 80,
        align: "center",
        render(id: number, appUser: AppUser) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              {menu(appUser)}
            </div>
          );
        },
      },
    ],
    [modelFilter, translate, menu]
  );

  return (
    <>
      {/*
        // Chỗ này dành cho action khi chọn Row Selection */}
      {/* <ActionBarComponent
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        translateTitleCancelButton={translate("general.actions.close")}
      >
        {canBulkDelete && (
          <Button
            icon={<TrashCan size={16} />}
            type="ghost-primary"
            className="btn--lg"
            disabled={!canBulkAction}
            onClick={handleBulkDelete}
          >
            {translate("appUsers.actions.delete")}
          </Button>
        )}
        <Button
          icon={<Locked size={16} />}
          type="ghost-primary"
          className="btn--lg"
          disabled={!canBulkAction}
          onClick={handleBulkChangePassword(selectedRowKeys)}
        >
          {translate("appUsers.actions.changePassword")}
        </Button>
        <Button
          icon={<Password size={16} />}
          type="ghost-primary"
          className="btn--lg"
          disabled={!canBulkAction}
          onClick={handleBulkDeactive}
        >
          {translate("appUsers.actions.deactive")}
        </Button>
        <Button
          icon={<Unlocked size={16} />}
          type="ghost-primary"
          className="btn--lg"
          disabled={!canBulkAction}
          onClick={handleBulkActive}
        >
          {translate("appUsers.actions.active")}
        </Button>
      </ActionBarComponent> 
       
        // Chỗ này dành cho action khi chọn Row Selection 
      */}
      <div className="page-master__table">
        <StandardTable
          rowKey={"id"}
          columns={columns}
          dataSource={listData}
          isDragable={true}
          loading={loadingList}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
        <div className="page-master__pagination">
          <Pagination
            skip={modelFilter?.skip}
            take={modelFilter?.take}
            total={count}
            onChange={handlePagination}
            pageSizeOptions={DEFAULT_PAGE_SIZE_OPTION}
          />
        </div>
      </div>
    </>
  );
};

export default AppUserMasterTabTable;
