import {
  User,
  UserActivity,
  UserAdmin,
  UserCertification,
} from "@carbon/icons-react";
import { translate } from "core/config/i18n";

export const globalAdminType = {
  bgColor: "#EDE5FF",
  color: "#491D8B",
  icon: <UserCertification size={24} />,
  description: translate("adminTypes.description.globalAdmin"),
  subSystemDescription: translate(
    "adminTypes.subSystemDescription.globalAdmin"
  ),
};

export const organizationAdminType = {
  bgColor: "#D0E2FF",
  color: "#002D9C",
  icon: <UserAdmin size={24} />,
  description: translate("adminTypes.description.organizationAdmin"),
  subSystemDescription: translate(
    "adminTypes.subSystemDescription.organizationAdmin"
  ),
};

export const siteAdminType = {
  bgColor: "#D9FBFB",
  color: "#004144",
  icon: <UserActivity size={24} />,
  description: translate("adminTypes.description.siteAdmin"),
  subSystemDescription: translate("adminTypes.subSystemDescription.siteAdmin"),
};

export const user = {
  bgColor: "#F4F4F4",
  color: "#525252",
  icon: <User size={24} />,
  description: translate("adminTypes.description.user"),
  subSystemDescription: translate("adminTypes.subSystemDescription.user"),
};

export const fieldType = {
  ID: "ID",
  STRING: "STRING",
  LONG: "LONG",
  DECIMAL: "DECIMAL",
  DATE: "DATE",
};

export const permissionOperator = {
  ID_EQ: "ID_EQ",
  ID_NE: "ID_NE",
  ID_IN: "ID_IN",
  ID_NI: "ID_NI",
  ID_IN_TR: "ID_IN_TR",
  ID_NI_TR: "ID_NI_TR",
  STRING_NE: "STRING_NE",
  STRING_EQ: "STRING_EQ",
  STRING_SW: "STRING_SW",
  STRING_NSW: "STRING_NSW",
  STRING_EW: "STRING_EW",
  STRING_NEW: "STRING_NEW",
  STRING_CTL: "STRING_CT",
  STRING_NC: "STRING_NC",
  LONG_GT: "LONG_GT",
  LONG_GE: "LONG_GE",
  LONG_LT: "LONG_LT",
  LONG_LE: "LONG_LE",
  LONG_NE: "LONG_NE",
  LONG_EQ: "LONG_EQ",
  LONG_GROUPIN_LT_LT: "LONG_GROUPIN_LT_LT",
  LONG_GROUPIN_LE_LE: "LONG_GROUPIN_LE_LE",
  LONG_GROUPIN_LT_LE: "LONG_GROUPIN_LT_LE",
  LONG_GROUPIN_LE_LT: "LONG_GROUPIN_LE_LT",
  DECIMAL_GT: "DECIMAL_GT",
  DECIMAL_GE: "DECIMAL_GE",
  DECIMAL_LT: "DECIMAL_LT",
  DECIMAL_LE: "DECIMAL_LE",
  DECIMAL_NE: "DECIMAL_NE",
  DECIMAL_EQ: "DECIMAL_EQ",
  DECIMAL_GROUPIN_LT_LT: "DECIMAL_GROUPIN_LT_LT",
  DECIMAL_GROUPIN_LE_LE: "DECIMAL_GROUPIN_LE_LE",
  DECIMAL_GROUPIN_LT_LE: "DECIMAL_GROUPIN_LT_LE",
  DECIMAL_GROUPIN_LE_LT: "DECIMAL_GROUPIN_LE_LT",
  DATE_GT: "DATE_GT",
  DATE_GE: "DATE_GE",
  DATE_LT: "DATE_LT",
  DATE_LE: "DATE_LE",
  DATE_NE: "DATE_NE",
  DATE_EQ: "DATE_EQ",
  DATE_GROUPIN_LT_LT: "DATE_GROUPIN_LT_LT",
  DATE_GROUPIN_LE_LE: "DATE_GROUPIN_LE_LE",
  DATE_GROUPIN_LT_LE: "DATE_GROUPIN_LT_LE",
  DATE_GROUPIN_LE_LT: "DATE_GROUPIN_LE_LT",
};

export const userApproval = {
  APPUSER_APPROVE: "APPUSER_APPROVE",
  ROLE_APPROVE: "ROLE_APPROVE",
  PARTNER_APPROVE: "PARTNER_APPROVE",
  PARTNER_ROLE_APPROVE: "PARTNER_ROLE_APPROVE",
};
