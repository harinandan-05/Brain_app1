import express , { Router,Request,Response} from "express";
import mongoose from "mongoose";
import { Content, User, Tag, Link} from './db';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./auth";
import { nanoid } from 'nanoid';


const router :Router  = express.Router();

router.post('/signup',async function(req:Request, res:Response){
    const {username ,password} = req.body;

    if(!username || !password){
        res.status(400).json({msg:"fill all the fields"})
        return;
    }
    try{
        const Existinguser = await User.findOne({
            username:username
        })
        if(Existinguser){
          res.json({msg:"user alraedy exists"})
          return;
        }
      const salt  = await bcrypt.genSalt(10)
      const hashedPass : string = await  bcrypt.hash( password,salt)
      
      const newUser = await User.create({
        username:username,
        password:hashedPass
      })
      console.log("useradded to db")
      res.status(200).json({msg:"user signed up succefully"})
    }
    catch{
      console.log(Error)
    }
})

router.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
   res.status(400).json({ msg: "fill all credentials" });
   return;
  }

  try {
    const userFind = await User.findOne({ username });

    if (!userFind || !userFind.password) {
      res.status(400).json({ msg: "no user exists or missing password" });
      return
    }

    const isvalidpass = await bcrypt.compare(password, userFind.password);

    if (!isvalidpass) {
      res.status(400).json({ msg: "incorrect password" });
      return
    }

    const token = jwt.sign({ id: userFind._id }, JWT_SECRET);
    res.json({ token });
    return

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "server error" });
    return
  }
});


router.post('/content', userMiddleware , async(req:Request , res:Response) => {
  const { title , link } = req.body
  const newcontent = await Content.create({
    title:title,
    link:link,
    tags:[],
    //@ts-ignore
    userId :req.userId
  })

  res.status(200).json({msg:"content added"})
  return
});

 

router.get('/content', userMiddleware, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const content = await Content.findOne({ userId });

    if (content) {
      res.status(200).json({ msg: "Content returned", content });
      return 
    } else {
      res.status(404).json({ msg: "Content not found" });
      return 
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ msg: "Internal Server Error" });
    return 
  }
});


router.post('/delete',userMiddleware , async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const Finduser = await Content.findOne({
    userId:userId
  })
  if(!Finduser){
    res.status(400).json({msg:"un authorized"})
  }
  else{
    const deleteContent = await Content.deleteMany({
      userId
    })
    res.status(200).json({msg:"deleted"})
  }

});

router.post('/brain/generateLink',userMiddleware, async (req: Request , res : Response) => {
  const userId = (req as any).userId
  const findUser = await Content.findOne({
    userId:userId
  })
  if(!findUser){
    res.status(411).json({msg:"user not found"})
    return
  }
  const contents = await Content.findOne({
    userId:userId,
  })
  if(!contents){
    res.status(411).json({msg:"no contents"})
    return
  }
  const slug = nanoid(5)
  const link = new Link({
    userId,
    slug,
    contents
  })
  await link.save();
  res.json({ msg: "Link created", url: `https://yourapp.com/brain/view/${slug}` });
  
})


router.get('/brain/sharelink',userMiddleware,async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const Finduser = await Content.findOne({
    userId:userId
  })
  .select('title link tags') 
  .populate('tags', 'name');

  if(!Finduser){
    res.status(400).json({msg:"no used found"})
    return
  }
  else{
    res.json({msg:"heers the deatils",url:"https://yourapp.com/share/${Content._id}",Finduser})
    return;
  }
});

export default router;
