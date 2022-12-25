export default interface IBootstrap {
  initialize(): Promise<any>;
  close(): void;
}

/* export abstract class Bootstrap implements IBootstrap {
  abstract initialize(): Promise<any>;
  abstract close(): void
}
 */
