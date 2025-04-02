import {Query, Mutation, Args, Resolver, Int, ID} from '@nestjs/graphql';
import { FightersService } from './fighters.service';
import { Fighter } from '../entities/fighter.entity';
import { FightStats } from '../dto/fight-stats.dto';
import {CreateFighterInput} from "./dto/create-fighter.input";
import {UpdateFighterInput} from "./dto/update-fighter.input";

@Resolver(() => Fighter)
export class FightersResolver {
    constructor(private fightersService: FightersService) {}

    @Query(() => [Fighter], { name: 'fighters' })
    async getFighters() {
        return this.fightersService.findAll();
    }

    @Query(() => Fighter, { name: 'fighter' })
    async getFighter(@Args('id', { type: () => Int }) id: number) {
        return this.fightersService.findOne(id);
    }

    @Query(() => FightStats, { name: 'fighterStats' })
    async getFighterStats(@Args('id', { type: () => Int }) id: number) {
        return this.fightersService.getFighterStats(id);
    }

    @Mutation(() => Fighter)
    async createFighter(
        @Args('data') data: CreateFighterInput
    ) {
        return this.fightersService.create(data);
    }

    @Mutation(() => Fighter)
    async updateFighter(
        @Args('id', { type: () => ID }) id: number,
        @Args('data', { type: () => UpdateFighterInput }) data: UpdateFighterInput
    ) {
        return this.fightersService.update(id, data);
    }

    @Mutation(() => Boolean)
    async deleteFighter(@Args('id', { type: () => Int }) id: number) {
        await this.fightersService.remove(id);
        return true;
    }
}