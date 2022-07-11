import { Role } from './Role';
import { Topic } from './Topic';
import { Area } from './Area';

export class UserDTO {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  roles: Array<Role> = [];
  areasOfInterest: Array<Area> = [];
  topicsOfInterest: Array<Topic> = [];

  constructor(fname: string, lname: string, email: string, password: string) {
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.password = password;
  }
}
