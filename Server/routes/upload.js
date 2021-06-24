const router = require("express").Router();
const multer = require("multer");   // Package used to store uploaded images

// Configuring user uploaded files 
const storageConfig = multer.diskStorage({
    destination: (req, file, callBackFunction) => {     //This will check where to save the images locally

        callBackFunction(null, "uploads");
    },
    filename: (req, file, callBackFunction) => {

        //callBackFunction(null, req.body.name)
        callBackFunction(null, "image1.jpg"); // Here is the name of the file to be kept
    }
});

const fileToUpload = multer({storage: storageConfig});

// Sending uploaded photo to the local folder with URL http://localhost:5000/api/file
router.post("/", fileToUpload.single("file"), (req, res) => {
    res.status(200).json("Your File has been uploaded successfully!");
});

module.exports = router;