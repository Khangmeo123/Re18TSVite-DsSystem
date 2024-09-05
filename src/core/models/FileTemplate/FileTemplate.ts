import { Model } from "react-3layer-commonnnn";

export class FileTemplate extends Model {
  public id?: number;
  public code?: string;
  public name?: string;
  public fileTemplateInputs?: FileTemplateInput[];
}

export class FileTemplateInput extends Model {
  public id: number;
  public fieldName?: string;
  public fieldValue?: string;
  public order?: number;
}
