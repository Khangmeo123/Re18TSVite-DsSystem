import {
  DateFilter,
  IdFilter,
  StringFilter,
} from "react-3layer-advance-filters";
import { ModelFilter } from "react-3layer-common";
import { ObjectField } from "react-3layer-decorators";

export class AppUserFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public code?: StringFilter = new StringFilter();
  @ObjectField(IdFilter)
  public displayName?: StringFilter = new StringFilter();
  @ObjectField(IdFilter)
  public address?: StringFilter = new StringFilter();
  @ObjectField(DateFilter)
  public birthday?: DateFilter = new DateFilter();
  @ObjectField(StringFilter)
  public email?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public phone?: StringFilter = new StringFilter();
  @ObjectField(IdFilter)
  public genderId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public statusId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public adminTypeId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public subSystemId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public roleId?: IdFilter = new IdFilter();
}
