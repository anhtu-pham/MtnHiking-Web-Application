CREATE TABLE IF NOT EXISTS User (
    user_ID INT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    age INT,
    email VARCHAR(40),
    phone_number CHAR(10),
    current_location VARCHAR(40),
    fitness_level INT,
    emergency_contact CHAR(10),
    code VARCHAR(40),
    PRIMARY KEY (user_ID)
);

CREATE TABLE IF NOT EXISTS Trail_trip (
    trip_ID INT,
    starting_time DATETIME,
    ending_time DATETIME,
    PRIMARY KEY (trip_ID)
);

CREATE TABLE IF NOT EXISTS Trail (
    trail_ID INT,
    trail_name VARCHAR(20),
    elevation_gain REAL,
    difficulty INT,
    trail_length REAL,
    trail_location VARCHAR(40),
    water_station VARCHAR(40),
    exposure VARCHAR(40),
    trail_description VARCHAR(100),
    PRIMARY KEY (trail_ID)
);

CREATE TABLE IF NOT EXISTS Mountain (
    mountain_ID INT,
    mountain_name VARCHAR(20),
    elevation REAL,
    summit_rating INT,
    difficulty INT,
    emergency_accessibility VARCHAR(40),
    PRIMARY KEY (mountain_ID)
);

CREATE TABLE IF NOT EXISTS Goes_on (
    trip_ID INT,
    user_ID INT NOT NULL,
    PRIMARY KEY (trip_ID),
    FOREIGN KEY (trip_ID) REFERENCES Trail_trip,
    FOREIGN KEY (user_ID) REFERENCES User
);

CREATE TABLE IF NOT EXISTS Occurs_in (
    trip_ID INT,
    trail_ID INT NOT NULL,
    PRIMARY KEY (trip_ID),
    FOREIGN KEY (trip_ID) REFERENCES Trail_trip,
    FOREIGN KEY (trail_ID) REFERENCES Trail
);

CREATE TABLE IF NOT EXISTS Has_trail (
    trail_ID INT,
    mountain_ID INT,
    PRIMARY KEY (trail_ID, mountain_ID),
    FOREIGN KEY (trail_ID) REFERENCES Trail,
    FOREIGN KEY (mountain_ID) REFERENCES Mountain
);

CREATE TABLE IF NOT EXISTS Faces_Condition (
    trail_ID INT,
    condition_ID INT,
    season VARCHAR(10),
    condition_rating INT,
    PRIMARY KEY (trail_ID, condition_ID),
    FOREIGN KEY (trail_ID) REFERENCES Trail
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Contains_Special_place (
    trail_ID INT,
    place_ID INT,
    place_name VARCHAR(20),
    elevation REAL,
    special_quality VARCHAR(40),
    PRIMARY KEY (trail_ID, place_ID),
    FOREIGN KEY (trail_ID) REFERENCES Trail
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Rates_trail (
    user_ID INT,
    trail_ID INT,
    rating INT,
    PRIMARY KEY (user_ID, trail_ID),
    FOREIGN KEY (user_ID) REFERENCES User,
    FOREIGN KEY (trail_ID) REFERENCES Trail
);

CREATE TABLE IF NOT EXISTS Connects (
    first_user_ID INT,
    second_user_ID INT,
    PRIMARY KEY (first_user_ID, second_user_ID),
    FOREIGN KEY (first_user_ID) REFERENCES User,
    FOREIGN KEY (second_user_ID) REFERENCES User
);

CREATE TABLE IF NOT EXISTS Where_to_hike (
    user_ID INT,
    mountain_ID INT,
    PRIMARY KEY (user_ID, mountain_ID),
    FOREIGN KEY (user_ID) REFERENCES User,
    FOREIGN KEY (mountain_ID) REFERENCES Mountain
);