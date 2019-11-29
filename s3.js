const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets/secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = function(req, res, next) {
    // console.log("In s3.upload: ", req.file);
    if (!req.file) {
        console.log("no req.file");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedboard",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(() => {
            console.log("Yay, it worked!!");
            next();
            fs.unlink(path, () => {});
        })
        .catch(err => {
            console.log(err);
            //uh oh, it did not work
            res.sendStatus(500);
        });
};
