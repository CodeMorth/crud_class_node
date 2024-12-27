import { IncomingMessage } from "http";

export interface RequestWhitParams extends IncomingMessage {
  body: any;
  file?: any;
  params: { id: string };
}