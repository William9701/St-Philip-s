-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS church_dev_db;
CREATE USER IF NOT EXISTS 'church_dev'@'localhost' IDENTIFIED BY 'church_dev_pwd';
GRANT ALL PRIVILEGES ON `church_dev_db`.* TO 'church_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'church_dev'@'localhost';
FLUSH PRIVILEGES;
