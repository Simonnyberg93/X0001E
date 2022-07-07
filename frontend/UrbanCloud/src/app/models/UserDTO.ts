import { Topic } from './Topic';

export class UserDTO {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  topicsOfInterest: Array<Topic> = [];

  constructor(fname: string, lname: string, email: string, password: string) {
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.password = password;
  }
}
