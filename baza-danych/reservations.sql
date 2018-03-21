
CREATE TABLE `zeto`.`reservations` (
  `id` int(11) NOT NULL,
  `dateDay` varchar(30) COLLATE utf8_bin NOT NULL,
  `hourStart` varchar(30) COLLATE utf8_bin NOT NULL,
  `hourEnd` varchar(30) COLLATE utf8_bin NOT NULL,
  `idObject` int(11) COLLATE utf8_bin NOT NULL,
  `idUser` int(11) COLLATE utf8_bin NOT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `zeto`.`reservations` (`id`, `dateDay`, `hourStart`, `hourEnd`, `idObject`, `idUser`) VALUES
(1, '29-02-18', '6:00', '10:00', 1, 0),
(2, '01-01-19', '10:00', '12:00', 2, 2);


select * from zeto.reservations