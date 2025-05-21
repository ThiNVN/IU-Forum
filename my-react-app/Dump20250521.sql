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
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `activity_type` varchar(100) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,1,'post','User posted a new profile post','2025-05-19 12:48:25'),(2,1,'post','User posted a new profile post','2025-05-19 12:48:45'),(3,1,'post','User posted a new profile post','2025-05-19 12:49:04'),(4,1,'post','User posted a new profile post','2025-05-19 12:59:21'),(5,1,'comment','User made a new comment in a thread in undefined','2025-05-19 13:02:14'),(6,1,'comment','User made a new comment in a thread in undefined','2025-05-19 16:07:27');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'General Discussion','Talk about anything here'),(2,'Programming','All things coding and development'),(3,'University Life','Discuss classes, exams, and campus life'),(4,'Career & Jobs','Share job opportunities and advice'),(5,'Entertainment','Movies, music, games and more');
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
  `thread_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `comment_ibfk_1` (`user_id`),
  KEY `comment_ibfk_2` (`thread_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'First comment to kick off the thread.','2025-05-19 12:19:36'),(2,1,2,'Totally agree! SQL is super useful in data analysis.','2025-05-19 12:19:57'),(3,5,1,'<p>AAA</p>','2025-05-19 12:48:25'),(4,6,1,'<p>AAA</p>','2025-05-19 12:48:45'),(5,7,1,'<p>AAA</p>','2025-05-19 12:49:04'),(6,8,1,'<p>AAA</p>','2025-05-19 12:59:21'),(8,5,1,'<p>BBB</p>','2025-05-19 16:07:26');
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
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
  `thread_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `comment_id` (`comment_id`),
  KEY `like_table_ibfk_1` (`user_id`),
  KEY `like_table_ibfk_2` (`thread_id`),
  CONSTRAINT `like_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `like_table_ibfk_2` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`),
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
  `thread_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `from_user_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `like_id` int DEFAULT NULL,
  `message` text,
  `is_read` tinyint(1) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `new_thread` tinyint(1) DEFAULT '0',
  `new_follower` tinyint(1) DEFAULT '0',
  `new_comment` tinyint(1) DEFAULT '0',
  `new_reply` tinyint(1) DEFAULT '0',
  `new_like` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  KEY `thread_id` (`thread_id`),
  KEY `comment_id` (`comment_id`),
  KEY `from_user_id` (`from_user_id`),
  KEY `like_id` (`like_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`),
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
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `topic_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `main_comment_id` int DEFAULT NULL,
  `title` text,
  `image` varchar(255) DEFAULT NULL,
  `responses` int DEFAULT '0',
  `views` int DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `topic_id` (`topic_id`),
  KEY `user_id` (`user_id`),
  KEY `main_comment_id` (`main_comment_id`),
  CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `thread_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`ID`),
  CONSTRAINT `thread_ibfk_3` FOREIGN KEY (`main_comment_id`) REFERENCES `comment` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,1,1,1,'This is a new thread discussing the benefits of learning SQL.',NULL,0,0,'2025-05-19 12:19:13',NULL),(5,NULL,1,3,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:48:25',NULL),(6,NULL,1,4,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:48:45',NULL),(7,NULL,1,5,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:49:04',NULL),(8,NULL,1,6,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:59:21',NULL);
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread_tag`
--

DROP TABLE IF EXISTS `thread_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread_tag` (
  `thread_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`thread_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `thread_tag_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `thread_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread_tag`
--

LOCK TABLES `thread_tag` WRITE;
/*!40000 ALTER TABLE `thread_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`ID`),
  CONSTRAINT `topic_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,1,1,'Welcome to the forum!','Introduce yourself here.','2025-05-19 12:12:28',NULL),(2,2,2,'Best resources to learn Go?','Share tutorials, YouTube channels, or books.','2025-05-19 12:12:28',NULL),(3,3,1,'Tips for surviving finals','Drop your best study tips and coping mechanisms.','2025-05-19 12:12:28',NULL),(4,4,3,'Internship openings Summer 2025','Post or ask about internship opportunities.','2025-05-19 12:12:28',NULL),(5,5,2,'What’s your favorite movie this year?','Let’s talk about recent releases and hidden gems.','2025-05-19 12:12:28',NULL);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `bio` text,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  `total_message` int DEFAULT '0',
  `total_reaction` int DEFAULT '0',
  `point` int DEFAULT '0',
  `title` varchar(45) DEFAULT 'Member',
  `location` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `Twitter` varchar(255) DEFAULT NULL,
  `LinkedIn` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'thien','thien',NULL,NULL,NULL,NULL,NULL,0,'2025-05-19 10:39:44','2025-05-20 22:33:36',0,0,0,'Member',NULL,NULL,NULL,NULL,NULL);
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
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_credentials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credentials`
--

LOCK TABLES `user_credentials` WRITE;
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
INSERT INTO `user_credentials` VALUES (1,'ngthien0929@gmail.com','$2b$10$TE8thjp2d9ILUQx//WCkFOT9mW.kr8q1zIgG/cdPv9VzkVMhybLCO',1);
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

-- Dump completed on 2025-05-21 12:25:07
