import type { Moment } from "moment";
import { Model } from "react-3layer-commonnnn";

export class Notification extends Model {
  public unread?: boolean;
  public titleWeb?: string;
  public contentWeb?: string;
  public time?: Moment;
}
