-- MySQL dump 10.13  Distrib 5.5.32, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: map
-- ------------------------------------------------------
-- Server version	5.5.32-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route_name` varchar(120) NOT NULL,
  `city` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'è·¯çº¿1','ä¸Šæµ·'),(2,'è·¯çº¿2','ä¸Šæµ·'),(3,'è·¯çº¿3','ä¸Šæµ·'),(4,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(5,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(6,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(7,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(8,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(9,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(10,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(11,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(12,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(13,'æˆ‘çš„æ–°è¡Œç¨‹','Trip'),(14,'æˆ‘çš„æ–°è¡Œç¨‹22','ä¸Šæµ·'),(15,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(16,'Hello ','ä¸Šæµ·'),(17,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(18,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(19,'æˆ‘çš„æ–°è¡Œç¨‹test','ä¸Šæµ·'),(20,'æˆ‘çš„æ–°è¡Œç¨‹test','ä¸Šæµ·'),(21,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(22,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(23,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(24,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(25,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(26,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(27,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(28,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(29,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(30,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(31,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·'),(32,'æˆ‘çš„æ–°è¡Œç¨‹','ä¸Šæµ·');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_spot`
--

DROP TABLE IF EXISTS `route_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `route_spot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sight_id` int(11) DEFAULT NULL,
  `sight_order` int(11) DEFAULT NULL,
  `route_id` int(11) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`),
  KEY `sight_id` (`sight_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `route_spot_ibfk_1` FOREIGN KEY (`sight_id`) REFERENCES `sight` (`id`),
  CONSTRAINT `route_spot_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_spot`
--

LOCK TABLES `route_spot` WRITE;
/*!40000 ALTER TABLE `route_spot` DISABLE KEYS */;
INSERT INTO `route_spot` VALUES (1,1,1,1,NULL),(2,2,2,1,NULL),(3,3,3,1,NULL),(4,4,4,1,NULL),(5,5,5,1,NULL),(6,3,1,2,NULL),(7,2,2,2,NULL),(8,1,3,2,NULL),(9,5,1,3,NULL),(10,4,2,3,NULL),(11,2,3,3,NULL),(12,3,4,3,NULL),(18,2,0,14,NULL),(19,3,1,14,NULL),(20,4,2,14,NULL),(21,1,0,15,NULL),(22,2,1,15,NULL),(23,3,2,15,NULL),(24,4,3,15,NULL),(25,5,4,15,NULL),(38,1,0,16,NULL),(39,2,1,16,NULL),(40,3,2,16,NULL),(41,4,3,16,NULL),(42,5,4,16,NULL),(43,4,5,16,NULL),(44,1,1,17,NULL),(45,2,2,17,NULL),(46,3,3,17,NULL),(47,4,4,17,NULL),(48,4,5,17,NULL),(59,1,1,18,NULL),(60,2,2,18,NULL),(61,3,3,18,NULL),(62,4,4,18,NULL),(63,5,5,18,NULL),(64,5,1,19,NULL),(65,3,2,19,NULL),(79,2,1,20,NULL),(80,3,2,20,NULL),(81,1,3,20,NULL),(82,3,4,20,NULL),(83,1,1,21,NULL),(84,2,2,21,NULL),(85,1,1,23,NULL),(86,2,2,23,NULL),(87,3,3,23,NULL),(88,4,4,23,NULL),(89,1,1,24,NULL),(90,2,2,24,NULL),(91,3,3,24,NULL),(92,1,1,25,NULL),(93,2,2,25,NULL),(94,3,1,26,NULL),(95,2,2,26,NULL),(96,1,3,26,NULL),(97,1,4,26,NULL),(98,2,5,26,NULL),(99,3,6,26,NULL),(100,1,1,27,NULL),(101,2,2,27,NULL),(102,3,3,27,NULL),(103,4,4,27,NULL),(104,5,5,27,NULL),(105,3,1,28,NULL),(106,2,2,28,NULL),(107,1,3,28,NULL),(108,1,1,29,NULL),(109,2,2,29,NULL),(110,4,3,29,NULL),(111,1,1,30,NULL),(112,2,2,30,NULL),(113,3,3,30,NULL),(114,4,4,30,NULL),(115,5,5,30,NULL),(116,1,1,31,NULL),(117,2,2,31,NULL),(118,3,3,31,NULL),(119,4,4,31,NULL),(120,5,5,31,NULL),(121,1,1,32,NULL),(122,2,2,32,NULL),(123,3,3,32,NULL),(124,4,4,32,NULL),(125,5,5,32,NULL);
/*!40000 ALTER TABLE `route_spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sight`
--

DROP TABLE IF EXISTS `sight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `geo_source` varchar(40) NOT NULL,
  `latitude` varchar(40) NOT NULL,
  `longitude` varchar(40) NOT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `play_time` varchar(40) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `pic_link` varchar(100) DEFAULT NULL,
  `tag` varchar(200) DEFAULT NULL,
  `open_time` varchar(100) DEFAULT NULL,
  `brief_description` varchar(2000) DEFAULT NULL,
  `hot` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sight`
--

LOCK TABLES `sight` WRITE;
/*!40000 ALTER TABLE `sight` DISABLE KEYS */;
INSERT INTO `sight` VALUES (1,'æ–°å¤©åœ°','ä¸Šæµ·','sight','æµ‹è¯•åœ°å€','Baidu','121.481241','31.222388','123456','1å°æ—¶','å…è´¹','/static/img/test.jpg','æµ‹è¯•','æµ‹è¯•','æµ‹è¯•',0),(2,'å¤§ä¸–ç•Œ','ä¸Šæµ·','sight','æµ‹è¯•åœ°å€','Baidu','121.48567','31.23389','123456','1å°æ—¶','å…è´¹','/static/img/test.jpg','æµ‹è¯•','æµ‹è¯•','æµ‹è¯•',0),(3,'è±«å›­','ä¸Šæµ·','sight','æµ‹è¯•åœ°å€','Baidu','121.498821','31.233767','123456','1å°æ—¶','å…è´¹','/static/img/test.jpg','æµ‹è¯•','æµ‹è¯•','æµ‹è¯•',0),(4,'ä¸Šæµ·åšç‰©é¦†','ä¸Šæµ·','sight','æµ‹è¯•åœ°å€','Baidu','121.453474','31.230617','123456','1å°æ—¶','å…è´¹','/static/img/test.jpg','æµ‹è¯•','æµ‹è¯•','æµ‹è¯•',0),(5,'é™å®‰å¯º','ä¸Šæµ·','sight','æµ‹è¯•åœ°å€','Baidu','121.453474','31.230617','123456','1å°æ—¶','å…è´¹','/static/img/test.jpg','æµ‹è¯•','æµ‹è¯•','æµ‹è¯•',0);
/*!40000 ALTER TABLE `sight` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-01-02 19:00:42
