db.likedingredient.findOrCreate({
    where: {
        foodId: req.body.foodId
    },
    default: {
        name: req.body.name,
        quantity: req.body.quantity,
        healthLabel: req.body.healthLabel,
        measureUri: req.body.measureUri
    }
}).then(([ingredient, created]) => {
    db.user
})