const Card = require("../models/cardsAccessDataService");
const lodash = require("lodash");
const { handleBadRequest } = require("../../utils/errorHandler");

const generateBizNumber = async () => {
    try{
    const random = lodash.random(1_000_000, 9_999_999);
    const card = Card.findOne(
        {bizNumber: random},
        {bizNumber:1,_id:0} )
        if(card) return generateBizNumber();
        return random;
    }
    catch(error){
return handleBadRequest("generateBizNumber",error)
    }


    module.exports = generateBizNumber
    
    



}
