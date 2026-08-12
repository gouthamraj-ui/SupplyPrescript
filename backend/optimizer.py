import pulp


def optimize_shipment(
    shipment_value: float,
    lead_time: float,
    stock_quantity: int,
    supplier_avg_delay: float,
    max_budget: float = 20000
):
    """
    Generate and evaluate three supply-chain alternatives
    using PuLP optimization.

    Returns:
        {
            "best_action": ...,
            "alternatives": [...]
        }
    """

    # -----------------------------
    # Estimate costs
    # -----------------------------

    air_freight_cost = max(15000, shipment_value * 0.15)

    secondary_supplier_cost = shipment_value * 0.10

    launch_delay_cost = max(5000, shipment_value * 0.05)

    # -----------------------------
    # Estimate delays
    # -----------------------------

    air_freight_delay = max(1, round(lead_time * 0.15))

    secondary_supplier_delay = max(
        2,
        round(supplier_avg_delay * 0.35)
    )

    launch_delay = max(
        5,
        round(lead_time * 0.70)
    )

    alternatives = [
        {
            "action": "Air Freight",
            "cost": round(air_freight_cost, 2),
            "delay_days": air_freight_delay,
            "risk": "Low"
        },
        {
            "action": "Secondary Supplier",
            "cost": round(secondary_supplier_cost, 2),
            "delay_days": secondary_supplier_delay,
            "risk": "Medium"
        },
        {
            "action": "Delay Product Launch",
            "cost": round(launch_delay_cost, 2),
            "delay_days": launch_delay,
            "risk": "High"
        }
    ]

    # -----------------------------
    # Check budget feasibility
    # -----------------------------

    feasible_alternatives = [
        option
        for option in alternatives
        if option["cost"] <= max_budget
    ]

    # If nothing is within budget,
    # allow the least expensive option
    if not feasible_alternatives:
        feasible_alternatives = [
            min(alternatives, key=lambda x: x["cost"])
        ]

    # -----------------------------
    # PuLP Optimization
    # -----------------------------

    problem = pulp.LpProblem(
        "SupplyPrescript_Optimization",
        pulp.LpMinimize
    )

    decision_variables = {}

    for i, option in enumerate(feasible_alternatives):
        decision_variables[i] = pulp.LpVariable(
            f"option_{i}",
            cat="Binary"
        )

    # Exactly ONE action must be selected
    problem += (
        pulp.lpSum(decision_variables[i]
                   for i in decision_variables) == 1
    )

    # Objective:
    # Minimize cost + delay penalty
    problem += pulp.lpSum(
        decision_variables[i] *
        (
            option["cost"] +
            option["delay_days"] * 1000
        )
        for i, option in enumerate(feasible_alternatives)
    )

    problem.solve(pulp.PULP_CBC_CMD(msg=False))

    selected_index = None

    for i, variable in decision_variables.items():
        if variable.value() == 1:
            selected_index = i
            break

    if selected_index is None:
        selected_index = 0

    best_option = feasible_alternatives[selected_index]

    return {
        "best_action": best_option["action"],
        "best_cost": best_option["cost"],
        "best_delay_days": best_option["delay_days"],
        "best_risk": best_option["risk"],
        "alternatives": alternatives
    }