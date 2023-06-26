CREATE TABLE IF NOT EXISTS Customer (
    customer_id INT,
    customer_name VARCHAR(20),
    age INT,
    current_location VARCHAR(20),
    fitness_level INT,
    preference VARCHAR(40),
    current_goal VARCHAR(40),
    PRIMARY KEY (customer_id)
)

CREATE TABLE IF NOT EXISTS Hiking_ticket (
    ticket_id INT,
    starting_time DATETIME,
    ending_time DATETIME,
    cost REAL,
    PRIMARY KEY (ticket_id)
)

CREATE TABLE IF NOT EXISTS Trail (
    trail_id INT,
    trail_name VARCHAR(20),
    trail_location VARCHAR(20),
    distance REAL,
    slope REAL,
    difficulty INT,
    PRIMARY KEY (trail_id)
)

CREATE TABLE IF NOT EXISTS Hiking_plan (
    plan_id INT,
    starting_time DATETIME,
    ending_time DATETIME,
    PRIMARY KEY (plan_id)
)

CREATE TABLE IF NOT EXISTS Buys_ticket (
    ticket_id INT,
    customer_id INT NOT NULL,
    PRIMARY KEY (ticket_id),
    FOREIGN KEY (ticket_id) REFERENCES Hiking_ticket,
    FOREIGN KEY (customer_id) REFERENCES Customer
)

CREATE TABLE IF NOT EXISTS Manages_plan (
    plan_id INT,
    customer_id INT NOT NULL,
    PRIMARY KEY (plan_id),
    FOREIGN KEY (plan_id) REFERENCES Hiking_plan,
    FOREIGN KEY (customer_id) REFERENCES Customer
)

CREATE TABLE IF NOT EXISTS Occurs_in (
    plan_id INT,
    trail_id INT NOT NULL,
    PRIMARY KEY (plan_id),
    FOREIGN KEY (plan_id) REFERENCES Hiking_plan,
    FOREIGN KEY (trail_id) REFERENCES Trail
)

CREATE TABLE IF NOT EXISTS Rate (
    ticket_id INT,
    trail_id INT NOT NULL,
    ratings INT,
    PRIMARY KEY (ticket_id),
    FOREIGN KEY (ticket_id) REFERENCES Hiking_ticket,
    FOREIGN KEY (trail_id) REFERENCES Trail
)

CREATE TABLE IF NOT EXISTS Contains_Special_place (
    trail_id INT,
    place_id INT,
    place_name VARCHAR(20),
    place_type VARCHAR(20),
    place_location VARCHAR(20),
    PRIMARY KEY (trail_id, place_id),
    FOREIGN KEY (trail_id) REFERENCES Trail
)

CREATE TABLE IF NOT EXISTS Faces_Condition (
    trail_id INT,
    condition_id INT,
    condition_name VARCHAR(20),
    condition_effect VARCHAR(40),
    PRIMARY KEY (trail_id, condition_id),
    FOREIGN KEY (trail_id) REFERENCES Trail
)

CREATE TABLE IF NOT EXISTS Has_Facility (
    trail_id INT,
    facility_id INT,
    facility_name VARCHAR(20),
    facility_type VARCHAR(20),
    PRIMARY KEY (trail_id, facility_id),
    FOREIGN KEY (trail_id) REFERENCES Trail
)