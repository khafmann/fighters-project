import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Fighter } from "./fighter.entity";
import { Event } from "./event.entity";
import {Field, ID} from "@nestjs/graphql";

@Entity()
export class Fight {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @ManyToOne(() => Event, event => event.fights, { onDelete: 'CASCADE' })
    @Field(() => Event)
    event: Event;

    @ManyToOne(() => Fighter)
    @Field(() => Fighter)
    fighter1: Fighter;

    @ManyToOne(() => Fighter)
    @Field(() => Fighter)
    fighter2: Fighter;

    @Column()
    @Field()
    result: string;

    @OneToMany(() => Fight, fight => fight.event)
    @Field(() => [Fight])
    fights: Fight[];

    // Extra data I would add but not implemented in this version:
    // How fighter won by knocking down or by judges decision
    @Column()
    @Field()
    method: string;

    // How many rounds participants fought
    @Column({ nullable: true })
    @Field({ nullable: true })
    rounds: number;

    // Time when participants fought
    @Column({ nullable: true })
    @Field({ nullable: true })
    time: string;
}