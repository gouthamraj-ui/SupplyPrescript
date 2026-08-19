🚚 SupplyPrescript

Closed-Loop Prescriptive Analytics for Supply Chain Management

SupplyPrescript is an AI-powered supply chain decision system that combines Machine Learning, rule-based recommendations, prescriptive optimization, SQL analytics, FastAPI, MySQL, and an interactive React dashboard.

The system follows a complete closed-loop workflow:

Prediction → Recommendation → Optimization → Decision → Outcome → Savings → ROI → Analytics

📌 Project Overview

Supply chain disruptions can cause shipment delays, increased costs, inventory shortages, and operational losses.

SupplyPrescript is designed to help identify shipment delay risk and support operational decision-making by connecting machine learning predictions with recommendations, optimization, decision execution, and actual outcome analysis.

The system can:

Predict whether a shipment is delayed

Calculate delay probability

Calculate prediction confidence

Generate operational recommendations

Evaluate alternative supply-chain actions

Apply a budget constraint

Record operational decisions

Execute a selected action

Record actual outcomes

Calculate actual savings

Calculate ROI

Compare expected and actual performance

Display closed-loop analytics through a React dashboard

🎯 Business Problem

Supply chain teams often need to make decisions when shipments are at risk of delay.

A prediction alone does not answer the complete business question.

SupplyPrescript helps answer:

Is the shipment likely to be delayed?

What is the delay probability?

How confident is the prediction?

What action is recommended?

Which operational action is suitable?

What is the expected cost and delay?

What happened after the action was executed?

How much was actually saved?

What was the resulting ROI?

How did expected performance compare with actual performance?

🧠 System Workflow

Shipment Data
      ↓
Machine Learning Prediction
      ↓
Delay Probability
      ↓
Prediction Confidence
      ↓
Recommendation Engine
      ↓
Prescriptive Optimization
      ↓
Decision Selection
      ↓
Decision Execution
      ↓
Actual Outcome
      ↓
Savings Calculation
      ↓
ROI Evaluation
      ↓
Closed-Loop Analytics

📚 Table of Contents

Project Overview

Business Problem

System Workflow

System Architecture

Technology Stack

Key Features

Machine Learning Pipeline

Recommendation Engine

Prescriptive Optimization

Decision & Outcome Tracking

Database Design

Dashboard

Project Structure

Installation & Setup

API Endpoints

Prediction API Workflow

SQL Analytics & Database Operations

Machine Learning Model

Prescriptive Optimization & Decision Engine

Decision Outcome, Savings & ROI Analysis

Dashboard Analytics & KPIs

Testing & Validation

Results & Business Impact

Future Enhancements

Conclusion

Author

Project

Project Status

Skills Demonstrated

Project Highlights

Quick Demo

Project Links

Final Project Summary

License

Acknowledgements

🏗️ System Architecture

SupplyPrescript follows a layered architecture where data flows from the database through machine learning and decision intelligence components and finally into the interactive dashboard.

                    ┌──────────────────────┐

                    │     Supply Chain     │

                    │        Data          │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │      MySQL Database   │

                    │ Suppliers / Products  │

                    │ Shipments / Orders    │

                    │ Inventory / Disruptions

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │  Feature Engineering │

                    │   & Data Processing  │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │   Machine Learning   │

                    │  Random Forest Model │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ Prediction & Risk    │

                    │ Probability /        │

                    │ Confidence           │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ Recommendation      │

                    │      Engine          │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ Prescriptive         │

                    │ Optimization (PuLP)  │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ Decision Execution   │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ Outcome Tracking     │

                    │ Savings / ROI        │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ FastAPI Backend      │

                    └──────────┬───────────┘

                               ↓

                    ┌──────────────────────┐

                    │ React Dashboard      │

                    │ Analytics / History  │

                    │ ROI / Outcomes       │

                    └──────────────────────┘


---

# 🛠️ Technology Stack

\| Layer              | Technology                  |

\| ------------------ | --------------------------- |

\| Programming        | Python, JavaScript, SQL     |

\| Machine Learning   | Scikit-learn, Random Forest |

\| Optimization       | PuLP                        |

\| Backend            | FastAPI                     |

\| Database           | MySQL                       |

\| Frontend           | React.js                    |

\| API Communication  | REST API, Axios             |

\| Data Processing    | Pandas, NumPy               |

\| Data Visualization | React Charts                |

\| Development        | VS Code                     |

\| Version Control    | Git & GitHub                |

---

# ⭐ Key Features

\### 🤖 Machine Learning Prediction

* Shipment delay prediction

* Delay probability calculation

* Prediction confidence

* Feature-based risk assessment

\### 💡 Recommendation Engine

The system converts prediction results into practical operational recommendations based on factors such as:

* Supplier performance

* Stock availability

* Lead time

* Shipment characteristics

* Supplier rating

* Delay probability

\### 📊 Prescriptive Optimization

The optimization layer evaluates possible supply-chain actions while considering operational constraints such as:

* Budget

* Warehouse capacity

* Supplier capacity

* Expected delay

* Operational cost

\### 🔄 Closed-Loop Decision Tracking

Every decision can be connected with its actual outcome.

This allows the system to compare:

```text

Expected Result

       ↓

Decision Execution

       ↓

Actual Result

       ↓

Performance Evaluation


💰 ROI & Savings Analytics

The system calculates:

Expected cost

Actual cost

Expected savings

Actual savings

ROI

Decision effectiveness

📈 Interactive Dashboard

The React dashboard provides:

Prediction interface

Decision history

Outcome tracking

Analytics cards

ROI analysis

Savings analysis

Prediction statistics

Operational insights

🧠 Machine Learning Pipeline

The machine learning pipeline follows these stages:


Raw Supply Chain Data

        ↓

Data Cleaning

        ↓

Feature Engineering

        ↓

Exploratory Data Analysis

        ↓

Train / Test Split

        ↓

Model Training

        ↓

Model Evaluation

        ↓

Model Serialization

        ↓

FastAPI Prediction API


The primary prediction model is a Random Forest Classifier trained to identify shipment delay risk.

Important features include:

Shipment quantity

Unit price

Lead time

Stock quantity

Supplier rating

Shipment value

Supplier average delay

💡 Recommendation Engine

The recommendation engine transforms prediction results into operational actions.

Example decision logic:

High Delay Risk

      ↓

Check Supplier Performance

      ↓

Check Inventory

      ↓

Check Lead Time

      ↓

Generate Recommendation


Possible recommendations include:

* Change Supplier

* Increase Inventory

* Use Express Shipping

* Review Supplier Performance

* Monitor Shipment

The recommendation layer acts as the bridge between machine learning prediction and prescriptive decision-making.

---

# ⚙️ Prescriptive Optimization

SupplyPrescript uses PuLP to evaluate operational decisions under constraints.

The optimization problem considers:

```text

Objective

   ↓

Minimize operational impact / cost

   ↓

Subject to:

   • Budget Constraint

   • Warehouse Capacity

   • Supplier Capacity


The optimizer evaluates available actions and identifies a suitable operational decision based on the defined constraints.

🔄 Decision & Outcome Tracking

After an optimized decision is selected, the system records the decision in the database.

The workflow is:


Prediction

    ↓

Recommendation

    ↓

Optimization

    ↓

Selected Decision

    ↓

Decision Execution

    ↓

Actual Outcome

    ↓

Savings

    ↓

ROI


This allows SupplyPrescript to move beyond prediction and measure whether the recommended action actually produced a beneficial result.

🗄️ Database Design

The MySQL database stores the complete supply-chain decision lifecycle.

Main tables include:

`suppliers`

`products`

`shipments`

`inventory`

`orders`

`disruptions`

`decisions`

`outcomes`

`post_outcomes`

`predict_decisions`

The database stores both operational data and decision intelligence results, allowing historical analysis of predictions, decisions, outcomes, savings, and ROI.

📊 Dashboard

The React dashboard provides a centralized interface for interacting with the SupplyPrescript system.

The dashboard includes:

┌─────────────────────────────────────────┐

│           SupplyPrescript               │

│     Supply Chain Decision System        │

├─────────────────────────────────────────┤

│ Prediction │ Decisions │ Outcomes │ ROI │

├─────────────────────────────────────────┤

│                                         │

│       Shipment Prediction               │

│                                         │

├─────────────────────────────────────────┤

│ Decision History                        │

├─────────────────────────────────────────┤

│ Outcome & Savings Analytics             │

├─────────────────────────────────────────┤

│ ROI / Performance Analytics             │

└─────────────────────────────────────────┘


The frontend communicates with the FastAPI backend through REST APIs, while the backend interacts with the MySQL database and machine learning/optimization components.

# 📁 Project Structure

SupplyPrescript/

│

├── backend/

│   ├── __init__.py

│   ├── main.py

│   ├── db_connection.py

│   ├── optimizer.py

│   ├── predictor.py

│   └── recommendation.py

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   │   ├── PredictionForm.jsx

│   │   │   ├── DecisionHistory.jsx

│   │   │   ├── OutcomeForm.jsx

│   │   │   ├── AnalyticsCard.jsx

│   │   │   ├── AnalyticsChart.jsx

│   │   │   ├── DecisionROI.jsx

│   │   │   └── OutcomeHistory.jsx

│   │   │

│   │   ├── App.jsx

│   │   ├── App.css

│   │   └── main.jsx

│   │

│   ├── package.json

│   └── vite.config.js

│

├── data/

│   ├── suppliers.csv

│   ├── products.csv

│   ├── inventory.csv

│   ├── shipments.csv

│   ├── orders.csv

│   ├── disruptions.csv

│   ├── decisions.csv

│   └── outcomes.csv

│

├── database/

│   └── SupplyPrescript.session.sql

│

├── models/

│   ├── random_forest_model.pkl

│   ├── optimized_random_forest.pkl

│   ├── xgboost_model.pkl

│   └── delay_prediction_model.pkl

│

├── notebooks/

│   ├── create_clean_supply_chain.ipynb

│   ├── data_cleaning.ipynb

│   ├── eda.ipynb

│   └── Feature_engineering.ipynb

│

├── optimization/

│

├── README.md

└── requirements.txt


📂 Folder Description

| Folder / File      | Purpose                                    |

| ------------------ | ------------------------------------------ |

| `backend/`         | FastAPI backend and decision logic         |

| `frontend/`        | React interactive dashboard                |

| `data/`            | Supply-chain datasets                      |

| `database/`        | SQL queries and database scripts           |

| `models/`          | Trained machine learning models            |

| `notebooks/`       | Data cleaning, EDA and feature engineering |

| `optimization/`    | Prescriptive optimization logic            |

| `README.md`        | Project documentation                      |

| `requirements.txt` | Python dependencies                        |

Backend Components

`main.py` — FastAPI application and API endpoints

`db_connection.py` — MySQL database connection

`predictor.py` — Machine learning prediction logic

`recommendation.py` — Operational recommendation logic

`optimizer.py` — PuLP optimization logic

Frontend Components

`PredictionForm.jsx` — Shipment prediction interface

`DecisionHistory.jsx` — Displays historical decisions

`OutcomeForm.jsx` — Records actual outcomes

`AnalyticsCard.jsx` — Displays key performance metrics

`AnalyticsChart.jsx` — Displays analytics visually

`DecisionROI.jsx` — Displays decision ROI

`OutcomeHistory.jsx` — Displays historical outcomes

`App.jsx` — Main React application

`App.css` — Dashboard styling

🚀 Installation & Setup

Follow the steps below to run SupplyPrescript locally.

1. Clone the Repository


git clone https://github.com/gouthamraj-ui/SupplyPrescript.git

cd SupplyPrescript


2. Create a Python Virtual Environment


python -m venv venv


Windows


venv\Scripts\activate


macOS / Linux


source venv/bin/activate


3. Install Python Dependencies


pip install -r requirements.txt


4. Configure MySQL Database

Make sure MySQL Server is installed and running.

Create the database:


CREATE DATABASE supply_prescript;


Then execute the SQL script located at:


database/SupplyPrescript.session.sql


This creates the required tables and SQL queries used by the application.

5. Configure Database Connection

Update the database configuration in:


backend/db_connection.py


Example:


DB_HOST = "localhost"

DB_USER = "root"

DB_PASSWORD = "your_password"

DB_NAME = "supply_prescript"


Use your local MySQL credentials.

Do not upload real database passwords or credentials to GitHub.

6. Verify the Machine Learning Models

Make sure the trained model files are available inside:


models/


The backend loads the trained machine learning model when the FastAPI application starts.

7. Start the FastAPI Backend

From the project root directory, run:


uvicorn backend.main\:app --reload


The backend will start at:


http://127.0.0.1:8000


You can verify the API using:


http://127.0.0.1:8000/


Health check:


http://127.0.0.1:8000/health


FastAPI documentation:


http://127.0.0.1:8000/docs


8. Install Frontend Dependencies

Open a new terminal and navigate to the frontend:


cd frontend


Install dependencies:


npm install


9. Start the React Dashboard

Run:


npm run dev


Vite will provide a local development URL, usually:


http://localhost:5173


Open the URL in your browser to access the SupplyPrescript dashboard.

10. Run the Complete System

The complete application requires the following services:


MySQL

  ↓

FastAPI Backend

  ↓

React Frontend


Terminal 1 — Backend


venv\Scripts\activate

uvicorn backend.main\:app --reload


Terminal 2 — Frontend


cd frontend

npm run dev


Required Services

| Service                | Purpose                                               |

| ---------------------- | ----------------------------------------------------- |

| MySQL                  | Stores supply-chain data and decisions                |

| FastAPI                | Provides prediction, recommendation and decision APIs |

| React                  | Provides the interactive dashboard                    |

| Machine Learning Model | Predicts shipment delay risk                          |

| PuLP                   | Performs prescriptive optimization                    |

🔌 API Endpoints

SupplyPrescript exposes REST APIs through FastAPI.

| Method | Endpoint           | Purpose                    |

| ------ | ------------------ | -------------------------- |

| `GET`  | `/`                | API welcome/status         |

| `GET`  | `/health`          | Backend health check       |

| `POST` | `/predict`         | Predict shipment delay     |

| `GET`  | `/recommendations` | Retrieve recommendations   |

| `GET`  | `/model-info`      | Retrieve model information |

The API layer connects the React dashboard with the machine learning, recommendation, optimization, and database components.

🔄 Prediction API Workflow

The prediction request follows this process:


React Prediction Form

        ↓

POST /predict

        ↓

FastAPI

        ↓

Feature Preparation

        ↓

Machine Learning Model

        ↓

Delay Prediction

        ↓

Probability

        ↓

Confidence

        ↓

Recommendation

        ↓

Response to React


This allows users to submit shipment information from the dashboard and receive a decision-oriented prediction instead of only a raw machine learning result.

🗄️ SQL Analytics & Database Operations

SupplyPrescript uses MySQL to store operational supply-chain data, machine learning predictions, decisions, and actual outcomes.

SQL is used not only for data storage but also for business analytics and decision monitoring.

📊 Database Tables

The main database tables are:


suppliers

products

shipments

inventory

orders

disruptions

decisions

outcomes

post_outcomes

predict_decisions


These tables support the complete decision lifecycle from shipment information to final outcome evaluation.

🔎 SQL Analytics

The project includes SQL queries for analyzing supply-chain performance.

Examples include:

Supplier Analysis

Total number of suppliers

Supplier performance

Average supplier delay

Supplier ratings

Supplier-wise shipment performance

Shipment Analysis

Total shipments

Delayed shipments

On-time shipments

Delay percentage

Average delivery delay

Shipment value analysis

Inventory Analysis

Available inventory

Low-stock products

Inventory utilization

Stock availability

Decision Analysis

Total decisions

Decisions by recommendation

Decision success rate

Decision cost

Decision savings

Outcome Analysis

Actual outcome performance

Expected vs actual cost

Expected vs actual delay

Actual savings

ROI performance

📈 Example SQL Analytics

Total Suppliers


SELECT COUNT(*) AS total_suppliers

FROM suppliers;


Total Shipments


SELECT COUNT(*) AS total_shipments

FROM shipments;


Delayed Shipments


SELECT COUNT(*) AS delayed_shipments

FROM shipments

WHERE delivery_delay > 0;


Average Delivery Delay


SELECT AVG(delivery_delay) AS average_delivery_delay

FROM shipments;


Supplier Performance


SELECT

    supplier_id,

    COUNT(*) AS total_shipments,

    AVG(delivery_delay) AS average_delay

FROM shipments

GROUP BY supplier_id

ORDER BY average_delay ASC;


Decision Performance


SELECT

    decision_type,

    COUNT(*) AS total_decisions,

    AVG(actual_savings) AS average_savings

FROM decisions

GROUP BY decision_type;


🔄 Database Decision Lifecycle

SupplyPrescript maintains a connection between predictions, decisions, and outcomes.


Shipment

   ↓

Prediction

   ↓

Recommendation

   ↓

Decision

   ↓

Outcome

   ↓

Savings

   ↓

ROI


This enables historical analysis of whether recommended decisions actually improved operational performance.

🎯 Business Questions Answered Through SQL

The SQL analytics layer helps answer questions such as:

Which suppliers have the highest average delay?

Which products have inventory shortages?

How many shipments are delayed?

What percentage of shipments are delayed?

Which decisions are used most frequently?

Which decisions generate the highest savings?

What is the average ROI?

Are actual results better or worse than expected?

Which suppliers require performance review?

How effective are operational recommendations?

🔗 SQL + Machine Learning + Dashboard

The database acts as the central data layer connecting the different components.

                 ┌───────────────┐

                 │    MySQL      │

                 └───────┬───────┘

                         │

          ┌──────────────┼──────────────┐

          ↓              ↓              ↓

     ML Prediction   Optimization    Analytics

          │              │              │

          └──────────────┼──────────────┘

                         ↓

                  FastAPI Backend

                         ↓

                  React Dashboard

This architecture allows SupplyPrescript to combine SQL analytics, machine learning, optimization, and interactive visualization into one integrated supply-chain decision system.

🤖 Machine Learning Model

SupplyPrescript uses machine learning to identify shipments that are at risk of delay.

The prediction model is integrated directly into the FastAPI backend so that predictions can be generated through the interactive React dashboard.

🎯 Prediction Objective

The primary objective is to predict whether a shipment is likely to experience a delivery delay.

The model produces:

Delay prediction

Delay probability

Prediction confidence

Risk classification

The prediction result is then passed to the recommendation and optimization layers.

🌲 Model Used

The primary machine learning model used in the application is:

Random Forest Classifier

Random Forest was selected because it can handle multiple numerical features, capture nonlinear relationships, and provide probability estimates for classification.

Additional trained models are maintained in the project for experimentation and comparison.


models/

├── random_forest_model.pkl

├── optimized_random_forest.pkl

├── xgboost_model.pkl

└── delay_prediction_model.pkl


The application uses the configured production model from the `models/` directory.

📥 Model Features

The prediction pipeline uses supply-chain features such as:

| Feature              | Description                       |

| -------------------- | --------------------------------- |

| `shipment_quantity`  | Quantity included in the shipment |

| `unit_price`         | Price per unit                    |

| `lead_time`          | Expected delivery lead time       |

| `stock_quantity`     | Available inventory               |

| `rating`             | Supplier rating                   |

| `shipment_value`     | Total shipment value              |

| `supplier_avg_delay` | Historical supplier delay         |

These features combine shipment, supplier, inventory, and operational information.

⚙️ Feature Engineering

Before model prediction, the raw supply-chain data is transformed into useful analytical features.

Examples include:

Shipment value

Supplier average delay

Delay category

Delay indicator

High-severity indicator

Large-shipment indicator

Inventory status

Example feature engineering flow:


Raw Data

   ↓

Data Cleaning

   ↓

Feature Creation

   ↓

Feature Selection

   ↓

Model Input


🔮 Prediction Process

When a user submits shipment information through the dashboard:


User Input

    ↓

React Prediction Form

    ↓

POST /predict

    ↓

FastAPI

    ↓

Feature Preparation

    ↓

Random Forest Model

    ↓

Prediction Probability

    ↓

Prediction Confidence

    ↓

Recommendation

    ↓

Dashboard Result


📊 Prediction Output

A prediction response can contain information such as:


Prediction

Delay Probability

Prediction Confidence

Recommendation

Risk Information


For example:


Prediction: Delayed

Delay Probability: High

Confidence: High

Recommendation: Use Express Shipping


The exact recommendation depends on the shipment and supplier conditions supplied to the system.

🧪 Model Development Workflow

The model development process is organized through Jupyter notebooks.


Data Collection

      ↓

Data Cleaning

      ↓

Exploratory Data Analysis

      ↓

Feature Engineering

      ↓

Model Training

      ↓

Model Evaluation

      ↓

Model Optimization

      ↓

Model Serialization

      ↓

FastAPI Integration


Relevant notebooks include:

`create_clean_supply_chain.ipynb`

`data_cleaning.ipynb`

`eda.ipynb`

`Feature_engineering.ipynb`

🔗 Machine Learning to Prescriptive Analytics

The key difference between a traditional prediction system and SupplyPrescript is what happens after the prediction.


Machine Learning

      ↓

"Will the shipment be delayed?"

      ↓

Recommendation Engine

      ↓

"What should we do?"

      ↓

Optimization

      ↓

"Which action is suitable under constraints?"

      ↓

Decision

      ↓

Outcome

      ↓

ROI


This creates a complete prediction-to-action-to-outcome workflow rather than stopping at prediction.

⚙️ Prescriptive Optimization & Decision Engine

SupplyPrescript goes beyond predicting shipment delays by identifying operational actions that can be considered to reduce supply-chain risk.

The prescriptive layer combines:

Machine learning predictions

Rule-based recommendations

Operational constraints

Cost considerations

Supplier performance

Inventory conditions

Lead-time information

The goal is to support better operational decisions rather than simply reporting a prediction.

🔄 Decision Intelligence Workflow


Shipment Information

        ↓

ML Prediction

        ↓

Delay Probability

        ↓

Risk Assessment

        ↓

Recommendation Engine

        ↓

Candidate Actions

        ↓

PuLP Optimization

        ↓

Constraint Evaluation

        ↓

Selected Decision


💡 Recommendation Engine

The recommendation engine evaluates shipment conditions and generates an operational recommendation.

The recommendation logic considers factors such as:

Prediction result

Supplier average delay

Stock quantity

Lead time

Supplier rating

Shipment risk

Possible recommendations include:


Change Supplier

Increase Inventory

Use Express Shipping

Review Supplier Performance

Monitor Shipment


The recommendation engine provides an interpretable layer between machine learning and optimization.

🧮 Optimization Model

SupplyPrescript uses PuLP to formulate and solve the supply-chain optimization problem.

The optimization layer evaluates operational actions while considering business constraints.

Objective

The optimizer aims to select a suitable operational action while minimizing the overall operational impact.

Conceptually:


Minimize:

Operational Cost

        +

Delay Impact

        +

Supply Chain Risk


subject to operational constraints.

🚧 Optimization Constraints

The optimization model considers constraints such as:

💰 Budget Constraint

The selected action must remain within the available operational budget.


Total Action Cost ≤ Available Budget


🏭 Warehouse Capacity

The recommended action must not exceed available warehouse capacity.


Required Capacity ≤ Available Capacity


🚚 Supplier Capacity

The selected supplier option must remain within supplier capacity.


Required Supply ≤ Supplier Capacity


These constraints make the optimization more realistic than selecting an action based only on prediction probability.

🔀 Candidate Operational Actions

The system can evaluate different operational responses depending on the situation.

Examples include:

| Action             | Purpose                                   |

| ------------------ | ----------------------------------------- |

| Express Shipping   | Reduce delivery delay                     |

| Change Supplier    | Reduce supplier-related risk              |

| Increase Inventory | Protect against stock shortages           |

| Monitor Shipment   | Continue tracking when risk is manageable |

| Review Supplier    | Investigate poor supplier performance     |

The available actions depend on the decision logic implemented in the system.

🧠 Prediction → Recommendation → Optimization

These components have different responsibilities.

| Component             | Question Answered                               |

| --------------------- | ----------------------------------------------- |

| Machine Learning      | What is likely to happen?                   |

| Recommendation Engine | What action should be considered?           |

| Optimization          | Which action is suitable under constraints? |

| Decision Layer        | What action was selected?                   |

| Outcome Layer         | What actually happened?                     |

This separation makes the system easier to understand, maintain, and extend.

📝 Decision Recording

Once an action is selected, the decision can be stored in the MySQL database.

Decision records can be used to track:

Prediction

Recommendation

Selected action

Expected performance

Expected cost

Decision status

Execution information

This creates a historical record of operational decisions.

🔄 Closed-Loop Decision System

The most important characteristic of SupplyPrescript is that the decision does not end after optimization.


Prediction

    ↓

Recommendation

    ↓

Optimization

    ↓

Decision

    ↓

Execution

    ↓

Actual Outcome

    ↓

Savings

    ↓

ROI

    ↓

Performance Analysis

    ↓

Future Decision Support


This creates a closed-loop prescriptive analytics system where decisions can be evaluated against their real-world outcomes.

📈 Why This Matters

A traditional analytics system may stop at:


Data → Prediction


SupplyPrescript extends this into:


Data

 ↓

Prediction

 ↓

Recommendation

 ↓

Optimization

 ↓

Decision

 ↓

Outcome

 ↓

Savings

 ↓

ROI


This allows the project to demonstrate the complete journey from data-driven prediction to measurable business decision support.

💰 Decision Outcome, Savings & ROI Analysis

SupplyPrescript closes the decision loop by tracking what happens after a recommended action is executed.

Instead of evaluating the system only on prediction accuracy, the project also evaluates the business outcome of operational decisions.

🔄 Outcome Tracking Workflow


Prediction

    ↓

Recommendation

    ↓

Optimization

    ↓

Decision

    ↓

Execution

    ↓

Actual Outcome

    ↓

Savings Calculation

    ↓

ROI Calculation


The outcome layer connects the original decision with the actual result.

📊 Expected vs Actual Performance

SupplyPrescript can compare expected performance with the actual outcome.

| Metric  |         Expected |         Actual |

| ------- | ---------------: | -------------: |

| Cost    |    Expected Cost |    Actual Cost |

| Delay   |   Expected Delay |   Actual Delay |

| Savings | Expected Savings | Actual Savings |

| ROI     |     Expected ROI |     Actual ROI |

This helps identify whether a decision performed as expected.

💵 Savings Calculation

Savings represent the financial benefit obtained from taking an operational action compared with the relevant baseline.

Conceptually:


Savings = Baseline Cost - Actual Cost


A positive savings value indicates that the selected action reduced the relevant operational cost compared with the baseline.

📈 ROI Calculation

Return on Investment can be evaluated using the relationship between the financial benefit and the investment or action cost.


ROI (%) = (Savings / Decision Cost) × 100


For example:


Decision Cost = ₹10,000

Savings       = ₹15,000

ROI = (15,000 / 10,000) × 100

    = 150%


The actual calculation used by the application depends on the recorded decision and outcome values.

🎯 Decision Effectiveness

The outcome layer allows the system to evaluate questions such as:

Did the selected action reduce delay?

Did the action reduce cost?

Did the decision generate savings?

Was the actual result better than expected?

Which decisions provide the highest ROI?

Which recommendations perform poorly?

Which operational actions should be preferred in similar situations?

📋 Outcome History

The dashboard provides historical visibility into completed decisions and their outcomes.

Users can review information such as:


Decision

   ↓

Expected Result

   ↓

Actual Result

   ↓

Savings

   ↓

ROI


This creates an auditable history of operational decision performance.

📊 Closed-Loop Analytics

The collected outcome information can be analyzed to understand long-term decision performance.

Example analytics include:

Total decisions

Successful decisions

Failed decisions

Total savings

Average savings

Average ROI

Decision success rate

Expected vs actual performance

Outcome trends

These metrics are displayed through the React dashboard.

🧠 Business Value

The closed-loop design makes SupplyPrescript different from a simple shipment prediction application.

A prediction system answers:

"What is likely to happen?"

A prescriptive system answers:

"What should we do?"

A closed-loop decision system goes further:

"What happened after we acted, and did the decision create value?"

SupplyPrescript is designed around this complete cycle:

 id="p0b6xk"

Predict

  ↓

Prescribe

  ↓

Decide

  ↓

Execute

  ↓

Measure

  ↓

Learn

📊 Dashboard Analytics & KPIs

The SupplyPrescript dashboard provides an interactive interface for monitoring predictions, operational decisions, outcomes, savings, and ROI.

The dashboard connects the React frontend with the FastAPI backend and MySQL database.

🖥️ Dashboard Modules

The dashboard is organized around the complete decision lifecycle.


┌─────────────────────────────────────────────┐

│              SupplyPrescript                │

│     Closed-Loop Decision Dashboard          │

├─────────────────────────────────────────────┤

│                                             │

│  Predictions    Decisions    Outcomes       │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│        Shipment Prediction Form             │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│        Decision History                     │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│        Outcome & Savings Analytics          │

│                                             │

├─────────────────────────────────────────────┤

│                                             │

│        ROI & Performance Analytics          │

│                                             │

└─────────────────────────────────────────────┘


📌 Key Performance Indicators

The dashboard can display important operational KPIs such as:

🚚 Shipment KPIs

Total shipments

Delayed shipments

On-time shipments

Delay percentage

Average delivery delay

🤖 Prediction KPIs

Total predictions

High-risk shipments

Prediction distribution

Prediction confidence

🧠 Decision KPIs

Total decisions

Successful decisions

Decision success rate

Decisions by action type

💰 Financial KPIs

Total savings

Average savings

Total decision cost

Average ROI

Overall ROI

📈 Analytics Visualization

The dashboard uses visual analytics to make operational information easier to understand.

Possible visualizations include:


Prediction Analytics

        ↓

Risk Distribution

        ↓

Decision Analytics

        ↓

Outcome Trends

        ↓

Savings Analysis

        ↓

ROI Analysis


Charts and KPI cards provide quick visibility into system performance.

🔍 Decision History

The Decision History section provides a historical view of decisions generated by the system.

Users can review information such as:

Decision ID

Shipment information

Prediction

Recommendation

Selected action

Expected cost

Decision status

This allows users to trace how individual decisions were generated.

📝 Outcome History

The Outcome History section tracks what happened after a decision was executed.

Important information includes:

Decision reference

Actual outcome

Actual cost

Actual delay

Savings

ROI

Outcome status

This provides the final connection between operational decisions and business results.

💰 ROI Dashboard

The ROI section focuses on the financial impact of decisions.

Example metrics:


Total Savings

      ↓

Decision Cost

      ↓

ROI %

      ↓

Decision Effectiveness


This allows users to identify which operational actions provide better financial outcomes.

🔄 Real-Time Data Flow

The dashboard retrieves information from the backend through REST APIs.


React Dashboard

      ↓

Axios

      ↓

FastAPI REST API

      ↓

Business Logic

      ↓

MySQL Database

      ↓

API Response

      ↓

React State

      ↓

Updated Dashboard


This allows the dashboard to display data from the current application state rather than relying only on static files.

🎯 Dashboard Objective

The dashboard is designed to provide a single operational view of:


Risk

 ↓

Prediction

 ↓

Recommendation

 ↓

Decision

 ↓

Outcome

 ↓

Savings

 ↓

ROI


This gives supply-chain users a centralized interface for understanding both operational risk and business impact.

🧪 Testing & Validation

SupplyPrescript is validated across multiple layers to ensure that the complete prediction-to-decision workflow functions correctly.

The testing process covers:

Machine learning predictions

Recommendation logic

Optimization logic

FastAPI endpoints

MySQL database operations

React dashboard

Decision and outcome workflow

🤖 Machine Learning Validation

The machine learning pipeline is evaluated using classification performance metrics.

Important metrics include:

Accuracy

Precision

Recall

F1-score

Confusion Matrix

Prediction Probability

The model evaluation helps determine how effectively the system identifies shipment delay risk.

🔌 API Testing

FastAPI endpoints can be tested using the built-in Swagger interface:


http://127.0.0.1:8000/docs


The main API workflows tested include:


GET  /

GET  /health

POST /predict

GET  /recommendations

GET  /model-info


API testing verifies that requests are correctly received, processed, and returned to the frontend.

🗄️ Database Validation

Database operations are validated by checking:

Successful MySQL connection

Correct table creation

Data insertion

Data retrieval

Decision recording

Outcome recording

SQL analytics queries

The database layer is essential because it stores the historical information required for closed-loop analysis.

⚙️ Optimization Validation

The optimization layer is checked against operational constraints.

Validation includes:

Budget constraint

Warehouse capacity

Supplier capacity

Candidate action evaluation

Feasible solution generation

Selected decision output

The optimizer should return a feasible operational decision when valid input conditions are provided.

🖥️ Frontend Validation

The React dashboard is tested for:

Prediction form submission

API communication

Prediction result display

Recommendation display

Decision history

Outcome submission

Analytics updates

ROI display

Error handling

The frontend is also checked to ensure that components remain stable when data is loaded or refreshed.

🔄 End-to-End Validation

The most important test is the complete closed-loop workflow.


Shipment Input

      ↓

Prediction

      ↓

Recommendation

      ↓

Optimization

      ↓

Decision

      ↓

Database Record

      ↓

Outcome

      ↓

Savings

      ↓

ROI

      ↓

Dashboard Analytics


This confirms that the individual components work together as one integrated system.

✅ Validation Checklist

Machine learning model loads successfully

Shipment prediction works

Delay probability is generated

Recommendation logic executes

Optimization logic evaluates constraints

Decisions can be recorded

Outcomes can be recorded

Savings can be calculated

ROI can be evaluated

SQL analytics queries execute

FastAPI endpoints respond correctly

React dashboard communicates with the backend

Closed-loop workflow can be demonstrated

🛡️ Error Handling

The application includes validation and error handling across the major layers.

Examples include:

Invalid prediction input

Missing database connection

API request failures

Missing model files

Invalid optimization inputs

Database operation failures

The frontend displays appropriate feedback when backend operations fail.

This helps make the application more reliable during real-world usage.

📈 Results & Business Impact

SupplyPrescript demonstrates how machine learning, optimization, SQL analytics, and modern web technologies can be combined to create a complete supply-chain decision-support system.

The project focuses not only on predicting shipment delays but also on converting predictions into measurable operational decisions.

🎯 Key Outcomes

The system provides a complete workflow for:


Data

 ↓

Prediction

 ↓

Recommendation

 ↓

Optimization

 ↓

Decision

 ↓

Outcome

 ↓

Savings

 ↓

ROI


This demonstrates the transition from predictive analytics to prescriptive analytics and finally to closed-loop performance measurement.

💼 Business Benefits

SupplyPrescript can support supply-chain teams by helping them:

🚚 Reduce Shipment Risk

Identify shipments with a higher probability of delay and prioritize them for operational attention.

🏭 Improve Supplier Decisions

Use historical supplier performance to identify suppliers associated with higher delivery delays.

📦 Improve Inventory Decisions

Consider inventory availability when generating recommendations for at-risk shipments.

⚙️ Support Operational Decisions

Evaluate potential actions instead of relying only on manual judgment.

💰 Measure Financial Impact

Track savings and ROI after decisions are executed.

📊 Improve Visibility

Provide a centralized dashboard for predictions, decisions, outcomes, and financial performance.

🧠 Technical Outcomes

The project demonstrates practical implementation of:

Machine Learning

Feature Engineering

Classification

Probability-based prediction

Rule-based recommendation systems

Prescriptive optimization

Linear programming

SQL analytics

REST APIs

FastAPI

MySQL

React.js

Data visualization

Closed-loop analytics

🔄 From Prediction to Prescription

A traditional machine learning project may end after generating a prediction.

SupplyPrescript extends the workflow:


Traditional ML

Data

 ↓

Prediction


SupplyPrescript:


Data

 ↓

Prediction

 ↓

Recommendation

 ↓

Optimization

 ↓

Decision

 ↓

Outcome

 ↓

Savings

 ↓

ROI


This makes the project focused on decision intelligence and measurable business outcomes, rather than prediction alone.

📊 Operational Performance

The dashboard enables users to monitor performance indicators such as:

Shipment delay rate

Prediction results

Decision volume

Decision success rate

Total savings

Average savings

ROI

Expected vs actual performance

These metrics can be used to identify operational trends and evaluate decision effectiveness.

💡 Portfolio Value

SupplyPrescript demonstrates the ability to build an end-to-end data and analytics application rather than an isolated machine learning model.

The project combines:


Data Engineering

       +

Machine Learning

       +

SQL Analytics

       +

Optimization

       +

Backend Development

       +

Frontend Development

       +

Business Analytics


This makes the project relevant to roles involving:

Data Analytics

Business Analytics

Data Science

SQL Development

Supply Chain Analytics

Decision Science

Operations Analytics

Machine Learning Applications

🚀 Future Enhancements

SupplyPrescript can be extended further to support more advanced supply-chain intelligence and production use cases.

🤖 Advanced Machine Learning

Compare additional classification algorithms

Hyperparameter optimization

Automated model selection

Model performance monitoring

Model retraining pipelines

Feature importance analysis

Explainable AI using SHAP

📡 Real-Time Supply Chain Monitoring

Future versions can integrate real-time data sources such as:

Shipment tracking APIs

Supplier systems

Warehouse management systems

ERP systems

Logistics platforms

External disruption feeds

This would allow the system to continuously monitor supply-chain conditions.

🧠 Advanced Optimization

The optimization layer can be expanded to support:

Multi-objective optimization

Dynamic supplier allocation

Transportation optimization

Inventory optimization

Safety-stock optimization

Route optimization

Multi-warehouse planning

📊 Advanced Analytics

Future dashboard improvements could include:

Supplier performance scorecards

Risk heatmaps

Geographic shipment analysis

Cost trend analysis

Forecasting

What-if analysis

Scenario simulation

Advanced ROI analytics

🔄 Automated Decision Learning

Future versions could use historical outcomes to improve future recommendations.


Historical Decisions

        ↓

Actual Outcomes

        ↓

Performance Analysis

        ↓

Learn Which Actions Work Best

        ↓

Improve Future Recommendations


This would create an even stronger closed-loop decision intelligence system.

🏁 Conclusion

SupplyPrescript demonstrates how multiple technologies can be integrated to solve a real-world supply-chain decision problem.

The system combines:


Machine Learning

       ↓

Prediction

       ↓

Recommendation

       ↓

Optimization

       ↓

Decision

       ↓

Outcome

       ↓

Savings

       ↓

ROI

       ↓

Analytics


Instead of stopping at shipment delay prediction, SupplyPrescript connects prediction with action and measurable outcomes.

The project demonstrates practical experience in:

Data Analytics

Machine Learning

SQL

Prescriptive Analytics

Optimization

FastAPI

MySQL

React

Business Intelligence

Decision Support Systems

👨‍💻 Author

S. Gouthamraj

MBA – Systems with Business Analysis

Areas of Interest

Data Analytics

SQL Development

Business Analytics

Machine Learning

Supply Chain Analytics

Prescriptive Analytics

Business Intelligence

⭐ Project

SupplyPrescript — Closed-Loop Prescriptive Analytics for Supply Chain Management

A complete decision-support system that connects:

Prediction → Recommendation → Optimization → Decision → Outcome → Savings → ROI

📌 Project Status

Status: Completed / Portfolio Project

The project is continuously open to improvements, additional analytics, optimization techniques, and real-time supply-chain integrations.

🧩 Skills Demonstrated

SupplyPrescript demonstrates practical skills across the complete analytics and application-development lifecycle.

📊 Data & Analytics

Data Cleaning

Exploratory Data Analysis

Feature Engineering

Statistical Analysis

SQL Analytics

KPI Development

Data Visualization

🤖 Machine Learning

Classification

Random Forest

Model Training

Model Evaluation

Prediction Probability

Feature Engineering

Model Serialization

⚙️ Prescriptive Analytics

Rule-Based Recommendations

Linear Programming

Constraint Optimization

Decision Support

Scenario Evaluation

Outcome Analysis

ROI Analysis

🗄️ Database

MySQL

Database Design

SQL Queries

Aggregations

Joins

Analytical Queries

Data Persistence

🌐 Backend Development

Python

FastAPI

REST APIs

API Integration

Backend Business Logic

Database Connectivity

💻 Frontend Development

React.js

JavaScript

Axios

Component-Based Architecture

Interactive Dashboards

Data Visualization

🛠️ Development Tools

Git

GitHub

VS Code

Jupyter Notebook

npm

Python Virtual Environment

🏆 Project Highlights


✓ End-to-End Machine Learning Application

✓ Supply Chain Risk Prediction

✓ Rule-Based Recommendation Engine

✓ Prescriptive Optimization with PuLP

✓ MySQL Database Integration

✓ FastAPI REST Backend

✓ Interactive React Dashboard

✓ Decision History Tracking

✓ Outcome Tracking

✓ Savings Calculation

✓ ROI Analysis

✓ Closed-Loop Analytics


---

---

# 📜 License

This project is developed for educational, portfolio, and demonstration purposes.

The project showcases the practical application of:

- Machine Learning

- SQL Analytics

- Prescriptive Analytics

- Optimization

- FastAPI

- MySQL

- React

- Business Intelligence

If you plan to make the repository open source for public reuse, an appropriate open-source license can be added to the repository.

---

# 🙏 Acknowledgements

This project was developed using open-source technologies and Python ecosystem libraries including:

* Python

* Pandas

* NumPy

* Scikit-learn

* PuLP

* FastAPI

* MySQL

* React

* Axios

* Vite

The project combines these technologies to demonstrate how modern analytics and software engineering techniques can be applied to supply-chain decision-making.

# ⚡ Quick Demo

The following flow demonstrates how SupplyPrescript can be used from the dashboard.

\## 1️⃣ Enter Shipment Information

The user enters shipment-related information such as:

* Shipment quantity

* Unit price

* Lead time

* Stock quantity

* Supplier rating

* Shipment value

* Supplier average delay

---

\## 2️⃣ Generate Prediction

The React dashboard sends the shipment information to the FastAPI backend.

```text

React Dashboard

      ↓

POST /predict

      ↓

FastAPI

      ↓

Machine Learning Model


The system returns the shipment delay prediction along with probability and confidence information.

3️⃣ Review Recommendation

Based on the prediction and operational conditions, the recommendation engine generates an appropriate action.

Example:


High Delay Risk

       ↓

Supplier Performance Check

       ↓

Inventory Check

       ↓

Lead-Time Evaluation

       ↓

Recommended Action


Possible recommendations include:

Use Express Shipping

Change Supplier

Increase Inventory

Review Supplier Performance

Monitor Shipment

4️⃣ Optimize the Decision

The recommendation is evaluated through the optimization layer.


Candidate Actions

       ↓

Budget Constraint

       ↓

Warehouse Constraint

       ↓

Supplier Constraint

       ↓

Feasible Decision


The optimization layer helps select a suitable action while respecting operational constraints.

5️⃣ Record the Decision

The selected decision is stored in the MySQL database.

This creates a historical record that can later be used for:

Decision analysis

Performance tracking

Savings analysis

ROI analysis

6️⃣ Record the Actual Outcome

After the operational action is completed, the actual outcome can be recorded.

The system can compare:


Expected Result

      ↓

Actual Result

      ↓

Difference


7️⃣ Calculate Savings & ROI

The outcome information is used to evaluate financial performance.


Baseline Cost

      ↓

Actual Cost

      ↓

Savings

      ↓

Decision Cost

      ↓

ROI


8️⃣ Analyze Results

The dashboard provides a consolidated view of the complete decision lifecycle.


┌─────────────┐

│ Prediction  │

└──────┬──────┘

       ↓

┌─────────────┐

│Recommendation│

└──────┬──────┘

       ↓

┌─────────────┐

│ Optimization│

└──────┬──────┘

       ↓

┌─────────────┐

│   Decision  │

└──────┬──────┘

       ↓

┌─────────────┐

│   Outcome   │

└──────┬──────┘

       ↓

┌─────────────┐

│ Savings/ROI │

└─────────────┘


This provides a simple demonstration of the complete closed-loop prescriptive analytics workflow.

🔗 Project Links

📂 GitHub Repository

GitHub Repository:

https://github.com/gouthamraj-ui/SupplyPrescript

📖 API Documentation

After starting the FastAPI backend:

http://127.0.0.1:8000/docs

🖥️ Local Dashboard

After starting the React frontend:

http://localhost:5173

⭐ Final Project Summary

SupplyPrescript is an end-to-end supply-chain decision intelligence application that combines:

Machine Learning + SQL + Optimization + FastAPI + MySQL + React

to create a complete:

Prediction → Recommendation → Optimization → Decision → Outcome → Savings → ROI

workflow.

⚡ Quick Demo

SupplyPrescript demonstrates a complete closed-loop supply-chain decision workflow through the interactive React dashboard.

The application allows a user to enter shipment information, receive a machine learning prediction, generate a recommendation, evaluate the decision, and review the resulting outcome and financial impact.

🔄 Complete Demo Flow

1. Enter Shipment Information

              ↓

2. Predict Shipment Delay

              ↓

3. View Delay Probability

              ↓

4. View Prediction Confidence

              ↓

5. Generate Recommendation

              ↓

6. Evaluate Operational Action

              ↓

7. Record Decision

              ↓

8. Record Actual Outcome

              ↓

9. Calculate Savings

              ↓

10. Calculate ROI

              ↓

11. View Dashboard Analytics