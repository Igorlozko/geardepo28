import Gear from "../../../models/Gear.js"; // issues importing without the js


const checkOwner = async (req)=>{
    try {
        const gear = await Gear.findOne({_id:req.params.gearId, uid:req.user.id});
        if(gear) return true 
        return false
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

export default checkOwner;