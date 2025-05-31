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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,1,'post','User posted a new profile post','2025-05-19 12:48:25'),(2,1,'post','User posted a new profile post','2025-05-19 12:48:45'),(3,1,'post','User posted a new profile post','2025-05-19 12:49:04'),(4,1,'post','User posted a new profile post','2025-05-19 12:59:21'),(5,1,'comment','User made a new comment in a thread in undefined','2025-05-19 13:02:14'),(6,1,'comment','User made a new comment in a thread in undefined','2025-05-19 16:07:27'),(7,1,'post','User posted a new profile post','2025-05-22 12:47:00'),(8,1,'comment','User made a new comment in a thread in undefined','2025-05-25 15:42:37'),(9,1,'comment','User made a new comment in a thread in undefined','2025-05-25 15:42:46'),(10,1,'post','User posted a new profile thread','2025-05-26 12:19:11'),(11,1,'comment','User made a new comment in a profile thread','2025-05-26 12:28:48'),(12,1,'post','User posted a new profile thread','2025-05-26 12:29:08'),(13,1,'comment','User made a new comment in a profile thread','2025-05-26 12:29:18'),(14,2,'post','User posted a new profile thread','2025-05-30 04:44:28'),(15,1,'post','User posted a new profile thread','2025-05-31 06:11:42'),(16,1,'post','User posted a new profile thread','2025-05-31 06:15:15'),(17,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 06:57:27'),(18,1,'comment','User made a new comment in a profile thread','2025-05-31 07:34:12'),(19,1,'comment','User made a new comment in a profile thread','2025-05-31 07:38:35'),(20,1,'comment','User made a new comment in a profile thread','2025-05-31 07:39:54'),(21,1,'comment','User made a new comment in a thread \'undefined\' in topic \'Welcome to the forum!\'','2025-05-31 07:40:17'),(22,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 07:40:55'),(23,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 08:29:24'),(24,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 08:29:52'),(25,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 08:39:04'),(26,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 08:47:41'),(27,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 09:01:52'),(28,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 09:02:24'),(29,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 10:37:05'),(30,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 10:37:15'),(31,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 10:37:17'),(32,1,'comment','User made a new comment in a profile thread','2025-05-31 10:54:29'),(33,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 10:55:02'),(34,3,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 11:00:16');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'General Discussion','Talk about anything here'),(2,'Programming','All things coding and development'),(3,'University Life','Discuss classes, exams, and campus life'),(4,'Career & Jobs','Share job opportunities and advice'),(5,'Entertainment','Movies, music, games and more'),(6,'General Discussion','General topics and discussions about IU'),(7,'Academic','Academic discussions and course-related topics'),(8,'Frontend Development','Topics related to HTML, CSS, and client-side JavaScript'),(9,'Backend Development','Server-side topics including Node.js, databases, and APIs'),(10,'Web Security','Security best practices, vulnerabilities, and mitigation'),(11,'Performance Optimization','Improving speed and efficiency of web applications');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_tag`
--

DROP TABLE IF EXISTS `category_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_tag` (
  `category_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `category_tag_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `category_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_tag`
--

LOCK TABLES `category_tag` WRITE;
/*!40000 ALTER TABLE `category_tag` DISABLE KEYS */;
INSERT INTO `category_tag` VALUES (8,1),(9,1),(9,2),(8,3),(8,4),(9,5),(10,6),(11,7);
/*!40000 ALTER TABLE `category_tag` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'First comment to kick off the thread.','2025-05-19 12:19:36'),(2,1,1,'Totally agree! SQL is super useful in data analysis.','2025-05-19 12:19:57'),(3,5,1,'<p>AAA</p>','2025-05-19 12:48:25'),(4,6,1,'<p>AAA</p>','2025-05-19 12:48:45'),(5,7,1,'<p>AAA</p>','2025-05-19 12:49:04'),(6,8,1,'<p>AAA</p>','2025-05-19 12:59:21'),(8,5,1,'<p>BBB</p>','2025-05-19 16:07:26'),(9,13,1,'I find that creating a study schedule and breaking down topics into smaller chunks works really well. Also, practice tests are super helpful!','2024-03-14 17:00:00'),(10,13,1,'Don\'t forget to take breaks! The Pomodoro technique (25 minutes study, 5 minutes break) has been a game-changer for me.','2024-03-14 17:00:00'),(11,20,1,'<p>BBBB</p>','2025-05-22 12:45:16'),(12,22,1,'<p>A</p>','2025-05-25 15:40:45'),(13,22,1,'<p>A</p>','2025-05-25 15:42:23'),(14,22,1,'<p>A</p>','2025-05-25 15:42:37'),(15,22,1,'<p>VVVV</p>','2025-05-25 15:42:46'),(16,5,1,'<p>C</p>','2025-05-26 12:20:31'),(17,5,1,'<p>C</p>','2025-05-26 12:21:07'),(18,5,1,'<p>C</p>','2025-05-26 12:27:47'),(19,5,1,'<p>C</p>','2025-05-26 12:28:48'),(20,24,1,'<p>AAA</p>','2025-05-26 12:29:18'),(21,1,1,'<p>Hello</p>','2025-05-31 07:34:12'),(22,1,1,'<p>Test</p>','2025-05-31 07:38:35'),(23,1,1,'<p>T</p>','2025-05-31 07:39:54'),(24,1,1,'<p>T1</p>','2025-05-31 07:40:17'),(25,1,1,'<p>Thử xem</p>','2025-05-31 07:40:55'),(26,1,1,'<p>Test1</p>','2025-05-31 08:29:13'),(27,1,1,'<p>Test1</p>','2025-05-31 08:29:24'),(28,1,1,'<p>1</p>','2025-05-31 08:29:52'),(29,1,1,'<p>2</p>','2025-05-31 08:39:04'),(30,40,1,'<p>aaa</p>','2025-05-31 10:37:15'),(31,40,1,'<p>aaaaa</p>','2025-05-31 10:37:17'),(32,5,1,'<p>a</p>','2025-05-31 10:53:00'),(33,5,1,'<p>a</p>','2025-05-31 10:53:19'),(34,5,1,'<p>a</p>','2025-05-31 10:54:29'),(35,40,1,'<p>aaa</p>','2025-05-31 10:55:01'),(36,40,3,'<p>hello</p>','2025-05-31 10:57:24'),(37,40,3,'<p>hello</p>','2025-05-31 10:59:23'),(38,40,3,'<p>hello</p>','2025-05-31 10:59:45'),(39,40,3,'<p>hello</p>','2025-05-31 10:59:55'),(40,40,3,'<p>hello</p>','2025-05-31 11:00:15');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `link` varchar(255) NOT NULL,
  `thread_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,1,'/uploads/1748275033298-544732338-download (1).jpg',NULL),(2,2,'/uploads/1748582795520-85399302-Máº«u-3.docx',31),(3,2,'/uploads/1748582844583-426225660-HÆ°á»ng dáº«n reg Google One 30T.docx',32),(4,1,'/uploads/1748674514191-987932416-Chúc Mừng Năm Mới.txt',35),(5,1,'/uploads/1748674647742-737020268-Chúc Mừng Năm Mới.txt',36),(6,1,'/uploads/1748681261707-78834210-Chúc Mừng Năm Mới.txt',37),(7,1,'/uploads/1748687825118-211601428-Chúc Mừng Năm Mới.txt',40);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
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
-- Table structure for table `follow_thread`
--

DROP TABLE IF EXISTS `follow_thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_thread` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `thread_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `thread_id` (`thread_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `follow_thread_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `follow_thread_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_thread`
--

LOCK TABLES `follow_thread` WRITE;
/*!40000 ALTER TABLE `follow_thread` DISABLE KEYS */;
INSERT INTO `follow_thread` VALUES (1,28,1,'2025-05-26 22:57:13'),(2,30,2,'2025-05-30 12:00:50'),(3,31,2,'2025-05-30 12:26:35'),(4,32,2,'2025-05-30 12:27:24'),(5,35,1,'2025-05-31 13:55:14'),(6,36,1,'2025-05-31 13:57:27'),(7,37,1,'2025-05-31 15:47:41'),(8,38,1,'2025-05-31 16:01:52'),(9,39,1,'2025-05-31 16:02:24'),(10,40,1,'2025-05-31 17:37:05');
/*!40000 ALTER TABLE `follow_thread` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,40,1,NULL,30,NULL,'a new reply/ comment is added in your thread \'Thử 5\'',1,'2025-05-31 10:37:15',0,0,1,1,0),(2,40,1,NULL,31,NULL,'a new reply/ comment is added in your thread \'Thử 5\'',1,'2025-05-31 10:37:17',0,0,1,1,0),(3,5,1,NULL,34,NULL,'a new reply/ comment is added in your profile thread by yourself',1,'2025-05-31 10:54:29',0,0,1,1,0),(4,40,1,NULL,35,NULL,'a new reply/ comment is added in your thread \'Thử 5\' by yourself',1,'2025-05-31 10:55:02',0,0,1,1,0),(5,40,1,NULL,40,NULL,'a new comment is added in \'Thử 5\' by user \'ngthien\'',NULL,'2025-05-31 11:00:16',0,0,1,0,0);
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
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'JavaScript'),(2,'Node.js'),(3,'React'),(4,'CSS'),(5,'MySQL'),(6,'Security'),(7,'Performance');
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
  `title` text,
  `image` varchar(255) DEFAULT NULL,
  `responses` int DEFAULT '0',
  `views` int DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` datetime DEFAULT NULL,
  `description` text,
  `content` varchar(12000) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `topic_id` (`topic_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`),
  CONSTRAINT `thread_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,1,1,'This is a new thread discussing the benefits of learning SQL.',NULL,11,0,'2025-05-19 12:19:13','2025-05-31 15:39:04','a',NULL),(5,NULL,1,'<p>AAA</p>',NULL,3,0,'2025-05-19 12:48:25','2025-05-31 17:54:29','b',NULL),(6,NULL,1,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:48:45','2025-05-20 22:33:36','b',NULL),(7,NULL,1,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:49:04','2025-05-20 22:33:36','c',NULL),(8,NULL,1,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:59:21','2025-05-20 22:33:36','d',NULL),(13,6,1,'How to prepare for final exams?',NULL,12,0,'2024-03-14 17:00:00','2025-05-21 17:07:43',NULL,'I\'m looking for advice on how to effectively prepare for my upcoming final exams. What study techniques have worked best for you?'),(14,6,1,'Best study spots on campus',NULL,8,0,'2024-03-13 17:00:00','2025-05-21 17:07:43',NULL,NULL),(15,7,1,'Spring Festival 2024 - Event Details and Schedule',NULL,45,0,'2024-03-09 17:00:00','2025-05-21 17:08:00','Complete schedule and information about the upcoming Spring Festival',NULL),(16,7,1,'New Student Club: Photography Enthusiasts',NULL,23,0,'2024-03-11 17:00:00','2025-05-21 17:08:00','Join our new photography club! Weekly meetups and workshops',NULL),(17,7,1,'Campus Food Court Renovation Updates',NULL,67,0,'2024-03-12 17:00:00','2025-05-21 17:08:00','Latest updates on the food court renovation project',NULL),(18,7,1,'International Students Meet & Greet',NULL,34,0,'2024-03-13 17:00:00','2025-05-21 17:08:00','Monthly meetup for international students',NULL),(19,7,1,'Sports Complex Opening Hours',NULL,12,0,'2024-03-14 17:00:00','2025-05-21 17:08:00','Updated opening hours and available facilities',NULL),(20,NULL,1,NULL,NULL,0,0,'2025-05-22 12:45:16',NULL,NULL,'<p>BBBB</p>'),(21,NULL,1,NULL,NULL,0,0,'2025-05-22 12:46:40',NULL,NULL,'<p>BBBB</p>'),(22,NULL,1,NULL,NULL,0,0,'2025-05-22 12:47:00',NULL,NULL,'<p>BBBB</p>'),(23,NULL,1,NULL,NULL,0,0,'2025-05-26 12:19:11',NULL,NULL,'<p>A</p>'),(24,NULL,1,NULL,NULL,0,0,'2025-05-26 12:29:08',NULL,NULL,'<p>C</p>'),(25,2,1,'aaaa',NULL,0,0,'2025-05-26 14:53:26',NULL,NULL,'<p>aaaaa</p>'),(26,2,1,'<p>aaaaa</p>',NULL,0,0,'2025-05-26 15:52:42',NULL,'aaaa','<p>aaaaa</p>'),(27,2,1,'<p>aaaaa</p>',NULL,0,0,'2025-05-26 15:53:30',NULL,'aaaa','<p>aaaaa</p>'),(28,1,1,'<p>AAAAA</p>',NULL,0,0,'2025-05-26 15:57:13',NULL,'AAAAA','<p>AAAA</p>'),(29,NULL,2,'<p>Zs</p>',NULL,0,0,'2025-05-30 04:44:28',NULL,NULL,NULL),(30,1,2,'AAAASDASD',NULL,0,0,'2025-05-30 05:00:49',NULL,'u stoobid','u stoobid'),(31,1,2,'asd',NULL,0,0,'2025-05-30 05:26:35',NULL,'asdasd','asdadaasd'),(32,1,2,'concac',NULL,0,0,'2025-05-30 05:27:24',NULL,'concac','concac'),(33,NULL,1,'<p>Test 1</p>',NULL,0,0,'2025-05-31 06:11:42',NULL,NULL,NULL),(34,NULL,1,NULL,NULL,0,0,'2025-05-31 06:15:15',NULL,NULL,'<p>Test 2</p>'),(35,1,1,'Thử Nghiệm 01','Thử 1',0,0,'2025-05-31 06:55:14',NULL,'Thử 1',NULL),(36,1,1,'Thử 2','Thử 2',0,0,'2025-05-31 06:57:27',NULL,'Thử 2',NULL),(37,1,1,'Thử 3','Xin chào',0,0,'2025-05-31 08:47:41','2025-05-31 15:47:41','Xin chào',NULL),(38,1,1,'Thử 4','a',0,0,'2025-05-31 09:01:52','2025-05-31 16:01:52','a',NULL),(39,1,1,'Thử 4','a',0,0,'2025-05-31 09:02:24','2025-05-31 16:02:24','a',NULL),(40,1,1,'Thử 5','aa',8,0,'2025-05-31 10:37:05','2025-05-31 18:00:15','aaa',NULL);
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
INSERT INTO `thread_tag` VALUES (35,1),(36,1),(38,1),(39,1),(37,2),(39,2),(28,3),(40,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,1,1,'Welcome to the forum!','Introduce yourself here.','2025-05-19 12:12:28','2025-05-31 18:00:15'),(2,2,2,'Best resources to learn Go?','Share tutorials, YouTube channels, or books.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(3,3,1,'Tips for surviving finals','Drop your best study tips and coping mechanisms.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(4,4,3,'Internship openings Summer 2025','Post or ask about internship opportunities.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(5,5,2,'What’s your favorite movie this year?','Let’s talk about recent releases and hidden gems.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(6,6,1,'Welcome to IU Forum','Introduce yourself and get to know other members','2025-05-21 08:20:57','2025-05-21 13:20:57'),(7,6,1,'Campus Life','Discuss campus events, activities, and student life','2025-05-21 08:20:57','2025-05-20 15:20:57'),(8,7,1,'Course Registration','Questions and discussions about course registration','2025-05-21 08:20:57','2025-05-21 12:20:57'),(9,7,1,'Study Groups','Find study partners and form study groups','2025-05-21 08:20:57','2025-05-21 10:20:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'thien','thien','/img/avt/avatar-1748493438164-727436741.png',NULL,NULL,NULL,'AAAA',0,'2025-05-19 10:39:44','2025-05-31 18:01:04',0,0,0,'Member','Street 10, Truong Tho District, Thu Duc, TPHCM','Student','https://x.com/','https://www.linkedin.com/feed/','https://rebalon.github.io/'),(2,'minhduc','Duke','/img/avt/avatar-1748580222334-779726913.png',NULL,NULL,NULL,NULL,0,'2025-05-29 10:47:14','2025-05-30 11:13:56',0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(3,'ngthien','Nguyễn Văn Lạc Thiên',NULL,NULL,NULL,NULL,NULL,0,'2025-05-31 10:56:21','2025-05-31 17:56:58',0,0,0,'Member',NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credentials`
--

LOCK TABLES `user_credentials` WRITE;
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
INSERT INTO `user_credentials` VALUES (1,'ngthien0929@gmail.com','$2b$10$TE8thjp2d9ILUQx//WCkFOT9mW.kr8q1zIgG/cdPv9VzkVMhybLCO',1),(2,'itcsiu22218@student.hcmiu.edu.vn','$2b$10$GRBSA0Z5pTWRq/FJi6ADmOjrt5w8dIR8fH1kJYJzrxthfYGd/2mvm',2),(3,'ITCSIU22245@student.hcmiu.edu.vn','$2b$10$A46SZhvrFhkeRdJCFaQd4O0mhomeKZv4dPuyX35TBHyHZuVNPEl4K',3);
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

-- Dump completed on 2025-05-31 18:01:47
