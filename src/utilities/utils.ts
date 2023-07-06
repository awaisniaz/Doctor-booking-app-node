import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const utilities = {
    generatePassword: async (password: string): Promise<string> => {
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    validatePassword: async (hash: string, key: string): Promise<boolean> => {
        const response = bcrypt.compareSync(key, hash); // true
        return response
    },
    generateToken: async (data: string): Promise<string> => {
        const token = await jwt.sign({
            data: data
        }, 'booking', { expiresIn: '1h' });
        return token

    },
    validateToken: (token: string): jwt.JwtPayload => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'booking', (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

}