import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightersModule } from '../fighters/fighters.module';
import {Fight} from "../entities/fight.entity";
import {Fighter} from "../entities/fighter.entity";
import {Event} from "../entities/event.entity";
import {EventsModule} from "../events/events.module";
import {FightsService} from "./fights.service";
import {FightsResolver} from "./fights.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([Fight, Event, Fighter]),
        FightersModule,
        EventsModule,
    ],
    providers: [FightsService, FightsResolver],
    exports: [FightsService],
})
export class FightsModule {}