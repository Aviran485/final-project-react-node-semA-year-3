-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 01:01 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `username`, `password`, `role`) VALUES
(1, 'worker1', '$2a$10$exampleHashedPasswordHere', 'user'),
(3, 'worker3', '$2a$10$hashedPasswordForWorker3', 'user'),
(4, 'worker2', '$2a$10$nGlDKOh2/0SgfqYv4ty.H.ei6xjouej3UQEkIOR/TJ6FLFOEFn57y', 'admin'),
(5, 'worker69', '$2a$10$.YZvfxO/TBV9.qQJqWsMUetEqQQgPrPiZ0eqI3UxsOt12LK.LHq9a', 'user'),
(6, 'worker50k', '$2a$10$q4QcmDyRNjSnjGtFYfYadOanaEvn7hZBafVOX3xAYZVJoQj5vaqyi', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image` longblob DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('לא טופל','בטיפול','טופל') DEFAULT 'לא טופל',
  `has_collar` enum('yes','no') DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `image`, `description`, `location`, `status`, `has_collar`) VALUES
(19, 1, 0x696d6167652d313733393938323433393833342e6a7067, 'update1', '32.7780405, 35.0257261', 'לא טופל', 'no'),
(20, 1, 0x696d6167652d313733393938323734383930352e6a7067, 'update2', '32.7762239, 35.0286538', 'לא טופל', 'no'),
(23, 1, 0x696d6167652d313733393938363832373334352e6a7067, '123sdf', '32.7762246, 35.0286577', 'לא טופל', 'yes'),
(25, 4, 0x696d6167652d313733393938373530303831312e6a7067, 'ayo bruv', '32.7762248, 35.0286538', 'לא טופל', 'no'),
(58, NULL, 0x6e6f2d696d6167652e6a7067, 'new6969', '32.7909376, 34.9601792', 'לא טופל', 'yes'),
(60, NULL, 0x6e6f2d696d6167652e6a7067, 'new mendi50k', 'mendi60k', 'לא טופל', 'yes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
