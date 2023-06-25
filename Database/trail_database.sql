CREATE TABLE Customer (
    customer_id INT,
    customer_name VARCHAR(20),
    age INT,
    current_location VARCHAR(20),
    fitness_level INT,
    preference VARCHAR(40),
    current_goal VARCHAR(40),
    PRIMARY KEY (customer_id)
)

CREATE TABLE Hiking_ticket (
    ticket_id INT,
    starting_time DATETIME,
    ending_time DATETIME,
    cost REAL,
    PRIMARY KEY (ticket_id)
)

CREATE TABLE Trail (
    trail_id INT,
    trail_name VARCHAR(20),
    trail_location VARCHAR(20),
    distance REAL,
    slope REAL,
    difficulty INT,
    PRIMARY KEY (trail_id)
)

CREATE TABLE Hiking_plan (
    plan_id INT,
    starting_time DATETIME,
    ending_time DATETIME,
    PRIMARY KEY (plan_id)
)

