import { User } from './User';

export class Project {
    public Project_Id: number;
    public ProjectName: string;
    public Start_Date?: Date;
    public End_Date?: Date;
    public Priority: number;
    public UserId?: number;
    public ManagerName: string;
    public lstUsers: User[];
    public TotalTaskCount: number;
    public CompletedTaskCount: number;
    public IsCreate: boolean = false;

}