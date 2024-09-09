import type { Moment } from "moment";
import { Model } from "react-3layer-common";
import { Field, MomentField } from "react-3layer-decorators";

export class LoginUser extends Model {
  @Field(String)
  public username?: string;

  @Field(String)
  public idToken?: string;

  @Field(String)
  public password?: string;

  @Field(String)
  public otpCode?: string;

  @MomentField()
  public otpExpired?: Moment;
}
