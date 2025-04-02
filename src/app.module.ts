import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FightersModule } from './fighters/fighters.module';
import { EventsModule } from './events/events.module';
import { FightsModule } from './fights/fights.module';
import { RankingsModule } from './rankings/rankings.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { WeightClassesModule } from './weight-classes/weight-classes.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'fighters_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FightersModule,
    EventsModule,
    FightsModule,
    RankingsModule,
    WeightClassesModule,
  ],
})
export class AppModule {}