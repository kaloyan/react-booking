// Hotels Controller

const { hotelSrv } = require("../services/hotelSrv.js");

const getOne = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const hotel = await hotelSrv.getOne(hotelId);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  const hotels = await hotelSrv.getAll();
  res.json(hotels);
};

const create = async (req, res) => {
  try {
    const hotel = await hotelSrv.create(req.body);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const hotelId = req.params.id;
  const data = req.body;

  try {
    const hotel = await hotelSrv.update(hotelId, data);
    res.json(hotel);
  } catch (err) {
    next(err);
  }
};

const del = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const result = await hotelSrv.del(hotelId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.hotelsCtl = { getOne, getAll, create, update, del };
