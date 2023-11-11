import jwt from 'jsonwebtoken';

export const verifyToken = async (req: any, res: any, next: any) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json("Not authorized");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        req.user = verified;
        next();

    } catch (err : any) {
        res.status(500).json(err);
    }
}