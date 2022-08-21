import { Topic } from './Topic';
import { Area } from './Area';
import { Role } from './Role';

export class UserDTO {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  accountRole: string = '';
  roles: Array<Role> = [];
  areasOfInterests: Array<Area> = [];
  topicsOfInterests: Array<Topic> = [];

  constructor(fname: string, lname: string, email: string, password: string) {
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.password = password;
  }
}
