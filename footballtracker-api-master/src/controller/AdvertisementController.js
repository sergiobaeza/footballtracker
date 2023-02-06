const Advertisement = require("../model").Advertisement


module.exports.createAdvertisement = async (req, res) => {

    try {
        if (req.body == undefined || req.body.name == undefined) {
            res.status(400)
            res.send({ message: "Missing body params" })
            return
        }

        let img_src;
        if (req.file == null) {
            img_src = undefined
        }
        else {
            img_src = req.file.path;
        }

        await Advertisement.create({
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            img_src: img_src
        })

        res.status(201).send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }
}

module.exports.getAdvertisements = async (req, res) => {
    try {

        const advertisements = await Advertisement.findAll();
        res.status(200).send(advertisements);

    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: "Internal server error."
        })
    }

}
