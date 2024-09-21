import { Repository } from "react-3layer-common";
import kebabCase from "lodash/kebabCase";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import nameof from "ts-nameof.macro";
import { AppUser, AppUserFilter, User } from "models/AppUser";
import { httpConfig } from "core/config/http";
import { BASE_API_URL } from "core/config/consts";
import { Status, StatusFilter } from "models/Status";
import { AdminType, AdminTypeFilter } from "models/AdminType";
import { Gender, GenderFilter } from "models/Gender";
import { KeyType } from "core/services/service-types";
import type { FileModel } from "react-components-design-system/dist/esm/types/components/UploadFile/UploadFile";

export const API_APP_USER_PREFIX = "rpc/portal/app-user";

export class AppUserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = new URL(API_APP_USER_PREFIX, BASE_API_URL).href;
  }

  public count = (appUserFilter?: AppUserFilter): Observable<number> => {
    return this.http
      .post<number>(kebabCase(nameof(this.count)), appUserFilter)
      .pipe(Repository.responseDataMapper<number>());
  };

  public list = (appUserFilter?: AppUserFilter): Observable<AppUser[]> => {
    return this.http
      .post<AppUser[]>(kebabCase(nameof(this.list)), appUserFilter)
      .pipe(Repository.responseMapToList<AppUser>(AppUser));
  };

  public get = (id: number | string): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.get)), { id })
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public create = (appUser: AppUser): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.create)), appUser)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public update = (appUser: AppUser): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.update)), appUser)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public delete = (appUser: AppUser): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.delete)), appUser)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public bulkDelete = (idList: KeyType[]): Observable<void> => {
    return this.http
      .post(kebabCase(nameof(this.bulkDelete)), idList)
      .pipe(Repository.responseDataMapper());
  };

  public active = (appUser: AppUser): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.active)), appUser)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public bulkActive = (idList: KeyType[]): Observable<void> => {
    return this.http
      .post(kebabCase(nameof(this.bulkActive)), idList)
      .pipe(Repository.responseDataMapper());
  };

  public deactive = (appUser: AppUser): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.deactive)), appUser)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public bulkDeactive = (idList: KeyType[]): Observable<void> => {
    return this.http
      .post(kebabCase(nameof(this.bulkDeactive)), idList)
      .pipe(Repository.responseDataMapper());
  };

  public changePassword = (user: User): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.changePassword)), user)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public bulkChangePassword = (user: User): Observable<void> => {
    return this.http
      .post(kebabCase(nameof(this.bulkChangePassword)), user)
      .pipe(Repository.responseDataMapper());
  };

  public save = (appUser: AppUser): Observable<AppUser> => {
    return appUser.id ? this.update(appUser) : this.create(appUser);
  };

  public singleListStatus = (): Observable<Status[]> => {
    return this.http
      .post<Status[]>(
        kebabCase(nameof(this.singleListStatus)),
        new StatusFilter()
      )
      .pipe(Repository.responseMapToList<Status>(Status));
  };

  public singleListAdminType = (): Observable<AdminType[]> => {
    return this.http
      .post<AdminType[]>(
        kebabCase(nameof(this.singleListAdminType)),
        new AdminTypeFilter()
      )
      .pipe(Repository.responseMapToList<AdminType>(AdminType));
  };

  public singleListGender = (): Observable<Gender[]> => {
    return this.http
      .post<Gender[]>(
        kebabCase(nameof(this.singleListGender)),
        new GenderFilter()
      )
      .pipe(Repository.responseMapToList<Gender>(Gender));
  };

  public randomPassword = (): Observable<string> => {
    return this.http
      .post<string>(kebabCase(nameof(this.randomPassword)), {})
      .pipe(Repository.responseDataMapper<string>());
  };

  public updateSubSystem = (param: {
    userId?: number;
    subSystemId?: number;
    active?: boolean;
  }): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.updateSubSystem)), param)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };
  public setDefaultSubsystem = (param: {
    userId?: number;
    subSystemId?: number;
    // active?: boolean;
  }): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.setDefaultSubsystem)), param)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };
  public updateSubSystemSiteAdmin = (param: {
    userId?: number;
    subSystemId?: number;
    isAdmin?: boolean;
  }): Observable<AppUser> => {
    return this.http
      .post<AppUser>(kebabCase(nameof(this.updateSubSystemSiteAdmin)), param)
      .pipe(Repository.responseMapToModel<AppUser>(AppUser));
  };

  public import = (
    file: File,
    name: string = nameof(file)
  ): Observable<unknown> => {
    const formData: FormData = new FormData();
    formData.append(name, file as Blob);
    return this.http.post<unknown>(kebabCase(nameof(this.import)), formData);
  };

  public export = (
    filter: AppUserFilter
  ): Observable<AxiosResponse<ArrayBuffer>> => {
    return this.http.post("export", filter, {
      responseType: "arraybuffer",
    });
  };

  public exportTemplate = (): Observable<AxiosResponse<ArrayBuffer>> => {
    return this.http.post(
      "export-template",
      {},
      {
        responseType: "arraybuffer",
      }
    );
  };

  public upload = (file: unknown): Observable<FileModel> => {
    const formData: FormData = new FormData();
    formData.append(nameof(file), file as Blob);
    return this.http
      .post<FileModel>(kebabCase(nameof(this.upload)), formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .pipe(Repository.responseDataMapper<FileModel>());
  };
}

export const appUserRepository = new AppUserRepository();
