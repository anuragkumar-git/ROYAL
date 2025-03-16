const { default: axios } = require('axios')
const bussinessRegistraionModel = require('../models/businessModel')
const roleModel = require('../models/roleModel')
require


const GOOGLE_MAP_API_KEY = process.env.googleMapsApiKey
const addbussinesses = async (req, res) => {
    // console.log(req.body);
    const { restaurantName, restaurantContactNumber, ownerName, ownerEmail, ownerPhone, shopno, city, streetAdress, pincode, landmark, menuType, operationalHours } = req.body


    const mapAddress = `${streetAdress} ${city} ${pincode} ${landmark}`


    // https://maps.googleapis.com/maps/api/geocode/json?address=Chandrashekhar%20Aazad%20Nagar,%20Sector%206%20Gandhinagar%20382006&key=AIzaSyDho0lp8UmNjyZLGulu-CcBJ6gKuKVMK_w
    // const mapaddress = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${mapAddress}&key=AIzaSyDho0lp8UmNjyZLGulu-CcBJ6gKuKVMK_w`)
    //* const mapaddress = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${mapAddress}&key=${GOOGLE_MAP_API_KEY}`)
    // console.log('Orignal:',mapAddress);

    // console.log('mapaddress',mapaddress);
    // console.log("mapaddress.data",mapaddress.data.results);
    // console.log("mapaddress.data.address_components",mapaddress.data?.address_components);
    // console.log('mapaddress.data.geometry',mapaddress.data?.geometry);
    // console.log('mapaddress.data.navigation_points',mapaddress.data?.navigation_points);
    // console.log('mapaddress.data.types',mapaddress.data?.types);
    const vendor = await roleModel.findOne({ role: "vendor" })
    if (!vendor) { return res.status(500).json({ msg: "User role not found" }) }


    const data = {
        businessInformation: {
            name: restaurantName,
            contact: restaurantContactNumber
        },
        ownerDetails: {
            name: ownerName,
            email: ownerEmail,
            contact: ownerPhone
        },
        businessAddress: {
            address: `${shopno} ${streetAdress} ${city} ${pincode} ${landmark}`,
            // location: {
            //     lat: map.address.lat,
            //     lng: map.address.lng
            // }
        }, oprationalDetails: {
            menuType,
            operationalHours
        },
        role: {
            id: vendor._id,
            desc: vendor.role
        }
    }


    //! const addbussinesse = bussinessRegistraionModel.create(req.body)
    const addbussinesse = await bussinessRegistraionModel.create(data)
    console.log(addbussinesse);
    res.status(201).json({
        msg: "Business Registered",
        business: addbussinesse
    })
}

module.exports = { addbussinesses }