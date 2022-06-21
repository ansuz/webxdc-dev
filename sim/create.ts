import { WebXdc, JsonValue, ReceivedUpdate } from "../types/webxdc-types";

export type TransportMessageCallback = (data: JsonValue) => void;
export type TransportConnectCallback = () => void;

export type Transport = {
  send(data: JsonValue): void;
  onMessage(callback: TransportMessageCallback): void;
  onConnect(callback: TransportConnectCallback): void;
  address(): string;
  name(): string;
};

export function createWebXdc(transport: Transport): WebXdc {
  let resolveUpdateListenerPromise: (() => void) | null = null;

  const webXdc: WebXdc = {
    sendUpdate: (update, descr) => {
      transport.send({ type: "sendUpdate", update, descr });
      console.info("send", { update, descr });
    },
    setUpdateListener: (listener, serial = 0): Promise<void> => {
      transport.onMessage((data) => {
        const receivedUpdates: ReceivedUpdate<any>[] = data as any;
        console.info("recv", receivedUpdates);
        for (const update of receivedUpdates) {
          listener(update);
        }
        if (resolveUpdateListenerPromise != null) {
          resolveUpdateListenerPromise();
          resolveUpdateListenerPromise = null;
        }
      });
      transport.onConnect(() => {
        transport.send({ type: "setUpdateListener", serial });
      });
      const promise = new Promise<void>((resolve) => {
        resolveUpdateListenerPromise = resolve;
      });
      return promise;
    },
    selfAddr: transport.address(),
    selfName: transport.name(),
  };
  return webXdc;
}