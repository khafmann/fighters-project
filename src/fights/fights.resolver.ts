import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightsService } from './fights.service';
import { Fight } from '../entities/fight.entity';
import {CreateFightInput} from "./dto/create-fight.input";
import {UpdateFightInput} from "./dto/update-fight.input";

@Resolver(() => Fight)
export class FightsResolver {
    constructor(private readonly fightsService: FightsService) {}

    @Mutation(() => Fight)
    async createFight(
        @Args('createFightInput', { type: () => CreateFightInput })
            createFightInput: CreateFightInput
    ) {
        return this.fightsService.create(createFightInput);
    }

    @Query(() => [Fight], { name: 'fights' })
    findAll() {
        return this.fightsService.findAll();
    }

    @Query(() => Fight, { name: 'fight' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.fightsService.findOne(id);
    }

    @Query(() => [Fight], { name: 'fightsByFighter' })
    findByFighter(@Args('fighterId', { type: () => Int }) fighterId: number) {
        return this.fightsService.findByFighter(fighterId);
    }


    @Mutation(() => Fight)
    updateFight(
        @Args('id', { type: () => Int }) id: number,
        @Args('data', { type: () => UpdateFightInput }) data: UpdateFightInput,
    ) {
        return this.fightsService.update(id, data);
    }

    @Mutation(() => Boolean)
    removeFight(@Args('id', { type: () => Int }) id: number) {
        return this.fightsService.remove(id).then(() => true);
    }

    @Mutation(() => Fight)
    recordFightResult(
        @Args('id', { type: () => Int }) id: number,
        @Args('result') result: string,
    ) {
        return this.fightsService.recordResult(id, result);
    }
}