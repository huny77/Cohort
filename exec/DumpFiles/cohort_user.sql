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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'https://lh3.googleusercontent.com/a-/AOh14GjkoJrpO9Wg1M8f_YgzonsN-XeKNclmZnqLwkj24Q=s96-c','platina.kusakina@gmail.com','아이싱'),(2,'https://lh3.googleusercontent.com/a-/AOh14GgjC1mkpOHoSgitdEAqUEFr64Ge_mOI7LSWVnBhkw=s96-c','sweetchild22.ik@gmail.com','코드박사'),(3,'https://lh3.googleusercontent.com/a/AATXAJzkzeZ7oBB4aOkPyOpIFsRFWQp-FfAgcbG1xQya=s96-c','hanhelsink@gmail.com','한상정'),(4,'https://lh3.googleusercontent.com/a/AATXAJy0EIrOxerqaqNn66odX19KepK6ZT0q50iygC9a=s96-c','leeyongjig7679@gmail.com','직용'),(5,'https://lh3.googleusercontent.com/a/AATXAJxo8_TjRK4bMMGUfmwCJI8Tw92js0-WjjiJgzfU=s96-c','hanjoi7@naver.com','[대전_1반_한훈희]'),(6,'https://lh3.googleusercontent.com/a/AATXAJxhcLnruNS3OJu1I8FV0fBW3n3jw6Z6OireRqY3=s96-c','gloveomg@gmail.com','송한샘'),(7,'https://lh3.googleusercontent.com/a/AATXAJyzexlMXAvTGrh4EhEDmPOluoQVhd4jLkuye5gc=s96-c','rossro464@gmail.com','dd ssdsdxz'),(8,'https://lh3.googleusercontent.com/a-/AOh14GjLNPaKwlO20esx4m1p3HepW78hZt68hnY31JsWJg=s96-c','dev.daejin@gmail.com','Daejin Lee'),(9,'https://lh3.googleusercontent.com/a/AATXAJwyewbWsmvPJG9-Jx7JkVWU0XCk60Vd2l3d7DKDuA=s96-c','tngud128@gmail.com','오수형'),(10,'https://lh3.googleusercontent.com/a-/AOh14Ghtwnktx2NW_nQCXfGMdvt20ipzqkNEbvnSdL1Pvw=s96-c','co323co@gmail.com','김민정'),(11,'https://lh3.googleusercontent.com/a/AATXAJyFEhwBUhom6XrJXVK-h-dOqgrToJjuBDpy5sgz=s96-c','woongsik.oh@gmail.com','오웅식'),(12,'https://lh3.googleusercontent.com/a/AATXAJxIYC1Bu4h5e81FvR19LkCkDzc5GbV4hSogSzbx=s96-c','yeeun9603@gmail.com','심예은'),(13,'https://lh3.googleusercontent.com/a/AATXAJy2Ovg_Ylvbm9LvbTXiQtbpsz1GnmwZIrm1QNCc=s96-c','kkgmco0825@gmail.com','왕호진'),(14,'https://lh3.googleusercontent.com/a/AATXAJzoJ3sIpSC-_KA5fpzD4wLc2vJJyQK6AG5YSk8p=s96-c','wscho94@gmail.com','조원식');
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

-- Dump completed on 2021-11-18 17:32:06
