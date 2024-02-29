import deleteFile from "../../firebase/deleteFile"


const deleteImages = async (images, userId) => {
    if (images.length > 0) {
        const promises = images.map((imageArray) => { // Iterate over the outer array
            if (Array.isArray(imageArray) && imageArray.length === 2) { // Check if it's an array and has two elements
                const [imgURL] = imageArray; // Extract the URL from the inner array
                if (typeof imgURL === 'string') { // Check if imgURL is a string
                    const imgName = imgURL.split(`${userId}%2F`)[1]?.split('?')[0];
                    console.log(imgURL, imgName);
                    return deleteFile(`gears/${userId}/${imgName}`); // stored inside promises arrays as request promises
                } else {
                    console.error('imgURL is not a string:', imgURL);
                    return Promise.reject(new Error('imgURL is not a string'));
                }
            } else {
                console.error('Invalid image array:', imageArray);
                return Promise.reject(new Error('Invalid image array'));
            }
        });
        try {
            await Promise.all(promises);
        } catch (error) {
            console.log(error);
        }
    }
};

export default deleteImages;