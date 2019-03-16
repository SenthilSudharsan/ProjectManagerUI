export class User {
    public User_Id: number;
    public FirstName: string;
    public LastName: string;
    public Employee_Id: number;
    public Project_Id?: number;
    public Task_Id?: number;
    public IsCreate?: boolean = false;
}