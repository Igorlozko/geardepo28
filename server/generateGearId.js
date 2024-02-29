import { v4 as uuidv4 } from 'uuid';

const generateGearId = () => {
    return uuidv4();
};

export default generateGearId;