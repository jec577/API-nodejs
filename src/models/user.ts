import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

@Entity('user')
class User {
    @PrimaryColumn({ type: 'uuid' })
    id: String;

    @Column({ type: 'text', nullable: false })
    username: String;

    @Column({ type: 'text', nullable: false, unique: true })
    email: String;

    @Column({ type: 'text', nullable: false })
    password: String;

    @Column({ type: 'text', nullable: false })
    occupation: String;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }

}

export { User };