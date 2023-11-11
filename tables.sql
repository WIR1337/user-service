-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users actions
CREATE TABLE users_actions (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
action_type VARCHAR(15) NOT NULL,
action_data JSONB,
action_time TIMESTAMPTZ DEFAULT NOW()
);