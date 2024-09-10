import { IdFilter, StringFilter } from "react-3layer-advance-filters";
import { ModelFilter } from "react-3layer-common";
import { ObjectField } from "react-3layer-decorators";

export class GenderFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();
}
