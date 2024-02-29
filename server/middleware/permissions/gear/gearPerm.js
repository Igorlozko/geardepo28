import checkOwner from "./checkOwner.js";


const gearPerm = {
    update:{
        roles:['admin', 'editor'],
        owner: checkOwner,
    },
    delete:{
        roles:['admin', 'editor'],
        owner: checkOwner,
    },
    create:{
        roles:['admin', 'editor'],
        owner: checkOwner,
    },
}

export default gearPerm;