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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,1,'post','User posted a new profile post','2025-05-19 12:48:25'),(2,1,'post','User posted a new profile post','2025-05-19 12:48:45'),(3,1,'post','User posted a new profile post','2025-05-19 12:49:04'),(4,1,'post','User posted a new profile post','2025-05-19 12:59:21'),(5,1,'comment','User made a new comment in a thread in undefined','2025-05-19 13:02:14'),(6,1,'comment','User made a new comment in a thread in undefined','2025-05-19 16:07:27'),(7,1,'post','User posted a new profile post','2025-05-22 12:47:00'),(8,1,'comment','User made a new comment in a thread in undefined','2025-05-25 15:42:37'),(9,1,'comment','User made a new comment in a thread in undefined','2025-05-25 15:42:46'),(10,1,'post','User posted a new profile thread','2025-05-26 12:19:11'),(11,1,'comment','User made a new comment in a profile thread','2025-05-26 12:28:48'),(12,1,'post','User posted a new profile thread','2025-05-26 12:29:08'),(13,1,'comment','User made a new comment in a profile thread','2025-05-26 12:29:18'),(14,2,'post','User posted a new profile thread','2025-05-30 04:44:28'),(15,1,'post','User posted a new profile thread','2025-05-31 06:11:42'),(16,1,'post','User posted a new profile thread','2025-05-31 06:15:15'),(17,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 06:57:27'),(18,1,'comment','User made a new comment in a profile thread','2025-05-31 07:34:12'),(19,1,'comment','User made a new comment in a profile thread','2025-05-31 07:38:35'),(20,1,'comment','User made a new comment in a profile thread','2025-05-31 07:39:54'),(21,1,'comment','User made a new comment in a thread \'undefined\' in topic \'Welcome to the forum!\'','2025-05-31 07:40:17'),(22,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 07:40:55'),(23,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 08:29:24'),(24,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 08:29:52'),(25,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 08:39:04'),(26,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 08:47:41'),(27,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 09:01:52'),(28,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 09:02:24'),(29,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 10:37:05'),(30,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 10:37:15'),(31,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 10:37:17'),(32,1,'comment','User made a new comment in a profile thread','2025-05-31 10:54:29'),(33,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 10:55:02'),(34,3,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 11:00:16'),(35,1,'comment','User made a new comment in a profile thread','2025-05-31 12:07:27'),(36,1,'comment','User made a new comment in a profile thread','2025-05-31 12:10:00'),(37,3,'comment','User made a new comment in a profile thread','2025-05-31 12:16:31'),(38,1,'comment','User made a new comment in a profile thread','2025-05-31 12:25:29'),(39,1,'comment','User made a new comment in a profile thread','2025-05-31 12:27:24'),(40,1,'comment','User made a new comment in a profile thread of user \'thien\'','2025-05-31 12:32:47'),(41,3,'comment','User made a new comment in a profile thread of user \'thien\'','2025-05-31 12:34:36'),(42,3,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-05-31 12:35:18'),(43,3,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 12:36:02'),(44,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 13:00:06'),(45,1,'comment','User made a new comment in a thread \'Thử 5\' in topic \'Welcome to the forum!\'','2025-05-31 13:01:03'),(46,1,'post','User posted a new thread in topic Welcome to the forum!','2025-05-31 16:41:58'),(47,1,'comment','User made a new comment in a profile thread of user \'minhduc\'','2025-05-31 17:37:02'),(48,1,'comment','User made a new comment in a profile thread of user \'minhduc\'','2025-05-31 17:37:19'),(49,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-06-01 04:40:38'),(50,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-06-01 04:44:00'),(51,1,'post','User posted a new thread in topic Welcome to the forum!','2025-06-01 05:38:31'),(52,1,'post','User posted a new thread in topic Welcome to the forum!','2025-06-01 05:39:26'),(53,1,'post','User posted a new thread in topic Welcome to the forum!','2025-06-01 05:49:28'),(54,1,'post','User posted a new thread in topic Welcome to the forum!','2025-06-01 05:53:46'),(55,1,'comment','User made a new comment in a thread \'This is a new thread discussing the benefits of learning SQL.\' in topic \'Welcome to the forum!\'','2025-06-01 06:37:29'),(56,1,'comment','User made a new comment in a thread \'Thu3\' in topic \'Welcome to the forum!\'','2025-06-01 06:47:47');
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
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `president_id` int DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `president_id` (`president_id`),
  CONSTRAINT `club_ibfk_1` FOREIGN KEY (`president_id`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (1,'Charity Office of Student Services (COSS)','A Club under the Student Affairs Department with the purpose of creating a bridge between students and the school. A place where IUers can come to share and answer questions about studying, working as well as in life, especially for new students. Outstanding activities of the year: Organizing Team Building journey to the source. Guiding Campus Tour. Opening tutor classes for exam preparation. Organizing IU JOB FAIR and Cultural Exchange program. Organizing exchange seminars, introducing internship job opportunities, ...',NULL,'https://www.facebook.com/IU.COSS/','2025-06-01 04:54:56','/img/Club_Logo/COSS.png'),(2,'Help To Be Helped (H2BH)','IU Help To Be Helped Club is a club under the Student Affairs Department of International University - Ho Chi Minh National University, established in 2013. The structure of the club includes three branches: Operations, Marketing and Human Resources. IU Help To Be Help identifies the main orientation and activities including: Helping and supporting IUers with difficulties (in the areas of living, studying and life) that you have to face during your years at IU; Sharing hot and useful information for students to respond promptly and accurately. Through organizing many diverse archival, learning and entertainment activities, IU Help To Be Help aims to become an effective \"bridge\" between students - students and students - the school. On the other hand, the club is also a professional and friendly environment for members to have the opportunity to test, practice and improve themselves as well as expand relationships through organizing events and activities together (such as charity programs - Cinema of Hong; member bonding sessions - H2BH\'S Bonding; organizing booths at The Fifth Season...).',NULL,'https://www.facebook.com/helptobehelped','2025-06-01 04:54:56','/img/Club_Logo/H2BH.jpg'),(3,'Team of Office of Student Affairs (TOSA)','As a club supporting the activities of the Student Affairs Department, TOSA participates in organizing ID photos and supporting the application process for new students. In addition, it also organizes a trip to the source with H2BH to create a bridge between new students in a new environment. Activities organized during the year include soft skills, the journey to the source (going to Cu Chi), supporting the organization of the civic learning week, and supporting Job Fair, IU Info Day, and some other major events with H2BH.',NULL,'https://www.facebook.com/iuTosa/','2025-06-01 04:54:56','/img/Club_Logo/TOSA.jpg'),(4,'IU Technique','Technique specializes in photography and supporting students in major events of the Student Affairs Department. There have been many outstanding activities such as taking photos for IUers to make student ID cards, participating in supporting the organization of the Journey to the Source, taking photos in major activities and events of the school, etc.',NULL,'https://www.facebook.com/iutechnique/','2025-06-01 04:54:56','/img/Club_Logo/IUT.jpg'),(5,'IU Event Management Club (EMC)','Also known as the Event Management Club, it is the only club under the Youth Union of International University - VNU-HCM. The club was formerly known as IU Event Department (Event Organizing Committee) with the task of organizing events as a bridge between students and the Youth Union, with events that left a certain echo and mark not only for International University but also for schools in the National University block such as: IU Singer, Mr.&Ms. IU, IU Cooking, Feast Ceremony 2010 for Green Campaign volunteer, Cultural Exchanges Festival, IU 10th Year Anniversary, The Road Run of Willpower - VNU WILL',NULL,'https://www.facebook.com/EMC.eventclub/','2025-06-01 04:54:56','/img/Club_Logo/EMC.jpg'),(6,'IU Marketing Club (Martic)','The common home of IU students who are passionate about the \"hundred-family\" career of Marketing, not only gather in the \"second common home\" at IU, train themselves but also learn more about Marketing theory and practice in the first completely English academic environment at IU. In addition, in the past year, MARTIC had outstanding activities such as Nielsen Case Competition, Marketing Workshop: Big Picture, SPSS Workshop.',NULL,'https://www.facebook.com/iumartic/','2025-06-01 07:27:52','/img/Club_Logo/MARTIC.jpg'),(7,'Soft Skills Club (SSC)','First year but confident enough to organize seminars and run programs with hundreds of participants? Coming to SSC, nothing is impossible. With the slogan \"Sharing For Success\", IU Soft Skills Club (SSC) is a professional but friendly Skills Club. As a part of SSC, you will become disciplined members with high team spirit. In addition, enthusiasm and responsibility are always the prerequisites to maintain the Club until now. Coming to SSC, you not only have the opportunity to make friends with other talented people, but also have a good environment to study and practice useful skills for the future.',NULL,'https://www.facebook.com/SoftSkillsClubIU/','2025-06-01 07:40:24','/img/Club_Logo/SSC.jpg'),(8,'Enactus IU (formerly SIFE IU)','An organization that brings together students guided by academic advisors and business experts who are committed to using the power of business action to improve the environment and quality of life. Enactus has had activities and projects that contribute to promoting environmental protection and reducing plastic waste such as: Gplus project, Challenge',NULL,'https://www.facebook.com/profile.php?id=100092312352951/','2025-06-01 07:40:24','/img/Club_Logo/ENACTUSIU.jpg'),(9,'English Teaching Volunteers (ETV)','Coming to ETV, you will contribute: Bringing English to children and workers without conditions. IU Spelling Bee & Discover The World – two of IU\'s biggest English competitions.',NULL,'https://www.facebook.com/IU.ETV/','2025-06-01 07:40:24','/img/Club_Logo/ETV.jpg'),(10,'Social Work Team (SWT)','As a club specializing in volunteer activities. Red is the color of warmth, and SWT is the same, carrying the mission of bringing joy, happiness, and breathing a little miracle into the lives of those in difficult circumstances.',NULL,'https://www.facebook.com/IUswt.link/','2025-06-01 07:40:24','/img/Club_Logo/SWT.jpg'),(11,'English Speaking Club IU (ESC)',NULL,NULL,'https://www.facebook.com/esc.hcmiu/','2025-06-01 07:40:24','/img/Club_Logo/ESC.jpg'),(12,'English Club (IEC)','As an English club at IU, it specializes in academics, organizing events and activities related to English. IEC consists of 3 main committees: Human Resources, Marketing and Content.',NULL,'https://www.facebook.com/IU.IEC/','2025-06-01 07:40:24','/img/Club_Logo/IEC.jpg'),(13,'IU Buddy','As a club under the Department of External Relations, it was established with the mission of supporting international students and exchange students studying at the school. If you love Vietnamese culture, or simply want to help people, then apply to IU Buddy.',NULL,'https://www.facebook.com/IU.buddyclub/','2025-06-01 07:40:24','/img/Club_Logo/IUBUDDY.png'),(14,'IU Japan Club','Do you love Japan - the land of cherry blossoms? A country with captivating beauty in every aspect, from culture, life, spirit of the Japanese people,... or more closely related to IUers, Manga/Anime, tea ceremony, Kendo, painting, cuisine, cosplay, music,... Those are the fields that our IU Japan Club (IUJC) is working on, sounds so attractive, right!! Let\'s chat about our hobbies, learn more knowledge, practice teamwork skills, and also let loose with the extremely friendly and cute management board, guys!! ヾ(๑╹◡╹)ﾉ”',NULL,'https://www.facebook.com/IUJapanClub/','2025-06-01 07:40:24','/img/Club_Logo/IUJAPANCLUB.jpg'),(15,'Korean Club (KYG)','As a club specializing in the land of ginseng, IU K.Y.G will be an ideal place for KPOP fans and those who love Korean culture to join. Established in 2014, IU K.Y.G focuses on providing information about Korean music, entertainment and culture. In addition, the club also organizes showcases and meetings for everyone who shares the same passion for the country of unni oppas to interact such as THE MEMORIES, Makeup Workshop',NULL,'https://www.facebook.com/koreanyouthgeneration/','2025-06-01 07:40:24','/img/Club_Logo/KYG.jpg'),(16,'French Club','A great place for IUERS to learn more French with FRANCE CLASS, there are also attractive activities such as Learn about France, Be my white valentine program,...',NULL,'https://www.facebook.com/french.club.iu/','2025-06-01 07:40:24','/img/Club_Logo/FRENCHCLUB.jpg'),(17,'Đoàn-Hội Khoa Quản Trị Kinh Doanh-DHQT',NULL,NULL,'https://www.facebook.com/doankhoabaiu/','2025-06-01 07:40:24','/img/Club_Logo/BAIU.jpg'),(18,'IU Inspirit','is an art and volunteer club, where you can grow up while studying at the new school IU because you can not only perfect yourself with your passion for art but you can also participate in activities you have never experienced before. IU Inspirit events have organized: Green Children\'s Shelter, Winter Show - Dreamland, Spring Brings Joy, The Connexion Show, La La Land Show,...',NULL,'https://www.facebook.com/inspirit.iuclub/','2025-06-01 07:40:24','/img/Club_Logo/IUINSPIRIT.jpg'),(19,'ArTeam','National Cheerleading Champion, National Student Singing Champion, VUG Dance Battle Runner-up. In addition to the above outstanding achievements, IU ArTeam will be a home for you to exchange, nurture your passion and express the spirit of an IU-er on big stages and arenas.',NULL,'https://www.facebook.com/arteam.iu/','2025-06-01 07:40:24','/img/Club_Logo/ArTEAM.jpg'),(20,'ISE Art Club','As an art club with the motto “Sing to Share”, it gives members the opportunity to try their hand at their favorite fields, thereby discovering and expressing the personality, ability and bravery of each member. Events that ISE Art Club has organized: Mini Showcase – The Blooming, ISE Camping, Showcase – Behind the door,…',NULL,'https://www.facebook.com/artclubiem/','2025-06-01 07:40:24','/img/Club_Logo/ISE.jpg'),(21,'IU Photography Club (IUPC)','The club aims to create a playground for those who love and are passionate about cameras and the artistic moments captured in photos. In addition, this is also a place for you to exchange and share experiences, passions, and techniques in photography and post-production.',NULL,'https://www.facebook.com/IUPhotoClub','2025-06-01 07:40:24','/img/Club_Logo/IUPC.jpg'),(22,'Guitar Club (GC)','As an art club with a variety of musical instruments and genres, GC always puts passion and brotherhood and sisterhood first. Therefore, GC is also an ideal home for IUers to experience and practice skills through organizing art and social events such as the Carol Of The Strings Musical (the most popular program of the year), monthly Acoustic Coffee sessions at Coffee Story.',NULL,'https://www.facebook.com/groups/1065829624331762/user/100093603603755/','2025-06-01 07:40:24','/img/Club_Logo/GC.jpg'),(23,'Cheerleading Team (LUMB)',NULL,NULL,'https://www.facebook.com/IU.LUMB/','2025-06-01 07:40:24','/img/Club_Logo/LUMB.jpg'),(24,'Sports Club (SC)',NULL,NULL,'https://www.facebook.com/IUSportsClub/','2025-06-01 07:40:24','/img/Club_Logo/SC.jpg'),(25,'IU Badminton Club','The club was founded in 2012, for all IUers who are interested and passionate about badminton. Joining the club, you will have the opportunity to improve your badminton skills and participate in tournaments, from school level to national university level. That not only helps you improve your skills but is also a great time for you to rub shoulders and accumulate experience.',NULL,'https://www.facebook.com/IuBadmintonClub/','2025-06-01 07:40:24','/img/Club_Logo/IUBADMINTONCLUB.jpg'),(26,'IU Football Club','Full of passion and energy. Become a part of the Team that loves football, the field, and the fans, you will have the opportunity to participate in many great tournaments. There has been IU League 2019, IU TOURNAMENT 2017,...',NULL,'https://www.facebook.com/IUFootballClub/','2025-06-01 07:40:24','/img/Club_Logo/IUFOOTBALLCLUB.jpg'),(27,'IU Competitive Esports Club (CEC)','It is an E-Sports Club that organizes many tournaments such as International University League of Legends, ROG University League, IU True Gaming 2017,...',NULL,'https://www.facebook.com/IUEsports/','2025-06-01 07:40:24','/img/Club_Logo/CEC.jpg'),(28,'Flagship Startup Club','As a Startup Club under the Faculty of Business Administration, it was established with the aim of connecting students who share the same passion, interests, and desire to learn practical knowledge and experience in business and startups. Over the years, Flagship has created many useful playground programs to help and support all students inside and outside the school, supplementing knowledge and professional skills in startups, and adding courage to young startups.',NULL,'https://www.facebook.com/flagshipstartupclub/','2025-06-01 07:40:24','/img/Club_Logo/FLAGSHIP.jpg'),(29,'IU The Heroes','An academic club with the desire to share knowledge with everyone, support students with difficulties in many subjects, such as: Calculus 1 and 2, Microeconomics, Financial Accounting,...',NULL,'https://www.facebook.com/IUTheHeroes/','2025-06-01 07:40:24','/img/Club_Logo/IUTHEHERO.jpg'),(30,'IU Finance Club (IUFC)','This is a new academic club of VNU dedicated to students who are passionate about learning about the fields of economics and finance. The purpose of the club is to create an environment for students to share and improve their knowledge and expertise. The club also gives students the opportunity to meet experts in the industry as well as large businesses to help them define their career goals and expand their future career opportunities.',NULL,'https://www.facebook.com/iufinanceclub/','2025-06-01 07:40:24','/img/Club_Logo/IUFC.jpg'),(31,'IU Ping Pong','The Table Tennis Club aims at two main goals: creating a common playground for students who love table tennis in the school and training a team of athletes to compete in table tennis tournaments in the city. In addition, students participating in the club also regularly help other students overcome Physical Training - Table Tennis.',NULL,'https://www.facebook.com/profile.php?id=100054462550590#','2025-06-01 07:40:24','/img/Club_Logo/IUPINGPONG.jpg'),(32,'Papahana (IU Boardgame Club - unofficial)','is Boardgame Club, established with the core purpose of creating a healthy Boardgame playground. At the same time, Papahana also brings you detailed information about types of boardame, basic playing instructions and facts about boardgame, the purpose is for everyone to understand boardgame better, as well as create a more serious competitive environment.',NULL,'https://www.facebook.com/papahana.iuboardgameclub/','2025-06-01 07:40:24','/img/Club_Logo/IUBOARDGAME.jpg'),(33,'IU Street Workout (S.I.B Team)','A group of students with a burning passion for the bar and beautiful skills',NULL,'https://www.facebook.com/IUstreetworkout/','2025-06-01 07:40:24','/img/Club_Logo/SIBTEAM.jpg'),(34,'Student Recruitment Campaign (SRC)','An organization under the University Training Department. The uniform is familiar to high school students from major admission events such as Admissions Information Day at the University of Science and Technology, Can Tho University, ... to admissions consulting groups at high schools, admission application reception periods, Aptitude test records, and support during Infoday. In addition, IU Admissions Consulting also organizes many activities to visit and learn about International University for high school students, one of the outstanding events is \"IU One-day Field Trip\", ... Becoming a member of the organization is an opportunity for students to return to high school as Ambassadors of International University, an opportunity for them to learn and equip themselves with many necessary skills to develop themselves. SRC is a place for you to step out of your comfort zone. Come to IU SRC and prove yourself!\nhttps://www.facebook.com/iu.tvts/',NULL,'https://www.facebook.com/hcmiuoaa/posts/108389310506951 ','2025-06-01 07:40:24','/img/Club_Logo/SRC.png'),(35,'IU Ambassador (IUA)','As a Career Guidance - Admissions Consulting Club under the Student Affairs Department - International University. IUA is responsible for implementing career guidance - admissions consulting programs of International University and VNU-HCM at high schools nationwide; organizing consulting programs, admissions information days of Tuoi Tre, Thanh Nien, and Education newspapers; IU Tour and VNU Tour programs (2 days, 1 night or day tour) for high school students to visit and experience studying at International University and VNU-HCM, IU Summer Camp program for high school students, IU Student Ambassador programs to high schools, online admissions consulting programs, activities, competitions connecting high school students and IU students...',NULL,'https://www.facebook.com/dhqt.tvhnts','2025-06-01 07:40:24','/img/Club_Logo/IUA.jpg');
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'First comment to kick off the thread.','2025-05-19 12:19:36'),(2,1,1,'Totally agree! SQL is super useful in data analysis.','2025-05-19 12:19:57'),(3,5,1,'<p>AAA</p>','2025-05-19 12:48:25'),(4,6,1,'<p>AAA</p>','2025-05-19 12:48:45'),(5,7,1,'<p>AAA</p>','2025-05-19 12:49:04'),(6,8,1,'<p>AAA</p>','2025-05-19 12:59:21'),(8,5,1,'<p>BBB</p>','2025-05-19 16:07:26'),(9,13,1,'I find that creating a study schedule and breaking down topics into smaller chunks works really well. Also, practice tests are super helpful!','2024-03-14 17:00:00'),(10,13,1,'Don\'t forget to take breaks! The Pomodoro technique (25 minutes study, 5 minutes break) has been a game-changer for me.','2024-03-14 17:00:00'),(11,20,1,'<p>BBBB</p>','2025-05-22 12:45:16'),(12,22,1,'<p>A</p>','2025-05-25 15:40:45'),(13,22,1,'<p>A</p>','2025-05-25 15:42:23'),(14,22,1,'<p>A</p>','2025-05-25 15:42:37'),(15,22,1,'<p>VVVV</p>','2025-05-25 15:42:46'),(16,5,1,'<p>C</p>','2025-05-26 12:20:31'),(17,5,1,'<p>C</p>','2025-05-26 12:21:07'),(18,5,1,'<p>C</p>','2025-05-26 12:27:47'),(19,5,1,'<p>C</p>','2025-05-26 12:28:48'),(20,24,1,'<p>AAA</p>','2025-05-26 12:29:18'),(21,1,1,'<p>Hello</p>','2025-05-31 07:34:12'),(22,1,1,'<p>Test</p>','2025-05-31 07:38:35'),(23,1,1,'<p>T</p>','2025-05-31 07:39:54'),(24,1,1,'<p>T1</p>','2025-05-31 07:40:17'),(25,1,1,'<p>Thử xem</p>','2025-05-31 07:40:55'),(26,1,1,'<p>Test1</p>','2025-05-31 08:29:13'),(27,1,1,'<p>Test1</p>','2025-05-31 08:29:24'),(28,1,1,'<p>1</p>','2025-05-31 08:29:52'),(29,1,1,'<p>2</p>','2025-05-31 08:39:04'),(30,40,1,'<p>aaa</p>','2025-05-31 10:37:15'),(31,40,1,'<p>aaaaa</p>','2025-05-31 10:37:17'),(32,5,1,'<p>a</p>','2025-05-31 10:53:00'),(33,5,1,'<p>a</p>','2025-05-31 10:53:19'),(34,5,1,'<p>a</p>','2025-05-31 10:54:29'),(35,40,1,'<p>aaa</p>','2025-05-31 10:55:01'),(36,40,3,'<p>hello</p>','2025-05-31 10:57:24'),(37,40,3,'<p>hello</p>','2025-05-31 10:59:23'),(38,40,3,'<p>hello</p>','2025-05-31 10:59:45'),(39,40,3,'<p>hello</p>','2025-05-31 10:59:55'),(40,40,3,'<p>hello</p>','2025-05-31 11:00:15'),(41,5,1,'<p>a</p>','2025-05-31 12:07:27'),(42,5,1,'<p>b</p>','2025-05-31 12:10:00'),(43,5,3,'<p>c</p>','2025-05-31 12:16:31'),(44,5,1,'<p>d</p>','2025-05-31 12:25:29'),(45,5,3,'<p>e</p>','2025-05-31 12:27:24'),(46,5,3,'<p>f</p>','2025-05-31 12:32:47'),(47,5,3,'<p>g</p>','2025-05-31 12:34:36'),(48,1,3,'<p>aa</p>','2025-05-31 12:35:18'),(49,40,3,'<p>AAAA</p>','2025-05-31 12:36:02'),(50,40,1,'<p><br></p>','2025-05-31 13:00:06'),(51,40,1,'<p><br></p>','2025-05-31 13:01:03'),(52,29,1,'<p>aaa</p>','2025-05-31 17:37:02'),(53,29,1,'<p>bbb</p>','2025-05-31 17:37:19'),(54,1,1,'<p><img src=\"/img/Thread_Comment_Image/1748752838356-680417545.png\"><img src=\"https://media0.giphy.com/media/3o6ozvv0zsJskzOCbu/giphy.gif?cid=8a45e2669vxhtwcoynz5vnglzw7l7a66wk2ikxai17wz6w7v&amp;ep=v1_gifs_trending&amp;rid=giphy.gif&amp;ct=g\">a</p>','2025-06-01 04:40:38'),(55,1,1,'<p><img src=\"https://media0.giphy.com/media/VGtDZTl1GTColBHhvS/giphy.gif?cid=8a45e2669vxhtwcoynz5vnglzw7l7a66wk2ikxai17wz6w7v&amp;ep=v1_gifs_trending&amp;rid=giphy.gif&amp;ct=g\">a</p>','2025-06-01 04:44:00'),(56,1,1,'<p><img src=\"/img/Thread_Comment_Image/1748759849693-849109918.png\"></p>','2025-06-01 06:37:29');
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
  KEY `file_ibfk_2_idx` (`thread_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_thread`
--

LOCK TABLES `follow_thread` WRITE;
/*!40000 ALTER TABLE `follow_thread` DISABLE KEYS */;
INSERT INTO `follow_thread` VALUES (1,28,1,'2025-05-26 22:57:13'),(2,30,2,'2025-05-30 12:00:50'),(3,31,2,'2025-05-30 12:26:35'),(4,32,2,'2025-05-30 12:27:24'),(5,35,1,'2025-05-31 13:55:14'),(6,36,1,'2025-05-31 13:57:27'),(7,37,1,'2025-05-31 15:47:41'),(8,38,1,'2025-05-31 16:01:52'),(9,39,1,'2025-05-31 16:02:24'),(10,40,1,'2025-05-31 17:37:05'),(11,41,1,'2025-05-31 23:41:58'),(12,42,1,'2025-06-01 12:38:31'),(13,43,1,'2025-06-01 12:39:26'),(15,45,1,'2025-06-01 12:53:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,40,1,NULL,30,NULL,'a new reply/ comment is added in your thread \'Thử 5\'',1,'2025-05-31 10:37:15',0,0,1,1,0),(2,40,1,NULL,31,NULL,'a new reply/ comment is added in your thread \'Thử 5\'',1,'2025-05-31 10:37:17',0,0,1,1,0),(3,5,1,NULL,34,NULL,'a new reply/ comment is added in your profile thread by yourself',1,'2025-05-31 10:54:29',0,0,1,1,0),(4,40,1,NULL,35,NULL,'a new reply/ comment is added in your thread \'Thử 5\' by yourself',1,'2025-05-31 10:55:02',0,0,1,1,0),(5,40,1,NULL,40,NULL,'a new comment is added in \'Thử 5\' by user \'ngthien\'',1,'2025-05-31 11:00:16',0,0,1,0,0),(6,5,1,NULL,41,NULL,'a new reply/ comment is added in your profile thread by yourself',1,'2025-05-31 12:07:27',0,0,1,1,0),(7,5,1,NULL,42,NULL,'a new reply/ comment is added in your profile thread by yourself',1,'2025-05-31 12:10:00',0,0,1,1,0),(8,5,3,NULL,43,NULL,'a new comment is added in your profile thread by user \'ngthien\'',1,'2025-05-31 12:16:31',0,0,1,0,0),(9,5,1,NULL,44,NULL,'a new comment is added in your profile thread by user \'ngthien\'',1,'2025-05-31 12:25:29',0,0,1,0,0),(10,5,1,NULL,45,NULL,'a new comment is added in your profile thread by user \'ngthien\'',1,'2025-05-31 12:27:24',0,0,1,0,0),(11,5,1,NULL,46,NULL,'a new comment is added in your profile thread by user \'ngthien\'',1,'2025-05-31 12:32:47',0,0,1,0,0),(12,5,1,NULL,47,NULL,'a new comment is added in your profile thread by user \'ngthien\'',1,'2025-05-31 12:34:36',0,0,1,0,0),(13,40,1,NULL,49,NULL,'a new comment is added in \'Thử 5\' by user \'ngthien\'',1,'2025-05-31 12:36:02',0,0,1,0,0),(14,40,1,NULL,50,NULL,'a new reply/ comment is added in your thread \'Thử 5\' by yourself',1,'2025-05-31 13:00:06',0,0,1,1,0),(15,40,1,NULL,51,NULL,'a new reply/ comment is added in your thread \'Thử 5\' by yourself',1,'2025-05-31 13:01:03',0,0,1,1,0),(16,29,2,NULL,52,NULL,'a new comment is added in your profile thread by user \'thien\'',NULL,'2025-05-31 17:37:02',0,0,1,0,0),(17,29,2,NULL,53,NULL,'a new comment is added in your profile thread by user \'thien\'',NULL,'2025-05-31 17:37:19',0,0,1,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,1,1,'This is a new thread discussing the benefits of learning SQL.',NULL,15,0,'2025-05-19 12:19:13','2025-06-01 13:37:29','What can be consider the benefits of SQL?','<p>I am current ....</p>'),(5,NULL,1,'<p>AAA</p>',NULL,10,0,'2025-05-19 12:48:25','2025-05-31 19:34:36','b',NULL),(6,NULL,1,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:48:45','2025-05-20 22:33:36','b',NULL),(7,NULL,1,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:49:04','2025-05-20 22:33:36','c',NULL),(8,NULL,1,'<p>AAA</p>',NULL,0,0,'2025-05-19 12:59:21','2025-05-20 22:33:36','d',NULL),(13,6,1,'How to prepare for final exams?',NULL,12,0,'2024-03-14 17:00:00','2025-05-21 17:07:43',NULL,'I\'m looking for advice on how to effectively prepare for my upcoming final exams. What study techniques have worked best for you?'),(14,6,1,'Best study spots on campus',NULL,8,0,'2024-03-13 17:00:00','2025-05-21 17:07:43',NULL,NULL),(15,7,1,'Spring Festival 2024 - Event Details and Schedule',NULL,45,0,'2024-03-09 17:00:00','2025-05-21 17:08:00','Complete schedule and information about the upcoming Spring Festival',NULL),(16,7,1,'New Student Club: Photography Enthusiasts',NULL,23,0,'2024-03-11 17:00:00','2025-05-21 17:08:00','Join our new photography club! Weekly meetups and workshops',NULL),(17,7,1,'Campus Food Court Renovation Updates',NULL,67,0,'2024-03-12 17:00:00','2025-05-21 17:08:00','Latest updates on the food court renovation project',NULL),(18,7,1,'International Students Meet & Greet',NULL,34,0,'2024-03-13 17:00:00','2025-05-21 17:08:00','Monthly meetup for international students',NULL),(19,7,1,'Sports Complex Opening Hours',NULL,12,0,'2024-03-14 17:00:00','2025-05-21 17:08:00','Updated opening hours and available facilities',NULL),(20,NULL,1,NULL,NULL,0,0,'2025-05-22 12:45:16',NULL,NULL,'<p>BBBB</p>'),(21,NULL,1,NULL,NULL,0,0,'2025-05-22 12:46:40',NULL,NULL,'<p>BBBB</p>'),(22,NULL,1,NULL,NULL,0,0,'2025-05-22 12:47:00',NULL,NULL,'<p>BBBB</p>'),(23,NULL,1,NULL,NULL,0,0,'2025-05-26 12:19:11',NULL,NULL,'<p>A</p>'),(24,NULL,1,NULL,NULL,0,0,'2025-05-26 12:29:08',NULL,NULL,'<p>C</p>'),(25,2,1,'aaaa',NULL,0,0,'2025-05-26 14:53:26',NULL,NULL,'<p>aaaaa</p>'),(26,2,1,'<p>aaaaa</p>',NULL,0,0,'2025-05-26 15:52:42',NULL,'aaaa','<p>aaaaa</p>'),(27,2,1,'<p>aaaaa</p>',NULL,0,0,'2025-05-26 15:53:30',NULL,'aaaa','<p>aaaaa</p>'),(28,1,1,'<p>AAAAA</p>',NULL,0,0,'2025-05-26 15:57:13',NULL,'AAAAA','<p>AAAA</p>'),(29,NULL,2,'<p>Zs</p>',NULL,2,0,'2025-05-30 04:44:28','2025-06-01 00:37:19',NULL,NULL),(30,1,2,'AAAASDASD',NULL,0,0,'2025-05-30 05:00:49',NULL,'u stoobid','u stoobid'),(31,1,2,'asd',NULL,0,0,'2025-05-30 05:26:35',NULL,'asdasd','asdadaasd'),(32,1,2,'concac',NULL,0,0,'2025-05-30 05:27:24',NULL,'concac','concac'),(33,NULL,1,'<p>Test 1</p>',NULL,0,0,'2025-05-31 06:11:42',NULL,NULL,NULL),(34,NULL,1,NULL,NULL,0,0,'2025-05-31 06:15:15',NULL,NULL,'<p>Test 2</p>'),(35,1,1,'Thử Nghiệm 01','Thử 1',0,0,'2025-05-31 06:55:14',NULL,'Thử 1',NULL),(36,1,1,'Thử 2','Thử 2',0,0,'2025-05-31 06:57:27',NULL,'Thử 2',NULL),(37,1,1,'Thử 3','Xin chào',0,0,'2025-05-31 08:47:41','2025-05-31 15:47:41','Xin chào',NULL),(38,1,1,'Thử 4','a',0,0,'2025-05-31 09:01:52','2025-05-31 16:01:52','a',NULL),(39,1,1,'Thử 4','a',0,0,'2025-05-31 09:02:24','2025-05-31 16:02:24','a',NULL),(40,1,1,'Thử 5','aa',11,0,'2025-05-31 10:37:05','2025-05-31 20:01:03','aaa',NULL),(41,1,1,'Thử',NULL,0,0,'2025-05-31 16:41:58','2025-05-31 23:41:58','aaa','aaaa'),(42,1,1,'Thu1',NULL,0,0,'2025-06-01 05:38:31','2025-06-01 12:38:31','',''),(43,1,1,'Thu2',NULL,0,0,'2025-06-01 05:39:26','2025-06-01 12:39:26','aaaa',''),(45,1,1,'Thu4',NULL,0,0,'2025-06-01 05:53:46','2025-06-01 12:53:46','aaaa','<p>aaaa<img src=\"https://media0.giphy.com/media/1QfjQKX3fZ7lgrGOiE/giphy.gif?cid=8a45e266sg0ykexcyydtctahvqq43otd1zytflrfcug7w9ta&amp;ep=v1_gifs_trending&amp;rid=giphy.gif&amp;ct=g\"></p>');
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
INSERT INTO `thread_tag` VALUES (35,1),(36,1),(38,1),(39,1),(37,2),(39,2),(28,3),(41,3),(42,3),(45,3),(40,4),(43,7);
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
INSERT INTO `topic` VALUES (1,1,1,'Welcome to the forum!','Introduce yourself here.','2025-05-19 12:12:28','2025-06-01 13:47:47'),(2,2,2,'Best resources to learn Go?','Share tutorials, YouTube channels, or books.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(3,3,1,'Tips for surviving finals','Drop your best study tips and coping mechanisms.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(4,4,3,'Internship openings Summer 2025','Post or ask about internship opportunities.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(5,5,2,'What’s your favorite movie this year?','Let’s talk about recent releases and hidden gems.','2025-05-19 12:12:28','2025-05-20 22:33:36'),(6,6,1,'Welcome to IU Forum','Introduce yourself and get to know other members','2025-05-21 08:20:57','2025-05-21 13:20:57'),(7,6,1,'Campus Life','Discuss campus events, activities, and student life','2025-05-21 08:20:57','2025-05-20 15:20:57'),(8,7,1,'Course Registration','Questions and discussions about course registration','2025-05-21 08:20:57','2025-05-21 12:20:57'),(9,7,1,'Study Groups','Find study partners and form study groups','2025-05-21 08:20:57','2025-05-21 10:20:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'thien','thien','/img/avt/avatar-1748493438164-727436741.png',NULL,NULL,NULL,'AAAABBB',0,'2025-05-19 10:39:44','2025-06-01 12:03:28',0,0,0,'Member','Street 10, Truong Tho District, Thu Duc, TPHCM','Student','https://x.com/','https://www.linkedin.com/feed/','https://rebalon.github.io/'),(2,'minhduc','Duke','/img/avt/avatar-1748580222334-779726913.png',NULL,NULL,NULL,NULL,0,'2025-05-29 10:47:14','2025-05-30 11:13:56',0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(3,'ngthien','Nguyễn Văn Lạc Thiên',NULL,NULL,NULL,NULL,NULL,0,'2025-05-31 10:56:21','2025-05-31 19:35:51',0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(4,'nvlthien','AAAAA',NULL,NULL,NULL,NULL,NULL,0,'2025-05-31 11:24:27',NULL,0,0,0,'Member',NULL,NULL,NULL,NULL,NULL),(5,'thien1','BBBBBB',NULL,NULL,NULL,NULL,NULL,0,'2025-05-31 11:26:45',NULL,0,0,0,'Member',NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credentials`
--

LOCK TABLES `user_credentials` WRITE;
/*!40000 ALTER TABLE `user_credentials` DISABLE KEYS */;
INSERT INTO `user_credentials` VALUES (1,'ngthien0929@gmail.com','$2b$10$TE8thjp2d9ILUQx//WCkFOT9mW.kr8q1zIgG/cdPv9VzkVMhybLCO',1),(2,'itcsiu22218@student.hcmiu.edu.vn','$2b$10$GRBSA0Z5pTWRq/FJi6ADmOjrt5w8dIR8fH1kJYJzrxthfYGd/2mvm',2),(3,'ITCSIU22245@student.hcmiu.edu.vn','$2b$10$A46SZhvrFhkeRdJCFaQd4O0mhomeKZv4dPuyX35TBHyHZuVNPEl4K',3),(4,'ITCSIU22245@student.hcmiu.edu.vn','$2b$10$rvTHfOuful5i/gjmHoeKgO7PFGj7DfI1uGDwOFA.0o48om2Yo9JAa',4),(5,'ITCSIU22245@student.hcmiu.edu.vn','$2b$10$8DrvtfsoTRMv/qRUWmPYK.2y584Jl9VPsBQ5SBvNcdG/3.zYX/aVK',5);
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

-- Dump completed on 2025-06-01 16:21:20
