import LayoutMaster from "components/LayoutMaster/LayoutMaster";
import LayoutMasterActions from "components/LayoutMaster/LayoutMasterActions";
import LayoutMasterContent from "components/LayoutMaster/LayoutMasterContent";
import AppUserMasterTabAction from "./AppUserMasteTabAction";
import AppUserMasterTabTable from "./AppUserMasterTabTable";

const AppUserMasterTab = () => {
  return (
    <LayoutMaster>
      <LayoutMasterActions>
        <AppUserMasterTabAction />
      </LayoutMasterActions>
      <LayoutMasterContent>
        <AppUserMasterTabTable />
      </LayoutMasterContent>
    </LayoutMaster>
  );
};

export default AppUserMasterTab;
