import BadRequestError from "../errors/BadRequestError.js";

async function pagination(req, res, next){
  try{
    let { limit = 2, page = 1, ordination = "_id:-1" } = req.query;

    let [orderBy, order] = ordination.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if(limit > 0 && page > 0){
      const resultWithPagination = await result.find()
        .sort({[orderBy]: order})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(resultWithPagination);
    }else{
      next(new BadRequestError());
    }
  }catch (erro) {
    next(erro);
  }
}

export default pagination;