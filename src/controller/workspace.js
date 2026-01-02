import Workspace from "../models/WorkspaceModel.js"

export const workspace=(req,res)=>{

    const {name,owner}=req.body;
    try {
        const newWorkSpace=new Workspace({
        name,
        description,
        owner
    })
    } catch (error) {
      res.status(500).json({
        message:"Errr in creating workspace"
      })  
    }
}