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

export interface MarksI {
  id?: number | null;
  empId?: number | null;
  session: string;
  marks: string;
  remarks: string;
  by: String;
}
import { User } from "./user.model";
@Table({
  tableName: "Mark",
  timestamps: true,
})
export class Marks extends Model implements MarksI {
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
  marks!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  remarks!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  by!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  empId!: number;
}
