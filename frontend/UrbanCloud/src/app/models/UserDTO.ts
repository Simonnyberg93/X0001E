export class UserDTO {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(fname: string, lname: string, email: string, password: string) {
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.password = password;
  }
}
