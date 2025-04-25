import UserResponseDTO from "../dto/UserResponseDTO";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date | string;
  updated_at: Date | string;

  toUserResponse(): UserResponseDTO;
}

export default class User implements IUser {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: Date = new Date(),
    public updated_at: Date = new Date()
  ) {}
  toUserResponse(): UserResponseDTO {
    return new UserResponseDTO(
      this.id,
      this.name,
      this.email,
      this.created_at,
      this.updated_at
    );
  }
}
