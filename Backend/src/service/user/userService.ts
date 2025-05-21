import { Messages } from "../../constants/MessageConstants";
import { HttpStatus } from "../../constants/statusConstant";
import { IUserService } from "../../interface/user/IUserService";
import { IUser } from "../../model/userModel";
import { BaseRepository } from "../../repository/base/baseRepository";
import { createHttpError } from "../../utils/httpError";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";

export class UserService implements IUserService {
    constructor(private _baseRepo: BaseRepository<IUser>) {}

    async register(name: string, email: string, password: string): Promise<{ message: string; }> {
        const existingUser = await this._baseRepo.findOne({ email });
        if (existingUser) {
            throw createHttpError(HttpStatus.CONFLICT, Messages.USER_EXIST);
        }

        const hashedPassword = await hashPassword(password);

        await this._baseRepo.create({ name, email, password: hashedPassword });
        return { message: Messages.SIGNUP_SUCCESS };
    };

    async login(
    email: string,
    password: string
): Promise<{ message: string; user: any; accessToken: string; refreshToken: string }> {
    console.log("🚀 [Service] login called");
    console.log("📧 Login attempt for email:", email);

    const user = await this._baseRepo.findOne({ email });

    if (!user) {
        console.log("❌ No user found with email:", email);
        throw createHttpError(HttpStatus.BAD_REQUEST, Messages.USER_NOT_FOUND);
    }

    console.log("🔐 User found:", { id: user.id, email: user.email });

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
        console.log("❌ Invalid password for user:", email);
        throw createHttpError(HttpStatus.BAD_REQUEST, Messages.INVALID_CREDENTIALS);
    }

    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());

    console.log("✅ Login successful. Access and refresh tokens generated.");

    return {
        message: Messages.LOGIN_SUCCESS,
        user,
        accessToken,
        refreshToken
    };
}


    async refreshAccessToken(token: string): Promise<string> {
        const decoded = verifyRefreshToken(token);
        if (!decoded){
            throw createHttpError(HttpStatus.UNAUTHORIZED, Messages.INVALID_TOKEN)
        }
        const accessToken = generateAccessToken(decoded.id);
        return accessToken;
    };
}