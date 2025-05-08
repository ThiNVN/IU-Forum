-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: forum_2025
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `description` char(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `parent_cmt_id` int DEFAULT NULL,
  `content` text,
  `create_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `parent_cmt_id` (`parent_cmt_id`),
  KEY `comment_ibfk_1` (`user_id`),
  KEY `comment_ibfk_2` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`ID`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parent_cmt_id`) REFERENCES `comment` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,NULL,'<p>aaaaaa</p>','2025-05-05 07:21:55'),(2,1,1,NULL,'<p>Hello</p>','2025-05-05 07:37:49'),(3,2,1,NULL,'<p>Night</p>','2025-05-06 10:21:10'),(4,3,1,NULL,'<p>Nice</p>','2025-05-06 10:23:45'),(5,3,1,NULL,'<p>Test 1</p>','2025-05-06 10:26:01'),(6,4,1,NULL,'<p>A</p>','2025-05-06 11:51:34'),(7,3,1,NULL,'<p>Test 2</p>','2025-05-06 12:52:41'),(8,1,1,NULL,'<p>AAAA</p>','2025-05-06 13:06:27'),(9,1,1,NULL,'<p>BBB</p>','2025-05-06 13:14:07'),(10,1,1,NULL,'<p>CCC</p>','2025-05-06 13:14:27'),(11,1,1,NULL,'<p>DDD</p>','2025-05-06 13:15:07'),(12,1,1,NULL,'<p>EEEE</p>','2025-05-06 13:15:53'),(13,1,1,NULL,'<p>FFF</p>','2025-05-06 13:17:24'),(14,1,1,NULL,'<p>GG</p>','2025-05-06 13:23:03'),(15,2,1,NULL,'<p>AAAA</p>','2025-05-06 13:23:17'),(16,2,1,NULL,'<p>BBB</p>','2025-05-06 13:23:57'),(17,2,1,NULL,'<p>CCC</p>','2025-05-06 13:27:47'),(18,2,1,NULL,'<p>DDD</p>','2025-05-06 13:27:51'),(19,2,1,NULL,'<p>EEE</p>','2025-05-06 13:31:00'),(20,3,1,NULL,'<p>GG</p>','2025-05-06 13:31:38'),(21,1,1,NULL,'<p>FF</p>','2025-05-06 13:31:52'),(22,3,1,NULL,'<p>BB</p>','2025-05-06 13:32:37'),(23,3,1,NULL,'<p>CC</p>','2025-05-06 13:32:41'),(24,3,1,NULL,'<p>DD</p>','2025-05-06 13:32:43'),(25,7,1,NULL,'<p>FFFFF</p>','2025-05-06 13:38:07');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `follower_id` int DEFAULT NULL,
  `following_id` int DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `follower_id` (`follower_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_table`
--

DROP TABLE IF EXISTS `like_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_table` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `comment_id` (`comment_id`),
  KEY `like_table_ibfk_1` (`user_id`),
  KEY `like_table_ibfk_2` (`post_id`),
  CONSTRAINT `like_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `like_table_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`ID`),
  CONSTRAINT `like_table_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_table`
--

LOCK TABLES `like_table` WRITE;
/*!40000 ALTER TABLE `like_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `like_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `from_user_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `like_id` int DEFAULT NULL,
  `message` text,
  `is_read` tinyint(1) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `new_post` tinyint(1) DEFAULT '0',
  `new_follower` tinyint(1) DEFAULT '0',
  `new_comment` tinyint(1) DEFAULT '0',
  `new_reply` tinyint(1) DEFAULT '0',
  `new_like` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  KEY `comment_id` (`comment_id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `like_id` (`like_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`ID`),
  CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`ID`),
  CONSTRAINT `notification_ibfk_4` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `notification_ibfk_5` FOREIGN KEY (`like_id`) REFERENCES `like_table` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `thread_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `content` text,
  `image` char(255) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `thread_id` (`thread_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,NULL,1,'<p>AAAAA</p>',NULL,'2025-05-05 05:45:57'),(2,NULL,1,'<p>Hello</p>',NULL,'2025-05-06 10:20:36'),(3,NULL,1,'<p>Test Test</p>',NULL,'2025-05-06 10:22:15'),(4,NULL,1,'<p>Test 2</p><p><br></p>',NULL,'2025-05-06 10:26:10'),(5,NULL,1,'<p>FFF</p>',NULL,'2025-05-06 13:32:58'),(6,NULL,1,'<p>AAA</p>',NULL,'2025-05-06 13:33:35'),(7,NULL,1,'<p>AAAAAAA</p>',NULL,'2025-05-06 13:38:00');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` char(255) NOT NULL,
  `description` text,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`ID`),
  CONSTRAINT `thread_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` char(50) NOT NULL,
  `full_name` char(255) NOT NULL,
  `avatar` char(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `school` char(255) DEFAULT NULL,
  `major` char(255) DEFAULT NULL,
  `bio` text,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `total_message` int DEFAULT '0',
  `total_reaction` int DEFAULT '0',
  `point` int DEFAULT '0',
  `title` varchar(45) DEFAULT 'Member',
  `location` char(255) DEFAULT NULL,
  `occupation` char(255) DEFAULT NULL,
  `Twitter` char(255) DEFAULT NULL,
  `LinkedIn` char(255) DEFAULT NULL,
  `website` char(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'thien','pean sky',NULL,22,'IU','CS','I am Thien',0,'2025-04-25 07:23:23','2025-05-08 08:02:14',0,0,0,'Member','Street 10, Truong Tho District, Thu Duc, TPHCM','Student','https://x.com/','https://www.linkedin.com/feed/','https://rebalon.github.io/'),(2,'a','NVLThien',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(3,'thien','pean sky',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(5,'Kiet','pean sky',NULL,NULL,NULL,NULL,NULL,0,'2025-04-25 13:23:23',NULL,0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(6,'thien','NVLThien',NULL,NULL,NULL,NULL,NULL,0,'2025-04-26 16:42:27',NULL,0,0,0,'Member',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_credentials`
--

DROP TABLE IF EXISTS `user_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_credentials` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` char(255) DEFAULT NULL,
  `password_hash` char(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_credentials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credentials`
--

LOCK TABLES `user_credentials` WRITE;
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
INSERT INTO `user_credentials` VALUES (1,'1@gmail.com','$2b$10$iACFVJqYEBcyfr7to5Mr6OeELzpkbhbUPQ7uZEzoXOv8dago.MITq',1),(2,'skygrep@gmail.com','$2b$10$88eSMBAKc2xhwW7xtA/WWuVJbSfy/7h8fljW8TKVseBiBZBarc3Oi',2),(3,'1@gmail.com','$2b$10$psBaPr5M9igDRg49zKoDkOCgp6SPgdZ3QVNXJlgvMLLkq8FqZvCni',3),(4,'skygrep@gmail.com','$2b$10$vIJ6Qk6I6ZXg7HrRWqb1Du/y5YlCci3Ev9glXcQQNPehDBL0kZqAm',5),(5,'ngthien0929@gmail.com','$2b$10$YnRNXJoQpnu280iu9fct1./LLTPnlZJRJOWnIdiFhS0stHUFkN6y6',6);
/*!40000 ALTER TABLE `user_credentials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-08  9:32:21
