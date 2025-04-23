export default interface UserService {
    getUsers(): Promise<string[]>;
}
