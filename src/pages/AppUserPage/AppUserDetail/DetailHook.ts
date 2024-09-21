import {
  globalAdminType,
  organizationAdminType,
  siteAdminType,
  user,
} from "config/const";
import { queryStringService } from "core/services/page-services/query-string-service";
import { ADMIN_TYPE, AdminType } from "models/AdminType";
import { AppUser } from "models/AppUser";
import { Profile } from "models/Profile";
import { SubSystem } from "models/SubSystem";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { ListOverflowMenu } from "react-components-design-system/dist/esm/types/components/OverflowMenu/OverflowMenuList";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import { useAppSelector } from "rtk/hook";
import type { FileModel } from "react-components-design-system/dist/esm/types/components/UploadFile/UploadFile";
import { APP_USER_ADMIN_TYPE_MASTER_ROUTE } from "config/route-const";
import { AppUserSubSystemMapping } from "models/AppUserSubSystemMapping";

export function useDetailHook() {
  const [translate] = useTranslation();
  const { path } = useRouteMatch();
  const history = useHistory();
  const [appUser, setAppUser] = React.useState(new AppUser());
  const { appUserId } = queryStringService.useGetQueryString("appUserId");
  const profile = useAppSelector<Profile>((state) => state.profile);

  const adminType = React.useMemo(() => {
    let adminType = new AdminType();
    if (appUser.adminType) {
      adminType = { ...appUser.adminType };
      switch (adminType.code) {
        case ADMIN_TYPE.GLOBAL_ADMIN:
          adminType = { ...adminType, ...globalAdminType };
          break;
        case ADMIN_TYPE.ORGANIZATION_ADMIN:
          adminType = { ...adminType, ...organizationAdminType };
          break;
        case ADMIN_TYPE.SITE_ADMIN:
          adminType = { ...adminType, ...siteAdminType };
          break;
        case ADMIN_TYPE.USER:
          adminType = { ...adminType, ...user };
          break;
      }
    }
    return adminType;
  }, [appUser]);

  const isEditable = React.useMemo(() => {
    if (profile.userId === appUser.id) {
      return true;
    }
    const currentAdminType = profile.adminType;
    if (currentAdminType && currentAdminType.code) {
      switch (currentAdminType.code) {
        case ADMIN_TYPE.GLOBAL_ADMIN:
          if (adminType.code === ADMIN_TYPE.GLOBAL_ADMIN) {
            return false;
          }
          return true;
        case ADMIN_TYPE.ORGANIZATION_ADMIN:
          if (
            adminType.code === ADMIN_TYPE.GLOBAL_ADMIN ||
            adminType.code === ADMIN_TYPE.ORGANIZATION_ADMIN
          ) {
            return false;
          }
          return true;
        case ADMIN_TYPE.SITE_ADMIN:
          if (
            adminType.code === ADMIN_TYPE.GLOBAL_ADMIN ||
            adminType.code === ADMIN_TYPE.ORGANIZATION_ADMIN ||
            adminType.code === ADMIN_TYPE.SITE_ADMIN
          ) {
            return false;
          }
          return true;
        case ADMIN_TYPE.USER:
          if (
            adminType.code === ADMIN_TYPE.GLOBAL_ADMIN ||
            adminType.code === ADMIN_TYPE.ORGANIZATION_ADMIN ||
            adminType.code === ADMIN_TYPE.SITE_ADMIN
          ) {
            return false;
          }
          return true;
        default:
          return true;
      }
    }
  }, [profile, adminType, appUser]);

  const handleUpdateSubSystem = React.useCallback(
    (subSystem: SubSystem) => (value: boolean) => {
      const params = {
        subSystemId: subSystem.id,
        statusId: value ? 1 : 0,
        appUserId: appUserId,
      };
      appUserRepository.updateSubSystem(params).subscribe({
        next: (appUser: AppUser) => {
          setAppUser({ ...appUser });
        },
      });
    },
    [appUserId]
  );

  const handleSetDefaultSubsystem = React.useCallback(
    (subSystem: SubSystem) => {
      const params = {
        subSystemId: subSystem.id,
        appUserId: appUserId,
      };
      appUserRepository.setDefaultSubsystem(params).subscribe({
        next: (appUser: AppUser) => {
          setAppUser({ ...appUser });
        },
      });
    },
    [appUserId]
  );
  const menuOverflow = React.useCallback(
    (mapping: AppUserSubSystemMapping) => {
      const list: ListOverflowMenu[] = [
        {
          title: translate("appUsers.actions.rolePermissions"),
          action: () => null,
          isShow: true,
        },
        {
          title: translate("appUsers.actions.setDefaultSubsystem"),
          action: () => handleSetDefaultSubsystem(mapping.subSystem),
          isShow: !mapping.isDefault,
        },
        {
          title: `${translate("appUsers.actions.open")} ${
            mapping?.subSystem?.name
          }`,
          action: () => {
            window.location.href = mapping?.subSystem?.path;
          },
          isShow: true,
        },

        {
          title: `${translate("appUsers.actions.openSetting")} ${
            mapping?.subSystem?.name
          }`,
          action: () => {
            window.location.href = mapping?.subSystem?.path;
          },
          isShow: true,
        },
      ];
      if (adminType.code === ADMIN_TYPE.SITE_ADMIN) {
        const item: ListOverflowMenu = mapping?.isAdmin
          ? {
              title: translate("appUsers.actions.removeSiteAdmin"),
              action: () => {
                const params = {
                  appUserId: appUserId,
                  subSystemId: mapping?.subSystem.id,
                  isAdmin: false,
                  statusId: mapping?.subSystem.statusId,
                };
                appUserRepository.updateSubSystemSiteAdmin(params).subscribe({
                  next: (appUser: AppUser) => {
                    setAppUser(appUser);
                  },
                });
              },
              isShow: true,
            }
          : {
              title: translate("appUsers.actions.addSiteAdmin"),
              action: () => {
                const params = {
                  appUserId: appUserId,
                  subSystemId: mapping?.subSystem.id,
                  isAdmin: true,
                  statusId: mapping?.subSystem.statusId,
                };
                appUserRepository.updateSubSystemSiteAdmin(params).subscribe({
                  next: (appUser: AppUser) => {
                    setAppUser(appUser);
                  },
                });
              },
              isShow: true,
            };
        list.splice(1, 0, item);
      }
      if (adminType.code === ADMIN_TYPE.USER) {
        const item: ListOverflowMenu = {
          title: translate("appUsers.actions.addSiteAdmin"),
          action: () => {
            const params = {
              appUserId: appUserId,
              subSystemId: mapping?.subSystem.id,
              isAdmin: true,
            };
            appUserRepository.updateSubSystemSiteAdmin(params).subscribe({
              next: (appUser: AppUser) => {
                setAppUser(appUser);
              },
            });
          },
          isShow: true,
        };
        list.splice(1, 0, item);
      }
      return list;
    },
    [adminType.code, appUserId, handleSetDefaultSubsystem, translate]
  );

  const handleUpdateAvatar = React.useCallback(
    (file: FileModel) => {
      const appUserValue = { ...appUser };
      appUserValue.avatar = file?.url;
      appUserValue.avatarId = file.id;
      setAppUser(appUserValue);
    },
    [appUser]
  );

  React.useEffect(() => {
    appUserRepository.get(appUserId).subscribe({
      next: (appUser: AppUser) => {
        setAppUser(appUser);
      },
    });
  }, [appUserId]);
  const handleGoAppUserTypeAdmin = React.useCallback(() => {
    history.push(APP_USER_ADMIN_TYPE_MASTER_ROUTE);
  }, [history]);

  return {
    translate,
    path,
    appUser,
    setAppUser,
    adminType,
    handleUpdateSubSystem,
    menuOverflow,
    handleUpdateAvatar,
    isEditable,
    handleGoAppUserTypeAdmin,
  };
}
