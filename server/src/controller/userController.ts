import { Request, Response,NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET: string = "asjfblansfjklasj";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// next: NextFunction (for middleware)
const createUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

  const singinUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })

export const createUser = async (req: Request, res: Response ) : Promise<void> => {

  const validation = createUserSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { username, email, password } = validation.data;

  const existinguser = await prisma.user.findUnique({
    where: { email,
              username
     },
  });

  if(existinguser){
    res.json({error: "User already exists"});
  }

  try {

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);


    const newUser = await prisma.user.create({
      data: { username, email, password_hash },
    });

    const token = jwt.sign({
      user_id:existinguser?.user_id
    }
      ,JWT_SECRET);

    res.status(201).json({newUser,token});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  
};

export const signinUser=async(req:Request,res:Response):Promise<void>=>{
  const validation = singinUserSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }
  const {email,password} = validation.data;


  const existinguser = await prisma.user.findUnique({
    where: { email,
     },
  });

  if(!existinguser){
    res.json({error:"User Does not exist"});
    return;
  }

  const passwordMatch = await bcrypt.compare(password, existinguser.password_hash);

  if(!passwordMatch){
    res.json({error:"Password does not match"});
  }
  
  const token = jwt.sign({
    user_id:existinguser?.user_id
  },JWT_SECRET);
  res.json({message : "User signed in",token});
  


}

export const getUsers = async (req: Request, res: Response,next: NextFunction):Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  next();    
};
