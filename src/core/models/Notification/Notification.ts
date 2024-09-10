import { Dayjs } from "dayjs";
import { Model } from "react-3layer-common";

export class Notification extends Model {
  public unread?: boolean;
  public titleWeb?: string;
  public contentWeb?: string;
  public time?: Dayjs;
}
