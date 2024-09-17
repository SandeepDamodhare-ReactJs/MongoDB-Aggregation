
const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');


router.get('/revenue', async (req, res) => {
    try {
        const data = await Sales.aggregate([
            {
                $unwind: "$items"
            },
            {
                $group: {
                    _id: {
                        store: "$store",
                        month: {
                            $dateToString: {
                                format: "%Y-%m",
                          date: {
                                    $dateFromString: { dateString: "$date" }
                                }
                            }
                        }
                    },
                    totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
                    averagePrice: { $avg: "$items.price" }
                }
            },
            {
                $project: {
                    store: "$_id.store",
               month: "$_id.month",
                    totalRevenue: 1,
                    averagePrice: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    store: 1,
                    month: 1
                }
            }
        ]);

        if (data.length === 0) {
            return res.status(404).json({ message: "No data available" });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
