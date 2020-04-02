/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : testpro

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 02/04/2020 12:21:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authority
-- ----------------------------
DROP TABLE IF EXISTS `authority`;
CREATE TABLE `authority`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NULL DEFAULT NULL,
  `operate_id` int(11) NULL DEFAULT NULL,
  `interface` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 232 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authority
-- ----------------------------
INSERT INTO `authority` VALUES (1, 1, 1, '/icon', 'GET', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (2, 2, 1, '/v1/user', 'GET', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (3, 2, 2, '/v1/user', 'POST', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (4, 2, 5, '/v1/user/password ', 'PUT', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (5, 2, 6, '/v1/user/role', 'PUT', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (6, 2, 4, '/v1/user', 'DELETE', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (7, 3, 1, '/v1/role', 'GET', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (8, 3, 2, '/v1/role', 'POST', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (9, 3, 3, '/v1/role', 'PUT', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (10, 3, 4, '/v1/role', 'DELETE', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (11, 4, 1, '/v1/authority', 'GET', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (12, 4, 2, '/v1/authority', 'POST', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (13, 4, 3, '/v1/authority', 'PUT', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (14, 4, 4, '/v1/authority', 'DELETE', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `authority` VALUES (229, 1, 2, '/icon', 'POST', '2020-04-01 09:40:57', '2020-04-01 09:40:57', NULL);
INSERT INTO `authority` VALUES (230, 1, 3, '/icon', 'PUT', '2020-04-01 09:41:23', '2020-04-01 09:41:23', NULL);
INSERT INTO `authority` VALUES (231, 1, 4, '/icon', 'DELETE', '2020-04-01 09:41:35', '2020-04-01 09:41:35', NULL);

-- ----------------------------
-- Table structure for module
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `module_name`(`module_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of module
-- ----------------------------
INSERT INTO `module` VALUES (1, '图标', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `module` VALUES (2, '用户', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `module` VALUES (3, '角色', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `module` VALUES (4, '权限', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);

-- ----------------------------
-- Table structure for operate
-- ----------------------------
DROP TABLE IF EXISTS `operate`;
CREATE TABLE `operate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operate_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `operate_name`(`operate_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 87 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of operate
-- ----------------------------
INSERT INTO `operate` VALUES (1, '浏览', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `operate` VALUES (2, '创建', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `operate` VALUES (3, '编辑', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `operate` VALUES (4, '删除', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `operate` VALUES (5, '密码修改', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `operate` VALUES (6, '角色修改', '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `role_name`(`role_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '角色一', '2020-01-30 16:22:44', '2020-04-01 09:46:14', NULL);

-- ----------------------------
-- Table structure for roleauth
-- ----------------------------
DROP TABLE IF EXISTS `roleauth`;
CREATE TABLE `roleauth`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NULL DEFAULT NULL,
  `auth_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roleauth
-- ----------------------------
INSERT INTO `roleauth` VALUES (2, 2, 1, '2020-03-22 22:06:13', '2020-03-22 22:06:13', NULL);
INSERT INTO `roleauth` VALUES (3, 3, 1, '2020-03-22 22:08:19', '2020-03-22 22:08:19', NULL);
INSERT INTO `roleauth` VALUES (4, 1, 1, '2020-04-01 09:46:14', '2020-04-01 09:46:14', NULL);
INSERT INTO `roleauth` VALUES (5, 1, 229, '2020-04-01 09:46:14', '2020-04-01 09:46:14', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `account`(`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'super0', '$2a$10$Q0LFNFmNfY2N1syE8WJWV.Z8i7VDVNlygsvbUrOZ7dIHMJKRWQ8DK', NULL, '2020-01-30 15:23:38', '2020-01-30 15:23:38', NULL);
INSERT INTO `user` VALUES (17, 'users0', '$2a$10$Z6E5v5szs2NN7bxd7Jz6bu6q5ACg08IfxheuYDy32CRoX7.ML.8oa', 1, '2020-02-01 16:18:07', '2020-02-01 16:18:07', NULL);

SET FOREIGN_KEY_CHECKS = 1;
