export class CreateUserDto {
  constructor(userInfo) {
    (this.full_name =
      `${userInfo.first_name} ${userInfo.last_name}`.toUpperCase()),
      (this.email = userInfo.email);
    this.rol = userInfo.rol;
  }
}
