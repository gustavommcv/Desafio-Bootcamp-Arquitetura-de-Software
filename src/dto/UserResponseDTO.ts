export default class UserResponseDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public created_at: Date = new Date(),
    public updated_at: Date = new Date()
  ) {}
}
