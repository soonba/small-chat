import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlOptions } from 'libs/graphql/graphql.options';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    UserModule,
    RoomModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://mongodb/small_chat'),
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphqlOptions),
  ],
  controllers: [AppController],
})
export class AppModule {}
