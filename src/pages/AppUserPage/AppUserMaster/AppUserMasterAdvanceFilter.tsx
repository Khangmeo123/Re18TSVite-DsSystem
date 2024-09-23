import { Col, Row } from "antd";
import FilterPanel from "components/FilterPanel/FilterPanel";
import { filterService } from "core/services/page-services/filter-service";
import { AppUserFilter } from "models/AppUser";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IdFilter, StringFilter } from "react-3layer-advance-filters";
import {
  AdvanceDateRangeFilter,
  AdvanceStringFilter,
  CheckboxGroup,
} from "react-components-design-system";
import { Search } from "@carbon/icons-react";
import { appUserRepository } from "pages/AppUserPage/AppUserRepository";
import { AppUserMaster, AppUserMasterContext } from "./AppUserMasterHook";
import { FilterActionEnum } from "core/services/service-types";

interface AppUserMasterAdvanceFilterProps {
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppUserMasterAdvanceFilter = (props: AppUserMasterAdvanceFilterProps) => {
  const appUserMaster = useContext<AppUserMaster>(AppUserMasterContext);
  const {
    modelFilter: filter,
    dispatchFilter: upDateFilter,
    handleLoadList,
    handleResetList,
  } = appUserMaster;

  const { setVisible } = props;

  const [translate] = useTranslation();

  const { modelFilter, dispatchFilter } = filterService.useModelFilter(
    AppUserFilter,
    filter
  );

  const {
    handleChangeInputFilter,
    handleChangeCheckboxFilter,
    handleChangeDateFilter,
  } = filterService.useFilter(modelFilter, dispatchFilter);

  const handleSaveModelFilter = React.useCallback(() => {
    upDateFilter({
      type: FilterActionEnum.SET,
      payload: modelFilter,
    });
    setVisible(false);
    handleLoadList(modelFilter);
  }, [handleLoadList, modelFilter, setVisible, upDateFilter]);

  const handleClearModelFilter = React.useCallback(() => {
    dispatchFilter({
      type: FilterActionEnum.SET,
      payload: {
        ...new AppUserFilter(),
        subSystemId: filter.subSystemId,
      },
    });
    setVisible(false);
    handleResetList();
  }, [dispatchFilter, filter.subSystemId, handleResetList, setVisible]);

  React.useEffect(() => {
    dispatchFilter({
      type: FilterActionEnum.SET,
      payload: filter,
    });
  }, [dispatchFilter, filter]);

  return (
    <FilterPanel
      handleAppplyFilter={handleSaveModelFilter}
      handleResetFilter={handleClearModelFilter}
      titleButtonCancel={translate("general.actions.resetFilter")}
      titleButtonApply={translate("general.actions.applyFilter")}
      handleToogleFilter={setVisible}
    >
      <FilterPanel.Left>
        <CheckboxGroup
          label={translate("appUsers.status")}
          values={modelFilter?.statusId?.in}
          onChange={handleChangeCheckboxFilter({
            fieldName: "status",
            fieldType: "in",
            classFilter: IdFilter,
          })}
          getList={appUserRepository.singleListStatus}
        />
        <CheckboxGroup
          label={translate("appUsers.adminType")}
          values={modelFilter?.adminTypeId?.in}
          onChange={handleChangeCheckboxFilter({
            fieldName: "adminType",
            fieldType: "in",
            classFilter: IdFilter,
          })}
          getList={appUserRepository.singleListAdminType}
        />
      </FilterPanel.Left>
      <FilterPanel.Right>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={8} className="m-b--md">
            <AdvanceStringFilter
              label={translate("appUsers.code")}
              maxLength={100}
              value={modelFilter.code?.contain}
              onChange={handleChangeInputFilter({
                fieldName: "code",
                fieldType: "contain",
                classFilter: StringFilter,
              })}
              placeHolder={translate("appUsers.placeholder.code")}
              prefix={<Search size={16} />}
              type={0}
              isSmall
            />
          </Col>
          <Col lg={8} className="m-b--md">
            <AdvanceStringFilter
              label={translate("appUsers.displayName")}
              maxLength={100}
              value={modelFilter.displayName?.contain}
              onChange={handleChangeInputFilter({
                fieldName: "displayName",
                fieldType: "contain",
                classFilter: StringFilter,
              })}
              placeHolder={translate("appUsers.placeholder.displayName")}
              prefix={<Search size={16} />}
              type={0}
              isSmall
            />
          </Col>
          <Col lg={8} className="m-b--md">
            <AdvanceStringFilter
              label={translate("appUsers.email")}
              maxLength={100}
              value={modelFilter.email?.contain}
              onChange={handleChangeInputFilter({
                fieldName: "email",
                fieldType: "contain",
                classFilter: StringFilter,
              })}
              placeHolder={translate("appUsers.placeholder.email")}
              prefix={<Search size={16} />}
              type={0}
              isSmall
            />
          </Col>
          <Col lg={8} className="m-b--md">
            <AdvanceStringFilter
              label={translate("appUsers.phone")}
              maxLength={100}
              value={modelFilter.phone?.contain}
              onChange={handleChangeInputFilter({
                fieldName: "phone",
                fieldType: "contain",
                classFilter: StringFilter,
              })}
              placeHolder={translate("appUsers.placeholder.phone")}
              prefix={<Search size={16} />}
              type={0}
              isSmall
            />
          </Col>
          <Col lg={8} className="m-b--md">
            <AdvanceStringFilter
              label={translate("appUsers.address")}
              maxLength={100}
              value={modelFilter.address?.contain}
              onChange={handleChangeInputFilter({
                fieldName: "address",
                fieldType: "contain",
                classFilter: StringFilter,
              })}
              placeHolder={translate("appUsers.placeholder.address")}
              prefix={<Search size={16} />}
              type={0}
              isSmall
            />
          </Col>
          <Col lg={8} className="m-b--md">
            <AdvanceDateRangeFilter
              label={translate("appUsers.birthday")}
              onChange={handleChangeDateFilter({
                fieldName: "birthday",
                fieldType: ["greaterEqual", "lessEqual"],
              })}
              values={[
                modelFilter?.birthday?.greaterEqual,
                modelFilter?.birthday?.lessEqual,
              ]}
              placeholder={[
                translate("appUsers.placeholder.birthday"),
                translate("appUsers.placeholder.birthday"),
              ]}
              bgColor="white"
              type={0}
              isSmall
            />
          </Col>
        </Row>
      </FilterPanel.Right>
    </FilterPanel>
  );
};

export default AppUserMasterAdvanceFilter;
