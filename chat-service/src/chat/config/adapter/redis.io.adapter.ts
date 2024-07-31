// chat-service 인스턴스 확장시 adapter 필요
// export class RedisIoAdapter extends IoAdapter {
//   private adapterConstructor: ReturnType<typeof createAdapter>;
//
//   async connectToRedis(): Promise<void> {
//     const pubClient = createClient({ url: 'redis://localhost:16379' });
//     const subClient = pubClient.duplicate();
//
//     await Promise.all([pubClient.connect(), subClient.connect()]);
//
//     this.adapterConstructor = createAdapter(pubClient, subClient);
//   }
//
//   createIOServer(port: number, options?: ServerOptions): any {
//     const server = super.createIOServer(port, options);
//     server.adapter(this.adapterConstructor);
//     return server;
//   }
// }
