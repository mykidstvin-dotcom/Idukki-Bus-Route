const Bus = require("../models/bus");

// Get all buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new bus
const addBus = async (req, res) => {
    try {
        const bus = new Bus(req.body);
        await bus.save();
        res.status(201).json(bus);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Get one bus by ID
const getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);

        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        res.json(bus);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Delete Bus
const deleteBus = async (req, res) => {
    try {

        const bus = await Bus.findByIdAndDelete(req.params.id);

        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        res.json({
            message: "Bus deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Update Bus
const updateBus = async (req, res) => {
    try {

        const bus = await Bus.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
               returnDocument: "after",
                runValidators: true
            }
        );

        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        res.json(bus);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getAllBuses,
    addBus,
    getBusById,
    updateBus,
    deleteBus
};