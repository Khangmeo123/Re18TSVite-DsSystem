import { IdFilter, StringFilter } from "react-3layer-advance-filters";
import { ModelFilter } from "react-3layer-commonnnn";
import { ObjectField } from "react-3layer-decorators";

export class AdminTypeFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();
}
