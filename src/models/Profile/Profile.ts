import { Model } from "react-3layer-common";
import { Field, ObjectField, ObjectList } from "react-3layer-decorators";
import { SubSystem } from "models/SubSystem";
import { AdminType } from "models/AdminType";

export class Profile extends Model {
  @Field(Number)
  public userId?: number;
  @Field(String)
  public avatar?: string;
  @Field(String)
  public defaultPath?: string;
  @Field(String)
  public displayName?: string;
  @Field(String)
  public userName?: string;
  @Field(Boolean)
  public receivingSystemEmail?: boolean;
  @Field(Boolean)
  public receivingSystemNotification?: boolean;
  @Field(Number)
  public tokenRemaingExpirySeconds?: number;
  @Field(Number)
  public intervalTimeSeconds?: number;
  @ObjectField(AdminType)
  public adminType?: AdminType;
  @ObjectList(SubSystem)
  public subSytems?: SubSystem[] = [];
}

export class ProfileChangePassword extends Model {
  @Field(String)
  public oldPassword?: string;
  @Field(String)
  public newPassword?: string;
  @Field(String)
  public verifyNewPassword?: string;

  constructor() {
    super();
  }
}
