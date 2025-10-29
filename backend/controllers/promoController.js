
const promoCodes = {
    SAVE10: { type: "percent", value: 10 }, 
    FLAT100: { type: "flat", value: 100 }, 
};

export const validatePromo = async (req, res) => {
    try {
        const { code, totalPrice } = req.body;

        if (!code || !totalPrice) {
            return res.status(400).json({ message: "Promo code and total price required" });
        }

        const promo = promoCodes[code.toUpperCase()];
        if (!promo) {
            return res.status(404).json({ message: "Invalid promo code" });
        }

        let discount = 0;
        if (promo.type === "percent") {
            discount = (promo.value / 100) * totalPrice;
        } else if (promo.type === "flat") {
            discount = promo.value;
        }

        const finalPrice = Math.max(totalPrice - discount, 0);

        return res.status(200).json({
            message: "Promo applied successfully!",
            originalPrice: totalPrice,
            discount,
            finalPrice,
        });
    } catch (error) {
        console.error("Promo validation error:", error);
        res.status(500).json({ message: "Server error validating promo" });
    }
};
