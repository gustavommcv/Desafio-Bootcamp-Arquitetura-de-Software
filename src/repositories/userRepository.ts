import { UUID } from "crypto";

export default interface userRepository {
  findByPK(pk: UUID): Promise<object>;
}
