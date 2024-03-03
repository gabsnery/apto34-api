-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 192.168.15.16    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `boleto`
--
CREATE DATABASE IF NOT EXISTS ecommece;
use ecommece;
DROP TABLE IF EXISTS `boleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleto` (
  `id` int NOT NULL,
  `data_emissao_boleto` datetime NOT NULL,
  `numero_boleto` varchar(48) NOT NULL,
  `valor_boleto` float NOT NULL,
  `boleto_pago` tinyint NOT NULL,
  `data_pagamento_boleto` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `mp_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_boleto_UNIQUE` (`numero_boleto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleto`
--

LOCK TABLES `boleto` WRITE;
/*!40000 ALTER TABLE `boleto` DISABLE KEYS */;
/*!40000 ALTER TABLE `boleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartao`
--

DROP TABLE IF EXISTS `cartao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartao` (
  `id` int NOT NULL,
  `numero_cartao` char(4) NOT NULL,
  `nome_cartao` varchar(25) NOT NULL,
  `data_expiracao` date NOT NULL,
  `id_cartao_bandeira` int NOT NULL,
  `salt` varchar(40) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_cartao_UNIQUE` (`numero_cartao`),
  UNIQUE KEY `salt_UNIQUE` (`salt`),
  KEY `fk_cartoes_cartao_bandeiras1_idx` (`id_cartao_bandeira`),
  CONSTRAINT `fk_cartoes_cartao_bandeiras1` FOREIGN KEY (`id_cartao_bandeira`) REFERENCES `cartao_bandeira` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartao`
--

LOCK TABLES `cartao` WRITE;
/*!40000 ALTER TABLE `cartao` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartao_bandeira`
--

DROP TABLE IF EXISTS `cartao_bandeira`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartao_bandeira` (
  `id` int NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `bandeira` varchar(20) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartao_bandeira`
--

LOCK TABLES `cartao_bandeira` WRITE;
/*!40000 ALTER TABLE `cartao_bandeira` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartao_bandeira` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartao_bandeira_tem_pagamento_tipo`
--

DROP TABLE IF EXISTS `cartao_bandeira_tem_pagamento_tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartao_bandeira_tem_pagamento_tipo` (
  `idCartaoBandeira` int NOT NULL,
  `idPagamentoTipo` int NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idCartaoBandeira`,`idPagamentoTipo`),
  KEY `fk_cartao_bandeira_has_pagamento_tipo_pagamento_tipo1_idx` (`idPagamentoTipo`),
  KEY `fk_cartao_bandeira_has_pagamento_tipo_cartao_bandeira1_idx` (`idCartaoBandeira`),
  CONSTRAINT `fk_cartao_bandeira_has_pagamento_tipo_cartao_bandeira1` FOREIGN KEY (`idCartaoBandeira`) REFERENCES `cartao_bandeira` (`id`),
  CONSTRAINT `fk_cartao_bandeira_has_pagamento_tipo_pagamento_tipo1` FOREIGN KEY (`idPagamentoTipo`) REFERENCES `pagamento_tipo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartao_bandeira_tem_pagamento_tipo`
--

LOCK TABLES `cartao_bandeira_tem_pagamento_tipo` WRITE;
/*!40000 ALTER TABLE `cartao_bandeira_tem_pagamento_tipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartao_bandeira_tem_pagamento_tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidade` (
  `id_cidade` int NOT NULL,
  `cidade` varchar(60) NOT NULL,
  `id_estado` int NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_cidade`),
  KEY `fk_cidade_estado1_idx` (`id_estado`),
  CONSTRAINT `fk_cidade_estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `sobrenome` varchar(60) NOT NULL,
  `sexo` enum('M','F') DEFAULT NULL,
  `data_de_nascimento` date DEFAULT NULL,
  `id_telefone` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `cpf` char(11) DEFAULT NULL,
  `senha` varchar(200) NOT NULL,
  `salt` varchar(40) DEFAULT NULL,
  `data_ultima_atualizacao` datetime DEFAULT NULL,
  `desativado` tinyint DEFAULT NULL,
  `data_conta_desativada` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_cliente_telefones1_idx` (`id_telefone`),
  CONSTRAINT `fk_cliente_telefones1` FOREIGN KEY (`id_telefone`) REFERENCES `telefone` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'','',NULL,NULL,NULL,'',NULL,'',NULL,NULL,NULL,NULL,'2023-07-09 21:10:11','2023-07-09 21:10:11',NULL,0),(2,'Gabriela','Nery da Silva de Mattos',NULL,NULL,NULL,'gneri94890@gmail.com',NULL,'$2a$10$CbxR.gmWk9PtfqSFjZ/W8OZyLbal/gpfntkUHp.PrPjwckFASd0oq',NULL,NULL,NULL,NULL,'2023-07-10 00:10:57','2023-07-10 00:10:57',NULL,1);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_has_enderecos`
--

DROP TABLE IF EXISTS `cliente_has_enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_has_enderecos` (
  `idCliente` int NOT NULL,
  `idEndereco` int NOT NULL,
  `idTelefone` int NOT NULL,
  `nome_completo` varchar(45) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idCliente`,`idEndereco`,`idTelefone`),
  KEY `fk_cliente_has_enderecos_enderecos1_idx` (`idEndereco`),
  KEY `fk_cliente_has_enderecos_cliente1_idx` (`idCliente`),
  KEY `fk_cliente_has_enderecos_telefones1_idx` (`idTelefone`),
  CONSTRAINT `fk_cliente_has_enderecos_cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `fk_cliente_has_enderecos_enderecos1` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`),
  CONSTRAINT `fk_cliente_has_enderecos_telefones1` FOREIGN KEY (`idTelefone`) REFERENCES `telefone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_has_enderecos`
--

LOCK TABLES `cliente_has_enderecos` WRITE;
/*!40000 ALTER TABLE `cliente_has_enderecos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_has_enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_tem_cartao`
--

DROP TABLE IF EXISTS `cliente_tem_cartao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_tem_cartao` (
  `idCliente` int NOT NULL,
  `idCartao` int NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idCliente`,`idCartao`),
  KEY `fk_cliente_has_cartao_cartao1_idx` (`idCartao`),
  KEY `fk_cliente_has_cartao_cliente1_idx` (`idCliente`),
  CONSTRAINT `fk_cliente_has_cartao_cartao1` FOREIGN KEY (`idCartao`) REFERENCES `cartao` (`id`),
  CONSTRAINT `fk_cliente_has_cartao_cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_tem_cartao`
--

LOCK TABLES `cliente_tem_cartao` WRITE;
/*!40000 ALTER TABLE `cliente_tem_cartao` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_tem_cartao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_tem_endereco`
--

DROP TABLE IF EXISTS `cliente_tem_endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_tem_endereco` (
  `idCliente` int NOT NULL,
  `idEndereco` int NOT NULL,
  `endereco_criacao` tinyint NOT NULL,
  `padrao` tinyint NOT NULL,
  `data_criacao` datetime NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idCliente`,`idEndereco`),
  KEY `fk_cliente_has_endereco_endereco1_idx` (`idEndereco`),
  KEY `fk_cliente_has_endereco_cliente1_idx` (`idCliente`),
  CONSTRAINT `fk_cliente_has_endereco_cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `fk_cliente_has_endereco_endereco1` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_tem_endereco`
--

LOCK TABLES `cliente_tem_endereco` WRITE;
/*!40000 ALTER TABLE `cliente_tem_endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_tem_endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cor`
--

DROP TABLE IF EXISTS `cor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cor`
--

LOCK TABLES `cor` WRITE;
/*!40000 ALTER TABLE `cor` DISABLE KEYS */;
INSERT INTO `cor` VALUES (1,'Rosa','2023-07-09 20:53:42','2023-07-09 20:53:42'),(2,'Preto','2023-07-09 20:53:42','2023-07-09 20:53:42'),(3,'Branco','2023-07-09 20:53:42','2023-07-09 20:53:42');
/*!40000 ALTER TABLE `cor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ddd`
--

DROP TABLE IF EXISTS `ddd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ddd` (
  `id` int NOT NULL,
  `ddd` int NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ddd_UNIQUE` (`ddd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ddd`
--

LOCK TABLES `ddd` WRITE;
/*!40000 ALTER TABLE `ddd` DISABLE KEYS */;
/*!40000 ALTER TABLE `ddd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id` int NOT NULL,
  `data_criacao` datetime NOT NULL,
  `nome` varchar(255) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id` int NOT NULL,
  `cep` char(8) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `bairro` varchar(60) NOT NULL,
  `id_cidade` int NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_enderecos_cidade1_idx` (`id_cidade`),
  CONSTRAINT `fk_enderecos_cidade1` FOREIGN KEY (`id_cidade`) REFERENCES `cidade` (`id_cidade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrega`
--

DROP TABLE IF EXISTS `entrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrega` (
  `id` int NOT NULL,
  `id_entrega_status` int NOT NULL,
  `data_entrega_inicio` datetime NOT NULL,
  `valor_frete` float NOT NULL,
  `codigo_rastreio` varchar(15) DEFAULT NULL,
  `idEndereco` int NOT NULL,
  `idTransportadora` int NOT NULL,
  `idTelefone` int NOT NULL,
  `data_entrega_previsao` datetime NOT NULL,
  `entrega_concluida` tinyint NOT NULL,
  `data_entrega_fim` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_entrega_endereco1_idx` (`idEndereco`),
  KEY `fk_entrega_telefone1_idx` (`idTelefone`),
  KEY `fk_entrega_transportadora1_idx` (`idTransportadora`),
  KEY `fk_entrega_entrega_status1_idx` (`id_entrega_status`),
  CONSTRAINT `fk_entrega_endereco1` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`),
  CONSTRAINT `fk_entrega_entrega_status1` FOREIGN KEY (`id_entrega_status`) REFERENCES `entrega_status` (`id`),
  CONSTRAINT `fk_entrega_telefone1` FOREIGN KEY (`idTelefone`) REFERENCES `telefone` (`id`),
  CONSTRAINT `fk_entrega_transportadora1` FOREIGN KEY (`idTransportadora`) REFERENCES `transportadora` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrega`
--

LOCK TABLES `entrega` WRITE;
/*!40000 ALTER TABLE `entrega` DISABLE KEYS */;
/*!40000 ALTER TABLE `entrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrega_status`
--

DROP TABLE IF EXISTS `entrega_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrega_status` (
  `id` int NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `status_entrega` varchar(45) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrega_status`
--

LOCK TABLES `entrega_status` WRITE;
/*!40000 ALTER TABLE `entrega_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `entrega_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int NOT NULL,
  `estado` varchar(40) NOT NULL,
  `uf` char(2) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_fiscal`
--

DROP TABLE IF EXISTS `nota_fiscal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nota_fiscal` (
  `id` int NOT NULL,
  `data_emissao_nota` datetime NOT NULL,
  `numero_nota` int NOT NULL,
  `valor_nota` float NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_nota_UNIQUE` (`numero_nota`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_fiscal`
--

LOCK TABLES `nota_fiscal` WRITE;
/*!40000 ALTER TABLE `nota_fiscal` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota_fiscal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pagamento_tipo` int NOT NULL,
  `parcelado` tinyint DEFAULT NULL,
  `quantidade_parcelas` int DEFAULT NULL,
  `id_boleto` int DEFAULT NULL,
  `pagamento_confirmado` tinyint NOT NULL,
  `data_pagamento_confirmado` date DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pagamento_pagamento_tipo1_idx` (`id_pagamento_tipo`),
  KEY `fk_pagamento_boleto1_idx` (`id_boleto`),
  CONSTRAINT `fk_pagamento_boleto1` FOREIGN KEY (`id_boleto`) REFERENCES `boleto` (`id`),
  CONSTRAINT `fk_pagamento_pagamento_tipo1` FOREIGN KEY (`id_pagamento_tipo`) REFERENCES `pagamento_tipo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento`
--

LOCK TABLES `pagamento` WRITE;
/*!40000 ALTER TABLE `pagamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento_tipo`
--

DROP TABLE IF EXISTS `pagamento_tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento_tipo` (
  `id` int NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `tipo_pagamento` varchar(45) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento_tipo`
--

LOCK TABLES `pagamento_tipo` WRITE;
/*!40000 ALTER TABLE `pagamento_tipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamento_tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPedidoStatus` int NOT NULL,
  `idNotaFiscal` int NOT NULL,
  `data_pedido_realizado` datetime NOT NULL,
  `idCliente` int NOT NULL,
  `idPagamento` int NOT NULL,
  `idEntrega` int NOT NULL,
  `pedido_concluido` tinyint NOT NULL,
  `data_pedido_concluido` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_entrega_UNIQUE` (`idEntrega`),
  UNIQUE KEY `id_pagamento_UNIQUE` (`idPagamento`),
  KEY `fk_pedido_cliente1_idx` (`idCliente`),
  KEY `fk_pedido_pagamento1_idx` (`idPagamento`),
  KEY `fk_pedido_entrega1_idx` (`idEntrega`),
  KEY `fk_pedido_pedido_status1_idx` (`idPedidoStatus`),
  KEY `fk_pedido_nota_fiscal1_idx` (`idNotaFiscal`),
  CONSTRAINT `fk_pedido_cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `fk_pedido_entrega1` FOREIGN KEY (`idEntrega`) REFERENCES `entrega` (`id`),
  CONSTRAINT `fk_pedido_nota_fiscal1` FOREIGN KEY (`idNotaFiscal`) REFERENCES `nota_fiscal` (`id`),
  CONSTRAINT `fk_pedido_pagamento1` FOREIGN KEY (`idPagamento`) REFERENCES `pagamento` (`id`),
  CONSTRAINT `fk_pedido_pedido_status1` FOREIGN KEY (`idPedidoStatus`) REFERENCES `pedido_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_status`
--

DROP TABLE IF EXISTS `pedido_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_status` (
  `id` int NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `status_pedido` varchar(45) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_status`
--

LOCK TABLES `pedido_status` WRITE;
/*!40000 ALTER TABLE `pedido_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_tem_produto`
--

DROP TABLE IF EXISTS `pedido_tem_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_tem_produto` (
  `idProduto` int NOT NULL,
  `idPedido` int NOT NULL,
  `quantidade` int NOT NULL,
  `desconto` tinyint NOT NULL,
  `valor_desconto` float DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idProduto`,`idPedido`),
  KEY `fk_produto_has_pedido_pedido1_idx` (`idPedido`),
  KEY `fk_produto_has_pedido_produto1_idx` (`idProduto`),
  CONSTRAINT `fk_produto_has_pedido_pedido1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`id`),
  CONSTRAINT `fk_produto_has_pedido_produto` FOREIGN KEY (`idProduto`) REFERENCES `produto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_tem_produto`
--

LOCK TABLES `pedido_tem_produto` WRITE;
/*!40000 ALTER TABLE `pedido_tem_produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_tem_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `is_cover` tinyint(1) DEFAULT '0',
  `thumbnail` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=383 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (164,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(165,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(166,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(167,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(168,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(169,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(170,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(171,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(172,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(173,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(174,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(175,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(176,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(177,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(178,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(179,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(180,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(181,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(182,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(183,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(184,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(185,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(186,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(187,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(188,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(189,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(190,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(191,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(192,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(193,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(194,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(195,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(196,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(197,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(198,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(199,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(200,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(201,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(202,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(203,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,NULL),(204,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(205,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(206,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(207,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(208,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(209,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(210,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(211,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(212,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(213,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(214,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(215,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(216,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(217,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(218,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(219,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(220,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(221,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(222,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(223,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(224,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(225,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(226,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(227,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(228,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(229,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(230,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(231,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(232,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(233,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(234,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(235,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(236,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(237,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(238,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(239,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(240,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(241,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(242,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(243,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(244,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(245,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(246,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(247,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(248,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(249,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(250,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(251,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(252,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(253,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(254,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(255,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(256,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(257,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(258,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(259,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(260,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(261,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(262,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(263,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(264,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(265,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(266,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(267,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(268,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(269,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(270,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(271,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(272,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(273,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(274,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(275,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(276,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(277,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(278,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(279,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(280,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(281,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(282,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(283,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(284,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(285,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(286,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(287,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(288,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(289,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(290,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(291,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(292,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(293,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(294,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(295,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(296,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(297,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(298,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(299,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(300,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(301,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(302,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(303,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(304,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(305,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(306,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(307,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(308,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(309,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(310,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(311,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(312,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(313,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(314,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(315,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(316,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(317,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(318,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(319,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(320,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(321,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(322,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(323,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(324,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(325,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(326,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(327,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(328,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(329,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(330,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(331,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(332,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(333,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(334,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(335,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(336,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(337,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(338,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(339,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(340,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(341,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(342,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(343,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(344,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(345,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(346,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(347,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(348,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(349,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(350,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(351,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(352,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(353,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(354,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(355,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(356,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(357,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(358,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(359,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(360,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(361,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(362,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(363,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(364,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(365,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(366,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(367,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(368,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(369,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(370,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(371,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(372,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(373,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(374,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(375,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,0),(376,'http://localhost:3005/uploads/1981701649514738-diminuido.jpg',0,1),(377,'http://localhost:3005/uploads/1991701658529769.jpg',0,0),(378,'http://localhost:3005/uploads/1991701658529769-diminuido.jpg',0,1),(379,'https://storage.googleapis.com/apto34/2001709230356351.jpg',0,0),(380,'https://storage.googleapis.com/apto34/2001709230356351-diminuido.jpg',0,1),(381,'https://storage.googleapis.com/jatoba/2011709230603688.jpg',0,0),(382,'https://storage.googleapis.com/jatoba/2011709230603688-diminuido.jpg',0,1);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(45) NOT NULL,
  `valor_produto` varchar(45) DEFAULT NULL,
  `desativado` tinyint DEFAULT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `quantity` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (119,'NOME','DESC','10',0,NULL,'2023-07-20 22:09:05','2023-07-20 22:09:05',0),(120,'NOME','DESC','10',0,NULL,'2023-07-20 22:09:58','2023-07-20 22:09:58',0),(121,'NOME','DESC','10',0,NULL,'2023-07-20 22:14:46','2023-07-20 22:14:46',0),(122,'NOME','DESC','10',0,NULL,'2023-07-20 22:15:31','2023-07-20 22:15:31',0),(123,'NOME','DESC','10',0,NULL,'2023-07-20 22:16:37','2023-07-20 22:16:37',0),(124,'NOME','DESC','10',0,NULL,'2023-07-20 22:16:51','2023-07-20 22:16:51',0),(125,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:00','2023-07-20 22:17:00',0),(126,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:08','2023-07-20 22:17:08',0),(127,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:23','2023-07-20 22:17:23',0),(128,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:36','2023-07-20 22:17:36',0),(129,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:40','2023-07-20 22:17:40',0),(130,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:48','2023-07-20 22:17:48',0),(131,'NOME','DESC','10',0,NULL,'2023-07-20 22:17:58','2023-07-20 22:17:58',0),(132,'NOME','DESC','10',0,NULL,'2023-07-20 22:18:03','2023-07-20 22:18:03',0),(133,'NOME','DESC','10',0,NULL,'2023-07-20 22:18:07','2023-07-20 22:18:07',0),(134,'NOME','DESC','10',0,NULL,'2023-07-20 22:18:12','2023-07-20 22:18:12',0),(135,'NOME','DESC','10',0,NULL,'2023-07-20 22:18:30','2023-07-20 22:18:30',0),(136,'NOME','DESC','10',0,NULL,'2023-07-20 22:18:37','2023-07-20 22:18:37',0),(137,'NOME','DESC','10',0,NULL,'2023-07-20 22:21:15','2023-07-20 22:21:15',0),(138,'NOME11','DESC11','10',0,NULL,'2023-07-20 22:21:28','2023-07-20 22:21:28',0),(139,'NOME11','DESC11','10',0,NULL,'2023-07-20 22:50:08','2023-07-20 22:50:08',0),(140,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 22:59:22','2023-07-20 22:59:22',0),(141,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:11:10','2023-07-20 23:11:10',0),(142,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:13:29','2023-07-20 23:13:29',0),(143,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:14:21','2023-07-20 23:14:21',0),(144,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:15:54','2023-07-20 23:15:54',0),(145,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:19:17','2023-07-20 23:19:17',0),(146,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:23:08','2023-07-20 23:23:08',0),(147,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:24:08','2023-07-20 23:24:08',0),(148,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:24:58','2023-07-20 23:24:58',0),(149,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:29:09','2023-07-20 23:29:09',0),(150,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:30:24','2023-07-20 23:30:24',0),(151,'eeeee','eeeeeeee','222',0,NULL,'2023-07-20 23:32:19','2023-07-20 23:32:19',0),(152,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:36:51','2023-07-20 23:36:51',0),(153,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:37:51','2023-07-20 23:37:51',0),(154,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:39:06','2023-07-20 23:39:06',0),(155,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:41:03','2023-07-20 23:41:03',0),(156,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:48:21','2023-07-20 23:48:21',0),(157,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:54:49','2023-07-20 23:54:49',0),(158,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:55:25','2023-07-20 23:55:25',0),(159,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:55:59','2023-07-20 23:55:59',0),(160,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:56:43','2023-07-20 23:56:43',0),(161,'nome chuck','descrição','10',0,NULL,'2023-07-20 23:59:08','2023-07-20 23:59:08',0),(162,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:03:03','2023-07-21 00:03:03',0),(163,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:03:46','2023-07-21 00:03:46',0),(164,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:05:02','2023-07-21 00:05:02',0),(165,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:09:05','2023-07-21 00:09:05',0),(166,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:11:45','2023-07-21 00:11:45',0),(167,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:12:59','2023-07-21 00:12:59',0),(168,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:13:32','2023-07-21 00:13:32',0),(169,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:14:09','2023-07-21 00:14:09',0),(170,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:14:33','2023-07-21 00:14:33',0),(171,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:16:21','2023-07-21 00:16:21',0),(172,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:17:19','2023-07-21 00:17:19',0),(173,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:21:32','2023-07-21 00:21:32',0),(174,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:23:13','2023-07-21 00:23:13',0),(175,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:24:48','2023-07-21 00:24:48',0),(176,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:32:06','2023-07-21 00:32:06',0),(177,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:33:18','2023-07-21 00:33:18',0),(178,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:34:12','2023-07-21 00:34:12',0),(179,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:35:54','2023-07-21 00:35:54',0),(180,'nome chuck','descrição','10',0,NULL,'2023-07-21 00:42:52','2023-07-21 00:42:52',0),(181,'eeeeeee','eeeeeeeeeeeeeeeeeeeeeeeeee','3333',0,NULL,'2023-07-21 00:45:26','2023-07-21 00:45:26',0),(182,'eeeeeee','eeeeeeeeeeeeeeeeeeeeeeeeee','3333',0,NULL,'2023-07-21 00:46:27','2023-07-21 00:46:27',0),(183,'eeeeeee','eeeeeeeeeeeeeeeeeeeeeeeeee','3333',0,NULL,'2023-07-21 00:46:33','2023-07-21 00:46:33',0),(184,'eeeeeee','eeeeeeeeeeeeeeeeeeeeeeeeee','3333',0,NULL,'2023-07-21 00:46:38','2023-07-21 00:46:38',0),(185,'eeeeeee','eeeeeeeeeeeeeeeeeeeeeeeeee','3333',0,NULL,'2023-07-21 00:46:45','2023-07-21 00:46:45',0),(186,'eeeeeee','eeeeeeeeeeeeeeeeeeeeeeeeee','3333',0,NULL,'2023-07-21 00:49:25','2023-07-21 00:49:25',0),(187,'nome','descriçãp','4546',0,NULL,'2023-07-21 21:49:31','2023-07-21 21:49:31',0),(188,'wwww','wwww','222',0,NULL,'2023-07-21 23:46:11','2023-07-21 23:46:11',222),(189,'nome','66','88',0,NULL,'2023-07-22 00:05:40','2023-07-22 00:05:40',66),(190,'nome','66','88',0,NULL,'2023-07-22 00:11:23','2023-07-22 00:11:23',66),(191,'teste','teste','22',0,NULL,'2023-12-03 21:44:59','2023-12-03 21:44:59',55),(192,'teste','teste','22',0,NULL,'2023-12-03 21:48:56','2023-12-03 21:48:56',55),(193,'teste','teste','22',0,NULL,'2023-12-03 21:55:26','2023-12-03 21:55:26',55),(194,'teste','teste','22',0,NULL,'2023-12-03 21:57:11','2023-12-03 21:57:11',55),(195,'qqqqqqqqqqqqq','qqqqqqqqqqqqq','11',0,NULL,'2023-12-03 21:58:55','2023-12-03 21:58:55',1),(196,'dddd','gneri94890@gmail.com','22',0,NULL,'2023-12-03 22:20:37','2023-12-03 22:20:37',1),(197,'teste','teste','22',0,NULL,'2023-12-03 22:21:24','2023-12-03 22:21:24',22),(198,'teste','teste','3',0,NULL,'2023-12-04 00:25:14','2023-12-04 00:25:14',3),(199,'testeia','testeia','22',0,NULL,'2023-12-04 02:55:29','2023-12-04 02:55:29',3),(200,'01/32','22','22',0,NULL,'2024-02-29 18:12:36','2024-02-29 18:12:36',22),(201,'foto','dd','22',0,NULL,'2024-02-29 18:16:43','2024-02-29 18:16:43',2),(202,'name','aaa','22',0,NULL,'2024-02-29 23:03:05','2024-02-29 23:03:05',2),(203,'aa','2','2',0,NULL,'2024-02-29 23:06:35','2024-02-29 23:06:35',2),(204,'aa','2','2',0,NULL,'2024-02-29 23:08:17','2024-02-29 23:08:17',2),(205,'aa','2','2',0,NULL,'2024-02-29 23:12:32','2024-02-29 23:12:32',2),(206,'aa','2','2',0,NULL,'2024-02-29 23:13:53','2024-02-29 23:13:53',2),(207,'aa','2','2',0,NULL,'2024-02-29 23:19:14','2024-02-29 23:19:14',2),(208,'aa','2','2',0,NULL,'2024-02-29 23:21:10','2024-02-29 23:21:10',2),(209,'aa','2','2',0,NULL,'2024-02-29 23:35:07','2024-02-29 23:35:07',2),(210,'aa','2','2',0,NULL,'2024-02-29 23:42:21','2024-02-29 23:42:21',2),(211,'aa','2','2',0,NULL,'2024-02-29 23:45:10','2024-02-29 23:45:10',2),(212,'aa','2','2',0,NULL,'2024-02-29 23:46:51','2024-02-29 23:46:51',2),(213,'aa','2','2',0,NULL,'2024-02-29 23:47:21','2024-02-29 23:47:21',2),(214,'aa','2','2',0,NULL,'2024-02-29 23:47:29','2024-02-29 23:47:29',2),(215,'aa','2','2',0,NULL,'2024-02-29 23:47:52','2024-02-29 23:47:52',2),(216,'aa','2','2',0,NULL,'2024-02-29 23:48:09','2024-02-29 23:48:09',2),(217,'aa','2','2',0,NULL,'2024-03-01 00:16:46','2024-03-01 00:16:46',2),(218,'aqui ó','aqui ó','2222',0,NULL,'2024-03-01 00:17:59','2024-03-01 00:17:59',4),(219,'essa vai dar 100% certo','certissima','200',0,NULL,'2024-03-01 00:24:36','2024-03-01 00:24:36',30);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_categoria`
--

DROP TABLE IF EXISTS `produto_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_categoria` (
  `id` int NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `categoria` varchar(100) NOT NULL,
  `descricao_categoria` varchar(150) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_categoria`
--

LOCK TABLES `produto_categoria` WRITE;
/*!40000 ALTER TABLE `produto_categoria` DISABLE KEYS */;
INSERT INTO `produto_categoria` VALUES (1,NULL,'Feminino','para moças',0,NULL),(2,NULL,'Masculino ','para moços',0,NULL),(3,NULL,'Teste','teste',0,NULL);
/*!40000 ALTER TABLE `produto_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_subcategoria`
--

DROP TABLE IF EXISTS `produto_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_subcategoria` (
  `id` int NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `subcategoria` varchar(100) NOT NULL,
  `descricao_subcategoria` varchar(150) NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  `produtoCategoriaId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produto_subcategoria_produto_categoria1_idx` (`produtoCategoriaId`),
  CONSTRAINT `fk_produto_subcategoria_produto_categoria1` FOREIGN KEY (`produtoCategoriaId`) REFERENCES `produto_categoria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_subcategoria`
--

LOCK TABLES `produto_subcategoria` WRITE;
/*!40000 ALTER TABLE `produto_subcategoria` DISABLE KEYS */;
INSERT INTO `produto_subcategoria` VALUES (1,NULL,'calças','calças',0,NULL,1),(2,NULL,'vestidos','vestidos',0,NULL,1),(3,NULL,'teste','tss',0,NULL,3);
/*!40000 ALTER TABLE `produto_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_tem_cor`
--

DROP TABLE IF EXISTS `produto_tem_cor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_tem_cor` (
  `corId` int NOT NULL,
  `produtoId` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produto_has_cor_produto_idx` (`produtoId`),
  KEY `fk_produto_has_cor_cor1_idx` (`corId`),
  CONSTRAINT `fk_produto_has_cor_cor1` FOREIGN KEY (`corId`) REFERENCES `cor` (`id`),
  CONSTRAINT `fk_produto_has_cor_produto` FOREIGN KEY (`produtoId`) REFERENCES `produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_tem_cor`
--

LOCK TABLES `produto_tem_cor` WRITE;
/*!40000 ALTER TABLE `produto_tem_cor` DISABLE KEYS */;
INSERT INTO `produto_tem_cor` VALUES (1,189,1,2),(3,189,2,2),(1,190,3,2),(1,190,4,6),(3,190,5,2),(2,218,6,4),(1,219,7,30);
/*!40000 ALTER TABLE `produto_tem_cor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_tem_photo`
--

DROP TABLE IF EXISTS `produto_tem_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_tem_photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produtoId` int DEFAULT NULL,
  `photoId` int DEFAULT NULL,
  `is_cover` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produto_tem_photo_ibfk_1` (`produtoId`),
  KEY `produto_tem_photo_ibfk_2_idx` (`photoId`),
  CONSTRAINT `produto_tem_photo_ibfk_1` FOREIGN KEY (`produtoId`) REFERENCES `produto` (`id`),
  CONSTRAINT `produto_tem_photo_ibfk_2` FOREIGN KEY (`photoId`) REFERENCES `photo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=302 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_tem_photo`
--

LOCK TABLES `produto_tem_photo` WRITE;
/*!40000 ALTER TABLE `produto_tem_photo` DISABLE KEYS */;
INSERT INTO `produto_tem_photo` VALUES (83,121,164,1),(84,121,165,0),(85,122,166,1),(86,122,167,0),(87,123,168,1),(88,123,169,0),(89,124,170,1),(90,124,171,0),(91,125,172,1),(92,125,173,0),(93,126,174,1),(94,126,175,0),(95,127,176,1),(96,127,177,0),(97,128,178,1),(98,128,179,0),(99,129,180,1),(100,129,181,0),(101,130,182,1),(102,130,183,0),(103,131,184,1),(104,131,185,0),(105,132,186,1),(106,132,187,0),(107,133,188,1),(108,133,189,0),(109,134,190,1),(110,134,191,0),(111,135,192,1),(112,135,193,0),(113,136,194,1),(114,136,195,0),(115,137,196,1),(116,137,197,0),(117,138,198,1),(118,138,199,0),(119,139,200,1),(120,139,201,0),(121,140,202,1),(122,140,203,0),(123,149,205,0),(124,149,204,1),(125,151,206,1),(126,151,207,0),(127,151,208,1),(128,151,209,0),(129,166,210,1),(130,166,211,0),(131,166,212,0),(132,166,213,0),(133,166,216,0),(134,166,215,0),(135,166,214,0),(136,170,217,1),(137,170,218,0),(138,170,219,0),(139,170,221,0),(140,170,220,0),(141,170,223,0),(142,170,222,0),(143,171,224,1),(144,171,225,0),(145,171,226,0),(146,171,227,0),(147,171,228,0),(148,171,230,0),(149,171,229,0),(150,172,231,1),(151,172,232,0),(152,172,233,0),(153,172,235,0),(154,172,237,0),(155,172,236,0),(156,172,234,0),(157,174,238,1),(158,174,239,0),(159,174,240,0),(160,174,241,0),(161,174,244,0),(162,174,242,0),(163,174,243,0),(164,175,245,1),(165,175,246,0),(166,175,247,0),(167,175,248,0),(168,175,250,0),(169,175,249,0),(170,175,251,0),(171,180,252,1),(172,180,253,0),(173,180,254,0),(174,180,255,0),(175,180,256,0),(176,180,257,0),(177,180,258,0),(178,181,259,1),(179,181,260,1),(180,181,261,0),(181,181,262,0),(182,181,263,0),(183,181,264,0),(184,181,268,0),(185,181,266,0),(186,181,265,0),(187,181,267,0),(188,181,269,0),(189,181,270,0),(190,181,271,0),(191,181,272,0),(192,182,273,1),(193,182,274,1),(194,182,276,0),(195,182,278,0),(196,182,275,0),(197,182,277,0),(198,182,279,0),(199,182,280,0),(200,182,281,0),(201,182,282,0),(202,182,284,0),(203,182,283,0),(204,182,285,0),(205,182,286,0),(206,183,287,1),(207,183,288,1),(208,183,289,0),(209,183,291,0),(210,183,290,0),(211,183,292,0),(212,183,293,0),(213,183,294,0),(214,183,295,0),(215,183,298,0),(216,183,296,0),(217,183,297,0),(218,183,299,0),(219,183,300,0),(220,184,301,1),(221,184,303,0),(222,184,304,0),(223,184,302,1),(224,184,305,0),(225,184,306,0),(226,184,307,0),(227,184,309,0),(228,184,308,0),(229,184,310,0),(230,184,311,0),(231,184,312,0),(232,184,313,0),(233,184,314,0),(234,185,315,1),(235,185,317,0),(236,185,316,1),(237,185,318,0),(238,185,319,0),(239,185,320,0),(240,185,321,0),(241,185,322,0),(242,185,323,0),(243,185,324,0),(244,185,325,0),(245,185,327,0),(246,185,326,0),(247,185,328,0),(248,186,329,1),(249,186,330,1),(250,186,331,0),(251,186,332,0),(252,186,333,0),(253,186,334,0),(254,186,336,0),(255,186,337,0),(256,186,335,0),(257,186,338,0),(258,186,339,0),(259,186,340,0),(260,186,341,0),(261,186,342,0),(262,187,343,1),(263,187,344,1),(264,187,345,0),(265,187,348,0),(266,187,346,0),(267,187,347,0),(268,189,349,1),(269,189,351,0),(270,189,350,1),(271,189,352,0),(272,190,353,1),(273,190,355,0),(274,190,354,1),(275,190,356,0),(276,194,357,1),(277,194,358,1),(278,194,360,0),(279,194,359,0),(280,195,361,1),(281,195,362,0),(282,195,363,1),(283,195,364,0),(284,196,365,1),(285,196,366,0),(286,196,367,1),(287,196,368,0),(288,197,369,1),(289,197,370,1),(290,197,372,0),(291,197,371,0),(292,198,373,1),(293,198,374,1),(294,198,376,0),(295,198,375,0),(296,199,377,1),(297,199,378,1),(298,200,379,1),(299,200,380,1),(300,201,381,1),(301,201,382,1);
/*!40000 ALTER TABLE `produto_tem_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_tem_subcategoria`
--

DROP TABLE IF EXISTS `produto_tem_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_tem_subcategoria` (
  `produtoId` int NOT NULL,
  `produtoSubcategoriumId` int NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_1_idx` (`produtoId`),
  KEY `fk_2_idx` (`produtoSubcategoriumId`),
  CONSTRAINT `fk_1` FOREIGN KEY (`produtoId`) REFERENCES `produto` (`id`),
  CONSTRAINT `fk_2` FOREIGN KEY (`produtoSubcategoriumId`) REFERENCES `produto_subcategoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_tem_subcategoria`
--

LOCK TABLES `produto_tem_subcategoria` WRITE;
/*!40000 ALTER TABLE `produto_tem_subcategoria` DISABLE KEYS */;
INSERT INTO `produto_tem_subcategoria` VALUES (121,1,15),(122,1,16),(123,1,17),(124,1,18),(125,1,19),(126,1,20),(127,1,21),(128,1,22),(129,1,23),(130,1,24),(131,1,25),(132,1,26),(133,1,27),(134,1,28),(135,1,29),(136,1,30),(137,1,31),(138,1,32),(139,1,33),(152,1,34),(153,1,35),(154,1,36),(155,1,37),(156,1,38),(157,1,39),(158,1,40),(159,1,41),(160,1,42),(161,1,43),(162,1,44),(163,1,45),(164,1,46),(165,1,47),(166,1,48),(167,1,49),(168,1,50),(169,1,51),(170,1,52),(171,1,53),(172,1,54),(173,1,55),(174,1,56),(175,1,57),(176,1,58),(177,1,59),(178,1,60),(179,1,61),(180,1,62),(181,1,63),(182,1,64),(183,1,65),(184,1,66),(185,1,67),(186,1,68),(187,2,69),(188,1,70),(188,2,71),(189,1,72),(189,2,73),(190,1,74),(190,2,75),(199,3,76),(218,3,77),(219,2,78);
/*!40000 ALTER TABLE `produto_tem_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_tem_tamanho`
--

DROP TABLE IF EXISTS `produto_tem_tamanho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_tem_tamanho` (
  `produtoId` int NOT NULL,
  `tamanhoId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`produtoId`,`tamanhoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_tem_tamanho`
--

LOCK TABLES `produto_tem_tamanho` WRITE;
/*!40000 ALTER TABLE `produto_tem_tamanho` DISABLE KEYS */;
INSERT INTO `produto_tem_tamanho` VALUES (189,4,3),(189,6,2),(190,4,3),(190,6,2),(218,4,2),(219,5,10),(219,6,10);
/*!40000 ALTER TABLE `produto_tem_tamanho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tamanho`
--

DROP TABLE IF EXISTS `tamanho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tamanho` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tamanho`
--

LOCK TABLES `tamanho` WRITE;
/*!40000 ALTER TABLE `tamanho` DISABLE KEYS */;
INSERT INTO `tamanho` VALUES (1,'PP'),(2,'P'),(3,'M'),(4,'G'),(5,'GG'),(6,'EG');
/*!40000 ALTER TABLE `tamanho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone`
--

DROP TABLE IF EXISTS `telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefone` (
  `id` int NOT NULL,
  `telefone` varchar(14) NOT NULL,
  `id_ddd` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `telefone_UNIQUE` (`telefone`),
  KEY `fk_telefones_ddd1_idx` (`id_ddd`),
  CONSTRAINT `fk_telefones_ddd1` FOREIGN KEY (`id_ddd`) REFERENCES `ddd` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportadora`
--

DROP TABLE IF EXISTS `transportadora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportadora` (
  `id` int NOT NULL,
  `data_criacao` datetime NOT NULL,
  `id_unidade` int NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unidade_UNIQUE` (`id_unidade`),
  KEY `fk_transportadora_unidade1_idx` (`id_unidade`),
  CONSTRAINT `fk_transportadora_unidade1` FOREIGN KEY (`id_unidade`) REFERENCES `unidade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportadora`
--

LOCK TABLES `transportadora` WRITE;
/*!40000 ALTER TABLE `transportadora` DISABLE KEYS */;
/*!40000 ALTER TABLE `transportadora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidade`
--

DROP TABLE IF EXISTS `unidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidade` (
  `id` int NOT NULL,
  `idEmpresa` int NOT NULL,
  `data_criacao` datetime NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) NOT NULL,
  `cnpj` char(14) NOT NULL,
  `idTelefone` int NOT NULL,
  `idEndereco` int NOT NULL,
  `desativado` tinyint NOT NULL,
  `data_desativacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnpj_UNIQUE` (`cnpj`),
  KEY `fk_transportadora_telefone1_idx` (`idTelefone`),
  KEY `fk_transportadora_empresa1_idx` (`idEmpresa`),
  KEY `fk_unidade_endereco1_idx` (`idEndereco`),
  CONSTRAINT `fk_transportadora_empresa1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`id`),
  CONSTRAINT `fk_transportadora_telefone1` FOREIGN KEY (`idTelefone`) REFERENCES `telefone` (`id`),
  CONSTRAINT `fk_unidade_endereco1` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidade`
--

LOCK TABLES `unidade` WRITE;
/*!40000 ALTER TABLE `unidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-01 17:59:23
