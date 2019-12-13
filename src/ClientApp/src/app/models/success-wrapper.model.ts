export class SuccessWrapper<T> {
  public successful: boolean;
  public errorMessage?: string;
  public result?: T;
}
