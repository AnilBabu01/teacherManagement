import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";

export interface TeachingI {
  id?: number | null;
  empId?: number | null;
  session: string;
  semester: string;
  class: string;
  subject: String;
}
import { User } from "./user.model";
@Table({
  tableName: "Teaching",
  timestamps: true,
})
export class Teaching extends Model implements TeachingI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  session!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  semester!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  class!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  subject!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  empId!: number;
}
