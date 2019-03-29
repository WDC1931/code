/*
 Navicat MySQL Data Transfer

 Source Server         : MySQL@Qcloud-STU
 Source Server Type    : MySQL
 Source Server Version : 50640
 Source Host           : 119.29.249.183:3306
 Source Schema         : db_keel_demo

 Target Server Type    : MySQL
 Target Server Version : 50640
 File Encoding         : 65001

 Date: 25/07/2018 15:33:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_keel_companies
-- ----------------------------
DROP TABLE IF EXISTS `t_keel_companies`;
CREATE TABLE `t_keel_companies` (
  `companyId` int(11) NOT NULL AUTO_INCREMENT COMMENT '公司 ID',
  `companyName` varchar(255) NOT NULL COMMENT '公司名称',
  `logoUrl` varchar(255) DEFAULT NULL COMMENT 'Logo 地址',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_keel_users
-- ----------------------------
DROP TABLE IF EXISTS `t_keel_users`;
CREATE TABLE `t_keel_users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户 ID',
  `userName` varchar(255) NOT NULL COMMENT '姓名',
  `sex` int(4) NOT NULL COMMENT '性别（1-男，2-女）',
  `email` varchar(255) DEFAULT NULL COMMENT '电子邮件',
  `companyId` int(11) NOT NULL COMMENT '公司 ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
