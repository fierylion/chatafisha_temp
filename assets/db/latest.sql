-- MariaDB dump 10.19  Distrib 10.5.15-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: chatafishad3
-- ------------------------------------------------------
-- Server version	10.5.15-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogpost`
--

DROP TABLE IF EXISTS `blogpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogpost` (
  `articleID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `bl_status` int(11) DEFAULT 1,
  `title` varchar(128) NOT NULL,
  `blog_img` varchar(64) NOT NULL,
  `blog_description` text NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`articleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogpost`
--

LOCK TABLES `blogpost` WRITE;
/*!40000 ALTER TABLE `blogpost` DISABLE KEYS */;
INSERT INTO `blogpost` VALUES (1,1,1,'plastic','assets/images/1682583043169~aset~carbon2.jpeg','A carbon footprint (or greenhouse gas footprint) Broken down by fuel type, the single largest source of global CO2 emissions is the consumption of coal, followed by petroleum, then natural gasBroken down by fuel type, the single largest source of global CO2 emissions is the consumption of coal, followed by petroleum, then natural gasis a \"certain amount of gaseous emissions that are relevant to climate change and associated with human ','2023-05-01 06:28:29'),(2,1,1,'plastic','assets/images/1682922533826~aset~ai_training.jpg','we are here to collect plastic and do somethiong good for our society','2023-05-01 06:28:53'),(3,2,1,'Inc fucha','assets/images/1682921077553~aset~parrot.jpg','In 2018 (eons ago .. in ML timelines), Cagatay Demiralp and I were both Scientists at IBM Research NY, and were curious about building ML tools that generate visualizations from data. Such tools are valuable for users who lack the expertise to ask the right questions, select the right visual encoding or create charts (either via code or GUI tools). Could we really give raw data to a trained ML model, and get a set of initial relevant visualizations, with zero user input? Ideally, if we were successful, it would mean a system that could learn about visualization best practices directly from vast amounts of example data, addressing limitations of existing systems that relied on heuristics for visualization generation','2023-05-01 06:04:37');
/*!40000 ALTER TABLE `blogpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `staffID` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(64) NOT NULL,
  `mname` varchar(64) DEFAULT NULL,
  `lname` varchar(64) NOT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `location` varchar(64) NOT NULL,
  `role` int(11) NOT NULL,
  `status` int(11) DEFAULT 0,
  `staff_id` varchar(32) DEFAULT '0',
  `img_url` varchar(64) DEFAULT NULL,
  `registed_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`staffID`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'picker1','registed','validPicker','0678730906','picker@gmail.com','CoICT',1,1,'11','assets/images/1688728257316~aset~ai_training.jpg','2023-07-09 16:38:51'),(5,'picker2','bomba','validPicker2','0678730907','picker2@gmail.com','CoICT',1,1,'11','assets/images/1688735797998~aset~ai_training.jpg','2023-07-09 17:08:19'),(6,'Daniel',NULL,'Mawalla','0628630936','mawalladaniel2021@gmail.com','Canada',1,0,'14','assets/images/1688811773831~aset~proof.png','2023-07-08 10:22:54');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picker_data`
--

DROP TABLE IF EXISTS `picker_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `picker_data` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `picker_id` int(11) NOT NULL,
  `amount_col_kg` int(11) NOT NULL,
  `points` int(11) DEFAULT 0,
  `status` int(11) DEFAULT 1,
  `validator_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picker_data`
--

LOCK TABLES `picker_data` WRITE;
/*!40000 ALTER TABLE `picker_data` DISABLE KEYS */;
INSERT INTO `picker_data` VALUES (1,1,167,0,1,9,'2023-07-07 12:45:45'),(4,5,345,0,1,11,'2023-07-09 17:08:19');
/*!40000 ALTER TABLE `picker_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plastic_collection`
--

DROP TABLE IF EXISTS `plastic_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plastic_collection` (
  `collectionID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `centerID` int(11) NOT NULL,
  `type` varchar(64) NOT NULL,
  `qnty` int(11) NOT NULL,
  `imgs_url` text DEFAULT NULL,
  `collected_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`collectionID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plastic_collection`
--

LOCK TABLES `plastic_collection` WRITE;
/*!40000 ALTER TABLE `plastic_collection` DISABLE KEYS */;
INSERT INTO `plastic_collection` VALUES (1,6,1,'MO',500,NULL,'2023-07-02 04:23:49'),(2,3,1,'MO',500,NULL,'2023-07-02 04:23:33'),(3,11,1,'Low plastic',20,NULL,'2023-07-01 15:08:14'),(4,7,1,'Low plastic',39,NULL,'2023-07-02 04:24:18'),(5,11,1,'Low plastic',39,NULL,'2023-07-01 15:20:01'),(6,1,9,'AZAM',67,'assets/images/1688733934490~aset~20230420_163844.jpg | assets/images/1688733945077~aset~Building-Capacity-plan.drawio (1).png | ','2023-07-07 12:45:45');
/*!40000 ALTER TABLE `plastic_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `profileID` int(11) NOT NULL AUTO_INCREMENT,
  `profile_img` varchar(128) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `uploaded_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`profileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `projectID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `location` varchar(64) NOT NULL,
  `monit_period` varchar(32) NOT NULL,
  `vvb_contact` varchar(64) DEFAULT NULL,
  `verification_plan` varchar(128) DEFAULT NULL,
  `milestone` varchar(128) NOT NULL,
  `design_baseline` text NOT NULL,
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,1,'Nipe Fagio','Kijitonyama DSM','12','D-9054-EA12','verified','100M','Alex Krizhevsky is a Soviet Ukrainian-born Canadian computer scientist most noted for his work on artificial neural networks and deep learning. Shortly after having won the ImageNet challenge in 2012 with AlexNet, he and his colleagues sold their startup, DNN Research Inc., to Google');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(64) NOT NULL,
  `id_number` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'PICKER',2,1,'2023-07-04 13:17:34'),(2,'VALIDATOR',4,1,'2023-07-04 13:17:02'),(3,'ADMIN',1,1,'2023-07-04 13:18:11'),(4,'STUDENT',3,1,'2023-07-04 13:18:21');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `registration_no` varchar(64) NOT NULL,
  `location` varchar(128) NOT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone_no` varchar(64) NOT NULL,
  `role` int(11) DEFAULT 0,
  `department` varchar(16) DEFAULT NULL,
  `universityID` varchar(16) DEFAULT NULL,
  `collegeID` varchar(16) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`userID`),
  UNIQUE KEY `phone_no` (`phone_no`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'EDGAR JN','202202004530','CoICT-Mabatini','aset@gmail.com','0678730906',2,NULL,NULL,NULL,'aset123','2023-04-18 10:00:00'),(2,'ALEX JN','ALX-56F-GH','Moro-Town','alex@gmail.com','0678738934',1,NULL,NULL,NULL,'$2b$15$fmItP.IjN56TshpUEuK3FudylFPGvYFb.WYTHxLNvfSF9tFoKnYki','2023-05-21 09:49:32'),(3,'YUZZO MX','YU-34','DSM','yuzzo@gmail.com','678738935',2,NULL,NULL,NULL,'$2b$15$N1nRpDQfBMlFEo3aWJfp5OpMHqAmB4wJxjoa7pY8rFvubwUlWOJda','2023-06-29 18:15:57'),(6,'YUZZO MX','YU-34','DSM','yuzzo1@gmail.com','678738945',2,NULL,NULL,NULL,'$2b$15$ssLbVtfD6ANuVN5i9s3uIuC6m0tJ4aHh5KBvct3J8LVSgn45/27qy','2023-06-29 18:16:11'),(7,'Admin','AD-345','Server-Room','kasimu@gmail.com','06787389340',2,NULL,NULL,NULL,'$2b$15$dCYk6Rkq9gNDds24Jq/oeewc0x4YOS/XM5b/T7LQkhoCV1VLa23kG','2023-05-21 10:46:50'),(8,'Admin','AD-345','Server-Room','admin@gmail.com','678738965',1,NULL,NULL,NULL,'$2b$15$lhky0YlGDbyShEknY4VPg.1CKJqZqGE6FaTaZ0y/ILcGPKBMZe882','2023-06-29 18:16:25'),(9,'Picker','PK-345','Coict','picker@gmail.com','0768236158',4,NULL,NULL,NULL,'$2b$15$OnOW7/ECtkXaBncBjxPngutz/Cs7KPlPyLbwiM9yKAEPQf4ejli4u','2023-06-29 18:42:47'),(11,'validator','VD-345','CoICT','validator@gmail.com','1234567891',4,NULL,NULL,NULL,'$2b$15$kAzsE.KGz/xr3hpSor60OeHGe9lXmhPDi82u6PCw92PzKWeqngZYG','2023-07-07 10:29:08'),(14,'Daniel','12','Temeke','daniel@gmail.com','0628630936',4,NULL,NULL,NULL,'$2b$15$QQCJPDUCD5js.jFjWo.JJuxqWYRZOcyhpqo9FkYSx3dyqzGyaz0/2','2023-07-07 14:17:59'),(16,'john','123','Temeke','john@john.com','062863936',4,NULL,NULL,NULL,'$2b$15$tChRYSu9P77w2BMlp4KCD./4BRK9x0RnH7R3v15jKoSqKG4.MsVGi','2023-07-07 16:18:20'),(18,'john','123','Temeke','john@joh.com','06286393',4,NULL,NULL,NULL,'$2b$15$aLX.hHOFnXZwgK133TLZwuEIjYCfnFK8a.MKAw55vSmUWyO4UkjEi','2023-07-07 16:18:41'),(19,'fierylion','123','Temeke','fierylion@gmail.com','062863',1,NULL,NULL,NULL,'$2b$15$RR24AoaENGUfgoqJ4akriuRniW.UtXN5pd3eT96szwyQpzd9cnMuS','2023-07-07 16:25:07'),(20,'fierylion','12334','Temeke','fierylion@fierylion.com','123456',2,NULL,NULL,NULL,'$2b$15$t5pV6OZxA9H9kuEbSmvJges8pAN5HAK35ueoorblMMwuNaCFXjzoq','2023-07-07 16:27:49');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-09 17:09:15
