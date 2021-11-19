-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: k5b104.p.ssafy.io    Database: cohort
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created` datetime(6) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'코드 쫌 치시네요','2021-11-18 15:00:08.077000',35,1),(2,'10점이요 10점','2021-11-18 15:00:27.444000',24,3),(3,'풀이가 깔금하네요','2021-11-18 15:01:06.561000',24,6),(4,'마법사 상어 시리즈..','2021-11-18 15:01:27.276000',31,6),(5,'구구 구구구 구구구 구구구구구구 구구구구 구구구구 구구구 구구구','2021-11-18 15:03:18.659000',26,1),(6,'구구구 구구구 구구구구구 구구구구 구구구 구구구구구구 구구','2021-11-18 15:03:22.866000',26,1),(7,'구구구 구구구 구구구구구 구구구구 구구 구구구구 구구구구구 구구구구','2021-11-18 15:03:27.438000',26,1),(8,'이렇게는 나도 풀겠다','2021-11-18 15:03:28.049000',33,3),(9,'구 구구구구 구구구구 구 구구구구 구구 구구구구','2021-11-18 15:03:34.793000',26,1),(10,'구구 구구구구 구구구구구 구구구 구구구구구구구, 구구 구구구 구구구구구','2021-11-18 15:03:39.758000',26,1),(11,'https://www.acmicpc.net/problem/9999','2021-11-18 15:03:47.957000',26,1),(12,'관심과 사랑 감사합니다','2021-11-18 15:04:30.077000',33,1),(13,'좋은 코드로 보답하겠습니다.','2021-11-18 15:04:42.086000',33,1),(14,'240라인 주석에 욕이 있는데요?','2021-11-18 15:05:23.756000',20,1),(15,'이것이 \"객체지향\"','2021-11-18 15:06:07.882000',27,1),(22,'상어쉑....','2021-11-18 16:07:11.670000',31,9),(24,'안녕하세요','2021-11-18 16:18:40.698000',40,10),(25,'오랜만이에요~','2021-11-18 16:18:54.849000',29,10),(26,'안녕히가세요','2021-11-18 17:12:04.614000',40,3);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18 17:32:07
