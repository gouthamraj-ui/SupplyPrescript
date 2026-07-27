def get_recommendation(
    prediction,
    supplier_avg_delay,
    stock_quantity,
    lead_time,
    rating
):
    if prediction == 0:
        return {
            "recommended_action": "No Action Needed",
            "estimated_saving": 0
        }

    if supplier_avg_delay > 5:
        return {
            "recommended_action": "Change Supplier",
            "estimated_saving": 5000
        }

    if stock_quantity < 100:
        return {
            "recommended_action": "Increase Inventory",
            "estimated_saving": 3000
        }

    if lead_time > 10:
        return {
            "recommended_action": "Use Express Shipping",
            "estimated_saving": 2000
        }

    if rating < 3.5:
        return {
            "recommended_action": "Review Supplier Performance",
            "estimated_saving": 1500
        }

    return {
        "recommended_action": "Monitor Shipment",
        "estimated_saving": 1000
    }