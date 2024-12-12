-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2024 a las 19:29:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `logistica_almacen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(10) UNSIGNED NOT NULL,
  `fecha_salida` date NOT NULL,
  `origen` varchar(255) NOT NULL,
  `destino` varchar(255) NOT NULL,
  `matricula_camion` varchar(50) NOT NULL,
  `estado` enum('pendiente_de_pago','aceptado','cancelado','en_revision','pendiente_de_envio','enviado','entregado') DEFAULT 'pendiente_de_pago',
  `operario_id` int(10) UNSIGNED DEFAULT NULL,
  `encargado_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `fecha_salida`, `origen`, `destino`, `matricula_camion`, `estado`, `operario_id`, `encargado_id`) VALUES
(1, '2024-12-14', 'Madrid', 'Barcelona', 'ABC-1234', 'pendiente_de_pago', NULL, NULL),
(2, '2024-12-15', 'Badajoz', 'Cádiz', '0000DFD', 'cancelado', NULL, NULL),
(3, '2024-12-13', 'Teruel', 'Almería', '0265FTA', 'pendiente_de_envio', NULL, NULL),
(4, '2024-12-16', 'Alicante', 'Murcia', 'DEF-2345', 'en_revision', NULL, NULL),
(5, '2024-12-12', 'Valladolid', 'Salamanca', 'GHI-3456', 'pendiente_de_envio', NULL, NULL),
(6, '2024-12-14', 'Toledo', 'Cuenca', 'JKL-4567', 'pendiente_de_pago', NULL, NULL),
(7, '2024-12-15', 'Zaragoza', 'Huesca', 'NOP-5678', 'entregado', NULL, NULL),
(8, '2024-12-17', 'Santander', 'Oviedo', 'QRS-6789', 'pendiente_de_pago', NULL, NULL),
(9, '2024-12-11', 'Cádiz', 'Málaga', 'TUV-7890', 'aceptado', NULL, NULL),
(10, '2024-12-18', 'Burgos', 'León', 'WXY-8901', 'cancelado', NULL, NULL),
(11, '2024-12-13', 'Girona', 'Tarragona', 'ZAB-9012', 'en_revision', NULL, NULL),
(12, '2024-12-14', 'Pamplona', 'Logroño', 'CDE-0123', 'pendiente_de_envio', NULL, NULL),
(13, '2024-12-16', 'Córdoba', 'Almería', 'FGH-1234', 'enviado', NULL, NULL),
(14, '2024-12-15', 'Lugo', 'Ourense', 'IJK-2345', 'entregado', NULL, NULL),
(15, '2024-12-14', 'Las Palmas', 'Santa Cruz de Tenerife', 'LMO-3456', 'pendiente_de_pago', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `operario_id` (`operario_id`),
  ADD KEY `encargado_id` (`encargado_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`operario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`encargado_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
