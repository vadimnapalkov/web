import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@backend/users'
import { RolesModule } from '@backend/roles'
import { APP_GUARD } from '@nestjs/core'
import { AccessGuard, ResourceGuard, AuthMiddleware } from '@backend/common'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from './config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      database: DB_NAME,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      entities: ['../**/src/**/entities/**.ts'],
      migrations: ['../**/migrations/**.ts'],
      migrationsRun: true,
      synchronize: true,
      logging: false,
    }),
    GraphQLModule.forRoot({
      path: '/graphql',
      typePaths: ['../**/*.graphql'],
      installSubscriptionHandlers: false,
      resolvers: {
        Date: GraphQLDate,
        Time: GraphQLTime,
        DateTime: GraphQLDateTime,
      },
      context: ({ req }) => req,
      formatError: error => {
        return error
      },
      playground: true,
    }),
    UsersModule,
    RolesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('graphql')
  }
}
