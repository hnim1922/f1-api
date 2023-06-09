import { Entity, Column } from "typeorm";

@Entity('result')
export class ResultEntity {
    @Column({ name: 'grand_prix' })
    public grandPrix: string;

    @Column({ name: 'date' })
    public date: Date;

    @Column({ name: "winner" })
    public winner: string;

    @Column({ name: "car" })
    public car: string;

    @Column({ name: "laps" })
    public laps: number;

    @Column({ name: "time", type: 'time' })
    public time: string;
}