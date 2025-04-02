import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../entities/fighter.entity';
import { FightersService } from './fighters.service';
import { FightersResolver } from './fighters.resolver';
import { WeightClass } from '../entities/weight-class.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Fighter, WeightClass])],
    providers: [FightersService, FightersResolver],
    exports: [FightersService],
})
export class FightersModule {}