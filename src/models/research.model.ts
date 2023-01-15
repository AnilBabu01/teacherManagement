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

export interface ResearchI {
  id?: number | null;
  empId?: number | null;
  session: string;
  semester: string;
  paperTitle: string;
  author: String;
  journalName: String;
  publishDate: String;
}
import { User } from "./user.model";
@Table({
  tableName: "Research",
  timestamps: true,
})
export class Research extends Model implements ResearchI {
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
  paperTitle!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  author!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  journalName!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  publishDate!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  empId!: number;
}
