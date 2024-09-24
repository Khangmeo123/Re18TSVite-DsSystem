import React, { createContext } from "react";
import { useTranslation } from "react-i18next";

import { APP_USER_MASTER_ROUTE } from "config/route-const";
import { detailService } from "core/services/page-services/detail-service";
import { fieldService } from "core/services/page-services/field-service";
import { AppUser } from "models/AppUser";
import { useHistory } from "react-router";
import { appUserRepository } from "../AppUserRepository";
import { GeneralAction } from "core/services/service-types";

export interface RoleMasterTab {
  id: string;
  code: string;
  name: string;
}

export interface AppUserDetail {
  model: AppUser;
  dispatchModel: React.Dispatch<GeneralAction<AppUser>>;
  isDetail: boolean;
}

export const AppUserDetailContext = createContext<AppUserDetail>({
  model: new AppUser(),
  dispatchModel: null,
  isDetail: false,
});

export function useDetailHook() {
  const [translate] = useTranslation();
  const { model, dispatch } = detailService.useModel<AppUser>(AppUser);

  const { isDetail } = detailService.useGetIsDetail<AppUser>(
    appUserRepository.get,
    dispatch
  );
  const history = useHistory();
  const handleGoMaster = React.useCallback(() => {
    history.push(APP_USER_MASTER_ROUTE);
  }, [history]);

  const {
    handleChangeSingleField,
    handleChangeSelectField,
    handleChangeDateField,
    handleChangeBoolField,
    handleChangeAllField,
  } = fieldService.useField(model, dispatch);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showLoading, setShowLoading] = React.useState<boolean>(false);

  return {
    history,
    translate,
    dispatchModel: dispatch,
    model,
    isDetail,
    handleChangeSingleField,
    handleChangeSelectField,
    handleChangeDateField,
    handleChangeBoolField,
    handleChangeAllField,
    showLoading,
    setShowLoading,
    showPassword,
    setShowPassword,
    handleGoMaster,
  };
}
