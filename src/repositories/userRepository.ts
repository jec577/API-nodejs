import { appDataSource } from "../config/database";
import { User } from "../models/user";

const UserRepository = appDataSource.getRepository(User);

export { UserRepository }