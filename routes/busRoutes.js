const express = require("express");
const router = express.Router();

const {
    getAllBuses,
    addBus,
    getBusById,
    updateBus,
    deleteBus
} = require("../controllers/busController");

router.get("/", getAllBuses);
router.post("/", addBus);
router.get("/:id", getBusById);
router.put("/:id", updateBus);     
router.delete("/:id", deleteBus);
module.exports = router;