-- Run this SQL to update your users table to store name and location
ALTER TABLE users 
  ADD COLUMN name VARCHAR(255) AFTER id,
  ADD COLUMN location VARCHAR(255) AFTER name;