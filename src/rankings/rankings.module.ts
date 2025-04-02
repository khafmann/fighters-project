import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsService } from './rankings.service';
import { RankingsResolver } from './rankings.resolver';
import { Ranking } from '../entities/ranking.entity';
import { Fighter } from '../entities/fighter.entity';
import { WeightClass } from '../entities/weight-class.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ranking, Fighter, WeightClass]),
    ],
    providers: [RankingsService, RankingsResolver],
    exports: [RankingsService],
})
export class RankingsModule {}